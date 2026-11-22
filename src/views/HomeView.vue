<script setup>
import { computed, ref } from 'vue'
import { ArrowRight, BookOpen, Code2, Play, Search } from 'lucide-vue-next'
import { useCurriculumStore } from '@/stores/curriculum'
import { useSearchStore } from '@/stores/search'
import { useLocaleStore } from '@/stores/locale'

const curriculumStore = useCurriculumStore()
const searchStore = useSearchStore()
const localeStore = useLocaleStore()

const selectedGroup = ref('all')

const trackGroups = computed(() => [
  { id: 'all', label: localeStore.t('home.filterAll') },
  { id: 'web', label: localeStore.t('home.filterWeb') },
  { id: 'languages', label: localeStore.t('home.filterLanguages') },
  { id: 'engineering', label: localeStore.t('home.filterEngineering') },
])

const visibleTracks = computed(() => {
  if (selectedGroup.value === 'all') return curriculumStore.tracks
  return curriculumStore.tracks.filter((track) => track.group === selectedGroup.value)
})

const accentClasses = {
  orange:
    'bg-orange-50 text-orange-700 border-orange-200/80 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-900/60',
  blue: 'bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900/60',
  amber:
    'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900/60',
  sky: 'bg-sky-50 text-sky-700 border-sky-200/80 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-900/60',
  slate:
    'bg-slate-100 text-slate-700 border-slate-300/80 dark:bg-slate-900/70 dark:text-slate-300 dark:border-slate-700/70',
  indigo:
    'bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-900/60',
  rose: 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900/60',
  purple:
    'bg-purple-50 text-purple-700 border-purple-200/80 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-900/60',
  emerald:
    'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900/60',
}
const levelPillClasses = {
  beginner: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
  intermediate: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
  pro: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
}

function getPreviewLessons(track) {
  if (track.lessons.length <= 3) return track.lessons
  const first = track.lessons[0]
  const mid = track.lessons[Math.floor(track.lessons.length / 2)]
  const last = track.lessons[track.lessons.length - 1]
  return [first, mid, last]
}
</script>

<template>
  <main
    class="w-full px-4 pb-[calc(4rem+env(safe-area-inset-bottom,0px))] pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pt-20"
  >
    <!-- Hero -->
    <section class="mx-auto max-w-4xl text-center">
      <div
        class="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
      >
        <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
        <span class="tabular-nums">
          {{ localeStore.t('home.heroBadge', { count: curriculumStore.totalLessons }) }}
        </span>
      </div>

      <h1
        class="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white"
      >
        {{ localeStore.t('home.heroTitle') }}
      </h1>

      <p
        class="mx-auto mt-4 max-w-[65ch] text-base leading-relaxed text-zinc-600 sm:mt-5 sm:text-lg dark:text-zinc-400"
      >
        {{ localeStore.t('home.heroSubtitle') }}
      </p>

      <div
        class="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
      >
        <router-link
          to="/learn/html/introduction"
          class="btn-press group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          <span>{{ localeStore.t('home.startHtml') }}</span>
          <ArrowRight class="arrow-nudge-right h-4 w-4 shrink-0" />
        </router-link>

        <router-link
          to="/playground"
          class="btn-press inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          <Play class="h-3.5 w-3.5 shrink-0 fill-current" />
          <span>{{ localeStore.t('home.openPlayground') }}</span>
        </router-link>

        <button
          type="button"
          class="btn-press inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          @click="searchStore.open()"
        >
          <Search class="h-4 w-4 shrink-0" />
          <span>{{ localeStore.t('home.quickSearch') }}</span>
        </button>
      </div>
    </section>

    <!-- Tracks -->
    <section class="mt-14 sm:mt-20">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold text-zinc-950 dark:text-white">
            {{ localeStore.t('home.tracksHeading') }}
          </h2>
          <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {{ localeStore.t('home.tracksSubtitle') }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <div class="inline-flex flex-wrap items-center gap-1.5">
            <button
              v-for="group in trackGroups"
              :key="group.id"
              type="button"
              class="btn-press rounded-lg px-3 py-1.5 text-xs font-medium"
              :class="
                selectedGroup === group.id
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                  : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
              "
              @click="selectedGroup = group.id"
            >
              {{ group.label }}
            </button>
          </div>

          <div
            v-if="curriculumStore.completedCount > 0"
            class="tabular-nums rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300"
          >
            {{
              localeStore.t('home.progressBadge', {
                done: curriculumStore.completedCount,
                total: curriculumStore.totalLessons,
              })
            }}
          </div>
        </div>
      </div>

      <Transition name="tab-switch" mode="out-in">
        <div :key="selectedGroup" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <router-link
            v-for="track in visibleTracks"
            :key="track.id"
            :to="`/learn/${track.id}/${track.lessons[0].slug}`"
            class="card-interactive btn-press group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
          >
            <div>
              <div class="flex items-center justify-between gap-3">
                <span
                  class="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold"
                  :class="accentClasses[track.accent]"
                >
                  {{ track.badge }}
                </span>
                <span class="tabular-nums text-xs text-zinc-500 dark:text-zinc-400">
                  {{ localeStore.t('home.lessonsCount', { count: track.lessons.length }) }}
                </span>
              </div>

              <h3 class="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">
                {{ track.fullName }}
              </h3>
              <p class="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {{ track.tagline }}
              </p>

              <ul class="mt-4 space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
                <li
                  v-for="lesson in getPreviewLessons(track)"
                  :key="lesson.slug"
                  class="flex items-center justify-between gap-2 text-xs text-zinc-600 dark:text-zinc-400"
                >
                  <span class="truncate">{{ lesson.title }}</span>
                  <span
                    class="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium"
                    :class="levelPillClasses[lesson.level] || levelPillClasses.beginner"
                  >
                    {{ localeStore.t(`levels.${lesson.level || 'beginner'}`) }}
                  </span>
                </li>
              </ul>
            </div>

            <div
              class="mt-6 flex items-center justify-between text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              <span>{{ localeStore.t('home.exploreTrack', { name: track.name }) }}</span>
              <ArrowRight
                class="arrow-nudge-right h-4 w-4 shrink-0 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
              />
            </div>
          </router-link>
        </div>
      </Transition>
    </section>

    <!-- Quick Highlights -->
    <section class="mt-16 grid gap-5 md:grid-cols-2">
      <router-link
        to="/playground"
        class="card-interactive btn-press flex items-start gap-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-6 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
      >
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
        >
          <Code2 class="h-5 w-5 shrink-0" />
        </div>
        <div>
          <h3 class="text-base font-semibold text-zinc-950 dark:text-white">
            {{ localeStore.t('home.sandboxTitle') }}
          </h3>
          <p class="mt-1 max-w-[55ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {{ localeStore.t('home.sandboxDesc') }}
          </p>
        </div>
      </router-link>

      <router-link
        to="/resources"
        class="card-interactive btn-press flex items-start gap-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-6 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
      >
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
        >
          <BookOpen class="h-5 w-5 shrink-0" />
        </div>
        <div>
          <h3 class="text-base font-semibold text-zinc-950 dark:text-white">
            {{ localeStore.t('home.resourcesTitle') }}
          </h3>
          <p class="mt-1 max-w-[55ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {{ localeStore.t('home.resourcesDesc') }}
          </p>
        </div>
      </router-link>
    </section>
  </main>
</template>
