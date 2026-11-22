<script setup>
import { CheckCircle2, Info, X } from 'lucide-vue-next'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
</script>

<template>
  <div
    class="pointer-events-none fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2 pb-[env(safe-area-inset-bottom,0px)] sm:bottom-5 sm:right-5"
    aria-live="polite"
    aria-atomic="false"
  >
    <TransitionGroup name="toast">
      <div
        v-for="item in toastStore.items"
        :key="item.id"
        class="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-zinc-200/90 bg-white/95 px-3.5 py-2.5 text-sm font-medium text-zinc-900 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 dark:text-zinc-100"
      >
        <CheckCircle2 v-if="item.tone === 'success'" class="h-4 w-4 shrink-0 text-emerald-500" />
        <Info
          v-else-if="item.tone === 'accent'"
          class="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400"
        />
        <Info v-else class="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />

        <span class="max-w-[28ch] leading-snug">{{ item.message }}</span>

        <button
          type="button"
          class="btn-press ml-1 rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          aria-label="Dismiss"
          @click="toastStore.dismiss(item.id)"
        >
          <X class="h-3.5 w-3.5 shrink-0" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
