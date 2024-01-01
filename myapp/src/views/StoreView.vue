<template>
  <ClientLayout>
    <div class="grid grid-cols-4 min-h-screen relative">
      <aside class="col-span-1 flex flex-col w-full mt-24">
        <div class="w-full">
          <div class="mt-6">
            <div class="font-bold">
              <div>Danh mục</div>
            </div>
            <div v-for="item in category" :key="item._id" class="flex items-center mb-2">
              <input
                type="radio"
                class="mx-2 appearance-none rounded border border-gray-300 w-4 h-4 checked:bg-blue-600 checked:border-transparent"
                :id="`category-${item.title}`"
                :value="item.title"
                name="category"
                v-model="selectedCategory"
                @change="handleCategoryChange"
              />
              <label :for="`category-${item.title}`" class="capitalize text-white cursor-pointer">{{
                item.title
              }}</label>
            </div>
          </div>
          <div class="mt-10">
            <div class="font-bold">
              <div>Thương hiệu</div>
            </div>
            <div v-for="item in brand" :key="item._id" class="flex items-center mb-2">
              <input
                type="radio"
                class="mx-2 appearance-none rounded border border-gray-300 w-4 h-4 checked:bg-blue-600 checked:border-transparent"
                :id="`brand-${item._id}`"
                :value="item.title"
                name="brand"
                v-model="selectedBrand"
                @change="handleBrandChange"
              />
              <label :for="`brand-${item._id}`" class="capitalize text-white cursor-pointer">{{
                item.title
              }}</label>
            </div>
          </div>
        </div>
      </aside>
      <div class="p-4 col-span-3 rounded-lg w-full relative mt-24">
        <div class="mb-2 w-full h-10 flex items-center justify-between glassmorphism-container">
          <div>
            <label for="option" class="font-semibold">Ưu tiên xem:</label>
            <button
              :class="{ active: selectedSortBy === 'sold_desc' }"
              @click="handleSortByBestSelling"
              class="mx-2 px-2 py-1 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-gray-100"
            >
              Bán chạy nhất</button
            ><button
              :class="{ active: selectedSortBy === 'price_asc' }"
              @click="handleSortByPriceLow"
              class="mx-2 px-2 py-1 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-gray-100"
            >
              Giá thấp
            </button>
            <button
              :class="{ active: selectedSortBy === 'price_desc' }"
              @click="handleSortByPriceHigh"
              class="mx-2 px-2 py-1 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-gray-100"
            >
              Giá cao
            </button>
            <button
              :class="{ active: selectedSortBy === '' }"
              @click="handleSortByNewCreateAt"
              class="mx-2 px-2 py-1 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-gray-100"
            >
              Mới nhất
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
          class="gap-10 justify-center w-full glassmorphism-container"
          :class="listOption ? 'flex flex-col' : 'grid grid-cols-3'"
        >
          <div v-for="item in product" :key="item._id" class="">
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
import { onMounted, ref } from "vue";
import { useProductStore } from "../stores/productStore";

const productStore = useProductStore();
const product = ref([]);
const category = ref([]);
const brand = ref([]);
const listOption = ref(false);
const selectedCategory = ref("");
const selectedBrand = ref("");
const selectedSortBy = ref("");

onMounted(async () => {
  product.value = await productStore.getAllProduct();
  const categories = (await axiosClient.get("proCat")).data;
  category.value = categories.map((item) => ({ ...item, checked: false }));

  const brands = (await axiosClient.get("brand")).data;
  brand.value = brands.map((item) => ({ ...item, checked: false }));
});

const getDataByQuery = async () => {
  try {
    let queryString = "";

    if (selectedCategory.value) {
      queryString += `category=${selectedCategory.value}`;
    }

    if (selectedBrand.value) {
      queryString += `${queryString ? "&" : ""}brand=${selectedBrand.value}`;
    }
    if (selectedSortBy.value) {
      queryString += `${queryString ? "&" : ""}sort=${selectedSortBy.value}`;
    }

    const response = await axiosClient.get(`product?${queryString}`);
    product.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const changeOption = () => {
  listOption.value = !listOption.value;
};

const handleCategoryChange = () => {
  getDataByQuery();
};

const handleBrandChange = () => {
  getDataByQuery();
};
const handleSortByBestSelling = () => {
  selectedSortBy.value = "sold_desc";
  getDataByQuery();
};

const handleSortByPriceLow = () => {
  selectedSortBy.value = "price_asc";
  getDataByQuery();
};

const handleSortByPriceHigh = () => {
  selectedSortBy.value = "price_desc";
  getDataByQuery();
};
const handleSortByNewCreateAt = () => {
  selectedSortBy.value = "";
  getDataByQuery();
};
</script>

<style scoped>
button.active {
  background-color: rgb(0, 0, 0); /* Chọn màu bạn muốn cho button active */
  color: white;
  /* Bất kỳ CSS khác bạn muốn áp dụng cho button active */
}
</style>
