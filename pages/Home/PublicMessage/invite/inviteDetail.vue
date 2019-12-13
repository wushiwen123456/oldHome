<template>
	<view v-if="Object.keys(info).length != 0" class="contain">
		<view v-if="type == 1" >
			<!-- <view class="bg-white padding margin-tb-sm">
				<view class="t1 margin-bottom margin-tb-xs text-wuer text-lg"><text class="tishi-text">职位： </text>{{info.job}}</view>
				<view class="t1 margin-bottom margin-tb-xs text-red text-lg"><text class="tishi-text">薪资： </text>{{info.see == 1 ? '面议' : info.min + '-' + info.max}}</view>
				<view class="t1 margin-bottom margin-tb-xs text-wuer"><text class="tishi-text">工作地点： </text>{{info.address}}</view>
			</view>
			<view class="padding bg-white">
				<view class="flex align-center ">
					<image class="inviteDetail-image margin-right-sm" src="/static/2333.png"></image>
					<view class="text-wuer text-lg text-bold">职位描述</view>	
				</view>
				<view>
					<scroll-view scroll-y class="s-content">
						<view>
							<text>{{info.content}}</text>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="margin-lr-sm invitedetail-button" @click="goMessage">立即联系</view> -->
				<!-- <map class="map-content" :latitude="weidu" :longitude="jingdu" :markers='markers'>
					<cover-view>
						<view class="margin-lr-sm invitedetail-button" @click="popClick">立即联系(电话联系)</view>
						<uni-popup ref="poptop" type="center">
							<view class="zp-info">
								<view class="zp-job">
									{{info.job}}
								</view>
							</view>
						</uni-popup>
					</cover-view>
				</map> -->
				 <map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
				<view class="zp-contain">
					<scroll-view scroll-y  class="zp-info">
						<view class="zp-1 m-t">
							<view><text class="zp-tishi">职位名称: </text>{{info.job}}</view>
							<view><text class="zp-tishi">工作地点：</text>{{info.xxaddress}}</view>
							<view><text class="zp-tishi">联系人： </text>{{info.name}}</view>
						</view>
						<view class="zp-1 m-t">
							<view class="zp-tishi">工作描述</view>
							<view>
								{{info.content}}
							</view>
						</view>
						
					</scroll-view>
				</view>
				<view class="go-message" @click="goMessage">立即联系(电话联系)</view>
		</view>
		<view v-else>
			<view class="bg-white padding margin-tb-sm">
				<view class="text-df margin-bottom-xs">姓名： {{info.name}}</view>
				<view class="text-df margin-tb-xs">目标职位： {{info.job}}</view>
				<view class="margin-bottom margin-tb-xs text-wuer text-lg text-bold">{{info.title}}</view>
				<view class="margin-bottom margin-tb-xs">年龄： {{info.birth}} 岁</view>
				<view class="margin-bottom margin-tb-xs">期望地点： {{info.xxaddress}}</view>
				<view> <text>薪资要求： </text><text class="text-red text-bold">{{info.see == 0 ? '面议' : info.min + '-' + info.max}}</text></view>
			</view>
			<view class="padding bg-white">
				<view class="flex align-center ">
					<image class="inviteDetail-image margin-right-sm" src="/static/2333.png"></image>
					<view class="text-wuer text-lg text-bold">工作经历</view>	
				</view>
				<view>
					<scroll-view scroll-y class="s-content">
						<view>
							<text>{{info.content ? info.content : '暂无介绍'}}</text>
						</view>
						
					</scroll-view>
				</view>
			</view>
			<view class="margin-lr-sm invitedetail-button" @click="goMessage">立即联系(电话联系)</view>
		</view>
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	import { inviteDetail } from '@/network/invite'
	export default{
		components:{
			uniPopup
		},
		data(){
			return{
				data:'一、【薪资待遇】：\n1、短期工：140-160/天可申请长白班，包吃住；按天计算工资，做满时间，可结现。\n2、场施工：试用期工资3500-3800，一个月转正后3800元-5680元。\n二、招聘要求：\n1、年龄16-48周岁，男女不限\n2、学历不限，身体健康、服从工作安排',
				token:'',
				info:{},
				type:'',
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '/static/logo/logo.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '/static/logo/logo.png'
				}]
			}
		},
		onLoad(option) {
			const id = option.id
			this.type = option.type
			this.token = this.$store.getters.isToken
			this.inviteDetail(id,this.token)
			const weidu = this.$store.state.userInfo.address.latitude,
			jingdu = this.$store.state.userInfo.address.longitude
			if(weidu && jingdu){
				this.weidu = weidu 
				this.jingdu = jingdu
			}
			console.log(this.weidu,this.jingdu)
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.type == 1 ? '招聘详情' : '求职详情'
			})
		},
		methods:{
			inviteDetail(id,token){
				inviteDetail(id,token).then(res => {
					console.log(res)
					this.info = res.data.data
				})
			},
			goMessage(){
				uni.makePhoneCall({
					phoneNumber:this.info.phone
				})
			},
			popClick(){
				console.log('-----')
				this.$refs.poptop.open()
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
		top: 300px;
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
		color: $uni-text-color;
		font-weight: 600;
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
</style>
