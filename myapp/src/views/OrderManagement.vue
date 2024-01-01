<template>
  <AdminLayout>
    <div class="w-full h-full relative">
      <div class="flex items-center justify-evenly my-2">
        <div
          class="border-2 border-gray-800 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Total order: {{ totalOrders }}
        </div>
        <div
          class="border-2 border-gray-800 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Total revenue: {{ totalRevenue.toFixed(2) }}
        </div>
      </div>
      <div
        v-for="order in listOrder"
        :key="order._id"
        class="py-1 px-4 border-b grid grid-cols-12 text-lg my-3"
      >
        <div class="col-span-4 capitalize">
          <div class="font-thin">orderby: {{ order.orderby }}</div>
          <span class="font-bold">{{ getUserByOrderId(order._id)?.name }}</span>
        </div>
        <div class="col-span-3 flex items-center">{{ getUserByOrderId(order._id)?.email }}</div>
        <div class="col-span-3">
          <div>Date: {{ order.formattedDate ? order.formattedDate.date : "Loading..." }}</div>
          <div>Time: {{ order.formattedDate ? order.formattedDate.time : "Loading..." }}</div>
        </div>
        <div class="col-span-1 flex items-center font-bold text-green-500">
          $
          <div v-for="item in order" :key="item.id">
            {{ item.amount }}
          </div>
        </div>

        <div class="col-span-1 flex justify-end items-center">
          <Menu as="div" class="relative inline-block text-left mr-4">
            <MenuButton class="flex flex-col w-full items-center">
              <Cog8ToothIcon class="w-6 h-6 text-gray-600" />
            </MenuButton>
            <transitioncomponent
              ><MenuItems
                class="absolute min-w-[150px] right-5 origin-top-right rounded-md rounded-tr-none bg-gray-200 drop-shadow-sm"
              >
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-500 text-white' : 'text-gray-900',
                      'flex w-full items-center rounded-md px-2 py-2 text-sm ',
                    ]"
                  >
                    <PencilIcon class="w-5 h-5 mr-3" />
                    <div>Edit</div>
                  </button>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-500 text-white' : 'text-gray-900',
                      'flex w-full items-center rounded-md px-2 py-2 text-sm ',
                    ]"
                    @click="handleDeleteCoupon(order._id)"
                  >
                    <TrashIcon class="w-5 h-5 mr-3" />
                    <div>Delete</div>
                  </button>
                </MenuItem>
              </MenuItems></transitioncomponent
            >
          </Menu>
        </div>
      </div>
      <div class="w-full flex justify-between absolute -bottom-4">
        <button
          :disabled="currentPage === 1"
          @click="currentPage -= 1"
          class="border px-6 py-2 font-semibold rounded-md hover:bg-gray-200 hover:scale-105 active:scale-95"
        >
          next
        </button>
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage += 1"
          class="border px-6 py-2 font-semibold rounded-md hover:bg-gray-200 hover:scale-105 active:scale-95"
        >
          previous
        </button>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { Cog8ToothIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import transitioncomponent from "../components/transitioncomponent.vue";
import { useUserStore } from "../stores/userStore";
const userStore = useUserStore();
import dayjs from "dayjs";
const listOrder = ref([]);
const totalOrders = ref(0);
const totalRevenue = ref(0);
const currentPage = ref(1);
const totalPages = ref(0);
const users = ref([]);
onMounted(async () => {
  await loadOrders();
});
const getUserByOrderId = computed(() => (orderId) => {
  const userObj = users.value.find((user) => user.orderId === orderId);
  return userObj ? userObj.user : { name: "Loading...", email: "Loading..." };
});
const loadOrders = async () => {
  const response = await userStore.getAllOrder(currentPage.value);
  totalPages.value = response.totalPages;
  totalRevenue.value = response.totalRevenue;
  totalOrders.value = response.totalOrders;
  listOrder.value = response.soldOrders;

  listOrder.value.forEach((order) => {
    getUserOfOrder(order.orderby, order._id); // Truyền thêm order._id để xác định người dùng cho đơn hàng cụ thể
    formatDateTime(order);
  });
};
watch(currentPage, () => {
  loadOrders();
});
const getUserOfOrder = async (id, orderId) => {
  try {
    const getUSerById = await userStore.getUserById(id);
    const user = {
      name: getUSerById.firstName + " " + getUSerById.lastName,
      email: getUSerById.email,
    };
    users.value.push({ orderId, user }); // Lưu thông tin người dùng vào mảng users kèm theo orderId
  } catch (error) {
    console.error(error);
  }
};
const formatDateTime = (order) => {
  if (order && order.createdAt) {
    const createdAt = dayjs(order.createdAt);
    order.formattedDate = {
      date: createdAt.format("MMMM D, YYYY"),
      time: createdAt.format("HH:mm A"),
    };
  } else {
    order.formattedDate = {
      date: null,
      time: null,
    };
  }
};
</script>
