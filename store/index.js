import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/common/http'

// 立即购买方法
import {payNow} from "@/network/detail"

// 收藏商品接口,取消收藏
import { collectProduct,unCollectProduct } from '@/network/detail'

// 订单详情
import { detailOrder } from '@/network/affirm'
import {replaceImage} from '@/utils/dealUrl'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		// 用户信息
		userInfo:{
			login:false,
			token:'',
			integral:'',
			isSubmit:false,
			address:{
				"type": "gcj02",
				"latitude": 34.75240212716388,
				"longitude": 113.68146140793064,
				"speed": 0,
				"accuracy": 40,
				"errMsg": "getLocation:ok",
				"shoppingAddress":''
			},
			name:''
		},
		// 退款商品信息
		tProduct:[],
		// 购物车信息
		CartList:[],
		// 结算面板购物车ID储存
		cartId:[],
		shopId:'' ,//商品id
		// 地址信息
		address:{},		
		// 秒杀id：
		skillId:'',
		// 拼团id
		combinId:'',
		//订单id
		orderKey:'',
		// 检索类型
		searchType:'',
		// 积分商品id
		integralId:'',
		// 拼团详细信息
		pinkInfo:{},
		// 获取订单商品详情
		orderDetail:{},
		// 公益信息存储
		publicMessage:{},
		skillTime:0,
		richHtml:{}
	},
	mutations:{
		// 保存用户名
		setUserName(state,name){
			state.userInfo.name = name
		},
		// 登录方法
		login(state,token){
			state.userInfo.login = true
			state.userInfo.token = token
		},
		// 设置用户是否是商户正在审核状态
		setUserIsSubmit(state,payload){
			state.userInfo.isSubmit = payload
		},
		// 用户地址设置
		setUserAddress(state,payload){
			state.userInfo.address = {...payload}
		},
		// 登出方法
		logout(state) {
			state.userInfo.login = false
			state.userInfo.token = ''
			uni.removeStorageSync('token');
		},
		// 设置用户默认收货地址
		setShoppingAddress(state,payload){
			state.userInfo.shoppingAddress = {...payload}
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
			state.cartId = []
			if(cartId instanceof Array){
				state.cartId.push(...cartId)
			}else{
				state.cartId.push(cartId)
			}
			
			return 
		},
		// 保存商品id
		keepShopId(state,id){
			state.shopId = id
		},
		// 设置用户地址信息
		setAddress(state,item){
			console.log(item)
			state.address = item
		},
		// 清空用户地址
		emptyAddress(state){
			state.address = {}
		},
		// 秒杀id存储
		setSkillId(state,payload){
			state.skillId = payload.id
			state.skillTime = payload.time
		},
		// 拼团id存储
		setcombinId(state,id){
			state.combinId = id
		},
		// 立即支付方法
		payRightNow(state,data){
			if(state.userInfo.token){
				
			}else{
				uni.switchTab({
					url:"../pages/Home/home"
				})
			}
		},
		// 保存订单id：
		setOrderKey(state,key){
			state.orderKey = key
		},
		// 设置检索类型
		setSearchType(state,type){
			state.searchType = type
		},
		// 个人积分详情
		setIntegral(state,integral){
			state.userInfo.integral = integral
		},
		// 积分商品cartId保存
		setIntegralId(state,id){
			this.state.integralId = id
		},
		// 退款商品信息存储
		setProductInfo(state,payload){
			state.tProduct = {...payload}
		},
		// 获取用户拼团的团队信息
		setPinkId(state,pinkInfo){
			state.pinkInfo = {...pinkInfo}
		},
		// 清空用户拼团的信息
		setOutPinkInfo(state){
			state.pinkInfo = {}
		},
		// 保存评价商品详情信息
		setOrderDetail(state,obj){
			state.orderDetail = {...obj}
		},
		setPublicMessage(state,obj){
			state.publicMessage = obj
		},
		// 保存富文本信息
		setRichHtml(state,obj){
			state.richHtml = obj
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
	},
	actions:{
		// 提交订单方法
		Pay({commit,state},payload){
			return payNow(payload,state.userInfo.token)
		},
		// 收藏商品方法
		collect({commit,state},payload){
			return collectProduct(payload.id,payload.category,state.userInfo.token)
		},
		// 取消商品收藏
		unCollect({state},payload){
			return unCollectProduct(payload.id,payload.category,state.userInfo.token)
		},
		// 订单详情：
		detailOrder({state}){
			return detailOrder(state.orderKey,state.userInfo.token)
		},
		//获取用户地址信息
		getUserLocation({commit}){
			return new Promise((resolve,reject) => {
				uni.getLocation({
					type:"gcj02",
					success :(res) =>  {
						console.log(res)
						// 储存到缓存中
						uni.setStorage({
							key:'addresss',
							data:res
						})
						resolve(res)
					},
					fail:(err) => {
						// #ifdef APP-PLUS
						plus.nativeUI.toast('获取地理位置失败',{duration:'long'})
						// #endif
						reject(err)
					}
				})
			})
		},
		// 根据经纬度(wgs)并且根据经纬度获取城市(h5+app)
		getWarpweft() {
			// #ifdef APP-PLUS
			let seconds = 3,longitude,latitude,obj = {}
			return new Promise((resolve,reject) => {
				let countdown = setInterval(() => {
					seconds--
					uni.getLocation({
					            type: 'wgs84',
					            success: function(res) {
									if (seconds <= 0) {
										seconds = 3
										longitude = res.longitude //当前位置的经度
										latitude = res.latitude	//当前位置的纬度
										clearInterval(countdown)
										var point = new plus.maps.Point(longitude, latitude);
										plus.maps.Map.reverseGeocode(
										    point,
										    {},
										    function(event) {
										        obj.address = event.address; // 转换后的地理位置
										        obj.point = event.coord; // 转换后的坐标信息
										        obj.coordType = event.coordType; // 转换后的坐标系类型
										        var reg = /.+?(省|市|自治区|自治州|县|区)/g;					                        
										        obj.addressList = obj.address.match(reg).toString().split(",");
												obj.city = obj.addressList[1].slice(0,obj.addressList[1].length-1)
												resolve(obj)
										    },
										    function(e) {
												reject(e)
											}
										)
									}
					            },
								fail:() => {
									reject(0)
								}
					        })
				}, 1000)
			})
			// #endif
		}
	}
})

export default store