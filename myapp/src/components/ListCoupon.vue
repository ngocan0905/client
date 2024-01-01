<template>
  <div class="col-span-4 capitalize">{{ data.name }}</div>
  <div class="col-span-2 flex justify-center">Discount: {{ data.discount }}%</div>
  <div class="col-span-2 flex justify-center">Status: {{ displayStatus(data.isUsed) }}</div>
  <div class="col-span-3 flex justify-center">Expiry at : {{ formatDate(data.expiry) }}</div>
  <div class="col-span-1 flex justify-end">
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
const { data } = defineProps(["data"]);
const emits = defineEmits(["delete"]);
function formatDate(date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}
const handleDeleteCoupon = (couponId) => {
  emits("delete", couponId);
};
function displayStatus(isUsed) {
  return isUsed ? "Used" : "Not Used";
}
</script>
