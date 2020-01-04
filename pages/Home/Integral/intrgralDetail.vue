<template>
	<view>
		<view v-if="list.length">
			<view class="intrgralDetail-title">
				<view class="text-xxxl text-white">{{totalIntegral}}</view>
				<image class="intrgralDetail-title-image" src="../../../static/jifenw.png"></image>
			</view>
			<view v-for="(vo,key) in list" :key="key">
				<view class="flex align-center justify-between padding-left padding-right-lg bg-white intrgralDetail-mian-all">
					<view>
						<view class="text-wuer text-lg text-bold margin-bottom-xs">{{vo.pm == 1 ? '购买商品' : '兑换商品'}}</view>
						<view class="text-jiujiujiu text-sm-erliu">{{vo.add_time}}</view>
					</view>
					<view class="text-red-my text-lg text-bold">{{vo.pm == 1 ? '+' : '-'}}{{vo.number}}</view>
				</view>
			</view>
			<image class="intrgralDetail-right-image" src="../../../static/jifenr.png"></image>
		</view>
		<view class="userNodes" v-else>
			您还没有兑换记录哦~
		</view>
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>
	// 获取用户积分
	import { userIntegral } from '@/network/getProfileData'
 	export default{
		onShow() {
			if(this.$store.getters.isToken){
				this.token = this.$store.getters.isToken
				this.userIntegral(this.token)
			}
			else{
				uni.switchTab({
					url:'../../login/login'
				})
			}
		},
		data(){
			return{
				list:[],
				token:'',
				totalIntegral:0
			}
		},
		onReady() {
			this.$refs.loading.open()
		},
		methods:{
			// 获取积分信息
			userIntegral(token){
				userIntegral(token)
				.then(res => {
					this.$refs.loading.close()
					if(res.data.code == 200){
						this.list = res.data.data.list
						this.totalIntegral = res.data.data.userBill
					}
				})
			}
		}
	}
</script>

<style>
	.intrgralDetail-title{
		display: flex;
		align-items: center;
		justify-content: center;
		background: url(../../../static/jifenv.png);
		background-size: 100% 100%;
		height: 184upx;
	}
	.intrgralDetail-title-image{
		width: 34upx;
		height: 34upx;
		margin-left: 20upx;
	}
	.intrgralDetail-mian-all{
		height: 140upx;
	}
	.intrgralDetail-right-image{
		position: fixed;
		z-index: 99;
		top: 50%;
		right: 0;
		width:66upx;
		height:126upx;
		
	}
</style>
