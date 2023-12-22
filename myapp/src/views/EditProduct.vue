<template>
  <AdminLayout>
    <form v-if="data" class="grid grid-cols-12">
      <div class="col-span-4 p-4">
        <div class="flex flex-col my-4">
          <label for="title" class="text-xl font-semibold mb-2">Title</label>
          <input
            type="text"
            placeholder="title of product"
            v-model="updatedTitle"
            class="outline-none px-4 py-2 capitalize border rounded-md"
          />
        </div>
        <div class="flex flex-col my-4">
          <label for="title" class="text-xl font-semibold mb-2">Description</label>
          <textarea
            type="text"
            placeholder="title of product"
            v-model="updatedDescription"
            rows="2"
            class="outline-none px-4 py-2 capitalize border rounded-md"
          ></textarea>
        </div>
        <div class="flex flex-col my-4">
          <label for="title" class="text-xl font-semibold mb-2">Price ( $ )</label>
          <input
            type="text"
            placeholder="title of product"
            v-model="updatedPrice"
            class="outline-none px-4 py-2 capitalize border rounded-md"
          />
        </div>
        <div class="flex flex-col my-4">
          <label for="title" class="text-xl font-semibold mb-2">Brand</label>
          <Combobox v-model="selectedBrand">
            <div class="relative mt-1">
              <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm"
              >
                <ComboboxInput
                  class="w-full border outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="() => selectedBrand"
                  @change="queryBrand = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>
              </div>
              <TransitionRoot
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 "
                leaveTo="opacity-0"
                @after-leave="queryBrand = ''"
              >
                <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <div
                    v-if="filteredBrand.length === 0 && queryBrand !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                  >
                    Nothing found.
                  </div>

                  <ComboboxOption
                    v-for="brand in filteredBrand"
                    as="template"
                    :key="brand._id"
                    :value="brand"
                    v-slot="{ selectedBrand, active }"
                  >
                    <li
                      class="relative cursor-default select-none py-2 pl-10 pr-4"
                      :class="{
                        'bg-gray-600 text-white': active,
                        'text-gray-900': !active,
                      }"
                    >
                      <span
                        class="block truncate"
                        :class="{ 'font-medium': selectedBrand, 'font-normal': !selectedBrand }"
                      >
                        {{ brand.title }}
                      </span>
                      <span
                        v-if="selectedBrand"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-gray-100': !active }"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>
        <div class="flex flex-col my-4">
          <label for="title" class="text-xl font-semibold mb-2">Category</label>
          <Combobox v-model="selectedCategory">
            <div class="relative mt-1">
              <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm"
              >
                <ComboboxInput
                  class="w-full border outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="() => selectedCategory"
                  @change="queryCategory = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>
              </div>
              <TransitionRoot
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 "
                leaveTo="opacity-0"
                @after-leave="queryCategory = ''"
              >
                <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <div
                    v-if="filteredCategory.length === 0 && queryCategory !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                  >
                    Nothing found.
                  </div>

                  <ComboboxOption
                    v-for="category in filteredCategory"
                    as="template"
                    :key="category._id"
                    :value="category"
                    v-slot="{ selectedCategory, active }"
                  >
                    <li
                      class="relative cursor-default select-none py-2 pl-10 pr-4"
                      :class="{
                        'bg-gray-600 text-white': active,
                        'text-gray-900': !active,
                      }"
                    >
                      <span
                        class="block truncate"
                        :class="{
                          'font-medium': selectedCategory,
                          'font-normal': !selectedCategory,
                        }"
                      >
                        {{ category.title }}
                      </span>
                      <span
                        v-if="selectedCategory"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-gray-100': !active }"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>
        <div class="flex flex-col my-4">
          <label for="color" class="text-xl font-semibold mb-2">Color</label>
          <Combobox v-model="selectedColor">
            <div class="relative mt-1">
              <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm"
              >
                <ComboboxInput
                  class="w-full border outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :display-value="(color) => color.title"
                  @change="queryColor = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>
              </div>
              <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="queryColor = ''"
              >
                <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <div
                    v-if="filteredColor.length === 0 && queryColor !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                  >
                    Nothing found.
                  </div>

                  <ComboboxOption
                    v-for="color in filteredColor"
                    as="template"
                    :key="color._id"
                    :value="color"
                    v-slot="{ selectedColor, active }"
                  >
                    <li
                      class="relative cursor-default select-none py-2 pl-10 pr-4"
                      :class="{
                        'bg-gray-600 text-white': active,
                        'text-gray-900': !active,
                      }"
                    >
                      <span
                        class="block truncate"
                        :class="{ 'font-medium': selectedColor, 'font-normal': !selectedColor }"
                      >
                        {{ color.title }}
                      </span>
                      <span
                        v-if="selectedColor"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-gray-100': !active }"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>
      </div>
      <div class="col-span-8 p-4">
        <div class="flex flex-col my-4">
          <label for="images" class="text-xl font-semibold mb-2">Images</label>
          <div class="grid grid-cols-4 gap-4 bg-gray-100 p-4 rounded-md">
            <div v-for="img of imgProduct" :key="img.public_id" class="relative">
              <div v-for="data in img" :key="data.public_id">
                <img :src="data.url" alt="" class="relative h-40" />
                <TrashIcon
                  @click="deleteImg(data.public_id)"
                  class="w-4 h-4 text-gray-600 bg-gray-200 rounded-full absolute top-2 right-2 hover:scale-105 cursor-pointer"
                />
              </div>
            </div>
            <div
              class="bg-gray-200 flex justify-center items-center rounded-md hover:border hover:border-dashed hover:border-gray-600"
            >
              <PlusIcon class="h-10 w-10 text-gray-600" />
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            @click.prevent="updateProductById(route.params.id)"
            class="px-4 py-2 rounded-md bg-gray-800 text-white"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  </AdminLayout>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import { useProductStore } from "../stores/productStore";
