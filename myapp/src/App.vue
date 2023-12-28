<template>
  <router-view></router-view>
  <AuthOverlay v-if="generalStore.isLoginOpen" />
  <AdminAuthOverlay v-if="generalStore.isAdminLoginOpen" />
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
import AdminAuthOverlay from "./components/AdminAuthOverlay.vue";
import AuthOverlay from "./components/AuthOverlay.vue";
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
