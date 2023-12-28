<template>
  <div
    class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32"
  >
    <button @click="goBack" class="text-xl font-bold text-gray-800 flex items-center">
      <ArrowSmallLeftIcon class="h-6 w-6 mr-2" /><span>Back</span>
    </button>
    <div class="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
      <div class="relative">
        <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4"></ul>
      </div>
    </div>
  </div>
  <div v-if="cart" class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 lg:gap-20">
    <div class="px-4 pt-8">
      <p class="text-xl font-medium">Order Summary</p>
      <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
      <div class="h-96 overflow-auto">
        <div
          v-for="data in cart.products"
          :key="data._id"
          class="mt-8 space-y-3 rounded-lg border p-2 sm:px-6"
        >
          <SectionProductInCheckout :product="data" />
        </div>
      </div>

      <p class="mt-8 text-lg font-medium">Shipping Methods</p>
      <form class="mt-5 grid gap-6">
        <div class="relative" @click="shippingFee = 4">
          <input class="peer hidden" id="radio_1" type="radio" name="radio" checked />
          <span
            class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
          ></span>
          <label
            class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            for="radio_1"
          >
            <div class="ml-5">
              <span class="mt-2 font-semibold"> Economical Delivery</span>
              <p class="text-slate-500 text-sm leading-6">Delivery: 7-10 Days ($4)</p>
            </div>
          </label>
        </div>
        <div class="relative" @click="shippingFee = 8">
          <input class="peer hidden" id="radio_2" type="radio" name="radio" checked />
          <span
            class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
          ></span>
          <label
            class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            for="radio_2"
          >
            <div class="ml-5">
              <span class="mt-2 font-semibold">Fast Delivery</span>
              <p class="text-slate-500 text-sm leading-6">Delivery: 2-4 Days ($8)</p>
            </div>
          </label>
        </div>
      </form>
    </div>
    <div class="pt-8 mx-4 lg:mx-0">
      <form @submit.prevent="submitCoupon">
        <div class="mb-8 p-6 border border-gray-300 rounded">
          <label for="coupon" class="block text-gray-700 text-xl font-bold mb-2"
            >Apply coupon</label
          >
          <div class="relative flex items-center justify-end">
            <input
              type="text"
              id="coupon"
              name="coupon"
              v-model="userCoupon"
              placeholder="Your coupon"
              maxlength="50"
              class="w-full border border-gray-300 rounded p-2 outline-none"
            />
            <button
              type="submit"
              class="absolute bg-gray-300 py-1 px-3 right-1 rounded hover:bg-gray-600 hover:text-white duration-300 font-bold"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <form @submit.prevent="submitPayment">
        <!-- Form fields for billing details -->
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name on Card:</label>
          <input
            v-model="billingDetails.name"
            type="text"
            id="name"
            name="name"
            class="border border-gray-300 p-2 rounded w-full outline-none"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            v-model="billingDetails.email"
            type="email"
            id="email"
            name="email"
            class="border border-gray-300 p-2 rounded w-full outline-none"
          />
        </div>
        <div class="mb-4">
          <label for="card-element" class="block text-gray-700 text-sm font-bold mb-2"
            >Card details:</label
          >
          <div id="card-element" class="border border-gray-300 p-2 rounded"></div>
        </div>
        <!-- Add more fields as needed for billing details -->
        <div class="font-semibold py-2">
          Subtotal : $ <span>{{ cartPrice }}</span>
        </div>
        <hr class="w-full" />
        <div class="font-light py-2">
          Shipping fee : $ <span>{{ shippingFee }}</span>
        </div>
        <hr class="w-full" />
        <div class="text-xl font-semibold py-4">
          Total : $ <span>{{ totalPrice }}</span>
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Payment
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowSmallLeftIcon } from "@heroicons/vue/24/outline";
import { useUserStore } from "../stores/userStore";
import SectionProductInCheckout from "../components/SectionProductInCheckout.vue";
import { loadStripe } from "@stripe/stripe-js";

const router = useRouter();
const userStore = useUserStore();
const cart = ref();
const shippingFee = ref(8);
const userCoupon = ref("");
const usedVoucher = ref(false);

const cartPrice = computed(() => {
  return cart.value.totalAfterDiscount ? cart.value.totalAfterDiscount : cart.value.cartTotal;
});

const totalPrice = computed(() => {
  return cart.value ? cartPrice.value + shippingFee.value : 0;
});

const roundedAmount = computed(() => {
  return Math.round(totalPrice.value);
});

const stripePromise = loadStripe(
  "pk_test_51OMpt3ABlcms0qAXTLB5Ou5bqLLcyNgMWHNNtMffAEPFnrWJXO5Hbv4KzB5CDyQszPYT6EkGMnFujW24m6qhJzCy00zV7cUj2l"
);

const billingDetails = ref({
  name: "",
  email: "",
});

const cardElement = ref(null);

onMounted(async () => {
  cart.value = await userStore.loadProductInCart();
  const stripe = await stripePromise;
  const elements = stripe.elements();
  cardElement.value = elements.create("card");
  cardElement.value.mount("#card-element");
});

const submitCoupon = async () => {
  const apply = await userStore.applyCoupon(userCoupon.value);
  if (apply) {
    usedVoucher.value = true;
  }
};

const submitPayment = async () => {
  try {
    const stripeInstance = await stripePromise;
    const { error, paymentMethod } = await stripeInstance.createPaymentMethod({
      type: "card",
      card: cardElement.value,
      billing_details: {
        name: billingDetails.value.name,
        email: billingDetails.value.email,
      },
    });

    if (error) {
      console.error("Error creating PaymentMethod:", error);
    } else {
      const paymentMethodId = paymentMethod.id;
      const paymentDetails = {
        paymentMethodId: paymentMethodId,
        amount: roundedAmount.value,
        name: billingDetails.value.name,
        email: billingDetails.value.email,
      };

      const orderResponse = await userStore.createOder(paymentDetails);
      if (orderResponse) {
        const clientSecret = orderResponse.clientSecret;
        const confirmResult = await stripeInstance.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodId,
        });
        if (confirmResult.error) {
          console.log(confirmResult.error);
        } else {
          console.log(confirmResult.paymentIntent);
        }
      }
    }
    router.push({ name: "Invoice" });
  } catch (error) {
    console.log("Error processing payment:", error);
  }
};

const goBack = () => {
  router.go(-1);
};
</script>
