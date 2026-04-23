<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Show } from '@/types/show'
import { fetchShowById } from '@/services/tvmaze'

const route = useRoute()
const router = useRouter()

// loading state management
const show = ref<Show | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)

  try {
    show.value = await fetchShowById(id)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load show'
  } finally {
    isLoading.value = false
  }
})

function goBack() {
  router.back()
}
</script>

<template>
  <div>
    <button @click="goBack">&larr; Back</button>

    <p v-if="isLoading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <template v-else-if="show">
      <div class="detail">
        <img
          v-if="show.image"
          :src="show.image.original"
          :alt="show.name"
          class="detail__image"
        />

        <div class="detail__content">
          <h1>{{ show.name }}</h1>

          <div class="detail__meta">
            <span v-if="show.rating.average">⭐ {{ show.rating.average }}</span>
            <span v-if="show.genres.length">{{ show.genres.join(', ') }}</span>
            <span v-if="show.language">{{ show.language }}</span>
            <span v-if="show.status">{{ show.status }}</span>
          </div>

          <div v-if="show.summary" class="detail__summary" v-html="show.summary" />

          <dl class="detail__info">
            <template v-if="show.network">
              <dt>Network</dt>
              <dd>{{ show.network.name }}</dd>
            </template>
            <template v-if="show.premiered">
              <dt>Premiered</dt>
              <dd>{{ show.premiered }}</dd>
            </template>
            <template v-if="show.schedule.days.length">
              <dt>Schedule</dt>
              <dd>{{ show.schedule.days.join(', ') }} at {{ show.schedule.time || 'TBA' }}</dd>
            </template>
            <template v-if="show.runtime">
              <dt>Runtime</dt>
              <dd>{{ show.runtime }} min</dd>
            </template>
          </dl>

          <a
            v-if="show.officialSite"
            :href="show.officialSite"
            target="_blank"
            rel="noopener"
          >
            Visit official site
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.detail {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.detail__image {
  width: 300px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.detail__content {
  flex: 1;
}

.detail__meta {
  display: flex;
  gap: 1rem;
  color: #666;
  margin: 0.5rem 0 1rem;
}

.detail__summary {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.detail__info {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem 1rem;
}

.detail__info dt {
  font-weight: 600;
}

.detail__info dd {
  margin: 0;
}
</style>
