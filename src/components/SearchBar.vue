<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSearchStore } from '@/stores/search'
import { useDebounce } from '@/composables/useDebounce'

const searchStore = useSearchStore()
const input = ref('')
const debouncedInput = useDebounce(input)

watch(debouncedInput, (value) => {
  searchStore.search(value)
})

function onClear() {
  input.value = ''
  searchStore.clear()
}
</script>

<template>
  <div class="search-bar">
    <svg class="search-bar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
    <input
      v-model="input"
      type="text"
      placeholder="Search TV shows..."
      class="search-bar__input"
    />
    <button v-if="input" class="search-bar__clear" @click="onClear">✕</button>
  </div>
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
  color: #888;
  pointer-events: none;
}

.search-bar__input {
  width: 100%;
  padding: 0.55rem 2.5rem 0.55rem 2.5rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 8px;
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  transition: background 0.2s, box-shadow 0.2s;
}

.search-bar__input::placeholder {
  color: #888;
}

.search-bar__input:focus {
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.3);
}

.search-bar__clear {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.7rem;
  color: #aaa;
  transition: background 0.2s;
}

.search-bar__clear:hover {
  background: rgba(255, 255, 255, 0.25);
}
</style>
