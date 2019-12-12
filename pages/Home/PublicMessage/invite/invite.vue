<template>
	<mescroll-uni @down="downCallback" @up="upCallback" :up="isUp">
	<view v-if="Object.keys(List).length != 0">
		<tui-tabs selectedColor="#D14243" sliderBgColor="#D14243" :tabs="navbar" :currentTab="currentTab > 2 ? 0 : currentTab-1" @change="change" itemWidth="50%"></tui-tabs>
		<view v-if="currentTab == 1">
			<view v-for="(vo,key) in List.list1.main" @click="inDetail(vo)" :key="key" class="flex align-center justify-between bg-white margin-top-xs padding">
				<view>
					<view class="text-wuer text-lg text-bold margin-bottom-xs">{{vo.company}}</view>
					<view class="text-jiujiujiu text-sm-erliu">{{vo.address}}</view>
					<view class="margin-top-sm text-red-my text-bold text-df">{{vo.see ? '面议' : vo.min + '-' + vo.max}}</view> 
				</view>
				<view class="flex flex-direction align-end">
					<view class="text-jiujiujiu text-sm">{{vo.sTime}}</view>
					<view class="flex align-center public-phone-button" @click.stop="inDetail(vo)">
						<view>查看详情</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view v-for="(vo,key) in List.list2.main" @click="inDetail(vo)" :key="key" class="flex align-center justify-between bg-white margin-top-xs padding">
				<view>
					<view>
						<view class="flex align-center text-lg text-wuer text-bold">
							<view>{{vo.name}}</view>
							<view class="margin-lr-xs">|</view>
							<view>{{vo.birth}}岁</view>
							<image class="invite-sex" src="../../../../static/sexa.png"></image>
							<image class="invite-sex" src="../../../../static/sexb.png"></image>
						</view>
					</view>
					<view class="margin-top-sm text-sm-erliu text-jiujiujiu">{{vo.job}}</view>
				</view>
				<view class="flex flex-direction align-end">
					<view class="text-jiujiujiu text-sm">{{vo.sTime}}</view>
					<view class="flex align-center public-phone-button" @click.stop="inDetail(vo)">
						<view>查看详情</view>
					</view>
				</view>
			</view>
		</view>
		
		<uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more>
	</view>
	</mescroll-uni>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	
	// 导入网络模块
	import {inviteList} from '@/network/invite'
	
	// 导入工具类
	import { getTimeUntilNow } from '@/utils/dealData'
	
	// 导入上拉刷新组件
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	
	export default{
		components:{
			uniLoadMore,
			tuiTabs,
			MescrollUni
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'issueinvite'
			})
		},
		onLoad() {
			this.token = this.$store.getters.isToken
			if(this.token){
				
			}else{
				uni.showToast({
					title:'您还未登录',
					icon:'none'
				})
			}
		},
		data(){
			return{
				token:'',
				loadingimg:false,//login加载
				loadingType:2,//login状态
				List:{
					//招聘
					list1:{
						page:1,
						main:[]
					},
					//求职
					list2:{
						page:1,
						main:[]
					}
					 
				},
				currentTab: 1,
				navbar: [{
					name: "招聘",
					cate:1
				}, {
					name: "求职",
					cate:2
				}],
				page:1,
				notMore:false,
				isUpdata:true,
				isUp:{
					textNoMore:'----没有更多了---'
				},
				isLoading:true
			}
		},
		methods:{
			// 获取列表数据
			inviteList(page,limit,cate,token,mescroll){
				const that = this
				inviteList(page,limit,cate,token).then(res => {
					const list = res.data.data
					if(list.length){
						this.List[this.dealList].main.push(...list.map(x => {
							return {
								sTime:that.dealTime(x.add_time),
								...x
							}
						}))
						this.List[this.dealList].page ++ 
						this.loadingimg = false
					}else{
						this.isLoading = false
						this.loadingimg = true
					}
					if(mescroll){
						mescroll.endErr();
					}
				})
			},
			change(e) {
				this.currentTab = e.index*1+1*1
				this.inviteList(this.List[this.dealList].page,10,this.currentTab,this.token)
				uni.setNavigationBarTitle({
					title:this.currentTab == 1 ? '招聘信息' : '求职信息'
				})
			},
			goNavBar() {
				uni.navigateTo({
					url: "/pages/navbar-1/navbar-1"
				})
			},
			// 跳转详情页
			inDetail(vo){
				
				uni.navigateTo({
					url:`inviteDetail?id=${vo.id}&type=${this.currentTab}`
				})
			},
			
			// 处理时间
			dealTime(str){
				const o_time =new Date(str.replace(/-/g,'/')).getTime()
				const n_time = new Date().getTime()
				const result = (Math.round((n_time - o_time)))
				return getTimeUntilNow(result)
			},
			// 下拉刷新方法
				downCallback(mescroll) {
								this.List.list1.main=[]
								this.List.list1.page = 1
								this.List.list2.main=[]
								this.List.list2.page = 1
								this.isLoading = true
								this.inviteList(this.List[this.dealList].page,10,this.currentTab,this.token,mescroll)
				},
							
				upCallback(mescroll) {
					if(this.isLoading){
						this.inviteList(this.List[this.dealList].page,10,this.currentTab,this.token,mescroll)
					}else{
						mescroll.endErr();
					}
				}
		},
		computed:{
			dealList(){
				return this.currentTab == 1 ? 'list1' : 'list2'
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
