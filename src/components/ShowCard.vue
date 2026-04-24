<script setup lang="ts">
import type { Show } from '@/types/show'

defineProps<{
  show: Show
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'show-detail', params: { id: show.id } }"
    class="show-card"
    role="listitem"
    :aria-label="`${show.name}${show.rating?.average ? `, rated ${show.rating.average}` : ''}`"
  >
    <div class="show-card__poster">
      <img
        v-if="show.image"
        :src="show.image.medium"
        :alt="show.name"
        class="show-card__image"
        loading="lazy"
      />
      <div v-else class="show-card__placeholder" aria-hidden="true">No Image</div>
      <span v-if="show.rating?.average" class="show-card__badge" aria-hidden="true">
        ★ {{ show.rating.average }}
      </span>
    </div>
    <h3 class="show-card__title">{{ show.name }}</h3>
  </RouterLink>
</template>

<style scoped>
.show-card {
  width: 175px;
  flex-shrink: 0;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease;
}

.show-card:hover {
  transform: translateY(-6px);
}

.show-card__poster {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.25s ease;
}

.show-card:hover .show-card__poster {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6);
}

.show-card__image {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
}

.show-card__placeholder {
  width: 100%;
  aspect-ratio: 2 / 3;
  background: var(--color-surface-raised);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.show-card__badge {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-sm);
  line-height: 1.3;
}

.show-card__title {
  font-size: 0.9rem;
  margin: 0.6rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text-primary);
}

@media (max-width: 480px) {
  .show-card {
    width: 140px;
  }

  .show-card__title {
    font-size: 0.8rem;
  }
}
</style>
