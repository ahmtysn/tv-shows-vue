import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value right away', () => {
    const query = ref('breaking')
    const debounced = useDebounce(query)

    expect(debounced.value).toBe('breaking')
  })

  it('only updates after the delay has passed', async () => {
    const query = ref('breaking')
    const debounced = useDebounce(query, 300)

    query.value = 'breaking bad'
    await nextTick()

    vi.advanceTimersByTime(200)
    expect(debounced.value).toBe('breaking')

    vi.advanceTimersByTime(100)
    expect(debounced.value).toBe('breaking bad')
  })

  it('restarts the delay when the user keeps typing', async () => {
    const query = ref('b')
    const debounced = useDebounce(query, 300)

    query.value = 'br'
    await nextTick()
    vi.advanceTimersByTime(200)

    query.value = 'bre'
    await nextTick()
    vi.advanceTimersByTime(200)
    expect(debounced.value).toBe('b')

    vi.advanceTimersByTime(100)
    expect(debounced.value).toBe('bre')
  })
})
