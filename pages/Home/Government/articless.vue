<template>
		<view>
			<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
			<view class="bg-white">
				<video v-if="html.video" class="video" :src="html.video" :autoplay="true" ></video>
				<view class="margin-lr" >
					<view class="text-wuer text-xl text-bold">{{html.title}}</view>
					<view class="flex align-center margin-tb">
						<view style="color: #BFBFBF">{{html.add_time}}</view>
						<view class="margin-left-sm text-jiujiujiu">阅读数{{html.browse_num}}</view>
					</view>
					<parser v-if="html.content" :html="html.content"></parser>
				</view>
			</view>
		</view>
</template>

<script>
	import parser from "@/components/jyf-Parser/index"
	
	// #ifdef APP-PLUS
	// 导入分享方法
	import share from "@/common/share.js";
	// #endif
	
	// 導入網絡模塊
	import { getNewsDetail } from '@/network/news'
	export default{
		components:{
			parser,
		},
		
		onLoad(option) {
			if(option.id){
				const id = option.id
				console.log(id)
				const token = this.$store.getters.isToken
				this.getNewsDetail(id,token)
			}
			const res = uni.getSystemInfoSync()
			this.contentHeight = res.windowHeight
			
		},
		onNavigationBarButtonTap(){
			this.shareInfo()
		},
		data(){
			return{
				html:{}	,
				contentHeight:0,
				isLoadImage:false
			}
		},
		onReady() {
			if(this.isLoadImage == false){
				this.$refs.loading.open()
			}
		},
		methods:{
			getNewsDetail(id,token){
				getNewsDetail(id,token).then(res => {
					this.$refs.loading.close()
					this.isLoadImage = true
					this.html = res.data.data
				})
			},
			//分享
			shareInfo(){
				let shareInfo={
					href:"http://jn.51kdd.com/index.html#/",
					title:this.html.title,
					desc:this.html.title,
					imgUrl:this.html.image[0]
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
						},
						complete:() =>  {
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
				})
			}
				
		},
	}
</script>

<style lang="scss">
	.video{
		height: 500upx;
		width: 100%;
	}
	
</style>
