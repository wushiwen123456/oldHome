<template>
	<view>
		<view class="flex align-center bg-white justify-center mydata-title">
			<image @tap="clk(1)" :src="urls[1]" :lazy-load="urls[0]"></image>
		</view>
		<view class="margin-top bg-white">
			<view class="flex align-center justify-between margin-lr mydata-title-all">
				<view class="flex-twice text-wuer text-lg">昵称</view>
				<view class="flex align-center justify-between flex-six">
					<input class="text-jiujiujiu text-df text-width" placeholder="输入昵称" v-model="nickname"  confirm-type="done"/>
				
				</view>
			</view>
			<view class="flex align-center justify-between margin-lr mydata-title-all">
				<view class="flex-twice text-wuer text-lg">性别</view>
				<view class="flex align-center flex-six">
					<view @tap="sexnanClick" style="font-size: 40upx;" :class="[sextype == 1?'text-red-my cuIcon-radiobox':'text-gray cuIcon-round']" class="lg margin-right-sm"></view>
					<view  @tap="sexnanClick">男</view>
					<view @tap="sexnvClick"  style="font-size: 40upx;" :class="[sextype == 2?'text-red-my cuIcon-radiobox':'text-gray cuIcon-round']" class="lg margin-right-sm margin-left"></view>
					<view  @tap="sexnvClick">女</view>
				</view>
			</view>
			<view @tap="shopTypeClick" class="flex align-center justify-between margin-lr mydata-title-all">
				<view class="flex-twice text-wuer text-lg">生日</view>
				<view class="flex align-center justify-between flex-six">
					<input class="text-jiujiujiu text-df" disabled="true" placeholder="选择出生日期" v-model="birth"  confirm-type="done"/>
					<view class="lg text-gray cuIcon-right"></view>
				</view>
			</view>
			<view class="flex align-center justify-between margin-lr mydata-title-all">
				<view class="flex-twice text-wuer text-lg">手机号</view>
				<view class="flex align-center justify-between flex-six">
					<input class="text-jiujiujiu text-df text-width" :disabled="true" placeholder="输入手机号" type="number" v-model="phone"  confirm-type="done"/>
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
				urls:["../../../static/bottomh.png","../../../static/bottomh.png"],//头像显示的临时路径,
				avatar:'',//传给后台图片路径
				status:0 ,//判断图片传输状态 0:未发送 1：正在上传 2：上传完成
				isModel:true,
				messageInfo:{}
			}
		},
		onLoad(){
			this.messageInfo = uni.getStorageSync('Message_key');
			const obj = this.messageInfo
			this.nickname = obj.nickname
			this.sextype = obj.sex
			this.urls[1] = obj.avatar
			this.phone = obj.account
			this.birth = obj.birthday || ''
		},
		onNavigationBarButtonTap(){
			if(this.status == 1){
				// #ifdef APP-PLUS
				plus.nativeUI.toast('请等待图片上传完成...',{duration:'long'})
				// #endif
				return 
			}
			if(!this.isModel){
				// #ifdef APP-PLUS
				plus.nativeUI.toast('您当前正在选择/预览图片中,请点击上传/关闭后重试',{duration:'long'})
				// #endif
				return 
			}
			let data = {}
			if(this.avatar){
				data = {
					avatar:this.avatar,
					nickname:this.nickname,
					sex:this.sextype,
					birthday:this.birth
				}
			}else{
				data = {
					nickname:this.nickname,
					sex:this.sextype,
					birthday:this.birth
				}
			}
			uni.showLoading({
				title:'保存中...'
			})
			edit_user(data).then(res =>{
					// this.nickname = this.messageInfo.nickname
					// this.sextype = this.messageInfo.sex
					// this.urls[1] = this.messageInfo.avatar
					// this.phone = this.messageInfo.account
					// this.birth = this.messageInfo.birthday || ''
					const obj = this.messageInfo
					obj.nickname = this.nickname
					obj.sex = this.sextype
					obj.avatar = this.urls[1]
					obj.account = this.phone
					obj.birthday = this.birth ||''
					// 把信息储存到缓存里
					uni.setStorageSync('Message_key',obj)
					uni.hideLoading()
					// #ifdef APP-PLUS
					plus.nativeUI.toast('保存成功',{duration:'long'})
					// #endif
					uni.navigateBack()
			})
		},
		methods:{
			//男
			sexnanClick(){
				this.sextype = 1
			},
			imgLoag(){
				console.log('图片加载完成')
			},
			//女
			sexnvClick(){
				this.sextype = 2
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
					selWidth: '350upx', selHeight: '350upx', 
					expWidth: '260upx', expHeight: '260upx',
					inner: "true"
				});
			},
			closeImg(){
				this.isModel = true
			},
			doUpload(rsp) {
				console.log(rsp);
				this.$set(this.urls, rsp.index, rsp.path);
				this.status = 1
				uni.showLoading({title:'上传中...'})
				let data = rsp.path
				upload(data).then(res =>{
					this.avatar = res.url
					this.isModel = true
					uni.hideLoading()
					this.status = 2
				})
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
