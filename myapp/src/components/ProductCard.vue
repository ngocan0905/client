<template>
  <div>
    <div
      class="w-full max-w-[300px] h-auto pb-10 my-10 shadow-xl rounded-lg overflow-hidden relative border-2"
    >
      <div class="absolute right-2 top-2">
        <HeartIcon
          class="w-6 h-6 text-gray-50 drop-shadow-lg hover:scale-125 duration-300"
          :class="isProductLiked(data._id) ? 'text-red-400' : ''"
          @click="toggleLike(data._id)"
        />
      </div>
      <div class="min-h-[300px]">
        <img
          v-if="data.images == 0"
          src="../assets/images/master_dynamic_two.webp"
          alt=""
          class="object-cover rounded-md"
        />
        <img v-else :src="data.images" alt="" class="object-contain rounded-md min-h-[400px]" />
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
            :rating="data.totalrating"
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
import { ref } from "vue";
const productStore = useProductStore();
const { data } = defineProps(["data"]);

const isProductLiked = productStore.isProductLiked;
const toggleLike = (productId) => {
  if (isProductLiked(productId)) {
    productStore.removeLikedProductId(productId);
  } else {
    productStore.addLikedProductId(productId);
  }
};
</script>
