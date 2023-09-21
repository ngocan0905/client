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
          <img
            src="../assets/images/master_dynamic_two.webp"
            alt=""
            class="object-cover rounded-lg"
          />
          <img
            src="../assets/images/master_dynamic_two.webp"
            alt=""
            class="object-cover rounded-lg"
          />
          <img
            src="../assets/images/master_dynamic_two.webp"
            alt=""
            class="object-cover rounded-lg"
          />
          <img
            src="../assets/images/master_dynamic_two.webp"
            alt=""
            class="object-cover rounded-lg"
          />
        </div>
      </div>
      <!-- giảm giá  -->
      <div class="flex flex-col items-center">
        <div class="text-xl uppercase hover:underline cursor-pointer font-semibold my-10">
          hot sale
        </div>
        <div class="w-full">
          <SlideProduct class="" :data="productData" />
        </div>
      </div>
      <!--  -->
      <div class="w-full h-auto bg-stone-300 py-8 mt-24">
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
        <div class="w-full flex justify-evenly mt-10">
          <div class="flex flex-col cursor-pointer items-center p-4">
            <div class="rounded-full overflow-hidden w-32 h-32">
              <img src="../assets/images/master_dynamic_two.webp" alt="" class="scale-150" />
            </div>
            <div class="hover:underline font-semibold">Laptop</div>
          </div>
          <div class="flex flex-col cursor-pointer items-center p-4">
            <div class="rounded-full overflow-hidden w-32 h-32">
              <img src="../assets/images/master_dynamic_two.webp" alt="" class="scale-150" />
            </div>
            <div class="hover:underline font-semibold">Pc</div>
          </div>
          <div class="flex flex-col cursor-pointer items-center p-4">
            <div class="rounded-full overflow-hidden w-32 h-32">
              <img src="../assets/images/master_dynamic_two.webp" alt="" class="scale-150" />
            </div>
            <div class="hover:underline font-semibold">Tablet</div>
          </div>
          <div class="flex flex-col cursor-pointer items-center p-4">
            <div class="rounded-full overflow-hidden w-32 h-32">
              <img src="../assets/images/master_dynamic_two.webp" alt="" class="scale-150" />
            </div>
            <div class="hover:underline font-semibold">Smart Phone</div>
          </div>
          <div class="flex flex-col cursor-pointer items-center p-4">
            <div class="rounded-full overflow-hidden w-32 h-32">
              <img src="../assets/images/master_dynamic_two.webp" alt="" class="scale-150" />
            </div>
            <div class="hover:underline font-semibold">Screen</div>
          </div>
          <div class="flex flex-col cursor-pointer items-center p-4">
            <div class="rounded-full overflow-hidden w-32 h-32">
              <img src="../assets/images/master_dynamic_two.webp" alt="" class="scale-150" />
            </div>
            <div class="hover:underline font-semibold">Keyboard</div>
          </div>
        </div>
      </div>
      <!-- thương hiệu -->
      <div class="w-full h-auto bg-stone-200 mt-24 flex justify-evenly">
        <MarqueeBrand />
      </div>
      <!-- bộ sưu tập nổi bật -->
      <div class="flex flex-col items-center">
        <div class="text-xl uppercase hover:underline cursor-pointer font-semibold my-10">
          featured collection
        </div>
        <div class="w-full">
          <SlideProduct class="" :data="productData" />
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
const productData = ref();
const blogData = ref();
onBeforeMount(async () => {
  const products = await axiosClient.get("product");
  const blogs = await axiosClient.get("blog/all-blog");
  productData.value = products.data;
  blogData.value = blogs.data;
  console.log(blogData.value);
});
</script>
