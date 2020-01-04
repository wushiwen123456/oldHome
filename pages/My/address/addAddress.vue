<template>
	<view>
		<view class="addAddress">
			<view class="cu-form-group">
					<view class="addAddress-left-txt">收货人</view>
					<input type="text" v-model="real_name"  placeholder="姓名" />
			</view>
			<view class="cu-form-group">
				<view class="title">联系手机</view>				
				<input type="digit" v-model="phone" placeholder="手机号" />
			</view>
			<view class="cu-form-group">
					<view class="title">邮编</view>
					<input type="digit" v-model="post_code" placeholder="邮编" />
			</view>
			<view @tap="openonConfirmClick" class="cu-form-group">
				<view class="title">地址信息</view>
				<input type="text" v-model="resultInfo" disabled="true" placeholder="请选择" />
			</view>
			<view class="cu-form-group align-start">
				<view class="title">详细地址</view>
				<textarea maxlength="-1" v-model="detail"  placeholder="填写收货地址" ></textarea>
			</view>

			<view class="cu-form-group">
				<view class="title">是否设置为默认收货地址</view>
				<switch @change="chooseDefault" :class="is_default?'checked':''" :checked="is_default?true:false"></switch>
			</view>
			
		</view>
		<!-- 三级联动 -->
		<w-picker 
			mode="region"
			:defaultVal="['浙江省','杭州市','滨江区']"
			:areaCode="['33','3301','330108']"
			:linkList="linkList"
			:hideArea="false"
			@confirm="onConfirm" 
			ref="picker" 
			themeColor="#f00">
		</w-picker>
		<x-modal  v-model="show1" title='提示' text='请前往登录' @confirm="goLogin" />
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	
	// 添加地址接口:
	import {addAddress} from '@/network/getProfileData'
	
	// 导入token：
	import { mapGetters } from 'vuex'
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				value: [0, 0, 0],
				iconHidden: true,
				showPickerStatus: false,
				searchKey: "",
				real_name:'', //收货人姓名
				is_default:true,//1默认，0不默认
				phone:'',//收货人电话
				detail:'',//收货人详细地址
				resultInfo:'',//三级联动
				id:'',//地址id，默认为空
				post_code:'' ,//邮编
				addressArr:[],//发送的地址格式
				linkList:[],//三级联动数据
				show1:false
			}
		},
		onNavigationBarButtonTap(e){
			this.saveClick()
		},
		onLoad(option){
			if(Object.keys(this.$store.state.address).length){
				const obj = this.$store.state.address
				this.detail = obj.detail
				this.phone = obj.phone
				this.id = obj.id
				this.is_default = obj.is_default
				this.real_name = obj.real_name
			}
			const token = this.$store.getters.isToken
			if(token){
				this.token = token
			}else{
				this.show1 = true
			}
		},
		methods: {
			// 设置用户默认地址
			chooseDefault(e){
				this.is_default = e.detail.value
			},
			//打开三级联动
			openonConfirmClick(){
				this.$refs.picker.show();
			},
			//三级联动
			onConfirm(val){
				this.addressArr = val.checkArr;
				this.resultInfo = val.result;
				console.log(this.addressArr)
			},
			// 保存按钮
			saveClick(){
				if(!this.real_name){
					uni.showToast({
						title:'请输入收货人姓名',
						icon:'none'
					})
				}else if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
				}else if (!this.detail){
					uni.showToast({
						title:'请输入详细地址',
						icon:'none'
					})
				}else if(!this.post_code){
					uni.showToast({
						title:'请输入邮编',
						icon:'none'
					})
				}else if(!this.resultInfo){
					uni.showToast({
						title:'请输入地址',
						icon:'none'
					})
				}
				else{
					let data = {
						is_default:this.is_default ? 1 : 0,
						real_name:this.real_name,
						phone:this.phone,
						detail:this.detail,
						post_code:this.post_code,
						id:this.id,
						address:this.addressArr,
					}
					this.addAddress(data)
				}
			},
			addAddress(data){
				addAddress(data,this.isToken).then(res => {
					if(res.data.code == 200){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('设置成功',{duration:'long'})
						// #endif
						uni.navigateBack()
					}else{
						// #ifdef APP-PLUS
						plus.nativeUI.toast(res.data.msg,{duration:'long'})
						// #endif
					}
				})
				
			},
			goLogin(){
				uni.navigateTo({
					url:'../../login/login'
				})
			}
		},
		computed:{
			...mapGetters(['isToken'])
		}
	}
</script>

<style>
	
	.addAddress{
		padding: 0 26upx;
		background: #FFFFFF;
	}
	.addAddress-all{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30upx;
		height: 96upx;
		border-bottom: #f3f3f3 2upx solid;
	}
	.addAddress-alltexts{
		margin-top: 20upx;
	}
	.addAddress-alltext{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		font-size: 30upx;
		border-bottom: #f3f3f3 2upx solid;
	}
	.addAddress-alltext-text{
		width: 180upx;
	}
	.addAddress-left{
		color: #333333;
		font-size: 30upx;
		display: flex;
		align-items: center;
	}
	.addAddress-left input{
		margin-left: 44upx;
		font-size: 28upx;
	}
	.addAddress-left-txt{
		width: 120upx;
	}
	.address-info{
		height: 110upx;
	}
</style>
