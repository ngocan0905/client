import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
import axiosAdmin from "../api/axiosAdmin";
import Cookies from "js-cookie";
const token = Cookies.get("admin");
export const useProductStore = defineStore("product", {
  state: () => ({
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
    async searchProductByName(query) {
      const response = await axiosClient.get(`product/search?productName=${query}`);
      return response.data;
    },
    async getColorById(id) {
      const response = await axiosClient.get(`color/${id}`);
      return response.data;
    },
    async getProductById(id) {
      const response = await axiosClient.get(`product/${id}`);
      this.productById = response.data;
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
    async deleteImageFromCloud(imgId) {
      try {
        const request = await axiosAdmin.delete(`product/delete-img/${imgId}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createProduct(title, brand, category, color, quantity, price, image, description) {
      try {
        const request = await axiosAdmin.post("product", {
          title: title,
          brand: brand,
          category: category,
          color: color,
          quantity: quantity,
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
    async updateProduct(productId, updatedProduct) {
      const { title, description, price, brand, category, color, images } = updatedProduct;
      try {
        const request = await axiosAdmin.patch(`product/${productId}`, {
          title: title,
          description: description,
          price: price,
          brand: brand,
          category: category,
          color: color,
          images: images,
        });
        return request.data;
      } catch (error) {
        console.error(error);
        throw new Error("Lỗi khi cập nhật sản phẩm"); // Bạn có thể xử lý lỗi ở đây hoặc truyền lỗi ra bên ngoài để xử lý ở nơi gọi hàm này.
      }
    },
    async addTagProduct(productId, tag) {
      try {
        const request = await axiosAdmin.post("/product/tag", {
          productId: productId,
          tags: [tag],
        });
        return request.data;
      } catch (error) {
        console.error(error);
        throw new Error("lỗi khi tạo tag sản phẩm");
      }
    },
    async deleteTagProduct(productId, tag) {
      try {
        const request = await axiosAdmin.delete(`product/tag/${productId}`, {
          data: {
            tagToDelete: tag,
          },
        });
        return request.data;
      } catch (error) {
        console.error(error);
        throw new Error("lỗi khi xóa sản phẩm");
      }
    },
    async getHotSaleProduct() {
      try {
        const response = await axiosClient.get(`product?tags=hot sale`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("lỗi khi lọc các sản phẩm hot sale");
      }
    },
    async getNewProduct() {
      try {
        const response = await axiosClient.get(`product?tags=new product`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("lỗi khi lọc các sản phẩm mới");
      }
    },
    async getProductByTag(tag) {
      try {
        const response = await axiosClient.get(`product?tags=${tag}`);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("lỗi khi lọc sản phẩm theo tag");
      }
    },
  },
});
