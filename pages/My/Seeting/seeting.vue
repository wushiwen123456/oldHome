<template>
	<view>
		<view class="margin-top-xs bg-white padding-left padding-right">
			<view @tap="ruleClick" class="flex align-center justify-between height-all solid-bottom">
				<view class="text-three">规则公告</view>
				<view class="lg text-gray cuIcon-right"></view>
			</view>
			<view class="flex align-center justify-between height-all">
				<view  class="text-three">关于我们</view>
				<view class="lg text-gray cuIcon-right"></view>
			</view>
		</view>
		<view class="margin-top-xs bg-white padding-left padding-right">
			<view @tap="removeClick" class="flex align-center justify-between height-all solid-bottom">
				<view class="text-three">清除缓存</view>
				<view class="lg text-gray cuIcon-right"></view>
			</view>
			<view @tap="versionsClick" class="flex align-center justify-between height-all">
				<view  class="text-three">版本号</view>
				<view class="text-jiujiujiu text-sm">{{version}}</view>
			</view>
		</view>
		<view  class="margin-top-xs bg-white padding-left padding-right" :class="{'login-color':token}">
			<view @tap="outloginSharClick" class="flex align-center justify-center height-all ">
				<view class="text-three text-wuer text-bold">{{isLogin}}</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="bottom" >
			<view class="height-all flex align-center justify-center text-jiujiujiu text-sm">退出登录会清除您的登录信息，确认退出吗？</view>
			<view class="height-all flex align-center justify-center solid-top text-xl text-red-my" @tap="logout">退出登录</view>
			<view class="height-all flex align-center justify-center solid-top text-xl text-red-my" @tap="changeUser">切换账号</view>
			<view style="background: #EAEAEC;height: 10upx;"></view>
			<view @tap="closePopupsSharClick" class="height-all flex align-center justify-center">取消</view>
		</uni-popup>
		<x-modal v-model="show1" title='提示' text='清除缓存会注销您的登录信息,是否继续' @confirm="clearStore" />
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	// import {getVersion} from '@/js_sdk/version_check'
	export default{
		components: {
			uniPopup,
		},
		data(){
			return{
				token:"",
				version:'',
				show1:false
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			// 获取当前版本号
			this.version = plus.runtime.version
			// #endif
		},
		onShow() {
				this.token = this.$store.getters.isToken
		},
		methods:{
			//规则公告
			ruleClick(){
				uni.navigateTo({
					url:'rule'
				})
			},
			//清除缓存
			removeClick(){
				this.show1 = true
			},
			//检查更新
			versionsClick(){
				// getVersion(true)
				uni.navigateTo({
					url:'version/version'
				})
			},
			//登录弹出
			outloginSharClick(){
				if(this.token){
					this.$refs.popup.open()
				}else{
					uni.navigateTo({
						url:'../../login/login'
					})
				}
			},
			//登录关闭
			closePopupsSharClick(){
				this.$refs.popup.close()
			},
			// 登出
			logout(){
				this.$store.commit('logout')
				this.token = false
				this.$refs.popup.close()
				uni.removeStorageSync('Message_key')
				this.$store.commit('setUserData',{})
				// #ifdef APP-PLUS
				plus.nativeUI.toast('已退出登录',{duration:'long'})
				// #endif
			},
			// 切换账号
			changeUser(){
				uni.navigateTo({
					url:'../../login/login'
				})
			},
			// 清理缓存
			clearStore(){
				uni.showLoading({
					title:'正在清理...'
				})
				uni.clearStorageSync()			
				this.$store.commit('logout')
				uni.hideLoading()
				// #ifdef APP-PLUS
				plus.nativeUI.toast('清理成功',{duration:'long'})
				// #endif
			}
		},
		computed:{
			isLogin(){
				return this.token ? '退出登录' : '登录'
			}
		}
	}
</script>

<style lang="scss">
	.height-all{
		height: 96upx;
	}
	.login-color{
		background-color: rgb(192,46,37);
		view{
			color: #FFFFFF;
		}
	}
</style>
