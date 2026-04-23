<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'
import { useSearchStore } from '@/stores/search'
import ShowCard from '@/components/ShowCard.vue'
import GenreRow from '@/components/GenreRow.vue'

const store = useShowsStore()
const searchStore = useSearchStore()

onMounted(() => {
  store.loadShows()
})
</script>

<template>
  <div>
    <!-- Search results -->
    <template v-if="searchStore.query">
      <p v-if="searchStore.isLoading" class="status">Searching...</p>
      <template v-else>
        <h2 class="section-title">Results for "{{ searchStore.query }}"</h2>
        <div class="search-results">
          <ShowCard
            v-for="show in searchStore.results"
            :key="show.id"
            :show="show"
          />
        </div>
        <p v-if="!searchStore.results.length" class="status">No shows found.</p>
      </template>
    </template>

    <!-- Genre dashboard -->
    <template v-else>
      <p v-if="store.isLoading" class="status">Loading shows...</p>
      <p v-else-if="store.error" class="status status--error">{{ store.error }}</p>

      <template v-else>
        <section v-for="genre in store.genres" :key="genre" class="genre-section">
          <h2 class="section-title">{{ genre }}</h2>
          <GenreRow>
            <ShowCard
              v-for="show in store.showsByGenre[genre]"
              :key="show.id"
              :show="show"
            />
          </GenreRow>
        </section>
      </template>
    </template>
  </div>
</template>

<style scoped>
.status {
  text-align: center;
  color: #888;
  padding: 2rem 0;
}

.status--error {
  color: #e74c3c;
}

.section-title {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: #eee;
}

.genre-section {
  margin-bottom: 0.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.search-results {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
