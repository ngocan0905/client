<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative bg-white w-fit h-fit max-h-[600px] p4 rounded-lg overflow-auto">
      <div class="relative">
        <div class="col-span-1 flex flex-col p-4">
          <label for="title" class="text-lg font-semibold"
            >Coupon Name<span class="text-red-500 ml-2">*</span></label
          >
          <input
            id="title"
            class="border outline-none p-1 shadow-md min-w-[300px] rounded-md my-2"
            type="text"
            v-model="selectedName"
            placeholder="Name of coupon"
          />
          <span v-if="!selectedName" class="text-red-500 text-sm">Please enter coupon name</span>
        </div>
        <div class="col-span-1 flex flex-col p-4">
          <label for="expiryDate" class="text-lg font-semibold"
            >Expiry Date<span class="text-red-500 ml-2">*</span></label
          >
          <input
            id="expiryDate"
            class="border outline-none p-1 shadow-md min-w-[300px] rounded-md my-2"
            type="date"
            v-model="selectedExpiryDate"
          />
          <span v-if="!selectedExpiryDate" class="text-red-500 text-sm"
            >Please select expiry date</span
          >
        </div>
        <div class="col-span-1 flex flex-col p-4">
          <label for="discountPercentage" class="text-lg font-semibold"
            >Discount Percentage<span class="text-red-500 ml-2">*</span></label
          >
          <input
            id="discountPercentage"
            class="border outline-none p-1 shadow-md min-w-[300px] rounded-md my-2"
            type="number"
            v-model.number="selectedDiscountPercentage"
            placeholder="Enter discount percentage"
          />
          <span v-if="selectedDiscountPercentage < 0" class="text-red-500 text-sm"
            >Discount percentage must be a positive number</span
          >
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
const selectedExpiryDate = ref("");
const selectedDiscountPercentage = ref(0);

const createCoupon = async () => {
  try {
    generalStore.isLoading = true;
    if (selectedName.value && selectedExpiryDate.value && selectedDiscountPercentage.value >= 0) {
      const created = await couponStore.createNewCoupon(
        selectedName.value,
        selectedExpiryDate.value,
        selectedDiscountPercentage.value
      );
      if (created) {
        generalStore.isCreateCouponOpen = false;
        generalStore.isLoading = false;
      }
    } else {
      console.log("Please fill in all required fields.");
    }
  } catch (error) {
    console.error("Failed to create coupon:", error);
  }
};
</script>
