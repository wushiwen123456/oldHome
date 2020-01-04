import Vue from 'vue'
import App from './App'
import store from '@/store'
Vue.config.productionTip = false

// 全局自定义导航
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)


// 全局模态框
import Modal from '@/components/x-modal/x-modal'
Vue.component('x-modal',Modal)

// 全局loading动画
import loading from '@/components/loding/w-loading.vue'
Vue.component('x-loading',loading)

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()  
