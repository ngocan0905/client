<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative bg-white w-full max-w-[470px] h-[70%] p4 rounded-lg">
      <div class="w-full flex justify-end">
        <button class="p-1.5 rounded-full bg-gray-100">
          <XMarkIcon class="w-7 h-7" @click="generalStore.isAdminLoginOpen = false" />
        </button>
      </div>
      <Login v-if="isRegister" v-show="!adminToken" />
      <Register v-else />
      <div class="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
        <span class="text-[14px] text-gray-600" v-show="!adminToken">Don't have an account?</span>
        <button @click="isRegister = !isRegister" class="text-[14px] font-semibold pl-1">
          <span v-if="isRegister">Sign up</span><span v-else v-show="!adminToken">Login</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { onMounted, ref } from "vue";
import Login from "./LoginAdmin.vue";
import Register from "./RegisterAdmin.vue";
import { useGeneralStore } from "../stores/generalStore";
import jsCookie from "js-cookie";

const generalStore = useGeneralStore();
let isRegister = ref(true);
const adminToken = jsCookie.get("admin");
onMounted(() => {
  if (adminToken) {
    isRegister.value = false;
  }
});
</script>
