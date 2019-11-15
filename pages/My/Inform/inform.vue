<template>
	<view class="bg-white inform-mian-all" :style="{ height: windowHeight + 'px'}">
		<view @tap="informClick(key)" v-for="(vo,key) in list" :key="key" class="flex align-center justify-between inform-all solid-bottom">
			<view class="flex align-center">
				<image class="inform-image-all" :src="vo.image"></image>
				<view>{{vo.name}}</view>
			</view>
			<view class="margin-right inform-all-badge">2</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[{
					name:'物流消息',
					image:'../../../static/informa.png',
				},{
					name:'聊天记录',
					image:'../../../static/informb.png',
				},{
					name:'系统通知',
					image:'../../../static/informc.png',
				},{
					name:'入驻通知',
					image:'../../../static/informd.png',
				}]
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
			//点击消息
			informClick(key){
				if(key == 0){
					//物流消息
					uni.navigateTo({
						url:'Logistics/logistics'
					})
				}if(key == 1){
					//聊天记录
					uni.navigateTo({
						url:'Chat/chat'
					})
				}if(key == 2){
					//系统通知
					uni.navigateTo({
						url:'System/system'
					})
				}if(key == 3){
					//入驻通知
					uni.navigateTo({
						url:'Enter/enter'
					})
				}
			},
		}
	}
</script>

<style>
	.inform-mian-all{
		padding-left: 22upx;
	}
	.inform-image-all{
		width:98upx;
		height:98upx;
		margin-right: 20upx;
	}
	.inform-all{
		height: 130upx;
	}
	.inform-all-badge{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10upx;
		color: #FFFFFF;
		background: #CD3233;
		border-radius: 50upx;
		font-size: 22upx;
	}
</style>