import { useRoute } from "vue-router";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { useGeneralStore } from "../stores/generalStore";
const route = useRoute();
const productStore = useProductStore();
const generalStore = useGeneralStore();
const data = ref(null);
const selectedBrand = ref("");
const queryBrand = ref("");
const brand = ref([]);
const selectedCategory = ref();

const queryCategory = ref("");
const category = ref([]);
const selectedColor = ref();
const queryColor = ref("");
const color = ref([]);
const imgProduct = ref([]);
const updatedTitle = ref();
const updatedDescription = ref();
const updatedPrice = ref();

onMounted(async () => {
  data.value = await productStore.getProductById(route.params.id);
  updatedTitle.value = data.value.title;
  updatedDescription.value = data.value.description;
  updatedPrice.value = data.value.price;

  // brand
  brand.value = await generalStore.getBrand();
  selectedBrand.value = data.value.brand;
  // category
  category.value = await productStore.getAllCategoryProduct();
  selectedCategory.value = data.value.category;
  // color
  color.value = await generalStore.getColor();
  selectedColor.value = data.value.color;
  // img of product
  imgProduct.value = data.value.images;
});
const filteredBrand = computed(() => {
  return queryBrand.value === ""
    ? brand.value
    : brand.value.filter((brand) =>
        brand.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(queryBrand.value.toLowerCase().replace(/\s+/g, ""))
      );
});
const filteredCategory = computed(() => {
  return queryCategory.value === ""
    ? category.value
    : category.value.filter((category) =>
        category.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(queryCategory.value.toLowerCase().replace(/\s+/g, ""))
      );
});
const filteredColor = computed(() => {
  return queryColor.value === ""
    ? color.value
    : color.value.filter((color) =>
        color.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(queryColor.value.toLowerCase().replace(/\s+/g, ""))
      );
});
const deleteImg = async (imgId) => {
  try {
    generalStore.isLoading = true;
    const deleted = await productStore.deleteImageFromCloud(imgId);
    if (deleted) {
      imgProduct.value = imgProduct.value.map((subArray) =>
        subArray.filter((img) => img.public_id !== imgId)
      );
    }
    generalStore.isLoading = false;
  } catch (error) {
    console.log(error);
  }
};
const updateProductById = (productId) => {
  console.log(
    productId,
    updatedTitle.value,
    updatedDescription.value,
    updatedPrice.value,
    selectedBrand.value,
    selectedCategory.value.title,
    selectedColor.value.title,
    imgProduct.value
  );
};
</script>
