<template>
		<view>
			<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
			<view v-if="Object.keys(detailData).length">
				<!-- head -->
				<view class="shopDetails-title" >
					<swiper :hidden="autoplay" class="screen-swiper" circular="true"
					 :autoplay="!autoplay" interval="3500" duration="500" :current="swiperNum" @change="swiperChange">
						<swiper-item @tap="BoFang" v-if="videoUrl" class="item1">
							<image src="/static/play/larkcloud_play.png" mode="aspectFill"></image>
						</swiper-item>
						<swiper-item @tap="swiperDetail" v-for="(item,index) in swiperList" :key="index">
							<image :src="item.url" mode="widthFix"></image>
						</swiper-item>
					</swiper>
					<view class="shopDetails-title-select">
						<view class="shopDetails-title-left"></view>
							<view class="flex align-center">
								<view v-if="videoUrl" @tap="selectPlayClick" :class="[swiperNum == 0 ? 'select-title-type' : '']" class="shopDetails-title-play">
									<view class="lg  cuIcon-playfill"></view>
									<view>视频</view>
								</view>
								<view v-if="videoUrl" @tap="selectimageClick" :class="[ swiperNum == 0 ?'':'select-title-type']" class="shopDetails-title-play margin-left-sm ">图片</view>
							</view>
						<view class="shopDetails-title-num">{{swiperNum + 1}}/{{videoUrl ? swiperList.length + 1 : swiperList.length}}</view>
					</view>
				</view>
				
				
				
				
				
				
				<view class="seckilltime-background">
					<view class="flex align-center margin-left-sm">
						<view style="font-size: 70upx;" class="text-price">{{detailData.storeInfo.price}}</view>
						<view class="text-xs margin-left-xs" style="color: #FFD4D2;">
							<view class="seckilltime-yuanjiage">￥{{detailData.storeInfo.ot_price}}</view>
							<view>仅剩:{{detailData.storeInfo.stock}}份</view>
						</view>
					</view>
					<view class="flex flex-direction align-center justify-center margin-right">
						<view class="text-red-my text-sm margin-bottom-xs">限时秒杀</view>
						<tui-countdown :time="skillTime" :colonSize="40" color="#fff" :width="44" :height="36" :size="30" bcolor="#000000" bgcolor="#000000" colonColor="#000000"></tui-countdown>
					</view>
				</view>
				<view class="bg-white padding-left">
					<view class="flex align-center">
						<view class="text-red-my text-xxxl text-bold">￥{{detailData.storeInfo ? detailData.storeInfo.price : ''}}</view>
					</view>	
						<view>
							<view class="flex align-center justify-between margin-right-sm">
								<view class="flex align-center margin-top-xs margin-bottom-xs">
									<view class="cu-tag bg-red-my shopDetails-title-height">购买得积分</view>
								</view>
							</view>
							
							<view class="flex align-center margin-top-sm margin-bottom-sm">
								<view class="flex-four text-three shopDetails-title-name">{{detailData.storeInfo ?  detailData.storeInfo.info : ''}}</view>
								<view @tap="outloginSharClick" class="flex-sub flex align-center justify-center shopDetails-title-shar">
									<view class="lg cuIcon-forward margin-right-xs"></view>
									<view>转发</view>
								</view>
							</view>
							<view class="flex align-center justify-between padding-bottom-sm margin-right-sm text-jiujiujiu">
								<view>快递:<text class="margin-left-sm" v-if="detailData.storeInfo">{{detailData.storeInfo.is_postage == 1 ? '免运费' : detailData.storeInfo.postage + '元'}}</text></view>
								<view>销量{{detailData.storeInfo ? detailData.storeInfo.sales : ''}}</view>
							</view>
						</view>
				</view>
				<!-- head end -->
				
				<!-- 保障 -->
				<!-- <view class="bg-white margin-top-xs flex align-center justify-between shopDetails-baozhanng">
					<view class="flex text-sm-erliu">
						<view class="text-jiujiujiu ">保障</view>
						<view class="margin-left-sm">假一赔四·上门取退·极速退款·七天无理由退换</view>
					</view>
					<view class="lg text-jiujiujiu cuIcon-right"></view>
				</view> -->
				<!-- 保障end -->
				
				<!-- 选择 -->
				<view @tap="outloginShopClick" class="bg-white margin-top-xs padding-bottom-sm">
					<view class=" flex align-center justify-between shopDetails-baozhanng">
						<view class="flex text-sm-erliu">
							<view class="text-jiujiujiu ">选择</view>
							<view class="margin-left-sm">颜色  种类 </view>
						</view>
						<view class="lg text-jiujiujiu cuIcon-right"></view>
					</view>
					<view class="flex align-center shopDetails-select-image">
						<view class="flex-yidw">
							<image v-for="(vo,key) in detailData.productValue" :key="key" class="shopDetails-image" :src="vo.image"></image>
						</view>
						<view class="flex-sub shopDetails-image-select" v-if="detailData.productValue">共有{{Object.keys(detailData.productValue).length}}种类型可选</view>
						<view class="flex-sub shopDetails-image-select" v-if="!detailData.productValue">暂无选择种类</view>
					</view>
				</view>
				<!-- 选择 end -->
				
				<!-- 评价 -->
				<view class="bg-white margin-top-xs">
					<view class="flex align-center justify-between shopDetails-baozhanng">
						<view >商品评价</view>
						<view class="flex text-sm-erliu align-center">
							<view class="text-red-my margin-right-sm"  v-if="Object.keys(commont).length != 0" @click="goMoreCommont">查看更多</view>
							<view style="margin-top: 4upx;" class="lg text-jiujiujiu cuIcon-right"></view>
						</view>
					</view>
					<view class="padding-left padding-right padding-bottom-lg" v-if="Object.keys(commont).length != 0">
						<view class="flex align-center margin-top-xs">
							<image class="comment-image-all" :src="commont.avatar"></image>
							<view class="text-jiujiujiu text-sm margin-left-xs">{{commont.nickname}}</view>
						</view>
						<view style="margin-top: 10upx;">{{commont.comment ? commont.comment : '未作出评价，系统默认好评'}}</view>
						<view class="common-pics">
							<image v-for="(item,index) in commont.pics" @click="goDetail(item)" :src="item"></image>
						</view>
					</view>
				</view>
				<view class="no-comment padding-left padding-right padding-bottom-lg" v-if="Object.keys(commont).length == 0">
					该商品暂无评论，快来抢沙发
				</view>
				<!-- 评价 end -->
				
				
				<!-- 店铺介绍 -->
				<view class="bg-white margin-top-xs shop-deleat-all">
					<view class="flex align-center justify-between margin-bottom-sm">
						<view class="flex">
							<image class="shop-introduce-img" src="../../static/demo9.png" ></image>
							<view class="margin-left-sm flex flex-direction justify-between">
								<view class="shop-detal-name">{{detailData.shop_info.shop_name}}</view>
								<view class="flex align-center text-xs shop-experience">
									<view>综合体验</view>
									<tui-rate :current="detailData.shop_info.zong*1" normal="#ccc" active="#FF5400" :size="10"></tui-rate>
								</view>
							</view>
						</view>
						<view @tap="shopClick(1)" class="select-dianpu">进入店铺</view>
					</view>
					<view style="color: #A0A0A0;"  class="flex align-center justify-between text-xs">
						<view class="flex align-center flex-sub ">
							<view>商品评分</view>
							<view class="padding-left-xs padding-right-xs">{{detailData.shop_info.product_score}}</view>
							<view class="shop-pingfen" >平</view>
						</view>
						<view class="flex align-center flex-sub ">
							<view>物流评分</view>
							<view class="padding-left-xs padding-right-xs">{{detailData.shop_info.expressage_score}}</view>
							<view class="shop-pingfen" >平</view>
						</view>
						<view class="flex align-center flex-sub ">
							<view>服务评分</view>
							<view class="padding-left-xs padding-right-xs">{{detailData.shop_info.service_score}}</view>
							<view class="shop-pingfen" >平</view>
						</view>
					</view>
				</view>
				<!-- 店铺介绍 end -->
				
				
				<!-- 推荐商品 -->
				<view class="bg-white">
					<view @tap="shopClick(1)" class="margin-top-xs flex align-center justify-between shopDetails-baozhanng">
						<view>推荐商品</view>
						<view class="flex text-sm-erliu align-center">
							<view class="text-red-my margin-right-sm">查看全部</view>
							<view style="margin-top: 4upx;" class="lg text-jiujiujiu cuIcon-right"></view>
						</view>
					</view>
					<view class="flex align-center padding-left padding-right">
						<view class="flex-sub" style="margin-right: 20upx;" v-for="(item,index) in detailData.recommend_goods" :key="index" @click="recommClick(item,index)">
							<image class="tuijian-shop-three-image" :src="item.image"></image>
							<view class="text-sm-erliu text-black text-cut" style="width: 200upx;">{{item.store_name}}</view>
							<view class="text-red-my text-sm-erliu margin-top-sm margin-bottom-sm">￥{{item.price}}</view>
						</view>	
					</view>
				</view>
				
				<!-- 推荐商品 end-->
				<view style="height: 74upx;color: #525253;" class="flex align-center justify-center"><text  v-if="detailData.storeInfo.description">———— 商品详情 ————</text></view>
				<!-- 文本分割线 -->
				
				<!-- 商品介绍 -->
				<view  v-if="detailData.storeInfo.description">
					<parser :html="detailData.storeInfo.description"></parser>
				</view>
				<!-- 商品介绍end -->
				
				<view style="height: 100upx;"></view>
				
				<!-- 底部操作条 -->
				<view class="cu-bar bg-white tabbar border shop shopDetails-bottom-all">
					<view class="flex align-center text-xs tab-bar-bottom">
						<view @tap="shopClick(1)" class="flex flex-direction align-center justify-center tab-bar-item">
							<image class="shop-bottom-kefu" src="../../static/shop.png"></image>
							<view>店铺</view>
						</view>
						<view @tap="serviceClick(1)" class="flex flex-direction align-center justify-center tab-bar-item">
							<image class="shop-bottom-kefu" src="../../static/kefu.png"></image>
							<view>客服</view>
						</view>
						<view @tap="collectClick(1)" class="flex flex-direction align-center justify-center tab-bar-item">
							<image class="shop-bottom-kefu" src="../../static/collect.png" v-show="!detailData.storeInfo.userCollect"></image>
							<!-- 已收藏 -->
							<image src="../../static/collectClick.png" class="shop-bottom-kefu" v-show="detailData.storeInfo.userCollect"></image>
							<view>{{detailData.storeInfo.userCollect ? '已收藏' : '收藏'}}</view>
						</view>
					</view>
						<!-- <view @tap="outloginShopClick" class="shopDetails-bottom-button button-left">快来买呀~</view> -->
						<view @tap="outloginShopClick" class="pay-right">立即购买</view>
				</view>
				<!-- 底部操作条end -->
				
				<!-- 选择优惠券 -->
				<!-- <uni-popup ref="popups" type="bottom">
					<view class="shopDetails-bottom-popups">
						<view @tap="closePopupsClick" class="lg text-gray cuIcon-roundclose shopDetails-bottom-popups-clos"></view>
						<view class="text-lg text-center text-wuer">优惠</view>
						<view class="text-jiujiujiu text-df">促销</view>
						<view class="flex align-center margin-top margin-bottom-xl">
							<view class="bg-red-my text-xs shopDetails-bottom-popups-jifen">积分</view>
							<view class="text-sm-erliu">购买可得24积分</view>
						</view>
						<view class="text-jiujiujiu text-df margin-bottom">领券</view>
						<view class="flex align-center justify-between shopDetails-bottom-popups-backone text-red-my" v-for="(item,index) in disCountList" :key="index">
							<view>
								<view class="flex align-center">
									<view class="text-price text-xxxl text-red margin-right-xs">{{item.coupon_price}}</view>
									<view class="text-df">商品优惠券</view>
								</view>
								<view class="text-sm">满39使用</view>
								<view class="text-sm">有效期2019.10.18-2019.11.10</view>
							</view>
							<view class="text-three text-bold">立即领取</view>
						</view>
						<view class="flex align-center justify-between shopDetails-bottom-popups-backtwo text-red-my">
							<view>
								<view class="flex align-center">
									<view class="text-price text-xxxl text-red margin-right-xs">80</view>
									<view class="text-df">商品优惠券</view>
								</view>
								<view class="text-sm">满39使用</view>
								<view class="text-sm">有效期2019.10.18-2019.11.10</view>
							</view>
							<view class="text-three text-bold">立即领取</view>
						</view>
					</view>
				</uni-popup> -->
				
				<!-- 分享 -->
				<uni-popup ref="popup" type="bottom" >
					<view @tap="closePopupsSharClick" class="lg text-gray cuIcon-roundclose margin-top-sm margin-right shopDetails-bottom-popups-clos"></view>
					<view class="share-popup-all">
						<view @tap="shareShowClick(vo,key)" v-for="(vo,key,item) in shareList" :key="key" class="share-popup-sx">
							<image :src="vo.img"></image>
							<view style="font-size: 26upx;">{{vo.name}}</view>
						</view>
					</view>
				</uni-popup>
				
				<!-- 选择商品属性 -->
				<uni-popup ref="popupbottom" type="bottom" >
					<view class="popupbottom-all">
						<view class="flex justify-between solid-bottom">
							<view class="flex align-end margin-bottom-lg ">
								<image class="popupbottom-shop-img" v-if="detailData.storeInfo" @click="openImage"  :src="uniqueType ? uniqueType.image : detailData.storeInfo.image "></image>
								<view class="margin-left-sm">
									<view class="text-price text-red text-bold text-xl">{{uniqueType ? uniqueType.price : detailData.storeInfo.price }}</view>
									<view class="text-sm" style="color: #828282;">库存{{uniqueType ? uniqueType.stock : detailData.storeInfo.stock }}件</view>
									<view class="text-sm user-choose">选择{{isUserChoosed ? isUserChoosed : ''}}</view>
								</view>
							</view>
							<view class="lg text-gray cuIcon-roundclose shopDetails-bottom-popups-clos" @click="chooseClose"></view>
						</view>
						<view class="padding-bottom-sm solid-bottom" v-for="(item,index) in detailData.productAttr">
							<view class=" margin-top-lg margin-bottom">{{item.attr_name}}</view>
							<view class="flex flex-wrap">
								<block v-for="(vo,key) in item.attr_value" :key="key">
									<view @tap="selectShopClick(vo,key,item)" :class="[vo.check?'popupbottom-shop-type-select':'']" class="popupbottom-shop-type-all">{{vo.attr}}</view>
								</block>
							</view>
						</view>
						<view class="flex align-center justify-between solid-bottom shopDetails-num">
							<view>购物数量</view>
							<view>
								<tui-numberbox :value="value"  @change="change"></tui-numberbox>
							</view>
						</view>
						<view class="popupbottom-all-top">
							<!-- <view class="shopDetails-bottom-button popupbottom-all-button button-left">加入购物车</view> -->
							<view @tap="nowBuyClick" class="liji-pay">立即购买</view>
						</view>
					</view>
				</uni-popup>
				
			</view>
		</view>
