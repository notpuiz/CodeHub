<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppToast from '@/components/AppToast.vue'
import SearchModal from '@/components/SearchModal.vue'
import { useThemeStore } from '@/stores/theme'
import { useSearchStore } from '@/stores/search'
import { useLocaleStore } from '@/stores/locale'

useThemeStore()
useLocaleStore()
const searchStore = useSearchStore()

const mobileSidebarOpen = ref(false)
const desktopSidebarOpen = ref(true)

function spawnClickPulse(e) {
  if (e.button !== 0 && e.pointerType === 'mouse') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const interactive = e.target?.closest?.('button, a, [role="button"]')
  if (!interactive || interactive.disabled) return

  const ring = document.createElement('span')
  ring.className = 'click-pulse-ring'
  ring.style.left = `${e.clientX}px`
  ring.style.top = `${e.clientY}px`
  document.body.appendChild(ring)

  const anim = ring.animate(
    [
      { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0.75 },
      { transform: 'translate(-50%, -50%) scale(1.65)', opacity: 0 },
    ],
    {
      duration: 260,
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      fill: 'forwards',
    },
  )

  anim.onfinish = () => ring.remove()
  anim.oncancel = () => ring.remove()
}

function handleGlobalKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchStore.toggle()
    return
  }
  if (
    e.key === '/' &&
    !searchStore.isOpen &&
    !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
  ) {
    e.preventDefault()
    searchStore.open()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
  window.addEventListener('pointerdown', spawnClickPulse, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
  window.removeEventListener('pointerdown', spawnClickPulse)
})
</script>

<template>
  <div class="min-h-dvh bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
    <AppNavbar
      @toggle-mobile-sidebar="mobileSidebarOpen = !mobileSidebarOpen"
      @toggle-desktop-sidebar="desktopSidebarOpen = !desktopSidebarOpen"
    />
    <div class="flex min-h-[calc(100dvh-3.5rem)] w-full">
      <AppSidebar
        :mobile-open="mobileSidebarOpen"
        :desktop-open="desktopSidebarOpen"
        @close-mobile="mobileSidebarOpen = false"
      />
      <div class="min-w-0 flex-1">
        <router-view v-slot="{ Component, route }">
          <Transition name="page-switch" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </router-view>
      </div>
    </div>
    <SearchModal />
    <AppToast />
  </div>
</template>
