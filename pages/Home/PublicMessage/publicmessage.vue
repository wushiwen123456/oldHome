<template>
	<view>
		<view>
			<view class="bg-white margin-top-xs">
				<view class="public-title-txt-bottom">
					<view class="margin-left flex align-center public-title-txt">
						<image class="public-title-all-image" src="../../../static/publicl.png"></image>
						<view class="text-bold text-lg">公共服务</view>
					</view>
				</view>
				<view class="grid padding-bottom text-center col-5">
					<view @click="goPhone(voList)" v-for="(voList,keylist) in publicList" :key="keylist">
						<view class="public-title-all">
							<image :src="voList.image"></image>
							<view>{{voList.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex align-center margin-tb-xs justify-between">
				<view class="flex align-center justify-center public-two-all bg-white" @click="goZhaoPin">
					<image src="../../../static/publicv.png"></image>
					<view>招聘信息</view>
				</view>
				<view class="flex align-center justify-center public-two-all bg-white" @click="goGongqiu">
					<image src="../../../static/publicu.png"></image>
					<view>供求信息</view>
				</view>
			</view>
		</view>
		<view>
			<block v-for="(item,index) in dataList" :key="index">
				<tui-collapse :index="index" :current="current" :disabled="item.disabled" @click="change3">
					<template v-slot:title>
						<tui-list-cell >
							<view class="flex align-center">
								<image class="public-title-all-image" :src="item.image || ''"></image>
								<view class="text-bold">{{item.name}}</view>
							</view>
						</tui-list-cell>
					</template>
					<template v-slot:content>
						<view class="bg-white">
							<view class="margin-lr padding-top-sm">
								<view class="grid text-center col-3">
									<block v-for="(vo,key) in item.intro" :key="key">
										<view @tap="publicdetailClick(vo)" class="public-button">{{vo.cate_name}}</view>
									</block>
								</view>
							</view>
						</view>
					</template>
				</tui-collapse>
			</block>
		</view>
		 <x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>
	import tuiCollapse from "@/components/tui-collapse/tui-collapse"
	import tuiListCell from "@/components/list-cell/list-cell"
	
	// 数据获取
	import { pubsicGood,pubDetailData } from '@/network/Home'
	export default{
		components: {
			tuiCollapse,
			tuiListCell
		},
		data(){
			return{
				token:'',
				userInfo:{
					username:'',
					address:{
						
					},
				},	
				
				dataList: [],
				//手风琴效果
				current: -1,
				publicList:[
				{
					image:'../../../static/publica.png',
					name:'报警电话',
					phone:'110'
				},{
					image:'../../../static/publicb.png',
					name:'火警电话',
					phone:'119'
				},{
					image:'../../../static/publicc.png',
					name:'急救电话',
					phone:'120'
				},{
					image:'../../../static/publicd.png',
					name:'交通事故',
					phone:'122'
				},{
					image:'../../../static/publice.png',
					name:'高速救援',
					phone:'12122'
				},{
					image:'../../../static/publicf.png',
					name:'供电线路',
					phone:'13713257960'
				},{
					image:'../../../static/publicg.png',
					name:'供暖电话',
					phone:'68890222'
				},{
					image:'../../../static/publich.png',
					name:'燃气公司',
					phone:'037163796760'
				},{
					image:'../../../static/publicj.png',
					name:'有线电视',
					phone:'96196'
				},{
					image:'../../../static/publick.png',
					name:'供水电话',
					phone:'037167680000'
				},],
				cateList:[],
				jingdu:'',
				weidu:''
			}
			
		},
		onLoad(){
			if(this.$store.getters.isToken){
				this.token = this.$store.getters.isToken
				// 调用接口和获取当前地理位置
				this.$store.dispatch('getUserLocation').then(res => {
					this.dealWps(res)
				}).catch(err => {
					// #ifdef APP-PLUS
					plus.nativeUI.toast('获取地理位置失败',{duration:'long'})
					// #endif
					if(this.$refs.loading){
						this.$refs.loading.close()
					}
					uni.navigateBack()
				})

				
				
				
			}else{
				uni.showModal({
					title:'是否去登陆？',
					content:'此部分内容需要登陆查看',
					success:(res) => {
						if(res.confirm){
							uni.navigateTo({
								url:'../../login/login'
							})
						}
					}
				})
			}
		},
		onReady() {
			this.$refs.loading.open()
		},
		methods:{
			goGongqiu(){
				uni.navigateTo({
					url:'supply/supply'
				})
			},
			goZhaoPin(){
				uni.navigateTo({
					url:'invite/invite'
				})
			},
			change3(e) {
				//可关闭自身
				this.current = this.current == e.index ? -1 : e.index
			},
			// 拨打电话
			goPhone(vo){
				uni.makePhoneCall({
					phoneNumber:vo.phone
				})
			},
			// 根据经度纬度确定位置
			dealWps(address){
				// 发送给vuex进行存储
				this.$store.commit('setUserAddress',address)
				
				const {latitude,longitude} = address
				
				// 根据地区获取数据
				this.pubsicGood({
					latitude,longitude
				},this.token)
			},
			// 获取分类信息数据
			pubsicGood(location,token){
				pubsicGood(location,token).then(res => {
					this.$refs.loading.close()
					if(res.data.code == 200){
						const list = res.data.data
						this.dataList = list.map(x => {
							return {
								name:x.cate_name,
								image:x.pic || '',
								intro:x.son,
								disabled:false
							}
						})
																		
					}
				})
			},
			//信息详细页面
			publicdetailClick(item){
				uni.navigateTo({
					url:'publicdetail?id=' + item.id
				})
			},
		}
	}
</script>

<style lang="scss">
	.header{
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		text{
			padding: 0 40upx;
		}
	}
	.tui-content {
		padding: 20rpx 30rpx;
		background: #fff;
		color: #555;
		font-size: 26rpx;
	}
	.public-button{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20upx;
		height:66upx;
		border:1px solid rgba(225,225,225,1);
		border-radius:34upx;
		color: #333333;
		font-size: 28upx;
	}
	.public-title-all image{
		margin-top: 40upx;
		width: 70upx;
		height: 70upx;
	}
	.public-title-txt{
		height: 100upx;
	}
	.public-title-txt-bottom{
		border-bottom: #E1E1E1 1px solid;
	}
	.public-title-all-image{
		margin-right: 10upx;
		width: 50upx;
		height: 50upx;
	}
	.public-two-all{
		height: 140upx;
		width: 49%;
	}
	.public-two-all image{
		height: 48upx;
		width: 48upx;
		margin-right: 16upx;
	}
</style>
