import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast, Grid, GridItem,Image as VanImage } from 'vant';
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import 'assets/img/icons'

Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  attempt: 1,
  preLoad: 1,
  loading: require('assets/img/lazyload.gif')
})

Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);

// 为了解决移动端300ms延迟问题
FastClick.attach(document.body)

new Vue({
  router,
  store,
  Toast,
  render: h => h(App)
}).$mount('#app')
