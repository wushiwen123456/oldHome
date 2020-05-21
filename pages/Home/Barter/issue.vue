<template>
	<view>
		<view class="padding-top-sm">
			<view class="padding-lr-sm bg-white">
				<view class="cu-form-group">
					<view class="title text-black">商品标题</view>
					<input placeholder="请输入商品标题" confirm-type="done" v-model="inputInfo.title" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title text-black">置换物品(选填)</view>
					<input placeholder="请输入想要置换的物品" confirm-type="done" v-model="inputInfo.product" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title text-black">商品分类</view>
					<input @click="fenleiClick" placeholder="请选择商品分类" disabled="true" v-model="inputInfo.category.label" confirm-type="done" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title text-black">换货价(选填)</view>
					<input placeholder="请填写换货价格" confirm-type="done" type="digit" v-model="inputInfo.price" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title text-black">商品主图</view>
					<input placeholder="（最多上传5张）" disabled="true" confirm-type="done" name="input">{{imgList.length}}/5</input>
				</view>
				<view class="cu-form-group padding-top">
					<view class="grid col-5 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="item" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<5">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>
			<view class="padding-lr-sm margin-top-sm bg-white padding-bottom-sm">
				<view class="cu-form-group">
					<view class="text-center text-black text-bold" style="width: 100%;">商品规格(选填)</view>
				</view>
				<view v-for="(item,index) in guigeList" :key="index" 
						class="guige-box margin-bottom" 
						style="padding: 15upx; box-sizing: border-box;"
						:class="{'animation-slide-bottom':item.isShowAnimate}">
					<view class="cu-form-group">
						<view class="title text-black">规格名</view>
						<input placeholder="颜色、大小、尺寸" confirm-type="done" v-model="item.name" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title text-black" style="width: 120upx;">规格</view>
						<input placeholder="请填写商品数量" confirm-type="done" v-model="item.size" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title text-black">换货价</view>
						<input placeholder="请填写换货价格" type="digit" confirm-type="done" v-model="item.price" name="input"></input>
					</view>
					<text v-if="item.isShowAnimate" @click="removeGuide(item,index)" class="lg text-gray cuIcon-roundclose remove-item"></text>
				</view>
				<view v-if="guigeList.length<3" @click="addGuige" class="cu-form-group add-guige">
					<text class="lg text-gray cuIcon-roundadd"></text>
				</view>
			</view>
			<view class="padding-lr-sm margin-top-sm bg-white">
				<view class="cu-form-group">
					<view class="title text-black">姓名</view>
					<input placeholder="请填写您的姓名" confirm-type="done" v-model="inputInfo.name" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title text-black">电话</view>
					<input placeholder="请填写您的电话" confirm-type="done" v-model="inputInfo.phone" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title text-black">地址</view>
					<input @click="addressClick" placeholder="请选择您的地址" disabled="true" v-model="inputInfo.address" confirm-type="done" name="input"></input>
				</view>
			</view>
			<view class="padding-lr-sm margin-top-sm bg-white">
				<view @tap="issueClick" class="cu-form-group">
					<view class="title text-black text-bold">商品详情(选填)</view>
					<input placeholder="编辑商品详情" disabled confirm-type="done" v-model="shopDetail" name="input"></input>
					<!-- <view @tap="insertImg" class="flex align-center text-red text-three text-bold">
						<view class="lg cuIcon-pic margin-right-xs"></view>
						<view >添加图片</view>
					</view> -->
				</view>
				<!-- <view class="content" :style="{height:pageHeight + 'px'}"> -->
					<!-- <view class="edit">
						<block  v-for="(item,index) in editItems" :key="index">
							<textarea  
								:style="{height:pageHeight + 'px'}"
								v-if="item.type=='textarea'" 
								:placeholder="editItems.length == 1 ? '简单描述一下商品~' : ''" 
								maxlength="-1" 
								:cursor-spacing="spacing" 
								:data-index="index" 
								@input="inputIng" 
								@linechange="linechage"
								:focus="index + 1 == editItems.length && index != 0 ? true : false" 
								:value="item.value"
							></textarea>
							<view class="img" v-if="item.type=='img'" >
								<image :src="item.value" mode="widthFix"/>
								<image src="../../../static/shanchu.png" class="del" :data-index="index" mode="widthFix" @click="delImg"/>
							</view>
						</block>
					</view> -->
				<!-- </view> -->
			</view>
		</view>
		<w-picker
		    mode="selector" 
		    :defaultVal="['女']" 
		    @confirm="onConfirm1" 
		    ref="selector" 
		    themeColor="#f00"
		    :selectList="selectList"
		></w-picker>
		<w-picker 
		    mode="region"
		    :defaultVal="['浙江省','杭州市','滨江区']"
		    :areaCode="['33','3301','330108']"
		    :hideArea="true"
		    @confirm="onConfirm2" 
		    ref="region" 
		    themeColor="#f00">
		</w-picker>
	</view>
