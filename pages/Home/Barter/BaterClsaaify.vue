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
						width="180" 
						@change="change"
					/>
				</view>
			</view>
			
		</view>
		
<!-- 		<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption" :top="80">
			<view class="tui-product-list">
				<view class="tui-product-container shadow"
					v-for="(item,index) in productList" :key="index" v-if="(index+1)%2!=0"
					 @click="detailsClck(item,index)"
				>

					<image  v-if="item.images" :src="item.images[0]" class="tui-pro-img" mode="widthFix" />
					<view class="title text-cut tui-test">{{item.title}}</view>
				</view>
				<view class="tui-product-container shadow"
					v-for="(item,index) in productList" :key="index" v-if="(index+1)%2==0"
					@click="detailsClck(item,index)"
				>
					<image v-if="item.images" :src="item.images[0]" class="tui-pro-img" mode="widthFix" />
					<view class="text-black text-cut tui-test">{{item.title}}</view>
				</view>
			</view>
		</mescroll-uni> -->
		
		
		<!-- 瀑布流模板 -->
		
		<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption" :top="80">
		<view class="water-fill">
				<view class="water-wrapper">
					<view class="water-box">
						<view class="water-sub" v-for="(items,index) in waterList" :key="index">
							<view class="water-item" v-for="(item,idx) in items" :key="idx" @click="detailsClck(item,index)">
								<view class="water-top">
									<image class="top-cover" v-if="item.images" :src="item.images[0]" mode="widthFix"></image>
									<h3 class="top-title">{{item.title}}</h3>
								</view>
							</view>
						</view>
					</view>
				</view>
		</view>
		</mescroll-uni>
		
		
		
		
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
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	// 下拉刷新
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	
	// 网络方法
	import { yi_list } from '@/network/yiwu'
	
	// 工具方法
	import { replaceImage } from '@/utils/dealUrl'
	export default{
		components: {
			QSTabs,
			citySelect,
			popupLayer,
			MescrollUni
		},
		data(){
			return{
				cityName:'',
				show1:false,
				modalText:'',
				loadingType:1,//login状态
				tabs_3: ['推荐', '优惠', '折扣', '红包', '开团', 'tab-6', 'tab-7', 'tab-8'],
				current_3: 0,
				productList: [],
				showDrawer:false,
				cityNetwork:{},
				token:'',
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
				isLoadTabs:false,
				waterList:[]
			}
		},
		onNavigationBarButtonTap() {
			let list = this.tabs_3
			if(list.length){
				list = JSON.stringify(list)
				uni.navigateTo({
					url:`issue?list=${list}`
				})
			}
		},
		onLoad(){
			this.token = this.$store.getters.isToken
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

		},
		onBackPress() {
			if(this.showDrawer){
				this.$refs.popupRef.close();	
				this.showDrawer = false
				return true
			}
		},
		methods:{
			// 瀑布流加载方法
			// 将数组拆分成可使用状态,减少代码
			groupCut(array, subGroupLength) {
				let index = 0;
				let newArray = [];
				while (index < array.length) {
					newArray.push(array.slice(index, index += subGroupLength));
				}
				return newArray;
			},
			handleLoad(arr) {
				// 如果arr存在,即在父组件刷新的值  若不存在就是下拉请求刷新
				if (arr) {
					let length = arr.length;
					this.waterList = this.groupCut(arr, length / 2)
				}
			},
			// 加载网络请求获取信息
			getList(pageNum,pageSize,mescroll,cate_id){
				if(this.cityName == '获取中...') {
					plus.nativeUI.toast('获取信息失败')
					return
					}	
					const token = this.token,
					city = this.cityName
				
				
				// // 测试专用
				// const token = this.token,
				// city = '郑州'
				
				yi_list({city,cate_id},pageNum,pageSize,token)
				.then(res => {
					if(res.data.code == 200){
						const obj = res.data.data
						// 获取顶部数据
						if(!this.isLoadTabs){
							this.isLoadTabs = true
							let arr = obj.cateList
							arr.unshift({
								id:0,
								cate_name:'推荐'
							})
							this.tabs_3 = arr
						}
						let list = obj.list
						// 获取商品列表数据
						if(list.length){
							list = list.map(x => {
								x.images = x.images.map(x => replaceImage(x))
								return {
									...x
								}
							})
						}
					   this.hasNext = list.length >= pageSize
					   if(pageNum == 1) this.productList = []
					   this.productList = this.productList.concat(list)
					   this.handleLoad(this.productList)
					   if(mescroll){
						   mescroll.endSuccess(list.length, this.hasNext);
					   }
					}
				})
				.catch(err => {
					console.log(err)
					if(mescroll){
						mescroll.endErr()
					}
				})
			},
			change(index) {
				this.current_3 = index
				this.waterList = []
				const mescroll = this.$refs.mescroll.mescroll
				mescroll.resetUpScroll()
			},
			//商品详情页
			detailsClck(item,index){
				const id = item.id
				uni.navigateTo({
					url:`BarterInfo?id=${id}`
				})
			},
			openCitys(){
				this.$refs.popupRef.show()
				this.showDrawer = true
			},
			back_city(e) { 
				if (e !== 'no') {
					if(e.cityName != this.cityName){
						this.dealCity(e.cityName)
					}
				}
				this.$refs.popupRef.close();
				this.showDrawer = false
			},
			// 点击选择当前城市
			showCity(e){
				if(e != this.cityName){
					this.dealCity(e)
				} 
				this.$refs.popupRef.close()
				this.showDrawer = false
			},
			dealCity(e){
				if(e) this.cityName = e
				this.waterList = []
				this.current_3 = 0
				const mescroll = this.$refs.mescroll.mescroll
				mescroll.resetUpScroll()
			},
			getJingwei(){
				// 获取当前城市信息
				this.$store.dispatch('getWarpweft')
				.then(res => {
					const obj = res 
					this.cityNetwork = obj
					if(this.cityName == '获取中...'){
						this.cityName = obj.city
					}else if(this.cityName != obj.city){
						const city = obj.city
						this.modalText = `检测到您所在的城市为${city},是否切换？`
						this.show1 = true
					}					
					
					// 把城市存到缓存
					uni.setStorage({
						key:'localCity',
						data:obj
					})
					this.cityNetwork = obj
					if(this.$refs.mescroll){
						const mescroll = this.$refs.mescroll.mescroll
						mescroll.resetUpScroll()
					}else{
						// 手动获取数据
						this.getList(1,10,false,'')
					}
				}).catch(err => {
					console.log(err)
					if(err == 0){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('获取位置信息失败，请检查您的网络和定位是否开启',{duration:'long'})
						// #endif
					}
					
					
				})
			},
			// 切换城市
			changeCity(){
				const city = this.cityNetwork.city
				this.cityName = city
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
				const cate_id = this.tabs_3[this.current_3].id
				this.getList(pageNum,pageSize,mescroll,cate_id)
			},
		}
	}
