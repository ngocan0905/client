import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
import axiosAdmin from "../api/axiosAdmin";
export const useBrandStore = defineStore("brand", {
  state: () => ({}),
  actions: {
    async getBrand() {
      const response = await axiosClient.get("brand");
      return response.data;
    },
    async createNewBrand(title) {
      try {
        const request = await axiosAdmin.post("brand", { title: title });
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBrand(brandId) {
      try {
        const request = await axiosAdmin.delete(`brand/${brandId}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
