import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const items = ref([])
  let nextId = 1

  function show(message, tone = 'default', duration = 2200) {
    const id = nextId++
    items.value = [...items.value.slice(-2), { id, message, tone }]
    setTimeout(() => {
      dismiss(id)
    }, duration)
    return id
  }

  function dismiss(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  return {
    items,
    show,
    dismiss,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot))
}
