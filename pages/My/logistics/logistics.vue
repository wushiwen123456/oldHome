<template>
	<view class="total-wrap">
		<view class="product-wrapper" v-if="productList.length" v-for="(item,index) in productList" :key="index">
		  <view class="product-image">
			  <image :src="item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image"></image>
		  </view>
		  <view class="product-info">
			  <view class="p-title">
			  	<text>{{item.productInfo.store_name}}</text>
				<text class="p-price">
					<text>¥ {{item.productInfo.attrInfo ? item.productInfo.attrInfo.price : item.productInfo.price}}</text>
				</text>
			  </view>
				<view class="p-other">
					<text class="p-type" v-if="item.productInfo.attrInfo">类型: {{item.productInfo.attrInfo.suk}}</text>
					<text class="p-type" v-else>类型: 默认类型</text>
					<text class="p-num">x{{item.cart_num}}</text>
				</view>
		  </view>
		</view>
		<!-- 物流信息 -->
		<view class="logistics-info m-t">
			<view class="l-message">
				<image v-if="Object.keys(logistInfo).length" :src="logistInfo.logo"></image>
				<view class="l-text">
					<view class="l-order"><text>物流公司</text>{{logistInfo.name}}</view>
					<view class="l-order"><text>快递单号</text>{{logistInfo.delivery_id}}</view>
				</view>
			</view>
			<view @click="copyOrder" class="l-copy">
				复制单号
			</view>
		</view>
		<!-- 物流详细 -->
		<scroll-view :style="{height:height}" scroll-y="true"  class="scroll-wrapper" >
			<view class="logistics-detail" ref="log" v-if="productList.length" >
				<block v-for="(item, index) in tracesData" :key="index">
				  <trackNode v-if="hackReset" class="track" :is-first="index===tracesData.length-1" :is-newest="index===0" :is-main-node="item.isMainNode" :node-data="item"></trackNode>
				</block>
			</view>
		</scroll-view>
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>
import trackNode from '@/components/trackNode.vue'

// 调用物流查询接口
import { queryLogistics } from '@/network/affirm'

// 导入工具
import {replaceImage} from '@/utils/dealUrl'

// #ifdef APP-PLUS
// 复制文本工具
import clipboard from '@/js_sdk/dc-clipboard/clipboard'
// #endif


