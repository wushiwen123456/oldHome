<template>
	<view>
		<view v-for="(vo,key) in List" :key="key" class="flex align-center justify-between bg-white piblic-height margin-top-xs padding-lr">
			<view>
				<view class="text-wuer text-lg text-bold margin-bottom-xs">{{vo.title}}</view>
				<view class="text-jiujiujiu text-sm-erliu">{{vo.address}}</view>
			</view>
			<view class="flex flex-direction align-end">
				<view class="text-jiujiujiu text-sm" v-if="vo.km">距离您{{vo.km}}千米</view>
				<view @tap="callPhone(vo.phone)" class="flex align-center public-phone-button">
					<image src="../../../static/codephone.png"></image>
					<view>联系它</view>
				</view>
			</view>
		</view>
		<uni-load-more v-if="loadingimg" :loadingType="loadingType" ></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	
	import { pubDetailData } from '@/network/Home'
	export default{
		components:{
			uniLoadMore
		},
		data(){
			return{
				loadingimg:false,//login加载
				loadingType:1,//login状态
				List:[{},{},{},{}],
				page:1
			}
		},
		onLoad(option) {
			const token = this.$store.getters.isToken,
			id = option.id,
			{latitude,longitude} = this.$store.state.userInfo.address
			// 获取信息
			this.pubDetailData({
				cate:id,
				jingdu:longitude,
				weidu:latitude,
				page:this.page,
				limit:10
			},token)
		},
		methods:{
			callPhone(phone){
				console.log('已拨打电话')
				uni.makePhoneCall({
				    phoneNumber: phone
				});
			},
			// 根据位置信息获取数据
			pubDetailData(obj,token){
				console.log(obj)
				pubDetailData(obj,token).then(res => {
					if(res.data.code == 200){
						this.List = res.data.data
					}
				})
			}
		}
	}
</script>

<style>
	.public-phone-button{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20upx;
		width:130upx;
		height:50upx;
		border:1px solid rgba(205,50,51,1);
		border-radius:8upx;
		color: #CD3233;
		font-size: 24upx;
	}
	.public-phone-button image{
		width: 26upx;
		height: 26upx;
		margin-right: 10upx;
	}
	.piblic-height{
		height: 162upx;
	}
</style>
