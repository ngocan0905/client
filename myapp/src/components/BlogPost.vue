<template>
  <div
    v-if="blog"
    class="p-4 max-w-2xl h-fit mb-10 bg-gray-100 drop-shadow-2xl rounded-lg border text-black border-gray-200"
  >
    <div class="py-1 font-semibold hover:underline cursor-pointer">{{ blog.author }}</div>
    <div class="py-1 mb-2">{{ formatDate(blog.updatedAt) }}</div>
    <router-link
      :to="{ name: 'blog-detail', params: { id: blog._id } }"
      class="overflow-hidden rounded-lg"
    >
      <img v-if="!blog.images" src="../assets/images/laptop.png" alt="" />
      <img v-else :src="blog.images" alt="" class="object-contain" />
    </router-link>
    <div class="mt-4">
      <div class="text-xl font-semibold capitalize">{{ blog.title }}</div>
      <hr class="w-full my-4" />
      <div class="flex justify-between items-center">
        <div class="flex">
          <button class="flex py-2 px-4 rounded-full border hover:border-gray-900">
            <HandThumbUpIcon class="w-6 h-6 mx-2 text-gray-800" />
            <div>{{ blog.likes.length }}</div>
          </button>
          <button class="flex py-2 px-4 rounded-full border hover:border-gray-900 ml-2">
            <HandThumbDownIcon class="w-6 h-6 mx-2 text-gray-800" />
            <div>{{ blog.disLikes.length }}</div>
          </button>
        </div>

        <button class="flex">
          <ShareIcon class="w-6 h-6 mx-2 text-gray-800" />
          <div>Share</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { HandThumbUpIcon, HandThumbDownIcon, ShareIcon } from "@heroicons/vue/24/solid";
const { blog } = defineProps(["blog"]);
console.log(blog);
const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString();
};
</script>
