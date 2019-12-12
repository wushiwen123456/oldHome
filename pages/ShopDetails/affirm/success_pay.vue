<template>
	<view id="success_pay">
		<view class="show-banner">
			<image src="../../../static/success_pay/success_pay.png" mode="aspectFit"></image>
		</view>
		<view class="orderInfo">
			<view class="i-people">
				<text class="i-title">收货人:</text>
				<text class="i-name">{{address.real_name}}</text>
				<text class="i-phone">{{address.phone}}</text>
			</view>
			<view class="i-address">
				<text class="i-title">收货地址:</text>
				<text class="i-detail">
					{{address.detail}}
				</text>
			</view>
			<view class="i-payf">
				<text class="i-pay i-title">实付款:</text>
				<text class="i-price">
					 ¥ <text>{{totalPrice}}</text>  
				</text>
			</view>
			<view class="i-buttons">
				<button @click="orderDetail" size="mini" plain>订单详情</button>
				<button @click="goHome" size="mini" plain>返回首页</button>
			</view>
		</view>
		<view class="safe-call m-t">
			<view class="s-title">
				<text>安全提醒</text>
			</view>
			<view>
				<text class="s-text">
					付款成功后，老家不会以付款异常，卡单，系统升级为由联系您。
					<text class="s-hlight">请勿泄露银行卡号，手机验证码，否则会造成钱财损失，谨防电话诈骗</text>
					“查看更多防骗知识” 》 》
					
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				orderId:'',
				address:'',
				totalPrice:''
			};					
		},
		onLoad(option) {
			this.orderId = this.$store.state.orderKey
			this.address = this.$store.state.userInfo.shoppingAddress
			this.totalPrice = option.price
		},
		methods:{
			goHome(){
				uni.switchTab({
					url:'../../Home/home'
				})
			},
			orderDetail(){
				uni.redirectTo({
					url:`../../My/MyOrder/myorder?index=${2}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,#success_pay{
		height: 100%;
		overflow: hidden;
	}
	page{
		background-color: rgb(238,238,238);
	}
	.m-t{
		margin-top: 30upx;
	}
	.show-banner{
		height: 360upx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgb(255,126,0);
		image{
			width: 350upx;
			height: 350upx;
		}
	}
	.orderInfo{
		background-color: #fff;
		padding: 40upx 30upx 20upx;
		color: $uni-text-color;
		font-size: 30upx;
		line-height: 1.8;
		box-shadow: 0 3px 4px rgba(0,0,0,.1);
		.i-phone{
			text-transform: uppercase;
		}
		.i-title{
			font-weight: 600;
			font-size: 32upx;
		}
		text{
			margin-right:14upx;
		}
		.i-address{
			padding-bottom: 20upx;
			border-bottom: 1px solid $uni-border-color;
		}
		.i-payf{
			padding-top: 30upx;
			.i-pay{
				
			}
			.i-price{
				color: rgba(255,126,0,1);
				text{
					font-weight: 700;
					margin-left: 10upx;
					font-size: 32upx;
				}
			}
		}
		.i-buttons{
			display: flex;
			justify-content: space-around;
			padding:20upx 50upx;
		}
	}
	.safe-call{
		box-shadow: 0 0 4px rgba(0,0,0,.2);
		padding: 20upx;
		background-color: #fff;
		line-height: 1.6;
		color: $uni-text-color;
		font-size: 30upx;
		
		.s-title{
			padding: 15upx 0;
			font-weight: 600;
			font-size: 32upx;
		}
	}
</style>
