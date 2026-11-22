<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Clock,
  Hash,
  Lightbulb,
} from 'lucide-vue-next'
import CodeExampleCard from '@/components/CodeExampleCard.vue'
import LessonChallenge from '@/components/LessonChallenge.vue'
import LessonQuiz from '@/components/LessonQuiz.vue'
import { useCurriculumStore } from '@/stores/curriculum'
import { useLocaleStore } from '@/stores/locale'
import { useToastStore } from '@/stores/toast'

const route = useRoute()
const router = useRouter()
const curriculumStore = useCurriculumStore()
const localeStore = useLocaleStore()
const toastStore = useToastStore()

const readProgress = ref(0)
const activeSectionId = ref('')

const trackId = computed(() => String(route.params.track || 'html'))
const track = computed(() => curriculumStore.getTrack(trackId.value))
const lesson = computed(() =>
  curriculumStore.getLesson(
    trackId.value,
    route.params.lessonSlug ? String(route.params.lessonSlug) : '',
  ),
)
const lessonKey = computed(() => (lesson.value ? `${trackId.value}/${lesson.value.slug}` : ''))

const tocItems = computed(() => {
  if (!lesson.value) return []
  const items = lesson.value.sections.map((s) => ({ id: s.id, label: s.heading }))
  if (lesson.value.challenge) {
    items.push({ id: 'practice-challenge', label: localeStore.t('learn.challengeTitle') })
  }
  if (lesson.value.quiz?.length) {
    items.push({ id: 'knowledge-check', label: localeStore.t('learn.quizTitle') })
  }
  return items
})

