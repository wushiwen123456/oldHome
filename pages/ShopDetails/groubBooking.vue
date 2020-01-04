<template>
	<view>
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
		<view v-if="Object.keys(detailData).length != 0">
			<view class="shopDetails-title" >
				<swiper :hidden="autoplay" class="screen-swiper" circular="true"
				 :autoplay="!autoplay" interval="3500" duration="500" :current="swiperNum" @change="swiperChange">
					<swiper-item @tap="BoFang" v-if="videoUrl" class="item1">
						<image src="/static/play/larkcloud_play.png" mode="aspectFill"></image>
					</swiper-item>
					<swiper-item @tap="swiperDetail" v-for="(item,index) in swiperList">
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
			
			
			
		<view class="bg-white padding-left">
				<view class="flex align-center">
					<view class="text-red-my text-xxxl text-bold">￥{{detailData.storeInfo ? detailData.storeInfo.price : ''}}</view>
					<view class="bg-red text-xs shopDetails-title-package">拼团价更低</view>
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
			
			<!-- 参加拼团 -->
			<view class="bg-white" v-if="detailData.pink">
				<view @tap="outloginbookingClick" class="margin-top-xs flex align-center justify-between shopDetails-baozhanng solid-bottom">
					<view>{{!!detailData.pindAll.length ? detailData.pindAll.length + '人在拼团，可直接参与' : '还没有人拼团，马上开团吧'}}</view>
					<view class="flex text-sm-erliu align-center">
						<view v-if="!!detailData.pindAll.length" class="margin-right-sm text-jiujiujiu">查看全部</view>
						<view v-if="!detailData.pindAll.length" class="margin-right-sm text-jiujiujiu">立即开团</view>
						<view style="margin-top: 4upx;" class="lg text-gray cuIcon-right"></view>
					</view>
				</view>
				<view>
					<view class="flex align-center justify-between margin-left solid-bottom text-black booking-all-height"
							 v-if="index <= 1" v-for="(item,index) in detailData.pink" :key="index">
									
						<view class="flex align-center">
							<image class="groubBoking-headimg" :src="item.avatar"></image>
							<view class="text-three">{{item.nickname}}</view>
						</view>
						<view class="flex align-center margin-right">
							<view class="flex flex-direction align-center justify-end margin-right-xl">
								<view class="text-xs ">还差<text class="text-red-my">{{item.count}}人</text>拼成</view>
								<view class="flex align-center">
									<view class="text-jiujiujiu">剩余</view>
									<tui-countdown :time="item.time" color="#999"  colonColor="#999"  bcolor="#FFF" ></tui-countdown>
								</view>
							</view>
							<view @tap="openSingle(item)" class="booking-button">去拼团</view>
						</view>
					</view>
					<swiper vertical autoplay circular interval="3000" class="sell-message">
						<swiper-item class="sell-item text-gray text-sm" v-for="(item,index) in msg" :key="index">
							{{item}}!!!
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 参加拼团end -->
			
			
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
			<view class="bg-white margin-top-xs shop-deleat-all" v-if="detailData.shop_info">
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
					<view @tap="shopClick(1)" class="select-store">进入店铺</view>
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
				<view @tap="shopClick" class="margin-top-xs flex align-center justify-between shopDetails-baozhanng">
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
			<view style="height: 74upx;color: #525253;" class="flex align-center justify-center">———— 商品详情 ————</view>
			<!-- 文本分割线 -->
			
			<!-- 商品介绍 -->
			<view v-if="detailData.storeInfo">
				<image :src="detailData.storeInfo.image" mode="widthFix" style="width: 100%;"></image>
			</view>
			<!-- 商品介绍end -->
			
			<view style="height: 100upx;"></view>
			
			<!-- 底部操作条 -->
			<view class="cu-bar bg-white tabbar border shop shopDetails-bottom-all" v-if="detailData.storeInfo">
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
						<image src="../../static/collectClick.png" class="shop-bottom-kefu" v-show="detailData.storeInfo.userCollect"></image>
						<view>{{detailData.storeInfo.userCollect ? '已收藏' : '收藏'}}</view>
					</view>
				</view>
				<view class="flex align-center">
					<view @tap="tanchuPin" class="shopDetails-bottom-button button-left" :class="{'no-team': !detailData.pink.length}">{{detailData.pink.length ? '加入拼团' : '暂无团队'}}</view>
					<view @tap="outloginShopClick" class="shopDetails-bottom-button button-right">立即开团</view>
				</view>
			</view>
			<!-- 底部操作条end -->
			
			<!-- 分享 -->
			<!-- <uni-popup ref="popup" type="bottom" >
				<view @tap="closePopupsSharClick" class="lg text-gray cuIcon-roundclose margin-top-sm margin-right shopDetails-bottom-popups-clos"></view>
				<view class="share-popup-all">
					<view @tap="shareShowClick(key)" v-for="(vo,key) in shareList" :key="key" class="share-popup-sx">
						<image :src="vo.img"></image>
						<view style="font-size: 26upx;">{{vo.name}}</view>
					</view>
				</view>
			</uni-popup> -->
			
			<!-- 选择商品属性 -->
			<uni-popup ref="popupbottom" type="bottom" v-if="detailData.storeInfo">
				<view class="popupbottom-all">
					<view class="flex justify-between solid-bottom">
						<view class="flex align-end margin-bottom-lg ">
							<image class="popupbottom-shop-img" @click="openImage" :src="uniqueType ? uniqueType.image : detailData.storeInfo.image"></image>
							<view class="margin-left-sm">
								<view class="text-price text-red text-bold text-xl">{{uniqueType ? uniqueType.price : detailData.storeInfo.price }}</view>
								<view class="text-sm" style="color: #828282;">库存{{uniqueType ? uniqueType.stock : detailData.storeInfo.stock }}件</view>
								<view class="text-sm user-choose">{{popupChoose()}}</view>
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
					<view class="flex align-center popupbottom-all-top">
						<view @tap="goPink" class="shopDetails-bottom-button popupbottom-all-button button-left" :class="{'no-team': !detailData.pink.length}">{{detailData.pink.length ? '加入拼团' : '暂无团队'}}</view>
						<view @tap="goKaituan" class="shopDetails-bottom-button popupbottom-all-button button-right">我要开团</view>
								</view>
							</view>
				</uni-popup>
			
			<!-- 全部拼团中部弹出 -->
			<uni-popup ref="booking" type="center" >
				<view class="margin booking-all-center-width">
					<view class="padding-bottom-lg solid-bottom text-wuer text-three text-center text-bold">正在拼团</view>
					<view class="booking-all-center-height flex align-center justify-between" v-for="(item,index) in detailData.pink" :key="index">
						<view class="flex align-center">
							<image class="groubBoking-headimg" :src="item.avatar"></image>
							<view class="flex flex-direction justify-end margin-right-xl">
								<view class="text-xs "><text class="margin-right-xs username">{{item.nickname}}</text> 还差{{item.count}}人拼成</view>
								<view class="flex align-center">
									<view class="text-jiujiujiu margin-right">剩余</view>
									<tui-countdown :time="item.time" color="#999" :colonSize="22" colonColor="#999"  bcolor="#FFF" ></tui-countdown>
								</view>
							</view>
						</view>
						<view class="booking-button" @tap="openSingle(item)">去拼团</view>
					</view>
				</view>
			</uni-popup>
			
			<!-- 全部拼团中部弹出 end -->
			
			<!-- 单个弹出 -->
			<uni-popup ref="bookingsingle" type="center" >
				<view class="margin booking-all-center-width">
					<view v-if="pinkInfo">
						<view class="bookingMessage-text-one" >参加{{pinkInfo.nickname}}的拼团</view>
						<view class="bookingMessage-text-two">仅剩{{pinkInfo.count}}个名额，
							<tui-countdown :time="pinkInfo.time" color="#999" :colonSize="22" colonColor="#999"  bcolor="#FFF" ></tui-countdown>
						后结束</view>
						<view class="bookingMessage-title-headimg" 	v-if="Object.keys(detailData).length != 0">
							<view class="bookingMessage-title-left">
								<view class="bookingMessage-head-text">团长</view>
								<image class="bookingMessage-title-headimgone" :src="pinkInfo.avatar"></image>
							</view>
							<image  @click="sharkPink(pinkInfo)" class="bookingMessage-title-headimgtwo" src="../../static/denfairen.png"
									v-for="(item,index) in detailData.storeInfo.people * 1 - 1" :key="index"
							/>
						</view>
						<button @tap="joinPintuan" class="booking-title-button">参与拼团</button>
					</view>
					
				</view>
				
			</uni-popup>
			<!-- 单个弹出end -->
			
		</view>
	</view>
