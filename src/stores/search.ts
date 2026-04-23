import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Show } from '@/types/show'
import { searchShows } from '@/services/tvmaze'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const results = ref<Show[]>([])
  const isLoading = ref(false)

  async function search(term: string) {
    query.value = term

    if (!term.trim()) {
      results.value = []
      return
    }

    isLoading.value = true

    try {
      const data = await searchShows(term)
      results.value = data.map((item) => item.show)
    } catch {
      results.value = []
    } finally {
      isLoading.value = false
    }
  }

  function clear() {
    query.value = ''
    results.value = []
  }

  return { query, results, isLoading, search, clear }
})
