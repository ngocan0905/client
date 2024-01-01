<template>
  <Vue3Marquee :pause-on-hover="true" class="py-2 overflow-hidden bg-white rounded-lg">
    <img class="mx-4 h-36 w-auto object-cover" src="../assets/logo/asus-logo.png" alt="" />
    <img class="mx-4 h-20 w-auto object-cover" src="../assets/logo/hp-logo.png" alt="" />
    <img class="mx-4 h-20 w-auto object-cover" src="../assets/logo/Apple-logo.png" alt="" />
    <img class="mx-4 h-20 w-auto object-cover" src="../assets/logo/lenovo-logo.png" alt="" />
    <img class="mx-4 h-20 w-auto object-cover" src="../assets/logo/oppo-logo.png" alt="" />
    <img class="mx-4 h-12 w-auto object-cover" src="../assets/logo/realme-logo.png" alt="" />
    <img class="mx-4 h-20 w-auto object-cover" src="../assets/logo/xiaomi-logo.png" alt="" />
  </Vue3Marquee>
</template>
<script setup>
import { Vue3Marquee } from "vue3-marquee";
</script>
