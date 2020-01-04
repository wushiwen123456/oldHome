<template>
	<view>
		<view class="flex align-center solid-top bg-white">
			<view class="title-select-left">
				
				<view class="tabbar-left text-cut" @click="openCitys">
					<text class="cuIcon-location"></text>
					{{cityName}}
				</view>
				<view class="qs-tab">
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
							<view class="flex align-center justify-between">
								<view class="tui-sale-price">￥{{item.sale}}</view>
								<view class="tui-pro-pay">库存{{item.payNum}}</view>
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
							<view class="flex align-center justify-between">
								<view class="tui-sale-price">￥{{item.sale}}</view>
								<view class="tui-pro-pay">库存{{item.payNum}}</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
		</view>
		<uni-load-more :loadingType="loadingType" ></uni-load-more>
		<popup-layer ref="popupRef" :direction="'right'">
			<view style="width:750upx;height: 100%;">
				<citySelect @back_city="back_city" @showCity="showCity"></citySelect>
			</view>
		</popup-layer>
		<x-modal v-model="show1" title='提示' :text="modalText" @confirm="changeCity" />
	</view>
</template>

<script>
	// 城市选择组件
	import citySelect from '@/components/linzq-citySelect/linzq-citySelect.vue';
	import popupLayer from '@/components/popup-layer/popup-layer.vue';
	
	
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	export default{
		components: {
			QSTabs,
			uniLoadMore,
			citySelect,
			popupLayer
		},
		data(){
			return{
				cityName:'',
				show1:false,
				modalText:'',
				loadingType:1,//login状态
				tabs_3: ['推荐', '优惠', '折扣', '红包', '开团', 'tab-6', 'tab-7', 'tab-8'],
				current_3: 0,
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
				showDrawer:false,
				cityNetwork:{}
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:"issue"
			})
		},
		onLoad(){
			// 从缓存里读取城市
			const city = uni.getStorageSync('localCity')
			if(city){
				this.cityName = city.city
			}else{
				this.cityName = '获取中...'
			}
			this.getJingwei()
		},
		onReady() {
			
		},
		onShow() {
			if(Object.keys(this.cityNetwork).length == 0){
				// this.getJingwei()
			}
		},
		onBackPress() {
			if(this.showDrawer){
				this.$refs.popupRef.close();	
				this.showDrawer = false
				return true
			}
		},
		methods:{
			change(index, i) {
				this['current_' + i] = index;
			},
			//商品详情页
			detailsClck(id){
				uni.navigateTo({
					url:'BarterInfo'
				})
			},
			openCitys(){
				this.$refs.popupRef.show()
				this.showDrawer = true
			},
			back_city(e) { 
				if (e !== 'no') {
					this.cityName = e.cityName
					this.$refs.popupRef.close();
				} else {
					this.$refs.popupRef.close();
				}
				this.showDrawer = false
			},
			// 点击选择当前城市
			showCity(e){
				this.cityName = e
				this.$refs.popupRef.close()
				this.showDrawer = false
			},
			getJingwei(){
				// 获取当前城市信息
				this.$store.dispatch('getWarpweft').then(res => {
					const obj = res 
					this.cityNetwork = obj
					if(this.cityName == '获取中...'){
						this.loadingText = '正在加载数据...'
						this.cityName = obj.city
					}else if(this.cityName != obj.city){
						const city = obj.city
						this.modalText = `检测到您所在的城市为${city},是否切换？`
						this.show1 = true
					}					
					
					// 执行加载数据方法
					this.getProductList()
					
					// 把城市存到缓存
					uni.setStorage({
						key:'localCity',
						data:obj
					})
					this.cityNetwork = obj
					
				}).catch(err => {
					if(err == 0){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('获取位置信息失败，请检查您的网络和定位是否开启',{duration:'long'})
						// #endif
					}
					
				})
			},
			// 加载数据的方法
			getProductList(){
				const city = this.cityName
			},
			// 切换城市
			changeCity(){
				const city = this.cityNetwork.city
				this.cityName = city
			},
		}
	}
</script>

<style lang="scss" scoped>
	.title-select-left{
		width: 100%;
		height: 100upx;
		padding: 0 15upx;
		background-color: #fff;
		position: relative;
		font-size: 30upx;
		display: flex;
		align-items: center;
		.qs-tab{
			width: 400upx;
			flex: 1;
		}
		.tabbar-left{
			height: 80upx;
			font-size: 28upx;
			display: flex;
			align-items: center;
			color: #CD3233;
			margin-right: 15upx;
		}
	}
	.title-select-right{
		height: 15%;
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
	/* 商品列表*/
	
	.tui-product-list {
		margin: 24upx;
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
