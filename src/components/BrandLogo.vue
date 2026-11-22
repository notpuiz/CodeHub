<script setup>
defineProps({
  showWordmark: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'md',
  },
})
</script>

<template>
  <span class="brand-link inline-flex items-center gap-2.5 select-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      class="brand-mark shrink-0"
      :class="size === 'lg' ? 'h-9 w-9' : 'h-7 w-7'"
    >
      <!-- Rounded geometric hexagon silhouette (pure monochrome, zero gradients) -->
      <path
        d="M14.35 2.45a3.3 3.3 0 0 1 3.3 0l9.3 5.37a3.3 3.3 0 0 1 1.65 2.86v10.64a3.3 3.3 0 0 1-1.65 2.86l-9.3 5.37a3.3 3.3 0 0 1-3.3 0l-9.3-5.37a3.3 3.3 0 0 1-1.65-2.86V10.68a3.3 3.3 0 0 1 1.65-2.86l9.3-5.37Z"
        class="fill-zinc-950 dark:fill-white"
      />
      <!-- Terminal prompt chevron > -->
      <path
        d="M10.5 12.25 14.75 16 10.5 19.75"
        class="stroke-white dark:stroke-zinc-950"
        stroke-width="2.35"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- Terminal prompt underscore _ -->
      <path
        d="M16.75 19.75h4.75"
        class="stroke-white dark:stroke-zinc-950"
        stroke-width="2.35"
        stroke-linecap="round"
      />
    </svg>

    <span
      v-if="showWordmark"
      class="text-base font-bold tracking-tight text-zinc-950 dark:text-white"
    >
      Code<span class="font-medium text-zinc-500 dark:text-zinc-400">Hub</span>
    </span>
  </span>
</template>
