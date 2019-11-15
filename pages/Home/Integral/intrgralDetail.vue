<template>
	<view>
		<view class="intrgralDetail-title">
			<view class="text-xxxl text-white">100</view>
			<image class="intrgralDetail-title-image" src="../../../static/jifenw.png"></image>
		</view>
		<view v-for="(vo,key) in list" :key="key">
			<view class="flex align-center justify-between padding-left padding-right-lg bg-white intrgralDetail-mian-all">
				<view>
					<view class="text-wuer text-lg text-bold margin-bottom-xs">购买商品</view>
					<view class="text-jiujiujiu text-sm-erliu">2019-10-23</view>
				</view>
				<view class="text-red-my text-lg text-bold">+1</view>
			</view>
		</view>
		<image class="intrgralDetail-right-image" src="../../../static/jifenr.png"></image>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[{},{},{},{},{},{}]
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.intrgralDetail-title{
		display: flex;
		align-items: center;
		justify-content: center;
		background: url(../../../static/jifenv.png);
		background-size: 100% 100%;
		height: 184upx;
	}
	.intrgralDetail-title-image{
		width: 34upx;
		height: 34upx;
		margin-left: 20upx;
	}
	.intrgralDetail-mian-all{
		height: 140upx;
	}
	.intrgralDetail-right-image{
		position: fixed;
		z-index: 99;
		top: 50%;
		right: 0;
		width:66upx;
		height:126upx;
		
	}
</style>
