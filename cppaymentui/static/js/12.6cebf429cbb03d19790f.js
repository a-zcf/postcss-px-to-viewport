webpackJsonp([12],{W2VP:function(t,n,s){(t.exports=s("FZ+f")(!0)).push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"profitstoday.vue",sourceRoot:""}])},fR2L:function(t,n,s){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=s("P9l9"),i=s("RpLG"),e={name:"profitstoday",data:function(){return{currentTime:"",totalAmount:0,list:[]}},mounted:function(){var t=this;t.currentTime=i.a.getDaySartEnd().currentTime,t.$postRequest(a.profitsRecordDay,{startDate:i.a.getDaySartEnd().sart,endDate:i.a.getDaySartEnd().end}).then(function(n){0===n.data.code&&(t.totalAmount=n.data.data.saleRecord.totalAmount,t.list=n.data.data.saleRecord.list)})},methods:{}},l=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"sellingtoday"},[s("router-link",{staticClass:"link",attrs:{to:"/businessadmin"}},[s("i",{staticClass:"iconfont icon-fanhui fanhui"}),t._v(" "),s("span",[t._v("返回")])]),t._v(" "),s("div",{staticClass:"list_title"},[s("span",{staticClass:"time"},[t._v("当前时间："+t._s(t.currentTime))]),t._v(" "),s("span",{staticClass:"total"},[t._v("总额："+t._s(t.totalAmount))])]),t._v(" "),0!=t.list.length?s("div",{staticClass:"sell_list"},[s("ul",{staticClass:"sell"},t._l(t.list,function(n,a){return s("li",{key:a},[s("span",{staticClass:"brandName"},[t._v(t._s(n.brandName))]),t._v(" "),s("span",{staticClass:"list_width"},[t._v(t._s(n.time))]),t._v(" "),s("span",{staticClass:"total_color"},[t._v(t._s(n.amount))])])}),0)]):t._e(),t._v(" "),0==t.list.length?s("div",{staticClass:"list-null"},[t._m(0)]):t._e()],1)};l._withStripped=!0;var o={render:l,staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"conter"},[n("i",{staticClass:"iconfont icon-zanwushuju"}),this._v(" "),n("p",[this._v("空空如也~~")])])}]},r=o;var c=!1;var u=s("VU/8")(e,r,!1,function(t){c||s("z7/f")},null,null);u.options.__file="src/views/businessadmin/profitstoday/profitstoday.vue";n.default=u.exports},"z7/f":function(t,n,s){var a=s("W2VP");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("rjj0")("576675b8",a,!1,{})}});
//# sourceMappingURL=12.6cebf429cbb03d19790f.js.map