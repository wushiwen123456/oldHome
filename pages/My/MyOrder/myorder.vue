<template>
	<view class="content" :style="{height:height + 'px'}">
		<view>
			<tui-tabs :tabs="tabs2" :currentTab="currentTab"  class="tui-tab" selectedColor="#CD3233" sliderBgColor="#CD3233"  @change="change"></tui-tabs>
			<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption" :top="79">
			<view>
				<view v-for="(vo,key) in orderInfo" :key="key" class="bg-white margin-top-sm">
					<view class="flex align-center padding-left padding-right padding-top-sm padding-bottom-sm s-content">
						<view class="s-item1">
							<view v-if="vo.shopInfo" style="font-size: 36upx;" class="lg cuIcon-shop margin-right-sm"></view>
							<image v-if="vo.pay_type == 'integral'" class="integralShop-title-image" src="../../../static/jifenb.png"></image>
							<view class="text-sm" style="color: #636362;">{{storeName(vo,key)}}</view>
						</view>
						<view class="s-status text-cut" style="width: 180upx;">{{DetlVoStatus(vo)}}</view>
					</view>
					<view v-for="(item,indexKey) in vo.cartInfo" :key="indexKey">
						<view  class="flex align-start margin-left margin-right"	 :class="{'padding-bottom':vo._status._type == 3}" @tap="detail(vo)">
							<view class="mybooking-image">
								<image :src="listImage(item,indexKey)" @tap.stop="detail(vo,key)"></image>
							</view>
							<view class="text-width margin-left-sm ">
								<view class="flex align-center justify-between">
									<view class="flex-five text-hieed" @tap.stop="shopDetail(item,vo)">{{item.productInfo.store_name}}</view>
									<view class="text-price text-red flex-sub text-center">{{item.productInfo.price}}</view>
								</view>
								<view class="flex align-center justify-between margin-top-xs">
									<view class="flex-five text-jiujiujiu text-sm" v-if="item.productInfo.attrInfo">种类：{{item.productInfo.attrInfo.suk}}</view>
									<view class="flex-sub" :class="{'text-right':!item.productInfo.attrInfo}">x{{item.cart_num}}</view>
								</view>
								<view class="flex justify-end pingjia" v-if="vo._status._type == 3">
									<text @tap.stop="goPingjia(item,indexKey)" class="button-r">立即评价</text>
								</view>
							</view>
							
						</view>
						
					</view>
					<view class="flex justify-end padding-left solid-top padding-top padding-bottom padding-right">
						<view class="flex align-center text-df">
							<view class="text-black">共{{vo.cartInfo.length}}件,</view>
							<view class="text-jiujiujiu">合计：</view>
							<view class="text-price text-red text-bold">{{vo.pay_price}}</view>
						</view>
						
					</view>	
					<view class="flex justify-between align-center f-button margin-top-sm item-center">
						<!-- <button class="mybooking-button ">评价</button> -->
						<!-- <view class="mybooking-button mybooking-button-colse" @tap="detail(vo,key)">{{dealBtnLeft(vo)}}</view> -->
						<view class="flex flex-direction">
							<text class="text-red text-sm text-cut" style="margin-bottom:15upx ; width: 280upx;">{{b_status(vo)}}</text>
							<text class="text-red text-sm">{{shopType(vo)}}</text>
						</view>
						<view class="flex">
							<view v-if="dealBtnLeft(vo)" style="margin-right:20upx ;" class="cu-btn round line-black text-cut" @click.stop="btnCliclLeft(vo,key)">{{dealBtnLeft(vo)}}</view>
							<view v-if="dealBtnRight(vo)" @click.stop="btnClickRight(vo,key)" class="cu-btn round line-black text-cut" :class="{'button-r' : vo._status._type == 2 || vo._status._type == 0}">{{dealBtnRight(vo)}}</view>
						</view>
						<!-- <button class="mybooking-button mybooking-button-colse">取消订单</button> -->
						<!-- <button class="mybooking-button ">确认付款</button> -->
						<!-- <button class="mybooking-button mybooking-button-colse">提醒发货</button> -->
					</view>
				</view>
			</view>
			<!-- <view v-if="!Nodata && isLoading" class="empty-img" :style="{height:style.height + 'px',transform:'translateY(-10%)'}">
				<image src="/static/nodatab.png" mode="widthFix"></image>
			</view>
			<view v-if="!isLoading" class="loading">
				<image src="../../../static/logo/logo.png" class="load-img" mode=""></image>
			</view> -->
			</mescroll-uni>
		</view>
		
			<Modal v-model="show1" title='提示' class="con-fim" text='是否确认收货' @confirm="ConfirmOrder" />
			<Modal v-model="show2" title='提示' class="con-fim" text='去评价一下？' @confirm="goPingJia2" />
	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import {userOrder} from '@/network/getProfileData.js'
	import { replaceImage } from '@/utils/dealUrl'
	import {affirmOrder} from '@/network/affirm'
	
	// 导入弹出层
	import Modal from '@/components/x-modal/x-modal'
	// 下拉刷新
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	
	export default{
		components: {
			tuiTabs,
			Modal,
			MescrollUni
		},
		data(){
			return{
				windowHeight:0,//屏幕高度
				currentTab: 0,
				show2:false,
				tabs2: [{
					name: "全部",
					page:0
				}, {
					name: "待付款",
					page:0
				}, {
					name: "待发货",
					page:0
				}, {
					name: "待收货",
					page:0
				}, {
					name: "待评价",
					page:0
				}],
				orderInfo:[],
				show1:false,
				currentClick:-1,
				token:'',
				style:{
					height:''
				},
				height:'',
				// 下拉刷新的常用配置
				downOption: { 
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					textNoMore:'-- 没有更多了 --',
					empty: {
							use : true ,
						  tip : "您还没有相关的订单",
						  btnText : "",
						  fixed: true,
						  top: "35%",
						  zIndex: 99
					}
				},
				hasNext:true
			}
		},
		onLoad(e) {
			
			const view = uni.getSystemInfoSync()
			this.style.height = view.windowHeight;
			var that = this
			let num = parseInt(e.index)
			
			that.currentTab = num
			that.token = that.$store.getters.isToken
			
			if(!this.$store.getters.isToken){
				uni.switchTab({
					url:"../../Home/home"
				})
			}else{
				this.orderInfo = []
			}
			this.height = uni.getSystemInfoSync().windowHeight
			
		},
		onReady() {
		},
		onShow() {

		},
		methods:{
			// 查看详情
			detail(vo,key){
				this.$store.commit('setOrderKey',vo.order_id)
				const status = vo._status._type
				if(status == -1 || status == -2 || status == 6){
					uni.navigateTo({
						url:'../MyBooking/refund/refundMessage'
					})
				}else if(status == 1 && vo._status._title == '拼团中'){
					
					const unified_order = vo.unified_order
					this.$store.commit('setOrderKey',unified_order)
					uni.navigateTo({
						url:'/pages/PayOrder/payOrderMessage/payorderMessage'
					})
				}
				else{
					uni.navigateTo({
						url:'orderdetail'
					})
				}
			},
			// 列表图片
			listImage(item,indexKey){
				return item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image
			},
			// 单个价格
			totalPrice(vo,key){
				return vo.cartInfo[0].productInfo.attrInfo ? vo.cartInfo[0].productInfo.attrInfo.price : vo.cartInfo[0].productInfo.price
			},
			// 店铺名字
			storeName(vo,index){
				if(vo.shopInfo){
					return vo.shopInfo.shop_name
				}else{
					if(vo.pay_type == 'integral'){
						return '客多多官方积分商城'
					}
				}
			},
			// 字段展示
			showText(vo,key){
				const status = vo._status
				switch(status._type){
					case  0:
					return '立即支付'
					case -1:
					return '申请退款中'
				}
			},
			change(e) {
				if(this.currentTab != e.index){
					this.currentTab = e.index
					this.orderInfo = []
					const mescroll = this.$refs.mescroll.mescroll
					mescroll.resetUpScroll()
				}
			},
			userOrder(pageNum,pageSize,mescroll){
				const type = this.currentTab,
				token = this.token
				userOrder(type,pageNum,pageSize,token)
					.then(res => {
						if(res.data.code == 200){
							let list = res.data.data
							if(list.length != 0){
								list.forEach(x => {
									x.cartInfo.forEach(item => {
										const img = item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image
										const img2 = replaceImage(img)
										if(item.productInfo.attrInfo){
											item.productInfo.attrInfo.image = img2
										}else{
											item.productInfo.image = img2
										}
									})
								})
							}
							this.hasNext = list.length >= pageSize
							if(pageNum == 1) this.orderInfo = []
							this.orderInfo = this.orderInfo.concat(list)
							mescroll.endSuccess(list.length, this.hasNext);
							
						}else{
							mescroll.endErr()
						}
					})
			},
			// 下拉刷新方法
			downCallback(mescroll) { 
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.userOrder(pageNum,pageSize,mescroll)
			},
			// 提醒买家发货
			tixing(){
				uni.showToast({
					title:'已提醒买家发货',
					icon:'none'
				})
			},
			affirmClick(vo,key){
				// uni.navigateTo({
				// 	url:'orderdetail'
				// })
				const status = vo._status
				switch(status._type){
					case 0 :
						this.goPay(vo) 
						break
					case -1 :
						this.moneyBack(vo)
						 break
					default :
						return 
				}
			},
			// 去支付
			goPay(item){
				this.$store.commit('setOrderKey',item.order_id)
				uni.navigateTo({
					url:'orderdetail'
				})
			},
				
			// 查看物流
			lookWuliu(){
				uni.navigateTo({
					url:''
				})
			},
			dealBtnLeft(vo){
				const state = parseInt(vo._status._type)
			 	switch(state){
					case -2 : return '查看售后'
					case -1 : return '查看售后'
					case 0 : return  '查看详情'; 
					case 1 : return  '查看详情' ;
					case 2 : return  '查看物流' ;
					case 3 : return  '查看订单' ;
					default: return '查看详情'
				}
				
				//	下面是测试版本
				// 	switch(state){
				// 	case 0 : return  '查看详情'; 
				// 	case 1 : return  '查看物流' ;
				// 	case 2 : return  '查看物流' ;
				// 	case 3 : return  '查看物流' ;
				// }
			},
			dealBtnRight(vo){
				const state = parseInt(vo._status._type)
				switch(state){
					case 0 : return  '立即付款'; 
					case 1 : 
						if(this.shopType(vo) == '拼团商品'){
							return  '我的拼团' ;
						}else{
							return '提醒卖家发货'
						}
						break
					case 2 : return  '确认收货' ;
					case 3 : return  '查看物流' ;
					default :
						if(this.shopType(vo)=='拼团商品'){
							return '我的拼团'
						}
				}
			},
			// 订单上方状态
			DetlVoStatus(vo){
				return vo._status._title
				// return state._title || ''
			},
			// 左按钮点击
			btnCliclLeft(vo,ken){
				const state = parseInt(vo._status._type)
				switch(state){
					case 0 : 
						this.detail(vo) 
						break;
					case 1 :
						this.detail(vo)
						break;
					case 2 :
					// 查看物流
						const id = vo.order_id
						uni.navigateTo({
							url:`../logistics/logistics?id=${id}`
						})
						break;
					case 3 : 
					// 查看订单
						this.detail(vo)
						break;
					default: 
						this.detail(vo)
				}
				
				
				
				// 下面是测试版本
				// switch(state){
				// 	case 0 : 
				// 		this.detail(vo) 
				// 		break;
				// 	case 1 :
				// 		this.lookWuliu()
				// 		break;
				// 	case 2 :
				// 	// 查看物流
				// 		uni.navigateTo({
							
				// 		})
				// 		break;
				// 	case 3 : 
				// 	// 评价页
				// 		uni.navigateTo({
							
				// 		})
				// 		break;
				// }
			},
			goPingJia2(){
				this.change({
					index:4
				})
			},
			// 右按钮点击
			btnClickRight(vo,ken){
				const state = parseInt(vo._status._type)
				switch(state){
					case 0 : 
						// 立即付款
						this.detail(vo) 
						break;
					case 1 :
						if(this.shopType(vo) == '拼团商品'){
							uni.navigateTo({
								url:'../MyBooking/mybooking'
							})
						}else{
							this.tixing(vo)
						}
						break
					case 2 :
					// 确认收货
						this.show1 = true
						this.currentClick = ken
						break;
					case 3 : 
					// 查看物流
						const id = vo.order_id
						uni.navigateTo({
							url:`../logistics/logistics?id=${id}`
						})
						break;
					default :
						if(this.shopType(vo) == '拼团商品'){
							uni.navigateTo({
								url:'../MyBooking/mybooking'
							})
						}
				}
			},
			// 进入商品详情
			shopDetail(item,vo){
				if(item.combination_id){
					this.$store.commit('setcombinId',item.combination_id)
					uni.navigateTo({
						url:"../../ShopDetails/groubBooking"
					})
				}else{
					const id = item.productInfo.id
					uni.navigateTo({
						url:`../../ShopDetails/shopDetails?id=${id}`
					})
				}
				
			},
			ConfirmOrder(){
				const obj = this.orderInfo[this.currentClick]
				affirmOrder(obj.order_id,this.token).then(res => {
					if(res.data.code == 200){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('已收货');	
						// #endif
						this.orderInfo.splice(this.currentClick,1)
						setTimeout(() => {
							this.show2 = true
						},300)
					}else{
						// #ifdef APP-PLUS
						plus.nativeUI.toast(res.data.msg);
						// #endif
					}
				})
			},
			goPingjia(item){
				this.$store.commit('setOrderDetail',item)
				uni.navigateTo({
					url:`evaluate`
				})
			},
			b_status(vo){
				return vo._status._msg || ''
			},
			shopType(vo){
				if(vo.pink_id){
					return '拼团商品'
				}
				if(vo.seckill_id){
					return '秒杀商品'
				}
				if(vo.bargain_id){
					return '砍价商品'
				}
				return '普通商品'
			}
		},
	}
