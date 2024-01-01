<template>
  <MainLayout>
    <div class="w-full h-full">
      <div class="flex items-center h-screen">
        <div class="w-full h-full flex items-center relative">
          <section
            class="h-1/2 w-full bg-gray-200 p-4 glassmorphism-container absolute z-10 animate__animated animate__bounceInDown"
          >
            <div class="text-6xl font-extrabold">Welcome!</div>
            <sub class="text-xl ml-4">What is your looking for?</sub>
          </section>

          <img
            src="../assets/images/shopping-cart.png"
            class="h-[400px] absolute rotate-6 bottom-40 opacity-75 blur-sm animate__animated animate__lightSpeedInLeft"
            alt=""
          />
          <img
            src="../assets/images/headphone.webp"
            class="h-[600px] absolute -right-40 bottom-0 opacity-75 blur-sm animate__animated animate__jackInTheBox"
            alt=""
          />
        </div>
      </div>

      <div class="flex h-screen flex-col items-center relative">
        <img
          src="../assets/images/Laptop-MSI.png"
          class="absolute opacity-75 blur-sm h-[800px] bottom-10 left-0"
          alt=""
        />
        <div class="text-2xl uppercase hover:underline cursor-pointer font-extrabold my-10 flex">
          hot sale
          <FireIcon class="w-8 h-8 text-orange-600" />
        </div>
        <div class="w-full">
          <SlideProduct class="" :data="hotProductData" />
        </div>
      </div>
      <div class="h-screen relative">
        <img
          src="../assets/images/smartphone.png"
          class="absolute opacity-75 blur-sm rotate-45 right-0"
          alt=""
        />
        <div class="w-full h-auto rounded-lg py-8 glassmorphism-container">
          <div class="w-full grid py-2 px-4 grid-cols-3">
            <div class="col-span-1 flex font-bold items-center justify-evenly">Đặt hàng online</div>
            <div class="col-span-1 flex font-bold items-center justify-center">Hiện đại</div>
            <div class="col-span-1 flex font-bold items-center justify-center">Hỗ trợ 24/7</div>
          </div>
          <hr class="w-full my-2" />
          <div class="w-full flex justify-evenly items-center mt-10">
            <div class="flex flex-col cursor-pointer items-center p-4">
              <div class="overflow-hidden w-32 h-32 flex justify-center items-center">
                <img src="../assets/images/laptop.png" alt="" class="" />
              </div>
              <div class="hover:underline font-semibold">Laptop</div>
            </div>
            <div class="flex flex-col cursor-pointer items-center p-4">
              <div class="overflow-hidden w-32 h-32 flex justify-center items-center">
                <img src="../assets/images/pc.png" alt="" class="" />
              </div>
              <div class="hover:underline font-semibold">Pc</div>
            </div>
            <div class="flex flex-col cursor-pointer items-center p-4">
              <div class="overflow-hidden w-32 h-32 flex justify-center items-center">
                <img src="../assets/images/tablet.png" alt="" class="w-16 h-20" />
              </div>
              <div class="hover:underline font-semibold">Tablet</div>
            </div>
            <div class="flex flex-col cursor-pointer items-center p-4">
              <div class="overflow-hidden w-32 h-32 flex justify-center items-center">
                <img src="../assets/images/phone.png" alt="" class="" />
              </div>
              <div class="hover:underline font-semibold">Smart Phone</div>
            </div>
            <div class="flex flex-col cursor-pointer items-center p-4">
              <div class="overflow-hidden w-32 h-32 flex justify-center items-center">
                <img src="../assets/images/screen.png" alt="" class="" />
              </div>
              <div class="hover:underline font-semibold">Screen</div>
            </div>
            <div class="flex flex-col cursor-pointer items-center p-4">
              <div class="overflow-hidden w-32 h-32 flex justify-center items-center">
                <img src="../assets/images/keyboard.png" alt="" class="" />
              </div>
              <div class="hover:underline font-semibold">Keyboard</div>
            </div>
          </div>
        </div>
        <div class="w-full h-auto border shadow-lg rounded-lg mt-24 flex justify-evenly">
          <MarqueeBrand />
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="text-xl uppercase hover:underline cursor-pointer font-semibold my-10">
          newest collection
        </div>
        <div class="w-full">
          <SlideProduct class="" :data="newProductData" />
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="text-xl uppercase hover:underline cursor-pointer font-semibold my-10">
          lastest blogs
        </div>
        <div class="w-full">
          <SlideBlog class="" :data="blogData" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import axiosClient from "../api/axiosClient";
import SlideProduct from "../components/SlideProduct.vue";
import SlideBlog from "../components/SlideBlog.vue";
import MainLayout from "../layouts/ClientLayout.vue";
import MarqueeBrand from "../components/MarqueeBrand.vue";
import { FireIcon } from "@heroicons/vue/24/solid";
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();
const productData = ref();
const hotProductData = ref([]);
const newProductData = ref([]);
const blogData = ref();
onBeforeMount(async () => {
  const products = await axiosClient.get("product");
  hotProductData.value = await productStore.getHotSaleProduct();
  newProductData.value = await productStore.getNewProduct();
  const blogs = await axiosClient.get("blog/all-blog");
  productData.value = products.data;
  blogData.value = blogs.data;
});
</script>
<style scoped></style>
