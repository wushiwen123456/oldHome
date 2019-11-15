<template>
	<view>
		<tui-tabs :tabs="tabs2" :currentTab="currentTab"  selectedColor="#CD3233" sliderBgColor="#CD3233" @change="change"></tui-tabs>
		<view v-for="(vo,key) in shopList" :key="key" class="bg-white margin-top-sm">
			<view class="flex align-center padding-left padding-top-sm padding-bottom-sm">
				<view style="font-size: 36upx;" class="lg cuIcon-shop margin-right-sm"></view>
				<view class="text-sm" style="color: #636362;">沃隆旗舰店</view>
			</view>
			<block v-for="(item,indexKey) in vo.shopAllMessage" :key="indexKey">
				<view  class="flex align-start margin-left margin-right">
					<view class="mybooking-image">
						<image src="../../../static/56524a9a3b6bdab0753eb8ed922d57d.png"></image>
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
			<view class="flex align-center justify-between padding-left solid-top padding-top padding-right">
				<view>
					<image class="mybooking-haming"  src="../../../static/demo3.png" ></image>
					<image class="mybooking-haming"  src="../../../static/demo3.png" ></image>
				</view>
				<view class="flex align-center text-df">
					<view class="text-black">共1件,</view>
					<view class="text-jiujiujiu">合计：</view>
					<view class="text-price text-red text-bold">139</view>
				</view>
			</view>
			<view class="flex justify-end padding-bottom margin-top-sm">
				<!-- <button class="mybooking-button ">查看订单</button> -->
				<!-- <button class="mybooking-button ">邀请好友</button> -->
				<button class="mybooking-button ">查看退款</button>
				<button class="mybooking-button mybooking-button-colse">取消订单</button>
			</view>
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
				currentTab: 0,
				tabs2: [{
					name: "全部"
				}, {
					name: "拼团中"
				}, {
					name: "成功"
				}, {
					name: "失效",
				}],
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
		onLoad() {
			
		},
		methods:{
			//导航切换
			change(e) {
				this.currentTab = e.index
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
	.mybooking-haming{
		width:48upx;
		height:48upx;
		border-radius:50%;
		margin-left: -10upx;
		border: 2px solid #FFFFFF;
	}
	.mybooking-haming:nth-child(1){
		margin-left: 0upx;
	}
	.mybooking-button{
		width:180upx;
		height:56upx;
		line-height: 56upx;
		background: none;
		border:1px solid rgba(205,50,51,1);
		border-radius:28upx;
		color: #CD3233;
		font-size: 28upx;
		margin: 0;
		margin-right: 30upx;
	}
	.mybooking-button-colse{
		border:1px solid rgba(153,153,153,1);
		color: rgba(153,153,153,1);
	}
</style>
