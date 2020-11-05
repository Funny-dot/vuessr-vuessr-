import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/', name: 'index',
        component: () =>import('../pages/index/index.vue')
      },
      {
        path: '/goods', name: 'goods',
        component: resolve => require(['../pages/goods/index.vue'], resolve)
      },
      {path: "*", redirect: "/"}
    ]
  })
}