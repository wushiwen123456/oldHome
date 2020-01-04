<template>
	<view class="bg-white" :style="{ 'min-height': windowHeight + 'px'}">
		
		<view v-if="Nodata">
			<view class="flex align-center system-all solid-bottom padding-left padding-right">
				<view class="system-left-image">
					<image src="../../../../static/inffimma.png"></image>
				</view>
				<view class="text-width margin-left-sm">
					<view class="flex align-center justify-between margin-bottom-xs">
						<view class="text-wuer text-lg">入驻成功</view>
						<view  class="text-color text-sm">11/28  10:51 </view>
					</view>
					<view class="text-color text-df text-max-width text-cut">您与2019年11月14日提交的入驻申请已通过</view>
				</view>
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
