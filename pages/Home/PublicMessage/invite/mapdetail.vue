<template>
	<view class="contain" v-if="info.length">
				 <map id="map" ref="map" v-if="isMap" style="width: 100%; height:700upx;" :polyline="polyline" :controls="mapControls" :latitude="latitude" :longitude="longitude" :markers="covers" @controltap="controltap">
				</map>
				<view class="zp-contain">
					<scroll-view scroll-y="true" class="zp-scroll">				
						<view class="zp-1 m-t" @click="changeLine(item)" hover-class="havor-class" v-for="(item,index) in info">
							<view class="zp-text zp-text-title"><text><text class="zp-tishi">职位名称: </text>{{item.title}}</text>
								<text class="text-red text-sm">{{isItemChoose(item)}}</text>
							</view>
							<view class="zp-text"><text class="zp-tishi">工作地点：</text>{{item.address}}</view>
							<view class="zp-text zp-km margin-bottom">
									<text class="lg text-red cuIcon-location">{{item.km}}千米</text>
									
									<text class="min-km">{{isMinDistance(item)}}</text>
							</view>
							<view class="zp-icon">
								<view @click="goNavigation(item)" class="zp-bottom">
									<text class="lg zp-icon-item text-black cuIcon-location"></text>
									<text>导航</text>
								</view>
								<view @tap="goPhone(item)" class="zp-bottom">
									<text class="lg zp-icon-item text-black cuIcon-phone"></text>
									<text>咨询</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	import { inviteDetail } from '@/network/invite'
	
	import { getlocation } from '@/utils/getLocation'
	export default{
		components:{
			uniPopup
		},
		data(){
			return{
				data:'一、【薪资待遇】：\n1、短期工：140-160/天可申请长白班，包吃住；按天计算工资，做满时间，可结现。\n2、场施工：试用期工资3500-3800，一个月转正后3800元-5680元。\n二、招聘要求：\n1、年龄16-48周岁，男女不限\n2、学历不限，身体健康、服从工作安排',
				token:'',
				info:[],
				type:'',
				title: 'map',
				latitude:'' ,
				longitude:'' ,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '/static/logo/logo.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '/static/logo/logo.png'
				}],
				mapControls:[{
						position:{
							left:15,
							top:35,
							width:34,
							height:34
						},
						id:1,
						iconPath:'/static/iconfont/mylocation.png',
						clickable:true
					},
				],
				isMap:false,
				m_latitude:'',
				m_longitude:'',
				polyline:[]
			}
		},
		onLoad() {
			const List = this.$store.state.publicMessage
			if(List.length){
				this.setmap(List)
			}else{
				// #ifdef APP-PLUS
				plus.nativeUI.toast("网络好像出了点问题");
				// #endif
			}
		},
		methods:{
			goMessage(){
				uni.makePhoneCall({
					phoneNumber:this.info.phone
				})
			},
			// 设置地图信息
			setmap(List){
				this.isMap = false
				const {latitude,longitude} = this.$store.state.userInfo.address
				this.m_latitude = latitude
				this.m_longitude = longitude
				this.latitude = latitude
				this.longitude = longitude
				let arr = List.map(x => {
					const arr = x.coord.split(',')
					return {
						latitude: arr[0],
						longitude: arr[1],
						iconPath: '/static/iconfont/location.svg',
						width:40,
						height:40,
						callout:{
							content	:x.title,
							fontSize:16,
							borderRadius:10,
							color:'#333333',
							padding:10,
							display:'ALWAYS'
							}
					}
				})
				arr.unshift({
					latitude:this.m_latitude,
					longitude: this.m_longitude,
					iconPath: '/static/iconfont/mylocation2.png',
					width:40,
					height:40,
					callout:{
						content	:'我的位置',
						fontSize:16,
						borderRadius:10,
						color:'#333333',
						padding:10,
						display:'ALWAYS'
						}
				}) 
				let isChooseObj = List.find(x => x.isChoose)
				this.polyline = [{
					points:[
						{latitude: this.m_latitude, longitude: this.m_longitude},
						{latitude: isChooseObj.coord.split(',')[0], longitude: isChooseObj.coord.split(',')[1]}
					],
					color:'#CD3233',
					width:'20',
					dottedLine:true,
					arrowLine:true,
					borderWidth:20
				}]	
				console.log(arr)
				this.covers = arr
				
				this.info = List
				
				
				
				this.$nextTick(() => {
					this.isMap = true
				})
				
			},
			// 切换线路
			changeLine(item){
				if(!item.isChoose){
					this.info.forEach(x => {
						x.isChoose = false
					})
					this.isMap = false
					this.polyline = [{
						points:[
							{latitude: this.m_latitude, longitude: this.m_longitude},
							{latitude: item.coord.split(',')[0], longitude: item.coord.split(',')[1]}
						],
						color:'#CD3233',
						width:'20',
						dottedLine:true,
						arrowLine:true,
						borderWidth:20
					}]	
					item.isChoose = true
					this.$nextTick(() => {
						this.isMap = true
					})
				}
			},
			//返回我的位置 
			controltap(){
				this.isMap = false
				this.latitude = this.m_latitude
				this.longitude = this.m_longitude
				this.$nextTick(() => {
					this.isMap = true
				})
				
			},
			// 吊起地图
			goNavigation(item){
				// getlocation({
				// 	name:item.title,
				// 	success:(res) => {
				// 		console.log(res)
				// 	} 
				// })
				
				
				const arr = item.coord.split(',')
				// 调用地图导航：
				uni.openLocation({
				latitude: arr[0]*1,
				longitude: arr[1]*1,
				success: (res) => {
					console.log(res);
					var map = uni.createMapContext('map');
					map.moveToLocation();
				},
				})
			},
			// 打电话
			goPhone(item){
				uni.makePhoneCall({
					phoneNumber:item.phone
				})
			},
			// 是否显示最近距离
			isMinDistance(item){
				if(item.km){
					// 查询数组中所有元素的最大值
					return item.km <= Math.min.apply(Math, this.info.map(o => o.km)) ? '距您最近' : ''
				}
			},
			// 是否显示选中
			isItemChoose(item){
				return item.isChoose ? '当前选中' : ''
			}
		}
	}
