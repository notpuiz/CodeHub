<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import SearchModal from '@/components/SearchModal.vue'
import { useThemeStore } from '@/stores/theme'
import { useSearchStore } from '@/stores/search'
import { useLocaleStore } from '@/stores/locale'

useThemeStore()
useLocaleStore()
const searchStore = useSearchStore()

const mobileSidebarOpen = ref(false)
const desktopSidebarOpen = ref(true)

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
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
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
        <router-view />
      </div>
    </div>
    <SearchModal />
  </div>
</template>
