<template>
  <div class="w-full max-w-[300px] h-auto pb-10 my-10 shadow-xl rounded-lg border-2">
    <div class="min-h-[300px]">
      <img
        v-if="!data.images"
        src="../assets/images/master_dynamic_two.webp"
        class="object-contain rounded-md"
      />
      <img v-else :src="data.images" alt="" class="object-contain rounded-md min-h-[300px]" />
    </div>

    <div>
      <div class="text-base font-semibold py-2 uppercase">{{ data.title }}</div>
    </div>
    <div>{{ formatDate(data.updatedAt) }}</div>
    <div>
      <button
        class="py-2 px-4 border-gray-900 border-2 duration-500 hover:bg-gray-900 rounded-lg hover:text-gray-100 my-4 font-semibold uppercase text-xs"
      >
        read more
      </button>
    </div>
  </div>
</template>
<script setup>
const { data } = defineProps(["data"]);
const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString();
};
</script>
