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
              Coupon<span class="text-red-500 ml-2">*</span></label
            >
            <input
              id="title"
              class="border outline-none p-1 capitalize shadow-md min-w-[300px] rounded-md my-2"
              type="text"
              v-model="selectedName"
              placeholder="name of coupon"
            />
          </div>
        </div>
        <div class="flex justify-end items-center py-4">
          <button
            @click="generalStore.isCreateCouponOpen = false"
            class="bg-red-600 text-white py-1 px-2 mr-4 rounded-md"
          >
            Cancel
          </button>
          <button
            :disabled="!selectedName"
            :class="
              !selectedName
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white'
            "
            class="py-1 px-2 mr-4 rounded-md"
            @click="createCoupon()"
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
import { useCouponStore } from "../stores/couponStore";
import { useGeneralStore } from "../stores/generalStore";

const generalStore = useGeneralStore();
const couponStore = useCouponStore();
const selectedName = ref("");

const createCoupon = async () => {
  try {
    generalStore.isLoading = true;
    const created = await couponStore.createNewCoupon(selectedName.value, new Date(), 30);
    if (created) {
      location.reload();
      generalStore.isCreateCouponOpen = false;
      generalStore.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
