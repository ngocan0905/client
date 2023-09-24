<template>
  <ClientLayout>
    <div v-if="productStore.productById" class="w-4/5 text-gray-900 capitalize mt-10">
      <div class="w-full grid grid-cols-6 bg-white shadow-2xl rounded-lg">
        <div class="col-span-3 flex items-center justify-center">
          <img :src="productStore.productById.images" alt="" class="object-cover" />
        </div>
        <div class="col-span-3 px-4 py-2">
          <div class="text-xl font-bold py-2">{{ productStore.productById.title }}</div>
          <hr class="w-full" />
          <div class="text-xl font-bold py-2">${{ productStore.productById.price }}</div>
          <div class="flex items-end">
            <StarRating
              :rating="productStore.productById.totalrating"
              :show-rating="false"
              :star-size="20"
            />
            <div class="text-gray-500">({{ productStore.productById.ratings.length }} review)</div>
          </div>
          <div class="w-full py-2">
            <div class="text-gray-500">write a review</div>
            <div class="relative flex items-center justify-end">
              <input type="text" class="w-full px-2 py-2 outline-none border" />
              <button
                class="absolute bg-gray-500 right-2 text-gray-100 px-3 py-1 hover:bg-gray-700 hover:scale-105 duration-500"
              >
                Post
              </button>
            </div>
          </div>
          <hr class="w-full" />
          <div class="py-2 flex items-center">
            <div class="text-lg font-semibold">Type :</div>

            <div class="text-gray-500 ml-2">{{ productStore.productById.category }}</div>
          </div>
          <div class="py-2 flex items-center">
            <div class="text-lg font-semibold">brand :</div>

            <div class="text-gray-500 ml-2">{{ productStore.productById.brand }}</div>
          </div>
          <div class="py-2">
            <div class="text-lg font-semibold">categories :</div>

            <div class="text-gray-500 ml-2">
              {{ productStore.productById.category }}
            </div>
          </div>
          <div class="py-2 flex items-center">
            <div class="text-lg font-semibold">tags :</div>

            <div class="text-gray-500 ml-2" v-for="tag in productStore.productById.tags">
              {{ tag }}
            </div>
          </div>

          <div class="py-2 flex items-center">
            <div class="text-lg font-semibold">SKU :</div>

            <div class="text-gray-500 ml-2">kho nhà anh bi</div>
          </div>
          <div class="py-2 flex items-center">
            <div class="text-lg font-semibold">availability :</div>

            <div class="text-gray-500 ml-2">{{ productStore.productById.quanlity }} in stock</div>
          </div>

          <div class="py-2 items-center">
            <div class="text-lg font-semibold">color :</div>
            <div class="flex text-gray-500 ml-2">
              <div v-for="item in colors" class="flex">
                <div class="rounded-full w-8 h-8 ml-2" :style="{ 'background-color': item }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <div class="text-xl font-semibold my-4">Description</div>
        <div class="bg-white rounded-lg p-4 shadow-2xl">
          {{ productStore.productById.description }}
        </div>
      </div>
      <div class="mt-24">
        <div class="text-xl font-semibold my-4">Reviews</div>
        <div class="bg-white shadow-2xl rounded-lg px-2 py-4">
          <section v-if="productStore.productById.ratings.length == 0" class="py-2">
            <div class="font-semibold">No comment there.</div>
          </section>
          <section v-else class="py-2 border-b" v-for="item in productStore.productById.ratings">
            <NameById :data="item.postedby" />
            <StarRating :rating="item.star" :star-size="15" :show-rating="false" />
            <sub>{{ item.comment }}</sub>
          </section>
        </div>
      </div>
      <div class="my-24">
        <div class="text-xl font-semibold my-4">Our hot products</div>
        <div class="bg-white shadow-2xl rounded-lg">
          <SlidePoduct />
        </div>
      </div>
    </div>
  </ClientLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import ClientLayout from "../layouts/ClientLayout.vue";
import NameById from "../components/NameById.vue";
import StarRating from "vue-star-rating";
import SlidePoduct from "../components/SlideProduct.vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/productStore";
const route = useRoute();
const productStore = useProductStore();
const colors = ref([]);
onMounted(async () => {
  // get product by id
  await productStore.getProductById(route.params.id);
  // get color of product
  const idColor = productStore.productById.color;
  for (let id of idColor) {
    await productStore.getColorById(id);
    colors.value.push(productStore.color.title);
  }
});
</script>
