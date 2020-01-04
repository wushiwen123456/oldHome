<template>
	<view class="bg-white">
		
		<view v-if="Nodata" class="margin-top-sm bg-white enter-margin">
			<view v-for="(vo,key) in getListData" :key="key" class="flex align-center justify-between enter-margin-all">
				<view class="flex align-center">
					<view class="enter-left-image">
						<image :src="vo.image"></image>
					</view>
					<view class="margin-left-sm">
						<view class="flex align-center margin-bottom-xs">
							<view class="text-wuer text-three text-bold">{{vo.name}}</view>
							<view class="flex align-center margin-left">
								<view class="enter-sanjiao"></view>
								<view class="enter-sanjiao-right">已入驻</view>
							</view>
						</view>
						<view class="text-sm text-color">{{vo.time}}</view>
					</view>
				</view>
				<view @tap="enterClick(11)" class="flex align-center justify-center enter-booton">进店逛逛</view>
			</view>
		</view>
		
		<view v-else class="empty-img" :style="{height:style.height + 'px',transform:'translateY(-10%)'}">
			<image src="/static/nodatamessage.png" mode="widthFix"></image>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				windowHeight:0,//屏幕高度
				Nodata:false,//有无数据
				getListData:[{
					image:'../../../../static/demo14.png',
					name:'超松数码专营店',
					time:'2019-09-26'
				},{
					image:'../../../../static/demo14.png',
					name:'超松数码专营店',
					time:'2019-09-26'
				}],
				style:{
					height:''
				},
			}
		},
		onLoad() {
			var that = this
			const view = uni.getSystemInfoSync()
			this.style.height = view.windowHeight;
		},
		methods:{
			//进店逛逛
			enterClick(id){
				uni.navigateTo({
					url:'../../../ShopDetails/StoreDetails/storedetails'
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
	.enter-left-image{
		
	}
	.enter-left-image image{
		width:84upx;
		height:84upx;
		border-radius:22upx;
	}
	.enter-margin{
		padding-left: 24upx;
	}
	.enter-margin-all{
		height: 140upx;
		border-top: #E1E1E1 1px solid;
	}
	.enter-margin-all:nth-child(1){
		border: none;
	}
	.text-color{
		color: #838383;
	}
	.enter-booton{
		width:130upx;
		height:48upx;
		border:1px solid rgba(205,50,51,1);
		border-radius:24upx;
		font-size: 24upx;
		color: #CD3233;
		margin-right: 24upx;
	}
	.enter-sanjiao{
		width: 0;
		height: 0;
		border-top: 8upx solid transparent;
		border-right: 12upx solid #EAD09D;
		border-bottom: 8upx solid transparent;
	}
	.enter-sanjiao-right{
		padding: 2upx 6upx;
		border-radius: 8upx;
		background: #EAD09D;
		font-size: 24upx;
		color: #5C2E10;
	}
</style>
