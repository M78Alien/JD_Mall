import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from '@/api/lazyImg.js'
// import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
// app.use(createPinia().use(persist))

app.mount('#app')
