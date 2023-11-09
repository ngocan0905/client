<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
  >
    <div
      class="relative bg-white w-fit min-w-[450px] h-fit max-h-[600px] p4 rounded-lg overflow-auto"
    >
      <div class="relative">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
