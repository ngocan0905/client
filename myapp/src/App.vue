<template>
  <router-view></router-view>
  <AuthOverlay v-if="generalStore.isLoginOpen" />
  <AdminAuthOverlay v-if="generalStore.isAdminLoginOpen" />
  <CreateProductOverlay v-if="generalStore.isCreateProductOpen" />
  <LoadingOverlay v-if="generalStore.isLoading" />
</template>

<script setup>
import AdminAuthOverlay from "./components/AdminAuthOverlay.vue";
import AuthOverlay from "./components/AuthOverlay.vue";
import CreateProductOverlay from "./components/CreateProductOverlay.vue";
import LoadingOverlay from "./components/LoadingOverlay.vue";
import { useGeneralStore } from "./stores/generalStore";
const generalStore = useGeneralStore();
</script>
