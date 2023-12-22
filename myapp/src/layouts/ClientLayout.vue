<template>
  <div class="min-h-screen">
    <headernav class="fixed" />
    <div class="flex flex-col items-center bg-gray-100 h-full">
      <BreadCrumb class="mt-[140px]" />
      <slot></slot>
    </div>
    <Footernav />
  </div>
</template>
<script setup>
import headernav from "../components/HeaderClient.vue";
import Footernav from "../components/FooterClient.vue";
import BreadCrumb from "../components/BreadCrumb.vue";
</script>
