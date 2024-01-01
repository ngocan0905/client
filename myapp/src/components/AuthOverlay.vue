<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-60"
  >
    <div
      class="pointer-events-auto relative glassmorphism-container w-full max-w-[470px] h-[70%] p4 rounded-lg"
    >
      <div class="w-full flex justify-end">
        <button class="p-1.5 rounded-full glassmorphism-card">
          <XMarkIcon class="w-7 h-7" @click="closeForm()" />
        </button>
      </div>
      <Login v-if="isRegister" />
      <Register v-else />
      <div class="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
        <span class="text-[14px]">Don't have an account?</span>
        <button @click="isRegister = !isRegister" class="text-[14px] font-bold pl-1">
          <span v-if="isRegister">Sign up</span><span v-else>Login</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import Login from "./LoginClient.vue";
import Register from "./RegisterClient.vue";

let isRegister = ref(true);

const emits = defineEmits(["closeForm"]);

const closeForm = () => {
  emits("closeForm");
};
</script>
