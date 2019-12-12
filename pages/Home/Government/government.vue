<template>
	<view>
		<!-- <block v-for="(vo,key) in todayList" :key="key" v-if="todayList.length">
			<view class="bg-white margin-top-sm goverment-all">
				<view class="margin-lr">
					<image class="goverment-all-image" src="../../../static/newc.png"></image>
					<view @tap="articleClick(vo)" class="padding-bottom-sm padding-top-xxl text-wuer text-sm-erliu">美国政府希望向华为的竞争对手提供信贷...</view>
					<view @tap="articleClick(vo)" class="flex align-center justify-between">
						<image class="goverment-image" src="../../../static/56524a9a3b6bdab0753eb8ed922d57d.png" mode="aspectFill"></image>
						<image class="goverment-image" src="../../../static/56524a9a3b6bdab0753eb8ed922d57d.png" mode="aspectFill"></image>
						<image class="goverment-image" src="../../../static/56524a9a3b6bdab0753eb8ed922d57d.png" mode="aspectFill"></image>
					</view>
					<view class="flex align-center justify-between padding-tb-sm">
						<view class="text-jiujiujiu text-sm ">2019-10-19</view>
						<view class="lg text-gray cuIcon-share goverment-all-button" @tap="share">分享</view>
					</view>
				</view>
			</view>
		</block> -->
		<block v-for="(vo,key) in govermentList" :key="key" v-if="govermentList.length">
			<view class="bg-white margin-top-sm goverment-all">
				<view class="margin-lr">
					<view @tap="articleClick(vo)" class="padding-bottom-sm padding-top-xxl text-wuer text-sm-erliu">{{vo.title}}</view>
					<view @tap="articleClick(vo)" class="flex align-center">
						<image class="goverment-image" v-for="(item,index) in vo.image" :key="index" :src="item" mode="aspectFill"></image>
					</view>
					<view class="flex align-center justify-between padding-tb-sm">
						<view class="text-jiujiujiu text-sm ">{{vo.add_time}}</view>
						<view class="lg text-gray cuIcon-share goverment-all-button" @tap="shareInfo(vo)">分享</view>
					</view>
				</view>
			</view>
		</block>
		<uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	
	import {getNewsList} from '@/network/news'
	
	
	// #ifdef APP-PLUS
	// 导入分享方法
	import share from "@/common/share.js";
	// #endif
	
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	export default{
		components:{
			uniLoadMore
		},
		data(){
			return{
				loadingimg:false,//login加载
				loadingType:1,//login状态
				govermentList:[],
				page:1,
				limit:10,
				seach:'',
				todayList:[]
			}
		},
		onLoad() {
			if(this.$store.getters.isToken){
				this.getNewsList(this.page,this.limit,this.seach,this.$store.getters.isToken)
			}else{
				uni.navigateTo({
					url:'../../login/login'
				})
			}
		},
		methods:{
			//文章详情页
			articleClick(vo){
				uni.navigateTo({
					url:'articless?id=' + vo.id
				})
			},
			
			// 获取数据
			getNewsList(page,limit,seach,token){
				getNewsList(page,limit,seach,token).then(res => {
					if(res.data.code == 200){
						const obj = res.data.data
						obj.newsList.forEach(x => {
							x.image = x.image.map(x => {
								return replaceImage(x)
							})
						})
						
						this.govermentList = res.data.data.newsList
						this.todayList = res.data.data.today
					}
				})
			},
			//分享
			shareInfo(vo){
				let shareInfo={
					href:"https://uniapp.dcloud.io",
					title:vo.title,
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
						},
						fail:(err)=>{
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider="weixin";
							shareObj.scene="WXSceneSession";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider="weixin";
							shareObj.scene="WXSenceTimeline";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
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
				})
			}
			
		},
		onBackPress() {
			// #ifdef APP-PLUS
			//监听back键，关闭弹出菜单
			if (nvImageMenu.isVisible()) {
				nvImageMenu.hide()
				nvMask.hide()
				return true
			}
			// #endif
		}
}
</script>

<style>
	.goverment-image{
		width:220upx;
		height:196upx;
		border-radius:10upx;
		margin-right: 10upx;
	}
	..goverment-image:nth-child(3){
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
</style>
