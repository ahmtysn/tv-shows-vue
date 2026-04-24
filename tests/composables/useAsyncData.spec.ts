import { describe, it, expect, vi } from 'vitest'
import type { Show } from '@/types/show'
import { useAsyncData } from '@/composables/useAsyncData'
import { makeShow } from '../helpers/fixtures'

const breakingBad = makeShow({ id: 1, name: 'Breaking Bad' })

describe('useAsyncData', () => {
  it('starts with the given initial value, not loading, no error', () => {
    const { data, isLoading, error } = useAsyncData(async () => [breakingBad], [] as Show[])

    expect(data.value).toEqual([])
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('uses null as data when no initial value is given', () => {
    const { data } = useAsyncData(async () => breakingBad)

    expect(data.value).toBe(null)
  })

  it('sets isLoading while the fetch is in progress', async () => {
    let resolve: (show: Show) => void = () => {}
    const fetcher = () => new Promise<Show>((r) => (resolve = r))

    const { isLoading, execute } = useAsyncData(fetcher)

    const pending = execute()
    expect(isLoading.value).toBe(true)

    resolve(breakingBad)
    await pending
    expect(isLoading.value).toBe(false)
  })

  it('stores the fetched value in data on success', async () => {
    const { data, execute } = useAsyncData(async () => breakingBad)

    await execute()

    expect(data.value).toEqual(breakingBad)
  })

  it('stores the error message when the fetch throws', async () => {
    const { data, error, execute } = useAsyncData<Show>(async () => {
      throw new Error('Failed to load show')
    })

    await execute()

    expect(error.value).toBe('Failed to load show')
    expect(data.value).toBe(null)
  })

  it('passes arguments from execute through to the fetcher', async () => {
    const fetcher = vi.fn(async (id: number) => makeShow({ id, name: `Show ${id}` }))
    const { data, execute } = useAsyncData(fetcher)

    await execute(42)

    expect(fetcher).toHaveBeenCalledWith(42)
    expect(data.value).toEqual(makeShow({ id: 42, name: 'Show 42' }))
  })

  it('clears the old error when the next fetch succeeds', async () => {
    let shouldFail = true
    const { error, execute } = useAsyncData<Show>(async () => {
      if (shouldFail) throw new Error('Network down')
      return breakingBad
    })

    await execute()
    expect(error.value).toBe('Network down')

    shouldFail = false
    await execute()
    expect(error.value).toBe(null)
  })
})
