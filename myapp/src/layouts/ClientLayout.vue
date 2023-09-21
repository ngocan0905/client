<template>
  <div>
    <headernav />
    <div class="flex justify-center bg-stone-100">
      <slot></slot>
    </div>
    <Footernav />
  </div>
</template>
<script setup>
import headernav from "../components/Header.vue";
import Footernav from "../components/Footer.vue";
</script>
