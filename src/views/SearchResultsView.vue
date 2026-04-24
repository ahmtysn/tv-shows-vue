<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { useTitle } from '@/composables/useTitle'
import ShowCard from '@/components/ShowCard.vue'
import ErrorBox from '@/components/ErrorBox.vue'

const route = useRoute()
const searchStore = useSearchStore()

useTitle(() => (searchStore.query ? `Search: ${searchStore.query}` : 'Search'))

onMounted(() => {
  const q = (route.query.q as string) ?? ''
  if (q && q !== searchStore.query) searchStore.search(q)
})
</script>

<template>
  <div>
    <p v-if="searchStore.isLoading" class="status" role="status" aria-live="polite">Searching...</p>
    <ErrorBox
      v-else-if="searchStore.error"
      :message="searchStore.error"
      @retry="searchStore.search(searchStore.query)"
    />
    <template v-else-if="searchStore.query">
      <h2 class="section-title">Results for "{{ searchStore.query }}"</h2>
      <div class="search-results">
        <ShowCard v-for="show in searchStore.results" :key="show.id" :show="show" />
      </div>
      <p v-if="!searchStore.results.length" class="status">No shows found.</p>
    </template>
  </div>
</template>

<style scoped>
.status {
  text-align: center;
  color: var(--color-text-muted);
  padding: var(--space-xl) 0;
}

.section-title {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: var(--color-text-primary);
}

.search-results {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}
</style>
