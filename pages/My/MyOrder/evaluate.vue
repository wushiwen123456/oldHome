<template>
	<view>
		<!-- 多个订单循环开始 -->
		<view>
			<view @click="goDetail" class="margin-top-xs bg-white flex align-center evaluate-title solid-bottom">
				<image class="evaluate-title-image margin-left" :src="orderInfo.productInfo.attrInfo ? orderInfo.productInfo.attrInfo.image : orderInfo.productInfo.image"></image>
				<view class="p-info">
					<text class="p-title">{{orderInfo.productInfo.store_name}}</text>
					<view class="p-contain">
						<text v-if="orderInfo.productInfo.attrInfo">类型: {{orderInfo.productInfo.attrInfo ? orderInfo.productInfo.attrInfo.suk : orderInfo.productInfo.suk}}</text>
						<text v-if="!orderInfo.productInfo.attrInfo">默认类型</text>
						<text>x{{orderInfo.cart_num}}</text>
					</view>
				</view>
			</view>
			<view class="bg-white">
				<textarea class="text-width padding text-df" v-model="center" placeholder="赶紧评论分享给你的小伙伴吧"></textarea>
			</view>
			
			<view class="tui-upload-box bg-white padding-left">
				<view class="tui-upload-item" v-for="(item,index) in files" :key="index">
					<image :src="item" class='tui-upload-img' @tap="previewImage" mode="aspectFill" :id="item"></image>
					<tui-icon color="#ed3f14" :size="24" name="close-fill" class="tui-upload-del" :index="index" @click="deleteImage"></tui-icon>
				</view>
				<view class="tui-upload-item tui-upload-add" v-if="files.length < 3" hover-class="tui-opcity" :hover-stay-time="150" @tap="chooseImage">
					<text>+</text>
				</view>
			</view>
			<view class="bg-white margin-top-sm">
				<view class="flex align-center evaluate-title-all solid-bottom margin-right">
					<view class="text-wuer margin-left margin-right-sm">商品描述</view>
					<tui-rate v-if="hackReset" :current="pIndex" @change="changeindex($event)" normal="#ccc" active="#FF5400" :size="26"></tui-rate>
				</view>
				<view class="flex align-center evaluate-title-all margin-right">
					<view class="text-wuer margin-left margin-right-sm">物流服务</view>
					<tui-rate :current="logistics" @change="logisticschange($event)" normal="#ccc" active="#FF5400" :size="26"></tui-rate>
				</view>
				<view class="flex align-center evaluate-title-all margin-right">
					<view class="text-wuer margin-left margin-right-sm">客服服务</view>
					<tui-rate :current="service" @change="servicechange($event)" normal="#ccc" active="#FF5400" :size="26"></tui-rate>
				</view>
			</view>
		</view>
		<!-- 多个订单循环end -->
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiRate from "@/components/rate/rate"
	
	// 上传图片接口
	import { upload } from '@/network/sign'
	
	// 评价接口
	import { evalu } from '@/network/affirm'
	export default {
		components:{
			tuiRate,
			tuiIcon
		},
		data() {
			return {
				center:'',//分享内容
				loadding: false,
				show: false,
				c_index: 3,
				files: [] ,//最多上传3张图片
				id:'',
				orderInfo:{},
				shopList:[],
				hackReset:true,
				// 网络图片组
				networkImgs:[],
				pIndex:0,
				logistics:0,
				service:0,
				token:'',
				clickFalse:true
			}
		},
		onNavigationBarButtonTap(e){	
				const obj = {
					unique:this.orderInfo.unique,
					comment:this.center,
					pics:[],
					product_score:this.pIndex,
					expressage_score:this.logistics,
					service_score:this.service,
					user_show:0
				}
				if(!obj.comment){
					// #ifdef APP-PLUS
					plus.nativeUI.toast('请输入评论类容');
					// #endif
					return 
				}
				if(this.files.length){
					// #ifdef APP-PLUS
					var w = plus.nativeUI.showWaiting("等待中...");
					// #endif
					const token = this.$store.getters.isToken
					console.log(token)
					this.files.forEach((x,index) => {
						upload(token,x,true).then(res => {
							
							obj.pics.push(res.url)
							if(obj.pics.length == this.files.length){
								
								evalu(obj,this.token).then(res => {
									if(res.data.code == 200){
										// #ifdef APP-PLUS
										plus.nativeUI.toast('评论成功');
										uni.navigateBack()
										// #endif
									}else{
										// #ifdef APP-PLUS
										plus.nativeUI.toast(res.data.msg);
										// #endif
										uni.navigateBack()
									}
									// #ifdef APP-PLUS
									w.close()
									// #endif
								})
								
							}
						})
					})
				}else{
					evalu(obj,this.token).then(res => {
						if(res.data.code == 200){
							// #ifdef APP-PLUS
							plus.nativeUI.toast('评论成功');
							// #endif
							uni.navigateBack()
						}else{
							// #ifdef APP-PLUS
							plus.nativeUI.toast(res.data.msg);
							// #endif
							uni.navigateBack()
						}
					})
				}
				
				
		},
		onLoad() {
			const info = this.$store.state.orderDetail
			if(Object.keys(info).length){			
				this.orderInfo = info
			}
		},
		onShow() {
			this.token = this.$store.getters.isToken
		},
		methods: {
			// 商品评价
			changeindex: function(e) {
				// this.hackReset = false
				// const index = e.index
				// this.$set(item,'pIndex',index)
				// this.$nextTick(() => {
				// 	this.hackReset = true
				// })
				this.pIndex = e.index
			},
			//物流评分
			logisticschange: function(e){
				// this.hackReset = false
				// const index = e.index
				// this.$set(item,'logistics',index)
				// this.$nextTick(() => {
				// 	this.hackReset = true
				// })
				this.logistics = e.index
			},
			//客服评分
			servicechange: function(e){
				// this.hackReset = false
				// const index = e.index
				// this.$set(item,'service',index)
				// this.$nextTick(() => {
				// 	this.hackReset = true
				// })
				this.service = e.index
			},
			chooseImage: function (e) {
				let that = this;
				if (that.files.length >= 3) {
					// #ifdef APP-PLUS
					plus.nativeUI.toast("最多上传三张哦");
					// #endif
					return
				}
				wx.chooseImage({
					count: 3,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						that.files=that.files.concat(res.tempFilePaths)
						//上传图片
						//...
						// upload(res.tempFilePaths[0],true).then(res => {
						// 	that.networkImgs.push(res.url)
						// })
						
					},
					fail:() => {
						// #ifdef APP-PLUS
						plus.nativeUI.toast("最多上传三张哦");
						// #endif
					}
				})
			},
			previewImage: function (e) {
				uni.previewImage({
					current: e.currentTarget.id, // 当前显示图片的http链接
					urls: this.files // 需要预览的图片http链接列表
				})
			},
			deleteImage: function (e) {
				const index = e.index;
				this.files.splice(index, 1);
			},
			// 进入详情页
			goDetail(){
				const info = this.orderInfo
				if(info.productInfo.id){
					if(info.combination_id != 0){
						const id = info.combination_id
						this.$store.commit('setcombinId',id)
						uni.navigateTo({
							url:'../../ShopDetails/groubBooking'
						})
					}else if(info.seckill_id != 0){
						const id = info.seckill_id
						this.$store.commit('setSkillId',id)
						uni.navigateTo({
							url:'../../ShopDetails/seckillTime'
						})
					}else{
						const id = info.productInfo.id
						uni.navigateTo({
							url:`../../ShopDetails/shopDetails?id=${id}`
						})
					}
					
					
				}
				
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../colorui/thorui.css';
	.evaluate-title-image{
		width: 96upx;
		height: 96upx;
	}
	.evaluate-title{
		height: 136upx;
	}
	.evaluate-title-all{
		height: 100upx;
	}
	.p-info{
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0 30upx 0 15upx;
		line-height: 1.8;
		
		.p-title{
			width: 480upx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			color: #666666;
			font-size: 28upx;
		}
		.p-contain{
			display: flex;
			justify-content: space-between;
			color: #999999;
			font-size: 24upx;
		}
	}
	.tui-upload-del{
		z-index: 999;
	}
</style>
