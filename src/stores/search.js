import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const isOpen = ref(false)
  const query = ref('')

  function open(initialQuery = '') {
    query.value = initialQuery
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    query.value = ''
  }

  function toggle() {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  return {
    isOpen,
    query,
    open,
    close,
    toggle,
  }
})
