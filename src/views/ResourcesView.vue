<script setup>
import { computed, ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import { useCurriculumStore } from '@/stores/curriculum'
import { useLocaleStore } from '@/stores/locale'

const curriculumStore = useCurriculumStore()
const localeStore = useLocaleStore()
const selectedCategory = ref('all')

const categories = computed(() => [
  { id: 'all', label: localeStore.t('resources.all') },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'c', label: 'C' },
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
  { id: 'csharp', label: 'C#' },
  { id: 'software-engineering', label: localeStore.t('resources.softwareEng') },
])

const filteredResources = computed(() => {
  if (selectedCategory.value === 'all') return curriculumStore.resources
  return curriculumStore.resources.filter((r) => r.category === selectedCategory.value)
})
</script>

<template>
  <main
    class="w-full px-4 pb-[calc(4rem+env(safe-area-inset-bottom,0px))] pt-8 sm:px-6 sm:pb-24 sm:pt-12 lg:px-8"
  >
    <div class="max-w-[65ch]">
      <h1 class="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
        {{ localeStore.t('resources.title') }}
      </h1>
      <p
        class="mt-2.5 text-sm leading-relaxed text-zinc-600 sm:mt-3 sm:text-base dark:text-zinc-400"
      >
        {{ localeStore.t('resources.subtitle') }}
      </p>
    </div>

    <div
      class="-mx-4 mt-6 flex flex-nowrap items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:mt-8 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
    >
      <button
        v-for="cat in categories"
        :key="cat.id"
        type="button"
        class="btn-press shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium sm:py-1.5"
        :class="
          selectedCategory === cat.id
            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
            : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
        "
        @click="selectedCategory = cat.id"
      >
        {{ cat.label }}
      </button>
    </div>

    <Transition name="tab-switch" mode="out-in">
      <div :key="selectedCategory" class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="item in filteredResources"
          :key="item.id"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="card-interactive btn-press group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
        >
          <div>
            <div class="flex items-center justify-between gap-2">
              <span
                class="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {{ curriculumStore.getCategoryLabel(item.category) }} · {{ item.type }}
              </span>
              <ArrowUpRight
                class="arrow-nudge-ne h-4 w-4 shrink-0 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
              />
            </div>

            <h2 class="mt-3 text-base font-semibold text-zinc-950 dark:text-white">
              {{ item.title }}
            </h2>
            <p class="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {{ item.description }}
            </p>
          </div>
        </a>
      </div>
    </Transition>
  </main>
</template>
