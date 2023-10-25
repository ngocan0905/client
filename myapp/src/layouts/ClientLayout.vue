<template>
  <div class="">
    <headernav />

    <div class="flex flex-col items-center bg-gray-100 min-h-screen">
      <div>
        <BreadCrumb />
      </div>
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
