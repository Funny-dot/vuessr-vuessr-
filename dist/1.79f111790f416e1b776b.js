webpackJsonp([1],{204:function(t,e,n){"use strict";function s(t){n(212)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(208),r=n(214),o=n(86),c=s,i=o(a.a,r.a,!1,c,null,null);e.default=i.exports},208:function(t,e,n){"use strict";var s=function(t){t.store.dispatch("fetchBar")};e.a={asyncData:s,data:function(){return{dd:""}},mounted:function(){var t=this.$store;s({store:t})},computed:{goods:function(){return this.$store.state.bar}},created:function(t){}}},210:function(t,e,n){e=t.exports=n(202)(void 0),e.push([t.i,"",""])},212:function(t,e,n){var s=n(210);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n(203)("ce0a6510",s,!0,{})},214:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bar"},[n("h2",[t._v("异步Ajax数据：")]),n("span",[t._v(t._s(t.goods))])])},a=[],r={render:s,staticRenderFns:a};e.a=r}});