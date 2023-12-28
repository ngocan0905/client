<template>
  <div class="grid grid-cols-12">
    <SideNavDashBoard class="col-span-2" />
    <div class="col-span-10 overflow-auto">
      <div class="mx-4 h-[90%]"><BreadCrumb /><slot></slot></div>
    </div>
  </div>
</template>
<script setup>
import BreadCrumb from "../components/BreadCrumb.vue";
import SideNavDashBoard from "../components/SideNavDashBoard.vue";
</script>
