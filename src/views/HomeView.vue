<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'

const store = useShowsStore()

onMounted(() => {
  store.loadShows()
})
</script>

<template>
  <div>
    <h1>TV Shows Dashboard</h1>

    <p v-if="store.isLoading">Loading shows...</p>
    <p v-else-if="store.error">{{ store.error }}</p>

    <template v-else>
      <section v-for="genre in store.genres" :key="genre">
        <h2>{{ genre }}</h2>
        <ul>
          <li v-for="show in store.showsByGenre[genre]" :key="show.id">
            {{ show.name }} — {{ show.rating.average ?? 'N/A' }}
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>
