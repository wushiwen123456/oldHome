(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ShopDetails/shopDetails"],{"34b4":function(e,t,o){"use strict";var i=o("3706"),n=o.n(i);n.a},3706:function(e,t,o){},"409c":function(e,t,o){"use strict";(function(e,i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o("2f62"),s=o("74d3"),r=o("0307");function a(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},i=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),i.forEach(function(t){p(e,t,o[t])})}return e}function c(e){return l(e)||f(e)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function l(e){if(Array.isArray(e)){for(var t=0,o=new Array(e.length);t<e.length;t++)o[t]=e[t];return o}}function p(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var m=function(){return o.e("components/numberbox/numberbox").then(o.bind(null,"1875"))},h=function(){return o.e("components/uni-popup/uni-popup").then(o.bind(null,"11ec"))},d={components:{uniPopup:h,tuiNumberbox:m},data:function(){var e;return{payimgType:!0,swiperNum:0,videoUrl:"",swiperList:[],getCurrentList:[],list:[],value:1,shareList:[],itemInfo:(e={price:"",oldPrice:"",count:"",ficti:"",sales:0,cost:"",isHot:"",isPostage:!1,isSeckill:!1,isGroup:!1,userCollect:!1},p(e,"count",""),p(e,"name",""),p(e,"type",[]),p(e,"count",0),p(e,"totalTypes",[]),p(e,"image",""),p(e,"id",""),p(e,"stock",""),p(e,"unique",""),e),storeInfo:{info:{expressageFen:"",produceFen:"",serviceFen:"",totalFen:"",storeName:"",storeLogo:"",storeId:""},shopFans:"",isUserCollect:!1},recommend:[]}},onLoad:function(e){this._getDetailData(e.id)},methods:{_getDetailData:function(e){var t=this;(0,s.getDetailData)(e).then(function(e){var o=e.data.data.storeInfo,i=(0,r.replaceImages)(o.slider_image);i.forEach(function(e,o){t.swiperList.push({url:e,id:o,type:"image"})}),t.itemInfo.id=o.id,t.itemInfo.price=o.price,t.itemInfo.oldPrice=o.ot_price,t.itemInfo.count=parseInt(o.give_integral),t.itemInfo.ficti=o.ficti,t.itemInfo.cost=o.cost,t.itemInfo.isHot=o.is_hot,t.itemInfo.isPostage=o.is_postage,t.itemInfo.isSeckill=o.is_seckill,t.itemInfo.isGroup=o.is_group,t.itemInfo.userCollect=o.userCollect,t.itemInfo.name=o.store_name,t.itemInfo.sales=o.sales,t.itemInfo.image=(0,r.replaceImage)(o.image),t.itemInfo.stock=o.stock,t.list=c(e.data.data.productAttr),t.itemInfo.totalTypes=e.data.data.productValue;var n=e.data.data.shop_info;t.storeInfo.info.expressageFen=n.expressage_score,t.storeInfo.info.produceFen=n.product_score,t.storeInfo.info.serviceFen=n.service_score,t.storeInfo.info.storeId=n.shop_id,t.storeInfo.info.storeLogo=(0,r.replaceImage)(n.shop_logo),t.storeInfo.info.storeName=n.shop_name,t.storeInfo.info.totalFen=n.zong,t.recommend=e.data.data.recommend_goods;(0,r.replaceList)(e.data.data.recommend_goods);t.recommend.forEach(function(e){e.image=(0,r.replaceImage)(e.image)})})},selectShopClick:function(e,t,o){e.check?e.check=!1:(this.list[o].attr_value.forEach(function(e){e.check=!1}),e.check=!0),this.itemInfo.type=[],this.getCurrent()},getCurrent:function(){var e=this;if(!this.list)return[];var t=this.list.map(function(e){return e.attr_value.filter(function(e){return e.check})});t.forEach(function(t){t.length&&e.itemInfo.type.push(t[0].attr)})},selectimageClick:function(){this.isVideo&&(this.payimgType=!0,this.swiperNum=1)},selectPlayClick:function(){this.isVideo&&(this.payimgType=!1,this.swiperNum=0)},swiperChange:function(e){this.swiperNum=e.target.current,this.isVideo&&(0==this.swiperNum?this.payimgType=!1:this.payimgType=!0)},serviceClick:function(t){e.navigateTo({url:"informtion/informtion?shopname="+t})},change:function(e){this.value=e.value},nowBuyClick:function(){if(this.isToken){var t=this.itemInfo.totalTypes[this.itemInfo.type];if(void 0==t)return void e.showToast({title:"请先选择种类",icon:"none"});this.itemInfo.unique=t.unique;var o={count:this.value,unique:this.itemInfo.unique};this.$store.commit("keepAffirmInfo",o),e.navigateTo({url:"affirm/affirmOrder"})}else e.navigateTo({url:"../login/login"})},collectClick:function(e){},shopClick:function(t){e.navigateTo({url:"StoreDetails/storedetails?id="+t})},outloginClick:function(){this.$refs.popups.open()},closePopupsClick:function(){this.$refs.popups.close()},outloginSharClick:function(){this.$refs.popup.open()},closePopupsSharClick:function(){this.$refs.popup.close()},outloginShopClick:function(){this.$refs.popupbottom.open()},closePopupsShopClick:function(){this.$refs.popupbottom.close()},addCart:function(){var t=this;if(this.isToken){var o=this.itemInfo.totalTypes[this.itemInfo.type];if(console.log(i(o," at pages\\ShopDetails\\shopDetails.vue:552")),console.log(i(this.itemInfo.totalTypes," at pages\\ShopDetails\\shopDetails.vue:553")),Object.keys(this.itemInfo.totalTypes).length)if(void 0!==o){this.itemInfo.unique=o.unique;var n={productId:this.itemInfo.id,cartNum:this.value,uniqueId:this.itemInfo.unique,shop_id:this.storeInfo.info.storeId};(0,s.getAddCart)(n,this.isToken).then(function(o){console.log(i(o," at pages\\ShopDetails\\shopDetails.vue:567")),200==o.data.code&&(e.showToast({title:"添加成功",icon:"none"}),t.$store.commit("addCart",n))}),this.$refs.popupbottom.close()}else this.itemInfo.unique="",e.showToast({title:"请填写商品属性",icon:"none"});else e.showToast({title:"暂无此商品",icon:"none"})}else e.navigateTo({url:"../login/login"})}},computed:a({},(0,n.mapGetters)(["isToken"]),{isVideo:function(){return!this.swiperList.every(function(e){return"image"==e.type})},showImgUrl:function(){if(this.itemInfo.totalTypes)return this.itemInfo.type.length&&this.itemInfo.totalTypes[this.itemInfo.type.join(",")]?(0,r.replaceImage)(this.itemInfo.totalTypes[this.itemInfo.type.join(",")].image):(0,r.replaceImage)(this.itemInfo.image)},selectimg:function(){var e=this,t=[];return Object.keys(this.itemInfo.totalTypes).forEach(function(o){t.push((0,r.replaceImage)(e.itemInfo.totalTypes[o].image))}),t.splice(0,4)},isChooseType:function(){var e=this.list.map(function(e){return e.attr_name});return e.join("  ")}})};t.default=d}).call(this,o("6e42")["default"],o("0de9")["default"])},a113:function(e,t,o){"use strict";o.r(t);var i=o("aedc"),n=o("ae5e");for(var s in n)"default"!==s&&function(e){o.d(t,e,function(){return n[e]})}(s);o("34b4");var r=o("2877"),a=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,null,null);t["default"]=a.exports},ae5e:function(e,t,o){"use strict";o.r(t);var i=o("409c"),n=o.n(i);for(var s in i)"default"!==s&&function(e){o.d(t,e,function(){return i[e]})}(s);t["default"]=n.a},aedc:function(e,t,o){"use strict";var i=function(){var e=this,t=e.$createElement,o=(e._self._c,Object.keys(this.itemInfo.totalTypes));e.$mp.data=Object.assign({},{$root:{g0:o}})},n=[];o.d(t,"a",function(){return i}),o.d(t,"b",function(){return n})},f1a2:function(e,t,o){"use strict";(function(e){o("20d5"),o("921b");i(o("66fd"));var t=i(o("a113"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("6e42")["createPage"])}},[["f1a2","common/runtime","common/vendor"]]]);