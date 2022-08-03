import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "amfe-flexible"
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'aupTMYClluniKSYZFSFV4RwzbkXUjVFH'	// ak 是在百度地图开发者平台申请的密钥
})

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
