// router.js
import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/pages/goods/index.vue'

Vue.use(Router)


export let createRouter = () => {
  let route  = new Router({
    mode:'history',
    routes: [
		
	]
  })
  return route
}