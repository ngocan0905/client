<template>
  <div class="">
    <div
      class="flex items-center justify-between w-full max-w-7xl mx-auto py-3 px-4 md:px-8 text-white"
    >
      <div class="flex items-center w-1/3 md:w-1/4">
        <router-link class="text-4xl font-extrabold" to="/">Tech World</router-link>
      </div>
      <div class="w-1/2 md:w-2/4 relative duration-300">
        <input
          type="text"
          id="search"
          name="search"
          v-model="querySearch"
          @input="handleSearchProduct"
          class="w-full rounded-full py-2 pl-4 pr-12 text-sm outline-none bg-inherit border text-gray-300 placeholder-gray-500"
          placeholder="Search product here..."
        />
        <MicrophoneIcon
          @click="startListening()"
          class="h-8 w-8 cursor-pointer absolute top-0.5 right-0 text-gray-300 p-1 hover:bg-gray-300 rounded-full mr-1 duration-300"
        />
        <section
          id="result"
          v-if="resultQuery.length > 0"
          class="absolute h-auto w-full bg-gray-100 shadow-lg rounded-lg text-gray-600 top-12 overflow-hidden"
        >
          <ul v-for="product in resultQuery" :key="product._id" class="hover:bg-gray-200">
            <RouterLink
              :to="{ name: 'product', params: { id: product._id } }"
              class="flex items-center justify-between py-1 px-4"
            >
              <span>{{ product.title }}</span>
              <div v-for="img in product.images[0]" :key="img.public_id">
                <img :src="img.url" class="h-12 w-auto" alt="" />
              </div>
            </RouterLink>
          </ul>
        </section>
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
          <!-- <CartModal /> -->
        </div>
      </div>
    </div>
    <hr class="w-full" />
    <div class="text-white justify-center flex items-center py-3 uppercase w-full">
      <div class="flex">
        <router-link class="mx-8 font-bold" to="/">home</router-link>
        <router-link class="mx-8 font-bold" :to="{ name: 'store' }">store</router-link>
        <router-link class="mx-8 font-bold" :to="{ name: 'blog' }">blogs</router-link>
        <router-link class="mx-8 font-bold" :to="{ name: 'contact' }">contact</router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { HeartIcon, UserIcon, ShoppingCartIcon, MicrophoneIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
import ProfileMenu from "./ProfileMenu.vue";
import jsCookie from "js-cookie";
import { Menu, MenuButton } from "@headlessui/vue";
import { useProductStore } from "../stores/productStore";
import { RouterLink } from "vue-router";
const userIsLogged = ref(false);
const productStore = useProductStore();
const querySearch = ref("");
const transcript = ref("");
const resultQuery = ref([]);
onMounted(() => {
  const user = jsCookie.get("user");
  if (user) {
    userIsLogged.value = true;
  }
});

const handleSearchProduct = async () => {
  if (transcript.value !== "") {
    querySearch.value = transcript.value;
  }
  if (querySearch.value === "") {
    resultQuery.value = [];
    return;
  }
  const result = await productStore.searchProductByName(querySearch.value);
  resultQuery.value = result;
};
// tiềm kiếm bằng giọng nói
const startListening = () => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "vi-VN";
  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    transcript.value = result;
    handleSearchProduct();
  };
  recognition.start();
};
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

/* Header styles when scrolled */
</style>
