<template>
	<view class="load-more">
		<view class="loading-img" v-show="loadingType === 1 && showImage">
			<!-- <view class="loading-cup"></view> -->
			<view class="load1">
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
			</view>
			<view class="load2">
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
			</view>
			<view class="load3">
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
			</view>
		</view>
		<text class="loading-text" :style="{color:color}">{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}</text>
	</view>
</template>

<script>
	export default {
		name: "load-more",
		props: {
			loadingType: {
				//上拉的状态：0-loading前；1-loading中；2-没有更多了
				type: Number,
				default: 0
			},
			showImage: {
				type: Boolean,
				default: true
			},
			color: {
				type: String,
				default: "#999999"
			},
			contentText: {
				type: Object,
				default () {
					return {
						contentdown: "上拉给你更多精彩",
						contentrefresh: "努力加载中...",
						contentnomore: " 没有更多了... "
					};
				}
			}
		},
		data() {
			return {}
		}
	}
</script>

<style >
	.loading-cup{
		border: 4upx solid rgb(30,29,20);
		border-radius: 0 0 16upx 16upx;
		border-top-width: 0;
		width: 40upx;
		height: 40upx;
		background-color: #FFF3da;
		overflow: hidden;
		box-shadow: 0 2upx  4upx 2upx rgba(0,0,0,0.2);
		transform: translateZ(0);
	}
	.loading-cup::before, .loading-cup::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 0;
		right: -120upx;
		height: 20upx;
		clip-path: polygon(
			0% 20%,
			2% 18%,
			3% 16%,
			5% 14%,
			7% 13%,
			8% 11%,
			10% 10%,
			12% 10%,
			13% 10%,
			15% 10%,
			17% 11%,
			18% 13%,
			20% 14%,
			22% 16%,
			23% 18%,
			25% 20%,
			27% 22%,
			28% 24%,
			30% 26%,
			32% 27%,
			33% 29%,
			35% 30%,
			37% 30%,
			38% 30%,
			40% 30%,
			42% 29%,
			43% 27%,
			45% 26%,
			47% 24%,
			48% 22%,
			50% 20%,
			52% 18%,
			53% 16%,
			55% 14%,
			57% 13%,
			58% 11%,
			60% 10%,
			62% 10%,
			63% 10%,
			65% 10%,
			67% 11%,
			68% 13%,
			70% 14%,
			72% 16%,
			73% 18%,
			75% 20%,
			77% 22%,
			78% 24%,
			80% 26%,
			82% 27%,
			83% 29%,
			85% 30%,
			87% 30%,
			88% 30%,
			90% 30%,
			92% 29%,
			93% 27%,
			95% 26%,
			97% 24%,
			98% 22%,
			100% 20%,
			100% 100%,
			0% 100%
		);
	}
	.loading-cup::before{
		background-color: rgb(255,214,125);
		animation: move1 infinite 6s linear;
	}
	.loading-cup::after{
		background-color: rgb(255,174,0);
		animation: move2 infinite 2s linear;
	}
	@keyframes move1{
		from{
			transform: translateX(0);
		}
		to{
			transform: translateX(-80px);
		}
	}
	@keyframes move2{
		from{
			transform: translateX(-20px);
		}
		to{
			transform: translateX(-100px);
		}
	}
</style>

<style>
	.load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center;
	}

	.loading-img {
		height: 24px;
		width: 24px;
		margin-right: 10px;
	}

	.loading-text {
		font-size: 28upx;
		color: #777777;
	}

	.loading-img>view {
		position: absolute;
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px;
	}

	.load2 {
		transform: rotate(30deg);
	}

	.load3 {
		transform: rotate(60deg);
	}

	.loading-img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #777;
		position: absolute;
		opacity: 0.2;
		transform-origin: 50%;
		-webkit-animation: load 1.56s ease infinite;
	}

	.loading-img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px;
	}

	.loading-img>view view:nth-child(2) {
		-webkit-transform: rotate(180deg);
		top: 11px;
		right: 0px;
	}

	.loading-img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px;
	}

	.loading-img>view view:nth-child(4) {
		top: 11px;
		left: 0px;
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s;
	}

	.load2 view:nth-child(1) {
		animation-delay: 0.13s;
	}

	.load3 view:nth-child(1) {
		animation-delay: 0.26s;
	}

	.load1 view:nth-child(2) {
		animation-delay: 0.39s;
	}

	.load2 view:nth-child(2) {
		animation-delay: 0.52s;
	}

	.load3 view:nth-child(2) {
		animation-delay: 0.65s;
	}

	.load1 view:nth-child(3) {
		animation-delay: 0.78s;
	}

	.load2 view:nth-child(3) {
		animation-delay: 0.91s;
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s;
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s;
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.30s;
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s;
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0.2;
		}
	}
</style>
