export function clickDetail(image = []){
	if(image){
		// #ifdef APP-PLUS
		plus.nativeUI.previewImage([image])
		// #endif
	}
}