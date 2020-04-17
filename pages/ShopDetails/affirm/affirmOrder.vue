<template>
	<view>
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
		
		<view class="contain" v-if="cartInfo.length">
			<!-- 没有添加收货地址 -->
			<view v-if="!Noaddress" @tap="addAddressClick()" class="affirmOrder-title dis-flex flex-item-cent flex-jus-space">
				<view class="dis-flex flex-item-cent">
					<image class="title-img-ones" src="../../../static/editaddress.png" ></image>
					<view>新增收货地址</view>
				</view>
				<view class="lg text-gray cuIcon-right" ></view>
			</view>
			
			<!-- 存在收货地址 -->
			<view v-if="Noaddress" @tap="shippingAddressClick" class="affirmOrder-titles dis-flex flex-item-cent flex-jus-space">
				<view class="dis-flex flex-item-cent">
					<image class="title-img-one" src="../../../static/address.png"></image>
					<view class="affirmOrder-title-dizhi">
						<view class="affirmOrder-title-nickname">{{address.real_name}}  {{address.phone}}</view>
						<view class="margin-bottom-ml">{{address.province}} {{address.city}}  {{address.district}}</view>
						<view>{{address.detail}}</view>
					</view>
				</view>
				<image class="title-img-two"  ></image>
			</view>
			
			<!-- 购买商品种类 循环开始 -->
				
			
			<view  class=" affirmOrder-main" v-for="(item,index) in cartInfo" :key='index'>
				<view class="flex align-center margin-bottom">
					<view style="font-size: 40upx;" class="lg cuIcon-shop margin-right-xs"></view>
					<!-- 商铺名称 -->
					<view>{{item.shop_info.shop_name}}</view>
				</view>
				<view class="dis-flex margin-top-sm margin-bottom-sm" v-for="(item2,index2) in item.cartInfo" :key="index2">
					<!-- 商品图片 -->
					<image :src="dealImg(item2.productInfo.image)"></image>
					<view class="affirmOrder-main-right">
						<view class="dis-flex flex-jus-space">
							<!-- 商品名称 -->
							<view class="text-wuer text-cut text-sm" >{{item2.productInfo.store_name}}</view>
							<!-- 商品价格 -->
							<view class="text-price text-red">{{productPrice(item2,index2,index)}}</view>
						</view>
						<view class="affirmOrder-main-right-bottom dis-flex flex-jus-space">
							<view class="text-cut" style="width: 500upx;">类型：{{!!item2.productInfo.attrInfo ? item2.productInfo.attrInfo.suk : '暂无'}}</view>
							<view>×{{item2.cart_num}}</view>
						</view>
					</view>
				</view>
			
			
			<view>
				<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message">
					<view>运费</view>
					<view style="color: #959494;">{{post}}</view>
				</view>
				<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message">
					<view>买家留言</view>
					<input class="text-df" maxlength="-1" v-model="item.mark" placeholder="选填，请先和客服协商一致" />
				</view>
				<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message" v-if="isProduct(item)">
					<view>优惠券</view>
					<view class="dis-flex flex-item-cent">
						<view @tap="uniPopupClick(item,index)" class="affirmOrder-message-youhui">{{disCountTitle(item,index)}}</view>
						<view class="lg cuIcon-right margin-left-sm"></view>
					</view>
				</view>
			</view>
			</view>
			
			<!-- 循环结束 -->
			
			<view>
				<view class="cu-form-group" v-if="isShowCard">
					<view>可用红包抵用{{payPaper}}元</view>
					<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				</view>
				<!-- <view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message" @click="shareFirend">
					<view>朋友代付{{comId}}</view>
					<view class="lg cuIcon-right margin-left-sm"></view>
				</view> -->
			</view>
			<!-- 底部合计 -->
			<view class="affirmOrder-bottom">
				<view class="flex align-center">
					<view >合计:</view>
					<view class="text-price text-red text-xxl">{{totalPrice}}</view>
				</view>
				<button @tap="submitOrderClick" >提交订单</button>
			</view>
			
			
			<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message margin-top-sm">
				<view>请选择支付方式</view>
			</view>
			<view class="affirmOrder-main pay-load">
				<radio-group @change="radioChange" style="width: 100%;">
					<view class="pay"><image src="../../../static/paya.png" mode="" style="width: 44px; height: 44px;"></image>微信支付  <radio color="#1ECD16" value="vx" /></view>
					<view class="pay"><image src="../../../static/payb.png" mode="" style="width: 44px; height: 44px;"></image>支付宝支付 <radio value="zfb" /></view>
				 </radio-group>
			</view>
			
			
			<!-- 优惠券选择 -->
			<uni-popup ref="shareShow" type="bottom" class="popup-bottom">
				<view class="margin-left-xl margin-right-xl">
					<view class="text-center text-three margin-top" style="margin-bottom: 80upx;">店铺优惠</view>
					<!-- 请选择您的优惠券 -->
					<view class="margin-bottom-sm"><text>选择优惠券</text></view>
					<view v-if="curDiscountList" v-for="(item,index) in curDiscountList" :key="index" class="flex align-center justify-between shareShow-all">
						<view></view>
						<view class="dscountTitle"><text>{{item.coupon_title}}</text><text class="margin-left">金额{{item.coupon_price}}元 满{{item.use_min_price}}元可用</text></view>
						<view style="font-size: 40upx;"  :class="[item.used?'lg cuIcon-roundcheckfill text-red':'lg cuIcon-round']" @tap="disCountClick(item,index)"></view>
					</view>
					
					<view class="flex align-center justify-between shareShow-all">
						<view></view>
						<view class="text-three">不使用优惠券</view>
						<view style="font-size: 40upx;"  :class="[discountsType?'lg cuIcon-roundcheckfill text-red':'lg cuIcon-round']" @tap="getDiscountClick"></view>
					</view>
					<button @tap="shareShowclose" class="shareShow-button">完成</button>
				</view>
			</uni-popup>
		</view>
		<x-modal v-model="show1" 
					title='提示' 
					text='您还没有设置默认地址,是否前往设置' 
					confirm-text="立即设置" 
					cancel-text="返回"   
					@confirm="setDefaultAddress" 
					@cancel="goBack"/>
		
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	
	// 调用网络接口
	import { getAffirmInfo,placeOrder,payOrders,payorder  } from '@/network/affirm.js'
	import { getAddress } from '@/network/getProfileData'
	
	
	// 导入用户优惠信息
	// import { getUserDiscount } from '@/network/getProfileData.js'
	
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl.js'
	
	// 导入vuex
	import { mapGetters } from 'vuex'
	export default{
		components:{
			uniPopup
		},
		data(){
			return{
				show1:false,
				shareShow:false,
				Noaddress:false,//是否存在默认地址
				isCard:false,//true用红包  false 不用红包
				discountsType:false,//优惠券选择
				count:'',
				cartId:'',
				token:'',
				cartInfo:[],//订单详情
				address:{},//地址信息
				disCountList:[],//优惠券信息
				curDiscountList:[] ,//当前循环
				currentIndex:0,
				currentIndex2:0,
				currentPayVal:'',
				t_price:'',
				pinkInfo:{},
				zfb:{},
				isLoad:false,
				switchA:false,
				payPaper:''
			}
		},
		onReady() {
			this.$refs.loading.open()
		},
		onShow() {
			if(this.isLoad){
				// 获取用户默认收货地址
				this.userAddresss(this.isToken)
			}
		},
		onLoad() {
			this.isLoad = true
			if(Object.keys(this.zfb).length){
				console.log(this.zfb)
			}
			if(this.isToken){
				if(!this.$store.state.cartId.length){
					
					
				}else{
					// 获取用户默认收货地址
					this.userAddresss(this.isToken)
					// 订单id
					this.cartId = this.$store.state.cartId
					// 获取订单信息				
					this.getAffirmInfo(this.cartId,this.isToken)
					// 获取用户优惠券 1表示未使用
					// this.getUserDiscount(1,this.isToken)
				}
				
			}else{
				uni.showToast({
					title:'未知错误',	
					icon:"none",
					
				})
				uni.navigateTo({
					url:"../../login/login"
				})
			}
		},
		methods:{
			// 支付方式选中：
			radioChange(e){
				this.currentPayVal = e.detail.value
				console.log(this.currentPayVal)
			},
			// 商品价格单个
			productPrice(item,index2,index){
				this.$set(item,'totalPrice',item.productInfo.attrInfo ? item.productInfo.attrInfo.price : item.productInfo.price)
				return item.totalPrice
			},
			//列表详情
			orderMessage(){
				
			},
			//获取当前金额可用优惠券
			getCouponOrder(){
				
			},
			disCountListCurr(){
				
			},
			// 选择优惠券
			disCountClick(item,index){
				if(!item.used){
					this.curDiscountList.forEach(x => {
						x.used = false
					})
				}
				item.used = !item.used
				if(this.discountsType){
					this.discountsType = !this.discountsType
				}
				this.currentIndex2 = index
			},
			//获取用户默认地址
			userAddresss(token){
				getAddress(token)
				.then(res => {
					if(res.data.code == 200){
						console.log(res)
						if(res.data.data.length == 0){
							this.show1 = true
							this.Noaddress = false
						}else{
							this.Noaddress = true
							this.address= res.data.data
							this.$store.commit('setShoppingAddress',this.address)
						}
						
							
						
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			
			// 获取订单信息
			getAffirmInfo(cartId,token){
				getAffirmInfo(cartId,token)
				.then(res => {
					this.$refs.loading.close()
					if(res.data.code == 200){
						let obj = res.data.data.cartInfo
						obj.forEach((item,index) => {
							item.mark = ''
							item.usableCoupon.forEach(x => {
								x.used = false
							})
							this.disCountList.push(item.usableCoupon)
							this.t_price = res.data.data.price
						})
						this.cartInfo = obj
						this.payPaper = res.data.data.money
						// 判断是普通商品购买还是拼团
						this.isPink()
						
						
					}else{
						uni.switchTab({
							url:'../../Home/home',
							success() {
								uni.showToast({
									title:'未知错误'
								})
							}
						})
					}
				})
			},
			// 判断订单类型
			isPink(){
				this.pinkInfo = this.$store.state.pinkInfo
					if(this.comId && !this.bargainId && !this.seckillId && !this.pinkId){
							uni.setNavigationBarTitle({
								title:`我要开团`
							})
					}else if(!this.comId && this.bargainId && !this.seckillId && !this.pinkId){
						uni.setNavigationBarTitle({
							title:'砍价促销'
						})
					}else if(!this.comId && !this.bargainId && this.seckillId && !this.pinkId){
						uni.setNavigationBarTitle({
							title:'秒杀促销'
						})
					}else if(this.comId && !this.bargainId && !this.seckillId && this.pinkId ){
						uni.setNavigationBarTitle({
							title:`参加${this.pinkInfo.nickname}的团队`
						})
					}
				
				
			},
			SwitchA(e){
				this.switchA = e.detail.value
			},
			//优惠券全不选
			getDiscountClick(){
				if(!this.discountsType){
					this.disCountList[this.currentIndex].forEach(x => {
						x.used = false
					})
				}
				this.discountsType = true
			},
			// 判断商铺是否有优惠券
			uniPopupClick(item,index){				
				if(item.usableCoupon != null){
					this.currentIndex = index
					this.curDiscountList = this.disCountList[this.currentIndex]
					this.$refs.shareShow.open()
				}else{
					return false
				}
			},
			
			shareShowclose(){
				
				this.$refs.shareShow.close()
			},
			
			
			//收货地址
			shippingAddressClick(){
				uni.navigateTo({
					url:'../../My/address/AllAddress'
				})
			},
			//添加收货地址
			addAddressClick(){
				uni.navigateTo({
					url:'../../My/address/addAddress'
				})
			},
			// 判断是否展示优惠券
			isProduct(item){
				if(item.usableCoupon.length){
					if(this.comId || this.pinkId || this.seckillId || this.bargainId){
						return false
					}else{
						return true
					}
				}else{
					return false
				}
			},
			//提交订单
			submitOrderClick(){
				if(!this.Noaddress){
					this.show1 = true
					return
				}
				// 测试
							
							
							// uni.navigateTo({
							// 	url:'../../PayOrder/payOrderMessage/payorderMessage?cid=1'
							// })
							
				// 对提交的数据进行处理
				this.dealData()
			},
			dealData(){
				if(this.currentPayVal == ''){
					uni.showToast({
						title:'请选择支付方式',
						icon:'none'
					})
					return false
				}
				let obj = {}
				let that = this
				obj.status = this.switchA ? '1':'0' //是否使用红包
				// 计算买家使用的优惠券
				obj.data = this.cartInfo.map((item,index) => { 	
					return {
						key:item.orderKey,
						mark:item.mark || '', //买家备注，一个商铺只有一个
						couponId:this.disCountList[index] ? (this.disCountList[index].filter(x => x.used)[0]?this.disCountList[index].filter(x => x.used)[0].cid:"") : '',	 ////优惠券信息
						addressId : that.address.id || "", //地址id
						bargainId:this.bargainId,
						combinationId:this.comId , //发起拼团id
						seckill_id:this.seckillId,
						pinkId:this.pinkId  // 参团id
					}
				})			
				uni.showModal({
					title:'确定要提交订单么',
					content:'请认真核对您的收货地址,确保地址正确',
					success:(res) => {
						if(res.confirm){
							
							placeOrder(JSON.stringify(obj),this.isToken).then(res => {
								//对返回的数据进行处理
								if(res.data.code == 200)
								{
									console.log(res)
									this.goPay(res)
								}else{
									if(res.data.code == 400){
										if(res.data.data.orderId){
											const orderId = res.data.data.orderId
											uni.showModal({
												title:'请去我的订单中去结算',
												content:'您的订单已经注册过了，请先去结算',
												cancelText:'我再想想',
												confirmText:'现在就去',
												success(res) {
													if(res.confirm){
														that.$store.commit('setOrderKey',orderId)
														uni.redirectTo({
															url:'../../My/MyOrder/orderdetail'
														})
													}else{
														uni.navigateBack({
															
														})
													}
												}
											})
										}else{
											// #ifdef APP-PLUS
											plus.nativeUI.toast(res.data.msg)
											// #endif
										}
									}
									
								}
								
								
							})
						}
					}
				})
			},
			
			
			// 朋友代付
			shareFirend(){
				uni.showToast({
					title:'暂未实现',
					icon:"none"
				})
			},
			// 返回商品详情
			goBack(){
				
			},
			// 设置默认地址
			setDefaultAddress(){
				uni.navigateTo({
					url:'../../My/address/AllAddress'
				})
			},
			dealImg(image){
				return replaceImage(image)
			},
			disCountTitle(item,index){
			 if(item.usableCoupon.length){
				 if(this.disCountList[index][this.currentIndex2].used){
					 return this.disCountList[index][this.currentIndex2].coupon_title
				 }else{
					 return '不使用优惠券'
				 }
			 }else{
				 return ''
			 }
			},
			// 发起支付
			goPay(res){
				// 判断提交方法
				if(this.comId || this.bargainId || this.seckillId || this.pinkId){
					this.otherPay(res)
				}else{
					this.pay(res)
				}
				
			},
			// 多订单支付
			pay(res){
				const {unified_order,price} = res.data.data
				const that = this		
				const method = this.currentPayVal == 'vx' ? 'weixin' : 'alipay'
				// 调用多商品支付微信接口
				payOrders(unified_order,method,this.isToken)
				.then(res => {
					if(res.data.code == 200){
						if(method == 'weixin'){
							that.weixinPay(res.data.data,unified_order,price)
						}else{
							that.zfbPay(res.data.data,unified_order,price)
						}
						
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})	
			},
			// 但订单支付
			otherPay(res){
				const {unified_order,price} = res.data.data
				const that = this		
				const method = this.currentPayVal == 'vx' ? 'weixin' : 'alipay'
				// 调用单商品支付微信接口 
				payorder(unified_order,method,this.isToken)
				.then(res => {
					if(res.data.code == 200){
						if(method == 'weixin'){
							that.weixinPay(res.data.data,unified_order,price)
						}else{
							that.zfbPay(res.data.data,unified_order,price)
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})
				
			},
			
			// 微信发起支付
			weixinPay(data,unified_order,price){
				const that = this	
				uni.requestPayment({
					provider:"wxpay",
					orderInfo:data,
					service:3,
					success:(res)=> {
						if(res.channel.serviceReady){							
							if(that.comId || that.pinkId){
								that.doPink(unified_order,price)
							}else{
								this.$store.commit('setOrderKey',unified_order)
								this.goDetail(price)
							}
						}else{
							uni.navigateBack()
						}
					},
					fail() {
						uni.navigateBack()
					}
				})
			},
			// 支付宝发起支付
			zfbPay(data,unified_order,price){
				const that = this
				uni.requestPayment({
					provider:"alipay",
					orderInfo:data.alipay,
					service:4,
					success:(res)=> {
						if(res.channel.serviceReady){	
							if(that.comId || that.pinkId){
								that.doPink(unified_order,price)
							}else{
								this.$store.commit('setOrderKey',unified_order)
								this.goDetail(price)
							}
						}else{
							uni.navigateBack({
								
							})
						}
						this.zfb = res
					},
					fail() {
						uni.navigateBack()
					}
				})
			},
			// 跳转页面
			goDetail(price){
				console.log(price)
				uni.redirectTo({
					url:`success_pay?price=${price}`
				})
			},
			doPink(unified_order,price){
				
				// 保存订单id
				this.$store.commit('setOrderKey',unified_order)
				uni.redirectTo({
					url:`../../PayOrder/payOrderMessage/payorderMessage?price=${price}`
				})
			}
			
		},
		computed:{
			// 判断用户token
			...mapGetters(['isToken']),
			
			// 判断是否包邮
			post(){
				return this.cartInfo.reduce((prev,x) => {
					return prev*1 + x.cartInfo.reduce((prev,x) => {
						return (prev + x.productInfo.postage)*1
					},0)
				},0).toFixed(2) + '元'
			},
			//总价 
			totalPrice(){
				if(this.t_price){
					// 根据是否有优惠信息计算总价格
					if(this.disCountList.length){
						return this.disCountList.reduce((c,d) => {
							return c-d.filter(x => x.used).reduce((a,x) => a*1 + x.coupon_price*1,0)
						},this.t_price).toFixed(2) + '元'
					}else{
						return this.t_price.toFixed(2) + '元'
					}
				}
			},
			comId(){
				return this.cartInfo[0] ? (this.cartInfo[0].cartInfo[0].combination_id ? this.cartInfo[0].cartInfo[0].combination_id : '')  : ''
			},
			bargainId(){
				return this.cartInfo[0] ? (this.cartInfo[0].cartInfo[0].bargain_id ? this.cartInfo[0].cartInfo[0].bargain_id : '')  : ''
			},
			seckillId(){
				return this.cartInfo[0] ? (this.cartInfo[0].seckill_id ? this.cartInfo[0].seckill_id : '')  : ''
			},
			pinkId(){
				return Object.keys(this.pinkInfo).length ? this.pinkInfo.id : ''
			},
			isShowCard(){
				if(this.cartInfo.length){
					return this.cartInfo.length == 1 && this.pinkId == '' && this.comId == '' && this.bargainId == '' && this.seckillId == ''
				}
			},
			
			
		}
	}
</script>

<style scoped>
	page{
		margin-bottom: 44px;
	}
	.pay-load{
		height: 450upx;
	}
	.pay{
		height: 44px;
		line-height: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
		margin-bottom: 20upx;
	}
	.dis-flex{
		display: flex;
	}
	.flex-jus-space{
		justify-content: space-between;
	}
	.flex-item-cent{
		align-items: center;
	}
	.affirmOrder-title{
		margin: 10upx 0;
		padding: 0 24upx;
		background: #FFFFFF;
		font-size: 30upx;
		color: #333333;
		height: 136upx;
	}
	.affirmOrder-titles{
		margin: 20upx 0;
		padding: 20upx 24upx;
		background: #FFFFFF;
		font-size: 30upx;
		color: #333333;
	}
	.title-img-one{
		margin-right: 18upx;
		width: 70upx;
		height: 70upx;
	}
	.title-img-ones{
		margin-right: 18upx;
		width: 68upx;
		height: 68upx;
	}
	.title-img-two{
		margin-left: 20upx;
		width: 14upx;
		height: 26upx;
	}
	.affirmOrder-main{
		background: #FFFFFF;
		padding: 30upx 24upx;
		
	}
	.affirmOrder-main image{
		width: 140upx;
		height: 140upx;
	}
	.affirmOrder-main-right{
		padding-bottom: 30upx;
		margin-left: 40upx;
		width: 520upx;
		font-size: 30upx;
	}
	.affirmOrder-main-right-bottom{
		margin-top: 20upx;
		color: #959494;
		font-size: 24upx;
	}
	.affirmOrder-message{
		padding: 0 24upx;
		background: #FFFFFF;
		height: 100upx;
		border-bottom: #f3f3f3 2upx solid;
	}
	.affirmOrder-message:nth-child(1){
		margin-top: 10upx;
	}
	.affirmOrder-message input{
		width: 440upx;
		text-align: right;
	}
	.affirmOrder-message-youhui{
		color: #CD3233;
		font-size: 26upx;
	}
	.affirmOrder-bottom{
		width: 100%;
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
		height: 104upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		z-index: 1;
	}
	.affirmOrder-bottom button{
		width: 236upx;
		height: 80upx;
		margin: 0;
		margin-right: 24upx;
		font-size: 32upx;
		background:rgba(205,50,51,1);
		border-radius: 40upx;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.affirmOrder-title-dizhi{
		color: #666666;
		font-size: 26upx;
		max-width: 500upx;
		display: flex;
		flex-direction: column;
	}
	.affirmOrder-title-nickname{
		font-size: 30upx;
		color: #000000;
		margin-bottom:8upx;
	}
	.shareShow-all{
		height: 80upx;
	}
	.shareShow-button{
		background: #CD3233;
		color: #FFFFFF;
		margin-top: 80upx;
		border-radius: 50upx;
		margin-bottom: 20upx;
		position: relative;
	}
	.dscountTitle{
		display: flex;
		justify-content: space-between;
		width: 90%;
	}
	.popup-bottom{
		z-index: 999;
	}
</style>
