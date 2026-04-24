import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { makeShow } from '../helpers/fixtures'

vi.mock('@/services/tvmaze', () => ({
  fetchShows: vi.fn(),
}))

import { fetchShows } from '@/services/tvmaze'
import { useShowsStore } from '@/stores/shows'

const mockFetchShows = vi.mocked(fetchShows)

describe('useShowsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockFetchShows.mockReset()
  })

  it('puts each show under every genre it belongs to', async () => {
    mockFetchShows.mockResolvedValue([
      makeShow({ id: 1, name: 'Breaking Bad', genres: ['Drama'], rating: { average: 9.5 } }),
      makeShow({
        id: 2,
        name: 'Better Call Saul',
        genres: ['Drama', 'Crime'],
        rating: { average: 8.7 },
      }),
      makeShow({ id: 3, name: 'Sherlock', genres: ['Crime'], rating: { average: 9.1 } }),
    ])

    const store = useShowsStore()
    await store.loadShows()

    expect(store.showsByGenre.Drama?.map((s) => s.name)).toEqual(['Breaking Bad', 'Better Call Saul'])
    expect(store.showsByGenre.Crime?.map((s) => s.name)).toEqual(['Sherlock', 'Better Call Saul'])
  })

  it('sorts shows in each genre by rating (highest first), missing ratings go last', async () => {
    mockFetchShows.mockResolvedValue([
      makeShow({ id: 1, name: 'No Rating', genres: ['Drama'], rating: { average: null } }),
      makeShow({ id: 2, name: 'Mid', genres: ['Drama'], rating: { average: 6.5 } }),
      makeShow({ id: 3, name: 'Top', genres: ['Drama'], rating: { average: 9.2 } }),
    ])

    const store = useShowsStore()
    await store.loadShows()

    expect(store.showsByGenre.Drama?.map((s) => s.name)).toEqual(['Top', 'Mid', 'No Rating'])
  })

  it('returns genres in alphabetical order', async () => {
    mockFetchShows.mockResolvedValue([
      makeShow({ id: 1, genres: ['Thriller', 'Action', 'Drama'] }),
    ])

    const store = useShowsStore()
    await store.loadShows()

    expect(store.genres).toEqual(['Action', 'Drama', 'Thriller'])
  })

  it('records the error and keeps shows empty when the fetch fails', async () => {
    mockFetchShows.mockRejectedValue(new Error('Network down'))

    const store = useShowsStore()
    await store.loadShows()

    expect(store.error).toBe('Network down')
    expect(store.shows).toEqual([])
  })
})
