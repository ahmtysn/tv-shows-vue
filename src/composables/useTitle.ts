import { watchEffect, type MaybeRefOrGetter, toValue } from 'vue'

const APP_NAME = 'TV ShowHub'

// useTitle sets the title based on the provided source.
export function useTitle(source: MaybeRefOrGetter<string | null | undefined>) {
  watchEffect(() => {
    const value = toValue(source)
    document.title = value ? `${value} — ${APP_NAME}` : APP_NAME
  })
}
