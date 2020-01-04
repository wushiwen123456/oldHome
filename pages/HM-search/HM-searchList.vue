<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box">
			<view class="tui-header" :style="{width:width+'px',height:height+'px'}">
				<view class="tui-back" :style="{marginTop:arrowTop+'px'}" @tap="back">
					<tui-icon name="arrowleft" color="#000"></tui-icon>
				</view>
				<view class="tui-searchbox tui-search-mr" @tap="search" :style="{marginTop:inputTop+'px'}" >
					<!-- #ifdef APP-PLUS || MP -->
					<icon type="search" :size='13' color='#999'></icon>
					<!-- #endif -->
					<text class="tui-search-text" v-if="!searchKeyNum">输入搜索内容</text>
					<view class="tui-search-key" v-if="searchKeyNum" @click.stop="search2">
						<view class="tui-key-text">{{searchKeyNum}}</view>
						<tui-icon @click.native.stop="deleteKey" name="shut" :size='12' color='#fff'></tui-icon>
					</view>
				</view>
			</view>
		</view>
		<!--header-->	
		<!--screen-->
		<view class="tui-header-screen" :style="{top:height+'px'}">
			<view class="tui-screen-top">
				<view class="tui-top-item" :class="[tabIndex==0?'tui-active tui-bold':'']" @tap="screen" data-index="0">综合</view>
				<view class="tui-top-item" :class="[tabIndex==1?'tui-active tui-bold':'']" @tap="screen" data-index="1">销量
					<text
						class="lg storedtails-icon-heagin"
						:class="[isDesc ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill']">
					</text>
				</view>
				<view class="tui-top-item tui-icon-ml" :class="[tabIndex==2?'tui-active tui-bold':'']" data-index="2" @tap="screen">
					<view>{{selectedName}}</view>
					<tui-icon :name="selectH>0?'arrowup':'arrowdown'" :size="14" :color="tabIndex==2?'#e41f19':'#444'" tui-icon-class="tui-ml"></tui-icon>
				</view>

				<!--下拉选择列表--价格-->
				 
				<view class="tui-dropdownlist" :class="[selectH>0?'tui-dropdownlist-show':'']" :style="{height:px(selectH)}">
					<view class="tui-dropdownlist-item tui-icon-middle" :class="[item.selected?'tui-active tui-bold':'']" v-for="(item,index) in dropdownList"
					 :key="index" @tap.stop="dropdownItem" :data-index="index">
						<text class="tui-ml tui-middle">{{item.name}}</text>
					</view>

				</view>
				<view class="tui-dropdownlist-mask" :class="[selectH>0?'tui-mask-show':'']" @tap.stop="hideDropdownList"></view>
				<!--下拉选择列表--价格-->

			</view>
		</view>
		<!--screen-->

		<!--list-->
		<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption" :top="70">
		<view class="tui-product-list">
			<view class="tui-product-container">
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2!=0 ">
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item)">
						<image :src="item.image" class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit"><text v-if="item.is_hot" class="bg-grey text-xs padding-lr-xs margin-right-sm native-txt-red">{{dealTechan(item)}}特产</text>{{item.store_name}}</view>
							<view>
								<view class="tui-pro-price">
									<text class="tui-sale-price">￥{{item.price}}</text>
									<text class="tui-factory-price">￥{{item.ot_price}}</text>
								</view>
								<view class="tui-pro-pay flex justify-between">
									<text>库存{{item.stock}}件</text>
									<text>销量{{item.sales}}</text>
								</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
			<view class="tui-product-container" >
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2==0">
					<!-- <template is="productItem" data="{{item,index:index}}" /> -->
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item)">
						<image :src="item.image" class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit"><text v-if="item.is_hot" class="bg-grey text-xs padding-lr-xs margin-right-sm native-txt-red">{{dealTechan(item)}}特产</text>{{item.store_name}}</view>
							<view>
								<view class="tui-pro-price">
									<text class="tui-sale-price">￥{{item.price}}</text>
									<text class="tui-factory-price">￥{{item.ot_price}}</text>
								</view>
								<view class="tui-pro-pay flex justify-between">
									<text>库存{{item.stock}}件</text>
									<text>销量{{item.sales}}</text>
								</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import { getDetailData } from '@/network/Home'
	import tuiIcon from "@/components/icon/icon"
	// 下拉刷新
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	// 图片处理方法
	import { replaceImage } from '@/utils/dealUrl'
	export default {
		components: {
			tuiIcon,
			MescrollUni
		},
		data() {
			return {
				shopNum:1,//奇偶数
				searchKey: "", //搜索关键词
				searchKeyNum:'',//
				width: 200, //header宽度
				height: 64, //header高度
				inputTop: 0, //搜索框距离顶部距离
				arrowTop: 0, //箭头距离顶部距离
				tabIndex: 0, //顶部筛选索引
				selectedName: "价格",
				selectH: 0,
				dropdownList: [{
					name: "价格升序",
					selected: false,
				}, {
					name: "价格降序",
					selected: false,
				}],
				productList:[],
				cid:'',//商品分类id
				loadingType:1,
				page:1,
				limit:10,
				listtype:-1,//当前列表的状态
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
				isHasNext:true,
				sid:'',
				province:'',
				is_hot:false,
				isDesc:false,
				isLoad:false
			}
		},
		onLoad(options){
			this.cid = options.cid || ''
			this.searchKey = options.key || ''
			this.sid = options.sid || ''
			this.searchKeyNum = options.name || options.key
			this.province = options.province || ''
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.inputTop = obj.top ? (obj.top + (obj.height - 30) / 2) : (res.statusBarHeight + 7);
					this.arrowTop = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
				}
			})
			// this.index();
		},
		methods: {
			// 下拉刷新方法
			downCallback(mescroll) { 
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				// // 此时mescroll会携带page的参数:
				// let pageNum = mescroll.num; // 页码, 默认从1开始
				// let pageSize = mescroll.size; // 页长, 默认每页10条
				this.index(mescroll)
			},
			// 土特产
			dealTechan(item){
				return item.province.replace(/(['省''市'('自治区')])/g,'')
			},
			//获取数据
			index(mescroll){
				let data = {}
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				// if(this.cid){
					data = {
						cid:this.sid,
						sid:this.cid,
						page:pageNum,
						limit:pageSize,
						limit:this.limit,
						keyword:this.searchKey,
						salesOrder:this.tabIndex == 1 ? (this.isDesc ? 'desc' : 'asc') : '',
						priceOrder:this.selectedName == '价格' ? '' : (this.selectedName == '价格降序' ? 'desc' : 'asc'),
						province:this.province,
						is_hot: this.province ? 1 : 0,
					}
				// }else{
				// 	data ={
				// 		keyword:this.searchKey,
				// 		page:this.page,
				// 		limit:this.limit
				// 	}
				// }
				this.isLoad = true
				getDetailData(data).then(res => {
					this.isLoad = false
					if(res.data.code == 200){
						const list = res.data.data
						if(list.length){
							list.forEach(x => {
								x.image = replaceImage(x.image)
							})
						}
						if(list.length < pageSize){
							this.isHasNext = false
						}else{
							this.isHasNext = true
						}
						if(pageNum == 1) this.productList = [];
						this.productList = this.productList.concat(list)
						mescroll.endSuccess(list.length, this.isHasNext);
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
						mescroll.endErr()
					}
				})
			},
			px(num) {
				return uni.upx2px(num) + "px"
			},
			
			showDropdownList: function() {
				this.selectH = 180;
			},
			hideDropdownList: function() {
				this.selectH = 0
			},
			dropdownItem: function(e) {
				let index = e.currentTarget.dataset.index;
				this.dropdownList.forEach(function(item){
					item.selected = false
				})
				this.dropdownList[index].selected = true;
				this.selectedName = index == 0 ? '价格升序' : '价格降序';
				this.tabIndex = 2
				this.selectH = 0
				this.productList = []
				this.$refs.mescroll.mescroll.resetUpScroll()
			},
			
			//综合 销量 价格
			screen(e){
				const mescroll = this.$refs.mescroll.mescroll
				let index = parseInt(e.currentTarget.dataset.index)
				switch(index){
					case 0 : 
						this.tabIndex = 0
						this.selectH = 0
						this.selectedName = '价格'
						this.productList = []
						mescroll.resetUpScroll()
						break;
					case 1: 
						this.tabIndex = 1
						this.selectH = 0
						this.isDesc = !this.isDesc
						this.selectedName = '价格'
						this.productList = []
						mescroll.resetUpScroll()
						break;
					case 2: 
						if(this.selectH == 0){
							this.showDropdownList()
						}else{
							this.hideDropdownList()
						}
						break
						
				}
			},
			back() {
				uni.redirectTo({
					url:'HM-search'
				})
			},
			search() {
				uni.navigateTo({
					url:'HM-search'
				})
			},
			// 穿参数搜索
			search2(){
				const key = this.searchKeyNum
				uni.navigateTo({
					url:`HM-search?key=${key}`
				})
			},
			detail: function(item) {
				const id = item.id
				uni.navigateTo({
					url:`../ShopDetails/shopDetails?id=${id}`
				})
			},
			deleteKey(){
				this.searchKeyNum = ''
			}
		},
		
	}
