<template>
	
	<view>
		<tui-tabs class="tui" selectedColor="#D14243" sliderBgColor="#D14243" :tabs="navbar" :currentTab="currentTab - 1" @change="change" itemWidth="50%"></tui-tabs>
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" ref="mescroll" :top="70">
			<view v-if="currentTab == 1">
				<view v-for="(vo,key) in List" @click="inDetail(vo)" :key="key" class="flex align-center justify-between bg-white margin-top-xs padding">
					<view>
						<view class="text-wuer text-lg text-bold margin-bottom-xs"><text class="text-gray text-sm margin-right">公司名称：</text>{{vo.company}}</view>						
						<view class="text-black text-lg margin-bottom-xs "><text class="text-gray text-sm margin-right">招聘岗位：</text>{{vo.job}}</view>
						<view class="text-jiujiujiu text-sm-erliu text-cut" style="width: 554upx;"><text class="text-gray text-sm margin-right">工作地点：</text>{{vo.address}}</view>
						<view class="margin-top-sm text-red-my text-bold text-df"><text class="text-gray text-sm margin-right">薪资：</text>{{vo.see ? '面议' : vo.min + '-' + vo.max}}</view> 
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
				<view v-for="(vo,key) in List" @click="inDetail(vo)" :key="key" class="flex align-center justify-between bg-white margin-top-xs padding">
					<view>
						<view>
							<view class="flex align-center text-lg text-wuer text-bold">
								<view>{{vo.name}}</view>
								<view class="margin-lr-xs">|</view>
								<view>{{vo.birth}}岁</view>
								<!-- <image class="invite-sex" src="../../../../static/sexa.png"></image>
								<image class="invite-sex" src="../../../../static/sexb.png"></image> -->
							</view>
						</view>
						<view class="margin-top-sm text-sm-erliu text-jiujiujiu">{{vo.job}}{{vo.sTime}}</view>
					</view>
					<view class="flex flex-direction align-end">
						<view class="text-jiujiujiu text-sm">{{vo.sTime}}</view>
						<view class="flex align-center public-phone-button" @click.stop="inDetail(vo)">
							<view>查看详情</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	<Modal v-model="show1" title='提示' text='您的位置显示异常,是否重新获取位置？' @confirm="setLoction" />
	</view>

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
	
	import Modal from '@/components/x-modal/x-modal'
	export default{
		components:{
			uniLoadMore,
			tuiTabs,
			MescrollUni,
			Modal
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'issueinvite'
			})
		},
		onLoad(e) {
			this.token = this.$store.getters.isToken
			
			if(this.token){
				if(e.index) this.loadingType = e.index
				const weidu = this.$store.state.userInfo.address.latitude,
				jingdu = this.$store.state.userInfo.address.longitude
				if(weidu && jingdu){
					this.weidu = weidu 
					this.jingdu = jingdu
				}else{
					this.show1 = true
				}
			}else{
				uni.showToast({
					title:'您还未登录',
					icon:'none'
				})
			}
		},
		data(){
			return{
				show1:false,
				jingdu:'',
				weidu:'',
				token:'',
				loadingimg:false,//login加载
				loadingType:1,//login状态
				List:[],
				currentTab: 1,
				navbar: [{
					name: "招聘",
					cate:1
				}, {
					name: "求职",
					cate:2
				}],
				// 下拉刷新的常用配置
				downOption: { 
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					},
					textNoMore:'-- 没有更多了 --'
				},
				isLoading:true
			}
		},
		methods:{
			// 获取列表数据
			inviteList(page,limit,mescroll){
				const that = this
				 ,token = this.token
				 ,cate = this.currentTab
				 ,jingdu = this.jingdu
				 ,weidu = this.weidu
				inviteList(page,limit,cate,token,jingdu,weidu).then(res => {
					let list = res.data.data
					if(list.length){
						list = list.map(x => {
							return {
								sTime:that.dealTime(x.add_time),
								...x
							}
						})
					}
					if(list.length < page){
						this.isLoading = false
					}else{
						this.isLoading = true
					}
					if(page == 1) this.List = []
					this.List = this.List.concat(list)
					mescroll.endSuccess(list.length, this.isLoading);
				})
			},
			change(e) {
				this.currentTab = e.index*1 + 1
				this.List = []
				this.$refs.mescroll.mescroll.resetUpScroll()
			},
			goNavBar() {
				uni.navigateTo({
					url: "/pages/navbar-1/navbar-1"
				})
			},
			// 获取位置
			setLoction(){
				// 调用接口和获取当前地理位置
				this.$store.dispatch('getUserLocation').then(res => {
						this.dealWps(res)
				}).catch(err => {
					uni.showToast({
						title:'err',
						icon:'none'
					})
				})
			},
			// 根据经度纬度确定位置
			dealWps(address){
				const {latitude,longitude} = address
				// 发送给vuex进行存储
				this.$store.commit('setUserAddress',address)
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
								// this.List.list1.main=[]
								// this.List.list1.page = 1
								// this.List.list2.main=[]
								// this.List.list2.page = 1
								// this.isLoading = true
								// this.inviteList(this.List[this.dealList].page,10,this.currentTab,this.token,mescroll)
						mescroll.resetUpScroll()
				},
			
				upCallback(mescroll) {
					let pageNum = mescroll.num; // 页码, 默认从1开始
					let pageSize = mescroll.size; // 页长, 默认每页10条
					this.inviteList(pageNum,pageSize,mescroll)
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
	.mescroll {
		position: fixed;
		top: 78px;
		bottom: 0;
		height: auto;
	 }
</style>
