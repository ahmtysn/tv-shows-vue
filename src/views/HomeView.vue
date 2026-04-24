<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'
import ShowCard from '@/components/ShowCard.vue'
import GenreRow from '@/components/GenreRow.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import ErrorBox from '@/components/ErrorBox.vue'

const SKELETON_ROWS = 4
const SKELETON_CARDS_PER_ROW = 8

const store = useShowsStore()

onMounted(() => {
  store.loadShows()
})
</script>

<template>
  <div>
    <template v-if="store.isLoading">
      <section v-for="n in SKELETON_ROWS" :key="n" class="genre-section">
        <div class="skeleton-title shimmer" />
        <GenreRow>
          <SkeletonCard v-for="i in SKELETON_CARDS_PER_ROW" :key="i" />
        </GenreRow>
      </section>
    </template>
    <ErrorBox v-else-if="store.error" :message="store.error" @retry="store.loadShows()" />

    <template v-else>
      <section v-for="genre in store.genres" :key="genre" class="genre-section">
        <h2 class="section-title">{{ genre }}</h2>
        <GenreRow>
          <ShowCard v-for="show in store.showsByGenre[genre]" :key="show.id" :show="show" />
        </GenreRow>
      </section>
    </template>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: var(--color-text-primary);
}

.genre-section {
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border-subtle);
}

.skeleton-title {
  height: 20px;
  width: 140px;
  border-radius: var(--radius-sm);
  margin-bottom: 0.75rem;
  background: var(--color-surface-raised);
}

.shimmer {
  background: linear-gradient(
    90deg,
    var(--color-surface-raised) 25%,
    var(--color-surface-highlight) 50%,
    var(--color-surface-raised) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite ease-in-out;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
