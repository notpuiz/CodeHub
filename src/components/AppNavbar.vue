<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Code2, Menu, Moon, PanelLeft, Search, Sun } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import { useSearchStore } from '@/stores/search'
import { useLocaleStore } from '@/stores/locale'
import { useToastStore } from '@/stores/toast'

const emit = defineEmits(['toggle-mobile-sidebar', 'toggle-desktop-sidebar'])

const themeStore = useThemeStore()
const searchStore = useSearchStore()
const localeStore = useLocaleStore()
const toastStore = useToastStore()

function selectLocale(lang) {
  if (localeStore.locale === lang) return
  localeStore.setLocale(lang)
  toastStore.show(localeStore.t('toasts.switchedLang'), 'accent')
}

const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 8
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="navbar-surface sticky top-0 z-40 border-b bg-white/85 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md dark:bg-zinc-950/85"
    :class="
      isScrolled
        ? 'border-zinc-200 shadow-xs dark:border-zinc-800 dark:shadow-zinc-950/60'
        : 'border-zinc-200/70 shadow-none dark:border-zinc-800/70'
    "
  >
    <div class="flex h-14 w-full items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
      <div class="flex min-w-0 items-center gap-2 sm:gap-2.5">
        <button
          type="button"
          class="btn-press flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 lg:hidden dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          :aria-label="localeStore.t('nav.openMenu')"
          @click="emit('toggle-mobile-sidebar')"
        >
          <Menu class="h-4 w-4 shrink-0" />
        </button>

        <button
          type="button"
          class="btn-press hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 lg:flex dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          :aria-label="localeStore.t('nav.openMenu')"
          @click="emit('toggle-desktop-sidebar')"
        >
          <PanelLeft class="h-4 w-4 shrink-0" />
        </button>

        <router-link
          to="/"
          class="brand-link btn-press flex items-center gap-2 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          <span
            class="brand-mark flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
          >
            <Code2 class="h-4 w-4 shrink-0" />
          </span>
          <span>CodeHub</span>
        </router-link>
      </div>

      <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          class="btn-press flex h-9 w-9 items-center justify-center gap-2.5 rounded-lg border border-zinc-200 bg-zinc-50/80 text-sm text-zinc-500 hover:border-zinc-300 hover:text-zinc-800 sm:w-auto sm:px-3 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
          :aria-label="localeStore.t('nav.searchDocs')"
          @click="searchStore.open()"
        >
          <Search class="h-4 w-4 shrink-0" />
          <span class="hidden sm:inline">{{ localeStore.t('nav.searchDocs') }}</span>
          <kbd
            class="hidden rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-zinc-500 sm:inline-block dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
          >
            Ctrl K
          </kbd>
        </button>

        <!-- Segmented language switcher with sliding active thumb -->
        <div
          class="relative grid h-9 shrink-0 grid-cols-2 items-center rounded-lg border border-zinc-200 bg-zinc-50/80 p-0.5 dark:border-zinc-800 dark:bg-zinc-900/70"
          role="group"
          :aria-label="localeStore.t('nav.languageSwitcherAria')"
        >
          <span
            aria-hidden="true"
            class="lang-thumb pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-md bg-white shadow-xs dark:bg-zinc-800"
            :style="{
              transform: localeStore.locale === 'km' ? 'translateX(100%)' : 'translateX(0%)',
            }"
          />
          <button
            type="button"
            class="btn-press relative z-10 flex h-full items-center justify-center rounded-md px-2.5 text-xs font-medium"
            :class="
              localeStore.locale === 'en'
                ? 'text-zinc-900 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            "
            :aria-pressed="localeStore.locale === 'en'"
            @click="selectLocale('en')"
          >
            EN
          </button>
          <button
            type="button"
            class="btn-press relative z-10 flex h-full items-center justify-center rounded-md px-2.5 text-xs font-medium"
            :class="
              localeStore.locale === 'km'
                ? 'text-zinc-900 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            "
            :aria-pressed="localeStore.locale === 'km'"
            @click="selectLocale('km')"
          >
            ខ្មែរ
          </button>
        </div>

        <button
          type="button"
          class="btn-press flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          :aria-label="
            themeStore.theme === 'dark'
              ? localeStore.t('nav.switchToLight')
              : localeStore.t('nav.switchToDark')
          "
          @click="themeStore.toggleTheme($event)"
        >
          <Transition name="theme-icon" mode="out-in">
            <Sun v-if="themeStore.theme === 'dark'" key="sun" class="h-4 w-4 shrink-0" />
            <Moon v-else key="moon" class="h-4 w-4 shrink-0" />
          </Transition>
        </button>
      </div>
    </div>
  </header>
</template>
