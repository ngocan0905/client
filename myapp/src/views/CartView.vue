<template>
  <ClientLayout
    ><div v-if="cart" class="min-h-[800px]">
      <div v-for="data in cart.products" :key="data._id">
        <SectionProductInCart :product="data" />
      </div>
      <div class="capitalize text-lg font-semibold text-center mt-10">
        total price: ${{ cart.cartTotal }}
      </div>

      <RouterLink
        v-if="cart && cart._id"
        :to="{ name: 'checkout', params: { id: cart._id } }"
        class="font-bold text-xl capitalize flex justify-center w-full py-2 px-4 bg-gray-600 hover:bg-gray-900 text-white duration-300 mt-10 rounded-md"
      >
        checkout
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
const finalPrice = ref();
// const codPayment = ref(true);
onMounted(async () => {
  cart.value = await userStore.loadProductInCart();
  console.log(cart.value);
  finalPrice.value = cart.value.cartTotal;
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
