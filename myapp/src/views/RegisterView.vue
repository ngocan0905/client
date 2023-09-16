<template>
  <div class="flex justify-center items-center w-full h-screen bg-cover bg-black"
    :style="{ backgroundImage: `url('${randomImageUrl}')` }">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:w-fit lg:w-1/3">
      <div class="mb-4">
        <label class="block text-gray-800 text-sm font-bold mb-2" for="firstName">
          First Name
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 outline-none" id="username"
          type="text" placeholder="" v-model="firstName" />
      </div>
      <!--  -->
      <div class="mb-4">
        <label class="block text-gray-800 text-sm font-bold mb-2" for="lastName">
          Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 outline-none" id="username"
          type="text" placeholder="" v-model="lastName" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-800 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 outline-none" id="username"
          type="text" placeholder="" v-model="email" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-800 text-sm font-bold mb-2" for="phone">
          Phone Number
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 outline-none" id="username"
          type="text" placeholder="" v-model="phone" />
      </div>
      <div class="mb-6">
        <label class="block text-gray-800 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-800 mb-3 outline-none"
          id="password" type="password" placeholder="" v-model="password" />
        <p class="text-red text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-black hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button"
          @click="register">
          Sign up
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axiosClient from "../api/axiosClient";
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");
const randomImageUrl = ref("");
const unsplashApiUrl = "https://source.unsplash.com/1600x900/?black";
onMounted(() => {
  randomImageUrl.value = `${unsplashApiUrl}?${Date.now()}`;
});
const register = async () => {
  try {
    const response = await axiosClient.post("user/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      mobile: phone.value,
      email: email.value,
      password: password.value,
    });
    console.table(response.data);
  } catch (error) {
    console.log(error);
  }
};
</script>
