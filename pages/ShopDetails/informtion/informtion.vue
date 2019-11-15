<template>
	<view>
		<view class="cu-chat">
			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view>
			<view class="cu-item self">
				<view class="main">
					<view class="content shadow">
						喵星球，喵喵市
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view>
			
		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text style="color: #636362;" class="lg text-gray cuIcon-shop"></text>
			</view>
			<input class="solid-bottom-input" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur"></input>
			<image class="fasong-button" src="../../../static/dasong.png"></image>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0
			};
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style>
page{
  padding-bottom: 100upx;
}
.fasong-button{
	width:58upx;
	height:58upx;
}
.solid-bottom-input{
	border-radius: 24upx;
	background:rgba(255,255,255,1);
	box-shadow:0upx 0upx 3upx 0upx rgba(0, 0, 0, 0.31);
	border-radius:40upx;
	padding-left: 30upx;
}
</style>
