<template>
  <ClientLayout>
    <div class="w-4/5 h-full">
      <div>
        <div class="text-xl font-bold capitalize text-center py-4 text-gray-900">your favorite</div>
      </div>
      <div class="grid grid-cols-4 gap-5">
        <div class="" v-for="product in validProducts" :key="product._id">
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
import { onMounted, ref, computed } from "vue";
const products = ref([]);
const productStore = useProductStore();
onMounted(async () => {
  productStore.restoreWishListFromCookie();
  const wishlist = productStore.wishlist;
  for (let id of wishlist) {
    await productStore.getProductById(id);
    products.value.push(productStore.productById);
  }
  // await jsCookie.set("wishlist", wishlist);
  console.log(productStore.wishlist);
});

const validProducts = computed(() => {
  return products.value.filter((product) => product !== null);
});
</script>
