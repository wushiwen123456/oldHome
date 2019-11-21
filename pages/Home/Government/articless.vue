<template>
	<view class="bg-white">
		<view class="margin-lr">
			<view class="text-wuer text-xl text-bold">吉利投资的Volocopter空中出租车成功飞越 新加坡滨海湾</view>
			<view class="flex align-center margin-tb">
				<view style="color: #BFBFBF">2019-10-19</view>
				<view class="margin-left-sm text-jiujiujiu">阅读数3138</view>
			</view>
			<parser :html="html"></parser>
		</view>
	</view>
</template>

<script>
	import parser from "@/components/jyf-Parser/index"
	export default{
		components:{
			parser,
		},
		//点击分享
		onShareAppMessage(){
			
		},
		data(){
			return{
				html:'<h1>这是一个富文本编辑器</h1><h2>然后,然后就没了</h2>'
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
