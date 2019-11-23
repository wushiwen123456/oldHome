<template>
	<view>
		<!-- head -->
		<view class="shopDetails-title">
			<swiper :current="swiperNum" @change="swiperChange" class="screen-swiper" duration="500">
				<swiper-item  v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="contain" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
			<view class="shopDetails-title-select">
				<view class="shopDetails-title-left"></view>
				<view class="flex align-center">
					<view @tap="selectPlayClick" :class="[ payimgType?'':'select-title-type']" class="shopDetails-title-play">
						<view class="lg  cuIcon-playfill"></view>
						<view>视频</view>
					</view>
					<view @tap="selectimageClick" :class="[ payimgType?'select-title-type':'']" class="shopDetails-title-play margin-left-sm ">图片</view>
				</view>
				<view class="shopDetails-title-num">{{swiperNum + 1}}/{{swiperList.length}}</view>
			</view>
		</view>
		<view class="bg-white padding-left">
			<view class="flex align-center">
				<view class="text-red-my text-xxxl text-bold">{{itemInfo.price}}</view>
				<view class="bg-red text-xs shopDetails-title-package">红包抵0.1元</view>
			</view>
			<view class="shopDetails-title-original">原价￥{{itemInfo.oldPrice}}</view>
			<view>
				<view class="flex align-center justify-between margin-right-sm">
					<view class="flex align-center margin-top-xs margin-bottom-xs">
						<!-- <view class="cu-tag bg-red-my shopDetails-title-height" v-if="">店铺红包满149减10</view> -->
						<view class="cu-tag bg-red-my shopDetails-title-height">购买得积分</view>
					</view>
					<view @tap="outloginClick" class="flex align-center">
						<view class="text-gray text-sm">领券</view>
						<view class="lg text-gray cuIcon-right"></view>
					</view>
				</view>
				
				<view class="flex align-center margin-top-sm margin-bottom-sm">
					<view class="flex-four text-three shopDetails-title-name">{{itemInfo.name}}</view>
					<view @tap="outloginSharClick" class="flex-sub flex align-center justify-center shopDetails-title-shar">
						<view class="lg cuIcon-forward margin-right-xs"></view>
						<view>转发</view>
					</view>
				</view>
				<view class="flex align-center justify-between padding-bottom-sm margin-right-sm text-jiujiujiu">
					<view>快递:<text class="margin-left-sm" v-if="itemInfo.isPostage == '1'">免运费</text><text v-else class="margin-left-sm">请选择您的地区</text></view>
					<view>销量:{{itemInfo.ficti}}</view>
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
					<view class="margin-left-sm">规格 种类 </view>
				</view>
				<view class="lg text-jiujiujiu cuIcon-right"></view>
			</view>
			<view class="flex align-center shopDetails-select-image">
				<view class="flex-yidw">
					<image v-for="(vo,key) in selectimg" :key="key" class="shopDetails-image" :src="vo"></image>
				</view>
				<view class="flex-sub shopDetails-image-select">共有{{Object.keys(this.itemInfo.totalTypes).length}}中类别可选</view>
			</view>
		</view>
		<!-- 选择 end -->
		
		<!-- 评价 -->
		<view class="bg-white margin-top-xs">
			<view class="flex align-center justify-between shopDetails-baozhanng">
				<view >商品评价</view>
				<view class="flex text-sm-erliu align-center">
					<view class="text-red-my margin-right-sm">查看更多</view>
					<view style="margin-top: 4upx;" class="lg text-jiujiujiu cuIcon-right"></view>
				</view>
			</view>
			<view class="padding-left padding-right padding-bottom-lg">
				<view class="flex align-center margin-top-xs">
					<image class="comment-image-all" src="../../static/demo3.png"></image>
					<view class="text-jiujiujiu text-sm margin-left-xs">海鲸鱼</view>
				</view>
				<view style="margin-top: 10upx;">发货速度快 质感超亲肤 上身很显瘦版型合适呀 这价格绝对美腻 两件套 也可以单穿 爱了~</view>
			</view>
		</view>
		<!-- 评价 end -->
		
		
		<!-- 店铺介绍 -->
		<view class="bg-white margin-top-xs shop-deleat-all">
			<view class="flex align-center justify-between margin-bottom-sm">
				<view class="flex">
					<image class="shop-introduce-img" :src="storeInfo.info.storeLogo" ></image>
					<view class="margin-left-sm flex flex-direction justify-between">
						<view class="shop-detal-name">{{storeInfo.info.storeName}}</view>
						<view class="flex align-center text-xs shop-experience">
							<view>综合体验</view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
							<view class="lg text-red-my cuIcon-favorfill"></view>
						</view>
					</view>
				</view>
				<view @tap="shopClick(1)" class="cu-btn round select-title-type">进入店铺</view>
			</view>
			<view style="color: #A0A0A0;"  class="flex align-center justify-between text-xs">
				<view class="flex align-center flex-sub ">
					<view>物流评分</view>
					<view class="padding-left-xs padding-right-xs">{{storeInfo.info.expressageFen}}</view>
					<view class="shop-pingfen" >平</view>
				</view>
				<view class="flex align-center flex-sub ">
					<view>商品评分</view>
					<view class="padding-left-xs padding-right-xs">{{storeInfo.info.produceFen}}</view>
					<view class="shop-pingfen" >平</view>
				</view>
				<view class="flex align-center flex-sub ">
					<view>服务评分</view>
					<view class="padding-left-xs padding-right-xs">{{storeInfo.info.serviceFen}}</view>
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
				<view class="flex-sub" v-for="(item,index) in recommend" :key="index">
					<image class="tuijian-shop-three-image" :src="item.image"></image>
					<view class="text-sm-erliu text-black">{{item.store_name}}</view>
					<view class="text-red-my text-sm-erliu margin-top-sm margin-bottom-sm">￥{{item.price}}</view>
				</view>
			</view>
		</view>
		
		<!-- 推荐商品 end-->
		<view style="height: 74upx;color: #525253;" class="flex align-center justify-center">———— 商品详情 ————</view>
		<!-- 文本分割线 -->
		
		<!-- 商品介绍 -->
		<view>
			<image :src="itemInfo.image" mode="widthFix" style="width: 100%;"></image>
		</view>
		<!-- 商品介绍end -->
		
		<view style="height: 100upx;"></view>
		
		<!-- 底部操作条 -->
		<view class="cu-bar bg-white tabbar border shop shopDetails-bottom-all">
			<view class="flex align-center text-xs ">
				<view @tap="shopClick(1)" class="margin-left flex flex-direction align-center justify-center">
					<image class="shop-bottom-kefu" src="../../static/shop.png"></image>
					<view>店铺</view>
				</view>
				<view @tap="serviceClick(1)" class="margin-left flex flex-direction align-center justify-center">
					<image class="shop-bottom-kefu" src="../../static/kefu.png"></image>
					<view>客服</view>
				</view>
				<view @tap="collectClick(1)" class="margin-left flex flex-direction align-center justify-center">
					<image class="shop-bottom-kefu" src="../../static/collect.png"></image>
					<!-- 已收藏 -->
					<!-- <image src="../../static/collectClick.png"></image> -->
					<view>收藏</view>
				</view>
			</view>
			<view class="flex align-center">
				<view @tap="outloginShopClick" class="shopDetails-bottom-button button-left">加入购物车</view>
				<view @tap="outloginShopClick" class="shopDetails-bottom-button button-right">立即购买</view>
			</view>
		</view>
		<!-- 底部操作条end -->
		
		<!-- 选择优惠券 -->
		<uni-popup ref="popups" type="bottom">
			<view class="shopDetails-bottom-popups">
				<view @tap="closePopupsClick" class="lg text-gray cuIcon-roundclose shopDetails-bottom-popups-clos"></view>
				<view class="text-lg text-center text-wuer">优惠</view>
				<view class="text-jiujiujiu text-df">促销</view>
				<view class="flex align-center margin-top margin-bottom-xl">
					<view class="bg-red-my text-xs shopDetails-bottom-popups-jifen">积分</view>
					<view class="text-sm-erliu">购买可得{{itemInfo.count}}积分</view>
				</view>
				<view class="text-jiujiujiu text-df margin-bottom">领券</view>
				<view class="flex align-center justify-between text-red-my" 
					:class="[isCountClass(item) ? 'shopDetails-bottom-popups-backone':'	shopDetails-bottom-popups-backtwo']"
					v-for="(item,index) in discount" :key="index">
					<view>
						<view class="flex align-center">
							<view class="text-price text-xxxl text-red margin-right-xs">{{item.coupon_price}}</view>
							<view class="text-df">商品优惠券</view>
						</view>
						<view class="text-sm">满{{item.use_min_price}}使用</view>
						<view class="text-sm">{{item.end_time == '不限时'?item.end_time : '有效期'+item.start_time + '-' + item.end_time}}</view>
					</view>
					<view class="text-three text-bold" @tap="goLingqu(item)">{{isCount(item)}}</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 分享 -->
		<uni-popup ref="popup" type="bottom" >
			<view @tap="closePopupsSharClick" class="lg text-gray cuIcon-roundclose margin-top-sm margin-right shopDetails-bottom-popups-clos"></view>
			<view class="share-popup-all">
				<view @tap="shareShowClick(key)" v-for="(vo,key) in shareList" :key="key" class="share-popup-sx">
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
						<image class="popupbottom-shop-img" :src="showImgUrl"></image>
						<view class="margin-left-sm">
							<view class="text-price text-red text-bold text-xl">{{is_UserChoose.price || itemInfo.price}}</view>
							<view class="text-sm" style="color: #828282;">库存{{is_UserChoose.stock || itemInfo.stock}}件</view>
							<view class="text-sm">已选择 {{isChooseType}}</view>
						</view>
					</view>
					<view class="lg text-gray cuIcon-roundclose shopDetails-bottom-popups-clos"></view>
				</view>
				<view class="padding-bottom-sm solid-bottom" v-for="(item,index) in list" :key="index">
					<view class=" margin-top-lg margin-bottom">{{item.attr_name}}</view>
					<view class="flex flex-wrap">
						<block v-for="(vo,key) in item.attr_value" :key="key">
							<view ref="t" @tap="selectShopClick(vo,key,index)" :class="[vo.check ? 'popupbottom-shop-type-select':'']" class="popupbottom-shop-type-all">{{vo.attr}}</view>
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
					<view class="shopDetails-bottom-button popupbottom-all-button button-left"	@tap="addCart">加入购物车</view>
					<view @tap="nowBuyClick" class="shopDetails-bottom-button popupbottom-all-button button-right">立即购买</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import uniPopup  from "@/components/uni-popup/uni-popup"
	// 导入vuex
	import { mapGetters } from 'vuex'
	
	// 引入网络模块
	import {getDetailData,getAddCart,payNow,getShopDiscount,getDisCount} from '@/network/detail' 
	
	// 导入工具类
	import {replaceImages,replaceImage,replaceList} from '@/utils/dealUrl'
	
	export default{
		components: {
			uniPopup,
			tuiNumberbox
		},
		data(){
			return{
				payimgType:true,//图片或者视频
				swiperNum:0,//当前所在滑块
				videoUrl:'',
				swiperList: [],
				getCurrentList:[],  //当前选中的商品 
				list:[],	//商品种类
				value:1,//步进器
				shareList:[],
				//商品详情数据
				itemInfo:{    
					price:'',//现价
					oldPrice:'',//原价
					count:'' ,//积分
					ficti:'' ,// 虚拟销量
					sales:0 ,  //真实销量
					cost:'' , // 成本价格
					isHot:'' , //是否土特产
					isPostage:false ,//是否包邮
					isSeckill:false , //是否开启秒杀
					isGroup:false,  //是否拼团
					userCollect:false, //用户是否收藏
					count:'' ,// 积分
					name:'' ,// 商品名称
					type:[]  ,//用户选中的种类 
					count:0   ,//用户选中的数量
					totalTypes:[] ,//所有种类
					image:'' ,//默认图片
					id:''   	,//商品id
					stock:''  ,//商品库存
					unique:''  ,//商品种类唯一识别id
					id:''	//商品id
				},
					
				//商店数据	
				storeInfo:{  
					info:{
						expressageFen:'' ,//物流评分
						produceFen:'' ,//商品评分
						serviceFen:'' ,// 服务评分
						totalFen:'' ,  // 总评分
						storeName:'' , //店铺名称
						storeLogo:'' , //店铺logo
						storeId:''  ,  //店铺id
					},
					shopFans:''  , //粉丝数量
					isUserCollect:false // 当前用户是否收藏
				},
				
				//推荐商品数据
				recommend:[],
				// 店铺折扣信息
				discount:{}
			}
			
		},
		// 根据商品id获取商品数据，并且根据token获取优惠券信息
		onLoad(option) {
			if(!!option.id){
				this.$store.commit('keepShopId',option.id)
				console.log(this.$store.state.shopId)
			}
		},
		onShow() {
			// 当返回时判断是否重新加载
			if(this.$store.state.shopId == ""){
				uni.navigateTo({
					url:"../Home/home"
				})
				return 
			}else{
				this._getDetailData(this.$store.state.shopId)
			}
		},
		methods:{
			// 获取商品商店数据
			_getDetailData(id){
				if(!this.isToken){
					this.$store.commit('keepShopId',id)
					uni.navigateTo({
						url:"../login/login"
					})
					return 
				}
			
				getDetailData(id)
				.then(res => {
					const data = res.data.data.storeInfo
					const arr = replaceImages(data.slider_image)
					console.log(res)
					arr.forEach((item,i) => {
						this.swiperList.push({
							url:item,
							id:i,
							type:'image'
						})
					})
					// 获取顶部数据
					this.itemInfo.id = data.id
					this.itemInfo.price = data.price
					this.itemInfo.oldPrice = data.ot_price
					this.itemInfo.count =  parseInt(data.give_integral)
					this.itemInfo.ficti = data.ficti
					this.itemInfo.cost = data.cost
					this.itemInfo.isHot = data.is_hot
					this.itemInfo.isPostage = data.is_postage
					this.itemInfo.isSeckill = data.is_seckill
					this.itemInfo.isGroup = data.is_group
					this.itemInfo.userCollect = data.userCollect
					this.itemInfo.name = data.store_name
					this.itemInfo.sales = data.sales
					this.itemInfo.image = replaceImage(data.image)
					this.itemInfo.stock = data.stock
					
					// 获取并处理选择规格数据
						this.list = [...res.data.data.productAttr]
					// 获取商品的所有种类
					this.itemInfo.totalTypes = res.data.data.productValue
					
					// 获取商店数据
					const store = res.data.data.shop_info
					this.storeInfo.info.expressageFen = store.expressage_score
					this.storeInfo.info.produceFen = store.product_score
					this.storeInfo.info.serviceFen = store.service_score
					this.storeInfo.info.storeId = store.shop_id
					this.storeInfo.info.storeLogo =  replaceImage(store.shop_logo)
					this.storeInfo.info.storeName = store.shop_name
					this.storeInfo.info.totalFen = store.zong
					
					
					// 获取推荐商品数据
					this.recommend = res.data.data.recommend_goods
					const recommendImg = replaceList(res.data.data.recommend_goods)
					this.recommend.forEach(item => {
						item.image = replaceImage(item.image)
					})
					
					
					// 根据商铺id获取优惠券信息
					this.getShopDiscount(this.storeInfo.info.storeId,this.isToken)
				})
			},
			//选择商品属性
			selectShopClick(el,key,index){
				if(el.check){
					el.check = false
				}else{
					this.list[index].attr_value.forEach(item => {
						item.check = false
					})
					el.check = true
				}
				this.itemInfo.type = []
				this.getCurrent()
				
			},
			getCurrent(){
				if(this.list){
					const arr = this.list.map(item => {
						return item.attr_value.filter(item => {
							 return item.check
						})
					})
					arr.forEach((item) => {
						if(!!item.length){
							this.itemInfo.type.push(item[0].attr) 
						}
					})
				}else{
					return []
				}
			},
			//选择图片
			selectimageClick(){
				if(this.isVideo){
					this.payimgType = true
					this.swiperNum = 1
				}
			},
			//选择视频
			selectPlayClick(){
				if(this.isVideo){
					this.payimgType = false
					this.swiperNum = 0
				}
			},
			//滑块的change
			swiperChange(e){
				this.swiperNum = e.target.current
				if(this.isVideo){
					if(this.swiperNum == 0){
						this.payimgType = false
					}else{
						this.payimgType = true
					}
				}
				// console.log(e.target.current)
			},
			//点击kefu
			serviceClick(shopname){
				uni.navigateTo({
					url:'informtion/informtion?shopname=' + shopname
				})
			},
			//步进起数值修改
			change: function(e) {
				this.value = e.value
			},
			//立即购买
			nowBuyClick(){
				// 判断是否有token
				if(this.isToken){
					// 判断是否有商品种类
					if(!!Object.keys(this.itemInfo.totalTypes).length){
						// 用户选择的种类
						const isUserChoose = this.itemInfo.totalTypes[this.itemInfo.type]
						// 判断用户是否选择了每个种类
						if(isUserChoose!==undefined){
							// 保存种类唯一识别id
							this.itemInfo.unique = isUserChoose.unique
							//保存选择的属性
							const obj = {
								productId:this.itemInfo.id,
								cartNum:this.value,
								shop_id:this.storeInfo.info.storeId,
								uniqueId:this.itemInfo.unique,
								combinationId:'',
								secKillId:'',
								bargainId:''
							}
							
							// 发送ajax处理请求
							payNow(obj,this.isToken).then(res => {
								console.log(res)
								if(res.data.code == 200){
									// 发送到vuex中进行存储
									this.$store.commit('keepCartId',res.data.data.cartId)
									uni.navigateTo({
										url:"affirm/affirmOrder"
									})
								}else if(res.data.code == 400){
									uni.showToast({
										title:'商品不存在或已删除',
										icon:"none"
									})
								}
								
							})
						}else{
							uni.showToast({
								title:"请选择商品种类",
								icon:"none",
							})
						}
					}else{
						
						this.itemInfo.unique = ''
						const obj = {
							productId:this.itemInfo.id,
							cartNum:this.value,
							shop_id:this.storeInfo.info.storeId,
							uniqueId:this.itemInfo.unique,
							combinationId:'',
							secKillId:'',
							bargainId:''
						}
						
						// 发送ajax处理请求
						payNow(obj,this.isToken).then(res => {
							if(res.data.code == 200){
								// 发送到vuex中进行存储
								this.$store.commit('keepCartId',res.data.data.cartId)
								uni.navigateTo({
									url:"affirm/affirmOrder"
								})
							}else if(res.data.code == 400){
								uni.showToast({
									title:'商品不存在或已删除',
									icon:"none"
								})
							}
							
						})
					}
						
					
					
				}else{
					uni.navigateTo({
						url:'../login/login'
					})
				}
			},
			//点击收藏
			collectClick(id){
				
			},
			//点击店铺
			shopClick(id){
				uni.navigateTo({
					url:'StoreDetails/storedetails?id=' + id
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
				this.$refs.popup.open()
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
			// 添加购物车
			addCart(){
				// 判断是否有token
				if(this.isToken){
					// 判断是否有商品种类
					if(!!Object.keys(this.itemInfo.totalTypes).length){
						// 用户选择的种类
						const isUserChoose = this.itemInfo.totalTypes[this.itemInfo.type]
						// 判断用户是否选择了每个种类
						if(isUserChoose!==undefined){
							// 保存种类唯一识别id
							this.itemInfo.unique = isUserChoose.unique
							//保存选择的属性
							const GoodsInfo = {
								productId: this.itemInfo.id,
								cartNum: this.value,
								uniqueId: this.itemInfo.unique,
								shop_id: this.storeInfo.info.storeId
							}
							// 发送加入购物车请求
							getAddCart(GoodsInfo,this.isToken)
							.then(res => {
								console.log(res)
								if(res.data.code == 200){
									uni.showToast({
										title:"添加成功",
										icon:"none",
									})
									// 把商品信息添加进vuex中
									this.$store.commit('addCart',GoodsInfo)
								}
							})
							this.$refs.popupbottom.close()
						}else{
							uni.showToast({
								title:"请选择商品种类",
								icon:"none",
							})
						}
					}else{
						this.itemInfo.unique = ''
						const GoodsInfo = {
							productId: this.itemInfo.id,
							cartNum: this.value,
							uniqueId: this.itemInfo.unique,
							shop_id: this.storeInfo.info.storeId
						}
						// 发送加入购物车请求
						getAddCart(GoodsInfo,this.isToken)
						.then(res => {
							console.log(res)
							if(res.data.code == 200){
								uni.showToast({
									title:"添加成功",
									icon:"none",
								})
								// 把商品信息添加进vuex中
								this.$store.commit('addCart',GoodsInfo)
							}
						})
						this.$refs.popupbottom.close()
					}
				}else{
					uni.navigateTo({
						url:'../login/login'
					})
				}
			},
			
			// 获取商铺折扣信息
			getShopDiscount(id,token){
				getShopDiscount(id,token).then(res => {
					if(res.data.code == 200) {
						console.log(res)
						 this.discount = res.data.data
						console.log(this.discount)
					}
				})
			},
			isCountClass(item){
				if(item.is_use){
					return true
				}else {
					return false
				}
			},
			// 判断优惠券的库存
			isCount(item){
				if(item.is_use){
					return '已领取'
				}else if(parseInt(item.remain_count) == 0){
					return '已抢光'
				}else{
					return '立即领取'
				}
			},
			goLingqu(item){
				if(this.isCount(item) == '立即领取'){
					// 发送领取优惠券请求
					getDisCount(item.id,this.isToken)
					.then(res => {
						if(res.data.code == 200){
							item.is_use = true
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					})
				}else{
					
				}
			}
		},
		computed:{
			// 判断用户token
			...mapGetters(['isToken']),
			
			// 是否显示视频
			isVideo(){
				return !this.swiperList.every(item => item.type == 'image')
			},
			// 选择框预览的照片
			showImgUrl(){
				if(this.itemInfo.totalTypes){
					if(!!this.itemInfo.type.length){
						
						 if(!!this.itemInfo.totalTypes[this.itemInfo.type.join(',')]){
							 return replaceImage(this.itemInfo.totalTypes[this.itemInfo.type.join(',')].image)
						 }else{
							 return replaceImage(this.itemInfo.image)
						 }
					}else{
						return  replaceImage(this.itemInfo.image)
					}
				}
			},
			
			// 列表预览的图片
			selectimg(){
				let arr = []
				Object.keys(this.itemInfo.totalTypes).forEach(item => {
					arr.push(replaceImage(this.itemInfo.totalTypes[item].image))
				})
				return arr.splice(0,4)
			},
			isChooseType(){
				const arr = this.list.map(item => {
					return item.attr_name
				})
				return arr.join(' '+' ')
			},
			
			// 是否有种类可选
			is_UserChoose(){
				if(!!Object.keys(this.itemInfo.totalTypes).length){
					const isUserChoose = this.itemInfo.totalTypes[this.itemInfo.type]
					if(isUserChoose!==undefined){
						return isUserChoose
					}else{
						return false
					}
				}else{
					return false
				}
			}
		}
	}
</script>

<style>
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
</style>
