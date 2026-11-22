<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowUpRight, BookOpen, FileText, Search, X } from 'lucide-vue-next'
import { useSearchStore } from '@/stores/search'
import { useCurriculumStore } from '@/stores/curriculum'
import { useLocaleStore } from '@/stores/locale'

const router = useRouter()
const searchStore = useSearchStore()
const curriculumStore = useCurriculumStore()
const localeStore = useLocaleStore()

const inputRef = ref(null)
const activeIndex = ref(0)

const results = computed(() => curriculumStore.search(searchStore.query))

watch(
  () => searchStore.isOpen,
  async (open) => {
    if (open) {
      activeIndex.value = 0
      await nextTick()
      inputRef.value?.focus()
    }
  },
)

watch(
  () => searchStore.query,
  () => {
    activeIndex.value = 0
  },
)

function selectResult(item) {
  if (!item) return
  searchStore.close()
  if (item.type === 'lesson' && item.to) {
    router.push(item.to)
  } else if (item.url) {
    window.open(item.url, '_blank', 'noopener,noreferrer')
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    e.preventDefault()
    searchStore.close()
    return
  }
  if (!results.value.length) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % results.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + results.value.length) % results.value.length
  } else if (e.key === 'Enter') {
    e.preventDefault()
    selectResult(results.value[activeIndex.value])
  }
}
</script>

<template>
  <!-- Instant open/close (zero animation) per keyboard-shortcut 100+/day rule -->
  <div
    v-if="searchStore.isOpen"
    class="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/45 px-3 pt-[calc(1rem+env(safe-area-inset-top,0px))] backdrop-blur-[2px] sm:px-4 sm:pt-[10vh]"
    role="dialog"
    aria-modal="true"
    :aria-label="localeStore.t('search.dialogAria')"
    @click.self="searchStore.close()"
  >
    <div
      class="w-full max-w-xl overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
      @keydown="handleKeydown"
    >
      <div
        class="flex items-center gap-3 border-b border-zinc-200 px-3.5 py-3 sm:px-4 dark:border-zinc-800"
      >
        <Search class="h-4 w-4 shrink-0 text-zinc-400" />
        <input
          ref="inputRef"
          v-model="searchStore.query"
          type="search"
          enterkeyhint="search"
          autocapitalize="none"
          autocorrect="off"
          :placeholder="localeStore.t('search.placeholder')"
          class="w-full bg-transparent text-base text-zinc-900 placeholder-zinc-400 outline-none sm:text-sm dark:text-zinc-100"
        />
        <button
          type="button"
          class="btn-press rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          :aria-label="localeStore.t('search.closeAria')"
          @click="searchStore.close()"
        >
          <X class="h-4 w-4 shrink-0" />
        </button>
      </div>

      <div class="max-h-[60dvh] overflow-y-auto overscroll-contain p-2">
        <div
          v-if="!results.length"
          class="px-4 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400"
        >
          {{ localeStore.t('search.empty', { query: searchStore.query }) }}
        </div>

        <ul v-else class="space-y-0.5">
          <li v-for="(item, index) in results" :key="item.id">
            <button
              type="button"
              class="btn-press flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left"
              :class="
                index === activeIndex
                  ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/60'
              "
              @mouseenter="activeIndex = index"
              @click="selectResult(item)"
            >
              <FileText
                v-if="item.type === 'lesson'"
                class="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
              />
              <BookOpen v-else class="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2">
                  <span class="truncate text-sm font-medium">{{ item.title }}</span>
                  <span
                    class="shrink-0 rounded bg-zinc-200/70 px-1.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-700/70 dark:text-zinc-300"
                  >
                    {{ item.subtitle }}
                  </span>
                </div>
                <p class="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {{ item.description }}
                </p>
              </div>

              <ArrowUpRight
                v-if="item.type === 'resource'"
                class="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400"
              />
            </button>
          </li>
        </ul>
      </div>

      <div
        class="flex items-center justify-between border-t border-zinc-200 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
      >
        <span class="tabular-nums">{{
          localeStore.t('search.resultsCount', { count: results.length })
        }}</span>
        <div class="hidden items-center gap-3 sm:flex">
          <span><kbd class="font-medium">↑↓</kbd> {{ localeStore.t('search.navigate') }}</span>
          <span><kbd class="font-medium">↵</kbd> {{ localeStore.t('search.open') }}</span>
          <span><kbd class="font-medium">Esc</kbd> {{ localeStore.t('search.close') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
