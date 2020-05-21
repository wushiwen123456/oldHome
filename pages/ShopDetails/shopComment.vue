<template>
	<view>
		
		<view class="Myevaluate"  v-if="MyevaluateList.length" v-for="(vo,key) in MyevaluateList" :key="key">
			
			<view class="dis-flex flex-jus-space flex-item-cent">
				<view class="dis-flex flex-item-cent">
					<image class="Myevaluate-totle-head-img" :src="vo.avatar"></image>
					<view>{{vo.nickname}}</view>
				</view>
				<view @tap="openPopupClick" class="Myevaluate-title-more">···</view>
			</view>
			
			<view class="Myevaluate-title-type">{{vo.add_time}}  购买规格： {{vo.suk || '默认'}}</view>
			
			<view class="Myevaluate-title-main">{{vo.comment}}</view>
			
			<view v-if="MyevaluateList.merchant_reply_content">
				<view class="Myevaluate-title-main-sanjiao"></view>
				<view class="Myevaluate-title-main-huifu"><span style="color: #333333"> 掌柜回复: </span>{{MyevaluateList.merchant_reply_content}}</view>
			</view>
			
			<view class="Myevaluate-title-classify dis-flex" v-if="vo.pics.length">
				<image @click="lookDetail(item)" v-for="(item,index) in vo.pics" :src="item" />
			</view>
			
			<view class="dis-flex flex-jus-space Myevaluate-title-bottom">
				<view class="dis-flex">
					<view>浏览0次</view>
					<view class="Myevaluate-title-txt">点赞0次</view>
				</view>
				<view class="Myevaluate-title-buttom-txt Myevaluate-title-buttom-txt">已追评</view>
				<!-- <button class="Myevaluate-title-button">写追评</button> -->
			</view>
			
		</view>
		<uni-popup ref="popups" type="center">
			<view class="popups-txt-all">
				<view @click="removeComment" hover-class="havor-class" class="popups-txt">删除评论</view>
				<view @click="goodComment" hover-class="havor-class" class="popups-txt">点赞</view>
				<view @tap="closePopupsClick" hover-class="havor-class" class="popups-txt">取消</view>
			</view>
		</uni-popup>
		<x-loading text="加载中..." mask="true" click="true" ref="loading"  />
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	import { productCommont } from '@/network/detail'
	
	// 处理url的工具
	import { replaceImage } from '@/utils/dealUrl'
	
	// 放大图片的工具
	import { clickDetail } from '@/common/detail'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				MyevaluateList:'',
				productId:'',//商品id
				isLoadingNetwork:false
			}
		},
		onLoad(e) {	
			this.productId = e.id
			this.commentlist();
			
		},
		onReady() {
			if(!this.isLoadingNetwork){
				this.$refs.loading.open()
			}
		},
		methods: {
			// 放大图片
			lookDetail(image){
				clickDetail(image)
			},
			//获取商品评论列表
			commentlist(){
				productCommont(this.productId).then( res =>{
					this.$refs.loading.close()
					this.isLoadingNetwork = true
					if(res.data.code == 200){
					let list = res.data.data
					this.dealRes(list)
					}
				})
			},
			
			// 对数据进行处理
			dealRes(list){
				list.forEach(x => {
					x.avatar = replaceImage(x.avatar)
					x.pics = x.pics.map(y => {
						return replaceImage(y)
					})
				})
				this.MyevaluateList = list
			},
			
			openPopupClick(){
				this.$refs.popups.open()
			},
			closePopupsClick(){
				this.$refs.popups.close()
			},
			// 点赞评论(暂未实现)
			goodComment(){
				this.$refs.popups.close()	
			},
			// 删除评论(暂未实现)
			removeComment(){
				this.$refs.popups.close()
			}
		}
	}
</script>

<style lang="scss">
	.Myevaluate{
		margin-top: 20upx;
		padding: 34upx 24upx 30upx 24upx;
		background: #FFFFFF;
	}
	.dis-flex{
		display: flex;
	}
	.flex-item-cent{
		align-items: center;
	}
	.flex-jus-space{
		justify-content: space-between;
	}
	.Myevaluate-totle-head-img{
		width: 56upx;
		height: 56upx;
		border-radius: 50%;
		margin-right: 16upx;
	}
	.Myevaluate-title-more{
		font-size: 60upx;
		color: #999999;
	}
	.Myevaluate-title-type{
		color: #888888;
		font-size: 24upx;
		margin: 20upx 0 30upx 0;
	}
	.Myevaluate-title-main{
		color: #333333;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
	.Myevaluate-title-main-img{
		width: 226upx;
		height: 226upx;
		margin-right: 12upx;
		margin-bottom: 4upx;
	}
	.Myevaluate-title-main-img:nth-child(3n){
		margin-right: 0upx;
	}
	.Myevaluate-title-main-sanjiao{
		position:relative;
		width: 0;
		height: 0;
		border-width: 0 24upx 24upx;
		border-style: solid;
		border-color: transparent transparent #f5f5f5;
		margin-left: 80upx;
	}
	.Myevaluate-title-main-huifu{
		padding: 24upx 24upx 24upx 18upx;
		background: #f5f5f5;
		border-radius: 10upx;
		color: #666666;
	}
	.Myevaluate-title-classify{
		margin-top: 30upx;
		background: #f5f5f5;
		color: #333333;
		padding: 10upx;
		image{
			margin-right: 20upx;
		}
	}
	.Myevaluate-title-classify image{
		width: 140upx;
		height: 140upx;
	}
	.Myevaluate-title-classify-name{
		max-width: 500upx;
		overflow:hidden;
		text-overflow:ellipsis; 
		display:-webkit-box; 
		-webkit-box-orient:vertical; 
		-webkit-line-clamp:2; 
	}
	.Myevaluate-title-classify-txt{
		margin-left: 40upx;
		margin-top: 26upx;
	}
	.Myevaluate-title-bottom{
		color: #999999;
		font-size: 24upx;
		margin-top: 30upx;
	}
	.Myevaluate-title-button{
		width: 140upx;
		height: 42upx;
		border-radius: 21upx;
		border: solid 2upx #fe4d3d;
		font-size: 24upx;
		color: #fe4d3d;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
	}
	.Myevaluate-title-txt{
		margin-left: 20upx;
	}
	.Myevaluate-title-buttom-txt{
		margin-right: 36upx;
	}
	.popups-txt-all{
		/* height: 260upx; */
		color: #333333;
		font-size: 32upx;
		border-radius: 20upx;
		width: 600upx;
		display: flex;
		flex-direction: column;
	}
	.popups-txt{
		height: 100upx;
		line-height: 100upx;
		padding-left: 100upx;
	}
	
</style>
