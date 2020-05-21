<template>
	<view>
		<scroll-view scroll-y id="openHeight" class="cu-chat" :style="{height:style.contentViewHeight + 'px'}" :scroll-top="scrollTop" v-if="messageList">
			<view v-for="(vo,key) in messageList.messageList" :key="key" class="m-item">
				<view v-if="vo.cate == 0" class="cu-item self">
					<view class="main">
						<!-- <view class="content shadow"> -->
							<rich-text class="content shadow" :nodes="vo.content"></rich-text>
						<!-- </view> -->
					</view>
					<image class="cu-avatar radius" mode="aspectFill" :src="userData.avatar"></image>
					<view class="date">{{photoList(vo.add_time)}}</view>
				</view>
				<view  v-if="vo.cate == 1" class="cu-item">
					<image class="cu-avatar radius" :src="shopInfo.shop_info ? shopInfo.shop_info.shop_logo : ''"></image>
					<view class="main">
						<rich-text class="content shadow" :nodes="vo.content"></rich-text>
					</view>
					<view class="date ">{{photoList(vo.add_time)}}</view>
				</view>
			</view>
			<view :style="[{height:InputBottom+'px'}]" class="m-item"></view>
		</scroll-view>
		
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view @tap="shopClick" class="action">
				<text style="color: #636362;" class="lg text-gray cuIcon-shop"></text>
			</view>
			<input class="solid-bottom-input" v-model="send" :adjust-position="false" :focus="false" maxlength="300" :cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur" @confirm="sendClick"></input>
			<image @tap="sendClick" class="fasong-button" src="../../../static/dasong.png"></image>
		</view>
		 <x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>
	// 获取个人信息
	import { getProfileData } from '@/network/getProfileData'
	// 获取店铺信息
	import { getStoreInfo } from '@/network/detail'
	import {test,send_message,get_service_message} from '@/network/sign.js'
	import { formatDate } from '@/utils/dealData'
	// 导入长连接方法
	import { openWebScoket } from '@/utils/chat'
	
	// 导入vuex
	import { mapGetters,mapState } from 'vuex'
	
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	export default {
		data() {
			return {
				InputBottom: 0,
				send:'',//发送的信息
				shopInfo:{},//店铺信息
				type:1,//0 缓存 存在与该店铺的聊天记录  1 不存在
				typepage:-1,//存在的聊天记录下标
				// 聊天页面时时滚动样式
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				scrollTop:0,
				isShowScroll:true,
				openWebScoket:true,
				localAvatar:'',
				storeId:''
			};
		},
		onUnload() {
			// 清除小红点
			this.clearRed()
		},
		computed: {
			...mapState(['userData','userChatMessages']),
			...mapGetters(['isToken']),
			photoList() {
				return function(start_time){
					let num = ''
					var date = new Date(start_time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
					var Y = date.getFullYear() + '-';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					var D = date.getDate();
					var h = this.padLeftZero(date.getHours())  + ':';
					var m = this.padLeftZero(date.getMinutes()) ;
					var time = new Date().getDate();
					if(time == D){
						num = h+m
					}else{
						num = M+D+' '+h+m
					}
					return num
				}
			},
			messageList(){
				return this.userChatMessages.length != 0 ? this.userChatMessages.find( item =>  item.storeId == this.storeId) : []
			}
		},
		onLoad(e){
			var that = this
			if(!this.userData.avatar){
				// 没有用户信息,去获取用户信息
				console.log('没有用户信息,去获取用户信息')
				this.getProfileData()
			}
			this.storeId = e.id
			 //获取手机可使用窗口高度
			const res = uni.getSystemInfoSync(); 
			that.style.pageHeight = res.windowHeight;
			that.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth/750* (100) - 50;	
			// 获取店铺信息
			this.getStoreDetail()
		},
		onReady() {
			this.$nextTick(() => {
				this.scrollToBottom()
			})
		},
		watch:{
			messageList:{
				handler(newName,oldName){
					this.$nextTick(() => {
						this.scrollToBottom()
					})
				},
				deep:true,
				
			}
		},
		methods: {
			clearRed(){
				if(this.messageList){
					this.messageList.newMessageNum = 0
				}
			},
			// 获取店铺信息
			getStoreDetail(){
				getStoreInfo(this.storeId,this.isToken).then(res => {
					if(res.data.code == 200){
						let data = res.data.data
						data.shop_info.shop_logo = replaceImage(data.shop_info.shop_logo)
						this.shopInfo = data
						console.log(this.shopInfo)					
					}else{
						uni.showToast({
							title:'店铺信息读取失败',
							icon:'none'
						})
					}
					
				})
			},
			// 获取个人信息
			getProfileData(){
				getProfileData(this.isToken).then(res => {
					if(res.data.code == 200){
						const obj = res.data.data
						// 获取网络头像
						obj.avatar = replaceImage(obj.avatar)
						console.log(obj)
						
						// 将信息存入vuex中
						this.$store.commit('setUserData',obj)
						
						console.log(obj)
						// 读取缓存
						uni.getStorage({
							key:obj.account,
							success:(res) => {
								console.log('获取缓存成功')
								const data = res.data
								console.log(data)
								data.Message_key = obj
								// 存入缓存
								uni.setStorage({
									key:obj.account,
									data:data,
									success:() =>{
										console.log('本地缓存更新成功')
									} 
								})
							},
							fail:(err) => {
								console.log(err)
							}
						})
						
						
					}else{
						plus.nativeUI.toast('获取信息失败')
					}
				})
			},
			// 时间转换
			padLeftZero (str) {
			  return ('00' + str).substr(str.toString().length);
			},
			//发送消息
			sendClick(){
				var that = this
				const send = this.send
				if(!send) return
				this.send = ''
				let data = {
					message:send,
					uid:that.userData.uid,
					shop_id:that.shopInfo.shop_info.shop_id,
				}
				var timestamp = Math.round(new Date().getTime()/1000).toString();
				
				let dataList = {
						msg:send,
						shop_id:data.shop_id,
						cate:0
				}			
				// 发送至vuex中存储
				this.$store.commit('dealSocketMessage',{
					dataList,
					shop_info:that.shopInfo
				})
				send_message(data)
				that.$nextTick(() =>{
					that.scrollToBottom()
				})
			},
			
			scrollToBottom(e){
				let that = this;
				let query = uni.createSelectorQuery()
				query.selectAll('.m-item').boundingClientRect()
				query.select('#openHeight').boundingClientRect()
				query.exec( (res) => {	
					that.style.mitemHeight = 0
					res[0].forEach(rect => {
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 40
					})
					setTimeout(() => {
						if(that.style.mitemHeight > (that.style.contentViewHeight - 100))
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight
					},100)
				})
			},
			//点击店铺
			shopClick(){
				uni.navigateTo({
					url:'../StoreDetails/storedetails?id=' + this.shopInfo.shop_id,
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
				this.$nextTick(() => {
					this.scrollToBottom()
				})
			},
			InputBlur(e) {
				this.InputBottom = 0
				this.$nextTick(() => {
					this.scrollToBottom()
				})
			}
		}
	}
</script>

<style>
page{
  padding-bottom: 100upx;
}
.fasong-button{
	width:58upx;
	height:58upx;
}
.solid-bottom-input{
	border-radius: 24upx;
	background:rgba(255,255,255,1);
	box-shadow:0upx 0upx 3upx 0upx rgba(0, 0, 0, 0.31);
	border-radius:40upx;
	padding-left: 30upx;
}
</style>
