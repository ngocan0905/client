<template>
  <ClientLayout>
    <div class="w-4/5">
      <div class="py-10">
        <div class="p-4 border shadow-xl rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.129169040963!2d106.8082287118668!3d10.8014176893045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317526b6926d1fe1%3A0x1eeaffd2e04eb52a!2zMTE0NyDEkC4gTmd1eeG7hW4gRHV5IFRyaW5oLCBMb25nIFRyxrDhu51uZywgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1695707908236!5m2!1svi!2s"
            style="border: 0"
            class="w-full h-[450px]"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="p-4 border border-gray-200 shadow-xl rounded-lg flex mt-10">
          <div class="w-1/2 px-2">
            <div class="text-2xl font-semibold">Contact</div>
            <input
              type="text"
              class="w-full py-1 mt-2 px-2 rounded-lg outline-none"
              placeholder="Name"
            />
            <input
              type="text"
              class="w-full py-1 mt-2 px-2 rounded-lg outline-none"
              placeholder="Email "
            />
            <input
              type="text"
              class="w-full py-1 mt-2 px-2 rounded-lg outline-none"
              placeholder="Phone Number "
            />
            <textarea
              wrap="soft"
              class="w-full py-1 mt-2 px-2 rounded-lg outline-none"
              placeholder="Comment"
            ></textarea>
            <button
              class="text-gray-50 bg-gray-600 px-3 py-1 rounded-lg mt-4 hover:bg-gray-900 hover:scale-105 duration-300"
            >
              Send
            </button>
          </div>
          <div class="px-4">
            <div class="text-2xl font-semibold capitalize">get in touch with us</div>
            <div class="flex my-3 items-center">
              <HomeIcon class="w-5 h-5 text-gray-600 mr-2" />
              <div class="capitalize">
                1147 nguyen duy trinh, long truong, district 9, thu duc city
              </div>
            </div>
            <div class="flex my-3 items-center">
              <PhoneIcon class="w-5 h-5 text-gray-600 mr-2" />
              <div class="capitalize">(+84)786602721</div>
            </div>
            <div class="flex my- items-center3">
              <EnvelopeIcon class="w-5 h-5 text-gray-600 mr-2" />
              <div class="">techworld@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientLayout>
</template>
<script setup>
import { EnvelopeIcon, HomeIcon, PhoneIcon } from "@heroicons/vue/24/solid";
import ClientLayout from "../layouts/ClientLayout.vue";
</script>
