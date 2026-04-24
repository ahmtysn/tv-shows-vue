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
  color: #1a1a1a;
  background: #1a1a32;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

:focus-visible {
  outline: 2px solid #ffc107;
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: #ffc107;
  color: #000;
  padding: 0.5rem 1rem;
  font-weight: 700;
  z-index: 200;
  border-radius: 0 0 6px 0;
}

.skip-link:focus {
  top: 0;
}
</style>

<style scoped>
.app-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}
</style>
