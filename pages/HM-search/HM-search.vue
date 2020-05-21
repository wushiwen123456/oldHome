<template>
	
	<view class="content2" :style="{height:windowHeight + 'px'}">
		<view class="search-box" :style="{width:width+'px',height:height+'px'}">
			<!-- 返回按钮 -->
			<view class="tui-back" :style="{marginTop:arrowTop+'px'}" @tap="back">
				<tui-icon name="arrowleft" color="#000"></tui-icon>
			</view>
			
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<mSearch ref="mSearch" :style="{marginTop:inputTop+'px'}" class="mSearch-input-box" @getFocus="getFocus" :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch2" @input="inputChange" @confirm="doSearch2" v-model="keyword"></mSearch>
			<!-- 原样式 如果使用原样式，恢复下方注销代码 -->
			<!-- 			
			<view class="input-box">
				<input type="text" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
				 placeholder-class="placeholder-class" confirm-type="search">
			</view>
			<view class="search-btn" @tap="doSearch(false)">搜索</view> 
			-->
			<!-- 原样式 end -->
		</view>
		<view class="search-keyword" @touchstart="blur">
			<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<view  class="keyword-entry" hover-class="keyword-entry-tap" v-for="(row,index) in keywordList" :key="index">
					<view  class="keyword-text" @tap="doSearch(row.keyword,row.id)">
						<rich-text :nodes="row.htmlStr"></rich-text>
					</view>
					
					<view class="keyword-img" @tap="setkeyword(row)">
						<image src="/static/HM-search/back.png"></image>
					</view>
				</view>
				<view class="l-others" v-if="isKeywordList && isShowKeywordList">
					暂无此类别哦，换个词试试吧
				</view>
			</scroll-view>
			<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="/static/HM-search/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch2(keyword)" :key="index">{{keyword}}</view>
					</view>
				</view>
<!-- 				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'/static/HM-search/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="(keyword,index) in hotKeywordList" @tap="doSearch2(keyword)" :key="index">{{keyword}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view> -->
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门分类</view>
						<view>
							<!-- <image @tap="hotToggle" :src="'/static/HM-search/attention'+forbid+'.png'"></image> -->
						</view>
					</view>
					<view v-if="cateData.length" class="keyword" >
						<view v-for="(item,index) in cateData" @tap="goCategory(item,index)" :key="index">{{item.cate_name}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>暂无热门分类{{cateData}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import tuiIcon from "@/components/icon/icon"
	// 导入检索商品接口
	import { getCategory } from '@/network/category'
	// 导入商品详情接口
	import { getDetailData } from '@/network/Home'
	export default {
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				listOthers:'暂无此类别的商品哦,换个词试试吧',
				width: 200, //header宽度
				height: 64, //header高度
				inputTop: 0, //搜索框距离顶部距离
				arrowTop: 0, //箭头距离顶部距离
				hasQuery:false,
				isKeywordList:false,
				cateData:[],
				windowHeight:''
				
			}
		},
		onLoad(e) {
			
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
					this.windowHeight = res.windowHeight
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.inputTop = obj.top ? (obj.top + (obj.height - 30) / 2) : (res.statusBarHeight + 7);
					this.arrowTop = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.init();
				}
			})
			
		},	
		onReady() {
			this.$refs.mSearch.isFocus = true
		},
		components: {
			//引用mSearch组件，如不需要删除即可
			mSearch,
			tuiIcon
		},
		methods: {
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();
				this.categoryData()
			},
			blur(){
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				// this.defaultKeyword = "默认关键字";
				
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				const oldkeyList = uni.getStorageSync('OldKeys')
				if(oldkeyList.length){
					this.defaultKeyword = JSON.parse(oldkeyList)[0] || '狗屎糖'
					this.oldKeywordList = JSON.parse(oldkeyList)
				}
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.hotKeywordList = ['狗屎糖', '狗屎糖', '狗屎糖', '狗屎糖', '狗屎糖', '狗屎糖', '狗屎糖', '狗屎糖', '狗屎糖'];
			}, 
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.detail?event.detail.value:event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true	
				//以下示例截取淘宝的关键字，请替换成你的接口
				// uni.request({
				// 	url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + keyword, //仅为示例
				// 	success: (res) => {
				// 		this.keywordList = this.drawCorrelativeKeyword(res.data.result, keyword);
				// 	}
				// });
				// 设置搜索的路径
					this.isKeywordList = false
					getDetailData({
						keyword,
						showModel:true
					}).then(res => {
						const list = res.data.data
						this.keywordList = this.drawCorrelativeKeyword(list, keyword);
						console.log(this.keywordList)
						if(!this.keywordList.length){
							this.isKeywordList = true
						}
					})
					
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row.store_name.replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row.store_name,
						htmlStr: html,
						id:row.id
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setkeyword(data) {
				this.keyword = data.keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			doInput(keyword){
				this.keyword = keyword
				this.isShowKeywordList = true;
				this.$refs.mSearch.isFocus = true
				this.inputChange(keyword)
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			doSearch(key,id) {
				key = key ? key : this.keyword ? this.keyword : this.defaultKeyword;
				this.keyword = key;
				this.saveKeyword(key); //保存为历史 
				//以下是示例跳转淘宝搜索，可自己实现搜索逻辑
				//#ifdef APP-PLUS
				// plus.runtime.openURL(encodeURI('taobao://s.taobao.com/search?q=' + key));
				//#endif
				//#ifdef H5
				// window.location.href = 'taobao://s.taobao.com/search?q=' + key
				//#endif
				if(id != undefined){
					uni.navigateTo({
						url:`../ShopDetails/shopDetails?id=${id}`
					})
				}else{
					if(this.keywordList.length){
						uni.navigateTo({
							url:`../ShopDetails/shopDetails?id=${this.keywordList[0].id}`
						})
					}else{
						uni.showToast({
							title:'暂无此类别哦，换个词试试吧',
							icon:'none'
						})
					}
				}
			},
			// 执行搜素2
			doSearch2(keyword){
				keyword = keyword ? keyword : this.keyword ? this.keyword : this.defaultKeyword;
				this.saveKeyword(keyword)
				uni.redirectTo({
					url:`HM-searchList?key=${keyword}`
				})
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						console.log(res.data);
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			},
			// 点击输入框
			getFocus(e){
				
			},
			// 返回
			back(){
				uni.navigateBack()
			},
			//分类数据 
			categoryData(){
				getCategory(true).then(res => {
					if(res.data.code == 200){
						this.cateData = res.data.data
					}
				})
			},
			// 进入分类详情
			goCategory(item){
				const keyword = item.cate_name
				this.saveKeyword(keyword)
				uni.redirectTo({
					url:`HM-searchList?sid=${item.id}&name=${keyword}`
				})
			}
					
		}
	}
