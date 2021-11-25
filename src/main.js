import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap-grid.css'
// import Vuelidate from 'vuelidate'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'skeleton-css/css/skeleton.css'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')

