import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
export const useProductStore = defineStore("product", {
  state: () => ({
    productById: null,
    color: null,

    reviewers: [],
  }),
  actions: {
    async getColorById(id) {
      const response = await axiosClient.get(`color/${id}`);
      this.$state.color = response.data;
    },
    async getProductById(id) {
      const response = await axiosClient.get(`product/${id}`);
      this.$state.productById = response.data;
    },
    async getReviewerById(id) {
      const response = await axiosClient.get(`user/${id}`);
      this.reviewers = response.data.firstName + " " + response.data.lastName;
      console.log(this.reviewers);
      return this.reviewers;
    },
  },
});
