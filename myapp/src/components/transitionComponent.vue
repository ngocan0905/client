<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform scale-50 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <slot></slot>
  </transition>
</template>