</template>

<script>
	var that;
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import uniPopup  from "@/components/uni-popup/uni-popup"
	import tuiCountdown from "@/components/countdown/countdown"
	import tuiRate from "@/components/rate/rate"
	
	
	// 导入网络模块
	import {getPinkDetail} from '@/network/pink'

	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	
	// #ifdef APP-PLUS
	// 导入分享方法
	import share from "@/common/share.js";
	// #endif
	
	// 导入公共变量
	import { HOST } from '@/common/const'
	import { clickDetail } from '@/common/detail'
	
	export default{
		components: {
			uniPopup,
			tuiNumberbox,
			tuiCountdown,
			tuiRate
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
			if(this.$store.state.combinId){
				const id = this.$store.state.combinId,
				token = this.$store.getters.isToken
				// 发送数据请求
				this.getPinkDetail(id,token)
				
			}else{
				uni.switchTab({
					url:"../Home/home"
				})
				return 
			}
		},
		onShow() {
			this.pinkInfo = {}		
			this.isPink = false
		},	
		data(){
			return{
				payimgType:true,//图片或者视频
				timeList: [1000, 2000, 3000, 19, 240000],//倒计时
				swiperNum:0,//当前所在滑块
				videoUrl:'',
				swiperList: [],
				selectimg:[],
				list:[],
				value:1,//步进器
				detailData:{},
				autoplay:false,
				pinkInfo:{},
				uniqueType:'',
				isPink:false,
				commont:{},
				msg:[]
			}
		},
		onBackPress() {

		},
		onUnload() {
			uni.$off('videoDetail')
		},
		onReady() {
			this.$refs.loading.open()
		},
		methods:{
			// 立即参团
			showAllTuan(){
				this.$refs.booking.open()
			},
			getPinkDetail(id,token){
				getPinkDetail(id,token)
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
							// 对视频进行处理
							data.storeInfo.video = replaceImage(data.storeInfo.video)
							// 保存视频
							this.videoUrl = data.storeInfo.video
							
							
							// 对轮播数据进行处理
							this.dealSwiper(data)

							// 判断是否有productValue
							if(data.productValue){
								this.dealProductValue(data)
							}				
							
							// 对拼团数据进行处理
							if(data.pink.length){
								this.detalPink(data.pink)
							}
							// 处理评价信息
							const commont = data.reply
							this.dealCommont(commont)
							
							this.msg = data.pink_ok_list
							// 赋值
							this.detailData = {...data}			
						}
					})
			},
	// 		// 处理轮播数据
			dealSwiper(data){
				this.swiperList = data.storeInfo.images.map((item,index) => {
					return {
						url:item,
						id:index,
						type:'image'
					}
				})
			},
			// 处理拼团数据
			detalPink(list){
				 list.forEach(x => {
					this.$set(x,'avatar','http://'+HOST+x.avatar)
					this.$set(x,'time',this.dealTime(x))
				})
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
			// 处理dealProductValue
			dealProductValue(data){
				const obj = data.productValue
				const keys = Object.keys(obj)
				keys.forEach((item,index) => {
					const image = replaceImage(obj[item].image)
					obj[item].image = image
				})
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
			//选择商品属性
			selectShopClick(vo,key,item){
				if(vo.check){
					vo.check = false
					this.uniqueType = ""
					return 
				}else{
					item.attr_value.forEach(x => {
						x.check = false
					})
					vo.check = true
				}
				const arr = []
				this.detailData.productAttr.forEach(x => {
					x.attr_value.forEach(y =>{
						if(y.check) {
							arr.push(y.attr)
						}
					})
				})
				console.log(arr)
				if(arr.length = this.detailData.productAttr.length){
					this.uniqueType = this.detailData.productValue[arr.join(',')]
				}
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
			// 点击分类图片预览
			openImage(){
				const img = this.uniqueType ? this.uniqueType.image : this.detailData.storeInfo.image
				if(img){
					// #ifdef APP-PLUS
					plus.nativeUI.previewImage([img])
					// #endif
				}
			},
			//滑块的change
			swiperChange(e){
				this.swiperNum = e.target.current
				// console.log(e.target.current)
			},
			//点击kefu
			serviceClick(shopname){
				let shopInfo = JSON.stringify(this.detailData.shop_info)
				uni.navigateTo({
					url:'informtion/informtion?shopInfo=' + shopInfo
				})
			},
			//步进起数值修改
			change: function(e) {
				this.value = e.value
			},
			// 处理选中的图片
			chooseImg(){
				
			},
			//立即购买
			nowBuyClick(){
				
				if(Object.keys(this.detailData.productValue).length != 0 && this.uniqueType == ''){
					uni.showToast({
						title:'请选择商品种类',
						icon:'none'
					})
					return 
				}
				const data = this.detailData
				const obj = {
					productId:data.storeInfo.id,
					cartNum:this.value,
					uniqueId:this.uniqueType ? this.uniqueType.unique : '',
					combinationId:data.storeInfo.id,
					secKillId:'',
					bargainId:'',
					shop_id:data.storeInfo.shop_id,
				}
				
				this.$store.dispatch('Pay',obj)
					.then(res => {
						if(res.data.code == 200){
							this.$store.commit('keepCartId',res.data.data.cartId)
							
							if(this.isPink){	
								this.$store.commit('setPinkId',this.pinkInfo)
							}else{
								this.$store.commit('setOutPinkInfo')
							}
							this.$refs.bookingsingle.close()
							this.$refs.popupbottom.close()
							
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
			// 参与拼团
			joinPintuan(){
				this.isPink = true
				if(Object.keys(this.detailData.productValue).length != 0 && this.uniqueType != ''){
					this.nowBuyClick()
				}else{
					this.$refs.popupbottom.open()
					this.$refs.bookingsingle.close()
				}
			},
			// 点击拼团列表
			openSingle(item){
				this.pinkInfo = item
				this.$refs.booking.close()
				this.$refs.bookingsingle.open()
			},
			//点击收藏
			collectClick(){
				this.detailData.storeInfo.userCollect = !this.detailData.storeInfo.userCollect
				const obj = {
					id:this.detailData.storeInfo.id,
					category:'pink_product'
				}
				if(this.detailData.storeInfo.userCollect){
					this.$store.dispatch('collect',obj)
						.then(res => {
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
			shopClick(id){
				uni.navigateTo({
					url:'StoreDetails/storedetails?id=' + this.detailData.storeInfo.shop_id
				})
			},
			//领券弹出
			outloginClick(){
				this.$refs.popups.open()
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
					imgUrl:that.detailData.storeInfo.image,
				}
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
			//拼团弹出
			outloginbookingClick(){
				if(this.detailData.pindAll.length){
					this.$refs.booking.open()
				}else{
					this.$refs.popupbottom.open()
				}
				
			},
			//拼团关闭
			closePopupsbookingClick(){
				this.$refs.booking.close()
			},
			//拼团弹出
			outloginbookingsingleClick(){
				this.$refs.bookingsingle.open()
				
			},
			//拼团关闭
			closePopupsbookingsingleClick(){
				this.$refs.bookingsingle.close()
			},
			chooseClose(){
				this.$refs.popupbottom.close()
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
					const subNVue = uni.getSubNVueById('video_mask_booking')  
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
			},
			recommendClick(item){
				uni.navigateTo({
					url:`shopDetails?id=${item.id}`
				})
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
			dealTime(item){
				const {h,i,s} = item
			 	return h * 60 * 60 + i * 60 + s*1
			},
			// 点击图片预览
			swiperDetail(){
				let arr = this.swiperList.slice(1,this.swiperList.length-1)
				arr = arr.map(x => x.url)
				console.log(arr)
				// #ifdef APP-PLUS
				plus.nativeUI.previewImage(arr)
				// #endif
			},
			// 拼团分享界面
			sharkPink(item){
				this.joinPintuan()
			},
			// 已选择商品属性
			popupChoose(){
				if(Object.keys(this.detailData.productValue).length){
					return '已选择：' + (!!this.uniqueType ?  this.uniqueType.suk : '')
				}else{
					return '默认种类'
				}
			},
			// 去拼团
			goPink(){
				if(this.detailData.pink.length){
					if(Object.keys(this.detailData.productValue).length != 0 && this.uniqueType == ''){
						uni.showToast({
							title:'请选择商品种类',
							icon:'none'
						})
						return 
					}
					if(Object.keys(this.pinkInfo).length){
						this.isPink = true
						this.nowBuyClick()
					}else{
						this.$refs.booking.open()
					}
				}else{
					uni.showToast({
						title:'还没有人发起拼团哦~',
						icon:'none'
					})
				}
			},
			// 放大图片
			goDetail(item){
				clickDetail(item)
			},
			goKaituan(){
				this.isPink = false,
				this.nowBuyClick()
			},
			// 进入评论详情
			goMoreCommont(){
				const id = this.detailData.storeInfo.product_id
				uni.navigateTo({
					url:`shopComment?id=${id}`	
				})
			},
			tanchuPin(){
				if(this.detailData.pink.length){
					this.outloginShopClick()
				}else{
					uni.showToast({
						title:'还没有人发起拼团哦~',
						icon:'none'
					})
				}
			}
			
		},
		// computed:{
		// 	isUserChoosed(){
		// 		if(this.detailData){
		// 			if(this.detailData.productAttr){
		// 				const arr = []
		// 				this.detailData.productAttr.forEach((item,index) => {
		// 					item.attr_value.forEach(x => {
		// 						if(x.check) arr.push(x.attr)
		// 					})
		// 				})
		// 				return arr.join(',')
		// 			}else{
		// 				return false
		// 			}
		// 		}
		// 		else{
		// 			return false
		// 		}
				
		// 	},
		// 	uniqueType(){
		// 		if(this.isUserChoosed){
		// 			const obj = this.detailData.productValue
		// 			const keys = Object.keys(obj)
		// 			const cho = !!this.isUserChoosed.length ? this.isUserChoosed : 0
		// 			const result = 	keys.filter((item,index) => {
		// 				return item == cho
		// 			})
		// 			console.log(obj[result.join('')])
		// 			return obj[result.join('')] || ''
		// 		}else{
		// 			return 0
		// 		}
		// 	},
		// 	// 判断用户是否收藏
		// 	isUserCollect(){	
		// 		return this.itemInfo.userCollect ? '已收藏' : '收藏'
		// 	},
		// }
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
	.ceshi{
		position: fixed;
		font-size: 50px;
		color: #000;
		left: 0;
		top: 50%;
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
		/* border-radius: 100upx; */
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
	.user-choose{
		width: 400upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
	 * 拼团
	 */
	.payNow{
		background-color: #CD3233;
		width: 100%;
		border-radius: 100upx;
	}
	.groubBoking-headimg{
		width:66upx;
		height:66upx;
		border-radius:50%;
		margin-right: 20upx;
	}
	.booking-all-height{
		height: 110upx;
	}
	.booking-button{
		width:140upx;
		height:54upx;
		background:rgba(205,50,51,1);
		border-radius:26upx;
		color: #FFF;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.booking-all-center-width{
		width: 550upx;
	}
	.booking-all-center-height{
		height: 118upx;
	}
	.groubBoking-headimg-all{
		width:98upx;
		height:98upx;
		border-radius:50%;
	}
	.groubBoking-headimg-all-border{
		border: #F88029 1px solid;
	}
	.bookingMessage-text-one{
		text-align: center;
		color: #000000;
		font-size: 30upx;
		margin-bottom: 26upx;
	}
	.bookingMessage-text-two{
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		font-size: 24upx;
	}
	.bookingMessage-title-headimg{
		display: flex;
		justify-content: center;
		margin-top: 46upx;
	}
	.bookingMessage-title-headimgone{
		border-radius: 50%;
		height: 96upx;
		width: 96upx;
		margin-left: 10upx;
		margin-top: 10upx;
		border: #ff8625 2upx solid;
	}
	.bookingMessage-title-headimgtwo{
		border-radius: 50%;
		height: 96upx;
		width: 96upx;
		margin-left: 60upx;
		margin-top: 10upx;
		border: #FFFFFF 2upx solid;
	}
	.bookingMessage-title-left{
		height: 106upx;
	}
	.bookingMessage-head-text{
		z-index: 99;
		position: fixed;
		width: 68upx;
		height: 36upx;
		background-color: #ff8625;
		border-radius: 20upx;
		border: solid 2upx #ffffff;
		color: #fefefe;
		font-size: 22upx;
		text-align: center;
		line-height: 36upx;
	}
	.booking-title-button{
		width: 506upx;
		height: 84upx;
		background-color: #fe4d3d;
		border-radius: 42upx;
		font-size: 34upx;
		line-height: 84upx;
		color: #FFFFFF;
		margin-top: 100upx;
		margin-bottom: 78upx;
	}
	.select-store{
		color: #FFFFFF;
		background: #CD3233;
		padding: 16upx 30upx;
		border-radius: 46upx;
	}
	// 假设这个商品还没有人拼团
	.no-team{
		background-color: #edbb97 !important;
		color: rgb(205,50,51) !important;
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
	.sell-message{
		height: 50upx;
		background-color: #fff;
		padding-left: 15upx;
		display: flex;
		align-items: center;
		.sell-item{
			height: 50upx;
			line-height: 50upx;
		}
	}
</style>

