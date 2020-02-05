import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios // 全局注册，使用方法为:this.$axios
// Vue.prototype.qs = qs // 全局注册，使用方法为:this.qs
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = 'http://localhost:8080'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
