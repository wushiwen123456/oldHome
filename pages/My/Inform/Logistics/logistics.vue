<template>
	<view>
		
		<view v-if="!Nodata"> 
			<view v-for="(vo,key) in ListData" :key="key" class="flex align-center logistics-all bg-white ">
				<view class="logistics-left-all">
					<image :src="vo.image"></image>
				</view>
				<view class="logistics-right-all margin-left-sm">
					<view class="text-wuer text-lg text-bold">{{vo.title}}</view>
					<view class="margin-top-sm margin-bottom text-wuer text-df">{{vo.content}}</view>
					<view class="flex align-center justify-center logistics-right-all-button">查看物流</view>
				</view>
			</view>
		</view>
		
		<view v-else class="bg-white" :style="{ height: windowHeight + 'px'}">
			<view class="nodata">
				<image src="../../../../static/nodataa.png"></image>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				windowHeight:0,//屏幕高度
				Nodata:false,//有无数据
				ListData:[{
					image:'../../../../static/demo27.png',
					title:'您的订单已签收',
					content:'棉拖鞋女厚底冬季可爱家用居家情侣室内保暖棉拖...订单已签收',
				},{
					image:'../../../../static/demo25.png',
					title:'您的订单已取消',
					content:'棉拖鞋女厚底冬季可爱家用居家情侣室内保暖棉拖...订单已签收',
				},{
					image:'../../../../static/demo23.png',
					title:'您的订单已发货',
					content:'棉拖鞋女厚底冬季可爱家用居家情侣室内保暖棉拖...订单已签收',
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
	.logistics-all{
		margin-top: 10upx;
		padding: 24upx 30upx 24upx 24upx;
	}
	.logistics-left-all{
		
	}
	.logistics-left-all image{
		width:228upx;
		height:228upx;
	}
	.logistics-right-all{
		width: 100%;
	}
	.logistics-right-all-button{
		width:170upx;
		height:58upx;
		border:1px solid rgba(207,50,51,1);
		border-radius:30upx;
		color: #CF3233;
		font-size: 32upx;
	}
</style>
