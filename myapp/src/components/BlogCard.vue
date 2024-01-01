<template>
  <div
    class="w-full max-w-[300px] h-auto pb-10 my-10 shadow-xl rounded-lg border-2 glassmorphism-card"
  >
    <div class="min-h-[300px]">
      <img
        v-if="!data.images"
        src="../assets/images/master_dynamic_two.webp"
        class="object-contain rounded-md"
      />
      <RouterLink v-else :to="{ name: 'blog-detail', params: { id: data._id } }">
        <img :src="data.images" alt="" class="object-contain rounded-md min-h-[300px]" />
      </RouterLink>
    </div>

    <div>
      <div class="text-base font-semibold py-2 uppercase">{{ data.title }}</div>
    </div>
    <div>{{ formatDate(data.updatedAt) }}</div>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";

const { data } = defineProps(["data"]);
const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString();
};
</script>
