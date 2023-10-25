<template>
  <ClientLayout
    ><div v-if="cart">
      <div v-for="product in cart.products" :key="product._id">
        <SectionProductInCart :data="product" />
      </div>
      <div class="mt-10">
        <div class="capitalize text-lg font-semibold">total price: {{ cart.cartTotal }}</div>
        <div>
          <label for="coupon"> Apply Coupon</label>
          <input type="checkbox" v-model="acceptCoupon" class="ml-3" />
          <div v-if="acceptCoupon" class="flex items-center my-2">
            <input
              type="text"
              v-model="charCoupon"
              placeholder="coupon code"
              class="border border-gray-500 outline-none rounded py-1 mr-4 px-2"
            />
            <button
              class="py-1 px-3 bg-gray-400 hover:bg-gray-800 hover:text-gray-100 duration-500 rounded"
            >
              Apply
            </button>
          </div>
        </div>
        <div class="capitalize text-lg font-semibold">final price:</div>
      </div>
    </div>
  </ClientLayout>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import ClientLayout from "../layouts/ClientLayout.vue";
import { useUserStore } from "../stores/userStore";
import SectionProductInCart from "../components/SectionProductInCart.vue";
const userStore = useUserStore();
const cart = ref();
const acceptCoupon = ref(false);
const charCoupon = ref("");
onBeforeMount(async () => {
  cart.value = await userStore.loadProductInCart();

  console.log(cart.value);
});
</script>
<style></style>
