import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('codehub-theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const theme = ref(getInitialTheme())
  let fallbackTimer = null

  const applyTheme = (val) => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', val === 'dark')
    document.documentElement.style.colorScheme = val
    const color = val === 'dark' ? '#09090b' : '#ffffff'
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute('content', color)
    })
    localStorage.setItem('codehub-theme', val)
  }

  applyTheme(theme.value)

  watch(theme, (val) => {
    applyTheme(val)
  })

  function toggleTheme(event) {
    const next = theme.value === 'dark' ? 'light' : 'dark'

    if (typeof document === 'undefined' || typeof window === 'undefined') {
      theme.value = next
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (typeof document.startViewTransition !== 'function') {
      if (!prefersReducedMotion) {
        document.documentElement.classList.add('theme-fade-fallback')
        clearTimeout(fallbackTimer)
        fallbackTimer = setTimeout(() => {
          document.documentElement.classList.remove('theme-fade-fallback')
        }, 250)
      }
      theme.value = next
      return
    }

    const root = document.documentElement
    let x = window.innerWidth - 36
    let y = 28

    const target = event?.currentTarget
    if (target && typeof target.getBoundingClientRect === 'function') {
      const rect = target.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    } else if (typeof event?.clientX === 'number' && typeof event?.clientY === 'number') {
      x = event.clientX
      y = event.clientY
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    root.classList.add('theme-transition')

    const transition = document.startViewTransition(() => {
      theme.value = next
      applyTheme(next)
    })

    transition.ready
      .then(() => {
        if (prefersReducedMotion) {
          root.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 180,
            easing: 'ease',
            pseudoElement: '::view-transition-new(root)',
          })
          root.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 180,
            easing: 'ease',
            pseudoElement: '::view-transition-old(root)',
          })
          return
        }

        const duration = 420
        const easing = 'cubic-bezier(0.23, 1, 0.32, 1)'

        root.animate(
          [
            { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 0.2 },
            { clipPath: `circle(${endRadius}px at ${x}px ${y}px)`, opacity: 1 },
          ],
          {
            duration,
            easing,
            pseudoElement: '::view-transition-new(root)',
          },
        )

        root.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration,
          easing,
          pseudoElement: '::view-transition-old(root)',
        })
      })
      .catch(() => {})

    transition.finished
      .finally(() => {
        root.classList.remove('theme-transition')
      })
      .catch(() => {})
  }

  return {
    theme,
    toggleTheme,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
