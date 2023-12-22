import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",

      component: HomeView,
    },
    {
      path: "/store",
      name: "store",
      meta: {
        breadcrumb: "> store",
      },
      component: () => import("../views/StoreView.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      meta: {
        breadcrumb: "> blog",
      },
      component: () => import("../views/BlogView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      meta: {
        breadcrumb: "> cart",
      },
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/cart/checkout/:id",
      name: "checkout",
      component: () => import("../views/CheckoutView.vue"),
    },
    {
      path: "/product/:id",
      name: "product",
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/blog/:id",
      name: "blog-detail",
      component: () => import("../views/BlogDetailView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/favorite",
      name: "favorite",
      component: () => import("../views/FavoriteView.vue"),
    },
    // admin
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {
        breadcrumb: "> dashboard",
      },
      component: () => import("../views/DashBoard.vue"),
    },
    {
      path: "/dashboard/user",
      name: "UserManagement",
      meta: {
        breadcrumb: "user",
      },
      component: () => import("../views/UserMagnagement.vue"),
    },
    {
      path: "/dashboard/product",
      name: "ProductManagement",
      meta: {
        breadcrumb: ">product",
      },
      component: () => import("../views/ProductManagement.vue"),
    },
    {
      path: "/dashboard/product/category",
      name: "ProductCategoryManagement",
      meta: {
        breadcrumb: "> category",
      },
      component: () => import("../views/CategoryManagement.vue"),
    },
    {
      path: "/dashboard/blog",
      name: "BlogManagement",
      meta: {
        breadcrumb: " > blog",
      },
      component: () => import("../views/BlogManagement.vue"),
    },
    {
      path: "/dashboard/blog/category",
      name: "BlogCategoryManagement",
      meta: {
        breadcrumb: "> category",
      },
      component: () => import("../views/BlogCategoryManagement.vue"),
    },
    {
      path: "/dashboard/brand",
      name: "BrandManagement",
      meta: {
        breadcrumb: "> brand",
      },
      component: () => import("../views/BrandManagement.vue"),
    },
    {
      path: "/dashboard/coupon",
      name: "CouponManagement",
      meta: {
        breadcrumb: "> coupon",
      },
      component: () => import("../views/CouponManagement.vue"),
    },
    {
      path: "/dashboard/product/:id",
      name: "DetailProduct",
      meta: {
        breadcrumb: ` > product > id`,
      },
      component: () => import("../views/EditProduct.vue"),
    },
  ],
});

export default router;
