import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/Login'
Vue.use(VueRouter)
const la = ["AppLayoutDefault","AppLayoutBates","AppLayoutBlue","AppLayoutGray"]

const routes = [
  {
    component: () => import(/* webpackChunkName: "bates" */ '@/pages/legal/views/Home.vue'),
    path: '/xx',
    name: 'OtherHome',
    props:true,
    alias: '/otherhome',
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/Home.vue'),
    path: '/',
    name: 'Home',
    props:true,
    alias: '/home',
    meta: {layout: la[1], authentication: "public" }
  },

  {
    component: () => import(/* webpackChunkName: "bates" */ '@/components/crud/TablePlace.vue'),
    //path: '/class/:area?',
    path: '/class',
    props: true,
    name: 'Classes',
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '@/components/crud/TableWorkArea.vue'),
    path: '/area',
    name: 'WorkArea',
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/StockCategory.vue'),
    path: '/category',
    name: 'StockCategory',
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/Stock.vue'),
    path: '/stock/:room?',
    name: 'Stock',
    props:true,
    meta: {layout: la[1], authentication: "teacher" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/Reports.vue'),
    path: '/reports',
    name: 'Reports',
    props:true,
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/Choosy.vue'),
    path: '/choosy',
    name: 'Choosy',
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "test" */ '../views/bates/Outline.vue'),
    path: '/outline',
    name: 'Outline',
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "test" */ '../views/ToolBars.vue'),
    path: '/toolbars',
    name: 'Toolbars',
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: login,path: '/login',
    name: 'Login',
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

import { publicPath } from '../../vue.config'
const router = new VueRouter({
  mode: 'history',
  base: publicPath,    //This works from vue.config.js
  werner: 'werner',      //see if I can add my own stuff.
  routes
})

import { getters } from "@/api/store";
router.beforeEach((to, from,next) => {
  if (getters.getState({ object: "gZml" }).login.isAuthenticated == false) {
    //Do LoginCheck
    if (localStorage.getItem('login')) {
      console.log('try auto login for route')
      try {
        getters.getState({ object: "gZml" }).login = JSON.parse(localStorage.getItem('login'));
      } catch(e) {
        localStorage.removeItem('login')
      }
    }
  }
  const userAuth = getters.getState({ object: "gZml" }).login.isAuthenticated
  const logMessage = "You need to be logged in to do that"
  console.log('R - From.name, to.name |', from.name,'|', to.name,'|', from.path,'|', to.path, userAuth);
  if (to.name == from.name) {
    if (to.params && to.params == from.params){
    //do nothing
    } else {
      next();
    }
  } else {
    if (to.meta.authentication != 'public' && userAuth == false && to.name != 'Login') {
      next({name: 'ErrorPage'
           ,params:{message: logMessage}
           ,meta:{message:'Bad Authentication for ' + to.name}})
    } else {
       next();
    }
  }
});

export default router