</template>

<script>
	import wPicker from '@/components/w-picker/w-picker.vue'
	import { upload } from '@/network/sign'
	import { yi_publish } from '@/network/yiwu'
	
	export default{
		components:{
			wPicker
		},
		data(){
			return{
				spacing:100,//键盘与text的距离
				focus: false,
				imgList: [],//上传轮播图
				updataImgList:[],
				selectList:[
					{
						label:'规格1',
						value:1
					},
					{
						label:'规格2',
						value:0
					},
					{
						label:'规格3',
						value:0
					},
					{
						label:'规格4',
						value:0
					},
					{
						label:'规格5',
						value:0
					},
					{
						label:'规格6',
						value:0
					},
					{
						label:'规格7',
						value:0
					},
					{
						label:'规格8',
						value:0
					},
					{
						label:'规格9',
						value:0
					}
				],//选择列表
				editItems:[
					{
						type:'textarea',
						value:''
					}
				],
				pageHeight:26,
				guigeList:[
					{
						name:'',
						size:'',
						price:'',
						isShowAnimate:false
					}
				],
				inputInfo:{
					title:'',
					product:'',
					category:{},
					price:'',
					name:'',
					phone:'',
					address:''
				},
				shopDetail:'',
				address2:[],
				token:''
			}
		}, 
		onLoad(e) {
			if(e.list){
				this.doChoose1List(e.list)
			}else{
				// #ifdef APP-PLUS
				plus.nativeUI.toast('页面出现错误，请重试')
				// #endif
				uni.navigateBack()
			}
			this.token = this.$store.getters.isToken
		},
		onShow() {
			// 获取富文本内容信息
			const html = this.$store.state.richHtml
			if(Object.keys(html).length) {
				this.shopDetail = '....................'
			}
		},
		onNavigationBarButtonTap() {
			this.save()
		},
		methods:{
			//保存
			save(){
				
				const that = this
				const token = that.token
				 if(!that.inputInfo.title){
					 // #ifdef APP-PLUS
					 plus.nativeUI.toast('请填写商品标题',{duration:'long',verticalAlign:'center'})
					 // #endif
					 return
				 }
				 if(!that.inputInfo.category){
				 					 // #ifdef APP-PLUS
				 					 plus.nativeUI.toast('请选择商品分类',{duration:'long',verticalAlign:'center'})
				 					 // #endif
				 					 return
				 }
				 if(!that.imgList.length){
				 					 // #ifdef APP-PLUS
				 					 plus.nativeUI.toast('请上传商品图片(至少一张)',{duration:'long',verticalAlign:'center'})
				 					 // #endif
				 					 return
				 }
				 if(!that.inputInfo.name){
				 					 // #ifdef APP-PLUS
				 					 plus.nativeUI.toast('请填写您的姓名',{duration:'long',verticalAlign:'center'})
				 					 // #endif
				 					 return
				 }
				 if(!(/^1[3456789]\d{9}$/.test(that.inputInfo.phone))){
				 					 // #ifdef APP-PLUS
				 					 plus.nativeUI.toast('请输入正确的电话格式',{duration:'long',verticalAlign:'center'})
				 					 // #endif
				 					 return
									 
				 }
				 if(!that.inputInfo.address){
				 					 // #ifdef APP-PLUS
				 					 plus.nativeUI.toast('请填写您的地址',{duration:'long',verticalAlign:'center'})
				 					 // #endif
				 					 return
				 }
				 uni.showLoading({
				 	mask:true
				 })
				 // 图片上传至服务器
				 that.imgList.forEach(x =>{
					upload(token,x,true).then(res => {
						that.updataImgList.push(res.url)
						console.log(that.updataImgList)
						console.log(that.imgList)
						if(that.updataImgList.length == that.imgList.length){
							let arr = {}
							if(that.guigeList.length){
								arr = {...that.guigeList.map(x => {
											return {
												name:x.name,
												price:x.price,
												num:x.size
											}
								})}					
							}
							let obj = {
								title:that.inputInfo.title,
								goods_name:that.inputInfo.product || '暂时没想好',
								cate_id:that.inputInfo.category.value,//分类id，暂时没实现
								price:that.inputInfo.price || 0,
								images:that.updataImgList.join(','),
								info:arr,
								province:that.address2[0],
								city:that.address2[1],
								name:that.inputInfo.name,
								phone:that.inputInfo.phone,
								content:Object.keys(that.$store.state.richHtml).length ? that.$store.state.richHtml : ''
							}
							console.log(obj)
							
							yi_publish(obj,token).then(res => {
								uni.hideLoading()
								if(res.data.code == 200){
									// #ifdef APP-PLUS
									plus.nativeUI.toast('发布成功',{duration:'long'})
									// #endif
									uni.redirectTo({
										url:`BaterClsaaify`
									})
								}else{
									// #ifdef APP-PLUS
									plus.nativeUI.toast(res.data.msg,{duration:'long'})
									// #endif
									that.updataImgList = []
									uni.showToast({
										title:res.data.msg,
										icon:'none'
									})
								}
							})
						}else if(that.updataImgList.length > that.imgList){
							that.updataImgList = []
							uni.hideLoading()
						}
					})
				 })
				 
				 
				 
				 
				
			},
			//编辑详情
			issueClick(){
				uni.navigateTo({
					url:'../texts/index/index'
				})
			},
			// 处理选择的分类
			doChoose1List(list){
				let _list = JSON.parse(list)
				this.selectList = _list.map(x => {
					return {
						label:x.cate_name,
						value:x.id
					}
				})
			},
			//轮播图选择
			ChooseImage() {
				uni.chooseImage({
					count: 5, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			//轮播图预览
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			//轮播图删除
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 富文本选择图片
			insertImg:function(){
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						let data = res.tempFilePaths[0]
						uni.showLoading({title:'正在上传图片...'})
						setTimeout(function(){
							uni.hideLoading()
						},1000)
						// upload(data).then(res=>{
						// 	uni.hideLoading()
						// 	let url = 'http://xcl.51kdd.com/' + res.url
						let url = data
							that.editItems.push({
								type:'img',
								value:url,
								progress:0
							})
							that.editItems.push({
								type:'textarea',
								value:''
							})
						// })
						plus.key.showSoftKeybord(); //显示软键盘
						
						uni.pageScrollTo({
							scrollTop: 10000000,
							duration: 0
						});
					}
				});
			},
			/**
			 * 键盘输入时触发事件
			 */
			inputIng:function(e){
				var that = this;
				var value = e.detail.value;
				var index = e.currentTarget.dataset.index;
				that.$set(that.editItems[index],'value',value);
			},
			/**
			 * 输入框行数变化
			 * 当输入框行数变化时，动态赋值给整个content的一个高度，避免输入框跑到工具栏下边去
			 */
			linechage:function(e){
				// console.log(e);
				var that = this;
				var height = e.detail.height;
				var lineHeight = e.detail.heightRpx;
				var pageHeight = uni.upx2px(height + lineHeight)
				that.pageHeight = pageHeight;
				console.log(that.pageHeight)
				uni.pageScrollTo({
					scrollTop: 10000000,
					duration: 0
				});
			},
			//富文本移除照片
			delImg:function(e){
				var index = e.currentTarget.dataset.index;
				var that = this;
				uni.showModal({
					title: '确定要删除该图片吗？',
					content: ' ',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.editItems.splice(index,1); 
						} 
					} 
				});
				console.log(index);
			},
			addGuige(){
				this.guigeList.push({
					name:'',
					size:'',
					price:'',
					isShowAnimate:true
				})
			},
			removeGuide(item,index){
				this.guigeList.splice(index,1)
			},
			// 分类input点击
			fenleiClick(){
				this.$refs.selector.show()
			},
			// 单选框确认
			onConfirm1(e){
				this.inputInfo.category = e.checkArr
			},
			addressClick(){
				this.$refs.region.show()
			},
			onConfirm2(e){
				this.address2 = e.checkArr
				this.inputInfo.address = e.result
			}
		},
	}
