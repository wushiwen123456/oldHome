<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box">
			<view class="tui-header" :style="{width:width+'px',height:height+'px'}">
				<view class="tui-back" :style="{marginTop:arrowTop+'px'}" @tap="back">
					<tui-icon name="arrowleft" color="#000"></tui-icon>
				</view>
				<view class="tui-searchbox tui-search-mr" :style="{marginTop:inputTop+'px'}" >
					<!-- #ifdef APP-PLUS || MP -->
					<icon type="search" :size='13' color='#999'></icon>
					<!-- #endif -->
					<text class="tui-search-text" v-if="!searchKey">输入搜索内容</text>
					<view @tap="search" class="tui-search-key" v-if="searchKey">
						<view class="tui-key-text">{{searchKeyNum}}</view>
						<tui-icon name="shut" :size='12' color='#fff'></tui-icon>
					</view>
				</view>
			</view>
		</view>
		<!--header-->
		<!--screen-->
		<view class="tui-header-screen" :style="{top:height+'px'}">
			<view class="tui-screen-top">
				<view class="tui-top-item" :class="[tabIndex==0?'tui-active tui-bold':'']" @tap="screen" data-index="0">综合</view>
				<view class="tui-top-item" :class="[tabIndex==1?'tui-active tui-bold':'']" @tap="screen" data-index="1">销量</view>
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
		<view v-if="productList != null" class="tui-product-list">
			<view class="tui-product-container">
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2!=0 ">
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item)">
						<image :src="item.image" class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit">{{item.store_name}}</view>
							<view>
								<view class="tui-pro-price">
									<text class="tui-sale-price">￥{{item.price}}</text>
									<text class="tui-factory-price">￥{{item.ot_price}}</text>
								</view>
								<view class="tui-pro-pay">{{item.stock}}人付款</view>
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
							<view class="tui-pro-tit">{{item.store_name}}</view>
							<view>
								<view class="tui-pro-price">
									<text class="tui-sale-price">￥{{item.price}}</text>
									<text class="tui-factory-price">￥{{item.ot_price}}</text>
								</view>
								<view class="tui-pro-pay">{{item.stock}}人付款</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
		</view>

		<!--list-->
		<uni-load-more :loadingType="loadingType" ></uni-load-more>
	</view>
</template>

<script>
	import{get_product_list} from "@/network/sign.js"
	import tuiIcon from "@/components/icon/icon"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			tuiIcon,
			uniLoadMore
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
			}
		},
		onLoad(options){
			this.cid = options.cid
			this.searchKey = options.id
			this.searchKeyNum = options.search
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
			this.index();
		},
		methods: {
			//获取数据
			index(){
				let data = {}
				if(this.cid){
					data = {
						sid:this.cid,
						page:this.page,
						limit:this.limit
					}
				}else{
					data ={
						keyword:this.searchKey,
						page:this.page,
						limit:this.limit
					}
				}
				get_product_list(data).then(res => {
					if(res.length < this.limit){
						this.loadingType = 2
					}
					this.listtype = 0
					this.productList = res
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
				if(index == 0){
					this.listtype = 3
					let data = {}
					if(this.cid){
						data = {
							sid:this.cid,
							priceOrder:'asc'
						}
					}else{
						data ={
							keyword:this.searchKey,
							priceOrder:'asc'
						}
					}
					get_product_list(data,this.$refs.loading).then( res => {
						this.productList = res
					})
				}else{
					this.listtype = 4
					let data = {}
					if(this.cid){
						data = {
							sid:this.cid,
							priceOrder:'desc'
						}
					}else{
						data ={
							keyword:this.searchKey,
							priceOrder:'desc'
						}
					}
					get_product_list(data,this.$refs.loading).then( res => {
						this.productList = res
					})
				}
			},
			
			//综合 销量 价格
			screen: function(e) {
				let index = e.currentTarget.dataset.index;
				if (index == 0) {
					this.tabIndex = 0
					this.listtype = 0
					this.selectH = 0;
					this.selectedName = '价格'
					let data = {}
					if(this.cid){
						data = {
							sid:this.cid,
						}
					}else{
						data ={
							keyword:this.searchKey,
						}
					}
					get_product_list(data,this.$refs.loading).then( res => {
						this.productList = res
					})
				} else if (index == 1) {
					this.listtype = 1
					this.tabIndex = 1
					this.selectH = 0;
					this.selectedName = '价格'
					if(this.shopNum == 1){
						let data = {}
						if(this.cid){
							data = {
								sid:this.cid,
								salesOrder:'desc'
							}
						}else{
							data ={
								keyword:this.searchKey,
								salesOrder:'desc'
							}
						}
						get_product_list(data,this.$refs.loading).then( res => {
							this.productList = res
						})
						this.shopNum = 0
					}else{
						let data = {}
						if(this.cid){
							data = {
								sid:this.cid,
								salesOrder:'asc'
							}
						}else{
							data ={
								keyword:this.searchKey,
								salesOrder:'asc'
							}
						}
						get_product_list(data,this.$refs.loading).then( res => {
							this.productList = res
						})
						this.shopNum = 1
					}
					
				} else if (index == 2) {
					this.showDropdownList();
				} 
			},
			back: function() {
				uni.navigateBack()
			},
			search: function() {
				uni.redirectTo({
					url:'HM-search'
				})
			},
			detail: function(item) {
				const id = item.id
				uni.navigateTo({
					url:`../ShopDetails/shopDetails?id=${id}`
				})
			}
		},
		onReachBottom: function() {
			if(this.loadingType == 2) return
			let data = {}
			this.page += 1
			if(this.listtype == 0 ){
				//综合
				if(this.cid){ //是否为分类
					data = {
						sid:this.cid,
						page:this.page,
						limit:this.limit
					}
				}else{
					data ={
						keyword:this.searchKey,
						page:this.page,
						limit:this.limit
					}
				}
			}else if(this.listtype == 1 ){
				//销量
				if(this.shopNum == 1){
					if(this.cid){
						data = {
							sid:this.cid,
							salesOrder:'desc'
						}
					}else{
						data ={
							keyword:this.searchKey,
							salesOrder:'desc'
						}
					}
				}else{
					let data = {}
					if(this.cid){
						data = {
							sid:this.cid,
							salesOrder:'asc'
						}
					}else{
						data ={
							keyword:this.searchKey,
							salesOrder:'asc'
						}
					}
				}
				
			}else if(this.listtype == 2 ){
				//价格升序
				if(this.cid){
					data = {
						sid:this.cid,
						priceOrder:'asc'
					}
				}else{
					data ={
						keyword:this.searchKey,
						priceOrder:'asc'
					}
				}
				
			}else if(this.listtype == 3 ){
				//价格降序
				if(this.cid){
					data = {
						sid:this.cid,
						priceOrder:'desc'
					}
				}else{
					data ={
						keyword:this.searchKey,
						priceOrder:'desc'
					}
				}
			}
			get_product_list(data).then(res => {
				if(res.length < this.limit){
					this.loadingimg = true
					this.loadingType = 2
				}
				this.productList = this.productList.concat(res)
			})
		}
	}
</script>

<style>
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
	/* 商品列表*/
</style>
