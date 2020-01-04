<template>
	<view class="bg-white">
		<view v-if="NOdata">
			<view class="list">
				<view class="flex_col" @longpress="onLongPress" :class="{'active':pickerUserIndex==index}" @tap="listTap(item)" v-for="(item,index) in userList"
				 :key="index" :data-index="index">
					<image src="../../../../static/demo3.png" mode="aspectFill"></image>
					<view class="flex_grow" v-if="item.isLoad">
						<view class="flex_col">
							<view class="flex_grow">{{item.user.shop_name}}</view>
						</view>
						<view class="flex justify-between">
							<view class="info">{{item.lastData.content}}</view>
							<view class="time">{{item.lastData.time}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="shade" v-show="showShade" @tap="hidePop">
				<view class="pop" :style="popStyle" :class="{'show':showPop}">
					<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-index="index">{{item}}</view>
				</view>
			</view>
		</view>
		
		<!-- 暂无数据 -->
		<view v-else class="empty-img" :style="{height:style.height + 'px',transform:'translateY(-10%)'}">
			<image src="/static/nodatamessage.png" mode="widthFix"></image>
		</view>
		
	</view>
</template>

<script>
	// 聊天列表接口
	import { chatList,chatData } from '@/network/getProfileData'
	
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	export default{
		data(){
			return{
				NOdata:false,//暂无数据
				userList: [],
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗按钮列表 */
				popButton: ["标为关注", "置顶聊天", "删除该聊天"],
				/* 弹窗定位样式 */
				popStyle: "",
				/* 选择的用户下标 */
				pickerUserIndex: -1,
				style:{
					height:''
				},
			}
		},
		onLoad() {
			
			this.getWindowSize();
			this.token = this.$store.getters.isToken
			const view = uni.getSystemInfoSync()
			this.style.height = view.windowHeight;
			
			this.getListData();
			// #ifdef H5
			document.onLong = function(e) {
				var e = e || window.event;
				e.preventDefault();
			};
			// #endif
		},
		methods: {
			/* 列表触摸事件 */
			listTap(item) {
				/* 因弹出遮罩问题，所以需要在遮罩弹出的情况下阻止列表事件的触发 */
				if (this.showShade) {
					return;
				}
				const obj = {
					expressageFen:item.user.expressage_score,
					produceFen:item.user.product_score,
					serviceFen:item.user.service_score,
					totalFen:item.user.zong,
					storeName:item.user.shop_name,
					storeLogo:item.user.shop_logo,
					storeId:item.user.shop_id
					
				}
				const str = JSON.stringify(obj)
				uni.navigateTo({
					url:`../../../ShopDetails/informtion/informtion?shopInfo=${str}`
				})
		
				console.log("列表触摸事件触发")
			},
			/* 获取列表数据 */
			getListData() {
				const that = this
				chatList(that.token).then(res => {
					if(res.data.code == 200){
						const list = res.data.data.shopGroup
						list.forEach(x => {
							x.user.shop_logo = replaceImage(x.user.shop_logo)
							x.isLoad = false
							// 获取每个聊天对象的消息记录
							chatData(that.token,x.group_id).then(res => {
								if(res.data.code == 200){
									x.lastData = res.data.data[res.data.data.length-1]
									// that.userList.push(x)
									x.isLoad = true
								}
							})
						})
						that.userList = list
					}
				})
				
			},
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.winSize = {
							"witdh": res.windowWidth,
							"height": res.windowHeight
						}
					}
				})
			},
			/* 长按监听 */
			onLongPress(e) {
				let [touches, style, index] = [e.touches[0], "", e.currentTarget.dataset.index];
		
				/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
				if (touches.clientY > (this.winSize.height / 2)) {
					style = `bottom:${this.winSize.height-touches.clientY}px;`;
				} else {
					style = `top:${touches.clientY}px;`;
				}
				if (touches.clientX > (this.winSize.witdh / 2)) {
					style += `right:${this.winSize.witdh-touches.clientX}px`;
				} else {
					style += `left:${touches.clientX}px`;
				}
		
				this.popStyle = style;
				this.pickerUserIndex = Number(index);
				this.showShade = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPop = true;
					}, 10);
				});
			},
			/* 隐藏弹窗 */
			hidePop() {
				this.showPop = false;
				this.pickerUserIndex = -1;
				setTimeout(() => {
					this.showShade = false;
				}, 250);
			},
			/* 选择菜单 */
			pickerMenu(e) {
				let index = Number(e.currentTarget.dataset.index);
				console.log(`第${this.pickerUserIndex+1}个用户,第${index+1}个按钮`);
				// 在这里开启你的代码秀
		
				uni.showToast({
					title: `第${this.pickerUserIndex+1}个用户,第${index+1}个按钮`,
					icon: "none",
					mask: true,
					duration: 600
				});
		
				/* 
				 因为隐藏弹窗方法中会将当前选择的用户下标还原为-1,
				 如果行的菜单方法存在异步情况，请在隐藏之前将该值保存，或通过参数传入异步函数中
				 */
				this.hidePop();
			}
		}
	}
</script>

<style>
	.nodata{
		padding-top: 200upx;
	}
	.nodata image{
		width: 100%;
	}
</style>

<style scoped lang="scss">
	page,.bg-white{
		height: 100%;
		overflow: hidden;
		background-color: #fff;
	}
	/* 列式弹性盒子 */
	.flex_col {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}

	/* 弹性盒子弹性容器 */
	.flex_col .flex_grow {
		width: 0;
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
	}

	.flex_row .flex_grow {
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
	}

	/* 弹性盒子允许换行 */
	.flex_col.flex_wrap {
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}

	/* 列表 */
	.list {
		background-color: #fff;
		font-size: 28upx;
		color: #333;
		user-select: none;
		touch-callout: none;

		&>view {
			padding: 24upx 30upx;
			position: relative;

			&:active,
			&.active {
				background-color: #f3f3f3;
			}

			image {
				height: 80upx;
				width: 80upx;
				border-radius: 4px;
				margin-right: 20upx;
			}

			&>view {
				line-height: 40upx;

				.time,
				.info {
					color: #999;
					font-size: 24upx;
				}

				.time {
					width: 280upx;
					text-align: right;
				}

				.info {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 375upx;
				}
			}
		}

		&>view:not(:first-child) {
			margin-top: 1px;

			&::after {
				content: '';
				display: block;
				height: 0;
				border-top: #CCC solid 1px;
				width: 620upx;
				position: absolute;
				top: -1px;
				right: 0;
				transform:scaleY(0.5);	/* 1px像素 */
			}
		}
	}

	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		-webkit-touch-callout: none;

		.pop {
			position: fixed;
			z-index: 101;
			width: 200upx;
			box-sizing: border-box;
			font-size: 28upx;
			text-align: left;
			color: #333;
			background-color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			line-height: 80upx;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);

			&.show {
				transform: scale(1, 1);
			}

			&>view {
				padding: 0 20upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;

				&:active {
					background-color: #f3f3f3;
				}
			}
		}
	}
</style>

