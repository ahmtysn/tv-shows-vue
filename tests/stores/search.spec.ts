import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { makeShow } from '../helpers/fixtures'

vi.mock('@/services/tvmaze', () => ({
  searchShows: vi.fn(),
}))

import { searchShows } from '@/services/tvmaze'
import { useSearchStore } from '@/stores/search'

const mockSearchShows = vi.mocked(searchShows)
const breakingBad = makeShow({ id: 1, name: 'Breaking Bad' })

describe('useSearchStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockSearchShows.mockReset()
  })

  it('skips the API call and clears results when the query is empty', async () => {
    const store = useSearchStore()
    store.results = [breakingBad]

    await store.search('   ')

    expect(mockSearchShows).not.toHaveBeenCalled()
    expect(store.results).toEqual([])
  })

  it('fetches and stores the mapped shows for a real query', async () => {
    mockSearchShows.mockResolvedValue([{ score: 0.9, show: breakingBad }])

    const store = useSearchStore()
    await store.search('breaking')

    expect(mockSearchShows).toHaveBeenCalledWith('breaking')
    expect(store.results).toEqual([breakingBad])
    expect(store.error).toBe(null)
  })

  it('stores the error message when the search fails', async () => {
    mockSearchShows.mockRejectedValue(new Error('Network down'))

    const store = useSearchStore()
    await store.search('breaking')

    expect(store.error).toBe('Network down')
  })

  it('resets query, results, and error on clear()', async () => {
    mockSearchShows.mockResolvedValue([{ score: 1, show: breakingBad }])

    const store = useSearchStore()
    await store.search('breaking')
    store.clear()

    expect(store.query).toBe('')
    expect(store.results).toEqual([])
    expect(store.error).toBe(null)
  })
})
