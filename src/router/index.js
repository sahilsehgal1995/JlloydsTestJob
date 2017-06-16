import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import InterBrowser from '@/components/InterBrowser'
import RSS from '@/components/RSS'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/interbrowser',
      name: 'InterBrowser',
      component: InterBrowser
    },
    {
      path: '/rss',
      name: 'RSS',
      component: RSS
    }
  ]
})
