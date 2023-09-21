<template>
  <ClientLayout>
    <div class="flex w-3/4 justify-center py-10">
      <aside class="flex flex-col w-[20%]">
        <div class="w-full">
          <div class="mt-6">
            <div class="font-bold">
              <div>Danh mục</div>
            </div>
            <div v-for="item in category" class="flex">
              <input type="checkbox" class="mx-2 default:ring-2" />
              <div class="capitalize">{{ item.title }}</div>
            </div>
          </div>
          <div class="mt-10">
            <div class="font-bold">
              <div>Thương hiệu</div>
            </div>
            <div v-for="item in brand" class="flex">
              <input type="checkbox" class="mx-2" />
              <div class="capitalize">{{ item.title }}</div>
            </div>
          </div>
          <div class="mt-10">
            <div class="font-bold">
              <div>Mức giá</div>
            </div>
            <div v-for="item in rangePrice" class="flex">
              <input type="checkbox" class="mx-2" />
              <div class="capitalize">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </aside>
      <div class="border p-4 rounded-lg w-full">
        <div class="mb-2 w-full h-10 flex items-center justify-between">
          <div>
            <label for="option" class="font-semibold">Ưu tiên xem:</label>
            <button
              class="mx-2 px-2 py-1 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-gray-100"
            >
              Bán chạy nhất</button
            ><button
              class="mx-2 px-2 py-1 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-gray-100"
            >
              Giá thấp
            </button>
            <button
              class="mx-2 px-2 py-1 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-gray-100"
            >
              Giá cao
            </button>
          </div>
          <div class="flex">
            <Squares2X2Icon
              class="w-6 h-6 text-gray-700 mr-4 hover:scale-125 duration-300 cursor-pointer"
            />
            <ListBulletIcon
              @click="changeOption()"
              class="w-6 h-6 text-gray-700 hover:scale-125 duration-300 cursor-pointer"
            />
          </div>
        </div>

        <div
          class="gap-10 justify-center w-full"
          :class="listOption ? 'flex flex-col' : 'grid grid-cols-3'"
        >
          <div v-for="item in product" class="">
            <ProductCard :data="item" class="" />
          </div>
        </div>
      </div>
    </div>
  </ClientLayout>
</template>
<script setup>
import ClientLayout from "../layouts/ClientLayout.vue";
import axiosClient from "../api/axiosClient";
import ProductCard from "../components/ProductCard.vue";
import { Squares2X2Icon, ListBulletIcon } from "@heroicons/vue/24/solid";
import { onMounted, ref, watch } from "vue";

const product = ref();
const category = ref();
const brand = ref();
const listOption = ref(false);
const changeOption = () => {
  listOption.value = !listOption.value;
  console.log(listOption.value);
};
console.log(listOption.value);
const rangePrice = [
  {
    id: 1,
    text: "Tất cả",
  },
  {
    id: 2,
    text: "Dưới 2 triệu",
  },
  {
    id: 3,
    text: "Từ 2 - 4 triệu",
  },
  {
    id: 4,
    text: "Từ 4 - 7 triệu",
  },
  {
    id: 5,
    text: "Từ 7 - 13 triệu",
  },
  {
    id: 6,
    text: "Trên 13 triệu",
  },
];
onMounted(async () => {
  const prodcuts = await axiosClient.get("product");
  const categories = await axiosClient.get("proCat");
  const brands = await axiosClient.get("brand");
  product.value = prodcuts.data;
  category.value = categories.data;
  brand.value = brands.data;
});
</script>
<style scoped></style>
