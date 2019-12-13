<template>
	<view>
		<tui-tabs class="tui" selectedColor="#D14243" sliderBgColor="#D14243" :tabs="navbar" :currentTab="currentTab" @change="change" itemWidth="50%"></tui-tabs>
		
		<!-- 列表项 -->
		<view v-if="currentTab == 0">
			<view v-for="(vo,key) in List" :key="key" class="flex align-center justify-between bg-white piblic-height margin-top-xs padding-lr">
				<view>
					<view class="text-wuer text-lg text-bold margin-bottom-xs">{{vo.title}}</view>
					<view class="text-jiujiujiu text-sm-erliu">{{vo.address}}</view>
				</view>
				<view class="flex flex-direction align-end">
					<view class="text-jiujiujiu text-sm" v-if="vo.km">距离您{{vo.km}}千米</view>
					<view @tap="callPhone(vo.phone)" class="flex align-center public-phone-button">
						<image src="../../../static/codephone.png"></image>
						<view>联系它</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 地图项 -->
		<view v-else class="map-option">
			<map class="map-item" :latitude="latitude" :longitude="longitude" :controls="mapControls" @markertap="markertap" @controltap="controltap" :markers="covers">
				
				
				
				
				
				<cover-view class="cov-content">
					<view class="shop-title">已选门店</view>
					<view class="shop-content">
						<image src="../../../static/1.png" class="s-image"></image>
						<view class="s-text">
							<view class="sg s-text-title">郑州紫荆山旗舰店</view>
							<view class="sg s-text-address">河南省郑州市是是是是舒服的是是是是是是是是是是是是是是是</view>
							<view class="s-text-bottom flex justify-between">
								<view class="text-red text-bold">
									<text class="lg cuIcon-locationfill"></text>
									<text>165m</text>
								</view>
								<text class="s-text-my">距您最近</text>
							</view>
						</view>
					</view>
					<view class="shop-bottom">
						<view class="shop-item">
							<text class="lg cuIcon-home"></text>
							<text class="shop-item-text">进店</text>
						</view>
						<view class="shop-item">
							<image src="/static/iconfont/icon-navigation.svg" mode=""></image>
							<text class="shop-item-text">导航</text>
						</view>
						<view class="shop-item">
							
							<text class="lg cuIcon-phone"></text>
							<text class="shop-item-text">咨询</text>
						</view>
					</view>
				</cover-view>
			</map>
		</view>
	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	
	import { pubDetailData } from '@/network/Home'
	export default{
		components:{
			tuiTabs
		},
		data(){
			return{
				loadingimg:false,//login加载
				loadingType:1,//login状态
				List:[],
				page:1,
				navbar:[{
					name:'列表',
					cate:0
				},{
					name:'地图',
					cate:1
				}],
				currentTab:0,
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '/static/iconfont/location.svg',
					width:28,
					height:24,
					callout:{
						content	:'北京天安门',
						fontSize:14,
						borderRadius:10,
						color:'#999',
						padding:10
					}	
				}],
				mapControls:[{
						position:{
							left:15,
							top:15
						},
						id:1,
						iconPath:'/static/iconfont/navgation.svg',
						clickable:true
					
					},
				]
			}
		},
		onLoad(option) {
			const token = this.$store.getters.isToken,
			id = option.id,
			{latitude,longitude} = this.$store.state.userInfo.address
			// 获取信息
			this.pubDetailData({
				cate:id,
				jingdu:longitude,
				weidu:latitude,
				page:this.page,
				limit:10
			},token)
		},
		methods:{
			callPhone(phone){
				console.log('已拨打电话')
				uni.makePhoneCall({
				    phoneNumber: phone
				});
			},
			// 根据位置信息获取数据
			pubDetailData(obj,token){
				console.log(obj)
				pubDetailData(obj,token).then(res => {
					if(res.data.code == 200){
						this.List = res.data.data
					}
				})
			},
			change(e){
				this.currentTab = e.index
			},
			// 点击地图控件出发函数
			controltap(e){
				console.log(e)
				
				// latitude: 39.909,
				// longitude: 116.39742,
				this.latitude = 39.909
				this.longitude = 116.39742
			},
			// 点击标记地时触发 
			markertap(e) {
				console.log(e)
			}
			
		}
	}
</script>

<style lang="scss">
	.public-phone-button{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20upx;
		width:130upx;
		height:50upx;
		border:1px solid rgba(205,50,51,1);
		border-radius:8upx;
		color: #CD3233;
		font-size: 24upx;
	}
	.public-phone-button image{
		width: 26upx;
		height: 26upx;
		margin-right: 10upx;
	}
	.piblic-height{
		height: 162upx;
	}
	.map-item{
		height: 100vh;
		width: 100%;
	}
	.cov-content{
		position: fixed;
		bottom: 25upx;
		left: 15upx;
		right: 15upx;
		height: 300upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 20upx 25upx;
		.shop-title{
			color: #999;
			font-size: 28upx;	
			line-height: 1.8;
		}
		.shop-content{
			height: 200upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #999;
			font-size: 28upx;
			image{
				width: 160upx;
				height:160upx;
				border-radius: 10upx;
				margin-right: 35upx;
			}
			.s-text{
				flex: 1;
				width: 230upx;
				line-height: 1.8;
				font-size: 28upx;
				color: #999;
				.sg{
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.s-text-title{
					font-size: 32upx;
					color: #333;
				}
			
			}
		}

	}
	.shop-bottom{
		display: flex;
		justify-content: space-between;
		height: 56upx;
		align-items: center;
		font-size: 32upx;
		padding: 0 35upx;
		color: #333;
		.shop-item{
			color: #333;
			.shop-item-text{
				margin-left: 5upx;
			}
		}
		image{
			width: 30upx;
			height: 30upx;
			vertical-align: -4upx;
		}
	}
</style>
