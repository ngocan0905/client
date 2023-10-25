<template>
  <div class="">
    <TransitionComponent>
      <MenuItems
        class="absolute right-5 mt-2 w-56 origin-top-right rounded-md rounded-tr-none bg-white"
      >
        <div v-show="!isLogged" class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="toggleLoginUser()"
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

        <div v-show="isLogged" class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="toggleLogoutUser()"
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
        <div v-show="isLogged" class="px-1 py-1">
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
</template>

<script setup>
import { MenuItems, MenuItem } from "@headlessui/vue";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/solid";
import { useUserStore } from "../stores/userStore";
import { useGeneralStore } from "../stores/generalStore";
import TransitionComponent from "./transitioncomponent.vue";
import jsCookie from "js-cookie";
import { onMounted, ref } from "vue";
const userStore = useUserStore();
const isLogged = ref(false);
const generalStore = useGeneralStore();
const user = jsCookie.get("user");
onMounted(() => {
  user ? (isLogged.value = true) : (isLogged.value = false);
});
const toggleLoginUser = () => {
  generalStore.isLoginOpen = true;
};
const toggleLogoutUser = async () => {
  generalStore.isLoading = true;
  try {
    await userStore.logoutUser();
    const user = await jsCookie.get("user");
    if (!user) {
      location.reload();
    } else {
      generalStore.isLoading = false;
      generalStore.isLoginOpen = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
