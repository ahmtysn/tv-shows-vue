<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="app">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <AppHeader />
    <main id="main-content" class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  color: var(--color-text-primary);
  background: var(--color-surface);
  -webkit-font-smoothing: antialiased;
  transition:
    background-color var(--transition-base),
    color var(--transition-base);
}

a {
  color: inherit;
  text-decoration: none;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: var(--color-accent);
  color: var(--color-on-accent);
  padding: var(--space-sm) var(--space-md);
  font-weight: 700;
  z-index: 200;
  border-radius: 0 0 var(--radius-md) 0;
}

.skip-link:focus {
  top: 0;
}
</style>

<style scoped>
.app-main {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: var(--space-lg) var(--space-md);
}
</style>
