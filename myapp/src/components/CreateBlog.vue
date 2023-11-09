<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative bg-white w-full max-w-[70%] min-h-[600px] p4 rounded-lg overflow-auto">
      <div class="relative">
        <div class="grid grid-cols-4 m-4">
          <div class="col-span-2 flex flex-col mx-2">
            <!-- title -->
            <label for="title" class="text-lg font-semibold mt-6">Title</label>
            <textarea
              id="title"
              v-model="selectedTitle"
              rows="1"
              class="outline-none border border-gray-300 shadow-md p-2 capitalize rounded-md"
            ></textarea>
            <!-- category -->
            <label for="category" class="text-lg font-semibold mt-6">Category</label>
            <Combobox id="category" v-model="selectedCategory">
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
            <!-- content -->
            <label for="title" class="text-lg font-semibold mt-6">Content</label>
            <textarea
              id="title"
              rows="10"
              class="outline-none border-gray-300 shadow-md border p-2 capitalize rounded-md"
              v-model="selectedContent"
            ></textarea>
          </div>
          <div class="col-span-2 flex flex-col mx-2">
            <!-- image -->
            <label for="image" class="text-lg font-semibold mt-6">Images</label>
            <input
              type="file"
              id="image"
              ref="inputFile"
              @input="inputFile = arguments[0]"
              @change="handleImageUpload"
              accept=".jpg, .png, .jpeg"
              class="block w-full text-sm text-gray-900 border file:border-none file:py-1 file:px-3 file:rounded-md file:bg-gray-600 file:hover:bg-gray-900 file:duration-300 file:text-white border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1"
            />
            <!-- review image -->
            <label for="reviewImage" class="text-lg font-semibold mt-6">Review Images</label>
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
          </div>
        </div>
        <div class="relative flex justify-end items-end py-4">
          <button
            class="bg-red-600 text-white py-1 px-2 mr-4 rounded-md"
            @click="generalStore.isCreateBlogOpen = false"
          >
            Cancel
          </button>
          <button
            class="py-1 px-2 mr-4 rounded-md"
            :disabled="!selectedTitle || !selectedContent || !selectedCategory"
            :class="
              !selectedTitle || !selectedContent || !selectedCategory
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white'
            "
            @click="eventCreateBlog()"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from "@headlessui/vue";
import { useGeneralStore } from "../stores/generalStore";
import { useBlogStore } from "../stores/blogStore";
import { computed, onMounted, ref } from "vue";
import { CheckIcon, ChevronUpDownIcon, TrashIcon } from "@heroicons/vue/24/solid";
const inputFile = ref(null);
const selectedImg = ref([]);
const selectedContent = ref("");
const selectedTitle = ref("");
const selectedCategory = ref("");
const queryCategory = ref("");
const category = ref([]);
const generalStore = useGeneralStore();
const blogStore = useBlogStore();
onMounted(async () => {
  category.value = await blogStore.getBlogCategory();
  selectedCategory.value = category.value[0];
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
// upload img
const imgUrls = ref([]);
const handleImageUpload = async (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target.result;
      selectedImg.value.push(imageDataUrl);
    };
    reader.readAsDataURL(file);
    const imgUploaded = await blogStore.pushImageToCloud(file);
    if (imgUploaded && imgUploaded[0] && imgUploaded[0].url) {
      imgUrls.value.push(imgUploaded[0].url);
    }
  }
};
const eventCreateBlog = async () => {
  try {
    generalStore.isLoading = true;
    const blogCreated = await blogStore.createBlog(
      selectedTitle.value,
      selectedCategory.value,
      selectedContent.value,
      imgUrls.value
    );
    if (blogCreated) {
      generalStore.isLoading = false;
      location.reload();
      generalStore.isCreateBlogOpen = false;
    } else {
      generalStore.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
