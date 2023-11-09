<template>
  <AdminLayout>
    <div>
      <div class="grid grid-cols-12 my-4">
        <div
          class="col-span-3 border-2 border-gray-800 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Coupon Total : {{ listCoupon.length }}
        </div>
      </div>
      <div
        v-for="coupon in listCoupon"
        :key="coupon._id"
        class="py-2 px-4 border-b grid grid-cols-12 text-lg"
      >
        <ListCoupon :data="coupon" @delete="deleteCoupon" />
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import { useCouponStore } from "../stores/couponStore";
import ListCoupon from "../components/ListCoupon.vue";
import { useGeneralStore } from "../stores/generalStore";
const generalStore = useGeneralStore();
const couponStore = useCouponStore();
const listCoupon = ref([]);
onMounted(async () => {
  listCoupon.value = await couponStore.getAllCoupon();
});
const deleteCoupon = async (couponId) => {
  try {
    generalStore.isLoading = true;
    const deleted = await couponStore.deleteCouponById(couponId);
    if (deleted) {
      const newList = listCoupon.value.filter((coupon) => coupon._id !== couponId);
      listCoupon.value = newList;
      generalStore.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
