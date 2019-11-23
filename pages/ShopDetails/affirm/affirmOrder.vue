<template>
	<view>
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
			<view class="dis-flex" v-for="(item2,index2) in item.cartInfo" :key="index2">
				<!-- 商品图片 -->
				<image :src="dealImg(item2.productInfo.image)"></image>
				<view class="affirmOrder-main-right">
					<view class="dis-flex flex-jus-space">
						<!-- 商品名称 -->
						<view class="text-wuer text-sm" >{{item2.productInfo.store_name}}</view>
						<!-- 商品价格 -->
						<view>￥{{item2.productInfo.price}}</view>
					</view>
					<view class="affirmOrder-main-right-bottom dis-flex flex-jus-space">
						<view>类型：{{!!item2.productInfo.attrInfo ? item2.productInfo.attrInfo.suk : '暂无'}}</view>
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
				<input class="text-df" maxlength="-1" v-model="mark" placeholder="选填，请先和客服协商一致" />
			</view>
			<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message">
				<view>优惠券</view>
				<view class="dis-flex flex-item-cent">
					<view @tap="uniPopupClick(item)" :disabled="!!item.usableCoupon" class="affirmOrder-message-youhui">选择优惠券</view>
					<view class="lg cuIcon-right margin-left-sm"></view>
				</view>
			</view>
		</view>
		
		<view>
			<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message">
				<view>可用红包抵用0.1元</view>
				<!-- #ifdef MP-ALIPAY -->
				<switch class='red' @change="IsCard" :class="isCard?'checked':''" :checked="isCard?true:false" color="#CD3233"></switch>
				<!-- #endif -->
				
				<!-- #ifndef MP-ALIPAY -->
				<switch class='red' @change="IsCard" :class="isCard?'checked':''" :checked="isCard?true:false"></switch>
				<!-- #endif -->
				
			</view>
			<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message">
				<view>朋友代付</view>
				<view class="lg cuIcon-right margin-left-sm"></view>
			</view>
		</view>
		</view>
		<!-- 底部合计 -->
		<view class="affirmOrder-bottom">
			<view class="flex align-center">
				<view >合计:</view>
				<view class="text-price text-red text-xxl">{{totalPrice}}</view>
			</view>
			<button @tap="submitOrderClick" >提交订单</button>
		</view>
		
		
		<!-- 优惠券选择 -->
		<uni-popup ref="shareShow" type="bottom">
			<view class="margin-left-xl margin-right-xl">
				<view class="text-center text-three margin-top" style="margin-bottom: 80upx;">店铺优惠</view>
				<!-- 请选择您的优惠券 -->
				<view class="margin-bottom-sm"><text>请选择您的优惠券</text></view>
				<view v-for="(item,index) in disCountList" :key="index" class="flex align-center justify-between shareShow-all">
					<view></view>
					<text>优惠券{{item.title}}</text>
					<view style="font-size: 40upx;"  :class="[item.used?'lg cuIcon-roundcheckfill text-red':'lg cuIcon-round']" @tap="disCountClick(item)"></view>
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
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	
	// 导入账单信息和收货地址
	import { getAffirmInfo } from '@/network/affirm.js'
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
				shareShow:false,
				Noaddress:false,//是否存在默认地址
				mark:'',//买家留言
				isCard:true,//true用红包  false 不用红包
				discountsType:false,//优惠券选择
				count:'',
				cartId:'',
				token:'',
				cartInfo:[],
				address:{},//地址信息
				disCountList:[
					{used:false,title:'xxx店铺'},
					{used:false,title:'xxx店铺'},
					{used:false,title:'xxx店铺'},
					{used:false,title:'xxx店铺'},
					{used:false,title:'xxx店铺'},
					{used:false,title:'xxx店铺'},
					{used:false,title:'xxx店铺'}
				]  //优惠券列表
			}
		},
		onReady() {
			
		},
		onLoad() {
			
		},
		onShow() {
			if(this.isToken){
				if(this.$store.state.cartId == ''){
					uni.showToast({
						title:'未知错误',
						icon:"none",
					})
					uni.switchTab({
						url:"../../Home/home"
					})
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
			//列表详情
			orderMessage(){
				
			},
			//获取当前金额可用优惠券
			getCouponOrder(){
				
			},
			// 选择优惠券
			disCountClick(item){
				item.used = !item.used
			},
			//获取用户默认地址
			userAddresss(token){
				getAddress(token)
				.then(res => {
					if(res.data.code == 200){
						console.log(res)
						if(res.data.data == []){
							uni.showModal({
								title:'您还没有设置默认地址，快去设置吧',
								cancelColor:"#333333",
								confirmColor:"#333333",
								showCancel:false,
								confirmText:"立即设置",
								success(res) {
									if(res.confirm){
										uni.navigateTo({
											url:"../../My/address/addAddress"
										})
									}
								}
							})
						}else{
							this.Noaddress = true
							this.address= res.data.data
							
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
					if(res.data.code == 200){
						this.cartInfo = res.data.data.cartInfo
						console.log(res)
					}else{
						uni.showToast({
							title:'未知错误'
						})
					}
				})
			},
			
			//优惠券选择
			getDiscountClick(key){
				this.discountsType = !this.discountsType
			},
			uniPopupClick(item){
				if(!!item.usableCoupon){
					
				}
				this.$refs.shareShow.open()
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
			//提交订单
			submitOrderClick(){
				// uni.reLaunch({
				// 	url:'../../PayOrder/payOrderMessage/payorderMessage'
				// })
				let data = []
				data.status = this.isCard
				const obj = {}
				// obj.addressId = this.address
				// obj.couponId = this.disCountList.id
				// obj.mark = this.mark
				// obj.combinationId = this.combinationId || ''
				// obj.pinkId = this.pinkId || ''
				// obj.seckill_id = this.seckill_id || ''
				// obj.bargainId = this.bargainId || ''
				// obj.key = this.
			},
			//是用红包
			IsCard(e) {
				this.isCard = e.detail.value
			},
			dealImg(image){
				return replaceImage(image)
			},
			// 获取用户优惠信息
			// getUserDiscount(types,token){
			// 	getUserDiscount(types,token)
			// 	.then(res => {
			// 		if(res.data.code == 200){
			// 			this.disCountList = res.data.data
			// 		}
			// 	})
			// }
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
				return this.cartInfo.reduce((prev,x) => {
					return prev*1 + x.cartInfo.reduce((prev,x) => {
						return prev + x.productInfo.price*x.cart_num
					},0)
				},0).toFixed(2) + '元'
			}
		}
	}
</script>

<style>
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
	}
</style>
