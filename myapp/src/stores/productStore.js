import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
import axiosAdmin from "../api/axiosAdmin";
import Cookies from "js-cookie";
const token = Cookies.get("admin");
export const useProductStore = defineStore("product", {
  state: () => ({
    productById: null,
    color: [],
    productRatings: [],
    wishlist: [],
  }),
  getters: {
    isProductInWishList: (state) => (productId) => {
      return state.wishlist.includes(productId);
    },
  },
  actions: {
    async getAllProduct() {
      const response = await axiosClient.get("product");
      return response.data;
    },
    async getColorById(id) {
      const response = await axiosClient.get(`color/${id}`);
      this.$state.color = response.data;
    },
    async getProductById(id) {
      const response = await axiosClient.get(`product/${id}`);
      return response.data;
    },

    async postRating(star, id, comment) {
      try {
        await axiosClient.put("product/rating", {
          star: star,
          prodId: id,
          comment: comment,
        });
        await this.updateRatings(id);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("posted");
      }
    },
    async updateRatings(productId) {
      try {
        const response = await axiosClient.get(`product/${productId}`);
        this.productRatings = response.data.ratings;
        console.log(this.productRatings);
      } catch (error) {
        console.log(error);
      }
    },
    addToWishList(productId) {
      if (!this.isProductInWishList(productId)) {
        this.wishlist.push(productId);
        this.saveWishListToCookie();
      } else {
        alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng.");
      }
    },
    removeFromWishList(productId) {
      const index = this.wishlist.indexOf(productId);
      if (index !== -1) {
        this.wishlist.splice(index, 1);
        this.saveWishListToCookie();
      }
    },
    saveWishListToCookie() {
      const wishListString = JSON.stringify(this.wishlist);
      Cookies.set("wishlist", wishListString);
    },
    restoreWishListFromCookie() {
      const wishListString = Cookies.get("wishlist");
      if (wishListString) {
        this.wishlist = JSON.parse(wishListString);
      }
    },
    async toggleProductToWishList(productId, action) {
      try {
        const token = Cookies.get("user");
        console.log("token:", token);
        if (token) {
          if (action == "add") {
            await axiosClient.put("product/wishlist", { prodId: productId });
            this.addToWishList(productId);
          } else if (action == "remove") {
            await axiosClient.put("product/wishlist", { prodId: productId });
            this.removeFromWishList(productId);
          }
        } else {
          console.log("no token here");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getAllCategoryProduct() {
      const response = await axiosClient.get("proCat");
      return response.data;
    },
    async pushImageToCloud(img) {
      try {
        const request = await axiosAdmin.post(
          "product/upload",
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
    async createProduct(title, brand, category, color, quanlity, price, image, description) {
      try {
        const request = await axiosAdmin.post("product", {
          title: title,
          brand: brand,
          category: category,
          color: color,
          quanlity: quanlity,
          price: price,
          images: image,
          description: description,
        });
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProductById(productId) {
      try {
        const request = await axiosAdmin.delete(`product/${productId}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createProductCategory(title) {
      try {
        const request = await axiosAdmin.post("proCat", { title: title });
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProductCategory(categoryId) {
      try {
        const request = await axiosAdmin.delete(`proCat/${categoryId}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
