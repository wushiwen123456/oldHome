<template>
	<view class="margin-top-xs">
		<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-top="scrollTop" :style="{height:height+'px',top:top+'px'}">
			<view v-for="(item,index) in tabbar" :key="index" class="tab-bar-item" :class="{'active':currentTab==index}"
			 :data-current="index" @tap.stop="swichNav(item,index)">
				<text>{{item.label}}</text>
			</view>
		</scroll-view>
		<block>
			<scroll-view scroll-y class="right-box" :style="{height:height+'px',top:top+'px'}">
				<!--内容部分 start 自定义可删除-->
					
				<view class="class-item">
					<view class="class-name">全部县</view>																	
					<!-- 县区遍历 -->
					<view class="g-container">
						<view class="g-box" v-for="(vo,key) in currentList" :key="key">
							<view   @click="xianClick(vo,key)" class="g-title" :class="{'xian-curry' : key==xianCurry}">{{vo.label}}</view>
						</view>	
					</view>
					
					<!-- 商品遍历 -->
					<view  v-if="hotList.length" @tap='itemClick(item,index)' class="flex align-center bg-white padding margin-top-xs" v-for="(item,index) in hotList" :key = 'index'>
						<view class="native-list-image">
							<image :src="item.image"></image>
						</view>
						<view class="margin-left-sm text-width">
							<view class="text-sm-erliu text-black text-hide"><text class="bg-grey text-xs padding-lr-xs margin-right-sm native-txt-red">{{item.procince}}特产</text>{{item.store_name}}</view>
							<view class="navtive-center">200g</view>
							<view class="flex align-center justify-between">
								<view class="text-price text-bold text-red text-lg" >{{item.price}}</view>
								<view class="text-jiujiujiu text-sm">销量{{item.stock}}</view>
							</view>
						</view>
					</view>
				</view>
				<!--内容部分 end 自定义可删除-->
			</scroll-view>
		</block>
	</view>
</template>

<script>
	// 获取城市
	import  citys  from '@/components/w-picker/city-data/city'
	// 获取县区
	import area from '@/components/w-picker/city-data/area'
	
	// 获取数据
	import { getDetailData } from '@/network/Home'
	
	// 转换数据工具
	import { replaceImage } from '@/utils/dealUrl'
	export default {
		data() {
			return {
				tabbar: ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市"],
				height: 0, //scroll-view高度
				top: 0,
				currentTab: 0, //预设当前项的值
				scrollTop: 0 ,//tab标题的滚动条位置
				name:''  ,//当前场景name
				xianCurry:0,
				page:1,
				hotList:[],
				procince:""
			}
		},
		onLoad: function(options) {
			console.log(options)
			 this.province = options.name
			uni.setNavigationBarTitle({
			    title: options.name
			});
			setTimeout(() => {
				uni.getSystemInfo({
					success: (res) => {
						let header = 92;
						let top = 0;
						//#ifdef H5
						top = 44;
						//#endif
						this.height = res.windowHeight - uni.upx2px(header)
						this.top = top + uni.upx2px(header)
					}
				});
			}, 50)
			// 根据addressId获取城市
			this.getCitys(options.id)	
			// 默认加载第一页数据
			this.getDetailData(options.name,this.tabbar[this.currentTab].label,this.currentArea.label)
		},
		methods: {
			// 获取城市
			getCitys(id){
				const arr = []
				citys.forEach(x => {
					 x.forEach(x => {
						const a = x.value.slice(0,2)
						if(a == id){
							arr.push(x)
						}
					})
				})
				this.tabbar = arr
			},
			
			
			
			// 点击县标签切换样式
			xianClick(vo,key){
				this.xianCurry = key
				// 请求数据
				// 点击不同县进行加载数据
				this.getDetailData(this.province,this.tabbar[this.currentTab].label,this.currentArea.label)
			},
			
			// 点击标题切换当前页时改变样式,并加载数据
			swichNav(item,index){
				this.currentTab = index
				this.getDetailData(this.province,this.tabbar[this.currentTab].label,this.currentArea.label)	
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				let that = this;
				//这里计算按照实际情况进行修改，动态数据要进行动态分析
				//思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
				//数据很多可以多次if判断然后进行滚动距离计算即可
				if (that.currentTab > 7) {
					that.scrollTop = 500
				} else {
					that.scrollTop = 0
				}
			},
			detail(e) {
				uni.navigateTo({
					url: '../extend-view/productDetail/productDetail'
				})
			},
			productList(e) {
				let key = e.currentTarget.dataset.key;
				uni.navigateTo({
					url: '../extend-view/productList/productList?searchKey=' + key
				})
			},
			search: function() {
				uni.navigateTo({
					url: '../extend-view/news-search/news-search'
				})
			},
			// 根据区名加载数据
			getDetailData(province,city,area){
				console.log(province,city,area)
				getDetailData({
					is_hot:1,
					province:province.replace('馆',''),
					city,
					area,
					page:1
				})
				.then(res => {
					if(res.data.code == 200){
						// this.hotList = res.data.data.length ? res.data.data : []
						if(res.data.data.length){
							const obj = res.data.data
							
							obj.forEach(x => {
								x.image = replaceImage(x.image)
							})
							this.hotList = obj
						}else{
							this.hotList = []
						}
						
					}
				})
			},
			// 点击数据跳转到详情页
			itemClick(item,index) {
				if(!this.$store.getters.isToken){
					uni.showModal({
						title:'请先去登录',
						content:'',
						success: (res)=>  {
							if(res.confirm){
								uni.navigateTo({
									url:'../../login/login'
								})
							}
						}
					})
				}else{
					uni.navigateTo({
						url:`../../ShopDetails/shopDetails?id=${item.id}`
					})
				}
			}
		},
		computed:{
			// 获取当前县级数据
			currentList(){
				const arr = []
				area.forEach(x => {
					x.forEach(y => {
						y.forEach(z => {
							const a = z.value.slice(0,4)
							if(a == this.tabbar[this.currentTab].value)
							arr.push(z)
						})
					})
				})			
				return  arr
			},
			// 获取当前选中的县区id
			currentArea(){
				return this.currentList[this.xianCurry]
			}
		}
	}
