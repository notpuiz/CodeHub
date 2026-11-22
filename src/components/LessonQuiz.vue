<script setup>
import { computed, ref, watch } from 'vue'
import { CheckCircle2, HelpCircle, RotateCcw, XCircle } from 'lucide-vue-next'
import { useLocaleStore } from '@/stores/locale'
import { useToastStore } from '@/stores/toast'

const props = defineProps({
  questions: {
    type: Array,
    required: true,
  },
  lessonKey: {
    type: String,
    required: true,
  },
})

const localeStore = useLocaleStore()
const toastStore = useToastStore()

const selected = ref({})

watch(
  () => props.lessonKey,
  () => {
    selected.value = {}
  },
)

const answeredCount = computed(() => Object.keys(selected.value).length)
const correctCount = computed(() =>
  props.questions.reduce(
    (sum, q, idx) => (selected.value[idx] === q.answer ? sum + 1 : sum),
    0,
  ),
)

function choose(qIdx, optIdx) {
  if (selected.value[qIdx] !== undefined) return
  selected.value = { ...selected.value, [qIdx]: optIdx }

  const isCorrect = props.questions[qIdx].answer === optIdx
  if (answeredCount.value === props.questions.length && correctCount.value === props.questions.length) {
    toastStore.show(localeStore.t('learn.quizPerfect'), 'success')
  } else if (isCorrect) {
    toastStore.show(localeStore.t('learn.quizCorrect'), 'success', 1500)
  }
}

function resetQuiz() {
  selected.value = {}
}
</script>

<template>
  <section
    id="knowledge-check"
    class="scroll-mt-20 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
  >
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <HelpCircle class="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
        <h2 class="text-lg font-semibold text-zinc-950 dark:text-white">
          {{ localeStore.t('learn.quizTitle') }}
        </h2>
      </div>

      <div class="flex items-center gap-2">
        <span
          v-if="answeredCount > 0"
          class="tabular-nums rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
        >
          {{ localeStore.t('learn.quizScore', { score: correctCount, total: questions.length }) }}
        </span>
        <button
          v-if="answeredCount > 0"
          type="button"
          class="btn-press inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          @click="resetQuiz"
        >
          <RotateCcw class="h-3 w-3 shrink-0" />
          {{ localeStore.t('learn.quizRetry') }}
        </button>
      </div>
    </div>

    <div class="mt-5 space-y-6">
      <div
        v-for="(q, qIdx) in questions"
        :key="qIdx"
        class="rounded-xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950/70"
      >
        <p class="text-sm font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
          <span class="tabular-nums mr-1.5 text-zinc-400">{{ qIdx + 1 }}.</span>
          {{ q.question }}
        </p>

        <div class="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            v-for="(opt, optIdx) in q.options"
            :key="optIdx"
            type="button"
            class="btn-press flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-xs font-medium sm:text-sm"
            :class="
              selected[qIdx] === undefined
                ? 'border-zinc-200 bg-zinc-50/70 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800'
                : optIdx === q.answer
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200'
                  : selected[qIdx] === optIdx
                    ? 'border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/60 dark:text-red-200'
                    : 'border-zinc-200/60 bg-white/50 text-zinc-400 dark:border-zinc-800/60 dark:bg-zinc-900/30 dark:text-zinc-500'
            "
            @click="choose(qIdx, optIdx)"
          >
            <span class="leading-snug">{{ opt }}</span>
            <CheckCircle2
              v-if="selected[qIdx] !== undefined && optIdx === q.answer"
              class="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
            />
            <XCircle
              v-else-if="selected[qIdx] === optIdx && optIdx !== q.answer"
              class="h-4 w-4 shrink-0 text-red-500 dark:text-red-400"
            />
          </button>
        </div>

        <Transition name="sidebar-list">
          <p
            v-if="selected[qIdx] !== undefined"
            class="mt-3 rounded-lg px-3 py-2 text-xs leading-relaxed"
            :class="
              selected[qIdx] === q.answer
                ? 'bg-emerald-50/80 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
                : 'bg-amber-50/80 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200'
            "
          >
            {{ q.explanation }}
          </p>
        </Transition>
      </div>
    </div>
  </section>
</template>
