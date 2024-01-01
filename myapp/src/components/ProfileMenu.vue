<template>
  <div>
    <TransitionComponent>
      <MenuItems
        class="absolute right-5 mt-2 w-56 origin-top-right rounded-md rounded-tr-none bg-white"
      >
        <!-- Nếu không có ai đăng nhập -->
        <div v-if="!isAdminLogged && !isClientLogged" class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="openLoginForm()"
              :class="[
                active ? 'bg-gray-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <ArrowLeftOnRectangleIcon
                :active="active"
                class="mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Login
            </button>
          </MenuItem>
        </div>

        <!-- Nếu user hoặc admin đang đăng nhập -->
        <div v-if="isAdminLogged || isClientLogged" class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="openLoginForm()"
              :class="[
                active ? 'bg-gray-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <PencilSquareIcon
                :active="active"
                class="mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Edit user
            </button>
          </MenuItem>
        </div>

        <!-- Nếu admin đăng nhập -->
        <div v-if="isAdminLogged" class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <RouterLink
              :to="{ name: 'dashboard' }"
              :class="[
                active ? 'bg-gray-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <WindowIcon :active="active" class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              Dashboard
            </RouterLink>
          </MenuItem>
        </div>

        <!-- Nếu user hoặc admin đang đăng nhập -->
        <div v-if="isAdminLogged || isClientLogged" class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="toggleLogoutUser()"
              :class="[
                active ? 'bg-gray-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <ArrowRightOnRectangleIcon
                :active="active"
                class="mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Logout
            </button>
          </MenuItem>
        </div>

        <!-- Các menu khác -->
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-gray-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <Cog8ToothIcon
                :active="active"
                class="mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Setting
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </TransitionComponent>
  </div>
  <AuthOverlay v-if="generalStore.isLoginOpen" @closeForm="closeLoginForm" />
</template>

<script setup>
import { MenuItems, MenuItem } from "@headlessui/vue";
import AuthOverlay from "./AuthOverlay.vue";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
  PencilSquareIcon,
  WindowIcon,
} from "@heroicons/vue/24/solid";

import { useUserStore } from "../stores/userStore";
import TransitionComponent from "./transitioncomponent.vue";
import { onMounted, ref } from "vue";
import { useGeneralStore } from "../stores/generalStore";
import jsCookie from "js-cookie";
const generalStore = useGeneralStore();
const userStore = useUserStore();
const isAdminLogged = ref(false);
const isClientLogged = ref(false);
onMounted(() => {
  const adminToken = jsCookie.get("admin");
  const clientToken = jsCookie.get("user");
  if (adminToken) {
    isAdminLogged.value = true;
  }
  if (clientToken) {
    isClientLogged.value = true;
  }
});
const openLoginForm = () => {
  generalStore.isLoginOpen = true;
};
const closeLoginForm = () => {
  generalStore.isLoginOpen = false;
};
const toggleLogoutUser = async () => {
  try {
    await userStore.logout();
    location.reload();
    alert("Bạn muốn đăng xuất không");
  } catch (error) {
    console.log(error);
  }
};
</script>
