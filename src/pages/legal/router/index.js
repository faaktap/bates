import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const la = ["AppLayoutDefault","AppLayoutBates"]

const routes = [
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/Home.vue'),
    path: '/h1',
    name: 'Home1',
    props:true,
    alias: '/home1',
    meta: {layout: la[1], authentication: "public" }
  },
    {
    component: () => import(/* webpackChunkName: "test" */ '@/views/ErrorPage.vue')
    ,name: 'ErrorPage'
    ,path: '*'
    ,props:true
    ,meta: {layout: la[1], authentication: "public"}
  },
]


const router = new VueRouter({
  mode: 'history',
  base: 'legal',    //This works from vue.config.js
  werner: 'werner',      //see if I can add my own stuff.
  routes
})

export default router
