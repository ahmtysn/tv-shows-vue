import { ref, type Ref } from 'vue'

type AsyncState<T> = {
  data: Ref<T>
  isLoading: Ref<boolean>
  error: Ref<string | null>
}

export function useAsyncData<T, Args extends unknown[] = []>(
  fetcher: (...args: Args) => Promise<T>,
  initialValue: T,
): AsyncState<T> & { execute: (...args: Args) => Promise<void> }

export function useAsyncData<T, Args extends unknown[] = []>(
  fetcher: (...args: Args) => Promise<T>,
): AsyncState<T | null> & { execute: (...args: Args) => Promise<void> }

export function useAsyncData<T, Args extends unknown[] = []>(
  fetcher: (...args: Args) => Promise<T>,
  initialValue?: T,
) {
  const data = ref(initialValue ?? null) as Ref<T | null>
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function execute(...args: Args) {
    isLoading.value = true
    error.value = null

    try {
      data.value = await fetcher(...args)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, execute }
}
