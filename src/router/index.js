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
      requiresAuth: false,
      scrollTop: false
    }
  },
  {
    path: '/profile',
    name: 'MyListings',
    component: MyListings,
    meta: {
      requiresAuth: true,
      scrollTop: true
    }

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
      scrollTop: true
    }

  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false,
      scrollTop: true
    }
  },
  {
    path: '/logout',
    redirect: '/',
    name: 'Logout',
    meta: {
      requiresAuth: true,
      scrollTop: true
    }
  },
  {
    path: '/drop/:id',
    name: 'Item',
    component: Item,
    meta: {
      requiresAuth: false,
      scrollTop: true
    }
  },
  {
    path: '/new',
    name: 'CreateListing',
    component: CreateListing,
    meta: {
      requiresAuth: true,
      scrollTop: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isScrollPage = to.matched.some((record) => record.meta.scrollTop) && window.screen.width < 768 // проверяем нужные страницы и мобилка ли это
  const scrollOffset = isScrollPage ? 20 * window.innerHeight / 100 : 0 // двигаем на 20vh
  window.document.getElementById('scrollable-content').scrollTo({ top: scrollOffset, behavior: "smooth" }) 

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
