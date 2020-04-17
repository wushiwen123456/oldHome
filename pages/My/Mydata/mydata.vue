<template>
	<view>
		<view class="flex align-center bg-white justify-center mydata-title">
			<image @tap="clk(1)" :src="urls" lazy-load="../../../static/bottomh.png"></image>
		</view>
		<view class="margin-top bg-white">
			<view class="flex align-center justify-between margin-lr mydata-title-all">
				<view class="flex-twice text-wuer text-lg">昵称</view>
				<view class="flex align-center justify-between flex-six">
					<input class="text-jiujiujiu text-df text-width" placeholder="输入昵称" v-model="userData.nickname"  confirm-type="done"/>
				
				</view>
			</view>
			<view class="flex align-center justify-between margin-lr mydata-title-all">
				<view class="flex-twice text-wuer text-lg">性别</view>
				<view class="flex align-center flex-six">
					<view @tap="sexnanClick" style="font-size: 40upx;" :class="[userData.sex == 1?'text-red-my cuIcon-radiobox':'text-gray cuIcon-round']" class="lg margin-right-sm"></view>
					<view  @tap="sexnanClick">男</view>
					<view @tap="sexnvClick"  style="font-size: 40upx;" :class="[userData.sex == 2?'text-red-my cuIcon-radiobox':'text-gray cuIcon-round']" class="lg margin-right-sm margin-left"></view>
					<view  @tap="sexnvClick">女</view>
				</view>
			</view>
<!-- 			<view @tap="shopTypeClick" class="flex align-center justify-between margin-lr mydata-title-all">
				<view class="flex-twice text-wuer text-lg">生日</view>
				<view class="flex align-center justify-between flex-six">
					<input class="text-jiujiujiu text-df" disabled="true" placeholder="选择出生日期" v-model="birth"  confirm-type="done"/>
					<view class="lg text-gray cuIcon-right"></view>
				</view>
			</view> -->
			<view class="flex align-center justify-between margin-lr mydata-title-all">
				<view class="flex-twice text-wuer text-lg">手机号</view>
				<view class="flex align-center justify-between flex-six">
					<input class="text-jiujiujiu text-df text-width" :disabled="true" placeholder="暂无法更改" type="number" v-model="phone"  confirm-type="done"/>
					<view></view>
				</view>
			</view>
			<!-- <view class="flex align-center justify-between margin-lr mydata-title-all">
				<view class="flex-twice text-wuer text-lg">收货地址</view>
				<view class="flex align-center justify-between flex-six">
					<input class="text-jiujiujiu text-df" placeholder="填写收货地址" v-model="adddress"  confirm-type="done"/>
					<view class="lg text-gray cuIcon-right"></view>
				</view>
			</view> -->
			<w-picker
				mode="date" 
				startYear="1920" 
				endYear="2030"
				:defaultVal="['2000','10','31']"
				:current="false" 
				@confirm="onConfirm"
				:disabledAfter="true"
				ref="date" 
				themeColor="#f00"
			></w-picker>
		</view>
		<avatar @upload="doUpload" @closeImg='closeImg' @avtinit="doBefore" quality="0.8" ref="avatar" inner="true"></avatar>
	</view>
</template>

