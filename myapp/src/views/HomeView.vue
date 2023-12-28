<template>
  <MainLayout>
    <div class="w-4/5 h-full">
      <div class="flex items-center h-full gap-2 my-24">
        <div class="w-1/2 h-auto">
          <img
            src="../assets/images/master_dynamic_two.webp"
            alt=""
            class="object-cover rounded-lg"
          />
        </div>
        <div class="grid grid-cols-2 w-1/2 h-auto gap-2">
          <img src="../assets/images/home-1.png" alt="" class="object-cover rounded-lg" />
          <img src="../assets/images/headphone-2.png" alt="" class="object-cover rounded-lg" />
          <img src="../assets/images/keyboard-3.png" alt="" class="object-cover rounded-lg" />
          <img src="../assets/images/mouse.webp" alt="" class="object-cover rounded-lg" />
        </div>
      </div>
      <!-- giảm giá  -->
      <div class="flex flex-col items-center">
        <div class="text-xl uppercase hover:underline cursor-pointer font-semibold my-10">
          hot sale
        </div>
        <div class="w-full">
          <SlideProduct class="" :data="hotProductData" />
        </div>
      </div>
      <!--  -->
      <div class="w-full h-auto border rounded-lg shadow-lg py-8 mt-24">
        <!-- service -->
        <div class="w-full flex justify-between px-4">
          <div class="flex justify-evenly items-center">
            <div>
              <CodeBracketIcon class="w-6 h-6" />
            </div>
            <div class="flex flex-col ml-4">
              <div class="font-semibold">Free shipping</div>
              <div class="text-sm font-light">From all order over $5</div>
            </div>
          </div>
          <div class="flex justify-evenly items-center">
            <div>
              <CodeBracketIcon class="w-6 h-6" />
            </div>
            <div class="flex flex-col ml-4">
              <div class="font-semibold">Free shipping</div>
              <div class="text-sm font-light">From all order over $5</div>
            </div>
          </div>
          <div class="flex justify-evenly items-center">
            <div>
              <CodeBracketIcon class="w-6 h-6" />
            </div>
            <div class="flex flex-col ml-4">
              <div class="font-semibold">Free shipping</div>
              <div class="text-sm font-light">From all order over $5</div>
            </div>
          </div>
          <div class="flex justify-evenly items-center">
            <div>
              <CodeBracketIcon class="w-6 h-6" />
            </div>
            <div class="flex flex-col ml-4">
              <div class="font-semibold">Free shipping</div>
              <div class="text-sm font-light">From all order over $5</div>
            </div>
          </div>
          <div class="flex justify-evenly items-center">
            <div>
              <CodeBracketIcon class="w-6 h-6" />
            </div>
            <div class="flex flex-col ml-4">
              <div class="font-semibold">Free shipping</div>
              <div class="text-sm font-light">From all order over $5</div>
            </div>
          </div>
        </div>
        <hr class="w-full my-2" />
        <!-- danh mục -->
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
      <!-- thương hiệu -->
      <div class="w-full h-auto border shadow-lg rounded-lg mt-24 flex justify-evenly">
        <MarqueeBrand />
      </div>
      <!-- bộ sưu tập nổi bật -->
      <div class="flex flex-col items-center">
        <div class="text-xl uppercase hover:underline cursor-pointer font-semibold my-10">
          newest collection
        </div>
        <div class="w-full">
          <SlideProduct class="" :data="newProductData" />
        </div>
      </div>
      <!-- blog mới nhất -->
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
import { CodeBracketIcon } from "@heroicons/vue/24/solid";
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
