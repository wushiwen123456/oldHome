(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/My/MyshopMessage/collect"],{6108:function(n,t,e){"use strict";var i=e("ada7"),o=e.n(i);o.a},ada7:function(n,t,e){},b671:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{winSize:!1,windowHeight:0,recordList:[{id:0,popu:!1},{id:1,popu:!1},{id:2,popu:!1}]}},onLoad:function(){this.getWindowSize()},methods:{getWindowSize:function(){var t=this;n.getSystemInfo({success:function(n){t.windowHeight=n.windowHeight}})},onLongPress:function(n){var t=this;t.recordList[n].popu=!0,t.winSize=!0},winSizeClick:function(){var n=this;n.winSize=!1,n.recordList.forEach(function(n){n.popu=!1})},delListClick:function(){this.winSizeClick()}}};t.default=e}).call(this,e("6e42")["default"])},bcea:function(n,t,e){"use strict";var i=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"a",function(){return i}),e.d(t,"b",function(){return o})},e037:function(n,t,e){"use strict";e.r(t);var i=e("b671"),o=e.n(i);for(var u in i)"default"!==u&&function(n){e.d(t,n,function(){return i[n]})}(u);t["default"]=o.a},f114:function(n,t,e){"use strict";(function(n){e("20d5"),e("921b");i(e("66fd"));var t=i(e("f6c2"));function i(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},f6c2:function(n,t,e){"use strict";e.r(t);var i=e("bcea"),o=e("e037");for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);e("6108");var c=e("2877"),a=Object(c["a"])(o["default"],i["a"],i["b"],!1,null,null,null);t["default"]=a.exports}},[["f114","common/runtime","common/vendor"]]]);