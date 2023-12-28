<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative bg-white w-fit h-fit max-h-[600px] p4 rounded-lg overflow-auto">
      <div class="relative">
        <div class="grid grid-cols-1 m-4">
          <div class="col-span-1 flex flex-col p-4">
            <label for="title" class="text-lg font-semibold">
              #Tag<span class="text-red-500 ml-2">*</span></label
            >
            <input
              id="title"
              class="border outline-none p-1 shadow-md min-w-[300px] rounded-md my-2"
              type="text"
              v-model="tagName"
              placeholder="Create new tag"
              autofocus="true"
            />
          </div>
        </div>
        <div class="flex justify-end items-center py-4">
          <button @click="closeModal" class="bg-red-600 text-white py-1 px-2 mr-4 rounded-md">
            Cancel
          </button>
          <button
            :disabled="!tagName"
            :class="
              !tagName ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-green-600 text-white'
            "
            class="py-1 px-2 mr-4 rounded-md"
            @click="addTag()"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useGeneralStore } from "../stores/generalStore";
import { useProductStore } from "../stores/productStore";

const generalStore = useGeneralStore();
const productStore = useProductStore();
const props = defineProps(["productId"]);
const emits = defineEmits(["closeModal", "tagAdded"]);
const tagName = ref("");

const addTag = async () => {
  try {
    if (!tagName.value) {
      console.log("please enter the tag name");
    }
    generalStore.isLoading = true;
    const created = await productStore.addTagProduct(props.productId, tagName.value);
    if (created) {
      generalStore.isLoading = false;
      emits("tagAdded", tagName.value);
      closeModal();
    }
  } catch (error) {
    console.log(error);
  }
};
const closeModal = () => {
  emits("closeModal");
};
</script>
