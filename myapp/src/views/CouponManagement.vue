<template>
  <AdminLayout>
    <div>
      <div class="grid grid-cols-12 my-4">
        <div class="col-span-6 text-lg font-semibold mx-4 px-4 py-2 rounded text-center">
          Coupon Total : {{ listCoupon.length }}
        </div>
        <div class="flex col-span-6 justify-between items-center mt-4">
          <div>
            <button
              @click="sortByName"
              class="bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200 duration-300 hover:scale-105 active:scale-95 mr-10"
            >
              Sort by Name
            </button>
            <button
              @click="sortByExpiry"
              class="bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200 duration-300 hover:scale-105 active:scale-95 ml-10"
            >
              Sort by Expiry
            </button>
          </div>
          <div v-if="!loading && listCoupon.length === 0" class="text-center">
            No coupons available.
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center h-24">Loading...</div>
      <div
        v-else
        v-for="coupon in sortedCoupons"
        :key="coupon._id"
        class="py-2 px-4 border-b grid grid-cols-12 text-lg"
      >
        <ListCoupon :data="coupon" @delete="deleteCoupon" />
      </div>
      <div v-if="!loading && listCoupon.length === 0" class="text-center mt-4">
        No coupons available.
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import ListCoupon from "../components/ListCoupon.vue";
import { useCouponStore } from "../stores/couponStore";
import { useGeneralStore } from "../stores/generalStore";

const generalStore = useGeneralStore();
const couponStore = useCouponStore();
const listCoupon = ref([]);
const loading = ref(false);
const sortedCoupons = ref(listCoupon.value);

onMounted(async () => {
  loading.value = true;
  try {
    listCoupon.value = await couponStore.getAllCoupon();
    sortByExpiry(); // Mặc định sắp xếp theo ngày hết hạn khi trang tải
  } catch (error) {
    console.error("Failed to load coupons:", error);
  } finally {
    loading.value = false;
  }
});

const deleteCoupon = async (couponId) => {
  try {
    generalStore.isLoading = true;
    const deleted = await couponStore.deleteCouponById(couponId);
    if (deleted) {
      const newList = listCoupon.value.filter((coupon) => coupon._id !== couponId);
      listCoupon.value = newList;
      generalStore.isLoading = false;
      generalStore.notify("Coupon deleted successfully", "success");
    }
  } catch (error) {
    console.error("Failed to delete coupon:", error);
    generalStore.notify("Failed to delete coupon", "error");
  }
};

// Function to sort coupons by name
const sortByName = () => {
  sortedCoupons.value = [...listCoupon.value].sort((a, b) => a.name.localeCompare(b.name));
};

// Function to sort coupons by expiry date
const sortByExpiry = () => {
  sortedCoupons.value = [...listCoupon.value].sort(
    (a, b) => new Date(a.expiry) - new Date(b.expiry)
  );
};
</script>
