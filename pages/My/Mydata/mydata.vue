<template>
	<view>
		<view class="flex align-center bg-white justify-center mydata-title">
			<image @tap="clk(1)" src="../../../static/bottomh.png" :src="urls[1]"></image>
		</view>
		<view class="margin-top bg-white">
			<view class="flex align-center justify-between margin-lr mydata-title-all">
				<view class="flex-twice text-wuer text-lg">昵称</view>
				<view class="flex align-center justify-between flex-six">
					<input class="text-jiujiujiu text-df" placeholder="输入昵称" v-model="nickname"  confirm-type="done"/>
					<view class="lg text-gray cuIcon-right"></view>
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
					<input class="text-jiujiujiu text-df" :disabled="true" placeholder="输入手机号" type="number" v-model="phone"  confirm-type="done"/>
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
		<avatar @upload="doUpload" @avtinit="doBefore" quality="0.8" ref="avatar"></avatar>
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
			}
		},
		onLoad(){
			var messageInfo = uni.getStorageSync('Message_key');
			this.nickname = messageInfo.nickname
			this.sextype = messageInfo.sex
			this.urls[1] = messageInfo.avatar
			this.phone = messageInfo.account
			this.birth = messageInfo.birthday
		},
		onNavigationBarButtonTap(){
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
			edit_user(data).then(res =>{
				uni.showToast({
					title:'修改成功',
					icon:'none'
				})
				setTimeout(function(){
					uni.switchTab({
						url:'../my'
					})
				},1500)
			})
		},
		methods:{
			//男
			sexnanClick(){
				this.sextype = 1
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
				console.log('doBefore');
			},
			clk(index) {
				this.$refs.avatar.fChooseImg(index,{
					selWidth: '350upx', selHeight: '350upx', 
					expWidth: '260upx', expHeight: '260upx',
					inner: index ? 'true' : 'false'
				});
			},
			doUpload(rsp) {
				console.log(rsp);
				this.$set(this.urls, rsp.index, rsp.path);
				uni.showLoading({title:'上传中'})
				console.log('+++++++++++++++++')
				console.log(rsp.path)
				console.log('+++++++++++++++++')
				let data = rsp.path
				upload(data).then(res =>{
					this.avatar = res.url
					console.log(this.urls[1])
					uni.hideLoading()
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
