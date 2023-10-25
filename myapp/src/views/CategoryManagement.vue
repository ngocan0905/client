<template>
  <AdminLayout>
    <div>
      <div class="grid grid-cols-12 my-4">
        <div
          class="col-span-3 border-2 border-gray-800 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Product Category Total : {{ listProductCategory.length }}
        </div>
      </div>
      <div
        v-for="cate in listProductCategory"
        :key="cate._id"
        class="py-2 px-4 border-b grid grid-cols-12 text-lg"
      >
        <ListProductCategory :data="cate" />
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import ListProductCategory from "../components/ListProductCategory.vue";
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();
const listProductCategory = ref([]);
onMounted(async () => {
  listProductCategory.value = await productStore.getAllCategoryProduct();
});
</script>
