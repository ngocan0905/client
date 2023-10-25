import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";

export const useBlogStore = defineStore("blogs", {
  state: () => ({}),
  actions: {
    async getBlogs() {
      const response = await axiosClient.get("blog/all-blog");

      return response.data;
    },
    async getBlogById(id) {
      const response = await axiosClient.get(`blog/${id}`);
      const blog = response.data;
      return blog;
    },
    async getBlogCategory() {
      const response = await axiosClient.get("blogCat");
      return response.data;
    },
  },
});
