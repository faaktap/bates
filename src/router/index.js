import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/Login'
Vue.use(VueRouter)
const la = ["AppLayoutDefault","AppLayoutBasic","AppLayoutBlue","AppLayoutGray"]

const routes = [
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/Home.vue'),
    path: '/',
    name: 'Home',
    alias: '/home',
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/Classes.vue'),
    path: '/class/:area?',
    props: true,
    name: 'Classes',
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/WorkArea.vue'),
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
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/Reports.vue'),
    path: '/reports',
    name: 'Reports',
    props:true,
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/bates/Outline.vue'),
    path: '/outline',
    name: 'Outline',
    meta: {layout: la[1], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/bates/Scoring.vue'),
    path: '/scoring',
    name: 'Scoring',
    meta: {layout: la[4], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/ToolBars.vue'),
    path: '/toolbars',
    name: 'Toolbars',
    meta: {layout: la[4], authentication: "public" }
  },
  {
    component: login,path: '/login',
    name: 'Login',
    meta: {layout: la[3],
    authentication: "public"}
  },
  {
    component: () => import(/* webpackChunkName: "test" */ '@/components/base/baseTabAndEdit.vue')
    ,name: 'basetabandedit'
    ,path: '/basetabandedit'
    ,meta: {layout: la[0], authentication: "public"}
  },
  {
    component: () => import(/* webpackChunkName: "test" */ '@/components/TextColorPicker.vue')
    ,name: 'color'
    ,path: '/color'
    ,meta: {layout: la[3], authentication: "public"}
  },
    {
    component: () => import(/* webpackChunkName: "test" */ '@/views/ErrorPage.vue')
    ,name: 'ErrorPage'
    ,path: '*'
    ,meta: {layout: la[3], authentication: "public"}
  },
]

import { publicPath } from '../../vue.config'
const router = new VueRouter({
  mode: 'history',
  base: publicPath,    //This works from vue.config.js
  werner: 'werner',      //see if I can add my own stuff.
  routes
})

router.beforeEach((to, from,next) => {
  console.log('R - From.name, to.name |', from.name,'|', to.name,'|', from.path,'|', to.path);
  ////this.$cs.l('Auth Meta:', to.params);
  if (to.name == from.name) {
    if (to.params && to.params == from.params){
    //do nothing
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
