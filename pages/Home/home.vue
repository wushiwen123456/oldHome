<template>
	<view>
		<view class="flex align-end home-title-search bg-white ">
			<view class="flex align-center justify-between home-search-all-one">
				<view class="home-search-all">
					<view class="flex align-center  share-all-bg">
						<view style="font-size: 40upx;" class="lg text-gray cuIcon-search margin-left margin-right-xs"></view>
						<view class="text-df text-jiujiujiu">搜索商品</view>
					</view>
				</view>
				<image class="home-title-message-img" src="../../static/homeMeesage.png" ></image>
			</view>
		</view>
		
		<view style="height: 126upx;"></view>
		
		<view class="flex align-center solid-top bg-white">
			<view class="title-select-left">
				<QSTabs 
					:current="current_3" 
					animationMode="line2" 
					activeColor="#CD3233" 
					autoCenterMode="window" 
					defaultStyle="#525253"
					:tabs="tabs_3" 
					width="130" 
					@change="change($event, '3')"
				/>
			</view>
			<view class="title-select-right">
				<view style="font-size: 44upx;" class="lg text-black cuIcon-list padding-left"></view>
			</view>
		</view>
		
		<swiper 
			style="min-height: 255upx;" 
			class="screen-swiper square-dot" 
			:indicator-dots="true" 
			:circular="true"
			:autoplay="true" 
			interval="5000" 
			duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill"></image>
				</swiper-item>
		</swiper>
		
		<!-- 八宫格 -->
		<view class="grid padding-bottom text-center col-4 bg-white">
			<view @tap="homeListClick(vo.id)" v-for="(vo,key) in homeTitle" :key="key" class="home-title-image">
				<image :src="vo.image"></image>
				<view>{{vo.name}}</view>
			</view>
		</view> 
		
		<!-- 新闻 -->
		<view class="bg-white margin-top-xs flex align-center home-new-all">
			<image class="home-new-image" src="../../static/newimg.png"></image>
			<swiper vertical autoplay circular interval="3000" class="tui-swiper margin-right">
				<swiper-item v-for="(item,index) in newsList" :key="index" class="tui-swiper-item">
					<view class="tui-news-item" @tap='detail'>{{item}}</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 新闻new -->
		
		<!-- 优惠券 -->
		<view class="flex align-center justify-between youhui-all-margin youhuiquan-color">
			<view class="home-youhui-all">
				<view style="font-size: 80upx;" class="text-price">10</view>
				<view class="flex flex-direction align-center margin-left-xs">
					<view class="text-xl text-bold">优惠券</view>
					<view class="text-xs">店铺红包</view>
				</view>
			</view>
			<view class="home-youhui-all">
				<view style="font-size: 80upx;" class="text-price">20</view>
				<view class="flex flex-direction align-center margin-left-xs">
					<view class="text-xl text-bold">优惠券</view>
					<view class="text-xs">新人专属</view>
				</view>
			</view>
		</view>
		
		<view class="tui-product-list margin-top" >
			<view class="tui-product-container">
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2!=0">
					<!-- <template is="productItem" data="{{item,index:index,isList:isList}}" /> -->
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detailsClck(1)">
						<image src="../../static/demo4.png" class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit">{{item.name}}</view>
							<view class="flex align-center justify-between">
								<view class="tui-sale-price">￥{{item.sale}}</view>
								<view class="tui-pro-pay">销量{{item.payNum}}</view>
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
						<image src="../../static/demo6.png" class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit">{{item.name}}</view>
							<view class="flex align-center justify-between">
								<view class="tui-sale-price">￥{{item.sale}}</view>
								<view class="tui-pro-pay">销量{{item.payNum}}</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
		</view>
		
		<view class="red-pack">
			<image src="../../static/redpack.png"></image>
		</view>
		<uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	export default{
		components: {
			QSTabs,
			uniLoadMore
		},
		data(){
			return{
				loadingimg:true,//login加载
				loadingType:1,//login状态
				newsList: [
					"致力发展负责任的人工智能 中国发布八大治理原则",
					"格兰仕暗示拜访拼多多后遭天猫打压，拼多多高层赞其有勇气",
					"阿里计划将每股普通股拆为8股，增加筹资灵活性"
				],
				tabs_3: ['tab-1', 'tab-2', 'tab-3', 'tab-4', 'tab-5', 'tab-6', 'tab-7', 'tab-8'],
				current_3: 0,
				swiperList: [{
					id: 0,
					url: '../../static/banner1.png'
				}, {
					id: 1,
					url: '../../static/banner1.png'
				}, {
					id: 2,
					url: '../../static/banner1.png'
				}, {
					id: 3,
					url: '../../static/banner1.png'
				}, {
					id: 4,
					url: '../../static/banner1.png'
				}, {
					id: 5,
					url: '../../static/banner1.png'
				}, {
					id: 6,
					url: '../../static/banner1.png'
				}],
				homeTitle:[{
					id:0,
					name:'老家特产',
					image:'../../static/homea.png'
				},{
					id:1,
					name:'秒杀',
					image:'../../static/homeb.png',
				},{
					id:2,
					name:'拼团',
					image:'../../static/homec.png'
				},{
					id:3,
					name:'积分商城',
					image:'../../static/homed.png'
				},{
					id:4,
					name:'政府新闻',
					image:'../../static/homed.png'
				},{
					id:5,
					name:'公益信息',
					image:'../../static/homee.png'
				},{
					id:6,
					name:'易物平台',
					image:'../../static/homef.png'
				},{
					id:7,
					name:'更多',
					image:'../../static/homeg.png'
				}],
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
		onLoad(){
			
		},
		methods:{
			
			change(index, i) {
				this['current_' + i] = index;
			},
			//八宫格
			homeListClick(num){
				if(num == 0){
					//老家特产
					uni.navigateTo({
						url:'Native/native'
					})
				}else if(num == 1){
					uni.navigateTo({
						url:'Seckilltime/seckilltime'
					})
				}else if(num == 2){
					//拼团
					uni.navigateTo({
						url:'BookingList/bookingList'
					})
				}else if(num == 3){
					//积分商城
					uni.navigateTo({
						url:'Integral/integralShop'
					})
				}else if(num == 4){
					//政府新闻
				}else if(num == 5){
					//公益信息
				}else if(num == 6){
					//易物平台
				}else if(num == 7){
					//更多
				}
			},
			//商品详情页
			detailsClck(id){
				uni.navigateTo({
					url:'../ShopDetails/shopDetails?id=' + id
				})
			},
		}
	}
</script>

<style>
	.screen-my-swiper{
		height: 256upx;
	}
	.title-select-left{
		width: 85%;
	}
	.title-select-right{
		height: 15%;
	}
	.home-title-image{
		
	}
	.home-title-image image{
		height: 90upx;
		width: 90upx;
		margin-top: 36upx;
	}
	
	/**
	 * 滚动
	 */
	.tui-swiper {
		font-size: 28upx;
		height: 50upx;
		flex: 1;
	}
	
	.tui-swiper-item {
		display: flex;
		align-items: center
	}
	.tui-news-item {
		line-height: 28upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/**
	 * 滚动end
	 */
	.home-new-image{
		width:128upx;
		height:30upx;
		margin-left: 30upx;
		margin-right: 20upx;
	}
	.home-new-all{
		height: 82upx;
	}
	.home-youhui-all{
		display: flex;
		align-items: center;
		justify-content: center;
		width:340upx;
		height:160upx;
		background: url(../../static/homej.png);
		background-size: 100% 100%;
	}
	.youhui-all-margin{
		margin: 14upx 24upx;
	}
	.text-price::before{
		font-size: 50%;
	}
	.youhuiquan-color{
		color: #E5150B;
	}
	
	/* 商品列表*/
	
	.tui-product-list {
		margin: 0 24upx;
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
		-webkit-line-clamp: 2;
	}
	
	.tui-pro-price {
		padding-top: 18rpx;
	}
	
	.tui-sale-price {
		font-size: 34rpx;
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
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
	
	/* 商品列表*/
	
	.red-pack{
		position: fixed;
		z-index: 999;
		right: 30upx;
		bottom: 70upx;
	}
	.red-pack image{
		width:98upx;
		height:102upx;
	}
	.home-title-message-img{
		width: 40upx;
		height: 40upx;
		margin-right: 24upx;
	}
	.home-title-search{
		position: fixed;
		z-index: 999;
		width: 100%;
		height: 126upx;
		padding-bottom: 14upx;
		background: #FFFFFF;
	}
	.share-all-bg{
		width: 100%;	
		height: 62upx;
		background: #F2F2F2;
		border-radius: 10upx;
	}
	.home-search-all{
		width: 80%;
		margin: 0 auto;
	}
	.home-search-all-one{
		width: 100%;
	}
</style>
