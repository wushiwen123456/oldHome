<template>	
	<view class="content">
		<!-- 左边滚动 -->
		<scroll-view scroll-y class="left-aside" >
			<view 
				class="f-item b-b text-cut"
				v-for="(item,index) in tabbar" :key="index"
				@tap="swichNav(item,index)"
				:class="{active:index == currentTab}"
				>
				{{item.label}}
				
			</view>
		</scroll-view>
		<!-- 右边滚动 -->
		<scroll-view scroll-y scroll-with-animation class="right-aside" @scroll="asideScroll" :scroll-top="scrollTop" >
			<view class="right-con" v-if="item" v-for="(item,index) in tabbar" :key="index" :id="'main' + item.value">
				<view @click="xianClick(item,index)" class="view-box text-cut">
					<text>{{item.label}}</text>
				</view>
				<view class="t-list">
					<view 
						v-if="item.child"
						class="t-item" 
						v-for="(vo,key) in item.child" :key="key" 
						:class="{'set-item1':(key+1) %3 != 0}" 
						hover-class="hover-itmeclick"
						@click="xianClick(vo,key)">
						<text class="text-cut">{{vo.label}}</text>
					</view>
				</view>
			</view>
		</scroll-view>		
	</view>
</template>

<script>
	// 获取城市
	import  citys  from '@/components/w-picker/city-data/city'
	// 获取县区
	import area from '@/components/w-picker/city-data/area'
	
	// 获取省份
	import province from '@/components/w-picker/city-data/province'
	// 获取数据
	import { getDetailData } from '@/network/Home'
	
	// 转换数据工具
	import { replaceImage } from '@/utils/dealUrl'
	export default {
		data() {
			return {
				tabbar: ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市"],
				height: 0, //scroll-view高度
				top: 0,
				currentTab: 0, //预设当前项的值
				scrollTop: 0 ,//tab标题的滚动条位置
				name:''  ,//当前场景name
				xianCurry:0,
				page:1,
				hotList:[],
				procince:"",
				area:area,
				currentProvince:-1,
				areaCity:{},
				gridCol:3,
				gridBorder:false,
				sizeCalcState:false
			}
		},
		onLoad: function(options) {
			 this.province = options.name
			uni.setNavigationBarTitle({
			    title: options.name
			});
			const view = uni.getSystemInfoSync()
			this.height = view.windowHeight;
			// 根据addressId获取城市
			this.getCitys(options.id)	
			// 默认加载第一页数据
			// this.getDetailData(options.name,this.tabbar[this.currentTab].label,this.currentArea.label)
		},
		methods: {
			// 获取城市
			getCitys(id){
				const arr = []
				let p_index
				citys.forEach((z,q) => {
					 z.forEach((x,index) => {
						const a = x.value.slice(0,2)
						if(a == id){
							arr.push(x)
						}
					})
				})
				// 判断载入省份的index
				province.forEach((x,index) => {
					if(x.value == id) p_index = index				
				})
				arr.forEach((x,index) => {
					x.child = area[p_index][index]
				})
				this.tabbar = arr
			},
			// 点击县标签
			xianClick(vo,key){
				const province = this.province
				uni.redirectTo({
					url:`native?province=${province}`
				})
				
			},
			
			// 点击标题切换当前页时改变样式
			swichNav(item,index){
				this.currentTab = index
				if(!this.sizeCalcState){
					this.calcSize()
				}
				this.scrollTop = item.top
			},
			// 滚动时监听
			asideScroll(e){
				const top = e.detail.scrollTop
				if(!this.sizeCalcState){
					this.calcSize()
				}
				const tabs = this.tabbar.filter(x => x.top <= top)
				if(tabs.length > 0 ){
					this.currentTab = tabs.length-1
				}
			},
			// 计算tabBar右侧栏每个高度信息
			calcSize(){
				let h = 0
				this.tabbar.forEach(x => {
					let view = uni.createSelectorQuery().select('#main' + x.value)
					view.fields({
						size:true
					},data => {
						x.top = h
						h += data.height+24*1
						x.bottom = h
					}).exec()
				})
				this.sizeCalcState = true
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				let that = this;
				//这里计算按照实际情况进行修改，动态数据要进行动态分析
				//思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
				//数据很多可以多次if判断然后进行滚动距离计算即可
				if (that.currentTab > 7) {
					that.scrollTop = 500
				} else {
					that.scrollTop = 0
				}
			},
			detail(e) {
				uni.navigateTo({
					url: '../extend-view/productDetail/productDetail'
				})
			},
			productList(e) {
				let key = e.currentTarget.dataset.key;
				uni.navigateTo({
					url: '../extend-view/productList/productList?searchKey=' + key
				})
			},
			search: function() {
				uni.navigateTo({
					url: '../extend-view/news-search/news-search'
				})
			},
			// 根据区名加载数据
			getDetailData(province,city,area){
				getDetailData({
					is_hot:1,
					province:province.replace('馆',''),
					city,
					area,
					page:1
				})
				.then(res => {
					if(res.data.code == 200){
						// this.hotList = res.data.data.length ? res.data.data : []
						if(res.data.data.length){
							const obj = res.data.data
							
							obj.forEach(x => {
								x.image = replaceImage(x.image)
							})
							this.hotList = obj
						}else{
							this.hotList = []
						}
						
					}
				})
			},
			// 点击数据跳转到详情页
			itemClick(item,index) {
				if(!this.$store.getters.isToken){
					uni.showModal({
						title:'请先去登录',
						content:'',
						success: (res)=>  {
							if(res.confirm){
								uni.navigateTo({
									url:'../../login/login'
								})
							}
						}
					})
				}else{
					uni.navigateTo({
						url:`../../ShopDetails/shopDetails?id=${item.id}`
					})
				}
			}
		},
		computed:{
			// 获取当前县级数据
			currentList(){
				const arr = []
				area.forEach(x => {
					x.forEach(y => {
						y.forEach(z => {
							const a = z.value.slice(0,4)
							if(a == this.tabbar[this.currentTab].value)
							arr.push(z)
						})
					})
				})			
				return  arr
			},
			// 获取当前选中的县区id
			currentArea(){
				return this.currentList[this.xianCurry]
			}
		}
	}
</script>

<style lang="scss">
	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid #E4E7ED;
	}
	
	.b-b:after {
		bottom: 0;
	}
	
	.b-t:after {
		top: 0;
	}
	page,.content{
		height: 100%;
		background-color: #f8f8f8;
	}
	.content{
		display: flex;
	}
	.left-aside{
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: #333333;
		position: relative;
		&.active{
			color: $uni-text-color-base;
			background-color: #f8f8f8;
			&.before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $uni-text-color-base;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}
	.right-aside{
		flex: 1;
		overflow: hidden;
		padding: 29upx 15upx;
		background-color: #fff;
	}
	.cu-avatar{
		font-size: 28upx !important;
	}
	
	.view-box{
		display: flex;
		justify-content: center;
		align-items: center;
		text{
			padding: 15upx 25upx;
			background-color: #e54d42;
			color: #FFFFFF;
			font-size: 30upx;
			border-radius: 10upx;
		}
		
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20upx;
		.t-item{
			width: 158upx;
			height: 66upx;
			margin-top: 20upx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #F8F8F8;
			color: #333;
			font-size: 28upx;
			border-radius: 10upx;
		}
	}
	.set-item1{
		margin-right: 20upx;
	}
	.right-con{
		margin-bottom: 48upx;
	}
	.hover-itmeclick{
		background-color: #CD3233 !important;
		color: #FFFFFF !important;
	}
</style>
