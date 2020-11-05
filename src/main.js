import Vue from 'vue'

import App from './App.vue'

import { createRouter } from './router/index'
import { createStore } from './store/index'
import {sync} from 'vuex-router-sync'


import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.prototype.filterHtml = function (msg) {
  if (msg) {
    return msg.replace(/<img/g, "<img style='max-width: 800px;max-height: 500px;margin:10px 30px;'")
  }
  return ''
};

if (typeof window !== 'undefined') {
  require('element-ui/lib/theme-chalk/index.css');
  const ElementUI = require('element-ui');
  Vue.use(ElementUI);
}
// if (process.browser) {
//   //console.log('浏览器端渲染');
//   Vue.use(require('element-ui'),require('element-ui/lib/theme-chalk/index.css'))
// } else {
//   //console.log("非浏览器端渲染");
// }

Vue.config.productionTip = false;
//Vue.mixin(titleMixin),
// Vue.use(Vuex);
  Vue.use(VueAxios, axios);
//Vue.use(MetaInfo);
const router = createRouter();
const store = createStore();
sync(store, router);
const app = new Vue({
  router,
  store,
  render: h => h(App)
});
export { app, router, store }