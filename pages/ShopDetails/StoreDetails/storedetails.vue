<template>
	<view>
		<view :style="{ 'height': statusBarHeight + 'px'}"></view>
		<view class="storedetails-title-background">
			<view class="flex align-center storedetails-title">
				<view class="flex align-center bg-white text-width storedetails-title-search">
					<view style="font-size: 40upx;" class="lg text-gray cuIcon-search padding-left padding-right-xs"></view>
					<input class="text-df" placeholder="搜索本店商品" v-model="searchP" @confirm="searchClick" />
				</view>
			</view>
			<view class="flex align-center justify-between padding-bottom-sm margin-top-xl margin-left">
				<view class="flex">
					<image class="shop-introduce-img" :src="dealImage" ></image>
					<view class="margin-left-sm flex flex-direction justify-center">
						<view class="shop-detal-name text-lg text-white text-bold">{{storeInfo.shop_info ? storeInfo.shop_info.shop_name : ''}}</view>
						<view class="flex align-center text-xs shop-experience" v-if="storeInfo.shop_info">
							<tui-rate :current="storeInfo.shop_info.zong*1 || 0" normal="#ccc" active="#FF5400" :size="10"></tui-rate>
						</view>
						<!-- <view style="color: #FEFEFE;" class="text-sm">粉丝数量{{storeInfo.shop_fans}}万</view> -->
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
			<view @tap="HomeClick" class="flex align-center justify-center flex-direction nav-item">
				<image v-if="currentTab == 0" class="storedetails-daohan-img" src="../../../static/shopClick.png"></image>
				<image v-else class="storedetails-daohan-img" src="../../../static/shop.png"></image>
				<view :class="[currentTab == 0?'storedetails-daohan-delect':'']" class="storedetails-daohan-txt">店铺首页</view>
			</view>
			<view @tap="shopClick" class="flex align-center justify-center flex-direction nav-item">
				<image v-if="currentTab == 1" class="storedetails-daohan-img" src="../../../static/shanchengClick.png"></image>
				<image v-else class="storedetails-daohan-img" src="../../../static/shangping.png"></image>
				<view :class="[currentTab == 1?'storedetails-daohan-delect':'']" class="storedetails-daohan-txt">推荐商品</view>
			</view>
			<view @tap="activtyClick" class="flex align-center justify-center flex-direction nav-item">
				<image v-if="currentTab == 2" class="storedetails-daohan-img" src="../../../static/chuxiaoClick.png"></image>
				<image v-else class="storedetails-daohan-img" src="../../../static/chuxiao.png"></image>
				<view :class="[currentTab == 2?'storedetails-daohan-delect':'']" class="storedetails-daohan-txt nav-item-text">销量
					<text 
						class="lg storedtails-icon-heagin"
						:class="[isSales ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill']">
					</text>
				</view>
			</view>
			<view @tap="newShopClick" class="flex align-center justify-center flex-direction nav-item">
				<image v-if="currentTab == 3" class="storedetails-daohan-img" src="../../../static/xinpinClick.png"></image>
				<image v-else class="storedetails-daohan-img" src="../../../static/xinoing.png"></image>
				<view :class="[currentTab == 3?'storedetails-daohan-delect':'']" class="storedetails-daohan-txt nav-item-text">价格
					<text 
						class="lg storedtails-icon-heagin"
						:class="[isDesc ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill']">
					</text>
				</view>
			</view>
		</view>	
		<!-- 导航栏 end -->
			<!-- <view v-if="currentTab == 0" class="text-lg text-wuer margin-top text-bold">热销商品</view> -->
			<!-- <view v-if="currentTab == 1" class="text-lg text-wuer margin-top text-bold flex align-center justify-around">
				<view @tap="syndClick" :class="[shopselect == 0 ?'storedtails-icon-shop':'']">综合</view>
				<view @tap="salesClick" :class="[shopselect == 1 ?'storedtails-icon-shop':'']">销量</view>
				<view @tap="priceClick" :class="[shopselect == 2 ?'storedtails-icon-shop':'']" class="flex align-center">
					<view>价格</view>
					<view>
						<view :class="[shopselect == 2 && priceType?'storedtails-icon-shop':'']" class="lg text-gray cuIcon-triangleupfill storedtails-icon-heagin"></view>
						<view :class="[shopselect == 2 && !priceType?'storedtails-icon-shop':'']" class="lg text-gray cuIcon-triangledownfill storedtails-icon-heagin"></view>
					</view>
				</view>
			</view> -->
			<!--list-->
		<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption" :top="475">
			<view class="tui-product-list padding-left-sm padding-right-sm">
				<view class="tui-product-container">
					<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2!=0">
						<!-- <template is="productItem" data="{{item,index:index,isList:isList}}" /> -->
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item)">
							<image :src="item.image" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit"><text v-if="item.is_hot" class="bg-grey text-xs padding-lr-xs margin-right-sm native-txt-red">{{dealTechan(item)}}特产</text>{{item.store_name}}</view>
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
								<view class="tui-pro-tit"><text v-if="item.is_hot" class="bg-grey text-xs padding-lr-xs margin-right-sm native-txt-red">{{dealTechan(item)}}特产</text>{{item.store_name}}</view>
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
		</mescroll-uni>
		<x-loading text="加载中.." mask="true" click="true" ref="loading" />
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {getStoreInfo,collectStoring,unCollectStore} from "@/network/detail"
	import tuiRate from "@/components/rate/rate"
	
	// 导入网络模块
	import {getDetailData} from '@/network/Home'
	
	
	// 导入vuex
	import { mapGetters } from 'vuex'
	
	import {replaceImage} from '@/utils/dealUrl'
	
	// 下拉刷新
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	
	export default{
		components: {
			uniLoadMore,
			MescrollUni,
			tuiRate
		},
		data(){
			return{
				loadingImage:false,
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
				isDesc:false,
				isSales:false,
				// 下拉刷新的常用配置
				downOption: { 
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					textNoMore:'-- 没有更多了 --',
					empty: {
						tip: '暂无相关数据'
					}
				},
				hasNext:true,
				searchP:''
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
		},
		onReady() {
			if(this.loadingImage == false){
				this.$refs.loading.open()
			}
		},
		methods:{
			// 获取信息
			getStoreInfo(id,token){
				getStoreInfo(id,token).then(res => {
					this.$refs.loading.close()
					this.loadingImage = true
					if(res.data.code == 200){
						this.isCollectIng = res.data.data.user_collect
						this.storeInfo = res.data.data
					}
				})
			},
			// 店铺收藏
			collectStore(){
				this.isCollectIng = !this.isCollectIng
				// 如果未收藏
					if(this.isCollectIng){
						collectStoring(this.storeId,this.isToken)
						.then(res => {
							if(res.data.code == 200){								
							}
						})
					}else{
						// 如果已经收藏
						unCollectStore(this.storeId,this.isToken)
							.then(res => {
								if(res.data.code == 200){
								}
							})
					}
				
				
			},
			//首页
			HomeClick(){			
				if(this.currentTab == 0) return
				this.currentTab = 0
				const mescroll = this.$refs.mescroll.mescroll
				mescroll.resetUpScroll()

			},
			//综合
			shopClick(){
				if(this.currentTab == 1) return
				this.currentTab = 1
				const mescroll = this.$refs.mescroll.mescroll
				mescroll.resetUpScroll()
			},
			//销量	
			activtyClick(){
				this.isSales = !this.isSales
				this.currentTab = 2
				const mescroll = this.$refs.mescroll.mescroll
				mescroll.resetUpScroll()
			},
			//价格
			newShopClick(){
				this.isDesc = !this.isDesc
				this.currentTab = 3				
				const mescroll = this.$refs.mescroll.mescroll
				mescroll.resetUpScroll()
			},
			//综合
			syndClick(){
				if(this.shopselect == 0) return
				this.shopselect = 0
				this.dealClick()
			},
			//销量
			salesClick(){
				if(this.shopselect == 1) return
				this.shopselect = 1
				this.dealClick()
			},
			priceClick(){
				this.shopselect = 2
				if(this.priceType){
					//价格升序
					this.priceType = false
					this.dealClick()
				}else{
					//价格降序
					this.priceType = true
					this.dealClick()
				}
			},
			px(num) {
				return uni.upx2px(num) + "px"
			},
			//顶部导航栏搜索
			searchClick(){
				const mescroll = this.$refs.mescroll.mescroll
				mescroll.resetUpScroll()
			},
			// 进入详情页
			detail(item){
				uni.navigateTo({
					url:`../shopDetails?id=${item.id}`
				})
			},
			// 数据处理
			dealData(res,pageNum,pageSize,mescroll){
				let obj = res.data.data
				if(obj.length){
					obj.forEach((item,i) => {
						item.image =replaceImage(item.image)
					})
				}
				if(obj.length < pageSize){
					this.hasNext = false
				}else{
					this.hasNext = true
				}
				console.log(pageNum)
				if(pageNum == 1) this.productList = []
				this.productList = this.productList.concat(obj)
				mescroll.endSuccess(obj.length, this.hasNext);
			},
			// 处理详情数据
			dealClick(pageNum,pageSize,mescroll){
				if(this.currentTab != 1){
					getDetailData ({
								shop_id:this.storeId,
								salesOrder:this.currentTab == 2 ? (this.isSales ? 'desc' : 'asc' ) : '',
								priceOrder :this.currentTab == 3 ? (this.isDesc ? 'desc' : 'asc' ) : '',
								page:pageNum,
								limit:pageSize,
								keyword:this.searchP
							})
					.then(res => {
								this.searchP = ''
								this.isLoading = false
								this.dealData(res,pageNum,pageSize,mescroll)
							})
				}else{
					getDetailData ({
								shop_id:this.storeId,
								salesOrder:'desc',
								priceOrder:'desc',
								is_hot:1,
								page:pageNum,
								limit:pageSize,
								keyword:this.searchP
							})
					.then(res => {
								this.searchP = ''
								this.isLoading = false
								this.dealData(res,pageNum,pageSize,mescroll)
							})
				}
			},	
			// 处理tabbar分类数据
			getTabDetail(type){
				
			},
			// 土特产
			dealTechan(item){
				return item.province.replace(/(['省''市'('自治区')])/g,'')
			},
			// 下拉刷新方法
			downCallback(mescroll) { 
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.dealClick(pageNum,pageSize,mescroll)
			},
			
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
	
	.nav-item{
		flex: 1;
	}
	.nav-item-text{
		padding-left: 16upx;
	}
	.nav-item-text text{
		font-size: 32upx;
	}
	.native-txt-red{
		width:86upx;
		height:40upx;
		background:rgba(205,50,51,1);
		border-radius:16upx;
		font-size: 20upx;
	}
</style>
