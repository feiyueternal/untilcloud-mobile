import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import less from 'less'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(less)
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
