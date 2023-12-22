<template>
  <div v-if="product">
    <div class="flex items-center justify-evenly capitalize">
      <div v-for="img of product.product.images" :key="img._id" class="h-28">
        <img :src="img[0].url" class="w-32 h-auto" alt="" />
      </div>
      <div class="ml-4 w-full">
        <div class="font-bold text-lg max-w-2xl">{{ product.product.title }}</div>
        <div class="flex justify-between items-center">
          <div v-for="color of product.product.color" :key="color">
            <div :class="`text-${color}-500 `" class="font-semibold">
              {{ color }}
            </div>
            <div class="text-lg font-semibold">${{ product.price }}</div>
          </div>
          <div>quantity: {{ product.count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { product } = defineProps(["product"]);
</script>