</script>

<style>
	page,.container{
		height: 100vh;
		overflow: hidden;
	}
	page {
		background: #f7f7f7;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* 隐藏scroll-view滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tui-header-box {
		width: 100%;
		background: #fff;
		position: fixed;
		z-index: 99998;
		left: 0;
		top: 0;
	}

	.tui-header {
		display: flex;
		align-items: flex-start;
	}

	.tui-back {
		margin-left: 8upx;
		height: 32px !important;
		width: 32px !important;
	}

	.tui-searchbox {
		width: 100%;
		height: 30px;
		margin-right: 30upx;
		border-radius: 15px;
		font-size: 12px;
		background: #f7f7f7;
		padding: 3px 10px;
		box-sizing: border-box;
		color: #999;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	/* #ifdef MP-WEIXIN */
	.tui-search-mr {
		margin-right: 20upx !important;
	}

	/* #endif */
	/* #ifdef MP-BAIDU */
	.tui-search-mr {
		margin-right: 20upx !important;
	}

	/* #endif */

	.tui-search-text {
		padding-left: 16upx;
	}

	.tui-search-key {
		max-width: 80%;
		height: 100%;
		padding: 0 16upx;
		margin-left: 12upx;
		display: flex;
		align-items: center;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
	}

	.tui-key-text {
		box-sizing: border-box;
		padding-right: 12upx;
		font-size: 12px;
		line-height: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/*screen*/

	.tui-header-screen {
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		position: fixed;
		z-index: 1000;
	}

	.tui-screen-top,
	.tui-screen-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28upx;
		color: #333;
	}

	.tui-screen-top {
		height: 88upx;
		position: relative;
		background: #fff;
		border-bottom: 1px #F3F3F3 solid;
	}

	.tui-top-item {
		height: 28upx;
		line-height: 28upx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-topitem-active {
		color: #e41f19;
	}

	.tui-screen-bottom {
		height: 100upx;
		padding: 0 30upx;
		box-sizing: border-box;
		font-size: 24upx;
		align-items: center;
		overflow: hidden;
	}

	.tui-bottom-text {
		line-height: 24upx;
		max-width: 82%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-bottom-item {
		flex: 1;
		width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 12upx;
		box-sizing: border-box;
		background: #f7f7f7;
		margin-right: 20upx;
		white-space: nowrap;
		height: 60upx;
		border-radius: 40upx;
	}

	.tui-bottom-item:last-child {
		margin-right: 0;
	}

	.tui-btmItem-active {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
	}

	.tui-btmItem-active::after {
		content: "";
		position: absolute;
		border: 1upx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40upx;
		left: 0;
		top: 0;
	}

	.tui-btmItem-tap {
		position: relative;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.tui-btmItem-tap::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 22upx;
		background: #f7f7f7;
		left: 0;
		top: 58upx;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-active {
		color: #e41f19;
	}

	.tui-icon-ml .tui-icon-class {
		margin-left: 6upx;
	}

	.tui-ml {
		margin-left: 6upx;
	}

	.tui-seizeaseat-20 {
		height: 20upx;
	}

	.tui-seizeaseat-30 {
		height: 30upx;
	}

	.tui-icon-middle .tui-icon-class {
		vertical-align: middle;
	}

	.tui-middle {
		vertical-align: middle;
	}

	/*screen*/

	/*顶部下拉选择 属性*/

	.tui-scroll-box {
		width: 100%;
		height: 480upx;
		box-sizing: border-box;
		position: relative;
		z-index: 99;
		color: #fff;
		font-size: 30upx;
		word-break: break-all;
	}

	.tui-drop-item {
		color: #333;
		height: 80upx;
		font-size: 28upx;
		padding: 20upx 40upx 20upx 40upx;
		box-sizing: border-box;
		display: inline-block;
		width: 50%;
	}

	.tui-drop-btnbox {
		width: 100%;
		height: 100upx;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		display: flex;
	}

	.tui-drop-btn {
		width: 50%;
		font-size: 32upx;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		border: 0;
	}

	.tui-btn-red {
		background: #e41f19;
		color: #fff;
	}

	.tui-red-hover {
		background: #c51a15 !important;
		color: #e5e5e5;
	}

	.tui-btn-white {
		background: #fff;
		color: #333;
	}

	.tui-white-hover {
		background: #e5e5e5;
		color: #2e2e2e;
	}

	/*顶部下拉选择 属性*/

	/*顶部下拉选择 综合*/

	.tui-dropdownlist {
		width: 100%;
		height: 180upx;
		position: absolute;
		background: #fff;
		border-bottom-left-radius: 24upx;
		border-bottom-right-radius: 24upx;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 10upx;
		padding-bottom: 26upx;
		left: 0;
		top: 88upx;
		visibility: hidden;
		transition: all 0.2s ease-in-out;
		z-index: 999;
	}

	.tui-dropdownlist-show {
		visibility: visible;
	}

	.tui-dropdownlist-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: -1;
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.tui-mask-show {
		opacity: 1;
		visibility: visible;
	}

	.tui-dropdownlist-item {
		height: 70upx;
		font-size: 28upx;
		padding: 0 40upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/*顶部下拉选择 综合*/

	.tui-drawer-box {
		width: 686upx;
		font-size: 24upx;
		overflow: hidden;
		position: relative;
		padding-bottom: 100upx;
	}

	.tui-drawer-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		box-sizing: border-box;
		height: 80upx;
	}

	.tui-title-bold {
		font-size: 26upx;
		font-weight: bold;
		flex-shrink: 0;
	}

	.tui-location {
		margin-right: 6upx;
	}

	.tui-attr-right {
		width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: right;
	}

	.tui-all-box {
		width: 90%;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.tui-drawer-content {
		padding: 16upx 30upx 30upx 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.tui-input {
		border: 0;
		height: 64upx;
		border-radius: 32upx;
		width: 45%;
		background: #f7f7f7;
		text-align: center;
		font-size: 24upx;
		color: #333;
	}

	.tui-phcolor {
		text-align: center;
		color: #b2b2b2;
		font-size: 24upx;
	}

	.tui-flex-attr {
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.tui-attr-item {
		width: 30%;
		height: 64upx;
		background: #f7f7f7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 4upx;
		box-sizing: border-box;
		border-radius: 32upx;
		margin-right: 5%;
		margin-bottom: 5%;
	}

	.tui-attr-ellipsis {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 96%;
		text-align: center;
	}

	.tui-attr-item:nth-of-type(3n) {
		margin-right: 0%;
	}

	.tui-attr-btnbox {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 0 30upx;
		background: #fff;
	}

	.tui-attr-safearea {
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-attr-btnbox::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-drawer-btn {
		width: 47%;
		text-align: center;
		height: 60upx;
		border-radius: 30upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.tui-drawerbtn-black {
		border: 1upx solid #555;
	}

	.tui-drawerbtn-primary {
		background: #e41f19;
		color: #fff;
	}

	/* 商品列表*/

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		margin: 200upx 20upx 0 20upx ;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 10upx;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 10upx;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12upx;
		overflow: hidden;
		transition: all 0.15s ease-in-out;
	}

	.tui-flex-list {
		display: flex;
		margin-bottom: 1upx !important;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-proimg-list {
		width: 260upx;
		height: 260upx;
		flex-shrink: 0;
		border-radius: 12upx;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20upx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26upx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18upx;
	}

	.tui-sale-price {
		font-size: 34upx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24upx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12upx;
	}

	.tui-pro-pay {
		padding-top: 10upx;
		font-size: 24upx;
		color: #656565;
	}
	.native-txt-red{
		width:86upx;
		height:40upx;
		background:rgba(205,50,51,1);
		border-radius:16upx;
		font-size: 20upx;
	}
	/* 商品列表*/
</style>
