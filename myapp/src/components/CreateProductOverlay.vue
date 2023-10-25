<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative bg-white w-full max-w-[70%] min-h-[600px] p4 rounded-lg overflow-auto">
      <div class="relative">
        <div class="grid grid-cols-3 m-4">
          <div class="col-span-1 flex flex-col p-4">
            <label for="title" class="text-lg font-semibold">
              Title<span class="text-red-500 ml-2">*</span></label
            >
            <textarea
              id="title"
              class="border outline-none p-1 capitalize shadow-md"
              rows="2"
              v-model="selectedTitle"
              placeholder="Title of product"
            ></textarea>
            <!-- Brand -->
            <label for="category" class="text-lg font-semibold mt-6"
              >Brand<span class="text-red-500 ml-2">*</span></label
            >
            <Combobox v-model="selectedBrand">
              <div class="relative mt-1">
                <div
                  class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm"
                >
                  <ComboboxInput
                    class="w-full border outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    :displayValue="(brand) => brand.title"
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
            <!-- Category -->
            <label for="category" class="text-lg font-semibold mt-6"
              >Category<span class="text-red-500 ml-2">*</span></label
            >
            <Combobox v-model="selectedCateogy">
              <div class="relative mt-1">
                <div
                  class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm"
                >
                  <ComboboxInput
                    class="w-full border outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    :displayValue="(category) => category.title"
                    @change="queryCategory = $event.target.value"
                  />
                  <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </ComboboxButton>
                </div>
                <TransitionRoot
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  @after-leave="queryCategory = ''"
                >
                  <ComboboxOptions
                    class="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
                      v-slot="{ selectedCateogy, active }"
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
                            'font-medium': selectedCateogy,
                            'font-normal': !selectedCateogy,
                          }"
                        >
                          {{ category.title }}
                        </span>
                        <span
                          v-if="selectedCateogy"
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
            <!-- color -->
            <label for="color" class="text-lg font-semibold mt-6"
              >Color<span class="text-red-500 ml-2">*</span></label
            >
            <Combobox v-model="selectedColor">
              <div class="relative mt-1">
                <div
                  class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm"
                >
                  <ComboboxInput
                    class="w-full border outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    :displayValue="(color) => color.title"
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
            <!-- quanlity -->
            <label for="quanlity" class="text-lg font-semibold mt-6"
              >Quanlity<span class="text-red-500 ml-2">*</span></label
            >
            <input
              id="quanlity"
              type="number"
              min="1"
              v-model="selectedQuanlity"
              class="w-full rounded-md shadow-md border outline-none py-2 px-4 text-sm leading-5 text-gray-900"
            />
            <!-- price -->
            <label for="price" class="text-lg font-semibold mt-6"
              >Price<span class="text-red-500 ml-2">*</span></label
            >
            <input
              id="price"
              type="number"
              min="1"
              v-model="selectedPrice"
              class="w-full rounded-md shadow-md border outline-none py-2 px-4 text-sm leading-5 text-gray-900"
            />
          </div>
          <div class="col-span-2 flex flex-col p-4 h-full">
            <!-- image -->
            <label for="image" class="text-lg font-semibold">Image</label>

            <input
              type="file"
              id="image"
              ref="inputFile"
              @input="inputFile = arguments[0]"
              @change="handleImageUpload"
              accept=".jpg, .png, .jpeg"
              class="block w-full text-sm text-gray-900 border file:border-none file:py-1 file:px-3 file:rounded-md file:bg-gray-600 file:hover:bg-gray-900 file:duration-300 file:text-white border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1"
            />
            <label for="" class="text-lg font-semibold"> Review Images</label>
            <div v-if="selectedImg.length > 0">
              <div class="bg-gray-200 grid grid-cols-5 gap-2 p-4 rounded-md max-h-60 overflow-auto">
                <div
                  v-for="(img, index) in selectedImg"
                  :key="index"
                  class="relative bg-gray-300 flex justify-center"
                >
                  <img :src="img" alt="" class="h-24 w-auto object-cover" />
                  <TrashIcon
                    class="cursor-pointer hover:scale-105 active:scale-95 z-10 p-1 w-6 h-6 text-gray-500 bg-white rounded-full absolute top-1 right-1"
                  />
                </div>
              </div>
            </div>
            <label for="description" class="text-lg font-semibold mt-4">Description</label>
            <textarea
              name=""
              class="border border-gray-900 rounded-md p-4 outline-none"
              placeholder="Description here ..."
              id="description"
              cols="30"
              rows="5"
              v-model="selectedDescription"
            ></textarea>
          </div>
        </div>
        <div class="flex justify-end items-center py-4">
          <button
            @click="generalStore.isCreateProductOpen = false"
            class="bg-red-600 text-white py-1 px-2 mr-4 rounded-md"
          >
            Cancel
          </button>
          <button
            :disabled="!selectedTitle || !selectedQuanlity || !selectedPrice"
            :class="
              !selectedTitle || !selectedQuanlity || !selectedPrice
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white'
            "
            class="py-1 px-2 mr-4 rounded-md"
            @click="createProduct()"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useGeneralStore } from "../stores/generalStore";
import { useProductStore } from "../stores/productStore";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { ChevronUpDownIcon, CheckIcon, TrashIcon } from "@heroicons/vue/24/solid";
const generalStore = useGeneralStore();
const productStore = useProductStore();
const inputFile = ref(null);
const selectedTitle = ref("");
const selectedBrand = ref();
const selectedCateogy = ref();
const selectedColor = ref();
const selectedQuanlity = ref(1);
const selectedPrice = ref(1);
const selectedImg = ref([]);
const selectedDescription = ref("");
const queryBrand = ref("");
const queryCategory = ref("");
const queryColor = ref("");
const brand = ref([]);
const category = ref([]);
const color = ref([]);
onMounted(async () => {
  brand.value = await generalStore.getBrand();
  selectedBrand.value = brand.value[0];
  // -------------
  category.value = await productStore.getAllCategoryProduct();
  selectedCateogy.value = category.value[0];
  // -------------
  color.value = await generalStore.getColor();
  selectedColor.value = color.value[0];
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
          .includes(queryColor.value.toLocaleLowerCase().replace(/\s+/g, ""))
      );
});
//
const imgUrls = ref([]);
const handleImageUpload = async (event) => {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageDataUrl = e.target.result;
      selectedImg.value.push(imageDataUrl);
    };
    reader.readAsDataURL(file);
    const imgUploaded = await productStore.pushImageToCloud(file);
    if (imgUploaded && imgUploaded[0] && imgUploaded[0].url) {
      imgUrls.value.push(imgUploaded[0].url);
    }
  }
};
const createProduct = async () => {
  try {
    generalStore.isLoading = true;
    const productCreated = await productStore.createProduct(
      selectedTitle.value,
      selectedBrand.value.title,
      selectedCateogy.value.title,
      selectedColor.value.title,
      selectedQuanlity.value,
      selectedPrice.value,
      imgUrls.value,
      selectedDescription.value
    );
    if (productCreated) {
      generalStore.isLoading = false;
      location.reload();
      generalStore.isCreateProductOpen = false;
    } else {
      generalStore.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
