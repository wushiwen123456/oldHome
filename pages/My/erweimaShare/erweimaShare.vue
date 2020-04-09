<template>
	<view class="content" v-if="info">
		<view class="e-box">
			<view class="e-user text-lg">
				<image class="margin-right e-ava" :src="icon"></image>
				<view class="e-info text-black">
					<view>{{info.nickname}} <text :style="{color:color}" :class="[info.sex == 1 ? 'cuIcon-male' : 'cuIcon-female']" class="margin-left-sm lg"></text></view>
				</view>
			</view>
			<view class="e-content">
				<tki-qrcode @imgClick="imgClick" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
				<text class="tips text-sm text-gray">扫一扫上面的二维码页面</text>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode'
	export default {
		components:{
			tkiQrcode
		},
		data() {
			return {
				info:{},
				val: '', // 要生成的二维码值
				size: 200, // 二维码大小
				unit: 'px', // 单位
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' ,// 二维码生成后的图片地址或base64
				color:'' //性别的颜色
			};
		},
		onLoad() {
			// 从缓存中读取信息
			
			const info = uni.getStorageSync('Message_key')
			console.log(info)
			const integrlUrl = this.$store.state.userInfo.localAvatar
			if(info && integrlUrl){
				this.info = info
				this.icon = integrlUrl
				this.color = this.info.sex == 1 ? '#0081ff' : '#e03997'
				this.val = `http://jn.51kdd.com/index.html#/?spread_uid=${info.uid}`
			}else{
				// #ifdef APP-PLUS
				plus.nativeUI.toast('信息生成失败',{duration:'long'})
				// #endif
			}	
			console.log(this.val)
		},
		methods:{
			// 生成二维码
			qrR(res) {
				this.src = res
			},
			// 点击预览保存
			imgClick(e){
				// 发起图片预览
				uni.previewImage({
					current:this.val,
					urls:[e],
					indicator:'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	page,.content{
		height: 100%;
	}
	.content{
		display: flex;
		justify-content: center;
		align-items: center;
		.e-box{
			width: 80%;
			height: 700upx;
			background-color: #fff;
			border-radius: 10upx;
			padding: 20upx 25upx;
		}
		.e-user{
			display: flex;
			height: 80upx;
			image{
				width: 80upx;
				height: 80upx;
				border-radius: 10upx;
				background-color: #f2f2f2;
			}
			.e-info{
				flex: 1;
				display: flex;
				align-items: center;
				text{
					font-weight: bold;
				}
			}
		}
		.e-content{
			height: 570upx;
			// background-color: #f00;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 400upx;
				height: 400upx;
			}
			.tips{
				position: absolute;
				bottom:15upx;
			}
		}
	}
</style>
