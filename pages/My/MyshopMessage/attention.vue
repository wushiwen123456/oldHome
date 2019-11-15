<template>
	<view>
		<view class="text-sm text-jiujiujiu text-center margin-top-sm">共关注4个店铺</view>
		<view v-if="!Nodata" class="margin-top-sm bg-white enter-margin">
			<view v-for="(vo,key) in getListData" :key="key" style="position: relative;" class="flex align-center justify-between enter-margin-all">
				<view class="flex align-center">
					<view class="enter-left-image">
						<image :src="vo.image"></image>
					</view>
					<view class="margin-left-sm">
						<view class="flex align-center margin-bottom-xs">
							<view class="text-wuer text-three text-bold">{{vo.name}}</view>
							<view class="margin-left">
								<view class="enter-sanjiao-right">官方</view>
							</view>
						</view>
						<view class="text-sm text-color">粉丝{{vo.bean}}</view>
					</view>
				</view>
				<view class="flex align-center">
					<view @tap="onLongPress(key)" style="font-size: 40upx;" class="lg text-gray cuIcon-more margin-right"></view>
					<view @tap="enterClick(11)" class="flex align-center justify-center enter-booton">店铺</view>
				</view>
				<view v-show="vo.popu" @tap="delListClick" class="recordList-all-popu">
					<view>取消收藏</view>
				</view>
			</view>
		</view>
		<view v-else class="bg-white" :style="{ height: windowHeight + 'px'}">
			<view class="nodata">
				<image src="../../../static/nodataa.png"></image>
			</view>
		</view>
		<view v-show="winSize" @tap="winSizeClick" class="winSize-zehzaho" :style="{ height: windowHeight + 'px'}"></view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				winSize:false,///* 显示遮罩 */
				windowHeight:0,//屏幕高度
				Nodata:false,//有无数据
				getListData:[{
					image:'../../../static/demo14.png',
					name:'超松数码专营店',
					bean:'124',
					popu:false
				},{
					image:'../../../static/demo14.png',
					name:'超松数码专营店',
					bean:'23432',
					popu:false
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
			//点击删除
			onLongPress(key){
				var that = this
				that.getListData[key].popu = true
				that.winSize = true
				
			},
			//进店逛逛
			enterClick(id){
				uni.navigateTo({
					url:'../../ShopDetails/StoreDetails/storedetails'
				})
			},
			//删除记录
			delListClick(){
				this.winSizeClick()
			},
			//点击遮罩
			winSizeClick(){
				var that = this
				that.winSize = false
				that.getListData.forEach(function(item){
					item.popu = false
				})
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
		width:70upx;
		height:34upx;
		background:rgba(205,50,51,1);
		border-radius:18upx;
		font-size: 20upx;
		color: #FFFFFF;
		margin-right: 24upx;
	}
	.enter-sanjiao-right{
		padding: 2upx 6upx;
		border-radius: 8upx;
		background: #EAD09D;
		font-size: 24upx;
		color: #5C2E10;
	}
	.recordList-all-popu{
		position: absolute;
		z-index: 999;
		right: 60upx;
		top: 100upx;
		width:180upx;
		height:80upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 0upx 30upx 6upx rgba(0, 0, 0, 0.09);
		border-radius:10upx;
		color: 32upx;
		line-height: 80upx;
		text-align: center;
	}
	.winSize-zehzaho{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99;
		background: rgba(255,255,255,0);
	}
</style>
