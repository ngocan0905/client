<template>
  <ClientLayout>
    <div v-if="product" class="text-gray-100 capitalize mt-28">
      <div class="w-full grid grid-cols-6 shadow rounded-lg">
        <div
          class="col-span-3 flex items-center justify-center glassmorphism-container"
          v-for="(img, index) of product.images"
          :key="index"
        >
          <img :src="img[0].url" alt="" class="object-contain max-w-sm" />
        </div>
        <div class="col-span-3 px-4 py-2 relative">
          <div v-if="product.quantity > 0" class="absolute bottom-2 right-2 flex gap-3">
            <button
              @click="addToCart(product._id)"
              class="hover:scale-105 active:scale-95 px-4 py-2 duration-300 bg-gradient-to-br from-purple-700 to-blue-700 text-white rounded-md text-lg"
            >
              Add To Cart
            </button>
          </div>
          <div
            v-else
            class="text-red-500 absolute bottom-10 right-10 text-2xl font-bold border-2 p-2 border-red-500"
          >
            Sold out
          </div>
          <div class="text-xl font-bold py-2">{{ product.title }}</div>
          <hr class="w-full" />
          <div class="text-xl font-bold py-2">${{ product.price }}</div>
          <div class="flex items-end">
            <StarRating
              :rating="product.totalrating"
              :show-rating="false"
              :star-size="20"
              :max-rating="5"
              v-model="rating"
              @update:rating="onRatingUpdate"
            />
            <div class="text-white">({{ product.ratings.length }} review)</div>
          </div>
          <div class="w-full py-2">
            <div class="text-white">write a review</div>
            <div class="relative flex items-center justify-end">
              <textarea
                type="text"
                class="w-full h-fit px-2 py-2 outline-none border glassmorphism-container"
                v-model="comment"
              />
              <button
                @click="postRating"
                class="absolute hover:scale-105 active:scale-95 px-4 py-2 mr-2 hover:bg-gray-400 duration-300 bg-gradient-to-br from-purple-700 to-blue-700 text-white rounded-md text-lg"
              >
                Post
              </button>
            </div>
          </div>
          <hr class="w-full" />
          <div class="py-2 flex items-center">
            <div class="text-lg font-semibold">Type :</div>

            <div class="text-white ml-2">{{ product.category }}</div>
          </div>
          <div class="py-2 flex items-center">
            <div class="text-lg font-semibold">brand :</div>

            <div class="text-white ml-2">{{ product.brand }}</div>
          </div>
          <div class="py-2">
            <div class="text-lg font-semibold">categories :</div>

            <div class="text-white ml-2">
              {{ product.category }}
            </div>
          </div>
          <div class="py-2 flex items-center">
            <div class="text-lg font-semibold">tags :</div>

            <div class="text-white ml-2" v-for="tag in product.tags" :key="tag">
              {{ tag }}
            </div>
          </div>

          <div class="py-2 flex items-center">
            <div class="text-lg font-semibold">SKU :</div>

            <div class="text-white ml-2">{{ product._id }}</div>
          </div>
          <div class="py-2 flex items-center">
            <div class="text-lg font-semibold">availability :</div>

            <div class="text-white ml-2">{{ product.quantity }} in stock</div>
          </div>

          <div class="py-2 items-center">
            <div class="text-lg font-semibold">color :</div>
            <div class="flex text-white ml-2">
              <div v-for="item in product.color" class="flex" :key="item._id">
                <div class="rounded-full w-8 h-8 ml-2" :style="{ 'background-color': item }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <div class="text-xl font-semibold my-4">Description</div>
        <div class="glassmorphism-container rounded-lg p-4 shadow">
          {{ product.description }}
        </div>
      </div>
      <div class="mt-24">
        <div class="text-xl font-semibold my-4">Reviews</div>
        <div class="shadow rounded-lg px-2 py-4">
          <section v-if="product.ratings.length == 0" class="py-2">
            <div class="font-semibold">No comment there.</div>
          </section>
          <section
            v-else
            class="py-2 border-b"
            v-for="item in productRatings == 0 ? product.ratings : productRatings"
            :key="item._id"
          >
            <NameById :data="item.postedby" />
            <StarRating :rating="item.star" :star-size="15" :show-rating="false" />
            <sub>{{ item.comment }}</sub>
          </section>
        </div>
      </div>
      <div class="my-24">
        <div class="text-xl font-semibold my-4">Recommend products</div>
        <div class="glassmorphism-container shadow rounded-lg">
          <SlidePoduct :data="recommendProduct" />
        </div>
      </div>
    </div>
  </ClientLayout>
</template>
<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import ClientLayout from "../layouts/ClientLayout.vue";
import NameById from "../components/NameById.vue";
import StarRating from "vue-star-rating";
import SlidePoduct from "../components/SlideProduct.vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../stores/productStore";
import jsCookie from "js-cookie";
import { useUserStore } from "../stores/userStore";
const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const userStore = useUserStore();
const product = ref();
const recommendProduct = ref([]);
const rating = ref(0);
const comment = ref("");
const usersCmt = ref([]);

const onRatingUpdate = (newRating) => {
  rating.value = newRating;
  console.log("rating" + rating.value);
};
const productRatings = ref([]);

watch(
  () => productStore.productRatings,
  () => {
    productRatings.value = productStore.productRatings;
  }
);
const postRating = async () => {
  const token = jsCookie.get("user");
  try {
    if (token) {
      await productStore.postRating(rating.value, route.params.id, comment.value);
      comment.value = "";
    } else {
      router.push({ name: "login" });
    }
  } catch (error) {
    console.log(error);
  }
};
const addToCart = (productId, count = 1, selectedColor) => {
  let color = ""; // Mặc định là chuỗi rỗng nếu không có màu sắc được chọn

  if (
    selectedColor &&
    product.value &&
    product.value.color &&
    product.value.color.includes(selectedColor)
  ) {
    // Kiểm tra xem selectedColor có giá trị và có trong danh sách màu của sản phẩm không
    color = selectedColor;
  }

  userStore.addToCart(productId, count, color);
};
const loadProduct = async (productId) => {
  try {
    const newProduct = await productStore.getProductById(productId);

    if (newProduct) {
      product.value = newProduct;
    } else {
      console.log("1");
    }
  } catch (error) {
    console.error("Error loading product:", error);
  }
};
watchEffect(() => {
  const productId = route.params.id;
  loadProduct(productId);
});

onMounted(async () => {
  product.value = await productStore.getProductById(route.params.id);

  const productsByTag = await productStore.getProductByTag(product.value.tags[0]);
  if (productsByTag && productsByTag.length > 0) {
    // Lọc bỏ sản phẩm hiện tại ra khỏi danh sách sản phẩm khuyến nghị
    recommendProduct.value = productsByTag.filter(
      (recommendedProduct) => recommendedProduct._id !== product.value._id
    );
  } else {
    console.log("No products found for this tag");
  }
  console.log(recommendProduct.value);
});
</script>
<style scoped>
.glassmorphism-container {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
