
<template>
	<view>
		<view v-if="type == 1">
			<view class="bg-white padding margin-tb-sm">
				<view class="t1 margin-bottom margin-tb-xs text-wuer text-lg"><text class="tishi-text">标题： </text>修下水管道，修各种管道40元/次</view>
				<!-- <view class="margin-bottom margin-tb-xs text-wuer text-lg text-bold">{{info.title}}</view> -->
				<!-- <view class="t1 margin-bottom margin-tb-xs text-red text-lg"><text class="tishi-text">金额： </text>修管道，修煤气</view> -->
				<view class="t1 margin-bottom margin-tb-xs text-wuer"><text class="tishi-text">电话： </text>13123123132123</view>
				<view class="t1 margin-bottom margin-tb-xs text-wuer"><text class="tishi-text">地点： </text>水电费空间上课了福建省凉山杜鹃福克斯</view>
				<!-- <view class="t1 margin-bottom margin-tb-xs text-wuer"><text class="tishi-text">联系方式： </text>水电费空间上课了福建省凉山杜鹃福克斯</view> -->
			</view>
			<view class="padding bg-white">
				<view class="flex align-center ">
					<image class="inviteDetail-image margin-right-sm" src="/static/2333.png"></image>
					<view class="text-wuer text-lg text-bold">详情</view>	
				</view>
				<view>
					<scroll-view scroll-y class="s-content">
						<view>
							<text>修管道，修煤气修管道，修煤气修管道，修煤气修管道，修煤气修管道，修煤气</text>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="margin-lr-sm invitedetail-button" @click="goMessage">立即联系</view>
		</view>
		<view v-else>
			<view class="bg-white padding margin-tb-sm">
				<view class="text-df margin-bottom-xs">姓名： 修管道，修煤气</view>
				<view class="text-df margin-tb-xs">目标职位： 修管道，修煤气</view>
				<view class="margin-bottom margin-tb-xs text-wuer text-lg text-bold">修管道，修煤气</view>
				<view class="margin-bottom margin-tb-xs">电话： 修管道，修煤气</view>
				<view> <text>薪资要求： </text><text class="text-red text-bold">修管道，修煤气修管道，修煤气修管道，修煤气修管道，修煤气</text></view>
			</view>
			<view class="padding bg-white">
				<view class="flex align-center ">
					<image class="inviteDetail-image margin-right-sm" src="/static/2333.png"></image>
					<view class="text-wuer text-lg text-bold">工作经历</view>	
				</view>
				<view>
					<scroll-view scroll-y class="s-content">
						<view>
							<text>修管道，修煤气修管道，修煤气修管道，修煤气修管道，修煤气</text>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="margin-lr-sm invitedetail-button" @click="goMessage">立即联系</view>
		</view>
		<view class="tips">提示：注意自身安全，财产安全，本站只是提供需求发布平台，具体责任与本站无关</view>
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
				title:this.type == 1 ? '供应详情' : '需求详情'
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
			}
		}
	}
</script>

<style lang="scss">
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
	.t1{
		.tishi-text{
			color: $uni-text-color;
			font-weight: 700;
			font-size: $uni-font-size-base;
		}
	}
	.tips{
		color:#999999;
		font-size: $uni-font-size-sm;
		text-align: center;
		position: fixed;
		bottom: 10upx;
		left: 35upx;
		right: 35upx;
		
	}
</style>