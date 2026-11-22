<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(true)
let hideTimer = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = false
    return
  }

  hideTimer = setTimeout(() => {
    visible.value = false
  }, 720)
})

onUnmounted(() => {
  clearTimeout(hideTimer)
})
</script>

<template>
  <Transition name="logo-intro">
    <div
      v-if="visible"
      aria-hidden="true"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-zinc-950"
      @click="visible = false"
    >
      <div class="logo-intro-mark flex flex-col items-center gap-3.5 select-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          class="h-16 w-16 shrink-0"
        >
          <path
            d="M14.35 2.45a3.3 3.3 0 0 1 3.3 0l9.3 5.37a3.3 3.3 0 0 1 1.65 2.86v10.64a3.3 3.3 0 0 1-1.65 2.86l-9.3 5.37a3.3 3.3 0 0 1-3.3 0l-9.3-5.37a3.3 3.3 0 0 1-1.65-2.86V10.68a3.3 3.3 0 0 1 1.65-2.86l9.3-5.37Z"
            class="fill-zinc-950 dark:fill-white"
          />
          <path
            d="M10.5 12.25 14.75 16 10.5 19.75"
            class="stroke-white dark:stroke-zinc-950"
            stroke-width="2.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.75 19.75h4.75"
            class="logo-intro-cursor stroke-white dark:stroke-zinc-950"
            stroke-width="2.35"
            stroke-linecap="round"
          />
        </svg>

        <span
          class="logo-intro-wordmark text-2xl font-bold tracking-tight text-zinc-950 dark:text-white"
        >
          Code<span class="font-medium text-zinc-500 dark:text-zinc-400">Hub</span>
        </span>
      </div>
    </div>
  </Transition>
</template>
