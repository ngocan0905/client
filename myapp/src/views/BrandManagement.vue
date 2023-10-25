<template>
  <AdminLayout>
    <div>
      <div class="grid grid-cols-12 my-4">
        <div
          class="col-span-3 border-2 border-gray-800 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Brand Total : {{ listBrand.length }}
        </div>
      </div>
      <div
        v-for="brand in listBrand"
        :key="brand._id"
        class="py-2 px-4 border-b grid grid-cols-12 text-lg"
      >
        <ListBrand :data="brand" />
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import ListBrand from "../components/ListBrand.vue";
import { useGeneralStore } from "../stores/generalStore";
const generalStore = useGeneralStore();
const listBrand = ref([]);
onMounted(async () => {
  listBrand.value = await generalStore.getBrand();
});
</script>
