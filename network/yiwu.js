/**
 * 义乌平台
 */
// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'


// 发布
export function yi_publish(data,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/barter_publish'),
		data,
		header:{
			token
		},
		method:"POST"
	})
}

// 获取列表信息
export function yi_list(data,page,limit,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/barter_list'),
		data:{
			city:data.city,
			cate_id:data.cate_id || '',
			page:page,
			limit:limit
		},
		header:{
			token
		}
	})
}

// 请求详情数据
export function getDetailData(id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/barter_info'),
		data:{
			id
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 提交申请
export function sendApply(obj,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/contact'),
		data:obj,
		header:{
			token
		},
		method:"POST",
		showModel:true
	})
}