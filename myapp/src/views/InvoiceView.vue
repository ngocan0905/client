<template>
  <div class="flex flex-col items-center justify-center w-full h-screen bg-gray-200">
    <div class="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto">
      <h1 class="font-bold text-2xl my-4 text-center text-blue-600">Tech World</h1>
      <hr class="mb-2" />
      <div class="flex justify-between mb-6">
        <h1 class="text-lg font-bold">Invoice</h1>
        <div class="text-gray-700">
          <div>
            Date: {{ invoiceData.formattedDate ? invoiceData.formattedDate.date : "Loading..." }}
          </div>
          <div>
            Time: {{ invoiceData.formattedDate ? invoiceData.formattedDate.time : "Loading..." }}
          </div>
          <div>Invoice #: {{ invoiceData._id }}</div>
        </div>
      </div>
      <div class="mb-8">
        <h2 class="text-lg font-bold mb-4">Bill To:</h2>
        <div class="text-gray-700 mb-2">{{ getUser.name }}</div>
        <div class="text-gray-700">{{ getUser.email }}</div>
      </div>
      <table class="w-full mb-8">
        <thead>
          <tr>
            <th class="text-left font-bold text-gray-700">Description</th>
            <th class="text-right font-bold text-gray-700">Amount</th>
          </tr>
        </thead>
        <tbody v-for="(product, index) of invoiceData.products" :key="index">
          <tr v-for="data in product" :key="data._id">
            <td class="text-left text-gray-700">
              {{ data.title }}
            </td>
            <td class="text-right text-gray-700">
              {{ data.price }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-if="invoiceData.paymentIntent">
            <td class="text-left font-bold text-gray-700">Total</td>
            <td class="text-right font-bold text-gray-700">
              ${{ invoiceData.paymentIntent.amount }}
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="text-gray-700 mb-2">Thank you for your order!</div>
    </div>
    <RouterLink
      :to="{ name: 'home' }"
      class="py-2 px-4 rounded text-gray-900 font-extrabold text-lg mt-4 uppercase bg-gray-300 hover:text-gray-200 hover:bg-gray-800 duration-200 hover:scale-105 active:scale-95"
    >
      back to home
    </RouterLink>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/userStore";
import dayjs from "dayjs";
const userStore = useUserStore();
const invoiceData = ref({});
const getUser = ref({
  name: "",
  email: "",
});

onMounted(async () => {
  invoiceData.value = await userStore.getOrder();
  formatDateTime();
  try {
    const getUSerById = await userStore.getUserById(invoiceData.value.orderby);
    getUser.value.name = getUSerById.firstName + " " + getUSerById.lastName;
    getUser.value.email = getUSerById.email;
    console.log(invoiceData.value.products);
  } catch (error) {
    console.error(error);
    throw new Error("lỗi khi lấy thông tin user qua id");
  }
  console.log(invoiceData.value);
});
const formatDateTime = () => {
  // Kiểm tra nếu invoiceData đã được cung cấp từ API
  if (invoiceData.value && invoiceData.value.createdAt) {
    const createdAt = dayjs(invoiceData.value.createdAt); // Chuyển đổi thành đối tượng ngày sử dụng day.js
    invoiceData.value.formattedDate = {
      date: createdAt.format("MMMM D, YYYY"), // Định dạng ngày tháng năm (ví dụ: January 1, 2023)
      time: createdAt.format("HH:mm A"), // Định dạng thời gian (ví dụ: 08:30 PM)
    };
  }
};
</script>