<script>
	import{upload,edit_user,user_integral_remove}from '@/network/sign.js'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	
	//保存头像到本地
	import { saveAvatar } from '@/utils/storage'
	// 头像字符串替换方法
	import { replaceImage } from '@/utils/dealUrl'
	
	import { mapGetters,mapState } from 'vuex'
	export default{
		components:{
			wPicker,
			avatar,
		},
		data(){
			return{
				nickname:'',//昵称
				sextype:0,//男女
				birth:'',//生日
				phone:'',//手机号
				adddress:'',//收货地址
				urls:'',//头像显示的临时路径,
				avatar:'',//传给后台图片路径
				status:0 ,//判断图片传输状态 0:未发送 1：正在上传 2：上传完成
				isModel:true,
				messageInfo:{},
				token:''
			}
		},

		onLoad(){
			// this.messageInfo = this.$store.state.userInfo.userData;
			
			// const obj = {...this.messageInfo}
			// const avatar = this.$store.state.userInfo.localAvatar || obj.avatar
			// console.log(avatar)
			// this.nickname = obj.nickname
			// this.sextype = obj.sex
			// this.urls[1] = avatar
			// this.phone = obj.account
			// this.birth = obj.birthday || ''
			// this.token = this.$store.getters.isToken
			this.urls = this.userData.avatar
			
		},
		
		/*
			未完成
			1.点击保存时可以直接提交
			2.点击保存时不会提示请等待图片上传完成
		*/
		onNavigationBarButtonTap(){
			
			// if(this.status == 1){
			// 	// #ifdef APP-PLUS
			// 	plus.nativeUI.toast('请等待图片上传完成...',{duration:'long'})
			// 	// #endif
			// 	return 
			// }
			uni.showLoading({
				title:'上传中...'
			})
			if(!this.isModel){
				// // #ifdef APP-PLUS
				// plus.nativeUI.toast('您当前正在选择/预览图片中,请点击上传/关闭后重试',{duration:'long'})
				// // #endif
				// return 
				console.log('等待图片层关闭')
				this.$refs.avatar.fUpload((res) => {
					console.log(res)
					this.urls = res
					this.isModel = false
					upload(this.isToken,this.urls)
					.catch(err => {
						uni.hideLoading()
						// #ifdef APP-PLUS
						plus.nativeUI.toast('上传图片失败，请重试')
						// #endif
					})
					.then(res =>{
						console.log('图片上传成功')
						uni.showLoading({
							title:'正在保存信息...'
						})
						console.log(res)
						const avatarUrl = res.url
						let data = {
							avatar:avatarUrl,
							nickname:this.userData.nickname,
							sex:this.userData.sex
						}
						console.log(data)
						edit_user(this.isToken,data).then(res => {
							uni.hideLoading()
							// #ifdef APP-PLUS
							plus.nativeUI.toast('修改成功')
							// #endif
							uni.navigateBack()
						}).catch(err => {
							uni.hideLoading()
							// #ifdef APP-PLUS
							plus.nativeUI.toast('修改失败，请重试')
							// #endif
						})
						
					})
				},1)
			}else{
				// 判断用户是否更换了头像
				const reg = /^http|^https/
				if(reg.test(this.urls)){
					// 用户没有更换头像
					let data = {
						nickname:this.userData.nickname,
						sex:this.userData.sex
					}
					edit_user(this.isToken,data)
					.catch(err => {
						uni.hideLoading()
						// #ifdef APP-PLUS
						plus.nativeUI.toast('修改失败，请重试')
						// #endif
					})
					.then(res => {
						uni.hideLoading()
						// #ifdef APP-PLUS
						plus.nativeUI.toast('修改成功')
						// #endif
						uni.navigateBack()
					})
				}else{
					// 用户更换了头像
					upload(this.isToken,this.urls)
					.catch(err => {
						uni.hideLoading()
						// #ifdef APP-PLUS
						plus.nativeUI.toast('上传图片失败，请重试')
						// #endif
					})
					.then(res =>{
						console.log('图片上传成功')
						uni.showLoading({
							title:'正在保存信息...'
						})
						console.log(res)
						const avatarUrl = res.url
						let data = {
							avatar:avatarUrl,
							nickname:this.userData.nickname,
							sex:this.userData.sex
						}
						console.log(data)
						edit_user(this.isToken,data).then(res => {
							uni.hideLoading()
							// #ifdef APP-PLUS
							plus.nativeUI.toast('修改成功')
							// #endif
							uni.navigateBack()
						}).catch(err => {
							uni.hideLoading()
							// #ifdef APP-PLUS
							plus.nativeUI.toast('修改失败，请重试')
							// #endif
						})
						
					})
				}
			}
			// 发送上传文件的路径
			// console.log(this.urls)
			// let data = {}
			// if(this.avatar){
			// 	data = {
			// 		avatar:this.avatar,
			// 		nickname:this.nickname,
			// 		sex:this.sextype
			// 	}
			// }else{
			// 	data = {
			// 		nickname:this.nickname,
			// 		sex:this.sextype
			// 	}
			// }
			// console.log(data)
			// edit_user(this.token,data).then(res =>{
			// 		// this.nickname = this.messageInfo.nickname
			// 		// this.sextype = this.messageInfo.sex
			// 		// this.urls[1] = this.messageInfo.avatar
			// 		// this.phone = this.messageInfo.account
			// 		// this.birth = this.messageInfo.birthday || ''
			// 		const data2 = this.messageInfo
			// 		data2.nickname = data.nickname
			// 		data2.sex = data.sex
			// 		if(data.avatar){
			// 			const img = replaceImage(data.avatar)
			// 			data2.avatar = img
			// 			// 本地保存图片
			// 			saveAvatar(img).then(res => {
			// 				// 存入vuex中
			// 				this.$store.commit('setLocalAvatar',res)
			// 				// 把信息储存到缓存里
			// 				uni.setStorageSync('Message_key',data2)
			// 				// 个人信息存储vuex
			// 				this.$store.commit('setUserData',data2)
			// 				uni.hideLoading()
			// 				// #ifdef APP-PLUS
			// 				plus.nativeUI.toast('保存成功',{duration:'long'})
			// 				// #endif
			// 				uni.navigateBack()
			// 			})
			// 		}else{
			// 			// 把信息储存到缓存里
			// 			uni.setStorageSync('Message_key',data2)
			// 			// 个人信息存储vuex
			// 			this.$store.commit('setUserData',data2)
			// 			uni.hideLoading()
			// 			// #ifdef APP-PLUS
			// 			plus.nativeUI.toast('保存成功',{duration:'long'})
			// 			// #endif
			// 			uni.navigateBack()
			// 		}
					
					
					

					
			// })
		},
		computed:{
			...mapGetters(['isToken']),
			...mapState(['userData']),
		},
		methods:{
			//男
			sexnanClick(){
				this.userData.sex = 1
			},
			imgLoag(){
				console.log('图片加载完成')
			},
			//女
			sexnvClick(){
				this.userData.sex = 2
			},
			//生日选择开关
			shopTypeClick(){
				this.$refs.date.show();
			},
			//生日选择
			onConfirm(val){
				console.log(val.result)
				this.birth = val.result
			},
			doBefore() {
				this.isModel = false
			},
			clk(index) {
				this.$refs.avatar.fChooseImg(index,{
					selWidth: '700upx', selHeight: '700upx', 
					expWidth: '350upx', expHeight: '350upx',
					inner: "true"
				});
			},
			closeImg(){
				this.isModel = true
			},
			doUpload(rsp) {
				console.log(rsp);
				let data = rsp.path
				this.urls = data
				this.isModel = true
				// upload(this.isToken,data,true).then(res =>{
				// 	console.log(res)
				// 	this.urls = data
				// 	this.isModel = true
				// 	uni.hideLoading()
				// 	this.status = 2
				// }).catch(err => {
				// 	uni.showToast({
				// 		title:'上传图片失败',
				// 		icon:'none'
				// 	})
				// })
			},
		}
	}
</script>

<style>
	.mydata-title{
		height: 230upx;
	}
	.mydata-title image{
		height: 140upx;
		width: 140upx;
	}
	.mydata-title-all{
		height: 100upx;
		border-top: #DCDCDC 1px solid;
	}
	.mydata-title-all:nth-child(1){
		border-top: none;
	}
</style>
