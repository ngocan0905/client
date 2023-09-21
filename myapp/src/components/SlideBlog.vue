<template>
  <swiper
    :navigation="true"
    :modules="modules"
    :slides-per-view="4"
    :space-between="10"
    class="w-full h-full"
  >
    <swiper-slide
      class="text-center flex justify-center items-center w-[150px] h-auto px-2"
      v-for="item in data"
    >
      <div class="bg-slate-300">
        <img
          src="../assets/images/master_dynamic_two.webp"
          alt=""
          class="object-cover rounded-md"
        />
        <div>
          <div class="text-base font-semibold py-2 uppercase">{{ item.title }}</div>
        </div>
        <div>{{ formatDate(item.updatedAt) }}</div>
        <div>
          <button
            class="py-2 px-4 border-gray-900 border-2 duration-500 hover:bg-gray-900 rounded-lg hover:text-gray-100 my-4 font-semibold uppercase text-xs"
          >
            read more
          </button>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
const modules = [Navigation];
const { data } = defineProps(["data"]);
const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString();
};
</script>
<style scoped></style>