watch(
  [track, lesson],
  ([t, l]) => {
    if (!t) {
      router.replace('/learn/html/introduction')
    } else if (l && route.params.lessonSlug !== l.slug) {
      router.replace(`/learn/${t.id}/${l.slug}`)
    } else if (l) {
      activeSectionId.value = l.sections[0]?.id || ''
      readProgress.value = 0
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
  const willComplete = !completed.value
  curriculumStore.toggleComplete(trackId.value, lesson.value.slug)
  if (willComplete) {
    toastStore.show(
      localeStore.t('toasts.lessonCompleted', {
        done: curriculumStore.completedCount,
        total: curriculumStore.totalLessons,
      }),
      'success',
    )
  } else {
    toastStore.show(localeStore.t('toasts.lessonUncompleted'), 'default')
  }
}

async function copySectionLink(sectionId) {
  const url = `${window.location.origin}${route.path}#${sectionId}`
  window.history.replaceState(null, '', `#${sectionId}`)
  activeSectionId.value = sectionId
  try {
    await navigator.clipboard.writeText(url)
    toastStore.show(localeStore.t('toasts.copiedSection'), 'accent')
  } catch {
    // ignore clipboard errors
  }
}

function handleScroll() {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  readProgress.value = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0

  if (!tocItems.value.length) return
  let current = tocItems.value[0].id
  for (const item of tocItems.value) {
    const el = document.getElementById(item.id)
    if (el && el.getBoundingClientRect().top <= 140) {
      current = item.id
    }
  }
  activeSectionId.value = current
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const levelBadgeClasses = {
  beginner:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300',
  intermediate:
    'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300',
  pro: 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/60 dark:bg-purple-950/50 dark:text-purple-300',
}
</script>

<template>
  <div class="relative w-full px-4 pb-[env(safe-area-inset-bottom,0px)] sm:px-6 lg:px-10">
    <!-- Reading Progress Bar (GPU scaleX only) -->
    <div
      aria-hidden="true"
      class="pointer-events-none fixed left-0 right-0 top-14 z-30 h-0.5 bg-transparent"
    >
      <div
        class="reading-progress-bar h-full w-full bg-blue-600 dark:bg-blue-400"
        :style="{ transform: `scaleX(${readProgress})` }"
      />
    </div>

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

        <!-- Learning Objectives -->
        <div
          v-if="lesson.objectives?.length"
          class="mt-6 max-w-[65ch] rounded-xl border border-zinc-200/90 bg-zinc-50/70 p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {{ localeStore.t('learn.objectivesTitle') }}
          </p>
          <ul class="mt-3 space-y-2">
            <li
              v-for="(obj, idx) in lesson.objectives"
              :key="idx"
              class="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
            >
              <Check class="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{{ obj }}</span>
            </li>
          </ul>
        </div>

        <hr class="my-8 border-zinc-200 dark:border-zinc-800" />

        <div class="space-y-11">
          <section
            v-for="section in lesson.sections"
            :id="section.id"
            :key="section.id"
            class="scroll-mt-20"
          >
            <h2 class="text-xl font-semibold text-zinc-950 dark:text-white">
              <button
                type="button"
                class="btn-press group inline-flex items-center gap-1.5 rounded-md text-left hover:text-blue-600 dark:hover:text-blue-400"
                @click="copySectionLink(section.id)"
              >
                <span>{{ section.heading }}</span>
                <Hash
                  class="h-4 w-4 shrink-0 text-zinc-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                />
              </button>
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

            <!-- Key Points List -->
            <ul
              v-if="section.points?.length"
              class="mt-4 max-w-[65ch] space-y-2 rounded-xl border border-zinc-200/70 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/30"
            >
              <li
                v-for="(point, ptIdx) in section.points"
                :key="ptIdx"
                class="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
              >
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                <span>{{ point }}</span>
              </li>
            </ul>

            <!-- Syntax / Reference Table -->
            <div
              v-if="section.table"
              class="my-5 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              <table class="w-full min-w-[460px] border-collapse text-left text-sm">
                <thead class="bg-zinc-50 dark:bg-zinc-900/80">
                  <tr>
                    <th
                      v-for="(header, hIdx) in section.table.headers"
                      :key="hIdx"
                      class="border-b border-zinc-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
                  <tr
                    v-for="(row, rIdx) in section.table.rows"
                    :key="rIdx"
                    class="bg-white dark:bg-zinc-950/60"
                  >
                    <td
                      v-for="(cell, cIdx) in row"
                      :key="cIdx"
                      class="px-4 py-2.5 text-[13px] leading-relaxed"
                      :class="
                        cIdx === 0
                          ? 'font-mono font-medium text-zinc-900 dark:text-zinc-100'
                          : 'text-zinc-600 dark:text-zinc-300'
                      "
                    >
                      {{ cell }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeExampleCard v-if="section.example" :example="section.example" />

            <!-- Common Pitfall / Warning -->
            <div
              v-if="section.warning"
              class="mt-5 flex max-w-[65ch] items-start gap-3 rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
            >
              <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  {{ localeStore.t('learn.commonMistake') }}
                </p>
                <p class="mt-1 leading-relaxed">{{ section.warning }}</p>
              </div>
            </div>

            <div
              v-if="section.tip"
              class="mt-5 flex max-w-[65ch] items-start gap-3 rounded-xl border border-blue-200/80 bg-blue-50/70 p-4 text-sm text-blue-950 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200"
            >
              <Lightbulb class="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <p class="leading-relaxed">{{ section.tip }}</p>
            </div>
          </section>

          <!-- Practice Challenge -->
          <LessonChallenge
            v-if="lesson.challenge"
            :challenge="lesson.challenge"
            :lesson-key="lessonKey"
          />

          <!-- Knowledge Check Quiz -->
          <LessonQuiz
            v-if="lesson.quiz?.length"
            :questions="lesson.quiz"
            :lesson-key="lessonKey"
          />
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
            <Transition name="state-fade" mode="out-in">
              <span v-if="completed" key="done" class="inline-flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 shrink-0" />
                <span>{{ localeStore.t('learn.completed') }}</span>
              </span>
              <span v-else key="todo" class="inline-flex items-center gap-2">
                <Circle class="h-4 w-4 shrink-0" />
                <span>{{ localeStore.t('learn.markComplete') }}</span>
              </span>
            </Transition>
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
            class="card-interactive btn-press group flex flex-col rounded-xl border border-zinc-200 p-4 hover:border-zinc-300 hover:bg-zinc-50/60 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
          >
            <span
              class="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400"
            >
              <ArrowLeft class="arrow-nudge-left h-3.5 w-3.5 shrink-0" />
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
            class="card-interactive btn-press group flex flex-col rounded-xl border border-zinc-200 p-4 hover:border-zinc-300 hover:bg-zinc-50/60 sm:items-end sm:text-right dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
          >
            <span
              class="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400"
            >
              {{ localeStore.t('learn.next') }}
              <ArrowRight class="arrow-nudge-right h-3.5 w-3.5 shrink-0" />
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
          <p class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {{ localeStore.t('learn.onThisPage') }}
          </p>
          <ul class="mt-3 space-y-2 border-l border-zinc-200 pl-3 dark:border-zinc-800">
            <li v-for="item in tocItems" :key="item.id">
              <a
                :href="`#${item.id}`"
                class="btn-press block text-xs leading-relaxed"
                :class="
                  activeSectionId === item.id
                    ? 'font-semibold text-zinc-950 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                "
                @click="activeSectionId = item.id"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>
