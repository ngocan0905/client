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
      <BlogCard :data="item" />
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import BlogCard from "../components/BlogCard.vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
const modules = [Navigation];
const { data } = defineProps(["data"]);
</script>
<style scoped></style>
