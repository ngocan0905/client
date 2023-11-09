<template>
  <AdminLayout>
    <form v-if="data" class="grid grid-cols-12">
      <div class="col-span-3">
        <input type="text" :value="data.title" />
      </div>
    </form>
  </AdminLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import { useProductStore } from "../stores/productStore";
import { useRoute } from "vue-router";
const route = useRoute();
const productStore = useProductStore();
const data = ref(null);
onMounted(async () => {
  data.value = await productStore.getProductById(route.params.id);
  console.log(data.value);
});
</script>
