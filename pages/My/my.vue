<template>
	<view>
		<view class="my-title-background">
			<view class="bg-white  margin-left margin-right my-one-all">
				<view class="flex align-end justify-between margin-left-lg">
					<view class="flex align-center">
						<image class="my-head-image" src="../../static/头像2.png"></image>
						<view class="text-xl text-bold margin-left-sm">我们de地方</view>
					</view>
					<view class="my-one-jifen flex align-center justify-center">
						<image src="../../static/jifenw.png"></image>
						<view class="margin-left-xs">红包100</view>
					</view>
				</view>
				<view class="flex align-center justify-around margin-top">
					<view @tap="collectClick" class="flex flex-direction align-center justify-center">
						<view class="margin-bottom-xs text-lg">699</view>
						<view class="text-sm">商品收藏</view>
					</view>
					<view @tap="attrntionClick" class="flex flex-direction align-center justify-center">
						<view class="margin-bottom-xs text-lg">48</view>
						<view class="text-sm">店铺收藏</view>
					</view>
					<view @tap="integralShopCick" class="flex flex-direction align-center justify-center">
						<view class="margin-bottom-xs text-lg">42</view>
						<view class="text-sm">积分</view>
					</view>
					<view class="flex flex-direction align-center justify-center">
						<view class="margin-bottom-xs text-lg">89</view>
						<view class="text-sm">我的足迹</view>
					</view>
				</view>
			</view>
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
	export default{
		data(){
			return{
				
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
			}
		}
	}
</script>

<style>
	.my-title-background{
		height:156upx;
		background:rgba(205,50,51,1);
		position: absolute;
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
		padding: 310upx 30upx 0 30upx;
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
</style>
