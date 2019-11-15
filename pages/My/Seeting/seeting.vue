<template>
	<view>
		<view class="margin-top-xs bg-white padding-left padding-right">
			<view @tap="ruleClick" class="flex align-center justify-between height-all solid-bottom">
				<view class="text-three">规则公告</view>
				<view class="lg text-gray cuIcon-right"></view>
			</view>
			<view class="flex align-center justify-between height-all">
				<view  class="text-three">关于我们</view>
				<view class="lg text-gray cuIcon-right"></view>
			</view>
		</view>
		<view class="margin-top-xs bg-white padding-left padding-right">
			<view @tap="removeClick" class="flex align-center justify-between height-all solid-bottom">
				<view class="text-three">清除缓存</view>
				<view class="lg text-gray cuIcon-right"></view>
			</view>
			<view @tap="versionsClick" class="flex align-center justify-between height-all">
				<view  class="text-three">版本号</view>
				<view class="text-jiujiujiu text-sm">版本号10.1.70</view>
			</view>
		</view>
		<view  class="margin-top-xs bg-white padding-left padding-right">
			<view @tap="outloginSharClick" class="flex align-center justify-center height-all ">
				<view class="text-three text-wuer text-bold">退出登录</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="bottom" >
			<view class="height-all flex align-center justify-center text-jiujiujiu text-sm">退出登录会清除您的登录信息，确认退出吗？</view>
			<view class="height-all flex align-center justify-center solid-top text-xl text-red-my">退出登录</view>
			<view style="background: #EAEAEC;height: 10upx;"></view>
			<view @tap="closePopupsSharClick" class="height-all flex align-center justify-center">取消</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	export default{
		components: {
			uniPopup,
		},
		data(){
			return{
				
			}
		},
		methods:{
			//规则公告
			ruleClick(){
				uni.navigateTo({
					url:'rule'
				})
			},
			//清除缓存
			removeClick(){
				var that = this
				uni.showLoading({
					title:'正在清理...',
				})
				setTimeout(function(){
					uni.hideLoading()
					uni.showToast({
						title:'清理成功',
						icon:'none'
					})
				},1500)
			},
			//检查更新
			versionsClick(){
				uni.showLoading({
					title:'正在检查...',
				})
				setTimeout(function(){
					uni.hideLoading()
					uni.showToast({
						title:'已是最新版本',
						icon:'none'
					})
				},1500)
			},
			//登录弹出
			outloginSharClick(){
				this.$refs.popup.open()
			},
			//登录关闭
			closePopupsSharClick(){
				this.$refs.popup.close()
			},
		}
	}
</script>

<style>
	.height-all{
		height: 96upx;
	}
</style>
