(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/jyf-Parser/index"],{"03c5":function(t,e,n){},"460a":function(t,e,n){"use strict";n.r(e);var o=n("8bea"),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=i.a},"8bea":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o,i=function(){return n.e("components/jyf-Parser/trees").then(n.bind(null,"e913"))},r=n("5106"),a=!0;try{o=n(!function(){var t=new Error("Cannot find module './document.js'");throw t.code="MODULE_NOT_FOUND",t}())}catch(u){}var s={name:"parser",data:function(){return{nodes:[],showAnimation:{},loadVideo:!1}},components:{trees:i},props:{html:{type:null,default:""},autocopy:{type:Boolean,default:!0},autopause:{type:Boolean,default:!0},autopreview:{type:Boolean,default:!0},autosetTitle:{type:Boolean,default:!0},imgMode:{type:String,default:"default"},lazyLoad:{type:Boolean,default:!1},selectable:{type:Boolean,default:!1},tagStyle:{type:Object,default:function(){return{}}},showWithAnimation:{type:Boolean,default:!1},animationDuration:{type:Number,default:400}},mounted:function(){this.execHtml(this.html),this.videoContext=[]},methods:{execHtml:function(e){var n=this,i={};if(this.showWithAnimation&&(i=t.createAnimation({duration:this.animationDuration,timingFunction:"ease"}).opacity(1).step().export()),e)if("string"==typeof e)r(e,this.tagStyle,this.imgMode).then(function(e){n.loadVideo=!1,n.nodes=e.nodes,n.showAnimation=i,n.imgList=e.imgList,n.test=1,o&&(n.document=new o("nodes",e.nodes,n)),e.title&&n.autosetTitle&&t.setNavigationBarTitle({title:e.title}),n.$emit("parser",e),n.ready()}).catch(function(t){n.$emit("error",{source:"parse",errMsg:t})});else if(e.constructor==Array)this.showAnimation=i,this.imgList=[],this.loadVideo=!1,o&&(this.document=new o("html",e,this)),this.ready();else if("object"==typeof e){if(!e.nodes||e.nodes.constructor!=Array){if(e.name&&e.children&&e.attrs||"text"==e.type)return;return void this.$emit("error",{source:"parse",errMsg:"传入的nodes数组格式不正确！应该传入的类型是array，实际传入的类型是："+typeof e.nodes})}this.showAnimation=i,this.imgList=e.imgList||[],this.loadVideo=!1,o&&(this.document=new o("html.nodes",e.nodes,this)),e.title&&this.autosetTitle&&t.setNavigationBarTitle({title:e.title}),this.ready()}else this.$emit("error",{source:"parse",errMsg:"错误的html类型："+typeof e});else this.nodes=[]},getContext:function(e){var n=this,o=!0,i=!1,r=void 0;try{for(var s,u=function(){var e=s.value,o=!1;if(!e.nodes)return{v:n.getContext(e.$children)};var i=!0,r=!1,u=void 0;try{for(var l,c=e.nodes[Symbol.iterator]();!(i=(l=c.next()).done);i=!0){var d=l.value;"img"!=d.name||o?"video"==d.name&&n.videoContext.push({id:d.attrs.id,context:t.createVideoContext(d.attrs.id,n)}):(o=!0,e.lazyLoad&&a?(e._observer=t.createIntersectionObserver(e),e._observer.relativeToViewport({top:1e3,bottom:1e3}).observe(".img",function(t){e.imgLoad=!0,e._observer.disconnect(),e._observer=null})):e.imgLoad=!0)}}catch(f){r=!0,u=f}finally{try{i||null==c.return||c.return()}finally{if(r)throw u}}n.getContext(e.$children)},l=e[Symbol.iterator]();!(o=(s=l.next()).done);o=!0){var c=u();if("object"===typeof c)return c.v}}catch(d){i=!0,r=d}finally{try{o||null==l.return||l.return()}finally{if(i)throw r}}},ready:function(){var e=this;this.$nextTick(function(){t.createSelectorQuery().in(e).select(".contain").boundingClientRect(function(t){e.$emit("ready",t)}).exec(),e.getContext(e.$children),setTimeout(function(){e.loadVideo=!0},1e3)})}},watch:{html:function(t){this.execHtml(t)}}};e.default=s}).call(this,n("6e42")["default"])},cc0c:function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return r}),n.d(e,"a",function(){return o})},e02b:function(t,e,n){"use strict";var o=n("03c5"),i=n.n(o);i.a},e407:function(t,e,n){"use strict";n.r(e);var o=n("cc0c"),i=n("460a");for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n("e02b");var a,s=n("f0c5"),u=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=u.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/jyf-Parser/index-create-component',
    {
        'components/jyf-Parser/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("e407"))
        })
    },
    [['components/jyf-Parser/index-create-component']]
]);
