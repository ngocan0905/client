<template>
  <div v-for="item in data.productData"
    class="flex flex-col items-center w-[300px] h-fit bg-slate-300 p-2 rounded-md mt-4">
    <img src="../assets/images/master_dynamic_two.webp" alt="" class="w-full object-cover" />
    <div class="my-2">name: {{ item.title }}</div>
    <div class="my-2">brand: {{ item.brand }}</div>
    <div class="my-2">rate: {{ item.totalrating }}</div>
  </div>
</template>
<script setup>
console.log(data.productData);
const data = defineProps(["productData"]);
</script>
