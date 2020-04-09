<template>
	<view class="bg-white" :style="{ 'min-height': windowHeight + 'px'}">
		
		<view v-if="Nodata">
			<view class="flex align-center system-all solid-bottom padding-left padding-right" v-for="(item,index) in list" :key="index" @click="goTuikuan">
				<view class="system-left-image">
					<image src="/static/mytwoe.png"></image>
				</view>
				<view class="text-width margin-left-sm flex flex-direction justify-center">
					<view class="flex align-end justify-between">
						<view class="text-wuer text-lg">退款成功</view>
						<view  class="text-color text-df">退款金额 ¥{{item.money}}</view>
					</view>
					<view class="flex align-end justify-between">
						<text class="text-color text-df text-cut" style="flex: 1;">您的订单已退款已完成,请注意查收</text>
						<text  class="text-color text-df margin-left">{{dealTime(item.add_time)}}</text>
					</view>
				</view>
			</view>
			
			
		</view>	
		<view v-else class="empty-img" :style="{height:style.height + 'px',transform:'translateY(-10%)'}">
			<image src="/static/nodatamessage.png" mode="widthFix"></image>
		</view>
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>
	import { userMessageDetail } from '@/network/getProfileData'
	import { formatDate } from '@/utils/dealData'
	export default{
		data(){
			return{
				windowHeight:0,//屏幕高度
				Nodata:false,//有无数据
				style:{
					height:''
				},
				list:[]
			}
		},
		onLoad() {
			var that = this
			const view = uni.getSystemInfoSync()
			this.style.height = view.windowHeight;
			const token = this.$store.getters.isToken
			this.getList(token)
		},
		onReady() {
			this.$refs.loading.open()
		},
		methods:{
			getList(token){
				userMessageDetail(token,3).then(res => {
					this.$refs.loading.close()
					// id: 2
					// uid: 2
					// type: 3
					// link_id: "2020010712033710001"
					// title: "您的订单已退款已完成,请注意查收"
					// money: "0.01"
					// add_time: 1578370243
					// is_send: 1
					// send_time: 0
					
					if(res.data.code == 200){
						const list = res.data.data
						if(list.length){
							this.Nodata = true
							this.list = list
						}
					}
				})
			},
			dealTime(time){
				const date = new Date(time*1000)
				return formatDate(date,'MM-dd hh:mm')
			},
			goTuikuan(){
				uni.navigateTo({
					url:'../../MyBooking/refund/refund'
				})
			}
		}
	}
</script>

<style>
	.nodata{
		padding-top: 200upx;
	}
	.nodata image{
		width: 100%;
	}
	.system-all{
		height: 144upx;
	}
	.system-left-image image{
		width:84upx;
		height:84upx;
	}
	.text-color{
		color: #838383;
	}
	.text-max-width{
		max-width: 560upx;
	}
	
</style>
