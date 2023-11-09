import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
import Cookies from "js-cookie";
import axiosAdmin from "../api/axiosAdmin";
const token = Cookies.get("admin");
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
    async deleteBlog(blogId) {
      try {
        const request = await axiosAdmin.delete(`blog/delete-blog/${blogId}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async pushImageToCloud(img) {
      try {
        const request = await axiosAdmin.post(
          "blog/upload",
          { images: img },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return request.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createBlog(title, category, description, image) {
      try {
        const request = await axiosAdmin.post("blog/create-blog", {
          title: title,
          category: category,
          description: description,
          images: image,
        });
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createBlogCategory(title) {
      try {
        const request = await axiosAdmin.post("blogCat", {
          title: title,
        });
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBlogCategory(id) {
      try {
        const request = await axiosAdmin.delete(`blogCat/${id}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
