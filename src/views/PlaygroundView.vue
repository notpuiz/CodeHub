<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Play, RotateCcw, Terminal, Trash2 } from 'lucide-vue-next'
import { usePlaygroundStore } from '@/stores/playground'
import { useLocaleStore } from '@/stores/locale'
import { useToastStore } from '@/stores/toast'

const playgroundStore = usePlaygroundStore()
const localeStore = useLocaleStore()
const toastStore = useToastStore()

const activeTab = ref('html')
const consoleLogs = ref([])
const runKey = ref(0)

const tabs = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'js', label: 'JavaScript' },
]

const srcdoc = computed(() => {
  const openScript = '<' + 'script>'
  const closeScript = '</' + 'script>'
  const safeJs = playgroundStore.js.replace(new RegExp('<' + '/script>', 'gi'), '<\\' + '/script>')
  return `<!DOCTYPE html>
<html lang="${localeStore.locale}">
  <head>
    <meta charset="UTF-8" />
    <style>${playgroundStore.css}</style>
  </head>
  <body>
    ${playgroundStore.html}
    ${openScript}
      (function () {
        const send = (level, args) => {
          try {
            parent.postMessage({
              source: 'codehub-playground',
              level,
              message: args.map((a) => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
            }, '*');
          } catch {}
        };
        ['log', 'warn', 'error'].forEach((level) => {
          const orig = console[level];
          console[level] = (...args) => {
            send(level, args);
            orig.apply(console, args);
          };
        });
        window.onerror = (msg) => send('error', [msg]);
      })();
    ${closeScript}
    ${openScript}${safeJs}${closeScript}
  </body>
</html>`
})

function handleMessage(event) {
  if (event.data?.source !== 'codehub-playground') return
  consoleLogs.value.push({
    id: Date.now() + Math.random(),
    level: event.data.level,
    message: event.data.message,
  })
}

function rerun(notify = false) {
  consoleLogs.value = []
  runKey.value += 1
  if (notify) {
    toastStore.show(localeStore.t('toasts.playgroundRan'), 'accent')
  }
}

function resetCode() {
  playgroundStore.reset()
  rerun(false)
  toastStore.show(localeStore.t('toasts.playgroundReset'), 'default')
}

function clearConsole() {
  consoleLogs.value = []
  toastStore.show(localeStore.t('toasts.consoleCleared'), 'default')
}

function handleEditorKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault()
    rerun(true)
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<template>
  <main
    class="flex min-h-[calc(100dvh-3.5rem)] w-full flex-col px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:px-6 md:h-[calc(100dvh-3.5rem)] lg:px-8"
  >
    <!-- Toolbar -->
    <div class="mb-3 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
      <div class="min-w-0 flex-1">
        <h1 class="truncate text-base font-semibold text-zinc-950 sm:text-lg dark:text-white">
          {{ playgroundStore.title }}
        </h1>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">
          {{ localeStore.t('playground.subtitle') }}
        </p>
      </div>

      <div class="flex shrink-0 items-center gap-2">
        <button
          type="button"
          class="btn-press inline-flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-50 sm:h-8 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          @click="resetCode"
        >
          <RotateCcw class="h-3.5 w-3.5 shrink-0" />
          <span>{{ localeStore.t('playground.reset') }}</span>
        </button>

        <button
          type="button"
          class="btn-press inline-flex h-9 items-center gap-1.5 rounded-lg bg-zinc-900 px-3 text-xs font-medium text-white hover:bg-zinc-800 sm:h-8 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
          @click="rerun(true)"
        >
          <Play class="h-3 w-3 shrink-0 fill-current" />
          <span>{{ localeStore.t('playground.run') }}</span>
        </button>
      </div>
    </div>

    <!-- Split Workspace -->
    <div class="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">
      <!-- Editor Pane -->
      <section
        class="flex h-[320px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 sm:h-[360px] md:h-auto md:min-h-0 dark:border-zinc-800"
      >
        <div class="flex items-center gap-1 border-b border-zinc-800 bg-zinc-900/90 px-2 py-1.5">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="btn-press rounded-md px-3 py-1.5 text-xs font-medium sm:py-1"
            :class="
              activeTab === tab.id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            "
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <Transition name="tab-switch" mode="out-in">
          <textarea
            v-if="activeTab === 'html'"
            key="html"
            v-model="playgroundStore.html"
            spellcheck="false"
            autocapitalize="none"
            autocorrect="off"
            :aria-label="localeStore.t('playground.htmlEditorAria')"
            class="h-full w-full flex-1 resize-none bg-zinc-950 p-3.5 font-mono text-[13px] leading-relaxed text-zinc-100 outline-none sm:p-4"
            @keydown="handleEditorKeydown"
          />
          <textarea
            v-else-if="activeTab === 'css'"
            key="css"
            v-model="playgroundStore.css"
            spellcheck="false"
            autocapitalize="none"
            autocorrect="off"
            :aria-label="localeStore.t('playground.cssEditorAria')"
            class="h-full w-full flex-1 resize-none bg-zinc-950 p-3.5 font-mono text-[13px] leading-relaxed text-zinc-100 outline-none sm:p-4"
            @keydown="handleEditorKeydown"
          />
          <textarea
            v-else
            key="js"
            v-model="playgroundStore.js"
            spellcheck="false"
            autocapitalize="none"
            autocorrect="off"
            :aria-label="localeStore.t('playground.jsEditorAria')"
            class="h-full w-full flex-1 resize-none bg-zinc-950 p-3.5 font-mono text-[13px] leading-relaxed text-zinc-100 outline-none sm:p-4"
            @keydown="handleEditorKeydown"
          />
        </Transition>
      </section>

      <!-- Preview + Console Pane -->
      <section class="flex min-h-0 flex-col gap-3">
        <div
          class="flex h-[280px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white sm:h-[320px] md:h-auto md:min-h-0 md:flex-1 dark:border-zinc-800"
        >
          <div
            class="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
          >
            <span>{{ localeStore.t('playground.livePreview') }}</span>
            <span class="text-[11px]">{{ localeStore.t('playground.sandboxedIframe') }}</span>
          </div>
          <iframe
            :key="runKey"
            :srcdoc="srcdoc"
            :title="localeStore.t('playground.previewTitle')"
            sandbox="allow-scripts allow-modals"
            class="h-full w-full flex-1 bg-white"
          />
        </div>

        <!-- Console -->
        <div
          class="flex h-36 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 text-zinc-200 dark:border-zinc-800"
        >
          <div
            class="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs text-zinc-400"
          >
            <span class="inline-flex items-center gap-1.5 font-medium">
              <Terminal class="h-3.5 w-3.5 shrink-0" />
              {{ localeStore.t('playground.console') }}
              <span class="tabular-nums text-zinc-500">({{ consoleLogs.length }})</span>
            </span>
            <button
              type="button"
              class="btn-press inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] hover:bg-zinc-800 hover:text-zinc-200"
              @click="clearConsole"
            >
              <Trash2 class="h-3 w-3 shrink-0" />
              {{ localeStore.t('playground.clear') }}
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed">
            <p v-if="!consoleLogs.length" class="text-zinc-500">
              {{ localeStore.t('playground.consolePlaceholder') }}
            </p>
            <div
              v-for="entry in consoleLogs"
              :key="entry.id"
              class="border-b border-zinc-900 py-0.5"
              :class="
                entry.level === 'error'
                  ? 'text-red-400'
                  : entry.level === 'warn'
                    ? 'text-amber-300'
                    : 'text-zinc-200'
              "
            >
              {{ entry.message }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