</script>

<style>
	input{
		color: #999999;
		font-size: 26upx;
	}
</style>
<style lang="less" scoped>
.edit{
	width: 100%;
	box-sizing: border-box; 
	min-height: 400upx;
	padding: 10upx 30upx 0 30upx;
	background: #fff;
	
	& textarea{
		padding:20upx 0;
		width: 100%;
		min-height: 80upx;
		font-size: 32upx;
		background: #fff;
		line-height: 1.64;
	}
	
	& image{
		width: 100%;
		display: block; 
	}
	
	& .img{
		position: relative;
		margin-top: 10upx;
		margin-bottom: 10upx;
		
		.mask{
			background: rgba(0,0,0,0.5);
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: calc(100% - 6upx);
		}
		
		.del{
			width: 80upx;
			height: 80upx;
			position: absolute;
			bottom: 30upx;
			right: 20upx;
		}
		
		& progress{
			
		}
	}
}
.edit-tools-flex{
	width: 100%;
	height: 98upx;
}
.edit-tools{
	
	position:fixed;
	z-index: 1000;
	left: 0;
	bottom: 0;
	width: 100%;
	background: #fff;
	border-top: 0.5px solid #ccc;
	height: 98upx;
	align-items: center;
	display: flex;
	box-sizing: border-box;
	
	& .date{
		display: flex;
		align-items: center;
		
		& image{
			width: 35upx;
			height: 35upx;
			margin-left: 30upx;
		}
		
		& .date-value{
			font-size: 24upx;
			color: #666666;
			margin-left: 24upx;
			padding-right: 26upx;
			border-right: 0.5px solid #ccc;
		}
	}
	 
	& .single{
		display: flex;
		align-items: center;
		margin-left: 39upx;
		
		& image{
			width: 35upx;
			height: 35upx; 
		}
		
		& text{
			font-size: 30upx;
			color: #999;
			margin-left: 20upx;
		}
	}
	
	& .location{
		display: flex;
		position: absolute;
		right: 30upx;
		top: 50%;
		transform: translateY(-50%);
		padding: 0 20upx;
		height: 51upx;
		justify-content: center;
		align-items: center;
		background: #f0f0f0;
		border-radius: 50upx;
		
		& image{
			width: 27upx;
			height: 33upx;
		}
		
		& .city{
			color: #666666;
			font-size: 24upx;
			margin-left: 10upx;
		}
	}
}
input{
	flex:1
}
.add-guige{
	display: flex;
	justify-content: center;
	align-items: center;
}
.add-guige text{
	font-size: 60upx;
}
.guige-box{
	border: 1px dashed #8799a3;
	position: relative;
}
.remove-item{
	position: absolute;
	right: 15upx;
	top: 15upx;
	font-size: 40upx;
}
</style>
