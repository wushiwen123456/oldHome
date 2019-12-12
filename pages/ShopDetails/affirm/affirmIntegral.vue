<template>
	<view class="contain">
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
			
		<view v-if="cartInfo.length" class=" affirmOrder-main" v-for="(item,index) in cartInfo" :key='index'>
			<view class="flex align-center margin-bottom" @click="goStore(item)">
				<view style="font-size: 40upx;" class="lg cuIcon-shop margin-right-xs"></view>
				<view>客多多官方积分商城店铺</view>
			</view>
			<view>
				<image :src="item.productInfo.image"></image>
				<view class="affirmOrder-main-right">
					<view class="dis-flex flex-jus-space">
						<view class="text-wuer text-sm" >{{item.productInfo.store_name}}</view>
						<view>{{item.productInfo.price}}分</view>
					</view>
					<view class="affirmOrder-main-right-bottom dis-flex flex-jus-space">
						<view>类型：{{!!item.productInfo.attrInfo ? item.productInfo.attrInfo.suk : '暂无'}}</view>
						<view>×1</view>
					</view>
				</view>
			</view>
		
		
			
		</view>
		
		<!-- 循环结束 -->

		<!-- 底部合计 -->
		<view class="affirmOrder-bottom">
			<view class="flex align-center">
				<view >合计:</view>
				<view class="text-red text-xxl">{{Math.round(totalIntegral)}} 积分</view>
			</view>
			<button @tap="submitOrderClick" >立即兑换</button>
		</view>

	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	
	// 导入订单详情和提交订单和收货地址和
	import { payIntegral,gitOrder } from '@/network/affirm.js'
	import { getAddress } from '@/network/getProfileData'
	
	// 调用支付接口
	import { payOrders } from '@/network/affirm'
	
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
				totalIntegral:'',
				shareShow:false,
				Noaddress:false,//是否存在默认地址
				isCard:true,//true用红包  false 不用红包
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
				key:'',
				mark:'',
				orderId:'',
				token:'',
				
			}
		},
		onReady() {
			
		},
		onLoad() {
			
		},
		onShow() {
				this.token = this.$store.getters.isToken// 订单id
				this.cartId = this.$store.state.integralId
				if(!this.cartId){
					uni.showToast({
						title:'未知错误',
						icon:"none",
						success() {
							uni.switchTab({
								url:"../../Home/home"
							})
						}
					})
				}
				else{
					// 获取用户默认收货地址
					this.userAddresss(this.token)
					
					// 获取订单信息				
					this.payIntegral(this.cartId,this.token)
				}
		},
		methods:{
			//获取用户默认地址
			userAddresss(token){
				getAddress(token)
				.then(res => {
					if(res.data.code == 200){
						console.log(res)
						if(res.data.data.length == 0){
							uni.showModal({
								title:'您还没有设置默认地址，快去设置吧',
								cancelColor:"#333333",
								confirmColor:"#333333",
								showCancel:false,
								confirmText:"立即设置",
								success(res) {
									if(res.confirm){
										uni.navigateTo({
											url:"../../My/address/AllAddress"
										})
									}
								}
							})
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
			payIntegral(cartId,token){
				payIntegral(cartId,token)
				.then(res => {
					console.log(res)
					if(res.data.code == 200){
						const arr = res.data.data.cartInfo
						arr.forEach(x => {
							x.productInfo.image = replaceImage(x.productInfo.image)
						})
						
						this.totalIntegral = res.data.data.priceGroup.totalPrice
						this.key = res.data.data.cartId
						this.orderId = res.data.data.orderKey
						this.cartInfo = arr
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

				// 对提交的数据进行处理
				this.dealData()
			},
			dealData(){
				let obj = {}
				obj.addressId = this.address.id
				obj.mark = this.mark || ''
				obj.key = this.orderId
				obj.payType = 'integral'
				
				uni.showModal({
					title:'确定要提交订单么',
					content:'请认真核对您的收货地址,确保地址正确',
					success:(res) => {
						if(res.confirm){
							// 发送提交请求
							gitOrder(obj,this.token).then(res => {
								//对返回的数据进行处理
								if(res.data.code == 200){
									uni.redirectTo({
										url:'Integral_success'
									})
								}else{
									uni.showToast({
										title:res.data.msg,
										icon:'none'
									})
								}
								
								
							})
						}
					}
				})
			}
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
		width: 100%;;
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
		z-index: 998;
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
</style>
