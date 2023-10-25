<template>
  <AdminLayout>
    <div>
      <div class="grid grid-cols-12 my-4">
        <div
          class="col-span-3 border-2 border-gray-800 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Account total : {{ listUser.length }}
        </div>
        <div
          class="col-span-3 border-2 border-red-500 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Admin total : {{ adminUserCount }}
        </div>
        <div
          class="col-span-3 border-2 border-green-500 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          User total : {{ clientUSerCount }}
        </div>
      </div>
      <div
        v-for="user in listUser"
        :key="user._id"
        class="py-2 px-4 border-b grid grid-cols-12 text-lg"
      >
        <ListUserItem :user="user" />
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { useGeneralStore } from "../stores/generalStore";
import AdminLayout from "../layouts/AdminLayout.vue";
import ListUserItem from "../components/ListUserItem.vue";
const listUser = ref([]);
const generalStore = useGeneralStore();
onMounted(async () => {
  listUser.value = await generalStore.getAllUser();
});
const adminUserCount = computed(() => listUser.value.filter((user) => user.role == "admin").length);
const clientUSerCount = computed(() => listUser.value.filter((user) => user.role == "user").length);
</script>
