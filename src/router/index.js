import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Main from '../views/Main.vue'
import List from '../views/List.vue'
import Product from '../views/Product.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [  
  {
    path: '/',
    name: 'Main',
    component: Main
  },  
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/wireframe',
    name: 'Wireframe',
    component: () => import( /* webpackChunkName: "wireframe" */ '../views/Wireframe.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import( /* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// TODO: change this to role based authentication using firestore auth api
const admins = ['hyounoosung@gmail.com', 'good617boy@gmail.com']

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const requiresAdmin = to.matched.some(x => x.meta.requiresAdmin)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    if (requiresAdmin && !admins.includes(auth.currentUser.email)) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
