<template>
	<view class="view">
		<view>
			<image src="../../../../static/logo/logo.png" class="logo"></image>
			<view class="logo_name">
				老家商城
			</view>
			<view class="version_code">
				版本号: {{version_code}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version_code:''
			};
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.version_code = plus.runtime.version
			console.log(this.version_code)
			// #endif
		}
	}
</script>

<style lang="scss">
 page,.view{
	 width: 100%;
	 height: 50vh;
	 background:#FFFFFF;
 }
 .view{
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 .logo{
		 width: 200upx;
		 height:200upx;
	 }
	 .logo_name{
		 font-size: $uni-font-size-lg;
		 margin: 10upx 0upx;
		 text-align: center;
	 }
	 .version_code{
		 font-size: $uni-font-size-base;
		 color: #666;
		 text-align: center;
	 }
 }
 
</style>
