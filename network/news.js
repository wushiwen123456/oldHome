// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'

// 獲取新聞列表
export function getNewsList(page,limit,seach,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/get_news_list'),
		data:{
			page,
			limit,
			seach
		},
		header:{
			token
		}
	})
}

// 獲取新聞詳情
export function getNewsDetail(id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/news_info'),
		data:{
			id
		},
		header:{
			token
		}
	})
}