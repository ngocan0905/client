<template>
  <div class="text-center text-[28px] mb-4 font-bold">Log in</div>
  <div class="px-6 pb-1.5 text-[15px]">Email address</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="email"
      inputType="email"
      :autoFocus="true"
      :error="errors && errors.email ? errors.email[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Password</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Password"
      v-model:input="password"
      inputType="password"
      @keydown.enter="login()"
    />
  </div>
  <div class="px-6 text-[12px] text-white">Forgot password?</div>
  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!email || !password"
      :class="!email || !password ? 'hover:cursor-not-allowed' : 'glassmorphism-card'"
      @click="login()"
      class="w-full text-[17px] font-semibold py-3 rounded-sm"
    >
      Login
    </button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import TextInput from "./TextInput.vue";
import { useUserStore } from "../stores/userStore";
import { useGeneralStore } from "../stores/generalStore";
const userStore = useUserStore();
const generalStore = useGeneralStore();
let email = ref(null);
let password = ref(null);
let errors = ref(null);
const login = async () => {
  errors.value = null;
  try {
    generalStore.isLoading = true;
    const user = await userStore.loginUser(email.value, password.value);

    if (user) {
      setTimeout(() => {
        generalStore.isLoading = false;
        generalStore.isLoginOpen = false;
        location.reload();
      }, 1000);
    } else {
      console.log("loi");
    }
  } catch (error) {
    errors.value = error;
  }
};
</script>
