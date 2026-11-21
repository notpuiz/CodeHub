<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Lightbulb } from 'lucide-vue-next'
import CodeExampleCard from '@/components/CodeExampleCard.vue'
import { useCurriculumStore } from '@/stores/curriculum'
import { useLocaleStore } from '@/stores/locale'

const route = useRoute()
const router = useRouter()
const curriculumStore = useCurriculumStore()
const localeStore = useLocaleStore()

const trackId = computed(() => String(route.params.track || 'html'))
const track = computed(() => curriculumStore.getTrack(trackId.value))
const lesson = computed(() =>
  curriculumStore.getLesson(
    trackId.value,
    route.params.lessonSlug ? String(route.params.lessonSlug) : '',
  ),
)

watch(
  [track, lesson],
  ([t, l]) => {
    if (!t) {
      router.replace('/learn/html/introduction')
    } else if (l && route.params.lessonSlug !== l.slug) {
      router.replace(`/learn/${t.id}/${l.slug}`)
    }
  },
  { immediate: true },
)

const adjacent = computed(() =>
  lesson.value
    ? curriculumStore.getAdjacentLessons(trackId.value, lesson.value.slug)
    : { prev: null, next: null },
)

const completed = computed(() =>
  lesson.value ? curriculumStore.isCompleted(trackId.value, lesson.value.slug) : false,
)

function toggleLessonComplete() {
  if (!lesson.value) return
  curriculumStore.toggleComplete(trackId.value, lesson.value.slug)
}

const levelBadgeClasses = {
  beginner:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300',
  intermediate:
    'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300',
  pro: 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/60 dark:bg-purple-950/50 dark:text-purple-300',
}
</script>

<template>
  <div class="w-full px-4 pb-[env(safe-area-inset-bottom,0px)] sm:px-6 lg:px-10">
    <!-- 2-Column Docs Content (Left navigation lives in the unified AppSidebar) -->
    <div class="grid grid-cols-1 gap-8 py-6 sm:py-8 xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-10">
      <!-- Main Lesson Article -->
      <article v-if="track && lesson" class="min-w-0 pb-12 sm:pb-16">
        <div
          class="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400"
        >
          <span class="uppercase tracking-wider text-blue-600 dark:text-blue-400">{{
            track.name
          }}</span>
          <span>·</span>
          <span
            class="rounded-md border px-2 py-0.5 text-[11px] font-semibold"
            :class="levelBadgeClasses[lesson.level] || levelBadgeClasses.beginner"
          >
            {{ localeStore.t(`levels.${lesson.level || 'beginner'}`) }}
          </span>
          <span>·</span>
          <span class="tabular-nums">
            {{
              localeStore.t('levels.stepOf', {
                step: lesson.step ?? 1,
                total: lesson.totalSteps ?? track.lessons.length,
              })
            }}
          </span>
          <span>·</span>
          <span class="inline-flex items-center gap-1 tabular-nums">
            <Clock class="h-3.5 w-3.5 shrink-0" />
            {{ localeStore.t('learn.readTime', { duration: lesson.duration }) }}
          </span>
        </div>

        <h1
          class="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl lg:text-4xl dark:text-white"
        >
          {{ lesson.title }}
        </h1>

        <p class="mt-4 max-w-[65ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {{ lesson.summary }}
        </p>

        <hr class="my-8 border-zinc-200 dark:border-zinc-800" />

        <div class="space-y-10">
          <section
            v-for="section in lesson.sections"
            :id="section.id"
            :key="section.id"
            class="scroll-mt-20"
          >
            <h2 class="text-xl font-semibold text-zinc-950 dark:text-white">
              {{ section.heading }}
            </h2>

            <div class="mt-3 space-y-3">
              <p
                v-for="(paragraph, pIdx) in section.body"
                :key="pIdx"
                class="max-w-[65ch] text-[15px] leading-7 text-zinc-700 dark:text-zinc-300"
              >
                {{ paragraph }}
              </p>
            </div>

            <CodeExampleCard v-if="section.example" :example="section.example" />

            <div
              v-if="section.tip"
              class="mt-5 flex max-w-[65ch] items-start gap-3 rounded-xl border border-blue-200/80 bg-blue-50/70 p-4 text-sm text-blue-950 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200"
            >
              <Lightbulb class="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <p class="leading-relaxed">{{ section.tip }}</p>
            </div>
          </section>
        </div>

        <!-- Mark Complete Action -->
        <div
          class="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <div class="text-sm text-zinc-600 dark:text-zinc-400">
            {{ localeStore.t('learn.finishPrompt') }}
          </div>
          <button
            type="button"
            class="btn-press inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium"
            :class="
              completed
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
            "
            @click="toggleLessonComplete"
          >
            <CheckCircle2 class="h-4 w-4 shrink-0" />
            <span>{{
              completed ? localeStore.t('learn.completed') : localeStore.t('learn.markComplete')
            }}</span>
          </button>
        </div>

        <!-- Prev / Next Navigation -->
        <nav
          class="mt-10 grid grid-cols-1 gap-3 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800"
          :aria-label="localeStore.t('learn.lessonNavAria')"
        >
          <router-link
            v-if="adjacent.prev"
            :to="`/learn/${adjacent.prev.trackId}/${adjacent.prev.slug}`"
            class="btn-press flex flex-col rounded-xl border border-zinc-200 p-4 hover:border-zinc-300 hover:bg-zinc-50/60 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
          >
            <span
              class="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400"
            >
              <ArrowLeft class="h-3.5 w-3.5 shrink-0" />
              {{ localeStore.t('learn.previous') }}
            </span>
            <span class="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {{ adjacent.prev.title }}
            </span>
          </router-link>
          <div v-else />

          <router-link
            v-if="adjacent.next"
            :to="`/learn/${adjacent.next.trackId}/${adjacent.next.slug}`"
            class="btn-press flex flex-col rounded-xl border border-zinc-200 p-4 hover:border-zinc-300 hover:bg-zinc-50/60 sm:items-end sm:text-right dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
          >
            <span
              class="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400"
            >
              {{ localeStore.t('learn.next') }}
              <ArrowRight class="h-3.5 w-3.5 shrink-0" />
            </span>
            <span class="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {{ adjacent.next.title }}
            </span>
          </router-link>
        </nav>
      </article>

      <!-- Right Table of Contents -->
      <aside v-if="lesson" class="hidden xl:block">
        <div class="sticky top-20">
          <p
            class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
          >
            {{ localeStore.t('learn.onThisPage') }}
          </p>
          <ul class="mt-3 space-y-2 border-l border-zinc-200 pl-3 dark:border-zinc-800">
            <li v-for="section in lesson.sections" :key="section.id">
              <a
                :href="`#${section.id}`"
                class="block text-xs leading-relaxed text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {{ section.heading }}
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>
