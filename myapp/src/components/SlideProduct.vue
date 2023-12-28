<template>
  <swiper
    :navigation="true"
    :modules="modules"
    :slides-per-view="4"
    :space-between="20"
    class="w-full h-full"
  >
    <swiper-slide
      class="text-center flex justify-center items-center w-full h-auto px-4"
      v-for="item in data"
      :key="item._id"
    >
      <product-card :data="item" />
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard.vue";
const modules = [Navigation];
const { data } = defineProps(["data"]);
</script>
<style scoped></style>
