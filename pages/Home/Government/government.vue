<template>
	<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption">
		<view>
			<block v-for="(vo,key) in govermentList" :key="key" v-if="govermentList.length">
				<view class="bg-white margin-top-sm goverment-all">
					<view class="margin-lr">
						<view @tap="articleClick(vo)" class="padding-bottom-sm padding-top-xxl text-wuer text-sm-erliu">{{vo.title}}</view>
						<view @tap="articleClick(vo)" class="flex align-center" v-if="!vo.video">
							<image class="goverment-image" v-for="(item,index) in vo.image" :key="index" :src="item" mode="aspectFill"></image>
						</view>
						<view v-else @tap="articleClick(vo)" class="bg-white margin-top-sm video-part">
							<text class="lg video-btn text-white cuIcon-videofill"></text>
							<image class="vid-image" :src="vo.image[0]" />	
						</view>
						<view class="flex align-center justify-between padding-tb-sm">
							<view class="text-jiujiujiu text-sm ">{{vo.add_time}}</view>
							<view class="lg text-gray cuIcon-share goverment-all-button" @tap="shareInfo(vo)">分享</view>
						</view>
					</view>
				</view>
				
			</block>
			
			<!-- <uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more> -->
		</view>
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</mescroll-uni>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	
	import {getNewsList} from '@/network/news'
	
	import mescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
	
	// #ifdef APP-PLUS
	// 导入分享方法
	import share from "@/common/share.js";
	// #endif
	
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	export default{
		components:{
			uniLoadMore,
			mescrollUni
		},
		data(){
			return{
				loadingimg:false,//login加载
				loadingType:1,//login状态
				govermentList:[],
				page:1,
				limit:10,
				seach:'',
				todayList:[],
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
					textNoMore:'-- 没有更多了 --',
					empty: {
						tip: '暂无相关数据'
					}
				},
				token:'',
				text:'',
				hasNext:true
			}
		},
		onLoad() {
			if(this.$store.getters.isToken){
				this.token = this.$store.getters.isToken
			}else{
				uni.uni.redirectTo({
					url:'../../login/login'
				})
			}
		},
		onReady() {
			this.$refs.loading.open()
		},
		// 监听搜索框确认
		onNavigationBarSearchInputConfirmed(e){
			this.text = e.text
			this.govermentList = ''
			const mescroll = this.$refs.mescroll.mescroll
			mescroll.resetUpScroll()
			// #ifdef APP-PLUS
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1].$getAppWebview()
			currentPage.setTitleNViewSearchInputText('');
			// #endif
		},
		methods:{
			//文章详情页
			articleClick(vo){
				uni.navigateTo({
					url:'articless?id=' + vo.id
				})
			},
			// 下拉刷新方法
			downCallback(mescroll) { 
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.getNewsList(pageNum,pageSize,mescroll)
			},
			// 获取数据
			getNewsList(pageNum,pageSize,mescroll){
				const token = this.token,seach = this.text
				this.text = ''
				getNewsList(pageNum,pageSize,seach,token).then(res => {
					this.$refs.loading.close()
					if(res.data.code == 200){
						const obj = res.data.data
						if(obj.newsList.length){
							obj.newsList.forEach(x => {
								x.image = x.image.map(x => {
									return replaceImage(x)
								})
							})
						}
						this.hasNext = obj.newsList.length >= pageSize 
						console.log(this.hasNext)
						if(pageNum == 1) this.govermentList = []
						this.govermentList = this.govermentList.concat(obj.newsList)
						mescroll.endSuccess(obj.newsList.length, this.hasNext);
						
						this.todayList = res.data.data.today
					}
				})
			},
			//分享
			shareInfo(vo){
				let shareInfo={
					href:"http://jn.51kdd.com/index.html#/",
					title:'老家商城',
					desc:vo.title,
					imgUrl:vo.image[0]
				};
				let shareList=[
					{
						icon:"/static/sharemenu/wechatfriend.png",
						text:"微信好友",
					},
					{
						icon:"/static/sharemenu/wechatmoments.png",
						text:"朋友圈"
					},
					{
						icon:"/static/sharemenu/copyurl.png",
						text:"复制"
					},
					{
						icon:"/static/sharemenu/more.png",
						text:"更多"
					},
				];
				this.shareObj=share(shareInfo,shareList,function(index){
					console.log("点击按钮的序号: " + index);

					let shareObj={
						href:shareInfo.href||"",
						title:shareInfo.title||"",
						summary:shareInfo.desc||"",
						success:(res)=>{
							console.log("success:" + JSON.stringify(res));
							uni.hideLoading()
						},
						fail:(err)=>{
							console.log("fail:" + JSON.stringify(err));
							uni.hideLoading()
						}
					};
					switch (index) {
						case 0:
							shareObj.provider="weixin";
							shareObj.scene="WXSceneSession";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.showLoading({
								title:'加载中...',
								mask:true
							})
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider="weixin";
							shareObj.scene="WXSenceTimeline";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.showLoading({
								title:'加载中...',
								mask:true
							})
							uni.share(shareObj);
							break;
						case 2:
							uni.setClipboardData({
								data:shareInfo.href,
								complete() {
									uni.showToast({
										title: "已复制到剪贴板"
									})
								}
							})
							break;
						case 3:
							plus.share.sendWithSystem({
								type:"web",
								title:shareInfo.title||"",
								thumbs:[shareInfo.imgUrl||""],
								href:shareInfo.href||"",
								content: shareInfo.desc||"",
							})
							break;
					};
				});
				this.$nextTick(()=>{
					this.shareObj.alphaBg.show();
					this.shareObj.shareMenu.show();
					// uni.showLoading({
					// 	title:'加载中...',
					// 	mask:true
					// })
				})
			}
			
		},
		onBackPress() {

		}
}
</script>

<style lang="scss">
	.goverment-image{
		width:220upx;
		height:196upx;
		border-radius:10upx;
		margin-right: 10upx;
	}
	.goverment-image:nth-child(3){
		margin-right: 0;
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
	.video-part{
		height: 380upx;
		display: flex;
		justify-content: center;
		width: 100%;
		overflow: hidden;
		position: relative;
		.vid-image{
			height: 100%;
			max-width: 100%;		
			border-radius: 10upx;
			position: relative;
			z-index: 8;
		}
		.video-btn{
			position: absolute;
			font-size: 120upx;
			color: #FFFFFF;
			left: 50%;
			top:50%;
			transform: translateX(-50%) translateY(-50%);
			z-index: 9;
		}

	}
</style>