</script>

<style lang="less" scoped>
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
		box-sizing: border-box;
		width: 100%;
		padding: 28upx;
		display: flex;
		flex-wrap: wrap;
	}
	
	.tui-product-container {
		margin-right: 16rpx;
		background-color: #FFFFFF;
		width: 338upx;
		overflow: hidden;
		border-radius: 12rpx;
		box-shadow:0 0 5px rgba(0, 0, 0, 0.1);
		margin-bottom: 25rpx;
	}
	
	.tui-product-container:nth-child(2n) {
		margin-right: 0;
	}
	
	
	.tui-pro-img {
		width: 100%;
		display: block;
	}
	.tui-test{
		padding: 15upx;
		width: 330upx;
		font-size: 30upx;
	}
	
	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}
	
	.tui-pro-tit {
		font-size: 30upx;
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
	
	
	
	/*
	
		复制部分
	*/
   .water-fill {
   	.water-wrapper {
   		.water-box {
   			display: flex;
   			width: 100%;
   			box-sizing: border-box;
   			font-size: 0;
   			justify-content: space-between;
   			background-color: #f5f8f9;
   			padding: 10px 5px;
   
   			.water-sub {
   				display: flex;
   				width: 49%;
   				overflow: hidden;
   				flex-direction: column;
   
   				.water-item {
   					width: 100%;
   					border-radius: 12upx;
   					overflow: hidden;
   					background-color: #FFFFFF;
   					margin-bottom: 24upx;
					box-shadow:0 0 5px rgba(0, 0, 0, 0.1);
   
   					.water-top {
   						.top-cover {
   							width: 100%;
   						}
   
   						.top-title {
   							font-family: PingFangHK-Medium;
   							font-size: 28upx;
   							font-weight: 600;
   							line-height: 40upx;
   							color: #333333;
   							text-align: justify;
   							margin: 20upx;
   							.n-ellipsis(2);
   						}
   					}
   
   					.water-bottom {
   						display: flex;
   						justify-content: space-between;
   						margin: 0 20upx 20upx 20upx;
   						font-size: 24upx;
   
   						.water-bottom-item {
   							display: flex;
   							align-items: center;
   
   							.img-box {
   								display: flex;
   								align-items: center;
   								justify-content: center;
   								width: 50upx;
   								height: 50upx;
   								border-radius: 50%;
   								overflow: hidden;
   
   								.water-avatar {
   									width: 50upx;
   								}
   							}
   
   							.water-name {
   								max-width: 160upx;
   								padding-left: 10upx;
   								overflow: hidden;
   								white-space: nowrap;
   								text-overflow: ellipsis;
   							}
   
   							.water-num {
   								line-height: 32upx;
   								font-size: 24upx;
   								color: #333;
   								margin-left: 14upx;
   							}
   
   							.bottom-good {
   								width: 28upx;
   								height: 28upx;
   							}
   						}
   					}
   				}
   			}
   		}
   	}
   
   	.water-none {
   		position: fixed;
   		top: 0;
   		bottom: 0;
   		width: 100%;
   		display: flex;
   		justify-content: center;
   		align-items: center;
   		flex-direction: column;
   
   		.no-data {
   			width: 200upx;
   			height: 200upx;
   		}
   
   		.no-word {
   			padding-top: 40upx;
   			font-size: 24upx;
   			color: #999;
   		}
   	}
   }
   
   
   //多行文本省略
   .n-ellipsis(@n) {
   	overflow: hidden;
   	display: -webkit-box;
   	-webkit-line-clamp: @n;
   	-webkit-box-orient: vertical;
   	text-overflow: ellipsis;
   	word-break: break-all;
   }
</style>
