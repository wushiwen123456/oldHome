import { HOST,HOSTWWW } from '@/common/const'
// 导入地区文件
import area from '@/components/w-picker/city-data/area' //区
import city from '@/components/w-picker/city-data/city'  //市
import province from '@/components/w-picker/city-data/province' //省

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


// 省市区拆分
export function splitAddress(str){
	const arr = []
	
}


// 对地区文件进行处理返回数据格式
export function getAddress(area,city,province){
	const arr = []
	province.forEach((item,index) => {
		item.children = city[index]
		
		item.children.forEach((t,i) => {
			t.children = area[index][i]
		})
		arr.push(item)
	})
	return arr
}