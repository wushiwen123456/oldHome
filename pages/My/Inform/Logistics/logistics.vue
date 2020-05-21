<template>
	<view class="bg-white" :style="{ 'height': style.height + 'px'}">
		
		<view v-if="Nodata">
			<view class="flex align-center system-all solid-bottom padding-left padding-right" 
				@click="goMyOrder(item,index)"
				v-for="(item,index) in logList" :key="index"
			>
				
				<view class="system-left-image">
					<image src="/static/images/ic-sending.png"></image>
				</view>
				<view class="text-width margin-left-sm">
					<view class="flex align-center justify-between margin-bottom-xs">
						<view class="text-wuer text-lg">卖家已发货</view>
						<view  class="text-color text-sm">{{dealTime(item.add_time)}}</view>
					</view>
					<view class="text-color text-df text-max-width text-cut">您购买的宝贝已在路上,请注意签收</view>
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
				add_time:'',
				style:{
					height:''
				},
				logList:[],
				_isLogin:false
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
			if(this._isLogin == false){
				this.$refs.loading.open()
			}
		},
		methods:{
			// 根据网络请求数据
			getList(token){
				userMessageDetail(token,1).then(res => {
					this.$refs.loading.close()
					this._isLogin = true
					if(res.data.code == 200){
						if(res.data.data.length){
							this.Nodata = true
						}
						this.logList = res.data.data
					}
					//  {id: 7, uid: 17, type: 2, link_id: "2020010811104110005", title: "你的商品已发货,请等待查收", money: "0.00",…}
					// id: 7
					// uid: 17
					// type: 2
					// link_id: "2020010811104110005"
					// title: "你的商品已发货,请等待查收"
					// money: "0.00"
					// add_time: 1578453089
					// is_send: 1
					// send_time: 0
				})
			},
			goMyOrder(item,index){
				const id = item.link_id
				uni.navigateTo({
					url:`../../logistics/logistics?id=${id}`
				})
			},
			dealTime(time){
				const date = new Date(time*1000)
				return formatDate(date,'MM-dd hh:mm')
			},
			
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
