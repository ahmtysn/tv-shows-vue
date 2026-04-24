import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/tokens.css'

const app = createApp(App)

app.config.errorHandler = (err, _instance, info) => {
  console.error(`[App Error] ${info}:`, err)
  // In production, forward to a monitoring service (Sentry, Datadog, etc.)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
