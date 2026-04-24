<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { useDebounce } from '@/composables/useDebounce'

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()

const input = ref(searchStore.query || (route.query.q as string) || '')
const debouncedInput = useDebounce(input)

watch(debouncedInput, (value) => {
  const trimmed = value.trim()

  if (trimmed) {
    searchStore.search(trimmed)
    const method = route.name === 'search' ? 'replace' : 'push'
    router[method]({ name: 'search', query: { q: trimmed } })
  } else {
    searchStore.clear()
    if (route.name === 'search') router.replace({ name: 'home' })
  }
})

watch(
  () => searchStore.query,
  (q) => {
    if (input.value !== q) input.value = q
  },
)

function onClear() {
  input.value = ''
  searchStore.clear()
  if (route.name === 'search') router.replace({ name: 'home' })
}
</script>

<template>
  <search class="search-bar" role="search" aria-label="Search TV shows">
    <svg
      class="search-bar__icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
    <input
      v-model="input"
      type="search"
      placeholder="Search TV shows..."
      class="search-bar__input"
      aria-label="Search TV shows"
    />
    <button v-if="input" class="search-bar__clear" aria-label="Clear search" @click="onClear">
      ✕
    </button>
  </search>
</template>

<style scoped>
.search-bar {
  position: relative;
  width: 100%;
  max-width: 420px;
}

.search-bar__icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-bar__input {
  width: 100%;
  padding: 0.55rem 2.5rem 0.55rem 2.5rem;
  font-size: 0.9rem;
  border: none;
  border-radius: var(--radius-lg);
  outline: none;
  background: var(--color-input-bg);
  color: var(--color-text-primary);
  transition:
    background var(--transition-base),
    box-shadow var(--transition-base);
}

.search-bar__input::placeholder {
  color: var(--color-text-muted);
}

.search-bar__input:focus {
  background: var(--color-input-bg-focus);
  box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.3);
}

.search-bar__input::-webkit-search-cancel-button,
.search-bar__input::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

.search-bar__clear {
  position: absolute;
  right: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-input-bg-focus);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  transition: background var(--transition-base);
}

.search-bar__clear:hover {
  background: var(--color-input-bg-focus);
  opacity: 0.8;
}
</style>
