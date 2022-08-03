import Vue from 'vue'
import VueRouter from 'vue-router'

const Screen = () => import(/* webpackChunkName: "Screen" */ '@/views/screenView.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect : '/screen'
  },
  {
    path: '/screen',
    name: 'Screen',
    component: Screen
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
