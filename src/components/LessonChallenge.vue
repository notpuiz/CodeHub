<script setup>
import { ref, watch } from 'vue'
import { Check, Code2, Copy, Eye, EyeOff, Lightbulb } from 'lucide-vue-next'
import { useLocaleStore } from '@/stores/locale'
import { useToastStore } from '@/stores/toast'

const props = defineProps({
  challenge: {
    type: Object,
    required: true,
  },
  lessonKey: {
    type: String,
    required: true,
  },
})

const localeStore = useLocaleStore()
const toastStore = useToastStore()

const showHint = ref(false)
const showSolution = ref(false)
const copied = ref(false)
let copyTimer = null

watch(
  () => props.lessonKey,
  () => {
    showHint.value = false
    showSolution.value = false
    copied.value = false
  },
)

async function copySolution() {
  if (!props.challenge.solutionCode) return
  try {
    await navigator.clipboard.writeText(props.challenge.solutionCode)
    copied.value = true
    toastStore.show(localeStore.t('toasts.copiedCode'), 'success')
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <section
    id="practice-challenge"
    class="scroll-mt-20 rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-5 sm:p-6 dark:border-indigo-900/50 dark:bg-indigo-950/20"
  >
    <div class="flex items-center gap-2">
      <Code2 class="h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
      <h2 class="text-lg font-semibold text-zinc-950 dark:text-white">
        {{ localeStore.t('learn.challengeTitle') }}
      </h2>
    </div>

    <p class="mt-2.5 max-w-[65ch] text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      {{ challenge.prompt }}
    </p>

    <div class="mt-4 flex flex-wrap items-center gap-2">
      <button
        v-if="challenge.hint"
        type="button"
        class="btn-press inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:bg-zinc-900 dark:text-indigo-300 dark:hover:bg-indigo-950/60"
        @click="showHint = !showHint"
      >
        <Lightbulb class="h-3.5 w-3.5 shrink-0" />
        <span>{{
          showHint ? localeStore.t('learn.hideHint') : localeStore.t('learn.showHint')
        }}</span>
      </button>

      <button
        v-if="challenge.solutionCode"
        type="button"
        class="btn-press inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
        @click="showSolution = !showSolution"
      >
        <EyeOff v-if="showSolution" class="h-3.5 w-3.5 shrink-0" />
        <Eye v-else class="h-3.5 w-3.5 shrink-0" />
        <span>{{
          showSolution ? localeStore.t('learn.hideSolution') : localeStore.t('learn.showSolution')
        }}</span>
      </button>
    </div>

    <Transition name="sidebar-list">
      <div
        v-if="showHint && challenge.hint"
        class="mt-4 rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-xs leading-relaxed text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200"
      >
        {{ challenge.hint }}
      </div>
    </Transition>

    <Transition name="sidebar-list">
      <div
        v-if="showSolution && challenge.solutionCode"
        class="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
      >
        <div class="flex items-center justify-between border-b border-zinc-800 px-3.5 py-2">
          <span class="font-mono text-[11px] uppercase text-zinc-400">
            {{ challenge.language || 'code' }} · {{ localeStore.t('learn.solutionLabel') }}
          </span>
          <button
            type="button"
            class="btn-press inline-flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-[11px] font-medium text-zinc-200 hover:bg-zinc-800"
            @click="copySolution"
          >
            <Check v-if="copied" class="h-3 w-3 shrink-0 text-emerald-400" />
            <Copy v-else class="h-3 w-3 shrink-0" />
            <span>{{ copied ? localeStore.t('codeCard.copied') : localeStore.t('codeCard.copy') }}</span>
          </button>
        </div>
        <pre
          class="overflow-x-auto p-3.5 text-[13px] leading-relaxed text-zinc-100"
        ><code>{{ challenge.solutionCode }}</code></pre>
      </div>
    </Transition>
  </section>
</template>
