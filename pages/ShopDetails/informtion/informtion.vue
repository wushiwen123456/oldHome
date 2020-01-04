<template>
	<view>
		<scroll-view scroll-y id="openHeight" class="cu-chat" :style="{height:style.contentViewHeight + 'px'}" :scroll-top="scrollTop">
			<view v-for="(vo,key) in messageList" :key="key" class="m-item">
				<view v-if="vo.cate == 0" class="cu-item self">
					<view class="main">
						<!-- <view class="content shadow"> -->
							<rich-text class="content shadow" :nodes="vo.content"></rich-text>
						<!-- </view> -->
					</view>
					<image class="cu-avatar radius" mode="aspectFill" :src="message.avatar"></image>
					<view class="date">{{photoList(vo.add_time)}}</view>
				</view>
				<view  v-else class="cu-item">
					<image class="cu-avatar radius" :src="shopInfo.storeLogo"></image>
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

	</view>
</template>

<script>
	import {test,send_message,get_service_message} from '@/network/sign.js'
	import { formatDate } from '@/utils/dealData'
	export default {
		data() {
			return {
				InputBottom: 0,
				send:'',//发送的信息
				message:null,//个人信息
				shopInfo:null,//店铺信息
				messageall:[],//所有聊天记录 storeId：店铺id  messageList:[]
				messageList:[],//与打开店铺有关的聊天记录
				type:-1,//0 缓存 存在与该店铺的聊天记录  1 不存在
				typepage:-1,//存在的聊天记录下标
				// 聊天页面时时滚动样式
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				scrollTop:0,
				scrollHeight:600,
				isShowScroll:true
			};
		},
		
		computed: {
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
			}
		},
		onBackPress(){
			uni.closeSocket()
		},
		onLoad(e){
			this.getScrollHeight()
			var that = this
			console.log(e)
			
			that.shopInfo = JSON.parse(e.shopInfo),//店铺信息
			console.log(that.shopInfo)
			that.message = uni.getStorageSync('Message_key');//个人信息
			let list = uni.getStorageSync('messageall_key');//聊天数据
			if(list){
				that.messageall = list
				//存在聊天记录
				for(var i = 0 ; i < list.length ; i++){
					if(list[i].storeId == that.shopInfo.storeId){
						that.messageList = list[i].messageList
						that.type = 0
						that.typepage = i
						console.log('存在聊天记录，且下标为')
						console.log(that.typepage)
						break;
					}else{
						console.log('缓存内存在聊天记录，但不存在该店铺')
						that.type = 1
					}
				}
			}else{
				//不存在聊天记录
				that.type = 1
				let group_id = that.message.uid + '_' + that.shopInfo.storeId
				get_service_message({group_id:group_id}).then(res =>{
					if(res.length > 0){  //服务器存在聊天记录
						that.messageList = res
						let arr = []
						// 添加缓存
						let data = {
							storeId:that.shopInfo.storeId,
							messageList:res
						}
						arr.push(data)
						uni.setStorage({
						    key: 'messageall_key',
						    data: arr,
						});
						that.type = 0
						that.typepage = 0
					}
				})
			}
			uni.connectSocket({
				url: 'ws://49.234.24.76:9502',
			});
			uni.onSocketOpen(function (res) {
				console.log('WebSocket连接已打开！');
			});
			uni.onSocketMessage(function (res) {
				let data = JSON.parse(res.data)
				if(data.type == 'init'){
					console.log('第一次连接')
					let mydata ={
						client_id:data.client_id,
						uid:that.message.uid
					}
					test(mydata)
					return
				}
				console.log('收到服务器内容：' );
				console.log(data)
				var timestamp = Math.round(new Date().getTime()/1000).toString();
				let dataList = {
					cate:1,
					add_time:timestamp,
					content:data.msg
				}
				that.messageList.push(dataList)
				that.messageall[that.typepage].messageList = that.messageList
				// that.scrollToBottom()
				uni.setStorage({
				    key: 'messageall_key',
				    data: that.messageall,
				});
				
			});
			const res = uni.getSystemInfoSync();   //获取手机可使用窗口高度
			that.style.pageHeight = res.windowHeight;
			that.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth/750* (100) - 50;	
		},
		onReady() {
			this.scrollToBottom()
		},
		methods: {
			// 计算scroll的高度
			getScrollHeight(){
				const res = uni.getSystemInfoSync();
				this.scrollHeight = `calc( ${res.windowHeight}px - ${this.InputBottom}px )`
				console.log(this.scrollHeight)
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
					uid:that.message.uid,
					shop_id:that.shopInfo.storeId,
				}
				var timestamp = Math.round(new Date().getTime()/1000).toString();
				let dataList = {
					cate:0,
					add_time:timestamp,
					content:send
				}
				that.messageList.push(dataList)
				
				// that.scrollToBottom()
				if(that.type == 0){
					console.log('存在店铺')
					//存在与该店铺的聊天记录
					that.messageall[that.typepage].messageList = that.messageList
				}else{
					let data = {
						storeId:that.shopInfo.storeId,
						messageList:[dataList]
					}
					that.messageall.push(data)
					console.log(that.messageall)
					that.type = 0
					that.typepage = that.messageall.length - 1
					console.log('不存在店铺，已添加到缓存位置为：')
					console.log(that.typepage)
				}
				uni.setStorage({
				    key: 'messageall_key',
				    data: that.messageall,
				});
				send_message(data).then(res =>{
					
				})
				that.scrollToBottom()
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
					url:'../StoreDetails/storedetails?id=' + this.shopInfo.storeId,
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
				this.scrollToBottom()
			},
			InputBlur(e) {
				this.InputBottom = 0
				this.scrollToBottom()
			},
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
