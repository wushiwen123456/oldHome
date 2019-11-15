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
		<view class="seckilltime-background">
			<view class="flex align-center margin-left-sm">
				<view style="font-size: 70upx;" class="text-price">139</view>
				<view class="text-xs margin-left-xs" style="color: #FFD4D2;">
					<view class="seckilltime-yuanjiage">￥289</view>
					<view>仅剩:16份</view>
				</view>
			</view>
			<view class="flex flex-direction align-center justify-center margin-right">
				<view class="text-red-my text-sm margin-bottom-xs">限时秒杀</view>
				<tui-countdown :time="timeList[0]" :colonSize="40" color="#fff" :width="44" :height="36" :size="30" bcolor="#000000" bgcolor="#000000" colonColor="#000000"></tui-countdown>
			</view>
		</view>
		<view class="bg-white padding-left">
			<view>
				<view class="flex align-center justify-between margin-right-sm">
					<view class="flex align-center margin-top-xs margin-bottom-xs">
						<view class="cu-tag bg-red-my shopDetails-title-height">店铺红包满149减10</view>
						<view class="cu-tag bg-red-my shopDetails-title-height">购买得积分</view>
					</view>
					<view @tap="outloginClick" class="flex align-center">
						<view class="text-gray text-sm">领券</view>
						<view class="lg text-gray cuIcon-right"></view>
					</view>
				</view>
				
				<view class="flex align-center margin-top-sm margin-bottom-sm">
					<view class="flex-four text-three shopDetails-title-name">沃隆每日坚果750g混合装30包干果零食大礼包混合坚果小包装</view>
					<view @tap="outloginSharClick" class="flex-sub flex align-center justify-center shopDetails-title-shar">
						<view class="lg cuIcon-forward margin-right-xs"></view>
						<view>转发</view>
					</view>
				</view>
				<view class="flex align-center justify-between padding-bottom-sm margin-right-sm text-jiujiujiu">
					<view>快递:<text class="margin-left-sm">免运费</text></view>
					<view>销量11266</view>
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
					<view class="margin-left-sm">选择  食品口味 </view>
				</view>
				<view class="lg text-jiujiujiu cuIcon-right"></view>
			</view>
			<view class="flex align-center shopDetails-select-image">
				<view class="flex-yidw">
					<image v-for="(vo,key) in selectimg" :key="key" class="shopDetails-image" :src="vo.img"></image>
				</view>
				<view class="flex-sub shopDetails-image-select">共有10中口味可选</view>
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
					<image class="shop-introduce-img" src="../../static/demo9.png" ></image>
					<view class="margin-left-sm flex flex-direction justify-between">
						<view class="shop-detal-name">沃隆旗舰店</view>
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
					<view>宝贝描述</view>
					<view class="padding-left-xs padding-right-xs">4.9</view>
					<view class="shop-pingfen" >平</view>
				</view>
				<view class="flex align-center flex-sub ">
					<view>宝贝描述</view>
					<view class="padding-left-xs padding-right-xs">4.9</view>
					<view class="shop-pingfen" >平</view>
				</view>
				<view class="flex align-center flex-sub ">
					<view>宝贝描述</view>
					<view class="padding-left-xs padding-right-xs">4.9</view>
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
				<view class="flex-sub">
					<image class="tuijian-shop-three-image" src="../../static/demo4.png"></image>
					<view class="text-sm-erliu text-black">【预售】沃隆每日坚果750g混合装...</view>
					<view class="text-red-my text-sm-erliu margin-top-sm margin-bottom-sm">￥159</view>
				</view>
				<view class="flex-sub">
					<image class="tuijian-shop-three-image" src="../../static/demo4.png"></image>
					<view class="text-sm-erliu text-black">【预售】沃隆每日坚果750g混合装...</view>
					<view class="text-red-my text-sm-erliu">￥159</view>
				</view>
				<view class="flex-sub">
					<image class="tuijian-shop-three-image" src="../../static/demo4.png"></image>
					<view class="text-sm-erliu text-black">【预售】沃隆每日坚果750g混合装...</view>
					<view class="text-red-my text-sm-erliu">￥159</view>
				</view>
			</view>
		</view>
		
		<!-- 推荐商品 end-->
		<view style="height: 74upx;color: #525253;" class="flex align-center justify-center">———— 商品详情 ————</view>
		<!-- 文本分割线 -->
		
		<!-- 商品介绍 -->
		<view>
			<image src="../../static/demo7.png" mode="widthFix" style="width: 100%;"></image>
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
					<view class="text-sm-erliu">购买可得24积分</view>
				</view>
				<view class="text-jiujiujiu text-df margin-bottom">领券</view>
				<view class="flex align-center justify-between shopDetails-bottom-popups-backone text-red-my">
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
						<image class="popupbottom-shop-img" src="../../static/demo1.png"></image>
						<view class="margin-left-sm">
							<view class="text-price text-red text-bold text-xl">50</view>
							<view class="text-sm" style="color: #828282;">库存14455件</view>
							<view class="text-sm">选择  食品口味</view>
						</view>
					</view>
					<view class="lg text-gray cuIcon-roundclose shopDetails-bottom-popups-clos"></view>
				</view>
				<view class="padding-bottom-sm solid-bottom">
					<view class=" margin-top-lg margin-bottom">食品口味</view>
					<view class="flex flex-wrap">
						<block v-for="(vo,key) in list" :key="key">
							<view @tap="selectShopClick(vo.type,key)" :class="[vo.type?'popupbottom-shop-type-select':'']" class="popupbottom-shop-type-all">{{vo.title}}</view>
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
					<view class="shopDetails-bottom-button popupbottom-all-button button-left">加入购物车</view>
					<view @tap="nowBuyClick" class="shopDetails-bottom-button popupbottom-all-button button-right">立即购买</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import uniPopup  from "@/components/uni-popup/uni-popup"
	import tuiCountdown from "@/components/countdown/countdown"
	export default{
		components: {
			uniPopup,
			tuiNumberbox,
			tuiCountdown
		},
		data(){
			return{
				timeList: [1000, 2000, 3000, 19, 240000],//倒计时
				payimgType:true,//图片或者视频
				swiperNum:1,//当前所在滑块
				videoUrl:'',
				swiperList: [{
					id: 0,
					type: 'video',
					url: 'http://baobab.kaiyanapp.com/api/v1/playUrl?vid=164016&resourceType=video&editionType=high&source=aliyun&playUrlType=url_oss'
				},{
					id: 0,
					type: 'image',
					url: '../../static/demo2.png'
				}, {
					id: 1,
					type: 'image',
					url: '../../static/demo2.png',
				}, {
					id: 2,
					type: 'image',
					url: '../../static/demo2.png'
				}, {
					id: 3,
					type: 'image',
					url: '../../static/demo2.png'
				}],
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
			}
		},
		methods:{
			//选择商品属性
			selectShopClick(type,key){
				if(type){
					this.list[key].type = false
				}else{
					this.list[key].type = true
				}
			},
			//选择图片
			selectimageClick(){
				this.payimgType = true
				this.swiperNum = 1
			},
			//选择视频
			selectPlayClick(){
				this.payimgType = false
				this.swiperNum = 0
			},
			//滑块的change
			swiperChange(e){
				this.swiperNum = e.target.current
				if(this.swiperNum == 0){
					this.payimgType = false
				}else{
					this.payimgType = true
				}
				console.log(e.target.current)
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
				uni.navigateTo({
					url:'affirm/affirmOrder'
				})
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
</style>
