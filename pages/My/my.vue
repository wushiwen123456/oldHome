<template>
	<view>
		<view v-if="mytrue" class="my-title-background">
			<view  class="bg-white  margin-left margin-right my-one-all">
				<view class="flex align-end justify-between margin-left-lg">
					<view class="flex align-center" @click="mySet">
						<image class="my-head-image" :src="avatar"></image>
						<view class="text-xl text-bold margin-left-sm">{{username}}</view>
					</view>
					<view class="my-one-jifen flex align-center justify-center">
						<image src="../../static/jifenw.png"></image>
						<view class="margin-left-xs">红包{{now_money}}</view>
					</view>
				</view>
				<view class="flex align-center justify-around margin-top">
					<view @tap="collectClick" class="flex flex-direction align-center justify-center">
						<view class="margin-bottom-xs text-lg">{{!product_collect ? '0' : shop_collect}}</view>
						<view class="text-sm">商品收藏</view>
					</view>
					<view @tap="attrntionClick" class="flex flex-direction align-center justify-center">
						<view class="margin-bottom-xs text-lg">{{!shop_collect ? '0' : shop_collect}}</view>
						<view class="text-sm">店铺收藏</view>
					</view>
					<view @tap="integralShopCick" class="flex flex-direction align-center justify-center">
						<view class="margin-bottom-xs text-lg">{{integral}}</view>
						<view class="text-sm">积分</view>
					</view>
					<view@tap="footprintClick" class="flex flex-direction align-center justify-center" @click="my_zuji">
						<view class="margin-bottom-xs text-lg">{{visit}}</view>
						<view class="text-sm">我的足迹</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="Nologin">
			<view @tap="loginClick" class="Nologin-button">登录/注册</view>
		</view>
		
		
		<view class="my-two-three-all">
			<view class="bg-white border-all ">
				<view @tap="myOrderClick(0)" class="flex align-center justify-between solid-bottom height-all">
					<view class="text-bold text-lg">我的订单</view>
					<view class="flex align-center">
						<view class="text-jiujiujiu text-sm">查看全部</view>
						<view class="lg text-jiujiujiu cuIcon-right margin-left-xs"></view>
					</view>
				</view>
				<view class="flex align-center justify-around padding-top-lg my-two-bootom">
					<view @tap="myOrderClick(1)" class="flex align-center justify-center flex-direction">
						<image class="my-image-two-all" src="../../static/mytwoa.png"></image>
						<view class="text-sm bg-white">待付款</view>
					</view>
					<view @tap="myOrderClick(2)" class="flex align-center justify-center flex-direction">
						<image class="my-image-two-all" src="../../static/mytwob.png"></image>
						<view class="text-sm bg-white">待发货</view>
					</view>
					<view @tap="myOrderClick(3)" class="flex align-center justify-center flex-direction">
						<image class="my-image-two-all" src="../../static/mytwoc.png"></image>
						<view class="text-sm bg-white">待收货</view>
					</view>
					<view @tap="myOrderClick(4)" class="flex align-center justify-center flex-direction">
						<image class="my-image-two-all" src="../../static/mytwod.png"></image>
						<view class="text-sm bg-white">评价</view>
					</view>
					<view @tap="refundClick" class="flex align-center justify-center flex-direction">
						<image class="my-image-two-all" src="../../static/mytwoe.png"></image>
						<view class="text-sm bg-white">退款/售后</view>
					</view>
				</view>
			</view>
			<view class="bg-white border-all margin-top-xs">
				<view>
					<view class="flex align-center justify-between solid-bottom height-all">
						<view class="text-bold text-lg">我的工具</view>
						<view class="flex align-center">
							<!-- <view class="text-jiujiujiu">查看全部</view>
							<view class="lg text-jiujiujiu cuIcon-right margin-left-xs"></view> -->
						</view>
					</view>
				</view>
				<view class="grid margin-bottom text-center col-4 padding-top-lg">
					<view @tap="discountsClick" class="my-three-all">
						<image src="../../static/mythreea.png"></image>
						<view>优惠券</view>
					</view>
					<view @tap="enterClick" class="my-three-all">
						<image src="../../static/mythreeb.png"></image>
						<view>商家入驻</view>
					</view>
					<view @tap="MybookingClick" class="my-three-all">
						<image src="../../static/mythreec.png"></image>
						<view>我的拼团</view>
					</view>
					<view @tap="addressClick" class="my-three-all">
						<image src="../../static/mythreed.png"></image>
						<view>我的地址</view>
					</view>
					<view @tap="intrgralDetailClick" class="my-three-all">
						<image src="../../static/mythreee.png"></image>
						<view>积分明细</view>
					</view>
					<view @tap="discountscententClick()" class="my-three-all">
						<image src="../../static/mythreef.png"></image>
						<view>领券中心</view>
					</view>
				</view>
				<view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 获取个人信息
	import { getProfileData } from '@/network/getProfileData'
	
	// 导入vuex
	import { mapGetters } from 'vuex'
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	
	// 导入公共类
	import { HOST } from '@/common/const'
	export default{
		data(){
			return{
				mytrue:false,//是否登录
				username:"",
				avatar:"",
				integral:"",
				now_money:"",
				sex:"",
				product_collect:"",
				shop_collect:"",
				visit:""
			}
		},
		onShow() {
			console.log(this.isToken)
			if(this.isToken){
				getProfileData(this.isToken).then(res => {
					const data = res.data
					if(data.code == 400){
						uni.showToast({
							title:'登录失败',
							icon:'none'
						})
					}else if(data.code == 401){
						uni.showToast({
							title:'登录超时',
							icon:'none'
						})
					}else if(data.code == 200){
						console.log(res)
						this.mytrue = true
						this.avatar = replaceImage(data.data.avatar)
						this.username = data.data.nickname
						this.integral = data.data.integral
						this.now_money = data.data.now_money
						this.sex = data.data.sex
						this.product_collect = data.data.product_collect
						this.shop_collect = data.data.shop_collect
						this.visit = data.data.visit
						

						this.$store.commit('setIntegral',this.integral)
						data.data.avatar = replaceImage(data.data.avatar)	
							uni.setStorage({
								key: 'Message_key',
								data: data.data,
								success: function () {
									console.log('个人信息写入缓存成功');
								}
							});
					}
					
				})
			}else{
				this.mytrue = false
			}
		},
		onNavigationBarButtonTap(e){
			console.log("监听到原生标题栏按钮点击事件");
			console.log(e);
			if(e.index == 0){
				//消息
				uni.navigateTo({
					url:'Inform/inform'
				})
			}else{
				//设置
				uni.navigateTo({
					url:'Seeting/seeting'
				})
			}
		},
		methods:{
			//点击登录
			loginClick(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			//商品收藏
			collectClick(){
				uni.navigateTo({
					url:'MyshopMessage/collect'
				})
			},
			//店铺收藏
			attrntionClick(){
				uni.navigateTo({
					url:'MyshopMessage/attention'
				})
			},
			//积分商城
			integralShopCick(){
				uni.navigateTo({
					url:'../Home/Integral/integralShop'
				})
			},
			//优惠券
			discountsClick(){
				uni.navigateTo({
					url:'Discounts/mydiscounts'
				})
			},
			//足迹
						footprintClick(){
							uni.navigateTo({
								url:'Footprint/footprint'
							})
						},
			//我的订单
			myOrderClick(num){
				uni.navigateTo({
					url:'MyOrder/myorder?index=' + num
				})
			},
			//退款
			refundClick(){
				uni.navigateTo({
					url:'MyBooking/refund/refund'
				})
			},
			//我的拼团
			MybookingClick(){
				uni.navigateTo({
					url:'MyBooking/mybooking'
				})
			},
			//商家入驻
			enterClick(){
				uni.navigateTo({
					url:'Enter/enter'
				})
			},
			//我的地址
			addressClick(){
				uni.navigateTo({
					url:'address/AllAddress'
				})
			},
			//积分明细
			intrgralDetailClick(){
				uni.navigateTo({
					url:'../Home/Integral/intrgralDetail'
				})
			},
			//领券中心
			discountscententClick(){
				uni.navigateTo({
					url:'Discounts/DiscpuntsCentent'
				})
			},
			// 我的足迹
			my_zuji(){
				uni.navigateTo({
					url:''
				})
			},
			// 跳转用户设置
			mySet(){
				
				uni.navigateTo({
					url:'Mydata/mydata'
				})
			}
		},
		computed:{
			...mapGetters(['isToken'])
			
		}
		
	}
</script>

<style>
	.my-title-background{
		margin-bottom: 20upx;
		height:280upx;
		background: url(../../static/nologin.png) no-repeat;
		background-size: 100% 50%;
		width: 100%;
	}
	.my-head-image{
		width: 124upx;
		height: 124upx;
		border-radius: 50%;
	}
	.my-one-all{
		border-radius: 14upx;
		padding: 34upx  0 28upx 0;
		color: #686868;
	}
	.my-one-jifen{
		width:169upx;
		height:51upx;
		background:#FBF2F2;
		border-radius:25upx 0upx 0upx 25upx;
		z-index: 1;
		color: #686868;
		font-size: 24upx;
	}
	.my-one-jifen image{
		width:40upx;
		height:40upx;
	}
	.my-two-three-all{
		padding: 10upx 30upx 0 30upx;
	}
	.border-all{
		border-radius: 14upx;
	}
	.height-all{
		height: 80upx;
		padding: 0 38upx;
	}
	.my-image-two-all{
		width: 70upx;
		height: 70upx;
	}
	.my-three-all{
		height: 120upx;
	}
	.my-three-all image{
		width: 60upx;
		height: 60upx;
	}
	.my-two-bootom{
		padding-bottom: 76upx;
	}
	.Nologin{
		height:280upx;
		width: 100%;
		background: url(../../static/nologin.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 80upx;
		padding-left: 200upx;
	}
	.Nologin-button{
		display: flex;
		align-items: center;
		justify-content: center;
		width:238upx;
		height:70upx;
		background:rgba(255,255,255,1);
		border-radius:35upx;
		color: #CD3233;
		font-size: 32upx;
		font-weight: bold;
	}
</style>
