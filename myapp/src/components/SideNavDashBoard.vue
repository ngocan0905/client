<template>
  <aside class="flex flex-col bg-gray-800 h-screen overflow-auto text-white">
    <div class="px-4 text-4xl font-bold py-4">NGOCAN Retail</div>
    <div class="px-4 text-2xl font-semibold py-2">
      <RouterLink to="/dashboard"> Dashboard </RouterLink>
    </div>
    <div class="">
      <div class="mx-auto w-full max-w-md rounded-2xl p-2">
        <!-- user -->
        <Disclosure as="div" class="my-3 border-b" v-slot="{ open }">
          <DisclosureButton
            class="flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium"
          >
            <UserCircleIcon class="w-6 h-6 mr-2" />
            <span>User</span>
            <ChevronRightIcon
              :class="open ? 'rotate-90 transform duration-300' : 'duration-300'"
              class="h-5 w-5 text-gray-200"
            />
          </DisclosureButton>
          <TransitionRoot
            :show="open"
            enter="transition  ease-in-out duration-200 transform"
            enter-from="opacity-0 -translate-y-5 "
            enter-to=" opacity-100 translate-y-0"
            leave="transition ease-in-out duration-200 transform"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 -translate-y-5"
          >
            <RouterLink :to="{ name: 'UserManagement' }"
              ><DisclosurePanel
                class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
              >
                All User
              </DisclosurePanel></RouterLink
            >
            <DisclosurePanel
              @click="generalStore.isCreateUserOpen = true"
              class="cursor-pointer px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
            >
              Create Admin
            </DisclosurePanel>
          </TransitionRoot>
        </Disclosure>
        <!-- product -->
        <Disclosure as="div" class="my-3 border-b" v-slot="{ open }">
          <DisclosureButton class="flex w-full rounded-lg px-4 py-2 text-sm font-medium">
            <CubeIcon class="w-6 h-6 mr-2" />
            <span>Product</span>
            <ChevronRightIcon
              :class="open ? 'rotate-90 transform duration-300' : 'duration-300'"
              class="h-5 w-5 text-gray-200"
            />
          </DisclosureButton>
          <TransitionRoot
            :show="open"
            enter="transition  ease-in-out duration-200 transform"
            enter-from="opacity-0 -translate-y-5 "
            enter-to=" opacity-100 translate-y-0"
            leave="transition ease-in-out duration-200 transform"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 -translate-y-5"
          >
            <RouterLink :to="{ name: 'ProductManagement' }"
              ><DisclosurePanel
                class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
              >
                All Product
              </DisclosurePanel></RouterLink
            >

            <DisclosurePanel
              @click="generalStore.isCreateProductOpen = true"
              class="cursor-pointer px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
            >
              Create Product
            </DisclosurePanel>
            <DisclosurePanel
              class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
            >
              <RouterLink :to="{ name: 'ProductCategoryManagement' }">All Category</RouterLink>
            </DisclosurePanel>
            <DisclosurePanel
              @click="generalStore.isCreateProductCategoryOpen = true"
              class="cursor-pointer px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
            >
              Create Category
            </DisclosurePanel>
          </TransitionRoot>
        </Disclosure>
        <!-- blog -->
        <Disclosure as="div" class="my-3 border-b" v-slot="{ open }">
          <DisclosureButton class="flex w-full rounded-lg px-4 py-2 text-sm font-medium">
            <DocumentTextIcon class="w-6 h-6 mr-2" />
            <span>Blog</span>
            <ChevronRightIcon
              :class="open ? 'rotate-90 transform duration-300' : 'duration-300'"
              class="h-5 w-5 text-gray-200"
            />
          </DisclosureButton>
          <TransitionRoot
            :show="open"
            enter="transition  ease-in-out duration-200 transform"
            enter-from="opacity-0 -translate-y-5 "
            enter-to=" opacity-100 translate-y-0"
            leave="transition ease-in-out duration-200 transform"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 -translate-y-5"
          >
            <RouterLink :to="{ name: 'BlogManagement' }">
              <DisclosurePanel
                class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
              >
                All Blog
              </DisclosurePanel></RouterLink
            >

            <DisclosurePanel
              @click="generalStore.isCreateBlogOpen = true"
              class="cursor-pointer px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
            >
              Create Blog
            </DisclosurePanel>
            <RouterLink :to="{ name: 'BlogCategoryManagement' }"
              ><DisclosurePanel
                class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
              >
                All Category
              </DisclosurePanel></RouterLink
            >

            <DisclosurePanel
              class="cursor-pointer px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
              @click="generalStore.isCreateBlogCategoryOpen = true"
            >
              Create Category
            </DisclosurePanel>
          </TransitionRoot>
        </Disclosure>
        <!-- brand -->
        <Disclosure as="div" class="my-3 border-b" v-slot="{ open }">
          <DisclosureButton class="flex w-full rounded-lg px-4 py-2 text-sm font-medium">
            <SwatchIcon class="w-6 h-6 mr-4" />
            <span>Brand</span>
            <ChevronRightIcon
              :class="open ? 'rotate-90 transform duration-300' : 'duration-300'"
              class="h-5 w-5 text-gray-200"
            />
          </DisclosureButton>
          <TransitionRoot
            :show="open"
            enter="transition  ease-in-out duration-200 transform"
            enter-from="opacity-0 -translate-y-5 "
            enter-to=" opacity-100 translate-y-0"
            leave="transition ease-in-out duration-200 transform"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 -translate-y-5"
          >
            <RouterLink :to="{ name: 'BrandManagement' }"
              ><DisclosurePanel
                class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
              >
                All Brand
              </DisclosurePanel></RouterLink
            >

            <DisclosurePanel
              @click="generalStore.isCreateBrandOpen = true"
              class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
            >
              Create New Brand
            </DisclosurePanel>
          </TransitionRoot>
        </Disclosure>
        <!-- coupon -->
        <Disclosure as="div" class="my-3" v-slot="{ open }">
          <DisclosureButton class="flex w-full rounded-lg px-4 py-2 text-sm font-medium">
            <ReceiptPercentIcon class="w-6 h-6 mr-2" />
            <span>Coupon</span>
            <ChevronRightIcon
              :class="open ? 'rotate-90 transform duration-300' : 'duration-300'"
              class="h-5 w-5 text-gray-200"
            />
          </DisclosureButton>
          <TransitionRoot
            :show="open"
            enter="transition  ease-in-out duration-200 transform"
            enter-from="opacity-0 -translate-y-5 "
            enter-to=" opacity-100 translate-y-0"
            leave="transition ease-in-out duration-200 transform"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 -translate-y-5"
          >
            <RouterLink :to="{ name: 'CouponManagement' }"
              ><DisclosurePanel
                class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
              >
                All Coupon
              </DisclosurePanel></RouterLink
            >

            <DisclosurePanel
              @click="generalStore.isCreateCouponOpen = true"
              class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
            >
              Create New Coupon
            </DisclosurePanel>
          </TransitionRoot>
        </Disclosure>
      </div>
    </div>
    <div class="px-4 text-2xl font-semibold py-2">Analyst</div>
  </aside>
</template>
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, TransitionRoot } from "@headlessui/vue";
import {
  ChevronRightIcon,
  CubeIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  SwatchIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/solid";
import { RouterLink } from "vue-router";
import { useGeneralStore } from "../stores/generalStore";
const generalStore = useGeneralStore();
</script>