</script>

<style lang="scss">
	page,.content{
		overflow: hidden;
	}
	.f-button{
		padding: 0 15upx 20upx;
		box-shadow: 0 3px 4px rgba(0,0,0,.1);
	}
	.mybooking-image image{
		width: 164upx;
		height: 164upx;
	}
	.button-r{
		border-color:#CD3233 !important;
		color: #CD3233 !important;
	}
	.text-hieed{
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	.start{
		display: flex;
		
	}
	.mybooking-button{
		background: none;
		border-radius:40upx;
		color: $uni-text-color;
		background-color: #fff;
		font-size: 28upx;
		padding:0 20upx ;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10upx 20upx;
		margin-left: 15upx;
		box-sizing: content-box;
	}
	.mybooking-button-colse{
		border:1px solid #666;
		color: #666;
	}
	.s-content{
		box-sizing: border-box;
		justify-content: space-between;
		.s-item1{
			flex: 1;
			display: flex;
		}
	}
	.s-status{
		color: rgb(205,50,51);
		width: 200upx;
		text-align: right;
	}
	.integralShop-title-image{
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}
	.tui-tab{
		z-index: 1;
	}
	.con-fim{
		text-align: center;
	}
	.pingjia{
		color: #666;
		padding: 30upx 0 8upx;
		text{
			padding: 5upx 15upx;
			border:1px solid #666;
			border-radius: 10upx;
		}
	}
</style>
