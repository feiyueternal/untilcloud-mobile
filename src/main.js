import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import less from 'less'
import axios from 'axios'
import Router from 'vue-router';
import permit from './utils/permission' 

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(less)

axios.defaults.baseURL='http://47.98.142.113:8443/api'
Vue.prototype.$http = axios

const originalPush = Router.prototype.push
//解决某种报错
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
document.addEventListener('deviceready',function(){
  permit()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')