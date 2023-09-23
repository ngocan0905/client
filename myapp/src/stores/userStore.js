import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async getUserById(id) {
      const response = await axiosClient.get(`user/${id}`);
      this.user = response.data;
    },
  },
});