</script>

<style>

	/* 左侧导航布局 start*/

	/* 隐藏scroll-view滚动条*/
	.native-list-image image{
		height: 180upx;
		width: 180upx;
	}
	.native-txt-red{
		width:86upx;
		height:40upx;
		background:rgba(205,50,51,1);
		border-radius:16upx;
		font-size: 20upx;
	}
	.navtive-center{
		width: auto;
		display:inline-block !important;
		display:inline;
		height: 40upx;
		line-height: 40upx;
		margin: 16upx 0;
		padding: 0 10upx;
		background: #F9F9F9;
		color: #999999;
		font-size: 22upx;
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tui-searchbox {
		width: 100%;
		height: 92upx;
		padding: 0 30upx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 100;
	}

	.tab-view {
		/* height: 100%; */
		width: 200upx;
		position: fixed;
		left: 0;
		z-index: 10;
	}

	.tab-bar-item {
		width: 200upx;
		height: 110upx;
		background: #FFF;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		color: #444;
		font-weight: 400;
	}

	.active {
		position: relative;
		color: #333333;
		font-size: 30upx;
		font-weight: 600;
		background: #F8F8F8;
	}

	.active::before {
		content: "";
		position: absolute;
		border-left: 8upx solid #E41F19;
		height: 100%;
		left: 0;
	}

	.xian-curry{
		background: #CD3233!important;
		color: #FFF;
	}

	/* 左侧导航布局 end*/

	.right-box {
		width: 100%;
		position: fixed;
		padding-left: 220upx;
		box-sizing: border-box;
		left: 0;
	}

	.page-view {
		width: 100%;
		overflow: hidden;
		padding-top: 20upx;
		padding-right: 20upx;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.swiper {
		width: 100%;
		height: 220upx;
		border-radius: 12upx;
		overflow: hidden;
		transform: translateZ(0);
	}

	/* #ifdef APP-PLUS || MP */
	.swiper .wx-swiper-dot {
		width: 8upx;
		height: 8upx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16upx;
		overflow: hidden;
	}

	.swiper .wx-swiper-dot-active::before {
		background: #fff;
	}

	.swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16upx;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>.swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	>>>.swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	>>>.swiper .uni-swiper-dot-active::before {
		background: #fff;
	}

	>>>.swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	.slide-image {
		width: 100%;
		height: 220upx;
	}

	.class-item {
		background: #fff;
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 20upx;
		margin-bottom: 20upx;
		border-radius: 12upx;
	}

	.class-name {
		font-size: 32upx;
		font-weight: bold;
	}

	.g-container {
		/* padding-top: 20upx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.g-box {
		width: 33.3333%;
		text-align: center;
		padding-top: 40upx;
	}

	.g-image {
		width: 120upx;
		height: 120upx;
	}

	.g-title {
		display: flex;
		align-items: center;
		justify-content: center;
		width:158upx;
		height:66upx;
		background:rgba(248,248,248,1);
		border-radius:10upx;
		font-size: 28upx;
	}
</style>
