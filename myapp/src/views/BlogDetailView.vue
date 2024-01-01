<template>
  <ClientLayout>
    <div class="capitalize text-white min-h-screen">
      <div v-if="dataBlog" class="py-10">
        <div class="flex">
          posted by :
          <div class="cursor-pointer hover:underline ml-2 font-semibold">{{ dataBlog.author }}</div>
        </div>

        <div class="my-6 text-2xl font-extrabold flex justify-center mt-10">
          {{ dataBlog.title }}
        </div>
        <div class="flex items-center font-bold">
          category :
          <button class="px-2 py-1 capitalize rounded-lg border border-gray-900 ml-2">
            {{ dataBlog.category }}
          </button>
        </div>
        <hr class="w-full mt-4" />
        <div class="my-6 rounded-lg overflow-hidden">
          <img :src="dataBlog.images" alt="" loading="lazy" class="object-contain" />
        </div>
        <div class="flex justify-between">
          <div class="flex">
            <button class="flex py-2 px-4 rounded-full border">
              <HandThumbUpIcon
                class="w-6 h-6 mx-2 text-gray-400 hover:text-gray-700 duration-300"
              />
              <div>{{ dataBlog.likes.length }}</div>
            </button>
            <button class="flex py-2 px-4 rounded-full border ml-2">
              <HandThumbDownIcon
                class="w-6 h-6 mx-2 text-gray-400 hover:text-gray-700 duration-300"
              />
              <div>{{ dataBlog.disLikes.length }}</div>
            </button>
            <button class="flex py-2 px-4 rounded-full border ml-2">
              <EyeIcon class="w-6 h-6 mx-2 text-gray-400 hover:text-gray-700 duration-300" />
              <div>{{ dataBlog.numViews }}</div>
            </button>
          </div>
          <button class="flex">
            <ShareIcon class="w-6 h-6 mx-2 text-gray-400 hover:text-gray-700 duration-300" />
          </button>
        </div>
        <hr class="w-full my-4" />
        <div>
          <div class="text-xl font-semibold">Description</div>
          <div class="mt-4 py-2 px-4 border border-gray-200 rounded-lg shadow-2xl">
            {{ dataBlog.description }}
          </div>
        </div>
        <div class="flex justify-end mt-10">
          created at :
          <div class="ml-2">
            {{ formatDate(dataBlog.createdAt) }}
          </div>
        </div>
        <div class="flex justify-end">
          last updated at :
          <div class="ml-2">
            {{ formatDate(dataBlog.updatedAt) }}
          </div>
        </div>
        <hr class="w-full my-5" />
        <div>
          <button @click="backRoute" class="flex">
            <ArrowLeftIcon class="w-6 h-6 mr-4" /> Back to blog
          </button>
        </div>
        <hr class="w-full my-5" />
        <div class="p-4 rounded-lg shadow-xl border border-gray-200 mt-20">
          <div class="text-xl font-semibold my-4">comment</div>
          <div>
            <div>usename</div>
            <div>content comment</div>
          </div>
          <div class="relative mt-4 w-full">
            <input type="text" class="relative w-full py-2 outline-none border px-2 rounded-xl" />
            <button class="absolute bg-gray-600 text-gray-50 py-1 px-3 right-1 top-1 rounded-lg">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </ClientLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  EyeIcon,
  ShareIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/solid";
import ClientLayout from "../layouts/ClientLayout.vue";
import { useBlogStore } from "../stores/blogStore";
const blogStore = useBlogStore();
const route = useRoute();
const router = useRouter();
const dataBlog = ref();
onMounted(async () => {
  const data = await blogStore.getBlogById(route.params.id);
  dataBlog.value = data;
});
const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString();
};
const backRoute = () => {
  router.go(-1);
};
</script>
