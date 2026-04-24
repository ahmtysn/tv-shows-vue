<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const row = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateScrollState() {
  const el = row.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 0
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

function scroll(direction: 'left' | 'right') {
  const el = row.value
  if (!el) return
  const amount = el.clientWidth * 0.75
  el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
}

onMounted(() => {
  updateScrollState()
  row.value?.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  row.value?.removeEventListener('scroll', updateScrollState)
})
</script>

<template>
  <div class="genre-row-wrapper">
    <button
      v-show="canScrollLeft"
      class="scroll-btn scroll-btn--left"
      @click="scroll('left')"
      aria-label="Scroll left"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>

    <div ref="row" class="genre-row" tabindex="0" role="list" aria-label="Show list">
      <slot />
    </div>

    <button
      v-show="canScrollRight"
      class="scroll-btn scroll-btn--right"
      @click="scroll('right')"
      aria-label="Scroll right"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.genre-row-wrapper {
  position: relative;
}

.genre-row {
  display: flex;
  gap: var(--space-md);
  overflow-x: auto;
  padding: var(--space-sm) 0;
  scrollbar-width: none;
}

.genre-row::-webkit-scrollbar {
  display: none;
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-65%);
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background var(--transition-base),
    color var(--transition-base);
}

.scroll-btn:hover {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.scroll-btn--left {
  left: 0;
}

.scroll-btn--right {
  right: 0;
}

.scroll-btn svg {
  width: 20px;
  height: 20px;
}
</style>
