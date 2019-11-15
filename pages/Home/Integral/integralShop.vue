<template>
	<view>
		<view class="integralShop-title"></view>
		<view class="flex align-center">
			<view @tap="integralShopDetailClick" class="flex-sub flex align-center justify-center integralShop-title-left">
				<image class="integralShop-title-image" src="../../../static/jifenb.png"></image>
				<view class="text-wuer text-lg text-bold">积分<text class="text-red">100</text></view>
			</view>
			<view @tap="recordListClcikc" class="flex-sub flex align-center justify-center integralShop-title-right">
				<image class="integralShop-title-image" src="../../../static/jifenc.png"></image>
				<view class="text-wuer text-lg text-bold">兑换记录</view>
			</view>
		</view>
		
		<view class="tui-product-list margin-top" >
			<view class="tui-product-container">
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2!=0">
					<!-- <template is="productItem" data="{{item,index:index,isList:isList}}" /> -->
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detailsClck(1)">
						<image src="../../../static/demo4.png" class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit">{{item.name}}</view>
							<view class="flex align-center justify-between margin-top-sm">
								<view class="tui-sale-price">{{item.sale}}积分</view>
								<view class="tui-pro-pay">立即兑换</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
			<view class="tui-product-container" >
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2==0">
					<!-- <template is="productItem" data="{{item,index:index}}" /> -->
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detailsClck(1)">
						<image src="../../../static/demo6.png" class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit">{{item.name}}</view>
							<view class="flex align-center justify-between margin-top-sm">
								<view class="tui-sale-price">{{item.sale}}积分</view>
								<view class="tui-pro-pay">立即兑换</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
		</view>
		
		<uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components: {
			uniLoadMore
		},
		data(){
			return{
				loadingimg:true,//login加载
				loadingType:1,//login状态
				productList: [{
						img: 1,
						name: "欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）",
						sale: 599,
						factory: 899,
						payNum: 2342
					},
					{
						img: 2,
						name: "德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒",
						sale: 29,
						factory: 69,
						payNum: 999
					},
					{
						img: 3,
						name: "【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红",
						sale: 299,
						factory: 699,
						payNum: 666
					},
					{
						img: 4,
						name: "百雀羚套装女补水保湿护肤品",
						sale: 1599,
						factory: 2899,
						payNum: 236
					},
					{
						img: 5,
						name: "百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋",
						sale: 599,
						factory: 899,
						payNum: 2399
					},
					{
						img: 6,
						name: "短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤",
						sale: 599,
						factory: 899,
						payNum: 2399
					},
					{
						img: 1,
						name: "欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜",
						sale: 599,
						factory: 899,
						payNum: 2342
					},
					{
						img: 2,
						name: "德国DMK进口牛奶",
						sale: 29,
						factory: 69,
						payNum: 999
					},
					{
						img: 3,
						name: "【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红",
						sale: 299,
						factory: 699,
						payNum: 666
					},
					{
						img: 4,
						name: "百雀羚套装女补水保湿护肤品",
						sale: 1599,
						factory: 2899,
						payNum: 236
					}
				],
			}
		},
		methods:{
			//兑换记录
			recordListClcikc(){
				uni.navigateTo({
					url:'recordList'
				})
			},
			//积分详情
			integralShopDetailClick(){
				uni.navigateTo({
					url:'intrgralDetail'
				})
			}
		}
	}
</script>

<style>
	.integralShop-title{
		background: url(../../../static/jifena.png);
		background-size: 100% 100%;
		height: 256upx;
	}
	.integralShop-title-left{
		height: 104upx;
		border-right: 4upx solid #F8F8F8;
		background: #FFFFFF;
	}
	.integralShop-title-right{
		height: 104upx;
		border-left: 4upx solid #F8F8F8;
		background: #FFFFFF;
	}
	.integralShop-title-image{
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}
	
	
	/* 商品列表*/
	
	.tui-product-list {
		margin: 12upx 24upx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
	}
	
	.tui-product-container {
		flex: 1;
		margin-right: 16rpx;
	}
	
	.tui-product-container:last-child {
		margin-right: 0;
	}
	
	.tui-pro-item {
		width: 100%;
		margin-bottom: 10rpx;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
		transition: all 0.15s ease-in-out;
	}
	
	.tui-flex-list {
		display: flex;
		margin-bottom: 1rpx !important;
	}
	
	.tui-pro-img {
		width: 100%;
		display: block;
	}
	
	.tui-proimg-list {
		width: 260rpx;
		height: 260rpx !important;
		flex-shrink: 0;
		border-radius: 12rpx;
	}
	
	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}
	
	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}
	
	.tui-pro-price {
		padding-top: 18rpx;
	}
	
	.tui-sale-price {
		font-size: 26rpx;
		font-weight: 500;
		color: #e41f19;
	}
	
	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}
	
	.tui-pro-pay {
		font-size: 24rpx;
		color: #FFFFFF;
		width:120upx;
		height:42upx;
		background:rgba(205,50,51,1);
		border-radius:10upx;
		line-height: 42upx;
		text-align: center;
	}
	
	/* 商品列表*/
</style>
