<template>
	<view class="content">
		<image class="native-banner" src="../../../static/laojiatchang.png"></image>
		<!-- 头部四位 -->
		<view class="bg-white grid margin-bottom-xs text-center col-4">
			<view @tap="nativeClick(vo,key)" class="native-image-all" v-for="(vo,key) in titleList" :key="key">
				<image :src="vo.image"></image>
				<view>{{vo.label}}</view>
			</view>
		</view>
		<!-- 列表 -->
		<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption" :top="480">
			<view @click="itemClick(item)" class="flex align-center bg-white padding margin-top-xs" v-for="(item,index) in hotList" :key = 'index'>
				<view class="native-list-image">
					<image :src="item.image"></image>
				</view>
				<view class="margin-left-sm text-width">
					<view class="text-sm-erliu text-black text-hide"><text v-if="item.is_hot == 1" class="bg-grey text-xs padding-lr-xs margin-right-sm native-txt-red">{{item.province}}特产</text>{{item.store_name}}</view>
					<view class="navtive-center">200g</view>
					<view class="flex align-center justify-between">
						<view class="text-price text-bold text-red text-lg" >{{item.price}}</view>
						<view class="text-jiujiujiu text-sm">销量{{item.stock}}</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
		
		<!-- 加载 -->
		<uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more>
		
		<!-- 顶部弹出 -->
		<uni-popup ref="popup" type="top" class="popModel">
			<view class="padding">
				<view class="grid text-center col-4 native-address-all" >
					<view class="margin-top-sm" v-for="(vo,keyTop) in topList" :key="keyTop">
						<view @click="keyTopClick(vo,keyTop)" :class="{'navtive-select':keyTop == currentIndex}" class="native-address flex align-center justify-center">{{vo.label}}</view>
					</view>
				</view>
			</view>
		</uni-popup>
		 <x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	// 下拉刷新
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	
	// 工具
	import {replaceImage} from '@/utils/dealUrl'
	
	
	// 获取数据
	import {getDetailData} from '@/network/Home'
	
	// 获取省
	import province from '@/components/w-picker/city-data/province'
	
	export default{
		components: {
			uniPopup,
			uniLoadMore,
			MescrollUni
		},
		data(){
			return{
				loadingimg:false,//login加载
				loadingType:1,//login状态
				titleList:[],
				topList:[],
				hotList:[],
				pages:1,
				limit:5,
				currentIndex:0,
				province:'',
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
				hasNext:true
			}
		},
		onLoad(e) {
			this.province = e.province || ''
		},
		onReady() {
			this.$refs.loading.open()
		},
		methods:{
			// 获取省份
			getProvince(province){
					
						const titleArr = []
						const othersArr = []
						province.forEach(x => {
							let label = x.label
							label = label.replace(/(['省''市'('自治区')'馆'])/g,'')+'馆'

							// if(x.label == '河南馆' || x.label == '上海馆' || x.label == '陕西馆'){
							// 	switch(x.label)
							// 	titleArr.push(x)
							// }else{
							// 	othersArr.push(x)
							// }
							
							switch (label){
								case '河南馆':
									x.image = '/static/nativea.png'
									titleArr.push(x)
									break
								case '上海馆':
									x.image = '/static/nativeb.png'
									titleArr.push(x)
									break
								case '陕西馆':
									x.image = '/static/nativec.png'
									titleArr.push(x)
									break
								default:
									othersArr.push(x)
									break
							}
							
						})
						titleArr.push({
							image:'/static/natived.png',
							label:'其他'
						})
						console.log(titleArr)
						this.titleList = titleArr
						this.topList = othersArr
					
			},
			detalHotitem(item){
				if(item.is_hot){
					item.province = item.province.replace(/(['省''市'('自治区')])/g,'')
				}
			},
			// 点击商品跳转
			itemClick(item){
				uni.navigateTo({
					url:`../../ShopDetails/shopDetails?id=${item.id}`
				})
			},
			// 动态添加样式，
			// 头部列表点击跳转
			keyTopClick(vo,keyTop){
				this.currentIndex = keyTop
				uni.navigateTo({
					url:'address?id=' + vo.value + '&name=' + vo.label
				})
			},
			// 点击热门列表跳转
			nativeClick(vo,key){
				if(key==3){
					this.outloginSharClick()
					return
				}
				uni.navigateTo({
					url:'address?id=' + vo.value + '&name=' + vo.label
				})
			},
			//地区弹出
			outloginSharClick(){
				this.$refs.popup.open()
			},
			//地区弹出关闭
			closePopupsSharClick(){
				this.$refs.popup.close()
			},
			
			// 商品列表
			getDetailData(pageNum,pageSize,mescroll){
				getDetailData({
					limit:pageSize,
					page:pageNum,
					is_hot:1,
					province:this.province
				}).then(res => {
					this.$refs.loading.close()
					if(res.data.code == 200){
						let obj	= res.data.data
						if(obj.length){
							obj.forEach(x => {
								x.image = replaceImage(x.image)
								this.detalHotitem(x)
							})
						}
						if(obj.length < pageSize){
							this.hasNext = false
						}else{
							this.hasNext = true
						}
						if(pageNum == 1) this.hotList = [];
						// 处理省份
						this.getProvince(province)
						this.hotList = this.hotList.concat(obj)
						mescroll.endSuccess(obj.length, this.hasNext);
					}
				})
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
				this.getDetailData(pageNum,pageSize,mescroll)
			},
		}
	}
</script>

<style>
	page,.content{
		height: 100vh;
		overflow: hidden;
	}
	.native-banner{
		height: 256upx;
		width: 100%;
	}
	.native-image-all{
		padding:40upx 0 ;
	}
	.native-image-all image{
		height: 92upx;
		width: 92upx;
	}
	.native-list-image image{
		height: 180upx;
		width: 180upx;
	}
	.native-address{
		width: 140upx;
		height: 60upx;
		background: #F8F8F8;
		color: #333;
	}
	.native-txt-red{
		width:86upx;
		height:40upx;
		background:rgba(205,50,51,1);
		border-radius:16upx;
		font-size: 20upx;
	}
	.text-hide{
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
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
	.navtive-select{
		width: 140upx;
		height: 60upx;
		background: #CD3233;
		color: #FFF;
	}
	.popModel{
		position: fixed;
		top: 42px;
	}
</style>
