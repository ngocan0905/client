<template>
  <div v-if="userName" class="font-semibold">
    {{ userName }}
  </div>
</template>

<script setup>
const { data } = defineProps(["data"]);
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/userStore";
const productStore = useUserStore();
const userName = ref("");
onMounted(async () => {
  const user = await productStore.getUserById(data);
  userName.value = user.firstName + " " + user.lastName;
});
</script>
