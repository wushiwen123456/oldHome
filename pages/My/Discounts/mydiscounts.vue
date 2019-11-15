<template>
	<view>
		<view v-if="!dataType">
			<tui-tabs 
				:tabs="tabs" 
				selectedColor="#CD3233" 
				sliderBgColor="#CD3233" 
				:currentTab="currentTab>2?0:currentTab" 
				@change="change" 
				itemWidth="33.3333%">
			</tui-tabs>
			
			<view class="margin-left margin-right">
				<!-- 领券中心 -->
				<view @tap="lqcententClcik" class="flex align-center justify-between mydiscounts-title-all margin-top-xs" >
					<view class="flex align-center">
						<image class="mydiscounts-title-img" src="../../../static/lqa.png"></image>
						<view class="text-three text-wuer">领券中心</view>
					</view>
					<view class="lg text-gray cuIcon-right margin-right-sm"></view>
				</view>
				
				<!-- 未使用优惠券 -->
				<view v-if="currentTab == 0">
					<view class=" margin-top-xs mydiscounts-main-bg  bg-one">
						<view class="flex flex-direction margin-bottom-sm">
							<view class="flex align-center">
								<view class="text-price text-red text-xxxxl">50</view>
								<view class=" margin-left-xl text-wuer text-three  text-hide">【晴格木美妆小铺】50元优惠券</view>
							</view>
							<view class="flex align-center">
								<view class="text-sm text-red">满299可用</view>
								<view class="margin-left-xl text-jiujiujiu text-sm">2019.09.21-2019.10.21</view>
							</view>
						</view>
						<view class="mydiscounts-main-bottom">立即使用</view>
					</view>
				</view>
				
				<!-- 已使用优惠券 -->
				<view v-if="currentTab == 1">
					<view class=" margin-top-xs mydiscounts-main-bg bg-two ">
						<view class="flex flex-direction margin-bottom-sm">
							<view class="flex align-center">
								<view class="text-price text-red text-xxxxl">50</view>
								<view class=" margin-left-xl text-wuer text-three  text-hide">【晴格木美妆小铺】50元优惠券</view>
							</view>
							<view class="flex align-center">
								<view class="text-sm text-red">满299可用</view>
								<view class="margin-left-xl text-jiujiujiu text-sm">2019.09.21-2019.10.21</view>
							</view>
						</view>
						<view class="mydiscounts-main-bottom">立即使用</view>
					</view>
				</view>
				
				<!-- 未使用优惠券 -->
				<view v-if="currentTab == 2">
					<view class=" margin-top-xs mydiscounts-main-bg bg-three">
						<view class="flex flex-direction margin-bottom-sm">
							<view class="flex align-center">
								<view class="text-price text-red text-xxxxl">50</view>
								<view class=" margin-left-xl text-wuer text-three  text-hide">【晴格木美妆小铺】50元优惠券</view>
							</view>
							<view class="flex align-center">
								<view class="text-sm text-red">满299可用</view>
								<view class="margin-left-xl text-jiujiujiu text-sm">2019.09.21-2019.10.21</view>
							</view>
						</view>
						<view class="mydiscounts-main-bottom">立即使用</view>
					</view>
				</view>
				
				
			</view>
		</view>
		
		<view v-if="dataType" :style="{ 'min-height': windowHeight + 'px'}" class="nodata">
			<image src="../../../static/youhuiquan.png"></image>
			<button>去领券中心</button>
		</view>
	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	export default{
		components: {
			tuiTabs
		},
		data(){
			return{
				currentTab: 0,//当前滑块状态
				tabs: [{
					name: "未使用"
				}, {
					name: "已使用"
				}, {
					name: "已过期"
				}],
				windowHeight:0,//屏幕高度
				dataType:false,//是否存在数据
			}
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight
			        console.log('屏幕高度为'+res.windowHeight); 
			    },
			});
		},
		methods:{
			//切换标签
			change(e) {
				this.currentTab = e.index
			},
			//
			lqcententClcik(){
				uni.navigateTo({
					url:'DiscpuntsCentent'
				})
			},
		}
	}
</script>

<style>
	.nodata{
		padding-top: 200upx;
		background: #FFFFFF;
	}
	.nodata button{
		margin-top: 40upx;
		width:280upx;
		height:80upx;
		line-height: 80upx;
		color: #FFFFFF;
		font-size: 30upx;
		background:rgba(205,50,51,1);
		box-shadow:0upx 8upx 16upx 0upx rgba(232,54,42,0.24);
		border-radius:40upx;
	}
	.nodata image{
		width: 100%;
		height: 500upx;
	}
	.mydiscounts-title-all{
		border-radius: 8upx;
		background: #FFFFFF;
		height:88upx;
		
	}
	.mydiscounts-title-img{
		margin-left: 20upx;
		margin-right: 16upx;
		width:56upx;
		height:56upx;		
	}
	.text-price::before{
		font-size: 50%;
	}
	.mydiscounts-main-bg{
		padding: 20upx 30upx 0 30upx;
		height: 208upx;
	}
	.bg-one{
		background: url(../../../static/lqweishy.png);
		background-size: 100% 100%;
	}
	.bg-two{
		background: url(../../../static/lqyishy.png);
		background-size: 100% 100%;
	}
	.bg-three{
		background: url(../../../static/lqyiguoq.png);
		background-size: 100% 100%;
	}
	.mydiscounts-main-bottom{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60upx;
		line-height: 60upx;
		color: #CD3233;
		font-size: 30upx;
		font-weight: bold;
	}
	.text-hide{
		overflow:hidden;
		text-overflow:ellipsis; 
		white-space:nowrap;
	}
</style>
