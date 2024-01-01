<template>
  <div v-if="product">
    <div class="flex items-center justify-evenly border-b-2 py-6 capitalize min-w-[800px]">
      <div v-for="img of product.product.images" :key="img._id">
        <RouterLink :to="{ name: 'product', params: { id: product.product._id } }"
          ><img :src="img[0].url" class="h-40" alt=""
        /></RouterLink>
      </div>
      <div class="ml-4 w-full">
        <div class="font-bold text-lg max-w-2xl">{{ product.product.title }}</div>
        <div class="flex justify-between items-center">
          <div v-for="color of product.product.color" :key="color">
            <div :class="`text-${color}-500 `">
              {{ color }}
            </div>
            <div class="text-lg font-semibold">${{ product.price }}</div>
          </div>
          <div class="font-semibold">quantity: {{ product.count }}</div>
          <button class="" @click="deleteProductInCartById(product.product._id)">
            <TrashIcon class="h-8 w-8 text-red-500 hover:scale-105 active:scale-95 duration-300" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { useGeneralStore } from "../stores/generalStore";
const userStore = useUserStore();
const generalStore = useGeneralStore();
const { product } = defineProps(["product"]);
console.log(product);
const deleteProductInCartById = async (productId) => {
  try {
    generalStore.isLoading = true;
    const dltProduct = await userStore.removeProductFromCartByid(productId);

    if (dltProduct) {
      console.log(dltProduct);
      generalStore.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
