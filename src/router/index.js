import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import MyListings from '@/views/MyListings.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Item from '@/views/Item.vue'
import CreateListing from '@/views/CreateListing.vue'
import store from '@/store'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/my',
    name: 'MyListings',
    component: MyListings,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }

  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/logout',
    redirect: '/',
    name: 'Logout',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/item/:id',
    name: 'Item',
    component: Item,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create',
    name: 'CreateListing',
    component: CreateListing,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('cancelPendingRequest');
  const isAuthentificated = store.getters['IS_AUTHENTIFICATED']
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.name !== 'Login' && !isAuthentificated) {
      console.log('no access')
      return next({ name: 'Login' })
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default router
