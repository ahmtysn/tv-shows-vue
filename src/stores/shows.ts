import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Show } from '@/types/show'
import { fetchShows } from '@/services/tvmaze'

export const useShowsStore = defineStore('shows', () => {
  const shows = ref<Show[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const showsByGenre = computed(() => {
    const grouped: Record<string, Show[]> = {}

    for (const show of shows.value) {
      for (const genre of show.genres) {
        const list = grouped[genre] ?? (grouped[genre] = [])
        list.push(show)
      }
    }

    for (const shows of Object.values(grouped)) {
      shows?.sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
    }

    return grouped
  })

  const genres = computed(() => {
    return Object.keys(showsByGenre.value).sort()
  })

  async function loadShows() {
    isLoading.value = true
    error.value = null

    try {
      shows.value = await fetchShows()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
    } finally {
      isLoading.value = false
    }
  }

  return { shows, isLoading, error, showsByGenre, genres, loadShows }
})
