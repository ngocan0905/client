<template>
  <div class="col-span-3">{{ data.title }}</div>
  <div class="col-span-5 flex flex-wrap gap-3">
    <div v-for="(tag, index) of data.tags" :key="index">
      <span class="border p-1 rounded">#{{ tag }}</span>
    </div>
  </div>

  <div class="col-span-1 flex justify-center">Quanlity : {{ data.quantity }}</div>
  <div class="col-span-1 flex justify-center">Sold : {{ data.sold }}</div>
  <div class="col-span-2 flex justify-end">
    <Menu as="div" class="relative inline-block text-left mr-4">
      <MenuButton class="flex flex-col w-full items-center">
        <Cog8ToothIcon class="w-6 h-6 text-gray-600" />
      </MenuButton>
      <MenuItems
        class="absolute min-w-[150px] right-5 origin-top-right rounded-md rounded-tr-none bg-gray-200 drop-shadow-sm"
      >
        <MenuItem v-if="data.tags.length > 0" v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-gray-500 text-white' : 'text-gray-900',
              'flex w-full items-center rounded-md px-2 py-2 text-sm ',
            ]"
            @click="openModalDeleteTag(data._id)"
          >
            <BackspaceIcon class="w-5 h-5 mr-3" />
            <div>Delete tag</div>
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-gray-500 text-white' : 'text-gray-900',
              'flex w-full items-center rounded-md px-2 py-2 text-sm ',
            ]"
            @click="openModalAddTag(data._id)"
          >
            <HashtagIcon class="w-5 h-5 mr-3" />
            <div>Add tag</div>
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <RouterLink
            :class="[
              active ? 'bg-gray-500 text-white' : 'text-gray-900',
              'flex w-full items-center rounded-md px-2 py-2 text-sm ',
            ]"
            :to="{ name: 'DetailProduct', params: { id: data._id } }"
          >
            <PencilIcon class="w-5 h-5 mr-3" />
            <div>Edit</div>
          </RouterLink>
        </MenuItem>

        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-gray-500 text-white' : 'text-gray-900',
              'flex w-full items-center rounded-md px-2 py-2 text-sm ',
            ]"
            @click="handleDeleteProduct(data._id)"
          >
            <TrashIcon class="w-5 h-5 mr-3" />
            <div>Delete</div>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
  <DeleteTag
    v-if="isDeleteTagModalOpen"
    :productId="data._id"
    @tagDeleted="handleTagDeleted"
    @closeModal="closeDeleteTagModal"
  />
  <CreateTag
    v-if="isAddTagModalOpen"
    :productId="data._id"
    @tagAdded="handleTagAdded"
    @closeModal="closeAddTagModal"
  />
</template>
<script setup>
import CreateTag from "./CreateTag.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  Cog8ToothIcon,
  PencilIcon,
  TrashIcon,
  HashtagIcon,
  BackspaceIcon,
} from "@heroicons/vue/24/solid";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import DeleteTag from "./DeleteTag.vue";
const { data } = defineProps(["data"]);
const emits = defineEmits(["deleteProduct"]);
const handleDeleteProduct = (productId) => {
  emits("deleteProduct", productId);
};
const isAddTagModalOpen = ref(false);
const isDeleteTagModalOpen = ref(false);
const currentProductId = ref(null);
const openModalAddTag = (productId) => {
  currentProductId.value = productId;
  isAddTagModalOpen.value = true;
};
const closeAddTagModal = () => {
  isAddTagModalOpen.value = false;
};
const openModalDeleteTag = (productId) => {
  currentProductId.value = productId;
  isDeleteTagModalOpen.value = true;
};
const closeDeleteTagModal = () => {
  isDeleteTagModalOpen.value = false;
};
const handleTagAdded = (tagName) => {
  data.tags.push(tagName);
};
const handleTagDeleted = (tagName) => {
  const index = data.tags.indexOf(tagName);
  if (index !== -1) {
    data.tags.splice(index, 1);
  }
};
</script>
