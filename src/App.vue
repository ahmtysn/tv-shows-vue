<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
</script>

<template>
  <div class="app">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <header class="app-header">
      <nav class="app-header__inner" aria-label="Main navigation">
        <RouterLink to="/" class="app-header__brand">
          <span class="app-header__logo" aria-hidden="true">TV</span>
          <span class="app-header__title">ShowHub</span>
        </RouterLink>
        <SearchBar />
      </nav>
    </header>
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
.app-header {
  background: #111122;
  padding: 1.1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.app-header__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

@media (max-width: 480px) {
  .app-header__inner {
    flex-wrap: wrap;
  }

  .app-header__title {
    font-size: 1rem;
  }
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.app-header__logo {
  background: #ffc107;
  color: #1a1a2e;
  font-weight: 900;
  font-size: 0.95rem;
  padding: 4px 8px;
  border-radius: 6px;
  line-height: 1;
}

.app-header__title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #f0f0f0;
}

.app-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}
</style>
