<template>
	<view>
		<image class="native-banner" src="../../../static/laojiatchang.png"></image>
		<!-- 头部四位 -->
		<view class="bg-white grid margin-bottom-xs text-center col-4">
			<view @tap="nativeClick(vo.id,vo.name)" class="native-image-all" v-for="(vo,key) in titleList" :key="key">
				<image :src="vo.image"></image>
				<view>{{vo.name}}</view>
			</view>
		</view>
		<!-- 列表 -->
		<view>
			<view class="flex align-center bg-white padding margin-top-xs">
				<view class="native-list-image">
					<image src="../../../static/d2af55055910151b4fa167be4a02681.png"></image>
				</view>
				<view class="margin-left-sm text-width">
					<view class="text-sm-erliu text-black text-hide"><text class="bg-grey text-xs padding-lr-xs margin-right-sm native-txt-red">江西特产</text>江西靖安白茶新茶   江西资溪珍稀 绿茶 正宗明前安吉茶江西靖安白茶新茶   江西资溪珍稀 绿茶 正宗明前安吉茶</view>
					<view class="navtive-center">200g</view>
					<view class="flex align-center justify-between">
						<view class="text-price text-bold text-red text-lg" >30.60</view>
						<view class="text-jiujiujiu text-sm">销量2000</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 加载 -->
		<uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more>
		
		<!-- 顶部弹出 -->
		<uni-popup ref="popup" type="top" >
			<view class="padding">
				<view class="grid text-center col-4 native-address-all" >
					<view class="margin-top-sm" v-for="(vo,keyTop) in topList" :key="keyTop">
						<view :class="[vo.type?'navtive-select':'native-address']" class="flex align-center justify-center">{{vo.name}}</view>
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components: {
			uniPopup,
			uniLoadMore
		},
		data(){
			return{
				loadingimg:true,//login加载
				loadingType:1,//login状态
				titleList:[{
					id:0,
					image:'../../../static/nativea.png',
					name:'河南馆'
				},{
					id:1,
					image:'../../../static/nativeb.png',
					name:'上海馆',
				},{
					id:2,
					image:'../../../static/nativec.png',
					name:'陕西馆'
				},{
					id:3,
					image:'../../../static/natived.png',
					name:'其他'
				}],
				topList:[{
						name:'北京馆',
						type:true
					},{
						name:'重庆馆',
						type:false
					},{
						name:'拉萨馆',
						type:false
					},{
						name:'厦门馆',
						type:false
					},{
						name:'台湾馆',
						type:false
					},{
						name:'北京馆',
						type:false
					},{
						name:'重庆馆',
						type:false
					},{
						name:'拉萨馆',
						type:false
					},{
						name:'厦门馆',
						type:false
					},{
						name:'台湾馆',
						type:false
					},{
						name:'北京馆',
						type:false
					},{
						name:'重庆馆',
						type:false
					},{
						name:'拉萨馆',
						type:false
					},{
						name:'厦门馆',
						type:false
					},{
						name:'台湾馆',
						type:false
					}]
			}
		},
		methods:{
			nativeClick(id,name){
				if(id==3){
					this.outloginSharClick()
					return
				}
				uni.navigateTo({
					url:'address?id=' + id + '&name=' + name
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
</style>
