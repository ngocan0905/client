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
            <label for="title">Title</label>
            <textarea
              id="title"
              rows="2"
              class="outline-none border-gray-800 border p-2 capitalize rounded-md"
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
            <label for="title">Content</label>
            <textarea
              id="title"
              rows="2"
              class="outline-none border-gray-800 border p-2 capitalize rounded-md"
            ></textarea>
          </div>
          <div class="col-span-2 flex flex-col mx-2">
            <!-- image -->
            <label for="image">Images</label>
            <input type="file" id="image" />
          </div>
        </div>
        <div class="relative border flex justify-end items-end py-4">
          <button
            class="bg-red-600 text-white py-1 px-2 mr-4 rounded-md"
            @click="generalStore.isCreateBlogOpen = false"
          >
            Cancel
          </button>
          <button class="py-1 px-2 mr-4 rounded-md">Create</button>
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
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";
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
          .oncludes(queryCategory.value.toLowerCase().replace(/\s+/g, ""))
      );
});
</script>
