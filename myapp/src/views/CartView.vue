<template>
  <ClientLayout
    ><div v-if="cart" class="h-screen">
      <div v-for="data in cart.products" :key="data._id" class="mt-36">
        <SectionProductInCart :product="data" />
      </div>
      <div class="capitalize text-lg font-semibold text-center mt-10">
        total price: ${{ cart.cartTotal }}
      </div>

      <RouterLink v-if="cart && cart._id" :to="{ name: 'checkout', params: { id: cart._id } }">
        <div
          class="w-full text-center font-bold mt-10 active:scale-95 px-4 py-2 duration-300 bg-gradient-to-br from-purple-700 to-blue-700 text-white rounded-md text-lg"
        >
          Checkout
        </div>
      </RouterLink>
    </div>
  </ClientLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import ClientLayout from "../layouts/ClientLayout.vue";
import { useUserStore } from "../stores/userStore";
import SectionProductInCart from "../components/SectionProductInCart.vue";
// import { useGeneralStore } from "../stores/generalStore";
// const generalStore = useGeneralStore();
const userStore = useUserStore();
const cart = ref([]);
// const acceptCoupon = ref(false);
// const codPayment = ref(true);
onMounted(async () => {
  cart.value = await userStore.loadProductInCart();
});

// const checkoutOrder = async () => {
//   try {
//     generalStore.isLoading = true;
//     const checkout = await userStore.createOder(codPayment.value, acceptCoupon.value);
//     if (checkout) {
//       generalStore.isLoading = false;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
</script>
<style></style>
