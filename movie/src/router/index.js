import Vue from 'vue'
import Router from 'vue-router'
import headed from '@/components/head'
import home from '@/components/home'
import hotSpot from '@/components/hotSpot'
import login from '@/components/login'
import register from '@/components/register'
import list from '@/components/list'
import movie from '@/components/movie'
import search from '@/components/search'
import file from '@/components/file'
import buy from '@/components/buy'
import admin from '@/components/admin'
import add from '@/components/add'
import ticket from '@/components/ticket'

Vue.use(Router);

export default new Router({
  mode:'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect:'/home',
      name: 'home',
      component: headed,
      children:[
        {path:'/home',component:home},
        {path:'/hotSpot',component:hotSpot},
        {path:'/movie',component:movie},
        {path:'/list',component:list},
        {path:'/login',component:login},
        {path:'/register',component:register},
        {path:'/search',component:search,redirect:'file'},
        {path:'/file',component:file},
        {path:'/buy',component:buy}
      ]
    },{
      path:'/admin',
      name:"admin",
      redirect:'/add',
      component:admin,
      children:[
        {path:'/add',component:add},
        {path:'/ticket',component:ticket}

      ]
    }
  ]
})
