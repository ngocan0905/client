<template>
  <AdminLayout>
    <div>
      <div class="grid grid-cols-12 my-4">
        <div
          class="col-span-3 border-2 border-gray-800 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Product total : {{ listProduct.length }}
        </div>
      </div>
      <div
        v-for="product in listProduct"
        :key="product._id"
        class="py-2 px-4 border-b grid grid-cols-12 text-lg"
      >
        <ListProductItem :data="product" @deleteProduct="updateListProduct" />
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";

import { useProductStore } from "../stores/productStore";
import ListProductItem from "../components/ListProductItem.vue";
import { useGeneralStore } from "../stores/generalStore";
const productStore = useProductStore();
const generalStore = useGeneralStore();
const listProduct = ref([]);

onMounted(async () => {
  listProduct.value = await productStore.getAllProduct();
});
const updateListProduct = async (productId) => {
  try {
    generalStore.isLoading = true;
    const deleted = await productStore.deleteProductById(productId);
    if (deleted) {
      const updatedList = listProduct.value.filter((product) => product._id !== productId);
      listProduct.value = updatedList;
      generalStore.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
