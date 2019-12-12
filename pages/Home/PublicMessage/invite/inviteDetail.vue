<template>
	<view v-if="Object.keys(info).length != 0">
		<view v-if="type == 1">
			<view class="bg-white padding margin-tb-sm">
				<view class="text-df">{{info.job}}</view>
				<view class="margin-bottom margin-tb-xs text-wuer text-lg text-bold">{{info.title}}</view>
				<view class="text-red text-bold">{{info.see == 1 ? '面议' : info.min + '-' + info.max}}</view>
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
			<view class="margin-lr-sm invitedetail-button" @click="goMessage">立即联系</view>
		</view>
		<view v-else>
			<view class="bg-white padding margin-tb-sm">
				<view class="text-df margin-bottom-xs">姓名： {{info.name}}</view>
				<view class="text-df margin-tb-xs">目标职位： {{info.job}}</view>
				<view class="margin-bottom margin-tb-xs text-wuer text-lg text-bold">{{info.title}}</view>
				<view class="margin-bottom margin-tb-xs">电话： {{info.phone}}</view>
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
			<view class="margin-lr-sm invitedetail-button" @click="goMessage">立即联系</view>
		</view>
	</view>
</template>

<script>
	import { inviteDetail } from '@/network/invite'
	export default{
		data(){
			return{
				data:'一、【薪资待遇】：\n1、短期工：140-160/天可申请长白班，包吃住；按天计算工资，做满时间，可结现。\n2、场施工：试用期工资3500-3800，一个月转正后3800元-5680元。\n二、招聘要求：\n1、年龄16-48周岁，男女不限\n2、学历不限，身体健康、服从工作安排',
				token:'',
				info:{},
				type:''
			}
		},
		onLoad(option) {
			const id = option.id
			this.type = option.type
			this.token = this.$store.getters.isToken
			this.inviteDetail(id,this.token)
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.type == 1 ? '招聘详情' : '求职详情'
			})
		},
		methods:{
			inviteDetail(id,token){
				inviteDetail(id,token).then(res => {
					this.info = res.data.data
				})
			},
			goMessage(){
				uni.makePhoneCall({
					phoneNumber:this.info.phone
				})
			}
		}
	}
</script>

<style>
	page{
		overflow: hidden;
	},
	.inviteDetail-image{
		height: 40upx;
		width: 40upx;
	}
	.text-line-height{
		line-height: 42upx;
	}
	.invitedetail-button{
		margin-top: 200upx;
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
</style>
