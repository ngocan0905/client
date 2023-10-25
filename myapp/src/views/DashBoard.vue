<template>
  <AdminLayout>
    <div>wellcome</div>
  </AdminLayout>
</template>
<script setup>
import { onMounted } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import jsCookie from "js-cookie";
import { useGeneralStore } from "../stores/generalStore";
const generalStore = useGeneralStore();
onMounted(() => {
  const tokenAdmin = jsCookie.get("admin");
  if (!tokenAdmin) {
    generalStore.isAdminLoginOpen = true;
  }
});
</script>
