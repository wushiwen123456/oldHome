<template>
	<view>
		<view v-if="Object.keys(this.detailData).length != 0">
			
			<!-- 代付款 -->
			<view v-if="pageType == 0" class="orderdetail-all-background orderdetail-background-one text-white">
				<view class="text-lg margin-bottom-xs">等待买家付款</view>
				<view class="text-sm">{{detailData._status._msg}}</view>
			</view>
			<!-- 代发货 -->
			<view v-if="pageType == 1" class="orderdetail-all-background orderdetail-background-two text-white">
				<view class="text-lg margin-bottom-xs">待发货</view>
				<view class="text-sm">72小时内发货</view>
			</view>
			<!-- 已发货 -->
			<view v-if="pageType == 2" class="orderdetail-all-background orderdetail-background-three text-white">
				<view class="text-lg margin-bottom-xs">卖家已发货</view>
				<view class="text-sm">还剩4天3时自动确认</view>
			</view>
			<!-- 待评价 -->
			<view v-if="pageType == 3" class="orderdetail-all-background orderdetail-background-two text-white">
				<view class="text-lg margin-bottom-xs">待评价</view>
			</view>
			<!-- 交易成功 -->
			<view v-if="pageType == 4" class="orderdetail-all-background orderdetail-background-three text-white">
				<view class="text-lg margin-bottom-xs">交易成功</view>
				<!-- <view class="text-sm">还剩4天3时自动确认</view> -->
			</view>
			
			
			<!-- 快递 -->
			<view v-if="pageType == 2" @click="goWuliu" class="padding-left padding-right bg-white">
				<view class="flex align-center justify-between padding-top-xl padding-bottom-xl solid-bottom">
					<view class="flex align-center">
						<image class="orderdetail-image" src="../../../static/informa.png" ></image>
						<view class="margin-left-sm">
							<view class="flex align-center orderdetail-totleone-text margin-bottom-xs">
								<view class="text-df ">{{detailData.delivery_name}}</view>
								<view class="margin-left-sm">{{detailData.delivery_id}}</view>
							</view>
							<!-- <view>2019/10/24  17:39:00</view> -->
						</view>
					</view>
					<view class=" flex align-center orderdetail-titleone-right" @tap.stop="copyOrder('t')">
						<image src="../../../static/code.png"></image>
						<view>复制</view>
					</view>
				</view>
			</view>
			<!-- 收货地址 -->
			<view class="flex align-center bg-white padding-lr padding-tb-sm ">
				<view >
					<image class="orderdetail-image" src="../../../static/address.png"></image>
				</view>
				<view class="address_ad margin-left-sm">
					<view class="flex align-center text-black text-bold margin-bottom-xs">
						<view class="text-three">{{detailData.real_name}}</view>
						<view class="text-df margin-left-sm">{{detailData.user_phone}}</view>
					</view>
					<view class="text-cut">{{detailData.user_address}}</view>
				</view>
			</view>
			
			
			<view class="bg-white margin-tb-sm">
				<view class="flex align-center padding-left padding-top-sm padding-bottom-sm" @click.stop="goInfoStore(detailData)">
					<view style="font-size: 36upx;" class="lg cuIcon-shop margin-right-sm"></view>
					<view class="text-sm" style="color: #636362;" >{{detailData.shopInfo ? detailData.shopInfo.shop_name : ''}}</view>
				</view>
				<view @click="goInfoDetail(item,index)" class="flex align-start margin-left margin-right"  v-if="Object.keys(detailData).length" v-for="(item,index) in detailData.cartInfo" :key="index">
					<view class="mybooking-image" v-if="item.productInfo">
						<image :src="item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image"></image>
					</view>
					<view class="text-width margin-left-sm ">
						<view class="flex align-center justify-between">
							<view class="flex-five text-hieed">{{item.productInfo.store_name}}</view>
							<view class="text-price text-red flex-sub text-center">{{item.productInfo.attrInfo ? item.productInfo.attrInfo.price : item.productInfo.price}}</view>
						</view>
						<view class="flex align-center justify-between margin-top-xs">
							<view class="flex-five text-jiujiujiu text-sm">规格:{{item.productInfo.attrInfo ? item.productInfo.attrInfo.suk : '默认类型'}}</view>
							<view class="flex-sub text-center">x{{detailData.total_num}}</view>
						</view>
						<view v-if="dealTuikuan(item)" @click.stop="tuikuan(item)" class="flex align-center justify-end margin-top margin-bottom">
							<view class="tuikuan" style="margin-right: 20upx;">退款</view>
							<view v-if="pageType == 3"  @click.stop="goPingJia(item)" class="tuikuan pingjia">去评价</view>
						</view>
					</view>
				</view>
			</view>
			
			
			
			<view class="bg-white">
				<view class="margin-lr padding-top-sm padding-bottom-xs text-sm-erliu">
					<view class="flex align-center justify-between orderdetail-line-height">
						<view class=" text-black">商品金额</view>
						<view class="text-jiujiujiu">￥{{detailData.total_price}}</view>
					</view>
					<view class="flex align-center justify-between orderdetail-line-height">
						<view class="text-black">运费</view>
						<view class="text-jiujiujiu">￥{{detailData.pay_postage}}</view>
					</view>
					<view class="flex align-center justify-between orderdetail-line-height">
						<view class="text-black">优惠券</view>
						<view class="text-jiujiujiu">{{parseInt(detailData.coupon_price) == 0 ? '未使用优惠券' : '-￥' + detailData.coupon_price}}</view>
					</view>
					<view class="flex align-center justify-between orderdetail-line-height">
						<view class="text-black">红包抵扣</view>
						<view class="text-jiujiujiu">未使用红包	</view>
					</view>
				</view>
				<view class="solid-top flex align-center justify-between orderdetail-height">
					<view class="padding-left text-black">实付款</view>
					<view class="padding-right text-red-my text-xl text-price ">{{detailData.pay_price}}</view>
				</view>
				<view class="solid-top flex align-center justify-around orderdetail-height">
					<view class="ord-tab" v-if="pageType == 2" @tap="lookWuliu" ><text class="cuIcon-deliver margin-right-sm" v-if=""></text>查看物流</view>
					<view class="ord-tab" @tap="goChat"><text class="cuIcon-comment margin-right-sm"></text>联系卖家</view>
				</view>
			</view>
			
			<view class="bg-white margin-top-sm text-black" ref='order'>
				<view class="margin-lr padding-top-sm padding-bottom-xs text-sm-erliu">
					<view class="orderdetail-line-height">订单备注：{{detailData.mark == '' ? '无' : detailData.mark}}</view>
					<view class="flex align-center justify-between">
						<view class="flex align-center orderdetail-line-height">
							<view>订单编号：</view>
							<view>{{detailData.order_id}}</view>
						</view>
						<view class=" flex align-center orderdetail-titleone-right" @click="copyOrder('p')">
							<image src="../../../static/code.png"></image>
							<view>复制</view>
						</view>
					</view>
					<view class="orderdetail-line-height">创建时间：{{ dealAddtime }}</view>
					<view v-if="pageType != 0" class="orderdetail-line-height">交易时间：{{detailData._pay_time}}</view>
					<view v-if="pageType != 0" class="orderdetail-line-height">支付方式：{{detailData.pay_type == 'weixin' ? '微信支付' : '支付宝支付'}}</view>
					<view v-if="pageType == 2" class="orderdetail-line-height">交易时间：2019/10/24  17:39:00</view>
				</view>
				<!-- 选择支付方式 -->
				<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message margin-top-sm" v-if="pageType == 0">
					<view>请选择支付方式</view>
				</view>
				<view class="affirmOrder-main" v-if="pageType == 0">
					<radio-group @change="closePopupsSharClick" style="width: 100%;">
						<view class="pay"><image src="../../../static/paya.png" mode="" style="width: 44px; height: 44px;"></image>微信支付  <radio color="#1ECD16" value="vx" /></view>
						<view class="pay"><image src="../../../static/payb.png" mode="" style="width: 44px; height: 44px;"></image>支付宝支付 <radio value="zfb" /></view>
					 </radio-group>
				</view>
			</view>
			<view style="height: 300upx;" v-if="pageType == 0"></view>
			<view class="orderdetail-botom bg-white" v-if="pageType == 0">
				<button @tap="renfundClick" class="mybooking-button mybooking-button-colse">{{stateTextLeft}}</button>
				<button @tap="rightClick" class="mybooking-button">{{stateTextRight}}</button>
			</view>
			
			
			
		</view>
		<x-modal v-model="show2" title='提示' text='是否删除订单' @confirm="removeOrder" />
	</view>
