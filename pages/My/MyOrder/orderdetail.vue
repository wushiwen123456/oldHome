<template>
	<view>
		<!-- 代付款 -->
		<view v-if="pageType == 0" class="orderdetail-all-background orderdetail-background-one text-white">
			<view class="text-lg margin-bottom-xs">等待买家付款</view>
			<view class="text-sm">剩23小时19分自动关闭</view>
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
		<!-- 快递 -->
		<view v-if="pageType == 2">
			<view>
				<view>
					<image ></image>
					<view>
						<view>
							<view>圆通快递</view>
							<view>YT4146131398527</view>
						</view>
						<view>2019/10/24  17:39:00</view>
					</view>
				</view>
				<view>
					<image ></image>
					<view></view>
				</view>
			</view>
		</view>
		<!-- 收货地址 -->
		<view></view>
		
		
		
		<view></view>
		
		<view></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				pageType:2,//页面状态 0等待付款 1代发货 2已发货
			}
		},
		onLoad(e) {
			// this.pageType = e.payimgType
		},
		methods:{
			
		}
	}
</script>

<style>
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
</style>
