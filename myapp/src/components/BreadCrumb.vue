<template>
  <nav class="flex items-center text-gray-500">
    <template v-if="route.matched.length > 0"
      ><router-link to="/">Home</router-link>
      <router-link v-for="(routeItem, index) in route.matched" :key="index" :to="routeItem.path">
        {{ routeItem.meta.breadcrumb || routeItem.name }}
      </router-link>
    </template>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped>
/* Thêm các lớp tailwind CSS theo ý muốn của bạn */
</style>
