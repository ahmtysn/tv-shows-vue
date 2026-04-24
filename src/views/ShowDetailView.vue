<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ShowWithCast } from '@/types/show'
import { fetchShowById } from '@/services/tvmaze'

const route = useRoute()
const router = useRouter()

const show = ref<ShowWithCast | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const cast = computed(() => show.value?._embedded?.cast ?? [])

const SKELETON_TAG_COUNT = 5
const SKELETON_TEXT_LINES = 4

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
  <div class="page">
    <button class="back-btn" aria-label="Go back to previous page" @click="goBack">&#8592; Back</button>

    <div v-if="isLoading" class="detail-skeleton" aria-busy="true" aria-label="Loading show details">
      <div class="detail-skeleton__image shimmer" />
      <div class="detail-skeleton__content">
        <div class="detail-skeleton__title shimmer" />
        <div class="detail-skeleton__row">
          <div v-for="n in SKELETON_TAG_COUNT" :key="n" class="detail-skeleton__tag shimmer" />
        </div>
        <div v-for="n in SKELETON_TEXT_LINES" :key="n" class="detail-skeleton__line shimmer" />
      </div>
    </div>
    <p v-else-if="error" class="status" role="alert">{{ error }}</p>

    <template v-else-if="show">
      <div class="detail">
        <img
          v-if="show.image"
          :src="show.image.original"
          :alt="show.name"
          class="detail__image"
        />

        <div class="detail__content">
          <h1 class="detail__title">{{ show.name }}</h1>

          <div class="detail__tags">
            <span v-if="show.rating.average" class="tag tag--rating">★ {{ show.rating.average }}</span>
            <span v-if="show.status" class="tag">{{ show.status }}</span>
            <span v-if="show.premiered" class="tag">{{ show.premiered.slice(0, 4) }}</span>
            <span v-if="show.runtime" class="tag">{{ show.runtime }} min</span>
            <span v-if="show.language" class="tag">{{ show.language }}</span>
          </div>

          <div v-if="show.genres.length" class="detail__genres">
            <span v-for="genre in show.genres" :key="genre" class="genre-chip">{{ genre }}</span>
          </div>

          <div v-if="show.summary" class="detail__summary" v-html="show.summary" />

          <div class="detail__info">
            <template v-if="show.network">
              <span class="info-label">Network</span>
              <span class="info-value">
                {{ show.network.name }}
                <template v-if="show.network.country"> · {{ show.network.country.name }}</template>
              </span>
            </template>
            <template v-if="show.schedule.days.length">
              <span class="info-label">Schedule</span>
              <span class="info-value">{{ show.schedule.days.join(', ') }} at {{ show.schedule.time || 'TBA' }}</span>
            </template>
          </div>

          <a
            v-if="show.officialSite"
            :href="show.officialSite"
            target="_blank"
            rel="noopener noreferrer"
            class="detail__link"
            :aria-label="`Visit official site for ${show.name} (opens in new tab)`"
          >
            Official Site &#8594;
          </a>
        </div>
      </div>

      <section v-if="cast.length" class="cast">
        <h2 class="cast__title">Cast</h2>
        <div class="cast__grid">
          <div v-for="member in cast" :key="member.person.id" class="cast-card">
            <img
              v-if="member.person.image"
              :src="member.person.image.medium"
              :alt="member.person.name"
              class="cast-card__image"
            />
            <div v-else class="cast-card__placeholder" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
            <p class="cast-card__name">{{ member.person.name }}</p>
            <p class="cast-card__character">{{ member.character.name }}</p>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.back-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 900;
  color: #ffc107;
  transition: opacity 0.2s;
}

.back-btn:hover {
  opacity: 0.75;
}

.status {
  text-align: center;
  color: #888;
  padding: 2rem 0;
}

.detail {
  display: flex;
  gap: 2rem;
  margin-top: 1.25rem;
}

.detail__image {
  width: min(320px, 40%);
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  align-self: flex-start;
}

.detail__content {
  flex: 1;
  min-width: 0;
}

.detail__title {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.6rem;
}

.detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}

.tag {
  background: #2a2a3e;
  color: #ccc;
  font-size: 0.82rem;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
}

.tag--rating {
  background: #ffc107;
  color: #000;
  border-color: #ffc107;
  font-weight: 700;
}

.detail__genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.genre-chip {
  background: #1e3a5f;
  color: #7fc8f8;
  font-size: 0.8rem;
  padding: 0.2rem 0.7rem;
  border-radius: 16px;
  font-weight: 600;
}

.detail__summary {
  line-height: 1.7;
  margin-bottom: 1.25rem;
  color: #bbb;
}

.detail__info {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.35rem 1rem;
  margin-bottom: 1.25rem;
}

.info-label {
  font-weight: 700;
  color: #e0e0e0;
  font-size: 0.9rem;
}

.info-value {
  color: #ccc;
  font-size: 0.9rem;
}

.detail__link {
  display: inline-block;
  color: #ffc107;
  font-weight: 600;
  font-size: 0.9rem;
}

.detail__link:hover {
  text-decoration: underline;
}

/* Cast section */
.cast {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.cast__title {
  font-size: 1.3rem;
  color: #eee;
  margin-bottom: 1rem;
}

.cast__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.cast-card {
  width: 90px;
  text-align: center;
}

.cast-card__image {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 0.4rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.cast-card__placeholder {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #2a2a42;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.4rem;
  color: #555;
}

.cast-card__placeholder svg {
  width: 28px;
  height: 28px;
}

.cast-card__name {
  font-size: 0.75rem;
  color: #ddd;
  font-weight: 600;
  line-height: 1.2;
}

.cast-card__character {
  font-size: 0.7rem;
  color: #888;
  line-height: 1.2;
  margin-top: 0.15rem;
}

/* Detail skeleton */
.detail-skeleton {
  display: flex;
  gap: 2rem;
  margin-top: 1.25rem;
}

.detail-skeleton__image {
  width: min(320px, 40%);
  aspect-ratio: 2 / 3;
  border-radius: 10px;
  flex-shrink: 0;
  background: #2a2a42;
}

.detail-skeleton__content {
  flex: 1;
  padding-top: 0.5rem;
}

.detail-skeleton__title {
  height: 28px;
  width: 50%;
  border-radius: 4px;
}

.detail-skeleton__row {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.detail-skeleton__tag {
  height: 22px;
  width: 60px;
  border-radius: 4px;
}

.detail-skeleton__line {
  height: 14px;
  width: 100%;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.detail-skeleton__line:first-of-type {
  margin-top: 1.5rem;
}

.shimmer {
  background: linear-gradient(90deg, #2a2a42 25%, #35355a 50%, #2a2a42 75%);
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

@media (max-width: 768px) {
  .page {
    padding: 0.75rem 1rem;
  }

  .detail,
  .detail-skeleton {
    flex-direction: column;
    align-items: center;
  }

  .detail__image,
  .detail-skeleton__image {
    width: 75%;
    max-width: 300px;
    align-self: center;
  }

  .detail__content {
    width: 100%;
  }

  .detail__title {
    font-size: 1.5rem;
  }

  .cast__grid {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 0.5rem;
  }

  .cast__grid::-webkit-scrollbar {
    display: none;
  }

  .cast-card {
    width: 80px;
    flex-shrink: 0;
  }

  .cast-card__image,
  .cast-card__placeholder {
    width: 60px;
    height: 60px;
  }
}
</style>
