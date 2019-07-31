import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import '@/common/style/index.scss'
import '@/common/font/iconfont.css'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

Vue.use(VueLazyload, {
  loading: require('./common/image/loading.gif')
})
Vue.config.productionTip = false
// 引入fastclick解决移动端点击300ms延迟
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
