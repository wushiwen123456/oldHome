(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/register"],{"04e5":function(e,n,t){"use strict";(function(e){t("20d5"),t("921b");o(t("66fd"));var n=o(t("e8f9"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},2147:function(e,n,t){},"2b56":function(e,n,t){"use strict";var o=t("2147"),i=t.n(o);i.a},"35e9":function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})},"6b1e":function(e,n,t){"use strict";t.r(n);var o=t("f14d"),i=t.n(o);for(var s in o)"default"!==s&&function(e){t.d(n,e,function(){return o[e]})}(s);n["default"]=i.a},e8f9:function(e,n,t){"use strict";t.r(n);var o=t("35e9"),i=t("6b1e");for(var s in i)"default"!==s&&function(e){t.d(n,e,function(){return i[e]})}(s);t("2b56");var a=t("2877"),c=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=c.exports},f14d:function(e,n,t){"use strict";(function(e,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=t("9126"),s=(t("0307"),function(){return t.e("components/watch-login/watch-button").then(t.bind(null,"b51c"))}),a=function(){return Promise.all([t.e("common/vendor"),t.e("components/w-picker/w-picker")]).then(t.bind(null,"d694"))},c={components:{wButton:s,wPicker:a},data:function(){return{windowHeight:0,phone:"",password:"",nickname:"",idnum:"",men:-1,isRotate:!1,selectList:[{label:"男",value:0},{label:"女",value:1}],sex:"",code:"",isSend:!1,downTime:60,isLoading:!1}},onLoad:function(){var n=this;e.getSystemInfo({success:function(e){n.windowHeight=e.windowHeight,console.log(o("屏幕高度为"+e.windowHeight," at pages\\login\\register.vue:104"))}})},methods:{startLogin:function(){var n=this;if(!n.isRotate)if(/^1[3456789]\d{9}$/.test(this.phone))if(console.log(o(n.password.length," at pages\\login\\register.vue:121")),n.password.length<6)e.showToast({title:"密码最少为6位",icon:"none"});else{var t=/^[\u4e00-\u9fa5]{2,4}$/;if(t.test(n.nickname))if(n.men<0)e.showToast({title:"请选择性别",icon:"none"});else{var s=/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;if(!s.test(this.idnum))return e.showToast({title:"请输入正确的身份证号",icon:"none"}),!1;n.isRotate=!0,setTimeout(function(){n.isRotate=!1},3e3);var a={phone:n.phone,pwd:n.password,name:n.nickname,card:n.idnum,sex:n.men,code:n.code};(0,i.register)(a).then(function(n){200!==n.data.code?e.showToast({title:n.data.msg,icon:"none"}):e.navigateTo({url:"login?phone=".concat(a.phone)})})}else e.showToast({title:"请输入真实姓名",icon:"none"})}else e.showToast({title:"请输入正确的手机号",icon:"none"})},shopTypeClick:function(){this.$refs.picker.show()},onConfirm:function(e){console.log(o(JSON.stringify(e)," at pages\\login\\register.vue:188")),this.sex=e.result,this.men=e.checkArr.value,console.log(o(this.men," at pages\\login\\register.vue:191"))},codeTap:function(){var n=this;/^1[3456789]\d{9}$/.test(this.phone)?(0,i.sendCode)(this.phone).then(function(t){if(200==t.data.code){n.isSend=!0;var o=setInterval(function(){if(0==n.downTime)return clearInterval(o),void(n.isSend=!1);n.downTime--},1e3);n.downTime=60}else e.showToast({title:"未知错误",icon:"none"})}):e.showToast({title:"请输入正确的手机号",icon:"none"})}},computed:{codeText:function(){return this.isSend?"等待中"+this.downTime:"发送验证码"}}};n.default=c}).call(this,t("6e42")["default"],t("0de9")["default"])}},[["04e5","common/runtime","common/vendor"]]]);