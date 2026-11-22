<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { BookOpen, CheckCircle2, ChevronRight, Circle, Home, Terminal, X } from 'lucide-vue-next'
import BrandLogo from '@/components/BrandLogo.vue'
import { useCurriculumStore } from '@/stores/curriculum'
import { useLocaleStore } from '@/stores/locale'

const props = defineProps({
  mobileOpen: {
    type: Boolean,
    default: false,
  },
  desktopOpen: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close-mobile'])

const route = useRoute()
const curriculumStore = useCurriculumStore()
const localeStore = useLocaleStore()

const activeTrackId = computed(() =>
  route.name === 'learn' ? String(route.params.track || '') : '',
)
const activeSlug = computed(() =>
  route.name === 'learn' ? String(route.params.lessonSlug || '') : '',
)

const expandedTracks = ref([activeTrackId.value || 'html'])

watch(activeTrackId, (id) => {
  if (id && !expandedTracks.value.includes(id)) {
    expandedTracks.value = [...expandedTracks.value, id]
  }
})

watch(
  () => route.fullPath,
  () => {
    if (props.mobileOpen) {
      emit('close-mobile')
    }
  },
)

watch(
  () => props.mobileOpen,
  (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
  },
)

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

const primaryLinks = computed(() => [
  {
    label: localeStore.locale === 'km' ? 'ទំព័រដើម' : 'Home',
    to: '/',
    exact: true,
    icon: Home,
  },
  {
    label: localeStore.t('nav.playground'),
    to: '/playground',
    exact: false,
    icon: Terminal,
  },
  {
    label: localeStore.t('nav.resources'),
    to: '/resources',
    exact: false,
    icon: BookOpen,
  },
])

const trackSections = computed(() => [
  {
    id: 'web',
    label: localeStore.t('home.filterWeb'),
    tracks: curriculumStore.tracks.filter((t) => t.group === 'web'),
  },
  {
    id: 'languages',
    label: localeStore.t('home.filterLanguages'),
    tracks: curriculumStore.tracks.filter((t) => t.group === 'languages'),
  },
  {
    id: 'engineering',
    label: localeStore.t('home.filterEngineering'),
    tracks: curriculumStore.tracks.filter((t) => t.group === 'engineering'),
  },
])

const levelDotClass = {
  beginner: 'bg-emerald-500',
  intermediate: 'bg-blue-500',
  pro: 'bg-purple-500',
}

function isLinkActive(link) {
  if (link.exact) return route.path === link.to
  return route.path === link.to || route.path.startsWith(`${link.to}/`)
}

function isLessonActive(trackId, slug) {
  return activeTrackId.value === trackId && activeSlug.value === slug
}

function isExpanded(trackId) {
  return expandedTracks.value.includes(trackId)
}

function toggleTrack(trackId) {
  if (expandedTracks.value.includes(trackId)) {
    expandedTracks.value = expandedTracks.value.filter((id) => id !== trackId)
  } else {
    expandedTracks.value = [...expandedTracks.value, trackId]
  }
}

function getLevelLabel(level) {
  return localeStore.t(`levels.${level || 'beginner'}`)
}

function formatStep(lesson, index) {
  return String(lesson.step || index + 1).padStart(2, '0')
}

function closeMobile() {
  emit('close-mobile')
}
</script>

<template>
  <div class="shrink-0">
    <!-- Desktop Sidebar -->
    <Transition name="sidebar-desktop">
      <aside
        v-if="desktopOpen"
        class="hidden h-full w-64 border-r border-zinc-200/80 bg-zinc-50/50 lg:block dark:border-zinc-800/80 dark:bg-zinc-950"
      >
        <div
          class="sticky top-14 flex h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto overscroll-contain px-3 py-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]"
        >
          <nav class="space-y-5" :aria-label="localeStore.t('nav.primaryAria')">
            <ul class="space-y-0.5">
              <li v-for="link in primaryLinks" :key="link.to">
                <router-link
                  :to="link.to"
                  class="sidebar-item-nudge btn-press relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium"
                  :class="
                    isLinkActive(link)
                      ? 'bg-zinc-200/75 text-zinc-950 dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100'
                  "
                >
                  <span
                    aria-hidden="true"
                    class="active-pill absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-white"
                    :class="isLinkActive(link) ? 'scale-y-100 opacity-100' : 'scale-y-50 opacity-0'"
                  />
                  <component :is="link.icon" class="h-4 w-4 shrink-0" />
                  <span class="truncate">{{ link.label }}</span>
                </router-link>
              </li>
            </ul>

            <div
              v-for="section in trackSections"
              :key="section.id"
              class="border-t border-zinc-200/70 pt-4 dark:border-zinc-800/70"
            >
              <p
                class="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
              >
                {{ section.label }}
              </p>

              <div class="space-y-1">
                <div v-for="track in section.tracks" :key="track.id">
                  <button
                    type="button"
                    class="btn-press flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left hover:bg-zinc-200/50 dark:hover:bg-zinc-800/60"
                    :aria-expanded="isExpanded(track.id)"
                    @click="toggleTrack(track.id)"
                  >
                    <span class="inline-flex min-w-0 items-center gap-1.5">
                      <ChevronRight
                        class="sidebar-chevron h-3.5 w-3.5 shrink-0 text-zinc-400"
                        :class="
                          isExpanded(track.id) ? 'rotate-90 text-zinc-600 dark:text-zinc-300' : ''
                        "
                      />
                      <span
                        class="truncate text-sm font-medium"
                        :class="
                          activeTrackId === track.id
                            ? 'text-zinc-950 dark:text-white'
                            : 'text-zinc-700 dark:text-zinc-300'
                        "
                      >
                        {{ track.name }}
                      </span>
                    </span>
                    <span class="tabular-nums text-[11px] text-zinc-400 dark:text-zinc-500">
                      {{ curriculumStore.getTrackProgress(track.id).done }}/{{
                        curriculumStore.getTrackProgress(track.id).total
                      }}
                    </span>
                  </button>

                  <Transition name="sidebar-list">
                    <ul v-if="isExpanded(track.id)" class="mt-0.5 space-y-0.5 pl-4">
                      <li v-for="(lesson, idx) in track.lessons" :key="lesson.slug">
                        <router-link
                          :to="`/learn/${track.id}/${lesson.slug}`"
                          class="sidebar-item-nudge btn-press relative flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[13px]"
                          :class="
                            isLessonActive(track.id, lesson.slug)
                              ? 'bg-zinc-200/75 font-medium text-zinc-950 dark:bg-zinc-800 dark:text-white'
                              : 'text-zinc-600 hover:bg-zinc-200/40 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100'
                          "
                        >
                          <span
                            aria-hidden="true"
                            class="active-pill absolute left-0 top-1/2 h-3.5 w-0.5 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-white"
                            :class="
                              isLessonActive(track.id, lesson.slug)
                                ? 'scale-y-100 opacity-100'
                                : 'scale-y-50 opacity-0'
                            "
                          />
                          <span class="inline-flex min-w-0 items-center gap-1.5">
                            <span
                              class="h-1.5 w-1.5 shrink-0 rounded-full"
                              :class="levelDotClass[lesson.level] || levelDotClass.beginner"
                              :title="getLevelLabel(lesson.level)"
                            />
                            <span class="tabular-nums text-[11px] text-zinc-400 dark:text-zinc-500">
                              {{ formatStep(lesson, idx) }}
                            </span>
                            <span class="truncate">{{ lesson.title }}</span>
                          </span>
                          <CheckCircle2
                            v-if="curriculumStore.isCompleted(track.id, lesson.slug)"
                            class="h-3.5 w-3.5 shrink-0 text-emerald-500"
                          />
                          <Circle
                            v-else
                            class="h-2.5 w-2.5 shrink-0 text-zinc-300 dark:text-zinc-700"
                          />
                        </router-link>
                      </li>
                    </ul>
                  </Transition>
                </div>
              </div>
            </div>
          </nav>

          <div v-if="curriculumStore.completedCount > 0" class="mt-auto pt-6">
            <div
              class="tabular-nums rounded-lg border border-emerald-200/80 bg-emerald-50/70 px-3 py-2 text-center text-xs font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
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
      </aside>
    </Transition>

    <!-- Mobile Drawer Backdrop -->
    <Transition name="drawer-backdrop">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-50 bg-zinc-950/45 lg:hidden"
        @click="closeMobile"
      />
    </Transition>

    <!-- Mobile Drawer Panel -->
    <Transition name="drawer-panel">
      <aside
        v-if="mobileOpen"
        class="fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(20rem,85vw)] flex-col border-r border-zinc-200 bg-white pt-[env(safe-area-inset-top,0px)] shadow-xl lg:hidden dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div
          class="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200/80 px-4 dark:border-zinc-800/80"
        >
          <router-link to="/" class="btn-press flex items-center" @click="closeMobile">
            <BrandLogo />
          </router-link>
          <button
            type="button"
            class="btn-press rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            :aria-label="localeStore.t('nav.closeMenu')"
            @click="closeMobile"
          >
            <X class="h-4 w-4 shrink-0" />
          </button>
        </div>

        <div
          class="flex-1 overflow-y-auto overscroll-contain px-3 py-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
        >
          <nav class="space-y-5" :aria-label="localeStore.t('nav.primaryAria')">
            <ul class="space-y-0.5">
              <li v-for="link in primaryLinks" :key="link.to">
                <router-link
                  :to="link.to"
                  class="btn-press relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium"
                  :class="
                    isLinkActive(link)
                      ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-600 hover:bg-zinc-100/70 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100'
                  "
                  @click="closeMobile"
                >
                  <span
                    aria-hidden="true"
                    class="active-pill absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-white"
                    :class="isLinkActive(link) ? 'scale-y-100 opacity-100' : 'scale-y-50 opacity-0'"
                  />
                  <component :is="link.icon" class="h-4 w-4 shrink-0" />
                  <span class="truncate">{{ link.label }}</span>
                </router-link>
              </li>
            </ul>

            <div
              v-for="section in trackSections"
              :key="section.id"
              class="border-t border-zinc-200/70 pt-4 dark:border-zinc-800/70"
            >
              <p
                class="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
              >
                {{ section.label }}
              </p>

              <div class="space-y-1">
                <div v-for="track in section.tracks" :key="track.id">
                  <button
                    type="button"
                    class="btn-press flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60"
                    :aria-expanded="isExpanded(track.id)"
                    @click="toggleTrack(track.id)"
                  >
                    <span class="inline-flex min-w-0 items-center gap-1.5">
                      <ChevronRight
                        class="sidebar-chevron h-3.5 w-3.5 shrink-0 text-zinc-400"
                        :class="
                          isExpanded(track.id) ? 'rotate-90 text-zinc-600 dark:text-zinc-300' : ''
                        "
                      />
                      <span
                        class="truncate text-sm font-medium"
                        :class="
                          activeTrackId === track.id
                            ? 'text-zinc-950 dark:text-white'
                            : 'text-zinc-700 dark:text-zinc-300'
                        "
                      >
                        {{ track.name }}
                      </span>
                    </span>
                    <span class="tabular-nums text-[11px] text-zinc-400 dark:text-zinc-500">
                      {{ curriculumStore.getTrackProgress(track.id).done }}/{{
                        curriculumStore.getTrackProgress(track.id).total
                      }}
                    </span>
                  </button>

                  <Transition name="sidebar-list">
                    <ul v-if="isExpanded(track.id)" class="mt-0.5 space-y-0.5 pl-4">
                      <li v-for="(lesson, idx) in track.lessons" :key="lesson.slug">
                        <router-link
                          :to="`/learn/${track.id}/${lesson.slug}`"
                          class="btn-press relative flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[13px]"
                          :class="
                            isLessonActive(track.id, lesson.slug)
                              ? 'bg-zinc-100 font-medium text-zinc-950 dark:bg-zinc-800 dark:text-white'
                              : 'text-zinc-600 hover:bg-zinc-100/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100'
                          "
                          @click="closeMobile"
                        >
                          <span
                            aria-hidden="true"
                            class="active-pill absolute left-0 top-1/2 h-3.5 w-0.5 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-white"
                            :class="
                              isLessonActive(track.id, lesson.slug)
                                ? 'scale-y-100 opacity-100'
                                : 'scale-y-50 opacity-0'
                            "
                          />
                          <span class="inline-flex min-w-0 items-center gap-1.5">
                            <span
                              class="h-1.5 w-1.5 shrink-0 rounded-full"
                              :class="levelDotClass[lesson.level] || levelDotClass.beginner"
                              :title="getLevelLabel(lesson.level)"
                            />
                            <span class="tabular-nums text-[11px] text-zinc-400 dark:text-zinc-500">
                              {{ formatStep(lesson, idx) }}
                            </span>
                            <span class="truncate">{{ lesson.title }}</span>
                          </span>
                          <CheckCircle2
                            v-if="curriculumStore.isCompleted(track.id, lesson.slug)"
                            class="h-3.5 w-3.5 shrink-0 text-emerald-500"
                          />
                          <Circle
                            v-else
                            class="h-2.5 w-2.5 shrink-0 text-zinc-300 dark:text-zinc-700"
                          />
                        </router-link>
                      </li>
                    </ul>
                  </Transition>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </Transition>
  </div>
</template>
