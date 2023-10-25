import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
export const useGeneralStore = defineStore("general", {
  state: () => ({
    isLoginOpen: false,
    isAdminLoginOpen: false,
    isLoading: false,
    isCreateProductOpen: false,
  }),
  actions: {
    async getAllUser() {
      const response = await axiosClient.get("/user/all-user");
      return response.data;
    },
    async getBrand() {
      const response = await axiosClient.get("brand");
      return response.data;
    },
    async getColor() {
      const response = await axiosClient.get("color");
      return response.data;
    },
  },
});
