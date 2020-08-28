import Vue from 'vue'
import App from './App'
import {http} from './common/http.js'
import { CONSTANT } from './common/constant.js'
Vue.config.productionTip = false
Vue.prototype.$ysHttp = http;
Vue.prototype.$constant = CONSTANT;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
