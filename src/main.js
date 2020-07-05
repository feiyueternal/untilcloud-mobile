import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import less from 'less'
import axios from 'axios'
import Router from 'vue-router';
import permit from './utils/permission';
// import VueBarcode from 'vue-barcode';
import VueBarcode from '@xkeshi/vue-barcode';

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(less)
Vue.component('barcode', VueBarcode);

// axios.defaults.baseURL='http://47.98.142.113:8443/api'
Vue.prototype.$http = axios

const originalPush = Router.prototype.push
//解决某种报错
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// router.beforeEach((to, from, next) => {
//   var clu = window.localStorage.getItem('CLouduser')
//   if(clu){
//     var tea=window.localStorage.getItem('isTea')
//     if(tea=="false"){
//       this.$router.push({ name: "Home" });
      
//     }else{
//       this.$router.push({ name: "TeacherCourse" });
//     }
//   }else{
//     if (to.path === '/') {
//       next()
//     } else {
//       next({ path: '/' });
//     }
//   }
// })

document.addEventListener('deviceready',function(){
  permit()
})

new Vue({
  router,
  store,
  render: h => h(App),
  'barcode': VueBarcode,
}).$mount('#app')