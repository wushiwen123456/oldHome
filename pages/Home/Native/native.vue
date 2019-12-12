<template>
	<view>
		<image class="native-banner" src="../../../static/laojiatchang.png"></image>
		<!-- 头部四位 -->
		<view class="bg-white grid margin-bottom-xs text-center col-4">
			<view @tap="nativeClick(vo,key)" class="native-image-all" v-for="(vo,key) in titleList" :key="key">
				<!-- <image :src="vo.image"></image> -->
				<view>{{vo.label}}</view>
			</view>
		</view>
		<!-- 列表 -->
		<view>
			<view @click="itemClick(item)" v-if="hotList.length" class="flex align-center bg-white padding margin-top-xs" v-for="(item,index) in hotList" :key = 'index'>
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
		</view>
		
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
		
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	
	// 工具
	import {replaceImage} from '@/utils/dealUrl'
	
	
	// 获取数据
	import {getDetailData} from '@/network/Home'
	
	// 获取省
	import province from '@/components/w-picker/city-data/province'
	
	export default{
		components: {
			uniPopup,
			uniLoadMore
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
				currentIndex:0
			}
		},
		onLoad() {
			// 加载商品数据
			this.getDetailData()

		},
		methods:{
			// 获取省份
			getProvince(province){
					
						const titleArr = []
						const othersArr = []
						province.forEach(x => {
							
							x.label = x.label.replace(/(['省''市'('自治区')'馆'])/g,'')+'馆'

							if(x.label == '河南馆' || x.label == '上海馆' || x.label == '陕西馆'){
								titleArr.push(x)
							}else{
								othersArr.push(x)
							}
							
						})
						titleArr.push({
							image:'',
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
			getDetailData(){
				getDetailData({
					limit:this.limit,
					page:this.pages,
					isHot:1
				}).then(res => {
					if(res.data.code == 200){
						const obj	= res.data.data
						obj.forEach(x => {
							x.image = replaceImage(x.image)
							this.detalHotitem(x)
						})
						this.hotList = obj
						// 处理省份
						this.getProvince(province)
					}
				})
			}
		}
	}
</script>

<style>
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
