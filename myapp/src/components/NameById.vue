<template>
  <div v-if="name" class="font-semibold">
    {{ name.firstName + " " + name.lastName }}
  </div>
</template>

<script setup>
const { data } = defineProps(["data"]);
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/userStore";
const productStore = useUserStore();
const name = ref();
onMounted(async () => {
  await productStore.getUserById(data);
  name.value = productStore.user;
});
</script>