export default {
  components: {
    trackNode
  },
  data () {
    return {
      tracesData: [
        {
          acceptStation: '包裹已被吴亦发同学签收', // 节点描述
          createTime: '2019-10-24 15: 27: 16',
          status: 'COMPLETE', // 节点状态
          phone: '', // 电话
          statusName: '已签收', // 节点标题
          isMainNode: true // 是否主节点，主节点前方展示icon
        },
        {
          acceptStation: '由派送员蔡小坤同志配送，电话：',
          createTime: '2019-10-24 15: 26: 41',
          status: 'DELIVERING',
          phone: '16677778888',
          statusName: '运输中',
          isMainNode: true
        },
        {
          acceptStation: '已到XXX小区快递点',
          createTime: '2019-10-24 15: 26: 41',
          status: 'DELIVERING',
          phone: '',
          statusName: '运输中',
          isMainNode: false
        },
        {
          acceptStation: '已到海宁集散中心',
          createTime: '2019-10-24 15: 26: 18',
          status: 'DELIVERING',
          phone: '',
          statusName: '运输中',
          isMainNode: false
        },
        {
          acceptStation: '已到杭州集散中心',
          createTime: '2019-10-24 15: 26: 07',
          status: 'DELIVERING',
          phone: '',
          statusName: '运输中',
          isMainNode: false
        },
        {
          acceptStation: '包裹已到达余杭区集散中心',
          createTime: '2019-10-24 15: 25: 54',
          status: 'DELIVERING',
          phone: '',
          statusName: '运输中',
          isMainNode: false
        },
        {
          acceptStation: '快递员已上门取件',
          createTime: '2019-10-24 15: 25: 17',
          status: 'DELIVERING',
          phone: '',
          statusName: '已揽收',
          isMainNode: false
        },
        {
          acceptStation: '快递员已上门取件',
          createTime: '2019-10-24 15: 25: 17',
          status: 'DELIVERING',
          phone: '',
          statusName: '已揽收',
          isMainNode: false
        },
        {
          acceptStation: '快递员已上门取件',
          createTime: '2019-10-24 15: 25: 17',
          status: 'DELIVERING',
          phone: '',
          statusName: '已揽收',
          isMainNode: false
        },
        {
          acceptStation: '快递员已上门取件',
          createTime: '2019-10-24 15: 25: 17',
          status: 'DELIVERING',
          phone: '',
          statusName: '已揽收',
          isMainNode: false
        }
		
      ],
	  height:0,
	  orderDetail:{},
	  productList:[],//商品数组
	  token:'',
	  logistInfo:{},//物流信息
	  logistics:[],//物流数组
	  hackReset:true
	  
    }
  },
  onLoad(option) {
	this.token = this.$store.getters.isToken
	const id = option.id
	if(this.token){
		this.queryLogistics(id)	
	}
  },
  onReady() {
	this.$refs.loading.open()
  },
  
  methods:{
	  // 网络加载方法
	  queryLogistics(id){
		  queryLogistics(id,this.token).then(res =>{
				this.$refs.loading.close()
			  if(res.data.code == 200){
				  let data = res.data.data
				  // 处理商品图片数据\
				  this.dealImg(data.order)
				
				  if(data.express.msg == 'ok'){
					  let obj = data.express.result
					  // 处理物流信息
					  this.dealLogistic(obj,data)
					 this.$nextTick(() => {
						this.hackReset = true
						// 处理滚动wrapper
						let view = uni.createSelectorQuery().select('.scroll-wrapper')
						view.fields({
							scrollOffset:true,
							rect:true
						},data => {
							if(data.top){
								this.height = `calc( 100vh - ${data.top}px )`
							}
						}).exec()
					 })
				  }else{
					  // #ifdef APP-PLUS
					  plus.nativeUI.toast(data.express.msg);
					  // #endif
				  }
			  }
		  })
	  },
	  
	  // 处理图片
	  dealImg(obj){
		  console.log(obj)
		  obj.cartInfo.forEach(x => {
			  console.log(x)
			  let data = x.productInfo
			  console.log(data)
			  if(data.attrInfo){
				  data.attrInfo.image = replaceImage(data.attrInfo.image)
			  }
			  data.image = replaceImage(data.image)
			  console.log(data.image)
		  })
		   this.orderDetail = obj
		   this.productList = this.orderDetail.cartInfo
	  },
	  // 处理物流信息
	  dealLogistic(obj,data){
		  let logInfo = {
			  name:data.order.delivery_name,
			  delivery_id:data.order.delivery_id,
			  logo:obj.logo
		  }
		  this.logistInfo = logInfo
		  const list = obj.list
		  const arr = list.map((x,index) => {
			  return{
				acceptStation: this.dealAcceptStation(x.status),
				createTime:x.time,
				status:this.dealStatus(x.status),
				phone:this.dealPhone(x.status),
				statusName:this.dealStatusName(x.status),
				isMainNode:this.dealStatusIsMainNode(x.status)
			  } 
		  })
		  this.tracesData = arr
		  console.log(this.tracesData)
	  },
	  dealAcceptStation(str){
		  return str
	  },
	  dealStatus(str){
		 return !!~str.indexOf('已签收') ? 'COMPLETE' : 'DELIVERING'
		 // return 'DELIVERING'
	  },
	  dealPhone(str){
		  return str.match(/[0-9]{11}/) ? str.match(/[0-9]{11}/).join('') : ''
		  // return ''
	  },
	  dealStatusName(str){
		  // return ~!!str.indexOf('已签收') ? '已签收' : (~!!str.indexOf('已揽收') ? '已揽收' : '运输中')
		  return !!~str.indexOf('已签收') ? '已签收' : (!!~str.indexOf('已揽收') ? '已揽收' : '运输中')
		  // return '运输中'
	  },
	  dealStatusIsMainNode(str){
		  if(!!~str.indexOf('已签收')){
			  return true
		  }else{
			  if(!!~str.indexOf('已揽收')){
				  return true
			  }else{
				  return false
			  }
		  }
		  // return false
	  },
	  // 复制文本
	  copyOrder(){
	
	  		  // #ifdef APP-PLUS
	  		  clipboard.setText();
			  plus.nativeUI.toast("已复制到剪贴板");
	  		  // #endif
	  }
	  
  }
}
</script>

<style lang="scss" scoped>
	page,.total-wrap{
		background-color: #f5f5f5;
		height: 100%;
		overflow: hidden;
	}
	.m-t{
		
		margin-top: 20upx;
	}
	
	.total-wrap {
	  width: 100vw;
	  height: 100%;
	  box-sizing: border-box;
	  background-color: #f5f5f5;
	  .logistics-title {
	    height: 72rpx;
	    box-sizing: border-box;
	    padding: 36rpx 0 8rpx;
	    line-height: 28rpx;
	    color: #4B4B4B;
	    font-size: 26rpx;
	    font-family: 'PingFangSC-Medium';
	    text-align: left;
	  }
}
	.product-wrapper{
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding:20upx 30upx 36upx;
		.product-image{
			width: 140upx;
			height: 140upx;
			margin-right: 20upx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}
		.product-info{
			flex: 1;
			line-height: 1.8;
			justify-content: space-between;
			color: $uni-text-color;
			font-size: 28upx;
			.p-title{
				display: flex;
				justify-content: space-between;
				.p-price{
					color: #666666;
				}
			}
			.p-other{
				display: flex;
				justify-content: space-between;
				color: #666;
			}
		}
	}
	.logistics-info{
		padding:30upx 34upx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.l-message{
			flex: .9;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image{
				width: 80upx;
				height: 80upx;
				margin-right: 20upx;
			}
			.l-text{
				line-height: 1.6;
			}
			.l-order{
				font-size: 28upx;
				width: 100%;
				color: $uni-text-color;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				text{
					color: #999;
					margin-right: 15upx;
				}
			}
		}
		.l-copy{
			padding: 5upx 8upx;
			color: #999;
			border: 1px solid $uni-border-color;
			border-radius: 10upx;
		}
	}
	.scroll-wrapper{
		background-color: #fff;
		padding:15upx 34upx 0;
		.track{
			background-color: #fff;
		}
		
	}
</style>
