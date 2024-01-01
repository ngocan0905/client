<template>
  <router-view></router-view>
  <CreateAdminOverlay v-if="generalStore.isCreateUserOpen" />
  <CreateProductOverlay v-if="generalStore.isCreateProductOpen" />
  <CreateProductCategoryOverlay v-if="generalStore.isCreateProductCategoryOpen" />
  <CreateBlogOverlay v-if="generalStore.isCreateBlogOpen" />
  <CreateBlogCategoryOverlay v-if="generalStore.isCreateBlogCategoryOpen" />
  <CreateBrandOverlay v-if="generalStore.isCreateBrandOpen" />
  <CreateCouponOverlay v-if="generalStore.isCreateCouponOpen" />
  <CreateTag v-if="generalStore.isCreateTagProduct" />
  <LoadingOverlay v-if="generalStore.isLoading" />
</template>

<script setup>
import CreateBlogCategoryOverlay from "./components/CreateBlogCategory.vue";
import CreateBlogOverlay from "./components/CreateBlog.vue";
import CreateProductCategoryOverlay from "./components/CreateProductCategory.vue";
import CreateProductOverlay from "./components/CreateProduct.vue";
import CreateBrandOverlay from "./components/CreateBrand.vue";
import CreateCouponOverlay from "./components/CreateCoupon.vue";
import LoadingOverlay from "./components/LoadingOverlay.vue";
import { useGeneralStore } from "./stores/generalStore";
import CreateAdminOverlay from "./components/CreateAdmin.vue";
import CreateTag from "./components/CreateTag.vue";
const generalStore = useGeneralStore();
</script>
<style>
.glassmorphism-container {
  background: rgba(255, 255, 255, 0.1); /* Adjust alpha for background transparency */
  backdrop-filter: blur(10px); /* Adjust blur strength as needed */
  border-radius: 15px; /* Optional: Adjust border radius */
  padding: 20px; /* Optional: Add padding as needed */
  /* Additional styles for positioning, sizing, etc. */
}
.glassmorphism-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: border-color 0.3s ease-in-out;
}

.glassmorphism-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
}
::-webkit-scrollbar {
  display: none;
}
</style>
