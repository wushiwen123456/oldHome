<template>
	<view>
		<view class="addAddress">
			<view class="addAddress-all">
				<view class="addAddress-left">
					<view class="addAddress-left-txt">收货人</view>
					<input type="text" v-model="real_name"  placeholder="姓名" />
				</view>
				<view></view>
			</view>
			<view class="addAddress-all">
				<view class="addAddress-left">
					<view>联系手机</view>
					<input type="text" v-model="phone" placeholder="手机号" />
				</view>
				<view></view>
			</view>
			<view class="addAddress-all">
				<view class="addAddress-left">
					<view>邮编</view>
					<input type="text" v-model="post_code" placeholder="邮编" />
				</view>
				<view></view>
			</view>
			<view @tap="openonConfirmClick" class="addAddress-all">
				<view class="addAddress-left">
					<view>地址信息</view>
					<input type="text" v-model="resultInfo" disabled="true" placeholder="请选择" />
				</view>
				<view></view>
			</view>
			<view class="addAddress-alltexts">
				<view class="addAddress-alltext">
					<view class="addAddress-alltext-text">详细地址</view>
					<textarea class="text-df" v-model="detail"  placeholder="填写收货地址" ></textarea>
				</view>
				<view></view>
			</view>
			
		</view>
		<!-- 三级联动 -->
		<w-picker mode="linkage" :level="3" :value="['11','1101','110101']" :defaultVal="['北京市','市辖区','东城区']" @confirm="onConfirm" ref="picker" :linkList="linkList" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	
	// 添加地址接口:
	import {addAddress} from '@/network/getProfileData'
	
	// 导入地区文件
	import area from '@/components/w-picker/city-data/area' //区
	import city from '@/components/w-picker/city-data/city'  //市
	import province from '@/components/w-picker/city-data/province' //省
	
	// 导入工具类
	import { getAddress } from '../../../utils/dealUrl.js'
	
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
				is_default:1,//1默认，0不默认
				phone:'',//收货人电话
				detail:'',//收货人详细地址
				resultInfo:'',//三级联动
				id:'',//地址id，默认为空
				post_code:'' ,//邮编
				addressArr:[],//发送的地址格式
				linkList:[]
			}
		},
		onNavigationBarButtonTap(){
			this.saveClick()
		},
		onBackPress() {
			
		},
		onLoad(){
			this.linkList = getAddress(area,city,province)
		},
		methods: {
			//打开三级联动
			openonConfirmClick(){
				this.$refs.picker.show();
			},
			//三级联动
			onConfirm(val){
				this.addressArr = val.checkArr;
				this.resultInfo = val.result 
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
				}
				else{

					let data = {
						is_default:this.is_default,
						real_name:this.real_name,
						phone:this.phone,
						detail:this.detail,
						post_code:this.post_code,
						id:this.id,
						address:this.addressArr
					}
					this.addAddress(data)
				}
			},
			addAddress(data){
				uni.showModal({
					title:'是否设置为默认收货地址',
					cancelColor:"#333333",
					confirmColor:"#333333",
					confirmText:"立即设置",
					cancelText:'暂不设置',
					success:(res)=> {
						if(res.confirm){
							data.is_default = 1
							
						}else{
							data.is_default = 0
						}
						if(this.isToken){
							addAddress(data,this.isToken).then(res => {
								if(res.data.code == 200){
									uni.showToast({
										title:'保存成功',
										icon:"none"
									})
									
								}else{
									uni.showToast({
										title:'未知错误',
										icon:"none"
									})
								}
							})
						}else{
							uni.navigateTo({
								url:"../../login/login"
							})
						}
					}
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
</style>
