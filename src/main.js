import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss'
import http from '@/utils/request1'
import utils from '@/utils'
import { deepClone } from '@/utils'
import VueLazyLoad from 'vue-lazyload'
import '@/assets/font/font.css'
import 'video.js/dist/video-js.css'
import dataV from '@jiaminghi/data-view'
import './directive'
import fullscreen from 'vue-fullscreen'
import BaiduMap from 'vue-baidu-map'


// 可拖拽缩放组件全局注册 -- VueDraggableResizable
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)


Vue.use(ElementUI);
Vue.use(dataV)
Vue.use(fullscreen)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'g8Aie8DW0ogUZvzEfP4DzdvRwyfQv41T'
})

Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/img/2.jpg'),
  loading: require('./assets/img/2.jpg'),
  attempt: 2,
})

Vue.config.productionTip = false;

Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$events = new Vue()

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG = {}
window.SITE_CONFIG['storeState'] = deepClone(store.state)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
