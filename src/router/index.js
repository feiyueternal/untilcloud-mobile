import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
// import Changecode from '../views/Changecode'
import Register from '../views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    // component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    component:resolve => require(['@/views/Login.vue'],resolve)
  },
  {
      path:'/Home',
      name:'Home',
      component:resolve => require(['@/views/Home.vue'],resolve),
      meta:{
        requireAuth:true
      }
  },
  {
      path: '/about',
      name: 'About',
      component:resolve => require(['@/views/About.vue'],resolve), 
  },
  {
    path: '/ForgetPassword',
    name: 'ForgetPassword',
    component:resolve => require(['@/views/ForgetPassword.vue'],resolve), 
},
{
  path: '/Register',
  name: 'Register',
  component:resolve => require(['@/views/Register.vue'],resolve), 
},
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router
