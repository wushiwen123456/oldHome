<template>
	<view>
		<view v-if="hasData">
			<view v-for="(vo,key) in recordList" :key="key" class="flex align-center bg-white margin-top-xs recordList-all">
				<image @tap="footprintClick(vo.product_id,vo.product_type)" class="recordList-image" :src="vo.info.image"></image>
				<view @tap="footprintClick(vo.product_id,vo.product_type)" class="margin-left-sm recordList-main-all">
					<view v-if="vo.product_type == 'product' " class="text-wuer text-lg text-bold">{{vo.info.store_name}}</view>
					<view v-else class="text-wuer text-lg text-bold">{{vo.info.title}}</view>
					<view v-if="vo.product_type == 'product' " class="recordList-main">{{vo.info.store_name}}</view>
					<view v-else class="recordList-main">{{vo.info.info}}</view>
					<view class="flex align-center justify-between">
						<view class="text-sm text-jiujiujiu">{{vo.add_time}}</view>
						<view @tap.stop="onLongPress(key)" style="font-size: 40upx;" class="lg cuIcon-more"></view>
					</view>
				</view>
				<view v-show="vo.popu" @tap="delListClick(vo.id,key)" class="recordList-all-popu">
					<view>删除记录</view>
				</view>
			</view>
			<view v-show="winSize" @tap="winSizeClick" class="winSize-zehzaho" :style="{ height: windowHeight + 'px'}"></view>
			
		</view>
		<view class="userNodes" v-else>
			空空如也~
		</view>
	</view>
</template>

<script>
	import {user_visit,remove_visit} from '@/network/sign.js'
	export default {
		data() {
			return {
				winSize:false,///* 显示遮罩 */
				windowHeight:0,//高度
				recordList:[],
				token:''
			}
		},
		onLoad() {
			this.getWindowSize();
			this.token = this.$store.getters.isToken
			this.getList()
		},
		onReady() {
		},
		computed:{
			hasData(){
				return this.recordList.length
			}
		},
		methods: {
			// 获取数据
			getList(){
				user_visit(this.token).then(res =>{
					this.recordList = res
					console.log(this.recordList)
				})
			},
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.windowHeight = res.windowHeight
					}
				})
			},
			//点击删除
			onLongPress(key){
				var that = this
				that.recordList[key].popu = true
				that.winSize = true
			},
			
			//点击遮罩
			winSizeClick(){
				var that = this
				that.winSize = false
				that.recordList.forEach(function(item){
					item.popu = false
				})
			},
			
			//删除记录
			delListClick(id,key){
				var that = this
				that.winSizeClick()
				remove_visit(this.token,{ids:id}).then(res =>{
						
				})
				that.recordList.splice(key,1)
			},
			//查看详情
			footprintClick(id,type){
				if(type == 'product'){
					uni.navigateTo({
						url:'../../ShopDetails/shopDetails?id=' + id
					})
				}else{
					uni.showModal({
						title:'提示',
						content:'该商品已下架',
						success: function (res) {
							if (res.confirm) {
								uni.switchTab({
									url:'../../Home/home'
								})
							}
						}
					})
				}
			},
		}
	}
</script>

<style>
	.recordList-all{
		padding: 24upx;
		position: relative;
	}
	.recordList-all-popu{
		position: absolute;
		z-index: 999;
		right: 30upx;
		width:180upx;
		height:80upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 0upx 30upx 6upx rgba(0, 0, 0, 0.09);
		border-radius:10upx;
		color: 32upx;
		line-height: 80upx;
		text-align: center;
	}
	.recordList-image{
		width:228upx;
		height:228upx;
	}
	.recordList-main{
		color: #868686;
		font-size: 28upx;
		margin-top: 20upx;
		margin-bottom: 10upx;
		overflow:hidden;
		text-overflow:ellipsis; 
		display:-webkit-box; 
		-webkit-box-orient:vertical; 
		-webkit-line-clamp:2; 
	}
	.recordList-main-all{
		width: 60%;
	}
	.winSize-zehzaho{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99;
		background: rgba(255,255,255,0);
	}
</style>