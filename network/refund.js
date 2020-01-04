// 登录注册相关的方法方法
import http from '@/common/http.js'

// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'

// 获取退款理由
export function getRegard(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/get_refund_reason'),
		header:{
			token
		},
		showModel:true
	})
}
// 发布退款申请
export function publishRegard(data,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/apply_order_refund'),
		data:{
			text:data.text,
			refund_reason_wap_img:data.refund_reason_wap_img,
			refund_reason_wap_explain:data.refund_reason_wap_explain,
			uni:data.uni
		},
		header:{
			token
		},
		method:"POST",
		showModel:true
	})
}