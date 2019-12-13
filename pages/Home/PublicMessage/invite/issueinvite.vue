<template>
	<view>
		<view class="bg-white">
			<view class="margin-lr">
				<view class="flex align-center issue-all-heigth">
					<view class="flex-sub text-bold text-three">发布类型</view>
					<view class="flex align-center flex-treble">
						<view @tap="leftClick" class="flex align-center">
							<view :class="[type == 0 ?'text-red-my cuIcon-radiobox':'text-gray cuIcon-round']" style="font-size: 40upx;" class="lg margin-right-xs"></view>
							<view>企业招聘</view>
						</view>
						<view @tap="rightClick" class="flex align-center margin-left-sm">
							<view :class="[type == 1 ?'text-red-my cuIcon-radiobox':'text-gray cuIcon-round']" style="font-size: 40upx;" class="lg margin-right-xs"></view>
							<view>我要求职</view>
						</view>
					</view>
				</view>
				<!-- 企业招聘 -->
				<view v-if="type == 0">
					<view class="flex align-center issue-all-heigth">
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
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">联系电话</view>
						<input class="flex-treble" placeholder="输入招聘者电话" v-model="phone" 	confirm-type="done" />
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">联系人姓名</view>
						<input class="flex-treble" placeholder="联系人姓名" v-model="name" />
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">公司名称</view>
						<input class="flex-treble" placeholder="列:郑州瑞青人力资源有限公司" v-model="c_name" 	confirm-type="done" />
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">招聘岗位</view>
						<input class="flex-treble" placeholder="列:程序员/前段工程师/ui设计" v-model="c_job" 	confirm-type="done" />
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">地址信息</view>
						<input @click="open_address" @focus="open_address" class="flex-treble" placeholder="公司地址" v-model="address" 	confirm-type="done" />
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">办公地点</view>
						<input class="flex-treble" placeholder="具体工作地址" v-model="xAddress" 	confirm-type="done" />
					</view>
					<view class="flex align-center issue-all-heigth">
						<view class="flex-sub text-bold text-three">标题</view>
						<input class="flex-treble" placeholder="输入招聘者电话" v-model="title" 	confirm-type="done" />
					</view>
					<view class="flex align-start solid-top padding-top-sm">
						<view class="flex-sub text-bold text-three">内容</view>
						<textarea class="flex-treble text-three" maxlength="-1" v-model="content" placeholder="请输入详细内容"></textarea>
					</view>
					
				</view>
				
				<!-- 我要求职 -->
				<view v-else>
					<view class="flex align-center solid-top issue-all-heigth">
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
						<view  class="flex-treble">{{bResult}}</view>
					</view>
					<view class="flex align-center solid-top issue-all-heigth">
						<view class="flex-sub text-bold text-three">联系电话</view>
						<input class="flex-treble" placeholder="输入手机号码" v-model.number="wordphone" confirm-type="done" />
					</view>
					<view class="flex align-center solid-top issue-all-heigth">
						<view class="flex-sub text-bold text-three">工作类别</view>
						<input class="flex-treble" placeholder="请输入您的工作类别" v-model="job" confirm-type="done" />
					</view>
					<view class="flex align-center solid-top issue-all-heigth">
						<view class="flex-sub text-bold text-three">工作地点</view>
						<input class="flex-treble" placeholder="请输入您期望的工作地点" v-model="xAddress" confirm-type="done" />
					</view>
					<view class="flex align-start solid-top padding-top-sm">
						<view class="flex-sub text-bold text-three">个人简介</view>
						<textarea class="flex-treble text-three" maxlength="-1" v-model="profile" placeholder="请输入您的个人简介"></textarea>
					</view>
				</view>
			</view>
		</view>
		<button class="issueinvite-button" @click="commit">发布</button>
		<w-picker
			mode="date" 
			startYear="1960" 
			endYear="2019"
			:defaultVal="['2018','10','31']"
			:current="false" 
			@confirm="onConfirm"
			:disabledAfter="true"
			ref="date" 
			themeColor="#f00"
		></w-picker>
		
		
		<w-picker 
		    mode="region"
		    :defaultVal="['浙江省','杭州市','滨江区']"
		    :areaCode="['33','3301','330108']"
		    @confirm="onConfirm2" 
		    ref="region" 
		    themeColor="#f00">
		</w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	
	// 导入网络模块
	import { zp_push,qz_push  } from '@/network/invite'
	export default{
		components:{
			wPicker
		},
		data(){
			return{
				type:0,//0为企业招聘  1求职信息
				distype:true ,//true固定薪资  false 面议
				phone:'',//手机号码
				c_name:'',//公司名称
				address:'',//地址信息
				title:'',//标题
				content:'',//内容
				minMoney:'',//最低薪资
				maxMoney:'',//最大薪资
				wordname:'',//求职者姓名
				sex:0,//性别 0：男    1：女
				wordphone:'',//求职者联系方式
				bResult:'请选择',
				job:''  ,//求职工作类别
				c_job:'', //招聘职位
				name:'' ,//联系人姓名
				xAddress:'',//详细地址
				profile:'',
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
				this.bResult = val.result
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				// switch(this.mode){
				// 	case "date":
				// 		break;
				// }
			},
			//点击企业招聘
			leftClick(){
				this.type = 0
			},
			//求职
			rightClick(){
				this.type = 1
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
			// 地址选择开关
			open_address(){
				this.$refs.region.show();
			},
			// 地址选择
			onConfirm2(val){
				this.address = val.result
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				// switch(this.mode){
				// 	case "date":
				// 		break;
				// }
			},
			// 点击发布
			commit(){
				// 求职发布
				if(this.type == 1){
					const obj = {
						phone:this.wordphone,
						name:this.wordname,
						job:this.job,
						birth:this.bResult,
						sex:this.sex,
						content:this.profile,
						xxaddress:this.xAddress
					}
					console.log(obj)
					qz_push(obj,this.$store.getters.isToken).then(res => {
						if(res.data.code == 200){
							// uni.redirectTo({
							// 	url:'success'
							// })
							// #ifdef APP-PLUS
							plus.nativeUI.toast("发布成功");
							// #endif
							const index = this.type*1 + 1*1
							uni.redirectTo({
								url: `invite?index?index=${index}`
							});
						}else{
							// #ifdef APP-PLUS
							plus.nativeUI.toast(res.data.msg);
							// #endif
						}
					})
				}else{
					const obj = {
						see:this.distype ? 0 : 1,
						min:this.minMoney,
						max:this.maxMoney,
						phone:this.phone,
						address:this.address,
						company:this.c_name,
						content:this.content,
						name:this.name,
						title:this.title,
						job:this.c_job,
						xxaddress:this.xAddress,
					}
					zp_push(obj,this.$store.getters.isToken).then(res => {
						if(res.data.code == 200){
							// uni.redirectTo({
							// 	url:'success'
							// })
							// #ifdef APP-PLUS
							plus.nativeUI.toast("发布成功");
							// #endif
							const index = this.type*1 + 1*1
							uni.redirectTo({
								url: `invite?index?index=${index}`
							});
						}else{
							// #ifdef APP-PLUS
							plus.nativeUI.toast(res.data.msg);
							// #endif
						}
					})
				}
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
		position: fixed;
		bottom: 25upx;
		left: 35upx;
		right: 35upx;
		height:88upx;
		color: #FFFFFF;
		font-size: 36upx;
		background:rgba(205,50,51,1);
		border-radius:10upx;
	}
	.profile{
		padding-top: 15upx;
		border-top: #E1E1E1 1px solid;;
	}
</style>
