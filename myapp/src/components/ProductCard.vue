<template>
  <div>
    <div
      v-if="data"
      class="w-full max-w-[300px] h-auto pb-10 my-10 shadow-xl rounded-lg overflow-hidden relative border-2"
    >
      <div class="absolute right-2 top-2">
        <HeartIcon
          class="w-6 h-6 text-gray-50 drop-shadow-lg hover:scale-125 duration-300"
          :class="{ 'text-red-500': isLiked }"
          @click="toggleLike(data._id)"
        />
      </div>
      <div class="min-h-[300px]">
        <img :src="data.images" alt="" class="object-contain rounded-md min-h-[300px]" />
      </div>

      <div>
        <router-link
          :to="{ name: 'product', params: { id: data._id } }"
          class="text-base font-semibold p-2 uppercase text-start flex flex-wrap justify-start"
        >
          {{ data.title }}
        </router-link>
        <div class="p-2">
          <StarRating
            :rating="parseInt(data.totalrating)"
            :read-only="true"
            :star-size="20"
            :show-rating="false"
            active-color="#E5D928"
          />
        </div>
        <div class="text-start p-2 font-semibold">${{ data.price }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import StarRating from "vue-star-rating";
import { HeartIcon } from "@heroicons/vue/24/solid";
import { useProductStore } from "../stores/productStore";
import jsCookie from "js-cookie";
import { computed, onMounted, ref } from "vue";
import { useGeneralStore } from "../stores/generalStore";
const productStore = useProductStore();
const generalStore = useGeneralStore();
const { data } = defineProps(["data"]);

const wishlist = ref([]);
const isLiked = computed(() => {
  return productStore.isProductInWishList(data._id);
});

const toggleLike = (productId) => {
  const token = jsCookie.get("user");
  console.log(token);
  if (!token) {
    generalStore.isLoginOpen = true;
  } else {
    const isProductLiked = isLiked.value;
    if (isProductLiked) {
      productStore.toggleProductToWishList(productId, "remove");
    } else {
      productStore.toggleProductToWishList(productId, "add");
    }
  }
};

onMounted(() => {
  wishlist.value = jsCookie.get("wishlist");
});
</script>
