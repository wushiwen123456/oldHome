<template>
	<view v-if="productList.length">
		<view :style="{ 'height': statusBarHeight + 'px'}"></view>
		<view class="storedetails-title-background">
			<view class="flex align-center storedetails-title">
				<view class="flex align-center bg-white text-width storedetails-title-search">
					<view style="font-size: 40upx;" class="lg text-gray cuIcon-search padding-left padding-right-xs"></view>
					<input class="text-df" placeholder="搜索本店商品" @confirm="searchClick" />
				</view>
			</view>
			<view class="flex align-center justify-between padding-bottom-sm margin-top-xl margin-left">
				<view class="flex">
					<image class="shop-introduce-img" :src="dealImage" ></image>
					<view class="margin-left-sm flex flex-direction justify-between">
						<view class="shop-detal-name text-lg text-white text-bold">{{storeInfo.shop_info ? storeInfo.shop_info.shop_name : ''}}</view>
						<view class="flex align-center text-xs shop-experience">
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
						</view>
						<view style="color: #FEFEFE;" class="text-sm">粉丝数量{{storeInfo.shop_fans}}万</view>
					</view>
				</view>
				<view class="flex align-center text-white storedetails-title-right">
					<view class="lg margin-left-xs margin-right-xs" :class="[isCollectIng ? 'cuIcon-favorfill' : 'cuIcon-favor']"></view>
					<view @tap="collectStore">{{collected}}</view>
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
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item)">
							<image :src="item.image" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{item.store_name}}</view>
								<view class="flex align-center justify-between">
									<view class="tui-sale-price">￥{{item.price}}</view>
									<view class="tui-pro-pay">销量{{item.sales}}</view>
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
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item)">
							<image  :src="item.image"  class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{item.store_name}}</view>
								<view class="flex align-center justify-between">
									<view class="tui-sale-price">￥{{item.price}}</view>
									<view class="tui-pro-pay">销量{{item.sales}}</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
				</view>
			</view>
		</view>
		<!-- <uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more> -->
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {getStoreInfo,collectStoring,unCollectStore} from "@/network/detail"
	
	// 导入网络模块
	import {getDetailData} from '@/network/Home'
	
	
	// 导入vuex
	import { mapGetters } from 'vuex'
	
	import {replaceImage} from '@/utils/dealUrl'
	
	export default{
		components: {
			uniLoadMore
		},
		data(){
			return{
				statusBarHeight:0,//状态栏高度
				loadingimg:true,//login加载
				loadingType:1,//login状态
				currentTab: 0,//导航栏状态
				shopselect:0,//综合  销量 价格
				priceType:true,// true 价格升序  false价格降序
				isCollectIng:false, //是否收藏
				storeId:'',
				storeInfo:{},
				tabs2: [{
					name: "今日特拼"
				}, {
					name: "全部"
				}, {
					name: "新品"
				}, {
					name: "新品",
				}],
				productList: [],
			}
		},
		onLoad(option) {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.statusBarHeight = res.statusBarHeight
			    }
			});
			if(option.id && !!that.isToken){
				that.storeId = option.id
			}else{
				uni.switchTab({
					url:'../../Home/home'
				})
				return false
			}
			// 调用头部数据接口
			that.getStoreInfo(that.storeId,that.isToken)
			// 调用商品数据接口
			that.getPList(that.storeId)
		},
		methods:{
			// 获取信息
			getStoreInfo(id,token){
				getStoreInfo(id,token).then(res => {
					if(res.data.code == 200){
						this.isCollectIng = res.data.data.user_collect
						this.storeInfo = res.data.data
					}
				})
			},
			// 网络请求方法
			getPList(storeId){
				getDetailData({
					shop_id:storeId
				}).then(res => {
					if(res.data.code == 200){
						this.dealData(res)
					}
				})
			},
			// 店铺收藏
			collectStore(){
				// 如果未收藏
					if(!this.isCollectIng){
						collectStoring(this.storeId,this.isToken)
						.then(res => {
							if(res.data.code == 200){
								uni.showToast({
									title:'收藏成功',
									icon:'none'
								})
								this.isCollectIng = !this.isCollectIng
							}
						})
					}else{
						// 如果已经收藏
						unCollectStore(this.storeId,this.isToken)
							.then(res => {
								if(res.data.code == 200){
									uni.showToast({
										title:'已取消收藏',
										icon:'none'
									})
									this.isCollectIng = !this.isCollectIng
								}
							}).catch(err => {
								console.log(err)
							})
					}
				
				
			},
			//首页
			HomeClick(){
				if(this.currentTab == 0) return
				this.currentTab = 0
				this.getTabDetail(this.currentTab)
			},
			//商品
			shopClick(){
				if(this.currentTab == 1) return
				this.currentTab = 1
				this.shopselect = 0
				this.getTabDetail(this.currentTab)
			},
			//促销
			activtyClick(){
				if(this.currentTab == 2) return
				this.currentTab = 2
				this.getTabDetail(this.currentTab)
			},
			//新品
			newShopClick(){
				if(this.currentTab == 3) return
				this.currentTab = 3
				this.dealClick(this.shopselect)
			},
			//综合
			syndClick(){
				if(this.shopselect == 0) return
				this.shopselect = 0
				this.dealClick(this.shopselect)
			},
			//销量
			salesClick(){
				console.log(this.shopselect)
				if(this.shopselect == 1) return
				this.shopselect = 1
				this.dealClick(this.shopselect)
			},
			//价格
			priceClick(){
				this.shopselect = 2
				if(this.priceType){
					//价格升序
					this.priceType = false
					this.dealClick(this.priceType)
				}else{
					//价格降序
					this.priceType = true
					this.dealClick(this.priceType)
				}
			},
			px(num) {
				return uni.upx2px(num) + "px"
			},
			//顶部导航栏搜索
			searchClick(){
				
			},
			// 进入详情页
			detail(item){
				uni.navigateTo({
					url:`../shopDetails?id=${item.id}`
				})
			},
			// 数据处理
			dealData(res){
				const obj = res.data.data
				obj.image = replaceImage(obj)
				this.productList = obj
				console.log(this.productList)
			},
			// 处理详情数据
			dealClick(type){
				switch(type){
					case 0 : 
						getDetailData ({
							shop_id:this.storeId
						}).then(res => {
							this.dealData(res)
						})
					break
					case 1 :
						getDetailData({
							shop_id:this.storeId
						}).then(res => {
							this.dealData(res)
						})
					break
					case 2 :
						getDetailData({
							shop_id:this.storeId,
							salesOrder:1
						}).then(res => {
							this.dealData(res)
						})
					break
					case 3 :
						getDetailData({
							shop_id:this.storeId,
							priceOrder:1
						}).then(res => {
							this.dealData(res)
						})
					break
					default :
						getDetailData({
							shop_id:this.storeId
						}).then(res => {
							this.dealData(res)
						})
				}
			},
			// 处理tabbar分类数据
			getTabDetail(type){
				
			}
			
		},
		computed:{
			...mapGetters(['isToken']),
			collected(){
				return this.isCollectIng ? '已收藏' : '收藏' 
			},
			dealImage(){
				return this.storeInfo.shop_info ? replaceImage(this.storeInfo.shop_info.shop_logo) : ''
			}
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
	.storedetails-title{
		height: 88upx;
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