</template>

<script>
	import { replaceImage } from '@/utils/dealUrl'
	import { payorder,cancelOrder } from '@/network/affirm'
	
	import uniPopup  from "@/components/uni-popup/uni-popup"
	
	// 导入工具类
	import { formatDate } from '@/utils/dealData'
	
	export default{
		data(){
			return{
				pageType:1,//页面状态 0等待付款 1代发货 2已发货
				show2:false,
				detailData:{},
				payFun:[
					{
						name:'微信',
						key:'weixin',
						
					},
					{
						name:'支付宝',
						key:'apay',
						
					},
				],
				payMethod:''
			}
		},
		onLoad() {
			const id = this.$store.state.orderKey
			,token = this.$store.getters.isToken
			if(!id){
				uni.switchTab({
					url:'../../Home/home'
				})
				return 
			}
			else if(!token){
				uni.navigateTo({
					url:'../../login/login'
				})
				return 
			}
			else{
				 this.$store.dispatch('detailOrder')
				 	.then(res => {
				 		if(res.data.code == 200){
							this.dealRes(res)
						}else{
							// #ifdef APP-PLUS
							plus.nativeUI.toast(res.data.msg,{duration:'long'})
							// #endif
						}
				 	})
			}
			
			
		},
		methods:{
			// 立即支付
			rightClick(){
				this.showModel()
			},
			// 选择支付方式
			closePopupsSharClick(e){
				this.payMethod = e.detail.value
			},
			// 查看物流
			lookWuliu(){
				const id = this.detailData.order_id
				uni.navigateTo({
					url:`/pages/My/logistics/logistics?id=${id}`
				})
			},
			showModel(){

				if(this.payMethod){

					if(this.payMethod == 'vx'){
										
						payorder(this.detailData.unified_order,'weixin',this.$store.getters.isToken)
						.then(res => {	
							const price = this.detailData.pay_price
							if(res.data.code == 200){
								const obj = res.data.data
								// 发起微信支付
								uni.requestPayment({
									provider:"wxpay",
									orderInfo:obj,
									success:(res)=> {
										console.log(res)
										if(res.channel.serviceReady){
											if(this.detailData.combination_id  || this.detailData.pink_id){
												uni.redirectTo({
													url:'../../PayOrder/payOrderMessage/payorderMessage'
												})
											}else{
												this.$store.commit('setOrderKey',this.detailData.unified_order)
												const obj = {
													real_name:this.detailData.real_name,
													phone:this.detailData.user_phone,
													detail:this.detailData.user_address
												}
												this.$store.commit('setShoppingAddress',obj)
												uni.redirectTo({
													url:`../../ShopDetails/affirm/success_pay?price=${price}`
												})
											}
										}
									}
								})
							}
							
							
						})
					}else if(this.payMethod == 'zfb'){
						payorder(this.detailData.unified_order,'alipay',this.$store.getters.isToken).then(res => {
							if(res.data.code == 200){
								const obj = res.data.data
								// 发起微信支付
								uni.requestPayment({
									provider:"alipay",
									orderInfo:obj,
									success:(res)=> {
										console.log(res)
										if(this.detailData.combination_id  || this.detailData.pink_id){
											uni.redirectTo({
												url:'../../PayOrder/payOrderMessage/payorderMessage'
											})
										}else{
											this.$store.commit('setOrderKey',this.detailData.unified_order)
											const obj = {
												real_name:this.detailData.real_name,
												phone:this.detailData.user_phone,
												detail:this.detailData.user_address
											}
											this.$store.commit('setShoppingAddress',obj)
											uni.redirectTo({
												url:`../../ShopDetails/affirm/success_pay?price=${price}`
											})
										}
									},
									fail:err => {
										uni.showToast({
											title:'支付失败,请检查您的网络...'
										})
									}
								})
							}
						})
						// console.log('----------')
					}
				}else{
					uni.showToast({
						title:'请选择支付方式',
						icon:'none'
					})
				}
			},
			// 确认收货接口
			goQueren(){
				const order_id = this.detailData.order_id,token = this.token
				affirmOrder(order_id,token).then(res => {
					if(res.data.code == 200){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('已收货');	
						// #endif
						this.orderInfo.splice(this.currentClick,1)
					}else{
						// #ifdef APP-PLUS
						plus.nativeUI.toast(res.data.msg);
						// #endif
					}
				})
			},
			// 复制订单
			copyOrder(e){
				// 如果是复制的订单
				if(e == 'p'){
					const orderId = this.detailData.order_id
					uni.setClipboardData({
						data:orderId
					})
				}else{
					const  id = this.detailData.delivery_id
					uni.setClipboardData({
						data:id
					})
				}
				
			},
			// 去评价
			goPingJia(item){
				this.$store.commit('setOrderDetail',item)
				uni.navigateTo({
					url:'evaluate'
				})
			},
			// 立即付款
			payNow(paytype){
				payorder(this.detailData.unified_order,paytype,this.isToken)
			},
			isProduct(){
				
			},
			common(){
				
			},
			// 是否显示退款
			dealTuikuan(item){
				if(item.combination_id || item.seckill_id || item.bargain_id){
					return false
				}else{
					if(this.pageType == 1 || this.pageType == 3 || this.pageType == 4){
						return true
					}else{
						return false
					}
				}
			},
			// 处理res
			dealRes(res){
				const data = res.data.data
				this.pageType = data._status._type
				// 对商品图片进行处理
				data.cartInfo.forEach(x => {
					if(x.productInfo.attrInfo){
						x.productInfo.attrInfo.image = replaceImage(x.productInfo.attrInfo.image)
					}
					const obj = replaceImage(x.productInfo.image)
					x.productInfo.image = obj
					
				})
				this.detailData = data
			},
			// 退款退货
			tuikuan(item){
				item.phone = this.detailData.user_phone
				const id = this.detailData.order_id
				this.$store.commit('setProductInfo',item)
				uni.navigateTo({
					url:`refund?id=${id}`
				})
			},
			// 进入商铺
			goInfoStore(detailData){
				const storeId = detailData.shop_id
				uni.navigateTo({
					url:`../../ShopDetails/StoreDetails/storedetails?id=${storeId}`
				})
			},
			// 进入商品详情页
			goInfoDetail(item,index){
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
			// 聊天
			goChat(){
				
				const obj = this.detailData.shopInfo
				uni.navigateTo({
					url:'/pages/ShopDetails/informtion/informtion?id=' + obj.shop_id
				})
			},
			//取消订单
			renfundClick(){
				this.show2 = true
			},
			// 删除订单
			removeOrder(){
				cancelOrder(this.detailData.order_id,this.$store.getters.isToken)
					.then(res => {
						if(res.data.code == 200){
							uni.showToast({
								title:'取消订单成功',
								icon:'none'
							})
							uni.navigateBack()
						}
				})
			},
			goWuliu(){
				const id = this.detailData.order_id
				uni.navigateTo({
					url:`../logistics/logistics?id=${id}`
				})
			}
		},
		
		computed:{
			stateTextLeft(){
				switch(this.pageType){
					case -1: return '查看退货进度'
					case 0 : return '取消订单'
					case 1 : return '我要退款'
					case 2 : return '查看物流'
				}
			},
			stateTextRight(){
				switch(this.pageType){
					case -1: return '取消退货'
					case 0 : return '立即付款'
					case 1 : return '提醒发货'
					case 2 : return '确认收货'
				}
			},
			dealAddtime(){
				if(this.detailData._add_time){
					const time = new Date(this.detailData._add_time*1000)
					return formatDate(time,"yyyy-MM-dd hh:mm:ss")
				
				}else{
					return ''
				}
			}
		},
		
	}
</script>

<style scoped lang="scss">
	.pay{
		height: 44px;
		line-height: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
		margin-bottom: 20upx;
	}
	.affirmOrder-main{
		background: #FFFFFF;
		padding: 30upx 24upx;
	}
	.affirmOrder-main image{
		width: 140upx;
		height: 140upx;
	}
	.orderdetail-all-background{
		width: 100%;
		height: 200upx;
		padding-top: 50upx;
		padding-left: 40upx;
	}
	.orderdetail-background-one{
		background: url(../../../static/fukuanga.png);
		background-size: 100% 100%;
	}
	.orderdetail-background-two{
		background: url(../../../static/fukuangb.png);
		background-size: 100% 100%;
	}
	.orderdetail-background-three{
		background: url(../../../static/fukuangc.png);
		background-size: 100% 100%;
	}
	.orderdetail-image{
		height: 68upx;
		width: 68upx;
	}
	.orderdetail-titleone-right{
		color: #CD3233;
	}
	.orderdetail-titleone-right image{
		height: 26upx;
		width: 26upx;
		margin-right: 10upx;
	}
	.orderdetail-totleone-text{
		color: #1E8FE5;
		font-weight: bold;
	}
	.mybooking-image image{
		width: 164upx;
		height: 164upx;
	}
	.orderdetail-line-height{
		line-height: 50upx;
	}
	.orderdetail-height{
		height: 80upx;
	}
	.orderdetail-botom{
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		bottom: 0;
		height: 100upx;
		width: 100%;
	}
	.mybooking-button{
		width:180upx;
		height:60upx;
		line-height: 60upx;
		background: none;
		border:1px solid rgba(205,50,51,1);
		border-radius:40upx;
		color: #CD3233;
		font-size: 28upx;
		margin: 0;
		margin-right: 30upx;
	}
	.mybooking-button-colse{
		border:1px solid rgba(153,153,153,1);
		color: rgba(153,153,153,1);
	}
	.tuikuan{
		color: #666;
		padding: 5upx 15upx;
		border-radius: 5px;
		font-size: 28upx;
		border: 1px solid #666;
	}
	.padding-top{
		padding-top: 6upx !important;
	}
	.padding-top-sm{
		padding-top: 6upx !important;
	}
	.address_ad{
		width: 588upx;
	}
	.ord-tab{
		font-size: 30upx;
		text{
			color: #CD3233;
			font-weight: 700;
		}
	}
	.pingjia{
		border-color:#CD3233 !important;
		color: #CD3233 !important;
	}
</style>
