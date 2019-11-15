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
			<view @tap="openonConfirmClick" class="addAddress-all">
				<view class="addAddress-left">
					<view>地址信息</view>
					<input type="text" v-model="resultInfo" disabled="true" placeholder="请选择" />
				</view>
				<view></view>
			</view>
			<view class="addAddress-alltexts">
				<view class="addAddress-alltext">
					<view class="addAddress-alltext-text">地址信息</view>
					<textarea class="text-df" v-model="detail"  placeholder="填写收货地址" ></textarea>
				</view>
				<view></view>
			</view>
			
		</view>
		<!-- 三级联动 -->
		<w-picker mode="linkage" :level="3" :value="['10','1012','10122']" :defaultVal="['浙江省','宁波市','海曙区']" @confirm="onConfirm" ref="picker" :linkList="linkList" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
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
				
				linkList:[{
					label:"浙江省",
					value:"10",
					children:[{
						label:"杭州市",
						value:"1010",
						children:[{
							label:"滨江区",
							value:"10101"
						},{
							label:"萧山区",
							value:"10102"
						}]
					},{
						label:"宁波市",
						value:"1012",
						children:[{
							label:"海曙区",
							value:"10121"
						},{
							label:"鄞州区",
							value:"10122"
						}]
					}]
				},{
					label:"广东省",
					value:"20",
					children:[{
						label:"广州市",
						value:"2010",
						children:[{
							label:"广州1区",
							value:"20101"
						},{
							label:"广州2区",
							value:"20102"
						}]
					},{
						label:"深圳市",
						value:"2012",
						children:[{
							label:"深圳1区",
							value:"20121"
						},{
							label:"深圳2区",
							value:"20122"
						}]
					}]
				}]
			}
		},
		onNavigationBarButtonTap(){
			this.saveClick()
		},
		onBackPress() {
			
		},
		onLoad(){
			
		},
		methods: {
			//打开三级联动
			openonConfirmClick(){
				this.$refs.picker.show();
			},
			//三级联动
			onConfirm(val){
				console.log(val);
				this.resultInfo = val.result;
			},
			// 保存按钮
			saveClick(){
				if(!this.real_name){
					uni.showToast({
						title:'请输入收货人姓名',
						icon:'none'
					})
				}else if(!(/^1[345789]\d{9}$/.test(this.phone))){
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
				}else if (!this.detail){
					uni.showToast({
						title:'请输入详细地址',
						icon:'none'
					})
				}else{
					let data = {
						address:this.address,
						is_default:this.is_default,
						real_name:this.real_name,
						phone:this.phone,
						detail:this.detail,
						id:this.id,
						token:this.userMessage.token
					}
					edit_user_address(data)
				}
			},
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
