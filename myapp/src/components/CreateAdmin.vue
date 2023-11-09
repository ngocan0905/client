<template>
  <ModalOverlay
    ><div class="text-center text-[28px] mb-4 font-bold">Create Admin</div>
    <div class="px-6 pb-1.5 text-[15px]">First Name</div>
    <div class="px-6 pb-2">
      <TextInput
        placeholder="First name"
        v-model:input="firstName"
        inputType="text"
        :autoFocus="true"
        :error="errors && errors.firstName ? errors.firstName[0] : ''"
      />
    </div>
    <div class="px-6 pb-1.5 text-[15px]">Last Name</div>
    <div class="px-6 pb-2">
      <TextInput
        placeholder="Last name"
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
        placeholder="Phone number"
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

    <div class="p-6 flex gap-3 justify-end">
      <button
        class="text-[17px] font-semibold text-white bg-red-500 rounded-md py-2 px-5"
        @click="generalStore.isCreateUserOpen = false"
      >
        Cancel
      </button>
      <button
        :disabled="!email || !password || !lastName || !firstName"
        :class="!email || !password || !lastName || !firstName ? 'bg-gray-200' : 'bg-gray-800'"
        @click="register()"
        class="text-[17px] font-semibold text-white py-2 px-5 rounded-md"
      >
        Sign up
      </button>
    </div></ModalOverlay
  >
</template>
<script setup>
import { ref } from "vue";
import TextInput from "./TextInput.vue";
import { useUserStore } from "../stores/userStore";
import ModalOverlay from "./ModalOverlay.vue";
import { useGeneralStore } from "../stores/generalStore";
const userStore = useUserStore();
const generalStore = useGeneralStore();
let firstName = ref("");
let lastName = ref("");
let email = ref("");
let password = ref("");
let phoneNumber = ref(null);
let errors = ref(null);

const register = async () => {
  errors.value = null;
  try {
    generalStore.isLoading = true;
    const created = await userStore.registerAdmin(
      firstName.value,
      lastName.value,
      email.value,
      phoneNumber.value,
      password.value
    );
    if (created) {
      generalStore.isCreateUserOpen = false;
      generalStore.isLoading = false;
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
