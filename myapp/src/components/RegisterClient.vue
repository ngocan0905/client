<template>
  <div class="text-center text-[28px] mb-4 font-bold">Register</div>
  <div>First name</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Your first name"
      v-model:input="firstName"
      inputType="text"
      :autoFocus="true"
    />
  </div>
  <div>Last name</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Your first name"
      v-model:input="lasttName"
      inputType="text"
      :autoFocus="true"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Email address</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="email"
      inputType="email"
      :autoFocus="true"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Mobile phone</div>
  <div class="px-6 pb-2">
    <TextInput placeholder="Mobile" v-model:input="mobile" inputType="text" />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Password</div>
  <div class="px-6 pb-2">
    <TextInput placeholder="Confirm Password" v-model:input="password" inputType="password" />
  </div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!email || !mobile || !password"
      :class="!email || !mobile || !password ? 'bg-gray-200' : 'bg-[#f02c56]'"
      @click="register()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Sign up
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
let firstName = ref(null);
let lasttName = ref(null);
let email = ref(null);
let password = ref(null);
let mobile = ref(null);

const register = async () => {
  try {
    await userStore.registerUser(
      firstName.value,
      lasttName.value,
      email.value,
      mobile.value,
      password.value
    );
    console.log(email);
    generalStore.isLoginOpen = false;
  } catch (error) {
    console.log(error);
  }
};
</script>
