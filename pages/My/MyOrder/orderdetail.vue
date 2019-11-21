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
		<view v-if="pageType == 2" class="padding-left padding-right bg-white">
			<view class="flex align-center justify-between padding-top-xl padding-bottom-xl solid-bottom">
				<view class="flex align-center">
					<image class="orderdetail-image" src="../../../static/informa.png" ></image>
					<view class="margin-left-sm">
						<view class="flex align-center orderdetail-totleone-text margin-bottom-xs">
							<view class="text-df ">圆通快递</view>
							<view class="margin-left-sm">YT4146131398527</view>
						</view>
						<view>2019/10/24  17:39:00</view>
					</view>
				</view>
				<view class=" flex align-center orderdetail-titleone-right">
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
			<view class="text-width margin-left-sm">
				<view class="flex align-center text-black text-bold margin-bottom-xs">
					<view class="text-three">王女士</view>
					<view class="text-df margin-left-sm">15225162623</view>
				</view>
				<view>河南省郑州市二七区  一马路陇海路欢乐湖童装4楼2街</view>
			</view>
		</view>
		
		
		<view class="bg-white margin-tb-sm">
			<view class="flex align-center padding-left padding-top-sm padding-bottom-sm">
				<view style="font-size: 36upx;" class="lg cuIcon-shop margin-right-sm"></view>
				<view class="text-sm" style="color: #636362;">沃隆旗舰店</view>
			</view>
			<view  class="flex align-start margin-left margin-right">
				<view class="mybooking-image">
					<image src="../../../static/56524a9a3b6bdab0753eb8ed922d57d.png"></image>
				</view>
				<view class="text-width margin-left-sm ">
					<view class="flex align-center justify-between">
						<view class="flex-five text-hieed">沃隆每日坚果750g混合装30包干果零食大礼包混合坚果小包装坚果小包装坚果小包装</view>
						<view class="text-price text-red flex-sub text-center">139</view>
					</view>
					<view class="flex align-center justify-between margin-top-xs">
						<view class="flex-five text-jiujiujiu text-sm">口味：成人款A750g*1盒</view>
						<view class="flex-sub text-center">x1</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="bg-white">
			<view class="margin-lr padding-top-sm padding-bottom-xs text-sm-erliu">
				<view class="flex align-center justify-between orderdetail-line-height">
					<view class=" text-black">商品金额</view>
					<view class="text-jiujiujiu">￥139</view>
				</view>
				<view class="flex align-center justify-between orderdetail-line-height">
					<view class="text-black">运费</view>
					<view class="text-jiujiujiu">￥0</view>
				</view>
				<view class="flex align-center justify-between orderdetail-line-height">
					<view class="text-black">优惠券</view>
					<view class="text-jiujiujiu">-￥10</view>
				</view>
				<view class="flex align-center justify-between orderdetail-line-height">
					<view class="text-black">红包抵扣</view>
					<view class="text-jiujiujiu">-￥0.1</view>
				</view>
			</view>
			<view class="solid-top flex align-center justify-between orderdetail-height">
				<view class="padding-left text-black">实付款</view>
				<view class="padding-right text-red-my text-xl text-price ">128.9</view>
			</view>
		</view>
		
		<view class="bg-white margin-top-sm text-black">
			<view class="margin-lr padding-top-sm padding-bottom-xs text-sm-erliu">
				<view class="orderdetail-line-height">订单备注：无</view>
				<view class="flex align-center justify-between">
					<view class="flex align-center orderdetail-line-height">
						<view>订单编号：</view>
						<view>579327552299·58922</view>
					</view>
					<view class=" flex align-center orderdetail-titleone-right">
						<image src="../../../static/code.png"></image>
						<view>复制</view>
					</view>
				</view>
				<view class="orderdetail-line-height">创建时间：2019/10/23  16:39:58</view>
				<view v-if="pageType != 0" class="orderdetail-line-height">交易时间：2019/10/23  17:39:00</view>
				<view v-if="pageType != 0" class="orderdetail-line-height">支付方式：支付宝</view>
				<view v-if="pageType == 2" class="orderdetail-line-height">交易时间：2019/10/24  17:39:00</view>
			</view>
		</view>
		<view style="height: 300upx;"></view>
		<view class="orderdetail-botom bg-white">
			<button @tap="renfundClick" class="mybooking-button mybooking-button-colse">申请退款</button>
			<button class="mybooking-button">查看物流</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				pageType:1,//页面状态 0等待付款 1代发货 2已发货
			}
		},
		onLoad(e) {
			// this.pageType = e.payimgType
		},
		methods:{
			//申请退款
			renfundClick(){
				uni.navigateTo({
					url:'refund'
				})
			},
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
</style>
