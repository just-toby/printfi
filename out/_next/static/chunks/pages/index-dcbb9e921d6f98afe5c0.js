_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{"/EDR":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n("23aj")}])},"23aj":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));var c=n("nKUr"),r=n("g4pe"),i=n.n(r),a=n("q1tI"),s=n("vRNQ"),o=n.n(s),j=n("Zy2o"),l=n("rePB"),u=n("HcfI"),b=n("GBGB"),O=n("D9/j"),d=n("yAcr");function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var h=function(){Object(a.useContext)(b.a).address;var e=Object(a.useContext)(d.a),t=e.assets,n=e.loadMore,r=e.loading,i=Object(a.useState)(!1),s=i[0],j=i[1],l=Object(a.useState)(0),f=l[0],h=l[1],x=Object(a.useRef)(null),g=Object(O.b)({loading:r,indicator:Object(c.jsx)(O.a,{width:"50"})}),m=g.containerProps,w=g.indicatorEl;return Object(a.useEffect)((function(){var e=x.current;null!=e&&s&&(console.log("trying to reset scroll"),e.scrollIntoView(),j(!1))}),[t]),Object(c.jsxs)("div",{className:o.a.main,children:[Object(c.jsx)("div",{className:o.a.grid,children:t.map((function(e,t){return Object(c.jsx)("span",{ref:t===f?x:null,className:o.a.cardSpan,children:Object(c.jsx)(u.a,{name:e.name,uri:e.image_url,link:{pathname:"/customize",query:{index:String(t)}},height:500,width:350},e.id)})}))}),Object(c.jsx)("section",p(p({},m),{},{children:w})),Object(c.jsx)("div",{className:o.a.footer,children:Object(c.jsx)("a",{href:"#",onClick:function(){h(t.length-1),j(!0),n()},children:"Load More"})})]})};function x(){var e=Object(a.useContext)(b.a).connected;return Object(c.jsxs)("div",{className:o.a.container,children:[Object(c.jsxs)(i.a,{children:[Object(c.jsx)("title",{children:"Print.Fi"}),Object(c.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),Object(c.jsx)(j.a,{subPage:"print"}),Object(c.jsx)("main",{className:o.a.main,children:e?Object(c.jsx)(h,{}):Object(c.jsx)("p",{className:o.a.title,children:"digital art you can feel"})})]})}}},[["/EDR",0,2,1,3,4]]]);