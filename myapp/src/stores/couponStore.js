import { defineStore } from "pinia";
import axiosAdmin from "../api/axiosAdmin";

export const useCouponStore = defineStore("coupon", {
  state: () => ({}),

  actions: {
    async getAllCoupon() {
      try {
        const response = await axiosAdmin.get("coupon");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async createNewCoupon(name, expiry, discount) {
      try {
        const request = await axiosAdmin.post("coupon", {
          name: name,
          expiry: expiry,
          discount: discount,
          isUsed: false, // Thêm trường isUsed với giá trị mặc định là false
        });
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCouponById(couponId) {
      try {
        const request = await axiosAdmin.delete(`coupon/${couponId}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },

    async markCouponAsUsed(couponId) {
      try {
        const request = await axiosAdmin.put(`coupon/markAsUsed/${couponId}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
