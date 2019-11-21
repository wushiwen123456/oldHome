import { HOST,HOSTWWW } from '@/common/const'

// 替换单个Url的路径
export function replaceImage(str){
	const reg = new RegExp(`${HOSTWWW}`)
	return str.replace(reg,HOST)
}

// 替换图片列表
export function	replaceList(list){
	const arr = list.map(item => {
		return replaceImage(item.image)
	})
	return arr
}

// 处理res图片
export function resDealImage(res,list){
	const arr = replaceList(res.data.data)
	list = res.data.data
	list.forEach((item,i) => {
		item.image = arr[i]
	})
	return list
}

// 替换图片列表
export function replaceImages(list){
	return list.map(item => replaceImage(item))
}


// 按钮是否加载中

function loading(number){
	const t = setInterval(() => {
		if(number!=0){
			number--
		}else{
			clearInterval(t)
			return 
		}
	})
}


// 在路径前拼上url

export function addUrl(path){
	console.log(path)
	console.log(HOST+'/'+path)
	return HOST+'/'+path
}