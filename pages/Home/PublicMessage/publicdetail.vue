<template>
	<view>
		<view v-for="(vo,key) in List" :key="key" class="flex align-center justify-between bg-white piblic-height margin-top-xs padding-lr">
			<view>
				<view class="text-wuer text-lg text-bold margin-bottom-xs">郏县装修公司</view>
				<view class="text-jiujiujiu text-sm-erliu">管城区·航海东路·227号</view>
			</view>
			<view class="flex flex-direction align-end">
				<view class="text-jiujiujiu text-sm">2.7km</view>
				<view @tap="callPhone(phone)" class="flex align-center public-phone-button">
					<image src="../../../static/codephone.png"></image>
					<view>联系它</view>
				</view>
			</view>
		</view>
		<uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniLoadMore
		},
		data(){
			return{
				loadingimg:true,//login加载
				loadingType:1,//login状态
				List:[{},{},{},{}]
			}
		},
		methods:{
			callPhone(phone){
				console.log('已拨打电话')
				uni.makePhoneCall({
				    phoneNumber: phone
				});
			}
		}
	}
</script>

<style>
	.public-phone-button{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20upx;
		width:130upx;
		height:50upx;
		border:1px solid rgba(205,50,51,1);
		border-radius:8upx;
		color: #CD3233;
		font-size: 24upx;
	}
	.public-phone-button image{
		width: 26upx;
		height: 26upx;
		margin-right: 10upx;
	}
	.piblic-height{
		height: 162upx;
	}
</style>
