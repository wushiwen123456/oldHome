/**
 * 聊天数据处理接口
 */

// 服务器没有数据
function noNetWorkChat(){
	uni.setStorage({
		key:'messageall_key',
		data:[],
		success:() => {
			console.log('本地缓存数据清空')
		}
	})
}


// 服务器连接失败
function noNetWork(){
	console.log('服务器连接失败,请重试')
}


// 服务器和本地数据进行对比替换
function charCompare(netArr){
	const locArr = uni.getStorageSync('messageall_key')
	console.log('本地缓存为:' + locArr)
	let resArr = []
	if(netArr.length){
		netArr.forEach((x,index) => {
			const firstTime = x.messageList[0].add_time
			console.log('网络记录第一条时间为' + firstTime)
			// 声明结果数组,新消息数组
			let messageList = [],nextArr = []
			if(locArr){
				// 获取当前网络数据对应的本地数据数组
				let locArrCur = locArr[index] ? locArr[index].messageList : [],
				// 获取本地数据和第一条网络数据时间相同的索引值
				crossIndex = locArrCur.findIndex(y => Math.abs(y.add_time-firstTime) <= 10)
				console.log(firstTime)
				console.log(crossIndex)
				console.log(locArrCur)
				messageList = ~crossIndex ? locArrCur.slice(0,crossIndex).concat(x.messageList) : locArrCur.length ? locArrCur.concat(x.messageList) : x.messageList
				nextArr = locArrCur.length ? messageList.slice(locArrCur.length-1,messageList.length-1) : x.messageList
				
			}else{
				messageList = x.messageList
				nextArr = x.messageList
			}
			resArr.push({
				storeId:x.storeId,
				newMessageNum:nextArr.length,
				messageList,
				lastData:x.lastData,
				user:x.user,
				group_id:x.group_id
			})
		})
	}else{
		console.log('网络记录为空')
		resArr = locArr
	}
	return resArr || []
}

/**
 * 设置长连接开启
 * 
 */
function openWebScoket(){
	console.log('------')
	uni.connectSocket({
		url: 'ws://49.234.24.76:9502'
	})
}

export {
	noNetWorkChat,
	noNetWork,
	charCompare,
	openWebScoket
}


