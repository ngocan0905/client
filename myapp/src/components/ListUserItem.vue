<template>
  <div class="col-span-2">{{ user.firstName + " " + user.lastName }}</div>
  <div class="col-span-2">{{ user.email }}</div>

  <div class="col-span-2">{{ user.mobile }}</div>
  <div class="flex col-span-1 justify-between">
    <div
      class="rounded-lg px-2"
      :class="user.role === 'admin' ? 'border border-red-500' : 'border border-green-500'"
    >
      {{ user.role }}
    </div>
    <div v-show="user.isBlocked">
      <LockClosedIcon class="w-6 h-6 text-gray-600" />
    </div>
  </div>
  <div class="col-span-4 text-center">Created at : {{ formatDate(user.createdAt) }}</div>
  <div class="flex col-span-1 justify-end">
    <Menu as="div" class="relative inline-block text-left mr-4">
      <MenuButton class="flex flex-col w-full items-center justify-center">
        <Cog8ToothIcon class="w-6 h-6 text-gray-600" />
      </MenuButton>
      <MenuItems
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
        <MenuItem v-if="!user.isBlocked" v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-gray-500 text-white' : 'text-gray-900',
              'flex w-full items-center rounded-md px-2 py-2 text-sm ',
            ]"
          >
            <LockClosedIcon class="w-5 h-5 mr-3" />
            <div>Block</div>
          </button>
        </MenuItem>
        <MenuItem v-else v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-gray-500 text-white' : 'text-gray-900',
              'flex w-full items-center rounded-md px-2 py-2 text-sm ',
            ]"
          >
            <LockOpenIcon class="w-5 h-5 mr-3" />
            <div>Unblock</div>
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-gray-500 text-white' : 'text-gray-900',
              'flex w-full items-center rounded-md px-2 py-2 text-sm ',
            ]"
          >
            <TrashIcon class="w-5 h-5 mr-3" />
            <div>Delete</div>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>
<script setup>
import {
  Cog8ToothIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
const { user } = defineProps(["user"]);
function formatDate(date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}
</script>
