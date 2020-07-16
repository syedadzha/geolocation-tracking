import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  var user = firebase.auth().currentUser;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    if (user) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  }
})

export default router