</script>

<style lang="scss">
	page,.contain{
		height: 100%;
		overflow: hidden;
		background-color: #f5f5f5;
	},
	.inviteDetail-image{
		height: 40upx;
		width: 40upx;
	}
	.m-t{
		margin-top: 20upx;
	}
	.text-line-height{
		line-height: 42upx;
	}
	.invitedetail-button{
		height:88upx;
		line-height: 88upx;
		color: #FFFFFF;
		text-align: center;
		font-size: 36upx;
		background:rgba(205,50,51,1);
		border-radius:10upx;
	}
	.s-content{
		height: 460upx;
		background-color: #fff;
	}
	.t1{
		.tishi-text{
			color: $uni-text-color;
			font-weight: 700;
			font-size: $uni-font-size-base;
		}
	}
	.zp-contain{
		position: fixed;
		top: 710upx;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background-color: #f5f5f5;
	}
	.zp-info{
		height:calc( 100% - 65px );
		padding: 0 20upx;
	}
	.zp-1{
		background-color: #fff;
		border-radius: 10upx;
		padding: 20upx 15upx;
		color: #999;
		line-height: 1.8;
		font-size: $uni-font-size-base;
	}
	.zp-tishi{
		color: #999;
		font-size: 28upx;
	}
	.go-message{
		position: fixed;
		bottom: 25upx;
		left: 15upx;
		right:15upx;
		background-color: #CD3233;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		color: #fff;
		font-size: 36upx;
		border-radius: 10upx;
		z-index: 1;
	}
	.zp-text{
		color: #333;
		font-size: 30upx;
	}
	.zp-scroll{
		height: 100%;
		padding:0 20upx;
	}
	.zp-icon{
		display: flex;
		justify-content: space-between;
		color: #333;
		font-size: 30upx;
		padding: 0 30upx;
		line-height: 1.8;
		.zp-bottom{
			
		}
		.zp-icon-item{
			margin-right: 5upx;
			font-weight: 600;
			font-size: 30upx;
		}
	}
	.min-km{
		color: #999;
		text-align: right;
		font-size: 28upx;
	}
	.zp-km{
		display: flex;
		justify-content: space-between;
		
	}
	.zp-text-title{
		display: flex;
		justify-content: space-between;
	}
</style>
