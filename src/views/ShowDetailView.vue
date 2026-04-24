<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchShowById } from '@/services/tvmaze'
import { useAsyncData } from '@/composables/useAsyncData'
import { useTitle } from '@/composables/useTitle'
import ErrorBox from '@/components/ErrorBox.vue'
import CastCard from '@/components/CastCard.vue'

const route = useRoute()
const router = useRouter()

const { data: show, isLoading, error, execute } = useAsyncData(fetchShowById)

useTitle(() => show.value?.name)

const cast = computed(() => show.value?._embedded?.cast ?? [])

const SKELETON_TAG_COUNT = 5
const SKELETON_TEXT_LINES = 4

function loadShow() {
  const id = Number(route.params.id)
  if (!Number.isFinite(id) || id <= 0) {
    router.replace({ name: 'not-found' })
    return
  }
  return execute(id)
}

onMounted(loadShow)

function goBack() {
  router.back()
}
</script>

<template>
  <div class="page">
    <button class="back-btn" aria-label="Go back to previous page" @click="goBack">
      &#8592; Back
    </button>

    <div
      v-if="isLoading"
      class="detail-skeleton"
      aria-busy="true"
      aria-label="Loading show details"
    >
      <div class="detail-skeleton__image shimmer" />
      <div class="detail-skeleton__content">
        <div class="detail-skeleton__title shimmer" />
        <div class="detail-skeleton__row">
          <div v-for="n in SKELETON_TAG_COUNT" :key="n" class="detail-skeleton__tag shimmer" />
        </div>
        <div v-for="n in SKELETON_TEXT_LINES" :key="n" class="detail-skeleton__line shimmer" />
      </div>
    </div>
    <ErrorBox v-else-if="error" :message="error" @retry="loadShow" />

    <template v-else-if="show">
      <div class="detail">
        <img v-if="show.image" :src="show.image.original" :alt="show.name" class="detail__image" />

        <div class="detail__content">
          <h1 class="detail__title">{{ show.name }}</h1>

          <div class="detail__tags">
            <span v-if="show.rating?.average" class="tag tag--rating"
              >★ {{ show.rating.average }}</span
            >
            <span v-if="show.status" class="tag">{{ show.status }}</span>
            <span v-if="show.premiered" class="tag">{{ show.premiered.slice(0, 4) }}</span>
            <span v-if="show.runtime" class="tag">{{ show.runtime }} min</span>
            <span v-if="show.language" class="tag">{{ show.language }}</span>
          </div>

          <div v-if="show.genres?.length" class="detail__genres">
            <span v-for="genre in show.genres" :key="genre" class="genre-chip">{{ genre }}</span>
          </div>
          <div v-if="show.summary" class="detail__summary" v-html="show.summary" />
          <div v-if="show.network || show.schedule?.days?.length" class="detail__info">
            <template v-if="show.network">
              <span class="info-label">Network</span>
              <span class="info-value">
                {{ show.network.name }}
                <template v-if="show.network.country"> · {{ show.network.country.name }}</template>
              </span>
            </template>
            <template v-if="show.schedule?.days?.length">
              <span class="info-label">Schedule</span>
              <span class="info-value"
                >{{ show.schedule.days.join(', ') }} at {{ show.schedule.time || 'TBA' }}</span
              >
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
          <CastCard v-for="member in cast" :key="member.person.id" :member="member" />
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-lg) var(--space-md);
}

.back-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 900;
  color: var(--color-accent);
  transition: opacity var(--transition-base);
}

.back-btn:hover {
  opacity: 0.75;
}

.detail {
  display: flex;
  gap: var(--space-xl);
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
  color: var(--color-text-primary);
  margin-bottom: 0.6rem;
}

.detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}

.tag {
  background: var(--color-surface-raised);
  color: var(--color-text-secondary);
  font-size: 0.82rem;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-md);
}

.tag--rating {
  background: var(--color-accent);
  color: var(--color-on-accent);
  border-color: var(--color-accent);
  font-weight: 700;
}

.detail__genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.genre-chip {
  background: var(--color-info-bg);
  color: var(--color-info-text);
  font-size: 0.8rem;
  padding: 0.2rem 0.7rem;
  border-radius: 16px;
  font-weight: 600;
}

.detail__summary {
  line-height: 1.7;
  margin-bottom: 1.25rem;
  color: var(--color-text-secondary);
}

.detail__info {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.35rem 1rem;
  margin-bottom: 1.25rem;
}

.info-label {
  font-weight: 700;
  color: var(--color-text-primary);
  font-size: 0.9rem;
}

.info-value {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.detail__link {
  display: inline-block;
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.9rem;
}

.detail__link:hover {
  text-decoration: underline;
}

/* Cast section */
.cast {
  margin-top: 2.5rem;
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border-subtle);
}

.cast__title {
  font-size: 1.3rem;
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

.cast__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

/* Detail skeleton */
.detail-skeleton {
  display: flex;
  gap: var(--space-xl);
  margin-top: 1.25rem;
}

.detail-skeleton__image {
  width: min(320px, 40%);
  aspect-ratio: 2 / 3;
  border-radius: 10px;
  flex-shrink: 0;
  background: var(--color-surface-raised);
}

.detail-skeleton__content {
  flex: 1;
  padding-top: var(--space-sm);
}

.detail-skeleton__title {
  height: 28px;
  width: 50%;
  border-radius: var(--radius-sm);
}

.detail-skeleton__row {
  display: flex;
  gap: var(--space-sm);
  margin-top: 0.75rem;
}

.detail-skeleton__tag {
  height: 22px;
  width: 60px;
  border-radius: var(--radius-sm);
}

.detail-skeleton__line {
  height: 14px;
  width: 100%;
  border-radius: var(--radius-sm);
  margin-top: var(--space-sm);
}

.detail-skeleton__line:first-of-type {
  margin-top: var(--space-lg);
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

@media (max-width: 768px) {
  .page {
    padding: 0.75rem var(--space-md);
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
}
</style>
