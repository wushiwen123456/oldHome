<template>
	<view class="bg-white" :style="{ 'min-height': windowHeight + 'px'}">
		
		<view v-if="Nodata">
			<view class="flex align-center system-all solid-bottom padding-left padding-right" v-for="(item,index) in list" :key="index" @click="goHome(itme)">
				<view class="system-left-image">
					<image src="../../../../static/inffimma.png"></image>
				</view>
				<view class="text-width margin-left-sm">
					<view class="flex align-center justify-between margin-bottom-xs">
						<view class="text-wuer text-lg">入驻成功</view>
						<view  class="text-color text-sm">dealTime(item.add_time)</view>
					</view>
					<view class="text-color text-df text-max-width text-cut">您提交的入驻申请已通过</view>
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
	import { formatDate } from '@/utils/dealUrl'
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
				userMessageDetail(token,2).then(res => {
					/**
					id: 8
					uid: 17
					type: 1
					link_id: "6"
					title: "商铺入驻成功"
					money: "0.00"
					add_time: 1578453429
					is_send: 1
					send_time: 0
					 */
					this.$refs.loading.close()
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
				let date = new Date(time*1000)
				return formatDate(date,'MM-dd hh:mm')
			},
			goHome(item){
				uni.switchTab({
					url:'../../../Home/home'
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
