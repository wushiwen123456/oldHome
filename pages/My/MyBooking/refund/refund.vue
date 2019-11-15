<template>
	<view>
		<view v-for="(vo,key) in shopList" :key="key" class="bg-white margin-top-sm">
			<view class="flex align-center refund-image solid-bottom">
				<view style="font-size: 36upx;" class="lg cuIcon-shop margin-right-sm"></view>
				<view class="text-sm" style="color: #636362;">沃隆旗舰店</view>
			</view>
			<block v-for="(item,indexKey) in vo.shopAllMessage" :key="indexKey">
				<view  class="flex align-start margin-top-sm margin-left margin-right">
					<view class="mybooking-image">
						<image src="../../../../static/56524a9a3b6bdab0753eb8ed922d57d.png"></image>
					</view>
					<view class="text-width margin-left-sm ">
						<view class="flex align-center justify-between">
							<view class="flex-five text-hieed">沃隆每日坚果750g混合装30包干果零食大礼包混合坚果小包装坚果小包装坚果小包装</view>
							<view class="text-price text-red flex-sub text-center">139</view>
						</view>
						<view class="flex align-center justify-between margin-top-xs">
							<view class="flex-five text-jiujiujiu text-sm">口味：成人款A750g*1盒</view>
							<view class="flex-sub text-center">x1</view>
						</view>
					</view>
				</view>
			</block>
			<view class="flex align-center justify-start solid-top solid-bottom  refund-image">
				<image src="../../../../static/tuikaun.png" ></image>
				<view>仅退款 退款成功</view>
			</view>
			<view class="flex justify-end padding-bottom margin-top-sm">
				<button @tap="refundClick" class="mybooking-button ">查看详情</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				shopList:[{
					shopname:'吕梁莲花池特产店',
					shopType:false,
					shopAllMessage:[{
						shoptitle:'夹心特产休闲零食干果美味 江西靖安白茶新茶 江西资溪夹心特产休闲零食干果美味 江西靖安白茶新茶 江西资溪',
						specification:'黑色；S',
						money:'99.00',
						image:'../../static/demo31.png',
						num:1,
						type:false,
					},{
						shoptitle:'夹心特',
						specification:'黑色；S',
						money:'99.00',
						image:'../../static/demo30.png',
						num:1,
						type:false,
					}]
					
				},{
					shopname:'点购特产店75',
					shopType:false,
					shopAllMessage:[{
						shoptitle:'江西靖安白茶新茶 江西资溪 夹心特产休闲零食干果美味',
						specification:'250g',
						money:'30.60',
						image:'../../static/demo27.png',
						num:1,
						type:false,
					},{
						shoptitle:'江西靖安白茶新茶 江西资溪',
						specification:'250g',
						money:'30.60',
						image:'../../static/demo24.png',
						num:1,
						type:false,
					}]
						
				}]
			}
		},
		methods:{
			//查看详情
			refundClick(){
				uni.navigateTo({
					url:'refundMessage'
				})
			},
		}
	}
</script>

<style>
	.mybooking-image image{
		width: 164upx;
		height: 164upx;
	}
	.text-hieed{
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	.mybooking-button{
		width:180upx;
		height:60upx;
		line-height: 60upx;
		background: none;
		border:1px solid rgba(205,50,51,1);
		border-radius:40upx;
		color: #CD3233;
		font-size: 28upx;
		margin: 0;
		margin-right: 30upx;
	}
	.mybooking-button-colse{
		border:1px solid rgba(153,153,153,1);
		color: rgba(153,153,153,1);
	}
	.refund-image{
		color: #636362;
		font-size: 24upx;
		height: 80upx;
		padding-left: 30upx;
	}
	.refund-image image{
		width: 36upx;
		height: 36upx;
		margin-right: 20upx;
	}
</style>