</script>
<style lang="scss" scoped>
	.content2{overflow: hidden;}
	.search-box {width:100%;background-color:rgb(242,242,242);display:flex;justify-content:space-between;align-items: center;}
	.search-box .mSearch-input-box{width: 100%; margin-right: 30upx;}
	.search-box .input-box {width:85%;flex-shrink:1;display:flex;justify-content:center;align-items:center;}
	.search-box .search-btn {width:15%;margin:0 0 0 2%;display:flex;justify-content:center;align-items:center;flex-shrink:0;font-size:28upx;color:#fff;background:linear-gradient(to right,#ff9801,#ff570a);border-radius:60upx;}
	.search-box .input-box>input {width:100%;height:60upx;font-size:32upx;border:0;border-radius:60upx;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0 3%;margin:0;background-color:#ffffff;}
	.placeholder-class {color:#9e9e9e;}
	.search-keyword {width:100%;background-color:rgb(242,242,242);}
	.keyword-list-box {height:calc(100vh - 110upx);padding-top:10upx;border-radius:20upx 20upx 0 0;background-color:#fff;}
	.keyword-entry-tap {background-color:#eee;}
	.keyword-entry {width:94%;height:80upx;margin:0 3%;font-size:30upx;color:#333;display:flex;justify-content:space-between;align-items:center;border-bottom:solid 1upx #e7e7e7;}
	.keyword-entry image {width:60upx;height:60upx;}
	.keyword-entry .keyword-text,.keyword-entry .keyword-img {height:80upx;display:flex;align-items:center;}
	.keyword-entry .keyword-text {width:90%;}
	.keyword-entry .keyword-img {width:10%;justify-content:center;}
	.keyword-box {height:calc(100vh - 110upx);border-radius:20upx 20upx 0 0;background-color:#fff;}
	.keyword-box .keyword-block {padding:10upx 0;}
	.keyword-box .keyword-block .keyword-list-header {width:100%;padding:10upx 3%;font-size:27upx;color:#333;display:flex;justify-content:space-between;}
	.keyword-box .keyword-block .keyword-list-header image {width:40upx;height:40upx;}
	.keyword-box .keyword-block .keyword {width:100%;padding:3px 3%;display:flex;flex-flow:wrap;justify-content:flex-start;}
	.keyword-box .keyword-block .hide-hot-tis {display:flex;justify-content:center;font-size:28upx;color:#6b6b6b;}
	.keyword-box .keyword-block .keyword>view {display:flex;justify-content:center;align-items:center;border-radius:60upx;padding:0 20upx;margin:10upx 20upx 10upx 0;font-size:28upx;background-color:rgb(242,242,242);color:#6b6b6b;}
	.tui-back {
		margin-left: 8upx;
		height: 32px !important;
		width: 32px !important;
	}
</style>
