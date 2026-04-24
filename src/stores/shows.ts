import { computed } from 'vue'
import { defineStore } from 'pinia'
import type { Show } from '@/types/show'
import { fetchShows } from '@/services/tvmaze'
import { useAsyncData } from '@/composables/useAsyncData'

export const useShowsStore = defineStore('shows', () => {
  const { data: shows, isLoading, error, execute: loadShows } = useAsyncData(
    fetchShows,
    [] as Show[],
  )

  const showsByGenre = computed(() => {
    const grouped: Record<string, Show[]> = {}

    for (const show of shows.value) {
      for (const genre of show.genres) {
        const list = grouped[genre] ?? (grouped[genre] = [])
        list.push(show)
      }
    }

    for (const list of Object.values(grouped)) {
      list?.sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
    }

    return grouped
  })

  const genres = computed(() => Object.keys(showsByGenre.value).sort())

  return { shows, isLoading, error, showsByGenre, genres, loadShows }
})
