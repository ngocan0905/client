<template>
  <div class="text-center text-[28px] mb-4 font-bold">Register</div>
  <div class="px-6 pb-1.5 text-[15px]">First Name</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder=""
      v-model:input="firstName"
      inputType="text"
      :autoFocus="true"
      :error="errors && errors.firstName ? errors.firstName[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Last Name</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder=""
      v-model:input="lastName"
      inputType="text"
      :autoFocus="true"
      :error="errors && errors.lastName ? errors.lastName[0] : ''"
    />
  </div>
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
  <div class="px-6 pb-1.5 text-[15px]">Phone Number</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="phoneNumber"
      inputType="number"
      :autoFocus="true"
      :error="errors && errors.phoneNumber ? errors.phoneNumber[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Password</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Password"
      v-model:input="password"
      inputType="password"
      :error="errors && errors.password ? errors.password[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Confirm Password</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Confirm Password"
      v-model:input="confirmPassword"
      inputType="password"
      :error="errors && errors.confirmPassword ? errors.confirmPassword[0] : ''"
    />
  </div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!email || !password || !confirmPassword || !lastName || !firstName"
      :class="
        !email || !password || !confirmPassword || !lastName || !firstName
          ? 'bg-gray-200'
          : 'bg-gray-800'
      "
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
const userStore = useUserStore();
let firstName = ref("");
let lastName = ref("");
let email = ref(null);
let password = ref(null);
let phoneNumber = ref(null);
let confirmPassword = ref(null);
let errors = ref(null);

const register = async () => {
  errors.value = null;
  try {
    await userStore.registerAdmin(firstName.value, lastName.value, email.value, password.value);
  } catch (error) {
    console.log(error);
  }
};
</script>
