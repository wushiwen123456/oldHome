<template>
	<view class="bg-white inform-mian-all" :style="{ height: windowHeight + 'px'}">
		<view @tap="informClick(key)" v-for="(vo,key) in list" :key="key" class="flex align-center justify-between inform-all solid-bottom">
			<view class="flex align-center">
				<image class="inform-image-all" :src="vo.image"></image>
				<view>{{vo.name}}</view>
			</view>
			<view class="margin-right inform-all-badge" v-if="vo.tips">{{vo.tips}}</view>
		</view>
	</view>
</template>

<script>
	import {userMessages} from '@/network/getProfileData'
	import  {
		noNetWorkChat,
		noNetWork,
		charCompare
	} 	from '@/utils/chat'
	
	export default{
		data(){
			return{
				list:[{
					name:'物流消息',
					image:'../../../static/informa.png',
				},{
					name:'我的消息',
					image:'../../../static/informb.png',
					tips:0
				},{
					name:'系统通知',
					image:'../../../static/informc.png',
				},{
					name:'入驻通知',
					image:'../../../static/informd.png',
				},{
					name:'退款通知',
					image:'/static/mytwoe.png'
				}
				],
				isLoad:false
			}
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight
			        console.log('屏幕高度为'+res.windowHeight);
			    }
			});
		},	
		onShow() {
			const token = this.$store.getters.isToken
			// 获取其他消息
			this.getMessages(token)
			// 获取vuex中所有未接收的消息,返回到我的消息的tips中
			this.$set(this.list[1],'tips', this.$store.getters.allUnabsorbed)
		},
		methods:{
			// 获取消息条数
			getMessages(token){
				userMessages(token).then(res =>{
					if(res.data.code == 200){
						const data = res.data.data,list = this.list
						this.list.forEach(x => {
							const name = x.name
							switch (name) {
								case '物流消息':
									this.$set(x,'tips',data.orderNotice)
									break
								case '入驻通知':
									
									this.$set(x,'tips',this.$store.getters.isLookSettled ? data.shopNotice : 0)
									break
								case '系统通知':
									this.$set(x,'tips',data.systemNotice)
									break
								case '退款通知':
									this.$set(x,'tips',data.payRefunNotice)
									break
							}
						})
					}
				})
			},
			//点击消息
			informClick(key){
				if(key == 0){
					//物流消息
					uni.navigateTo({
						url:'Logistics/logistics'
					})
				}if(key == 1){
					if(this.isLoad = false){
						return 
					}
					//聊天记录
					uni.navigateTo({
						url:'Chat/chat'
					})
				}if(key == 2){
					//系统通知
					uni.navigateTo({
						url:'System/system'
					})
				}if(key == 3){
					//入驻通知
					this.$store.state.lookSettled = false
					uni.navigateTo({
						url:'Enter/enter'
					})
				}if(key == 4){
					// 退款通知
					uni.navigateTo({
						url:`refund/refund`
					})
				}
			}
		}
	}
</script>

<style>
	.inform-mian-all{
		padding-left: 22upx;
	}
	.inform-image-all{
		width:98upx;
		height:98upx;
		margin-right: 20upx;
	}
	.inform-all{
		height: 130upx;
	}
	.inform-all-badge{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10upx;
		color: #FFFFFF;
		background: #CD3233;
		border-radius: 50upx;
		font-size: 22upx;
	}
</style>
