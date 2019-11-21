import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/common/http'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		// 用户信息
		userInfo:{
			login:false,
			token:''
		},
		// 购物车信息
		CartList:[],
		// 结算面板购物车ID储存
		cartId:''
	},
	mutations:{
		// 登录方法
		login(state,token){
			state.userInfo.login = true
			state.userInfo.token = token
		},
		// 登出方法
		logout(state) {
			state.login = false
			state.token = ''
			state.username = ''
			state.avatarUrl = ''
		},
		// 添加购物车方法
		addCart(state,payload) {
			state.CartList.push(payload)
		},
		// 购物车清空 的方法
		clearCart(state){
			state.CartList = []
			return 
		},
		// 结算面板购物车ID储存
		keepCartId(state,cartId){
			state.cartId = cartId
			return 
		}
	},
	getters:{
		isToken(state){
			if(state.userInfo.token){
				return state.userInfo.token
			}else{
				return false
			}
		}
	}
})

export default store