(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ShopDetails/affirm/affirmIntegral"],{"0cef":function(t,e,a){"use strict";var n=a("7859"),o=a.n(n);o.a},"3e7b":function(t,e,a){"use strict";a.r(e);var n=a("d376"),o=a("b06c");for(var r in o)"default"!==r&&function(t){a.d(e,t,function(){return o[t]})}(r);a("0cef");var s=a("2877"),i=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,"532bdeb4",null);e["default"]=i.exports},"40d3":function(t,e,a){"use strict";(function(t){a("dead"),a("921b");n(a("66fd"));var e=n(a("3e7b"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},7859:function(t,e,a){},9586:function(t,e,a){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a("58c8"),r=a("0ef8"),s=(a("58c8"),a("6cba"));a("2f62");function i(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var d=function(){return a.e("components/uni-popup/uni-popup").then(a.bind(null,"ae8a"))},c={components:{uniPopup:d},data:function(){return i({totalIntegral:"",shareShow:!1,Noaddress:!1,isCard:!0,discountsType:!1,count:"",cartId:"",token:"",cartInfo:[],address:{},disCountList:[],curDiscountList:[],currentIndex:0,currentIndex2:0,currentPayVal:"",key:"",mark:"",orderId:""},"token","")},onReady:function(){},onLoad:function(){},onShow:function(){this.token=this.$store.getters.isToken,this.cartId=this.$store.state.integralId,this.cartId?(this.userAddresss(this.token),this.payIntegral(this.cartId,this.token)):t.showToast({title:"未知错误",icon:"none",success:function(){t.switchTab({url:"../../Home/home"})}})},methods:{userAddresss:function(e){var a=this;(0,r.getAddress)(e).then(function(e){200==e.data.code&&(console.log(n(e," at pages\\ShopDetails\\affirm\\affirmIntegral.vue:144")),0==e.data.data.length?t.showModal({title:"您还没有设置默认地址，快去设置吧",cancelColor:"#333333",confirmColor:"#333333",showCancel:!1,confirmText:"立即设置",success:function(e){e.confirm&&t.navigateTo({url:"../../My/address/AllAddress"})}}):(a.Noaddress=!0,a.address=e.data.data,a.$store.commit("setShoppingAddress",a.address)))}).catch(function(t){console.log(n(t," at pages\\ShopDetails\\affirm\\affirmIntegral.vue:171"))})},payIntegral:function(e,a){var r=this;(0,o.payIntegral)(e,a).then(function(e){if(console.log(n(e," at pages\\ShopDetails\\affirm\\affirmIntegral.vue:179")),200==e.data.code){var a=e.data.data.cartInfo;a.forEach(function(t){t.productInfo.image=(0,s.replaceImage)(t.productInfo.image)}),r.totalIntegral=e.data.data.priceGroup.totalPrice,r.key=e.data.data.cartId,r.orderId=e.data.data.orderKey,r.cartInfo=a}else t.switchTab({url:"../../Home/home",success:function(){t.showToast({title:"未知错误"})}})})},shippingAddressClick:function(){t.navigateTo({url:"../../My/address/AllAddress"})},addAddressClick:function(){t.navigateTo({url:"../../My/address/addAddress"})},submitOrderClick:function(){this.dealData()},dealData:function(){var e=this,a={};a.addressId=this.address.id,a.mark=this.mark||"",a.key=this.orderId,a.payType="integral",t.showModal({title:"确定要提交订单么",content:"请认真核对您的收货地址,确保地址正确",success:function(n){n.confirm&&(0,o.gitOrder)(a,e.token).then(function(e){200==e.data.code?t.redirectTo({url:"Integral_success"}):t.showToast({title:e.data.msg,icon:"none"})})}})}}};e.default=c}).call(this,a("6e42")["default"],a("0de9")["default"])},b06c:function(t,e,a){"use strict";a.r(e);var n=a("9586"),o=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e["default"]=o.a},d376:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=(t._self._c,Math.round(t.totalIntegral));t.$mp.data=Object.assign({},{$root:{g0:a}})},o=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return o})}},[["40d3","common/runtime","common/vendor"]]]);