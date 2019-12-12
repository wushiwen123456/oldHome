<template>
	<view>
		<view class="bg-white">
			<view class="margin-lr">
				<view class="flex align-center issue-all-heigth">
					<view class="flex-sub text-bold text-three">发布类型</view>
					<view class="flex align-center flex-treble">
						<view @tap="leftClick" class="flex align-center">
							<view :class="[type == 0 ?'text-red-my cuIcon-radiobox':'text-gray cuIcon-round']" style="font-size: 40upx;" class="lg margin-right-xs"></view>
							<view>供应</view>
						</view>
						<view @tap="rightClick" class="flex align-center margin-left-sm">
							<view :class="[type == 1 ?'text-red-my cuIcon-radiobox':'text-gray cuIcon-round']" style="font-size: 40upx;" class="lg margin-right-xs"></view>
							<view>发需求</view>
						</view>
					</view>
				</view>
				<!-- 供应 页面未定，内容暂时隐藏-->
				<view v-if="type == 0">
					<!-- <view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">月薪</view>
						<view class="flex align-center justify-between flex-treble">
							<view v-if="distype" class="flex align-center">
								<view class=" flex align-center justify-center padding-left-sm distype-input">
									<input confirm-type="done" type="number" v-model="minMoney" />
								</view>
								<view class="margin-lr-xs">—</view>
								<view class="flex align-center justify-center padding-left-sm distype-input">
									<input confirm-type="done" type="number" v-model="maxMoney"/>
								</view>
								<view class="margin-left-sm">元</view>
							</view>
							<view v-else class="text-jiujiujiu text-df">面议</view>
							<view @tap="discussClick" class="flex align-center">
								<view :class="[distype ?'text-gray cuIcon-roundcheck':'text-red-my cuIcon-roundcheckfill']" style="font-size: 40upx;" class="lg margin-right-sm"></view>
								<view>面议</view>
							</view>
						</view>
					</view> -->
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">商户名称</view>
						<input class="flex-treble" placeholder="输入商户名称" v-model="name" 	confirm-type="done" />
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">联系电话  </view>
						<input class="flex-treble" placeholder="输入招聘者电话" v-model="phone" 	confirm-type="done" />
					</view>
					<!-- <view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">地址信息</view>
						<input class="flex-treble" placeholder="具体工作地址" v-model="address" 	confirm-type="done" />
					</view> -->
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">标题</view>
						<input class="flex-treble" placeholder="请输入标题" v-model="title" 	confirm-type="done" />
					</view>
					<view class="flex align-start solid-top padding-top-sm">
						<view class="flex-sub text-bold text-three">内容</view>
						<textarea class="flex-treble text-three" maxlength="-1" v-model="content" placeholder="请输入详细内容"></textarea>
					</view>
				</view>
				
				<!-- 需求页面未定，内容暂时隐藏-->
				<view v-else>
					<!-- <view class="flex align-center solid-top issue-all-heigth">
						<view class="flex-sub text-bold text-three">姓名</view>
						<input class="flex-treble" placeholder="输入姓名" v-model="wordname" 	confirm-type="done" />
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">性别</view>
						<view class="flex align-center text-bold flex-treble">
							<view @tap="sexnanClick" :class="[sex == 0 ?'text-blue':'text-gray']"  class="flex align-center margin-right ">
								<view style="font-size: 40upx;" class="lg cuIcon-male margin-right-xs"></view>
								<view>男</view>
							</view>
							<view  @tap="sexnvClick" :class="[sex == 1 ?'text-pink':'text-gray']" class="flex align-center">
								<view style="font-size: 40upx;" class="lg cuIcon-female margin-right-xs"></view>
								<view>女</view>
							</view>
						</view>
					</view>
					<view @tap="shopTypeClick" class="flex align-center solid-top issue-all-heigth">
						<view class="flex-sub text-bold text-three">出生年月</view>
						<view  class="flex-treble">{{birthbay}}</view>
					</view>
					<view class="flex align-center solid-top issue-all-heigth">
						<view class="flex-sub text-bold text-three">联系电话</view>
						<input class="flex-treble" placeholder="输入手机号码" v-model="wordphone" confirm-type="done" />
					</view> -->
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">商户名称</view>
						<input class="flex-treble" placeholder="输入商户名称" v-model="name" 	confirm-type="done" />
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">联系电话  </view>
						<input class="flex-treble" placeholder="输入招聘者电话" v-model="phone" 	confirm-type="done" />
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">标题</view>
						<input class="flex-treble" placeholder="请输入标题" v-model="title" 	confirm-type="done" />
					</view>
					<view class="flex align-start solid-top padding-top-sm">
						<view class="flex-sub text-bold text-three">内容</view>
						<textarea class="flex-treble text-three" maxlength="-1" v-model="content" placeholder="请输入详细内容"></textarea>
					</view>
				</view>
			</view>
		</view>
		<button class="issueinvite-button" @click="publicPush">发布</button>
		<w-picker
			mode="date" 
			startYear="2017" 
			endYear="2030"
			:defaultVal="['2018','10','31']"
			:current="false" 
			@confirm="onConfirm"
			:disabledAfter="true"
			ref="date" 
			themeColor="#f00"
		></w-picker>
		
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	
	import { pushPublish } from '@/network/invite'
	export default{
		components:{
			wPicker
		},
		data(){
			return{
				type:0,//0为供应  1发需求
				phone:'',//手机号码
				name:'',//公司名称
				title:'',//标题
				content:'',//内容
			}
		},
		methods:{
			//生日选择开关
			shopTypeClick(){
				this.$refs.date.show();
			},
			//生日选择
			onConfirm(val){
				console.log(val);
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				// switch(this.mode){
				// 	case "date":
				// 		break;
				// }
				console.log(val)
			},
			//点击企业招聘
			leftClick(){
				this.type = 0
				this.phone = ''
				this.name = ''
				this.title = ''
				this.content = ''
			},
			//求职
			rightClick(){
				this.type = 1
				this.phone = ''
				this.name = ''
				this.title = ''
				this.content = ''
			},
			//是否面议
			discussClick(){
				this.distype = !this.distype
			},
			//点击女
			sexnvClick(){
				this.sex =  1
			},
			//点击男
			sexnanClick(){
				this.sex =  0
			},
			publicPush(){
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					uni.showToast({
						title:'手机号格式有误',
						icon:'none'
					})
					return
				}
				const obj = {
					cate:this.type*1+1,
					phone:this.phone,
					name:this.name,
					title:this.title
				}
				pushPublish(obj,this.$store.getters.isToken).then(res => {
					if(res.data.code == 200){
						uni.redirectTo({
							url:"../invite/success"
						})
					}
				})
			}
		}
	}
</script>

<style>
	.issue-all-heigth{
		height: 100upx;
		border-top: #E1E1E1 1px solid;
	}
	.issue-all-heigth input{
		font-size: 28upx;
	}
	.issue-all-heigth:nth-child(1){
		border: none;
	}
	.distype-input{
		background:#E0E0E0;
		width:120upx;
		height:64upx;
		border-radius: 8upx;
	}
	.issueinvite-button{
		margin:80upx 30upx;
		height:88upx;
		color: #FFFFFF;
		font-size: 36upx;
		background:rgba(205,50,51,1);
		border-radius:10upx;
	}
</style>
