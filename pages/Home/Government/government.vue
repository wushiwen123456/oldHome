<template>
	<view>
		<block v-for="(vo,key) in govermentList" :key="key">
			<view class="bg-white margin-top-sm goverment-all">
				<view class="margin-lr">
					<image class="goverment-all-image" src="../../../static/newc.png"></image>
					<view @tap="articleClick(1)" class="padding-bottom-sm padding-top-xxl text-wuer text-sm-erliu">美国政府希望向华为的竞争对手提供信贷...</view>
					<view @tap="articleClick(1)" class="flex align-center justify-between">
						<image class="goverment-image" src="../../../static/56524a9a3b6bdab0753eb8ed922d57d.png" mode="aspectFill"></image>
						<image class="goverment-image" src="../../../static/56524a9a3b6bdab0753eb8ed922d57d.png" mode="aspectFill"></image>
						<image class="goverment-image" src="../../../static/56524a9a3b6bdab0753eb8ed922d57d.png" mode="aspectFill"></image>
					</view>
					<view class="flex align-center justify-between padding-tb-sm">
						<view class="text-jiujiujiu text-sm ">2019-10-19</view>
						<view class="lg text-gray cuIcon-share goverment-all-button">分享</view>
					</view>
				</view>
			</view>
		</block>
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
				govermentList:[{},{},{}]
			}
		},
		methods:{
			//文章详情页
			articleClick(id){
				uni.navigateTo({
					url:'articless?id=' + id
				})
			},
		}
}
</script>

<style>
	.goverment-image{
		width:220upx;
		height:196upx;
		border-radius:10upx;
	}
	.goverment-all{
		position: relative;
	}
	.goverment-all-image{
		position: absolute;
		top:0upx;
		height: 50upx;
		width: 120upx;
	}
	.goverment-all-button{
		display: flex;
		align-items: center;
		justify-content: center;
		width:128upx;
		height:48upx;
		background:rgba(208,57,58,1);
		border-radius:24upx;
		color: #FFFFFF;
		font-size: 30upx;
	}
</style>
