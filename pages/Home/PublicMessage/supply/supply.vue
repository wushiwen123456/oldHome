<template>
	<view>
		<tui-tabs selectedColor="#D14243" sliderBgColor="#D14243" :tabs="navbar" :currentTab="currentTab>2? 0:currentTab-1" @change="change" itemWidth="50%"></tui-tabs>
		<view v-if="currentTab == 1">
			<view v-for="(vo,key) in List" :key="key" class="flex align-center justify-between bg-white margin-top-xs padding">
				<view>
					<view class="text-wuer text-lg text-bold margin-bottom-xs">{{vo.title}}</view>
					<view class="text-jiujiujiu text-sm-erliu">vo.</view>
				</view>
				<view class="flex flex-direction align-end">
					<!-- <view class="text-jiujiujiu text-sm">2019.10.22</view> -->
					<view class="flex align-center public-phone-button" @click="phoneClick(vo)">
						<image src="../../../../static/codephone.png"></image>
						<view>联系他</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view v-for="(vo,key) in List" :key="key" class="flex align-center justify-between bg-white margin-top-xs padding">
				<view>
					<view class="text-wuer text-lg text-bold margin-bottom-xs">{{vo.title}}</view>
					<view class="text-jiujiujiu text-sm-erliu">vo.address</view>
				</view>
				<view class="flex flex-direction align-end">
					<!-- <view class="text-jiujiujiu text-sm">2019.10.22</view> -->
					<view class="flex align-center public-phone-button" @click="phoneClick(vo)">
						<image src="../../../../static/codephone.png"></image>
						<view>联系他</view>
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
	
	// 导入网络请求
	import { getSupplyList } from '@/network/supply'
	export default{
		components:{
			uniLoadMore,
			tuiTabs
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'issuesupply'
			})
		},
		onLoad() {
			if(this.$store.getters.isToken){
				this.token = this.$store.getters.isToken
				this.getSupplyList(this.pages,10,this.currentTab,this.token)
			}
		},
		onShow() {
			this.getSupplyList(this.pages,10,this.currentTab,this.token)
		},
		data(){
			return{
				token:'',
				pages:1,
				loadingimg:false,//login加载
				loadingType:1,//login状态
				List:[{},{},{},{}],
				currentTab: 1,
				navbar: [{
					name: "供应"
				}, {
					name: "需求"
				}],
			}
		},
		methods:{
			// 网络请求相关方法
			getSupplyList(page,limit,cate,token){
				getSupplyList(page,10,cate,token).then(res => {
					if(res.data.code == 200){
						this.List = res.data.data
						
					}
				})
			},
			change(e) {
				this.currentTab = e.index*1+1*1
				this.getSupplyList(this.pages,10,this.currentTab,this.token)
			},
			goNavBar() {
				uni.navigateTo({
					url: "/pages/navbar-1/navbar-1"
				})
			},
			phoneClick(vo){
				uni.makePhoneCall({
					phoneNumber:vo.phone
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
