import Vue from 'vue'
import Router from 'vue-router'
import headed from '@/components/head'
import admin from '@/components/admin'
import notFound from '@/components/notFound'
import home from '@/components/user/home'
import login from '@/components/user/login'
import register from '@/components/user/register'
import list from '@/components/user/list'
import userCenter from '@/components/user/userCenter'
import movie from '@/components/user/movie'
import search from '@/components/user/search'
import file from '@/components/user/file'
import buy from '@/components/user/buy'
import manageMovie from '@/components/admin/manageMovie'
import managePlan from '@/components/admin/managePlan'
import manageShow from '@/components/admin/manageShow'
import ticket from '@/components/admin/ticket'
import nowTicket from '@/components/admin/nowTicket'

Vue.use(Router);
export default new Router({
  mode:'hash',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect:'/home',
      name: 'home',
      component: headed,
      children:[
        {path:'/home',component:home},
        {path:'/movie',component:movie},
        {path:'/list',component:list},
        {name:'login',path:'/login',component:login},
        {path:'/register',component:register},
        {path:'/search',component:search,redirect:'file'},
        {path:'/file',component:file},
        {path:'/userCenter',component:userCenter},
        {path:'/buy',component:buy}
      ]
    },{
      path:'/admin',
      name:"admin",
      redirect:'/manageMovie',
      component:admin,
      children:[
        {path:'/manageMovie',component:manageMovie},
        {path:'/managePlan',component:managePlan},
        {path:'/manageShow',component:manageShow},
        {path:'/ticket',component:ticket},
        {path:'/nowTicket',component:nowTicket},

      ]
    },
    {
      path:"*",
      name:"notFound",
      component:notFound
    }
  ]
})
