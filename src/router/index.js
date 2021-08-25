import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/Login'
Vue.use(VueRouter)
const la = ["AppLayoutDefault","AppLayoutBasic","AppLayoutBlue","AppLayoutGray"]

const routes = [
  {
    component: () => import(/* webpackChunkName: "bates" */ '../views/bates/Outline.vue'),
    path: '/outline',
    name: 'Outline',
    meta: {layout: la[4], authentication: "public" }
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
    path: '/VL',
    name: 'ViewLog',
    component: () => import(/* webpackChunkName: "log" */ '../views/ViewLog.vue'),
    meta: {layout: la[1], authentication: "public" }
  },
  {
    path: '/ff',
    name: 'ff',
    component: () => import(/* webpackChunkName: "vfbasetest" */ '../components/vfbase/vfbasetest'),
    meta: {layout: la[3], authentication: "public" }
  },
  {
    path: '/choosesubjects',
    name: 'skool',
    component: () => import(/* webpackChunkName: "vfbasetest" */ '../components/vfbase/skool'),
    meta: {layout: la[3], authentication: "public" }
  },
  {
    component: () => import(/* webpackChunkName: "admin" */ '@/views/ViewFunctions.vue'),
    path: '/viewfunctions',
    name: 'ViewFunctions',
    meta: {layout: la[3], authentication: "admin" }
  },
  {
    component: login,path: '/login',
    name: 'Login',
    meta: {layout: la[3],
    authentication: "public"}
  },  {
    component: () => import(/* webpackChunkName: "test" */ '@/views/Bland.vue'),
    name: 'bland',
    path: '/bland',
    meta: {layout: la[3], authentication: "public"}
  },  {
    component: () => import(/* webpackChunkName: "test" */ '@/components/FlexGridStuff.vue')
    ,name: 'flex'
    ,path: '/flex'
    ,meta: {layout: la[0], authentication: "public"}
  },
  {
    component: () => import(/* webpackChunkName: "test" */ '@/components/base/WhackAMole.vue')
    ,name: 'game'
    ,path: '/game'
    ,meta: {layout: la[0], authentication: "public"}
  },
  {
    component: () => import(/* webpackChunkName: "test" */ '@/components/base/baseTabAndEdit.vue')
    ,name: 'basetabandedit'
    ,path: '/basetabandedit'
    ,meta: {layout: la[0], authentication: "public"}
  },
  {
    //emailheck
    component: () => import(/* webpackChunkName: "test" */ '@/views/StreamLineDB.vue')
    ,name: 'streamline'
    ,path: '/streamline'
    ,meta: {layout: la[0], authentication: "public"}
  },      
  {
    component: () => import(/* webpackChunkName: "test" */ '@/views/EmailCheck.vue')
    ,name: 'EmailCheck'
    ,path: '/emailcheck'
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
