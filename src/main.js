import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast } from 'vant';

Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Toast,
  render: h => h(App)
}).$mount('#app')
