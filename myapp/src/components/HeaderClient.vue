<template>
  <div class="flex flex-col items-center bg-gray-900">
    <div class="text-white w-4/5 flex items-center py-3 font-mono">
      <div class="text-4xl w-1/3 flex">
        <a class="cursor-pointer" href="/">NGOCAN</a>
      </div>
      <div class="w-1/3 flex items-center bg-white">
        <input
          type="text"
          class="w-full py-1 text-sm outline-none text-gray-800 px-2 placeholder:text-xs"
          placeholder="Search product here..."
        />
        <MagnifyingGlassIcon class="h-8 w-8 cursor-pointer text-black" />
      </div>
      <div class="w-1/3">
        <div class="flex w-full justify-end text-sm relative">
          <router-link
            v-show="userIsLogged"
            :to="{ name: 'favorite' }"
            class="flex flex-col items-center mr-4"
          >
            <div class="icon-with-tooltip">
              <HeartIcon class="h-7 w-7 cursor-pointer" />
              <div class="tooltip">Favorite</div>
            </div>
          </router-link>
          <Menu as="div" class="relative inline-block text-left mr-4">
            <div>
              <MenuButton class="flex flex-col w-full justify-center items-center mr-4">
                <div class="icon-with-tooltip">
                  <UserIcon class="w-7 h-7" />
                  <div class="tooltip">User</div>
                </div>
              </MenuButton>
            </div>
            <ProfileMenu />
          </Menu>

          <router-link v-show="userIsLogged" :to="{ name: 'cart' }">
            <div class="icon-with-tooltip">
              <ShoppingCartIcon class="h-7 w-7 cursor-pointer" />
              <div class="tooltip">Cart</div>
            </div>
          </router-link>
          <CartModal />
        </div>
      </div>
    </div>
    <hr class="w-full" />
    <div class="text-white w-4/5 flex items-center py-3 uppercase">
      <div class="text-md w-1/5 flex items-center border-r-4 border-double">
        Shop categories
        <ChevronDownIcon class="h-3 w-3 ml-4" />
      </div>
      <div class="w-1/3">
        <div class="flex w-full justify-evenly">
          <router-link to="/">home</router-link>
          <router-link :to="{ name: 'store' }">store</router-link>
          <router-link :to="{ name: 'blog' }">blogs</router-link>
          <router-link :to="{ name: 'contact' }">contact</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  HeartIcon,
  UserIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/solid";
import { onMounted, ref } from "vue";
import ProfileMenu from "./ProfileMenu.vue";
import jsCookie from "js-cookie";
import { Menu, MenuButton } from "@headlessui/vue";
const userIsLogged = ref(false);
onMounted(() => {
  const user = jsCookie.get("user");
  if (user) {
    userIsLogged.value = true;
  }
});
</script>
<style scoped>
.icon-with-tooltip {
  position: relative;
  display: inline-block;
}

.icon-with-tooltip:hover .tooltip {
  display: block;
}

.tooltip {
  display: none;
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translateX(-50%);
  background-color: rgb(55 65 81);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  z-index: 1;
  white-space: nowrap;
}
</style>
