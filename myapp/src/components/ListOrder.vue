<template>
  <div class="col-span-3 capitalize">
    <div class="font-thin">orderby: {{ data.orderby }}</div>
    <span class="font-bold">{{ getUser.name }}</span>
  </div>
  <div class="col-span-3 flex items-center">{{ getUser.email }}</div>
  <div class="col-span-3">
    <div>Date: {{ data.formattedDate ? data.formattedDate.date : "Loading..." }}</div>
    <div>Time: {{ data.formattedDate ? data.formattedDate.time : "Loading..." }}</div>
  </div>
  <div class="col-span-2 flex items-center font-bold text-green-500">
    $
    <div v-for="item in data" :key="item.id">
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
              @click="handleDeleteCoupon(data._id)"
            >
              <TrashIcon class="w-5 h-5 mr-3" />
              <div>Delete</div>
            </button>
          </MenuItem>
        </MenuItems></transitioncomponent
      >
    </Menu>
  </div>
</template>
<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { Cog8ToothIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import transitioncomponent from "./transitioncomponent.vue";
import { useUserStore } from "../stores/userStore";
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
const { data } = defineProps(["data"]);
const emits = defineEmits(["delete"]);
const userStore = useUserStore();
const getUser = ref({
  name: "",
  email: "",
});
const currentPage = ref(1);
const handleDeleteCoupon = (couponId) => {
  emits("delete", couponId);
};
const formatDateTime = () => {
  if (data && data.createdAt) {
    const createdAt = dayjs(data.createdAt);
    // eslint-disable-next-line vue/no-mutating-props
    data.formattedDate = {
      date: createdAt.format("MMMM D, YYYY"),
      time: createdAt.format("HH:mm A"),
    };
  } else {
    // eslint-disable-next-line vue/no-mutating-props
    data.formattedDate = {
      date: null,
      time: null,
    };
  }
};
const getAllOrderFromDatabase = async () => {
  try {
    const getUSerById = await userStore.getUserById(data.orderby);
    getUser.value.name = getUSerById.firstName + " " + getUSerById.lastName;
    getUser.value.email = getUSerById.email;
    formatDateTime();
  } catch (error) {
    console.error(error);
  }
};
onMounted(async () => {
  getAllOrderFromDatabase();
});
</script>
