<script>
	export default {
		onLaunch: function() {
			const value = uni.getStorageSync('token')
			if(value){
				this.$store.commit('login',value)
				uni.setStorage({
					key:'token',
					data:value
				})
			}
			else{
				uni.reLaunch({
					url:'pages/login/login'
				})
			}
		},
		onShow: function() {
			const pages = getCurrentPages()
			console.log(pages)
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	video{
		position: relative;
		z-index: -1;
	}
	.havor-class{
		background-color: #f5f5f5;
	}
</style>
