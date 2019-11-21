<template>
	<view>
		<view>
			<view class="bg-white margin-top-xs">
				<view class="public-title-txt-bottom">
					<view class="margin-left flex align-center public-title-txt">
						<image class="public-title-all-image" src="../../../static/publicl.png"></image>
						<view class="text-bold text-lg">公共服务</view>
					</view>
				</view>
				<view class="grid padding-bottom text-center col-5">
					<view v-for="(voList,keylist) in publicList" :key="keylist">
						<view class="public-title-all">
							<image :src="voList.image"></image>
							<view>{{voList.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex align-center margin-tb-xs justify-between">
				<view class="flex align-center justify-center public-two-all bg-white">
					<image src="../../../static/publicv.png"></image>
					<view>招聘信息</view>
				</view>
				<view class="flex align-center justify-center public-two-all bg-white">
					<image src="../../../static/publicu.png"></image>
					<view>供求信息</view>
				</view>
			</view>
		</view>
		<view>
			<block v-for="(item,index) in dataList" :key="index">
				<tui-collapse :index="index" :current="current" :disabled="item.disabled" @click="change3">
					<template v-slot:title>
						<tui-list-cell :hover="!item.disabled" >
							<view class="flex align-center">
								<image class="public-title-all-image" :src="item.image"></image>
								<view class="text-bold">{{item.name}}</view>
							</view>
						</tui-list-cell>
					</template>
					<template v-slot:content>
						<view class="bg-white">
							<view class="margin-lr padding-top-sm">
								<view class="grid text-center col-3">
									<block v-for="(vo,key) in item.intro" :key="key">
										<view @tap="publicdetailClick(1)" class="public-button">{{vo.name}}</view>
									</block>
								</view>
							</view>
						</view>
					</template>
				</tui-collapse>
			</block>
		</view>
	</view>
</template>

<script>
	import tuiCollapse from "@/components/tui-collapse/tui-collapse"
	import tuiListCell from "@/components/list-cell/list-cell"
	export default{
		components: {
			tuiCollapse,
			tuiListCell
		},
		data(){
			return{
				dataList: [{
						name: "家政服务",
						image:'../../../static/publicm.png',
						intro:[{
							name:'装修公司'},{
							name:'线路维修',},{
							name:'疏通下水道'},{
							name:'开锁公司'},{
							name:'送液化气'},{
							name:'抽油烟机'
							}],
						current: 0,
						disabled: false
					},
					{
						name: "汽车服务",
						intro:[{
							name:'装修公司'},{
							name:'线路维修',},{
							name:'疏通下水道'},{
							name:'开锁公司'},{
							name:'送液化气'},{
							name:'抽油烟机'},{
							name:'抽油烟机'
							}],
						current: -1,
						disabled: false
					},
					{
						name: "家电维修",
						intro:[{
							name:'装修公司'},{
							name:'线路维修',},{
							name:'疏通下水道'},{
							name:'开锁公司'},{
							name:'送液化气'},{
							name:'抽油烟机'
							}],
						current: -1,
						disabled: false
					}
				],
				//手风琴效果
				current: -1,
				publicList:[{
					image:'../../../static/publica.png',
					name:'报警电话'
				},{
					image:'../../../static/publicb.png',
					name:'火警电话'
				},{
					image:'../../../static/publicc.png',
					name:'急救电话'
				},{
					image:'../../../static/publicd.png',
					name:'交通事故'
				},{
					image:'../../../static/publice.png',
					name:'高速救援'
				},{
					image:'../../../static/publicf.png',
					name:'供电线路'
				},{
					image:'../../../static/publicg.png',
					name:'供暖电话'
				},{
					image:'../../../static/publich.png',
					name:'燃气公司'
				},{
					image:'../../../static/publicj.png',
					name:'有线电视'
				},{
					image:'../../../static/publick.png',
					name:'供水电话'
				},]
			}
		},
		methods:{
			change3(e) {
				//可关闭自身
				this.current = this.current == e.index ? -1 : e.index
			},
			//信息详细页面
			publicdetailClick(id){
				uni.navigateTo({
					url:'publicdetail?id=' + id
				})
			},
		}
	}
</script>

<style>
	.tui-content {
		padding: 20rpx 30rpx;
		background: #fff;
		color: #555;
		font-size: 26rpx;
	}
	.public-button{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20upx;
		height:66upx;
		border:1px solid rgba(225,225,225,1);
		border-radius:34upx;
		color: #333333;
		font-size: 28upx;
	}
	.public-title-all image{
		margin-top: 40upx;
		width: 70upx;
		height: 70upx;
	}
	.public-title-txt{
		height: 100upx;
	}
	.public-title-txt-bottom{
		border-bottom: #E1E1E1 1px solid;
	}
	.public-title-all-image{
		margin-right: 10upx;
		width: 50upx;
		height: 50upx;
	}
	.public-two-all{
		height: 140upx;
		width: 49%;
	}
	.public-two-all image{
		height: 48upx;
		width: 48upx;
		margin-right: 16upx;
	}
</style>
