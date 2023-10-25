<template>
  <div v-if="data">
    <div class="flex items-center border-b-2 py-6 capitalize">
      <div><img :src="data.product.images" class="h-40" alt="" /></div>
      <div class="ml-4">
        <div class="font-bold text-lg max-w-2xl">{{ data.product.title }}</div>
        <div class="flex justify-between items-center">
          <div>
            <div :class="`text-${data.color}-500 font-semibold`">{{ data.color }}</div>
            <div class="text-lg">${{ data.price }}</div>
          </div>
          <div>quanlity: {{ data.count }}</div>
          <button
            class="px-3 py-1 rounded font-semibold bg-gray-400 hover:bg-gray-800 hover:text-gray-100 duration-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { data } = defineProps(["data"]);
console.log(data);
</script>
