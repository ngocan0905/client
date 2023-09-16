<template>
  <div>
    <headernav />
    <div class="flex justify-center my-10">
      <slot></slot>
    </div>
    <Footernav />
  </div>
</template>
<script setup>
import headernav from "../components/Header.vue";
import Footernav from "../components/Footer.vue";
</script>
