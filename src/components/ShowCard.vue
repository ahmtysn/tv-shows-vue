<script setup lang="ts">
import type { Show } from '@/types/show'

defineProps<{
  show: Show
}>()
</script>

<template>
  <RouterLink :to="{ name: 'show-detail', params: { id: show.id } }" class="show-card">
    <img
      v-if="show.image"
      :src="show.image.medium"
      :alt="show.name"
      class="show-card__image"
    />
    <div v-else class="show-card__placeholder">No Image</div>
    <div class="show-card__info">
      <h3 class="show-card__title">{{ show.name }}</h3>
      <span v-if="show.rating.average" class="show-card__rating">
        ⭐ {{ show.rating.average }}
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.show-card {
  width: 160px;
  flex-shrink: 0;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.show-card__image {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}

.show-card__placeholder {
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.85rem;
}

.show-card__info {
  padding: 0.5rem 0;
}

.show-card__title {
  font-size: 0.9rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.show-card__rating {
  font-size: 0.8rem;
  color: #666;
}
</style>
