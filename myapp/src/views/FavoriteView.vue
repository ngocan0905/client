<template>
  <ClientLayout>
    <div class="w-4/5 h-full">
      <div>
        <div class="text-xl font-bold capitalize text-center py-4 text-gray-900">your favorite</div>
      </div>
      <div class="grid grid-cols-4 gap-5">
        <div class="" v-for="product in products">
          <ProductCard :data="product" />
        </div>
      </div>
    </div>
  </ClientLayout>
</template>

<script setup>
import ProductCard from "../components/ProductCard.vue";
import ClientLayout from "../layouts/ClientLayout.vue";
import { useProductStore } from "../stores/productStore";
import { onMounted, ref } from "vue";
const products = ref([]);
const productStore = useProductStore();

onMounted(async () => {
  await productStore.loadLikedProductIds();
  const idProduct = productStore.likedProductIds;
  for (let id of idProduct) {
    await productStore.getProductById(id);
    products.value.push(productStore.productById);
  }

  console.log(products.value);
});
</script>