</template>

<script>
	var that;
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import uniPopup  from "@/components/uni-popup/uni-popup"
	import tuiCountdown from "@/components/countdown/countdown"
	import tuiRate from "@/components/rate/rate"
	import parser from "@/components/jyf-Parser/index"
	
	// 导入网络模块
	import {getDetailSkill} from '@/network/skill'

	import { clickDetail } from '@/common/detail'
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	
	
	// #ifdef APP-PLUS
	// 导入分享方法
	import share from "@/common/share.js";
	// #endif
	export default{
		components: {
			uniPopup,
			tuiNumberbox,
			tuiCountdown,
			tuiRate,
			parser
		},
		onUnload() {
			uni.$off('videoDetail')
		},
		onLoad() {
			that = this
			if(!this.$store.getters.isToken){
				uni.showModal({
					title:"请先去登录再来查看",
					success(res) {
						if(res.confirm){
							uni.navigateTo({
								url:'../login/login'
							})
						}else{
							uni.navigateTo({
								url:"../Home/home"
							})
						}
					}
				})
				return false
			}
			if(this.$store.state.skillId){
				const id = this.$store.state.skillId,
				token = this.$store.getters.isToken
				
				this.skillTime = this.$store.state.skillTime
				// 发送数据请求
				this.getDetailSkill(id,token)
				
			}else{
				uni.switchTab({
					url:"../Home/home"
				})
				return 
			}
		},
		onReady() {
			this.$refs.loading.open()
		},
		data(){
			return{
				timeList: 0,//倒计时
				payimgType:true,//图片或者视频
				swiperNum:0,//当前所在滑块
				videoUrl:'',
				swiperList: [],//轮播数据
				disCountList:[],//优惠券信息
				skillTime:0,
				selectimg:[{
					img:'../../static/demo10.png'
				},{
					img:'../../static/demo11.png'
				},{
					img:'../../static/demo12.png'
				},{
					img:'../../static/demo13.png'
				}],
				shareList:[{
					img:'../../static/weixn.png',
					name:'微信好友'
				},{
					img:'../../static/pengyouq.png',
					name:'朋友圈'
				}],
				list:[{
					id:'0',
					title:'成人款A750g*1盒',
					type:false,
				},{
					id:'0',
					title:'儿童款B750g*1盒',
					type:false,
				},{
					id:'0',
					title:'混合款（15A+15B）750g*1盒',
					type:false,
				}],
				value:1,//步进器
				detailData:{} ,//总数据
				autoplay:false,
				uniqueIndex:0,
				procuctObj:{},
				commont:{}
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
		},
		methods:{
			// 秒杀数据获取
			getDetailSkill(id,token){
				getDetailSkill(id,token)
					.then(res => {
						this.$refs.loading.close()
						if(res.data.code == 200){
							const data = res.data.data
							
							// 对推荐商品进行url处理
							data.recommend_goods.forEach(x => {
								x.image = replaceImage(x.image)
							})
							// 对商品图片进行处理
							data.storeInfo.image = replaceImage(data.storeInfo.image)
							// 对商品图片组进行url处理
							data.storeInfo.images = data.storeInfo.images.map(a => {
								return replaceImage(a)
							})
							data.storeInfo.video = replaceImage(data.storeInfo.video)

							
							// 保存视频
							this.videoUrl = data.storeInfo.video
							
							// 对轮播数据进行处理
							this.dealSwiper(data)
							
							// 处理倒计时
							this.dealTime(data)
							// 判断是否有productValue
							if(data.productValue){
								this.dealProductValue(data)
							}
							// 处理评价信息
							const commont = data.reply
							this.dealCommont(commont)
							
							
							// 赋值
							this.detailData = data
						}
					})
			},
			// 处理轮播数据
			dealSwiper(data){
				this.swiperList = data.storeInfo.images.map((item,index) => {
					return {
						url:item,
						id:index,
						type:'image'
					}
				})
				// if(data.storeInfo.video){
				// 	const obj = {
				// 		url:data.storeInfo.video,
				// 		id:0,
				// 		type:'video'
				// 	}
				// 	this.swiperList.unshift(obj)
				// }
				console.log(this.swiperList)
				
			},
			// 处理倒计时
			dealTime(data){
				const stopTime = data.storeInfo.stop_time
				const date = new Date()
				const time2 = Math.round(date.getTime()/1000)
				this.timeList = stopTime - time2
			},
			// 处理dealProductValue
			dealProductValue(data){
				const obj = data.productValue
				const keys = Object.keys(obj)
				keys.forEach((item,index) => {
					const image = replaceImage(obj[item].image)
					obj[item].image = image
				})
				this.procuctObj = obj
			},
			// 处理评价信息
			dealCommont(obj){
				if(obj){
					const arr = obj.pics.map(x => {
						return replaceImage(x)
					})
					obj.pics = arr
					obj.avatar = replaceImage(obj.avatar)
					this.commont = obj
				}
			},
			//选择商品属性  
			selectShopClick(vo,key,item){
				if(vo.check){
					vo.check = false
				}else{
					item.attr_value.forEach(x => {
						x.check = false
					})
					vo.check = true
				}
			},
			goDetail(item){
				clickDetail(item)
			},
			//选择图片
			selectimageClick(){
				if(this.swiperNum == 0 ){
					this.payimgType = false
					this.ZhanTing()
				}
			},
			//选择视频
			selectPlayClick(){
				if(this.swiperNum != 0){
					this.payimgType = true
					this.BoFang()
				}
			},
			//滑块的change
			swiperChange(e){
				this.swiperNum = e.target.current
				// console.log(e.target.current)
			},
			//点击kefu
			serviceClick(shopname){
				const obj = this.detailData.shop_info
				let shopInfo = JSON.stringify(obj)
				
				uni.navigateTo({
					url:'informtion/informtion?shopInfo=' + shopInfo
				})
			},
			// 进入评论详情
			goMoreCommont(){
				const id = this.detailData.storeInfo.product_id
				uni.navigateTo({
					url:`shopComment?id=${id}`	
				})
			},
			//步进起数值修改
			change: function(e) {
				this.value = e.value
			},
			//立即购买
			nowBuyClick(){
				// uni.navigateTo({
				// 	url:'affirm/affirmOrder'
				// })
				if(!this.uniqueType){
					uni.showToast({
						title:'请选择商品属性',
						icon:'none'
					})
					return 
				}
				const data = this.detailData
				const obj = {
					productId:data.storeInfo.price,
					cartNum:this.value,
					uniqueId:this.uniqueType ? this.uniqueType.unique : '',
					combinationId:'',
					secKillId:data.id,
					bargainId:'',
					shop_id:data.storeInfo.shop_id
				}
				this.$store.dispatch('Pay',obj)
					.then(res => {
						console.log(res)
						if(res.data.code == 200){
							this.$store.commit('keepCartId',res.data.data.cartId)
							const pinkInfo = this.$store.state.pinkInfo
							if(Object.keys(pinkInfo).length){
								this.$store.commit('setOutPinkInfo')
							}
							uni.navigateTo({
								url:"affirm/affirmOrder"
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					})
			},
			// 点击图片预览
			swiperDetail(){
				let arr = this.swiperList
				arr = arr.map(x => x.url)
				console.log(arr)
				// #ifdef APP-PLUS
				plus.nativeUI.previewImage(arr)
				// #endif
			},
			//点击收藏
			collectClick(){
				this.detailData.storeInfo.userCollect = !this.detailData.storeInfo.userCollect
				const obj = {
					id:this.detailData.id,
					category:'seckill'
				}
				if(this.detailData.storeInfo.userCollect){
					this.$store.dispatch('collect',obj)
						.then(res => {
							console.log(res)
							if(res.data.code == 200){
								
							}
						})
				}else{
					this.$store.dispatch('unCollect',obj)
						.then(res => {
							console.log(res)
							if(res.data.code == 200){
							}
						})
				}
			},
			//点击店铺
			shopClick(){
				uni.navigateTo({
					url:'StoreDetails/storedetails?id=' + this.detailData.storeInfo.shop_id
				})
			},
			//领券弹出
			outloginClick(){
				this.$refs.popups.close()
			},
			// 点击分类图片预览
			openImage(){
				const img = this.uniqueType ? this.uniqueType.price : this.detailData.storeInfo.price
				if(img){
					// #ifdef APP-PLUS
					plus.nativeUI.previewImage([img])
					// #endif
				}
			},
			//领券关闭
			closePopupsClick(){
				this.$refs.popups.close()
			},
			//转发弹出
			outloginSharClick(){
				const that = this
				let desc = that.detailData.storeInfo.title
				let shareInfo={
					href:`http://jn.51kdd.com/index.html#/?href=oldHome://abc`,
					title:'老家商城',
					desc:'我正在老家商城购买'  + desc + ',快来和我一起选购吧',
					imgUrl:that.detailData.storeInfo.image
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
				})
			},
			//转发关闭
			closePopupsSharClick(){
				this.$refs.popup.close()
			},
			//商品属性弹出
			outloginShopClick(){
				this.$refs.popupbottom.open()
			},
			//转发关闭
			closePopupsShopClick(){
				this.$refs.popupbottom.close()
			},
			chooseClose(){
				this.$refs.popupbottom.close()
			},
			// 分享
			shareShowClick(vo,key){
				if(vo.name == '微信好友'){
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 0,
					    href: "https://baidu.com",
					    title: "老家商城分享",
					    summary: "我正在使用老家商城购物，赶紧跟我一起来体验！",
					    imageUrl: "../../../static/demo5.png",
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}
			},
			// 播放暂停
			BoFang(){
				if(that.autoplay==false){
					// 触发事件
					// 在 subNVue/vue 页面触发事件  
					// $emit(eventName, data)  
					uni.$emit('videoDetail', {  
					    video:this.videoUrl
					})
					// // 通过 id 获取 nvue 子窗体
					const subNVue = uni.getSubNVueById('video_mask_skll')  
					console.log(subNVue)
					subNVue.show('fade-in', 300, function(){  
						console.log('打开成功')
					}) 
				}
			},
			ZhanTing(){
				if(that.autoplay==true){
					that.autoplay=false
				}
			}
		},
		computed:{
			isUserChoosed(){
				if(this.detailData){
					if(this.detailData.productAttr.length){
						const arr = []
						this.detailData.productAttr.forEach((item,index) => {
							item.attr_value.forEach(x => {
								if(x.check) arr.push(x.attr)
							})
						})
						return arr.length ? arr : ''
					}else{
						return false
					}
				}
				else{
					return false
				}
				
			},
			uniqueType(){
				if(this.isUserChoosed){
					const obj = this.detailData.productValue
					const keys = Object.keys(obj)
					const cho = this.isUserChoosed.join(',')
					const result = 	keys.filter((item,index) => {
						if(item == cho){
							this.uniqueIndex == index
						}
						return item == cho
					})
					return obj[result.join('')] || ''
				}else{
					return false
				}
				return false
			}
		}
	}
</script>

<style lang="scss">
	.item1{
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000;
		image{
			width: 80upx;
			height: 80upx;
		}
	}
	.shopDetails-title{
		position: relative;
	}
	.shopDetails-title-select{
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		bottom: 30upx;
		width: 100%;
	}
	.shopDetails-title-play{
		width:110upx;
		height:48upx;
		background:rgba(242,237,234,1);
		border:1px solid rgba(203,191,180,1);
		opacity:0.86;
		border-radius:22upx;
		font-size: 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.select-title-type{
		color: #FFFFFF;
		background: #CD3233;
		border:1px solid #CD3233;
	}
	.shopDetails-title-num{
		width:110upx;
		height:48upx;
		background:rgba(0,0,0,1);
		opacity:0.35;
		border-radius:26upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		margin-right: 26upx;
	}
	.shopDetails-title-left{
		width:110upx;
		height:48upx;
		margin-left: 26upx;
		visibility: hidden;
	}
	.shopDetails-title-package{
		width:160upx;
		height:36upx;
		border-radius: 24upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 24upx;
	}
	.shopDetails-title-original{
		color: #999;
		font-size: 26upx;
		text-decoration: line-through;
	}
	.shopDetails-title-height{
		height: 40upx;
	}
	.shopDetails-title-name{
		color: #525253;
		font-weight: bold;
	}
	.shopDetails-title-shar{
		width:80upx;
		height:52upx;
		background: #F8F8F8;
		border-top-left-radius: 100upx;
		border-bottom-left-radius: 100upx;
		color: #999999;
	}
	.shopDetails-baozhanng{
		height: 80upx;
		padding:0 30upx;
	}
	.shopDetails-image{
		height: 70upx;
		width: 70upx;
		margin-right: 10upx;
	}
	.shopDetails-image-select{
		width:230upx;
		height:60upx;
		background:rgba(246,246,246,1);
		border-radius:12upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		font-size: 24upx;
	}
	.shopDetails-select-image{
		margin-left: 104upx;
		margin-right: 56upx;
	}
	.flex-yidw{
		flex: 1.5;
	}
	.comment-image-all{
		height: 50upx;
		width: 50upx;
	}
	.shop-introduce-img{
		height: 88upx;
		width: 88upx;
	}
	.shop-deleat-all{
		padding: 36upx 20upx 24upx 30upx;
	}
	.shop-detal-name{
		color: #636362;
		font-size: 32upx;
		font-weight: bold;
	}
	.shop-experience{
		background:rgba(0,0,0,0.1);
		border-radius: 14upx;
		width: 220upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.shop-pingfen{
		display: flex;
		align-content: center;
		justify-content: center;
		background: #EEEEEE;
		width:30upx;
		height:30upx;
	}
	.tuijian-shop-three-image{
		width:228upx;
		height:218upx;
	}
	.cu-bar.tabbar.border .action::before{
		border: none !important;
	}
	.shopDetails-bottom-button{
		width: 220upx;
		font-size: 32upx;
		color: #FFFFFF;
		border: none;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.button-left{
		background: #F88029;
		border-top-left-radius: 100upx;
		border-bottom-left-radius: 100upx;
	}
	.button-right{
		background: #CD3233;
		border-top-right-radius: 100upx;
		border-bottom-right-radius: 100upx;
		margin-right: 18upx;
	}
	.shopDetails-bottom-all{
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 99;
	}
	.shop-bottom-kefu{
		width: 50upx;
		height: 50upx;
	}
	.shopDetails-bottom-popups{
		margin: 36upx 24upx 50upx 24upx;
	}
	.shopDetails-bottom-popups-clos{
		font-size: 50upx;
		text-align: right;
	}
	.shopDetails-bottom-popups-jifen{
		width:80upx;
		height:32upx;
		border-radius: 24upx;
		text-align: center;
		line-height: 32upx;
		margin-right: 20upx;
	}
	.shopDetails-bottom-popups-backone{
		width:700upx;
		height:160upx;
		background: url(../../static/yilingqu.png);
		background-size: 100% 100%;
		padding: 30upx 46upx 25upx 22upx;
		margin-bottom: 26upx;
	}
	.shopDetails-bottom-popups-backtwo{
		width:700upx;
		height:160upx;
		background: url(../../static/weilingqu.png);
		background-size: 100% 100%;
		padding: 30upx 46upx 25upx 22upx;
		margin-bottom: 26upx;
	}
	.share-popup-all{
		height: 200upx;
		color: #999999;
		font-size: 24upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.share-popup-all image{
		width: 78upx;
		height: 78upx;
		margin-bottom: 24upx;
	}
	.share-popup-sx{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.user-choose{
		width: 400upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.popupbottom-shop-img{
		width:224upx;
		height:224upx;
		border-radius:12upx;
		border: #F3F3F3 1px solid;
	}
	.popupbottom-all{
		padding: 12upx 20upx 16upx 20upx;
	}
	.popupbottom-shop-type-all{
		height: 60upx;
		background: #F5F5F5;
		color: #555555;
		padding: 0 26upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12upx;
		font-size: 24upx;
		margin-left: 22upx;
		margin-bottom: 18upx;
		border: #F5F5F5 1px solid;
	}
	.popupbottom-shop-type-select{
		border: #CD3233 1px solid;
		background: #F8E0DF;
		color: #CD3233;
	}
	.shopDetails-num{
		height: 94upx;
		color: #333333;
		font-size: 30upx;
	}
	.popupbottom-all-button{
		width: 50%;
	}
	.popupbottom-all-top{
		margin-top: 120upx;
	}
	
	/**
	 * 秒杀
	 */
	.seckilltime-background{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height:124upx;
		background: url(../../static/miaohsa.png);
		background-size: 100% 100%;
		color: #FFFFFF;
	}
	.text-price::before{
		font-size: 50%;
	}
	.seckilltime-yuanjiage{
		text-decoration: line-through;
	}
	
	// 立即购买
	.liji-pay{
		background: #CD3233;
		border-radius: 100upx;
		margin-right: 18upx;
		width: 440upx;
		font-size: 32upx;
		color: #FFFFFF;
		border: none;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;	
	}
	.common-pics{
		display: flex;
		flex-wrap: wrap;
		padding: 15upx 0;
		image{
			display: inline-block;
			width: 140upx;
			height: 140upx;
			margin-right: 20upx;
		}
	}
	.no-comment{
		height: 180upx;
		display: flex;
		color: $uni-text-color;
		font-size: $uni-font-size-base;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}
	.select-dianpu{
		color: #FFFFFF;
		background: #CD3233;
		padding: 16upx 30upx;
		border-radius: 46upx;
	}
	.pay-right{
		width: 380upx;
		background-color: #CD3233;
		color: #ffffff;
		font-size: 32upx;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100upx;
	}
</style>
