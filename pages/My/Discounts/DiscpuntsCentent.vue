<template>
	<view>
		<view v-for="(vo,key) in list" :key="key" class="margin-top-sm bg-white">
			<view class="flex align-center solid-bottom discpuntsCentent-title">
				<view style="font-size: 40upx;" class="margin-left margin-right-xs lg cuIcon-shop "></view>
				<view class="text-bold discpuntsCentent-title-shopname">{{vo.shopname}}</view>
			</view>
			<view class="discpuntsCentent-main-all">
				<view v-for="(item,index) in vo.shopmessage " :key="index" class="discpuntsCentent-main-bg">
					<view class="flex align-center discpuntsCentent-main" 
						:class="[item.type == 0 ?'discpuntsCentent-main-bg-one':'discpuntsCentent-main-bg-two']">
						<view class="flex-sub text-price text-center text-xxxxl text-bold discpuntsCentent-main-money">{{item.money}}</view>
						<view class="flex-twice margin-left-sm">
							<view class="text-lg margin-bottom-xs discpuntsCentent-main-money">满{{item.maxmoney}}可用</view>
							<view class="text-sm discpuntsCentent-main-money">{{item.time}}</view>
						</view>
						<view v-if="item.type == 0" class="flex-sub discpuntsCentent-button discpuntsCentent-button-coloe">立即使用</view>
						<view v-else class="flex-sub discpuntsCentent-button discpuntsCentent-button-border discpuntsCentent-main-money">立即领取</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[{
					shopname:'沃隆旗舰店',
					shopmessage:[{
						money:10,
						maxmoney:100,
						time:'2019/11/12-2019/12/12',
						type:1
					},{
						money:100,
						maxmoney:1000,
						time:'2019/11/12-2019/12/12',
						type:0
					}]
				},{
					shopname:'innisfree旗舰店',
					shopmessage:[{
						money:10,
						maxmoney:100,
						time:'2019/11/12-2019/12/12',
						type:0
					},{
						money:10,
						maxmoney:100,
						time:'2019/11/12-2019/12/12',
						type:1
					}]
				}]
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.discpuntsCentent-title{
		height: 82upx;
	}
	.discpuntsCentent-title-shopname{
		color: #636362;
		font-size: 30upx;
	}
	.discpuntsCentent-main{
		margin-bottom: 20upx;
		padding: 20upx;
		padding-right: 50upx;
		height: 186upx;
	}
	.discpuntsCentent-main-all{
		margin: 26upx 30upx 0 30upx ;
		padding-bottom: 38upx;
	}
	.discpuntsCentent-main-bg-one{
		background: url(../../../static/lqyijqu.png);
		background-size: 100% 100%;
	}
	.discpuntsCentent-main-bg-two{
		background: url(../../../static/lqweilingqu.png);
		background-size: 100% 100%;
	}
	.text-price::before{
		font-size: 50%;
	}
	.discpuntsCentent-button{
		display: flex;
		align-items: center;
		justify-content: center;
		height:50upx;
		border-radius:25upx;
	}
	.discpuntsCentent-button-coloe{
		background:linear-gradient(0deg,rgba(229,21,11,1),rgba(255,97,82,1));
		color: #FFFFFF;
	}
	.discpuntsCentent-button-border{
		border:#E5150B 1px solid
	}
	.discpuntsCentent-main-money{
		background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255,97,82, 1)), to(rgba(229,21,11, 1)));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
