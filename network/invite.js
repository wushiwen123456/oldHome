// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'

// 招聘列表
export function inviteList(page,limit,cate,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/zp_list'),
		data:{
			page,limit,cate
		},
		header:{
			token
		}
	})
}
// 招聘详情

export function inviteDetail(id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/zp_details'),
		data:{
			id
		},
		header:{
			token
		}
	})
}

// 招聘发布
export function zp_push(obj,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/zp_publish'),
		data:{
			...obj
		},
		header:{
			token
		},
		method:"POST"
	})
}


// 求职发布
export function qz_push(obj,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/qz_publish'),
		data:{
			...obj
		},
		header:{
			token
		},
		method:"POST"
	})
}


// 供应发布
export function pushPublish(obj,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/gy_publish'),
		data:{
			...obj
		},
		header:{
			token
		},
		method:"POST"
	})
}