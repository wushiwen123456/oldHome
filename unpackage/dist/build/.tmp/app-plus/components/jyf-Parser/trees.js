(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/jyf-Parser/trees"],{"19ca":function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){return Promise.resolve().then(r.bind(null,"5623"))},n={components:{trees:o},name:"trees",data:function(){return{controls:{},imgLoad:!1}},props:{nodes:{type:Array,default:[]},lazyLoad:{type:Boolean,default:!1},loadVideo:{type:Boolean,default:!1},imgMode:{type:String,default:"default"}},mounted:function(){this._top=this.$parent;while("parser"!=this._top.$options.name){if(this._top._top){this._top=this._top._top;break}this._top=this._top.$parent}},beforeDestroy:function(){this._observer&&this._observer.disconnect()},methods:{playEvent:function(t){if(this._top.videoContext.length>1&&this._top.autopause){var e=!0,r=!1,o=void 0;try{for(var n,i=this._top.videoContext[Symbol.iterator]();!(e=(n=i.next()).done);e=!0){var a=n.value;a.id!=t.currentTarget.dataset.id&&a.context.pause()}}catch(s){r=!0,o=s}finally{try{e||null==i.return||i.return()}finally{if(r)throw o}}}},previewEvent:function(e){e.currentTarget.dataset.ignore||(this._top.autopreview&&t.previewImage({current:e.currentTarget.dataset.src,urls:this._top.imgList.length?this._top.imgList:[e.currentTarget.dataset.src]}),this._top.$emit("imgtap",{src:e.currentTarget.dataset.src}))},tapEvent:function(e){this._top.$emit("linkpress",{href:e.currentTarget.dataset.href}),e.currentTarget.dataset.href&&(/^http/.test(e.currentTarget.dataset.href)?this._top.autocopy&&t.setClipboardData({data:e.currentTarget.dataset.href,success:function(){t.showToast({title:"链接已复制"})}}):t.navigateTo({url:e.currentTarget.dataset.href}))},triggerError:function(t,e,r,o){this._top.$emit("error",{source:t,target:e,errMsg:r,errCode:o})},loadSource:function(t){!this.controls[t.id]&&t.source.length>1?this.$set(this.controls,t.id,{play:!1,index:1}):this.controls[t.id]&&t.source.length>this.controls[t.id].index+1&&this.$set(this.controls[t.id],"index",this.controls[t.id].index+1)},adError:function(t){this.triggerError("ad",t.currentTarget,"",t.detail.errorCode)},videoError:function(t){this.loadSource(t.currentTarget.dataset),this.triggerError("video",t.currentTarget,t.detail.errMsg)},audioError:function(t){this.loadSource(t.currentTarget.dataset),this.triggerError("audio",t.currentTarget,t.detail.errMsg)},_loadVideo:function(t){this.loadVideo&&(this.controls[t.currentTarget.dataset.id]={play:!0,index:0})}}};e.default=n}).call(this,r("6e42")["default"])},5623:function(t,e,r){"use strict";r.r(e);var o=r("9c63"),n=r("b2ce");for(var i in n)"default"!==i&&function(t){r.d(e,t,function(){return n[t]})}(i);r("9333");var a=r("2877"),s=r("7e9e"),u=Object(a["a"])(n["default"],o["a"],o["b"],!1,null,null,null);"function"===typeof s["a"]&&Object(s["a"])(u),e["default"]=u.exports},"7e9e":function(t,e,r){"use strict";var o=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])};e["a"]=o},"7ff8":function(t,e,r){},9333:function(t,e,r){"use strict";var o=r("7ff8"),n=r.n(o);n.a},"9c63":function(t,e,r){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},n=[];r.d(e,"a",function(){return o}),r.d(e,"b",function(){return n})},b2ce:function(t,e,r){"use strict";r.r(e);var o=r("19ca"),n=r.n(o);for(var i in o)"default"!==i&&function(t){r.d(e,t,function(){return o[t]})}(i);e["default"]=n.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/jyf-Parser/trees-create-component',
    {
        'components/jyf-Parser/trees-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("5623"))
        })
    },
    [['components/jyf-Parser/trees-create-component']]
]);                
