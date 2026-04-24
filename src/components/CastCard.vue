<script setup lang="ts">
import type { CastMember } from '@/types/show'

defineProps<{
  member: CastMember
}>()
</script>

<template>
  <div class="cast-card">
    <img
      v-if="member.person.image"
      :src="member.person.image.medium"
      :alt="member.person.name"
      class="cast-card__image"
      loading="lazy"
    />
    <div v-else class="cast-card__placeholder" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path
          d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
        />
      </svg>
    </div>
    <p class="cast-card__name">{{ member.person?.name ?? 'Unknown' }}</p>
    <p v-if="member.character?.name" class="cast-card__character">{{ member.character.name }}</p>
  </div>
</template>

<style scoped>
.cast-card {
  width: 90px;
  text-align: center;
  flex-shrink: 0;
}

.cast-card__image {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 0.4rem;
  border: 2px solid var(--color-border-subtle);
}

.cast-card__placeholder {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--color-surface-raised);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.4rem;
  color: var(--color-text-muted);
}

.cast-card__placeholder svg {
  width: 28px;
  height: 28px;
}

.cast-card__name {
  font-size: 0.75rem;
  color: var(--color-text-primary);
  font-weight: 600;
  line-height: 1.2;
}

.cast-card__character {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  line-height: 1.2;
  margin-top: 0.15rem;
}

@media (max-width: 768px) {
  .cast-card {
    width: 80px;
  }

  .cast-card__image,
  .cast-card__placeholder {
    width: 60px;
    height: 60px;
  }
}
</style>
