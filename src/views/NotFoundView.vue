<template>
  <div class="not-found">
    <h1 class="not-found__code">404</h1>
    <p class="not-found__text">Page not found</p>
    <RouterLink to="/" class="not-found__link">Back to Dashboard</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: var(--space-2xl) var(--space-md);
}

.not-found__code {
  font-size: 4rem;
  font-weight: 900;
  color: var(--color-text-muted);
  line-height: 1;
}

.not-found__text {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  margin: var(--space-sm) 0 var(--space-lg);
}

.not-found__link {
  display: inline-block;
  background: var(--color-accent);
  color: var(--color-on-accent);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.9rem;
  transition: opacity var(--transition-base);
}

.not-found__link:hover {
  opacity: 0.85;
}
</style>
