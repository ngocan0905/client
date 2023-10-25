<template>
  <div class="grid grid-cols-12">
    <SideNavDashBoard class="col-span-2" />
    <div class="col-span-10 h-screen overflow-auto">
      <div class="h-16 bg-gray-300 w-full fixed shadow-xl"></div>
      <div class="mx-4 pt-20"><BreadCrumb /><slot></slot></div>
    </div>
  </div>
</template>
<script setup>
import BreadCrumb from "../components/BreadCrumb.vue";
import SideNavDashBoard from "../components/SideNavDashBoard.vue";
</script>
