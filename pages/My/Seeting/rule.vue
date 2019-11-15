<template>
	<view>
		<view :style="{height:windowHeight + 'px'}" class="bg-white">
			<view class=" padding-left padding-right">
				<view class="flex align-center justify-between height-all solid-bottom">
					<view class="text-three flex align-center">
						<image class="rule-image" src="../../../static/address.png"></image>
						<view>公司信息</view>
					</view>
					<view class="lg text-gray cuIcon-right"></view>
				</view>
				<view class="flex align-center justify-between height-all solid-bottom">
					<view class="text-three flex align-center">
						<image class="rule-image" src="../../../static/address.png"></image>
						<view>招商规则</view>
					</view>
					<view class="lg text-gray cuIcon-right"></view>
				</view>
				<view class="flex align-center justify-between height-all solid-bottom">
					<view class="text-three flex align-center">
						<image class="rule-image" src="../../../static/address.png"></image>
						<view>发货规则</view>
					</view>
					<view class="lg text-gray cuIcon-right"></view>
				</view>
				<view class="flex align-center justify-between height-all solid-bottom">
					<view class="text-three flex align-center">
						<image class="rule-image" src="../../../static/address.png"></image>
						<view>售后规则</view>
					</view>
					<view class="lg text-gray cuIcon-right"></view>
				</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				windowHeight:0,//屏幕高度
			}
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight
			        console.log('屏幕高度为'+res.windowHeight);
			    }
			});
		},
		methods:{
			
		}
	}
</script>

<style>
	.height-all{
		height: 96upx;
	}
	.rule-image{
		width: 20upx;
		height: 20upx;
		margin-right: 20upx;
	}
</style>
