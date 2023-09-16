<template>
  <div class="flex flex-col  items-center bg-gray-900">
    <div class=" text-white w-4/5 flex items-center py-3 font-mono">
      <div class="text-4xl w-1/3 flex ">
        <div class="cursor-pointer">NGOCAN</div>
      </div>
      <div class="w-1/3 flex items-center bg-white">
        <input type="text" class="w-full py-1 text-sm outline-none text-gray-800 px-2 placeholder:text-xs"
          placeholder="Search product here..." />
        <MagnifyingGlassIcon class="h-8 w-8 cursor-pointer text-black" />
      </div>
      <div class="w-1/3 ">
        <ul class="flex w-full justify-end text-sm">
          <li class="flex flex-col items-center mr-4">
            <HeartIcon class="h-6 w-6 cursor-pointer" /> Favorite
          </li>
          <li class="flex flex-col items-center mr-4">
            <UserIcon class="h-6 w-6 cursor-pointer" /> My account
          </li>
          <li class="flex flex-col items-center mr-4">
            <ShoppingCartIcon class="h-6 w-6 cursor-pointer" /> Cart
          </li>
        </ul>
      </div>
    </div>
    <hr class="w-full" />
    <div class=" text-white w-4/5 flex items-center py-3 uppercase">
      <div class="text-md w-1/5 flex  items-center border-r-4 border-double">
        Shop categories
        <ChevronDownIcon class="h-3 w-3 ml-4" />
      </div>
      <div class="w-1/3">
        <ul class="flex w-full justify-evenly">
          <li>home</li>
          <li>our store</li>
          <li>blogs</li>
          <li>contact</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  HeartIcon,
  UserIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
</script>
