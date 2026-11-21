<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Check, Copy, Play } from 'lucide-vue-next'
import { usePlaygroundStore } from '@/stores/playground'
import { useLocaleStore } from '@/stores/locale'

const props = defineProps({
  example: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const playgroundStore = usePlaygroundStore()
const localeStore = useLocaleStore()
const copied = ref(false)
let copyTimer = null

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.example.code)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    copied.value = false
  }
}

function openInPlayground() {
  if (!props.example.playground) return
  playgroundStore.loadExample({
    title: props.example.title,
    ...props.example.playground,
  })
  router.push('/playground')
}
</script>

<template>
  <div
    class="my-5 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/60"
  >
    <div
      class="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200/80 px-3 py-2.5 sm:px-4 dark:border-zinc-800"
    >
      <div class="flex min-w-0 items-center gap-2">
        <span
          class="shrink-0 rounded bg-zinc-200/80 px-1.5 py-0.5 font-mono text-[11px] font-medium uppercase text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        >
          {{ example.language }}
        </span>
        <span class="truncate text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {{ example.title }}
        </span>
      </div>

      <div class="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          class="btn-press inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 sm:h-7 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          @click="copyCode"
        >
          <Transition name="state-fade" mode="out-in">
            <span
              v-if="copied"
              key="copied"
              class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"
            >
              <Check class="h-3.5 w-3.5 shrink-0" />
              {{ localeStore.t('codeCard.copied') }}
            </span>
            <span v-else key="copy" class="inline-flex items-center gap-1">
              <Copy class="h-3.5 w-3.5 shrink-0" />
              {{ localeStore.t('codeCard.copy') }}
            </span>
          </Transition>
        </button>

        <button
          v-if="example.playground"
          type="button"
          class="btn-press inline-flex h-8 items-center gap-1.5 rounded-md bg-zinc-900 px-2.5 text-xs font-medium text-white hover:bg-zinc-800 sm:h-7 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
          @click="openInPlayground"
        >
          <Play class="h-3 w-3 shrink-0 fill-current" />
          {{ localeStore.t('codeCard.tryItYourself') }}
        </button>
      </div>
    </div>

    <pre
      class="overflow-x-auto bg-zinc-950 p-3.5 text-[13px] leading-relaxed text-zinc-100 sm:p-4 dark:bg-zinc-950/90"
    ><code>{{ example.code }}</code></pre>

    <div
      v-if="example.output"
      class="border-t border-zinc-800 bg-zinc-900 px-4 py-3 text-xs text-zinc-300"
    >
      <div class="mb-1.5 font-sans text-[11px] font-medium uppercase tracking-wider text-zinc-400">
        {{ localeStore.t('codeCard.output') }}
      </div>
      <pre
        class="overflow-x-auto font-mono leading-relaxed text-emerald-300"
      ><code>{{ example.output }}</code></pre>
    </div>
  </div>
</template>
