<template>
  <router-link :to="{ name: 'product', params: { id: data._id } }"
    ><div
      class="w-full max-w-[300px] h-auto pb-10 my-10 shadow-xl rounded-lg overflow-hidden relative border-2"
    >
      <div class="absolute right-2 top-2">
        <HeartIcon class="w-5 h-5 text-gray-50 drop-shadow-lg" />
      </div>
      <div class="min-h-[300px]">
        <img
          v-if="data.images == 0"
          src="../assets/images/master_dynamic_two.webp"
          alt=""
          class="object-cover rounded-md"
        />
        <img v-else :src="data.images" alt="" class="object-cover rounded-md" />
      </div>

      <div>
        <div class="text-base font-semibold p-2 uppercase text-start flex flex-wrap justify-start">
          {{ data.title }}
        </div>
        <div class="p-2">
          <StarRating
            :rating="data.totalrating"
            :read-only="true"
            :star-size="20"
            :show-rating="false"
            active-color="#E5D928"
          />
        </div>
        <div class="text-start p-2 font-semibold">${{ data.price }}</div>
      </div>
    </div></router-link
  >
</template>
<script setup>
import StarRating from "vue-star-rating";
import { HeartIcon } from "@heroicons/vue/24/solid";
const { data } = defineProps(["data"]);
</script>
