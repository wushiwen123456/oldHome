<template>
	<view class="screen-swiper">
		<swiper class="screen-swiper" :hidden="!autoplay">
			<swiper-item>
				<video id="myVideo" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
			 autoplay="false" loop muted show-play-btn controls objectFit="cover" @pause="ZhanTing" @ended="ZhanTing"></video>
			</swiper-item>
		</swiper>
		<swiper :hidden="autoplay" class="screen-swiper" indicator-dots="true" circular="true"
		 :autoplay="!autoplay" interval="3500" duration="500">
			<swiper-item @tap="BoFang">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				autoplay:false
			}
		},
		onLoad() {
			that = this;
		},
		onReady: function(res) {
			// #ifndef APP-PLUS
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},

		methods: {
			BoFang(){
				if(that.autoplay==false){
					that.autoplay=true;
					that.videoContext.play();
				}
			},
			ZhanTing(){
				if(that.autoplay==true){
					that.autoplay=false
				}
			}
		}
	}
</script>

<style>
	.screen-swiper {
		min-height: 375upx;
	}
	
	.screen-swiper image,
	.screen-swiper video{
		width: 100%;
		display: block;
		height: 100%;
		margin: 0;
		pointer-events: none;
	}
</style>
