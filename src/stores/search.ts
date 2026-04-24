import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Show } from '@/types/show'
import { searchShows } from '@/services/tvmaze'
import { useAsyncData } from '@/composables/useAsyncData'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')

  const {
    data: results,
    isLoading,
    error,
    execute,
  } = useAsyncData(async (term: string): Promise<Show[]> => {
    const data = await searchShows(term)
    return data.map((item) => item.show)
  }, [] as Show[])

  async function search(term: string) {
    query.value = term

    if (!term.trim()) {
      results.value = []
      error.value = null
      return
    }

    await execute(term)
  }

  function clear() {
    query.value = ''
    results.value = []
    error.value = null
  }

  return { query, results, isLoading, error, search, clear }
})
