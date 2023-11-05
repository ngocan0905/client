import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
import axiosAdmin from "../api/axiosAdmin";
import Cookies from "js-cookie";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLogged: false,
    adminLogged: false,
  }),

  actions: {
    async getUserById(id) {
      try {
        const response = await axiosClient.get(`user/${id}`);

        return response.data;
      } catch (error) {
        console.log("get user by id fail", error);
      }
    },
    async loginUser(email, password) {
      try {
        const request = await axiosClient.post("/user/login", {
          email: email,
          password: password,
        });

        const token = request.data.token;
        Cookies.set("user", token);
        this.isLogged = true;
      } catch (error) {
        console.log("loggin fail", error);
      }
    },
    async loginAdmin(email, password) {
      try {
        const request = await axiosClient.post("/user/admin-login", {
          email: email,
          password: password,
        });
        const token = request.data.token;
        Cookies.set("admin", token);
      } catch (error) {
        console.log("login admin failed", error);
      }
    },
    async registerUser(email, phoneNumber, password) {
      try {
        await axiosClient.post("/user/register", {
          email: email,
          mobile: phoneNumber,
          password: password,
        });
        this.loginUser(email, password);
      } catch (error) {
        console.log(error);
      }
    },
    async logoutUser() {
      try {
        await axiosClient.get("/user/logout");
        Cookies.remove("user");
        console.log("logout successed");
        this.isLogged = false;
      } catch (error) {
        console.log("logout fail", error);
      }
    },
    async addToCart(productId, count, color) {
      try {
        const cartItem = {
          _id: productId,
          count: count,
          color: color,
        };
        await axiosClient.post("user/cart", { cart: [cartItem] });
        console.log("add product successed");
      } catch (error) {
        console.log("add product to cart fail", error);
      }
    },
    async loadProductInCart() {
      const response = await axiosClient.get("user/cart");
      return response.data;
    },
    // admin role
    async registerAdmin(firstName, lastName, email, phoneNumber, password) {
      try {
        const request = await axiosClient.post("/user/register", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: phoneNumber,
          password: password,
          role: "admin",
        });
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async blockUser(userId) {
      try {
        const request = await axiosAdmin.put(`user/block-user/${userId}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async unblockUser(userId) {
      try {
        const request = await axiosAdmin.put(`user/unblock-user/${userId}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(userId) {
      try {
        const request = await axiosAdmin.delete(`user/${userId}`);
        return request.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
5;
