import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import less from 'less'
import axios from 'axios'
import Router from 'vue-router';

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(less)
Vue.prototype.$http = axios

const originalPush = Router.prototype.push
//解决某种报错
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
