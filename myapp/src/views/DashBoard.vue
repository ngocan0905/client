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
import { useUserStore } from "../stores/userStore";
const generalStore = useGeneralStore();
const userStore = useUserStore();
const userId = localStorage.getItem("userId");
onMounted(() => {
  console.log(userId);
});
</script>
