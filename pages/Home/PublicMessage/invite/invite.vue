<template>
	<view>
		<tui-tabs selectedColor="#D14243" sliderBgColor="#D14243" :tabs="navbar" :currentTab="currentTab>1?0:currentTab" @change="change" itemWidth="50%"></tui-tabs>
		<view v-if="currentTab == 0">
			<view v-for="(vo,key) in List" :key="key" class="flex align-center justify-between bg-white margin-top-xs padding">
				<view>
					<view class="text-wuer text-lg text-bold margin-bottom-xs">郏县装修公司123</view>
					<view class="text-jiujiujiu text-sm-erliu">管城区·航海东路·227号</view>
					<view class="margin-top-sm text-red-my text-bold text-df">3000-4000元</view> 
				</view>
				<view class="flex flex-direction align-end">
					<view class="text-jiujiujiu text-sm">2019.10.22</view>
					<view class="flex align-center public-phone-button">
						<view>查看详情</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view v-for="(vo,key) in List" :key="key" class="flex align-center justify-between bg-white margin-top-xs padding">
				<view>
					<view>
						<view class="flex align-center text-lg text-wuer text-bold">
							<view>张波</view>
							<view class="margin-lr-xs">|</view>
							<view>26岁</view>
							<image class="invite-sex" src="../../../../static/sexa.png"></image>
							<image class="invite-sex" src="../../../../static/sexb.png"></image>
						</view>
					</view>
					<view class="margin-top-sm text-sm-erliu text-jiujiujiu">行政人事管理其他</view>
				</view>
				<view class="flex flex-direction align-end">
					<view class="text-jiujiujiu text-sm">2天前</view>
					<view class="flex align-center public-phone-button">
						<view>查看详情</view>
					</view>
				</view>
			</view>
		</view>
		
		<uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more>
	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniLoadMore,
			tuiTabs
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'issueinvite'
			})
		},
		data(){
			return{
				loadingimg:true,//login加载
				loadingType:1,//login状态
				List:[{},{},{},{}],
				currentTab: 0,
				navbar: [{
					name: "招聘"
				}, {
					name: "求职"
				}],
			}
		},
		methods:{
			change(e) {
				this.currentTab = e.index
			},
			goNavBar() {
				uni.navigateTo({
					url: "/pages/navbar-1/navbar-1"
				})
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
	.invite-sex{
		width:54upx;
		height:34upx;
		margin-left: 20upx;
	}
</style>
