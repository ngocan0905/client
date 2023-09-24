import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
import Cookies from "js-cookie";
export const useProductStore = defineStore("product", {
  state: () => ({
    productById: null,
    color: null,
    reviewer: [],
    likedProductIds: [],
  }),
  getters: {
    isProductLiked: (state) => (productId) => state.likedProductIds.includes(productId),
  },
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
      const name = response.data.firstName + " " + response.data.lastName;
      this.reviewer.push(name);
    },
    addLikedProductId(productId) {
      this.likedProductIds.push(productId);
      Cookies.set("favoriteProduct", this.likedProductIds);
    },
    removeLikedProductId(productId) {
      const index = this.likedProductIds.indexOf(productId);
      if (index !== -1) {
        this.likedProductIds.splice(index, 1);
        Cookies.set("favoriteProduct", this.likedProductIds);
      }
    },
    loadLikedProductIds() {
      try {
        const cookieValue = Cookies.get("favoriteProduct");
        if (cookieValue) {
          const decodeString = decodeURIComponent(cookieValue);
          const idArray = decodeString.split(",");
          this.likedProductIds = idArray;
          console.log(this.likedProductIds);
        }
      } catch (error) {
        console.log("error parsing json from cookie", error);
      }
    },
  },
});
