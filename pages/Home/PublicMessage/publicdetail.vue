<template>
	<view>	
		<!-- 列表项 -->
		<view v-if="currentTab == 0">
			<view v-for="(vo,key) in List" @click="goMap(vo)" :key="key" class="flex align-center justify-between bg-white piblic-height margin-top-xs padding-lr">
				<view>
					<view class="text-wuer text-lg text-bold margin-bottom-xs">{{vo.title}}</view>
					<view class="text-jiujiujiu text-sm-erliu">{{vo.address}}</view>
				</view>
				<view class="flex flex-direction align-end">
					<view class="text-jiujiujiu text-sm" v-if="vo.km">距离您{{vo.km}}千米</view>
					<view @click.stop="callPhone(vo.phone)" class="flex align-center public-phone-button">
						<image src="../../../static/codephone.png"></image>
						<view>联系它</view>
					</view>
				</view>
			</view>
		</view>			
		 <x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>	
	import { pubDetailData } from '@/network/Home'
	export default{
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
				latitude: '',
				longitude:'',
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
							top:25,
							width:34,
							height:34
						},
						id:1,
						iconPath:'/static/iconfont/mylocation.png',
						clickable:true
					
					},
				],
			}
		},
		onLoad(option) {
			const token = this.$store.getters.isToken,
			id = option.id,
			{latitude,longitude} = this.$store.state.userInfo.address
			// // 测试专用
			//  this.latitude = latitude,
			// this.longitude = longitude
			
			// this._latitude = latitude
			// this._longitude = longitude
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
				pubDetailData(obj,token)
				.then(res => {
					this.$refs.loading.close()
					if(res.data.code == 200){
						let arr = res.data.data
						arr.forEach(x => {
							x.isChoose = false
						})
						this.List = arr
					}
				}).catch(err => {
					this.$refs.loading.close()
				})
			},
			// 进入详情页
			goMap(vo){
				this.List.forEach(x => {
					x.isChoose = false
				})
				vo.isChoose = true
				this.$store.commit('setPublicMessage',this.List)
				uni.navigateTo({
					url:'invite/mapdetail'
				})
			},
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
		height: 600upx;
		width: 100%;
		position: fixed;
		top: 44px;
	}
	.cov-content{
		position: fixed;
		top: 600upx;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background-color: #f5f5f5;
		
		.shop-title{
			color: #999;
			font-size: 28upx;
			height: 50upx;
			line-height: 1.8;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.st-arrow{
				transition: 0.5s ease-in-out;
			}
		}
		.shop-content{
			display: flex;
			flex-direction: column;
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
	.scroll-shop-wrapper{
		height: calc(100% - 25px);
	}
	.shop-c{
		height: 220upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
