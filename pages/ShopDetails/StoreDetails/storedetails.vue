<template>
	<view>
		<view class="storedetails-title-background">
			<view class="padding-top-sm">
				<view class="flex align-center bg-white storedetails-title-search">
					<view style="font-size: 40upx;" class="lg text-gray cuIcon-search padding-left padding-right-xs"></view>
					<input class="text-df" placeholder="搜索本店商品" @confirm="searchClick" />
				</view>
			</view>
			<view class="flex align-center justify-between padding-bottom-sm margin-top-xl margin-left">
				<view class="flex">
					<image class="shop-introduce-img" src="../../../static/demo9.png" ></image>
					<view class="margin-left-sm flex flex-direction justify-between">
						<view class="shop-detal-name text-lg text-white text-bold">沃隆旗舰店</view>
						<view class="flex align-center text-xs shop-experience">
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
						</view>
						<view style="color: #FEFEFE;" class="text-sm">粉丝数量191万</view>
					</view>
				</view>
				<view class="flex align-center text-white storedetails-title-right">
					<view class="lg cuIcon-favor margin-left-xs margin-right-xs"></view>
					<view>收藏</view>
				</view>
			</view>
		</view>
		<!-- 导航栏 -->
		<view class="bg-white text-sm flex align-center justify-around">
			<view @tap="HomeClick" class="flex align-center justify-center flex-direction ">
				<image v-if="currentTab == 0" class="storedetails-daohan-img" src="../../../static/shopClick.png"></image>
				<image v-else class="storedetails-daohan-img" src="../../../static/shop.png"></image>
				<view :class="[currentTab == 0?'storedetails-daohan-delect':'']" class="storedetails-daohan-txt">店铺首页</view>
			</view>
			<view @tap="shopClick" class="flex align-center justify-center flex-direction ">
				<image v-if="currentTab == 1" class="storedetails-daohan-img" src="../../../static/shanchengClick.png"></image>
				<image v-else class="storedetails-daohan-img" src="../../../static/shangping.png"></image>
				<view :class="[currentTab == 1?'storedetails-daohan-delect':'']" class="storedetails-daohan-txt">商品</view>
			</view>
			<view @tap="activtyClick" class="flex align-center justify-center flex-direction ">
				<image v-if="currentTab == 2" class="storedetails-daohan-img" src="../../../static/chuxiaoClick.png"></image>
				<image v-else class="storedetails-daohan-img" src="../../../static/chuxiao.png"></image>
				<view :class="[currentTab == 2?'storedetails-daohan-delect':'']" class="storedetails-daohan-txt">促销</view>
			</view>
			<view @tap="newShopClick" class="flex align-center justify-center flex-direction ">
				<image v-if="currentTab == 3" class="storedetails-daohan-img" src="../../../static/xinpinClick.png"></image>
				<image v-else class="storedetails-daohan-img" src="../../../static/xinoing.png"></image>
				<view :class="[currentTab == 3?'storedetails-daohan-delect':'']" class="storedetails-daohan-txt">新品</view>
			</view>
		</view>
		<!-- 导航栏 end -->
		
		<view style="margin:0 24upx;">
			<view v-if="currentTab == 0" class="text-lg text-wuer margin-top text-bold">热销商品</view>
			<view v-if="currentTab == 1" class="text-lg text-wuer margin-top text-bold flex align-center justify-around">
				<view @tap="syndClick" :class="[shopselect == 0 ?'storedtails-icon-shop':'']">综合</view>
				<view @tap="salesClick" :class="[shopselect == 1 ?'storedtails-icon-shop':'']">销量</view>
				<view @tap="priceClick" :class="[shopselect == 2 ?'storedtails-icon-shop':'']" class="flex align-center">
					<view>价格</view>
					<view>
						<view :class="[shopselect == 2 && priceType?'storedtails-icon-shop':'']" class="lg text-gray cuIcon-triangleupfill storedtails-icon-heagin"></view>
						<view :class="[shopselect == 2 && !priceType?'storedtails-icon-shop':'']" class="lg text-gray cuIcon-triangledownfill storedtails-icon-heagin"></view>
					</view>
				</view>
			</view>
			<!--list-->
			<view class="tui-product-list margin-top" >
				<view class="tui-product-container">
					<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2!=0">
						<!-- <template is="productItem" data="{{item,index:index,isList:isList}}" /> -->
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail">
							<image src="../../../static/demo4.png" class="tui-pro-img" mode="widthFix" />
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
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail">
							<image src="../../../static/demo4.png" class="tui-pro-img" mode="widthFix" />
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
				currentTab: 0,//导航栏状态
				shopselect:0,//综合  销量 价格
				priceType:true,// true 价格升序  false价格降序
				tabs2: [{
					name: "今日特拼"
				}, {
					name: "全部"
				}, {
					name: "新品"
				}, {
					name: "新品",
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
		onReachBottom(){
			
			
		},
		methods:{
			//首页
			HomeClick(){
				if(this.currentTab == 0) return
				this.currentTab = 0
			},
			//商品
			shopClick(){
				if(this.currentTab == 1) return
				this.currentTab = 1
				this.shopselect = 0
			},
			//促销
			activtyClick(){
				if(this.currentTab == 2) return
				this.currentTab = 2
			},
			//新品
			newShopClick(){
				if(this.currentTab == 3) return
				this.currentTab = 3
			},
			//综合
			syndClick(){
				if(this.shopselect = 0) return
				this.shopselect = 0
			},
			//销量
			salesClick(){
				if(this.shopselect = 1) return
				this.shopselect = 1
			},
			//价格
			priceClick(){
				this.shopselect = 2
				if(this.priceType){
					//价格升序
					this.priceType = false
				}else{
					//价格降序
					this.priceType = true
				}
			},
			px(num) {
				return uni.upx2px(num) + "px"
			},
			//顶部导航栏搜索
			searchClick(){
				
			},
			
			
			
		}
	}
</script>

<style>
	.storedetails-title-background{
		background: url('../../../static/demo8.png');
		background-size: 100% 100%;
		height: 276upx;
	}
	.shop-introduce-img{
		height: 106upx;
		width: 106upx;
	}
	.storedetails-title-search{
		margin: 0 100upx;
		height: 60upx;
		border-radius: 10upx;
	}
	.storedetails-title-right{
		background: #CD3233;
		width:153upx;
		height:60upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top-left-radius: 100upx;
		border-bottom-left-radius: 100upx;
		font-size: 32upx;
	}
	.storedetails-title-bottom{
		margin-top: 10upx;
		width:100upx;
		height:4upx;
		background:rgba(205,50,51,1);
	}
	.storedtails-title-daohan{
		height: 116upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.storedtails-title-icon{
		color: #666666;
	}
	.storedetails-daohan-img{
		margin-top: 20upx;
		height: 50upx;
		width: 50upx;
	}
	.storedetails-daohan-all{
		/* width: 120upx; */
	}
	.storedetails-daohan-txt{
		width: 120upx;
		text-align: center;
		border-bottom: #FFFFFF 3px solid;
		padding-bottom: 10upx;
	}
	.storedetails-daohan-delect{
		border-bottom: #CD3233 3px solid;
		color: #CD3233;
	}
	.storedtails-icon-heagin{
		line-height: 10upx;
	}
	.storedtails-icon-shop{
		color: #CD3233;
	}
	/* 商品列表*/
	
	.tui-product-list {
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
</style>
