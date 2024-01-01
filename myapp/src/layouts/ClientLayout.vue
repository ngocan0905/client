<template>
  <div class="min-h-screen relative overflow-hidden">
    <HeaderNav :class="scrolled ? 'header' : 'bg-blue-950'" class="absolute z-20 right-0 left-0" />
    <div
      class="flex flex-col items-center justify-center mb-10 h-full bg-gradient-to-b from-blue-950 to-purple-950 text-white"
    >
      <div class="max-w-6xl mx-auto py-8">
        <!-- Optional: BreadCrumb component -->
        <!-- <BreadCrumb class="mt-8" /> -->
        <slot></slot>
      </div>
    </div>
    <FooterNav class="absolute bottom-0 left-0 right-0 bg-gray-900 text-white" />
  </div>
</template>

<script setup>
import HeaderNav from "../components/HeaderClient.vue";
import FooterNav from "../components/FooterClient.vue";
import { ref, onMounted, onUnmounted } from "vue";

const scrolled = ref(false);
let lastScrollTop = 0;

const handleScroll = () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    scrolled.value = true;
  } else {
    // Scrolling up
    scrolled.value = false;
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Header styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(4, 0, 30, 0.553);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, opacity 0.3s ease; /* Thay đổi giá trị thời gian chuyển động thành 300ms */
  transform: translateY(0);
  opacity: 1;
  z-index: 1000;
}

/* Header styles when scrolled */
.scrolled .header {
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

/* Footer styles */
.footer {
  background-color: #333333;
  color: #ffffff;
}
</style>
