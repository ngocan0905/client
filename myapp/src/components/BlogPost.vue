<template>
  <div v-if="data" class="p-4 mb-10 bg-gray-100 drop-shadow-2xl rounded-lg border border-gray-200">
    <div class="py-1 font-semibold hover:underline cursor-pointer">{{ data.author }}</div>
    <div class="py-1 mb-2">{{ formatDate(data.updatedAt) }}</div>
    <router-link
      :to="{ name: 'blog-detail', params: { id: data._id } }"
      class="overflow-hidden rounded-lg"
    >
      <img :src="data.images" alt="" class="object-contain" />
    </router-link>
    <div class="mt-4">
      <div class="text-xl font-semibold capitalize">{{ data.title }}</div>
      <hr class="w-full my-4" />
      <div class="flex justify-between items-center">
        <div class="flex">
          <button class="flex py-2 px-4 rounded-full border hover:border-gray-900">
            <HandThumbUpIcon class="w-6 h-6 mx-2 text-gray-400" />
            <div>{{ data.likes.length }}</div>
          </button>
          <button class="flex py-2 px-4 rounded-full border hover:border-gray-900 ml-2">
            <HandThumbDownIcon class="w-6 h-6 mx-2 text-gray-400" />
            <div>{{ data.disLikes.length }}</div>
          </button>
        </div>

        <button class="flex">
          <ShareIcon class="w-6 h-6 mx-2 text-gray-400" />
          <div>Share</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { HandThumbUpIcon, HandThumbDownIcon, ShareIcon } from "@heroicons/vue/24/solid";
const { data } = defineProps(["data"]);
console.log(data);
const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString();
};
</script>
