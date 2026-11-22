import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, shallowRef, watch } from 'vue'
import { messages as initialMessages } from '@/data/locales'

const STORAGE_KEY = 'codehub-locale'
const SUPPORTED_LOCALES = ['en', 'km']

const catalog = shallowRef(initialMessages)

if (import.meta.hot) {
  import.meta.hot.accept('@/data/locales', (mod) => {
    if (mod?.messages) {
      catalog.value = mod.messages
    }
  })
}

export const useLocaleStore = defineStore('locale', () => {
  const getInitialLocale = () => {
    if (typeof window === 'undefined') return 'km'
    const stored = localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED_LOCALES.includes(stored)) return stored
    return 'km'
  }

  const locale = ref(getInitialLocale())

  const lookup = (lang, key) => {
    return key
      .split('.')
      .reduce(
        (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
        catalog.value[lang],
      )
  }

  const t = (key, params = {}) => {
    const raw = lookup(locale.value, key) ?? lookup('en', key) ?? key
    if (typeof raw !== 'string') return key
    return raw.replace(/\{(\w+)\}/g, (_, token) =>
      params[token] !== undefined ? String(params[token]) : `{${token}}`,
    )
  }

  const applyLocale = (val) => {
    if (typeof document === 'undefined') return
    document.documentElement.lang = val
    document.title = lookup(val, 'meta.title') ?? lookup('en', 'meta.title')
    localStorage.setItem(STORAGE_KEY, val)
  }

  applyLocale(locale.value)

  watch([locale, catalog], ([val]) => {
    applyLocale(val)
  })

  function setLocale(next) {
    if (SUPPORTED_LOCALES.includes(next)) {
      locale.value = next
    }
  }

  function toggleLocale() {
    locale.value = locale.value === 'en' ? 'km' : 'en'
  }

  return {
    locale,
    t,
    setLocale,
    toggleLocale,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocaleStore, import.meta.hot))
}
