(function(){"use strict";var e={837:function(e,a,l){var n=l(9242),t=l(3396);const o=(0,t._)("div",{id:"app"},null,-1);function i(e,a,l,n,i,s){const r=(0,t.up)("falling-leaf");return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t.Wm)(r),o],64)}var s=l(4870);function r(e,a,l,n,o,i){const s=(0,t.up)("flower-leaf");return(0,t.wg)(),(0,t.iD)("div",null,[((0,t.wg)(),(0,t.iD)(t.HY,null,(0,t.Ko)(12,(e=>(0,t.Wm)(s,{key:`leaf-${e}`}))),64))])}var u=l(7139);const c=["src"];function d(e,a,l,n,o,i){return(0,t.wg)(),(0,t.iD)("img",{class:"flower-leaf",src:e.imageUrl,alt:"leaf",style:(0,u.j5)(e.LeafStyle)},null,12,c)}var g=(0,t.aZ)({name:"FlowerLeaf",setup(){const e=(e,a)=>Math.random()*(a-e)+e,a=()=>e(0,12)+"s",l=()=>e(0,360)+"deg",n=()=>e(0,100)+"%",o=(a,l)=>e(a,l)+"s",i=(0,t.Fl)((()=>({"--fall-delay":a(),"--shake-delay":a(),"--shake-degree":l(),"--left-position":n(),"--translate-x":e(20,80)+"px","--fall-duration":o(9,16),"--shake-duration":o(2,3)}))),s=(0,t.Fl)((()=>{const e=Math.floor(5*Math.random()+1);return`/wedding/images/floral-leaf/floral-leaf-${e}.png`}));return{LeafStyle:i,imageUrl:s}}}),m=l(89);const p=(0,m.Z)(g,[["render",d],["__scopeId","data-v-cce10c3c"]]);var v=p,h=(0,t.aZ)({name:"FallingLeaf",components:{FlowerLeaf:v},setup(){return{}}});const f=(0,m.Z)(h,[["render",r]]);var b=f;l(560),(0,t.aZ)({name:"FireCracker",setup(){const e=(0,s.iH)([]),a=["#FF5733","#33FF57","#3357FF","#F5FF33","#FF33F0"];return(0,t.bv)((()=>{for(let l=0;l<50;l++){const n=a[Math.floor(Math.random()*a.length)],t=Math.random()*window.innerWidth,o=3+5*Math.random()+"s",i=100*(Math.random()-.5)+t,s=Math.random()*window.innerHeight-100;e.value.push({id:l,style:{backgroundColor:n,left:t+"px",animationDuration:o,animationTimingFunction:"cubic-bezier(.17,.67,.83,.67)",animationName:"fall, move"+(l%2===0?"Right":"Left"),top:s+"px"},endLeft:i+"px"})}})),{papers:e}}});(0,t.aZ)({setup(){}});l.p,l.p,l.p,l(4050);(0,t.aZ)({setup(){const e=(0,s.qj)({callBookItems:[{role:"신랑",name:"황태환",call:"01062318996",message:"01062318996"},{role:"신랑 아버지",name:"황남현",call:"",message:""},{role:"신랑 어머니",name:"박경화",call:"",message:""},{role:"",name:""},{role:"신부",name:"김유라",call:"",message:""},{role:"신부 아버지",name:"김한광",call:"",message:""},{role:"신부 어머니",name:"이미혜",call:"",message:""}],callImage:l(4050),messageImage:l(4924)}),a=(0,s.iH)(!1),n=(0,s.iH)(null),o=e=>{e.stopPropagation(),a.value=!a.value},i=e=>{n.value&&!n.value.contains(e.target)&&(a.value=!1)};return(0,t.bv)((()=>{document.addEventListener("click",i)})),(0,t.Jd)((()=>{document.removeEventListener("click",i)})),{...(0,s.BK)(e),showCallBook:a,callBookRef:n,handleOnClick:o}}});function y(e,a,l,o,i,s){const r=(0,t.Q2)("lazy");return e.visible?((0,t.wg)(),(0,t.iD)("div",{key:0,class:(0,u.C_)(["carousel-overlay",{"fade-carousel":!e.isLoaded}]),onClick:a[3]||(a[3]=(...a)=>e.hide&&e.hide(...a))},[(0,t._)("div",{class:"carousel-container",onClick:a[2]||(a[2]=(0,n.iM)((()=>{}),["stop"]))},[(0,t._)("button",{class:(0,u.C_)(["prev",{firstImage:0===e.activeImageIndex}]),onClick:a[0]||(a[0]=(...a)=>e.prevImage&&e.prevImage(...a))},null,2),(0,t.wy)(((0,t.wg)(),(0,t.iD)("img",{alt:"Carousel Image",key:e.activeImageIndex,class:(0,u.C_)({"fade-image":!e.isImageLoaded})},null,2)),[[r,e.images[e.activeImageIndex]]]),(0,t._)("button",{class:(0,u.C_)(["next",{lastImage:e.activeImageIndex===e.images.length-1}]),onClick:a[1]||(a[1]=(...a)=>e.nextImage&&e.nextImage(...a))},null,2)])],2)):(0,t.kq)("",!0)}var w=(0,t.aZ)({props:{images:{type:Array,required:!0},visible:{type:Boolean,default:!1},index:{type:Number,required:!0}},setup(e,{emit:a}){const l=(0,s.qj)({activeImageIndex:e.index,isLoaded:!1,isImageLoaded:!1});(0,t.YP)((()=>e.index),(e=>{l.activeImageIndex=e})),(0,t.YP)((()=>e.visible),(e=>{e?(l.isLoaded=!1,setTimeout((()=>{l.isLoaded=!0}),700)):l.isLoaded=!1}));const n=()=>{l.isImageLoaded?(l.isImageLoaded=!1,setTimeout((()=>{l.isImageLoaded=!0}),1e3)):l.isImageLoaded=!1},o=()=>{a("update:visible",!1)},i=()=>{l.activeImageIndex>0&&(l.activeImageIndex--,n())},r=()=>{l.activeImageIndex<e.images.length-1&&(l.activeImageIndex++,n())};return{...(0,s.BK)(l),hide:o,prevImage:i,nextImage:r}}});const I=(0,m.Z)(w,[["render",y],["__scopeId","data-v-114cbce8"]]);var L=I;l.p;(0,t.aZ)({name:"PageSeparator"});const k=e=>((0,t.dD)("data-v-365b472c"),e=e(),(0,t.Cn)(),e),x={class:"select-box"},C={class:"selected-value"},_=k((()=>(0,t._)("span",{class:"arrow"},null,-1))),D={class:"options"},F=["id","value","checked"],H=["for"],O=["for","title"];function j(e,a,l,o,i,s){return(0,t.wg)(),(0,t.iD)("div",x,[(0,t._)("div",{class:"selected",onClick:a[0]||(a[0]=(...a)=>e.toggleDropdown&&e.toggleDropdown(...a))},[(0,t._)("div",C,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e.selectedOptions,((e,a)=>((0,t.wg)(),(0,t.iD)("div",{key:a,class:(0,u.C_)({"selected-option":"option"===e.type,"additional-option":"additional"===e.type})},(0,u.zw)(e.label),3)))),128))]),_]),(0,t.wy)((0,t._)("div",D,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e.options,((l,o)=>((0,t.wg)(),(0,t.iD)("div",{class:"option",key:o},[(0,t.wy)((0,t._)("input",{class:"custom-checkbox",type:"checkbox","onUpdate:modelValue":a[1]||(a[1]=a=>e.selectedValues=a),id:l.value,value:l.value,checked:e.selectedValues.includes(l.value),onChange:a[2]||(a[2]=(...a)=>e.handleOptionChange&&e.handleOptionChange(...a))},null,40,F),[[n.e8,e.selectedValues]]),(0,t._)("label",{for:l.value},null,8,H),(0,t._)("label",{for:l.value,class:"option-label",title:l.label},(0,u.zw)(l.label),9,O)])))),128))],512),[[n.F8,e.showDropdown]])])}var Y=(0,t.aZ)({name:"SelectBox",props:{value:{type:Array,default:()=>[]},options:{type:Array,default:()=>[]},placeholder:{type:String,default:""}},setup(e,{emit:a}){const l=(0,s.qj)({}),n=(0,s.iH)(!1),o=(0,s.iH)(e.value),i=(0,t.Fl)((()=>{const a=o.value.map((a=>e.options.find((e=>e?.value===a))));return 0===a.length?[{type:"placeholder",label:`${e.placeholder}`}]:1===a.length?[{type:"option",label:a[0]?.label}]:[{type:"option",label:a[0]?.label},{type:"additional",label:"+ "+(a.length-1)}]})),r=l=>{if(l.stopPropagation(),"ALL"===l.target.value){const n=l.target.checked?e.options.map((e=>e.value)):[];a("change",n)}else{const l=e.options.map((({value:e})=>e));if(l.includes("ALL")){const e=o.value.filter((e=>"ALL"!==e)).length===l.length-1;a("change",e?l:o.value.filter((e=>"ALL"!==e)))}else a("change",o.value)}},u=()=>{n.value=!n.value},c=e=>{const a=e.target,l=document.querySelector(".select-box");l&&l.contains(a)||(n.value=!1)};return(0,t.YP)((()=>e.value),(e=>{o.value=e})),{...(0,s.BK)(l),showDropdown:n,selectedValues:o,selectedOptions:i,handleOptionChange:r,toggleDropdown:u,onDocumentClick:c}},mounted(){document.addEventListener("click",this.onDocumentClick)},beforeUnmount(){document.removeEventListener("click",this.onDocumentClick)}});const Z=(0,m.Z)(Y,[["render",j],["__scopeId","data-v-365b472c"]]);var M=Z;(0,t.aZ)({name:"PhotoGallery",components:{SelectBox:M},setup(){const e=(0,s.qj)({yearOptions:[{label:"전체",value:"ALL"},{label:"2014",value:"2014",images:["2014-0","2014-1","2014-2","2014-3","2014-4","2014-5","2014-6","2014-7","2014-8"]},{label:"2015",value:"2015",images:["2015-0","2015-1"]},{label:"2016",value:"2016",images:["2016-0","2016-1","2016-2"]},{label:"2017",value:"2017",images:["2017-0"]},{label:"2018",value:"2018",images:["2018-0"]},{label:"2019",value:"2019",images:["2019-0"]},{label:"2020",value:"2020",images:["2020-0"]},{label:"2021",value:"2021",images:["2021-0"]},{label:"2022",value:"2022",images:["2022-0"]},{label:"2023",value:"2023",images:["2023-0"]}],selectedValues:[]}),a=(0,t.Fl)((()=>e.selectedValues.map((a=>{const l=e.yearOptions.find((e=>e.value===a));return l&&l.images?{year:l.value,images:l.images}:null})).filter(Boolean))),l=a=>{a.includes("ALL")?e.selectedValues=e.yearOptions.map((e=>e.value)):e.selectedValues=a};return{...(0,s.BK)(e),galleryItems:a,handleOptionChange:l}}});(0,t.aZ)({name:"WeddingCountdown",setup(){const e=(0,s.iH)(0),a=(0,s.iH)(0),l=(0,s.iH)(0),n=(0,s.iH)(0),o=new Date(2024,1,3,18,0,0),i=e=>{let a=String(e);return e<10&&(a="0"+a),Array.from(a).map(Number)},r=(0,t.Fl)((()=>({days:e.value,hours:a.value,minutes:l.value,seconds:n.value}))),u=()=>{const t=new Date,i=o.getTime()-t.getTime();i>=0&&(e.value=Math.floor(i/864e5),a.value=Math.floor(i%864e5/36e5),l.value=Math.floor(i%36e5/6e4),n.value=Math.floor(i%6e4/1e3))};let c;return(0,t.bv)((()=>{u(),c=setInterval(u,1e3)})),(0,t.Ah)((()=>{clearInterval(c)})),{daysLeft:e,hoursLeft:a,minutesLeft:l,secondsLeft:n,splitNumber:i,timeUnits:r}}});const P={class:"year-card-container"},A=["src"],B={class:"year-label"};function T(e,a,l,n,o,i){return(0,t.wg)(),(0,t.iD)("div",P,[(0,t._)("div",{class:(0,u.C_)(["year-card",{active:e.isActive,bounce:e.isBounce&&e.bounce}]),onClick:a[0]||(a[0]=(...a)=>e.selectYear&&e.selectYear(...a))},[(0,t._)("img",{class:"thumbnail",src:e.yearImageMap[e.year],alt:"Year Thumbnail"},null,8,A),(0,t._)("div",B,(0,u.zw)(e.year),1)],2)])}var S=(0,t.aZ)({name:"YearCard",props:{year:{type:Number,require:!0},bounce:{type:Boolean,default:!1}},setup(e,{emit:a}){const l=(0,s.iH)(!1),n=(0,s.iH)(!1),t=(0,s.iH)({2014:"/wedding/gallery/thumbnail/thumbnail-2014.jpg",2015:"/wedding/gallery/thumbnail/thumbnail-2015.jpg",2016:"/wedding/gallery/thumbnail/thumbnail-2016.jpg",2017:"/wedding/gallery/thumbnail/thumbnail-2017.jpg",2018:"/wedding/gallery/thumbnail/thumbnail-2018.jpg",2019:"/wedding/gallery/thumbnail/thumbnail-2019.jpg",2020:"/wedding/gallery/thumbnail/thumbnail-2020.jpg",2021:"/wedding/gallery/thumbnail/thumbnail-2014.jpg",2022:"/wedding/gallery/thumbnail/thumbnail-2015.jpg",2023:"/wedding/gallery/thumbnail/thumbnail-2016.jpg"}),o=t=>{t.stopPropagation(),l.value=!0,n.value=!1,setTimeout((()=>{l.value=!1,n.value=!0}),600),a("click",e.year)};return{isActive:l,isBounce:n,yearImageMap:t,selectYear:o}}});const q=(0,m.Z)(S,[["render",T],["__scopeId","data-v-19dcc07c"]]);var $=q;const K={class:"title"},V={class:"images-wrapper"},U=["onClick"],z={class:"image"},N=["src"];function E(e,a,l,n,o,i){const s=(0,t.up)("image-carousel");return(0,t.wg)(),(0,t.iD)("div",{class:"year-images-container",onScroll:a[1]||(a[1]=(...a)=>e.handleScroll&&e.handleScroll(...a))},[(0,t._)("span",K,(0,u.zw)(e.year)+"년, 우리",1),e.showingCarousel?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("button",{key:0,onClick:a[0]||(a[0]=(...a)=>e.closePopup&&e.closePopup(...a))},"X")),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e.imageOptions,((a,l)=>((0,t.wg)(),(0,t.iD)("div",{class:"images-container",key:`image-${l}`},[(0,t._)("div",V,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(a.images,((a,l)=>((0,t.wg)(),(0,t.iD)("div",{class:"image-item",key:`item-${a}`,onClick:a=>e.showCarousel(l)},[(0,t._)("div",z,[(0,t._)("img",{src:`/wedding/gallery/${e.year}/${a}`,alt:"Image",class:"fade-in"},null,8,N)])],8,U)))),128))])])))),128)),(0,t.Wm)(s,{images:e.carouselImages,visible:e.showingCarousel,index:e.selectedIndex,"onUpdate:visible":e.closeCarousel},null,8,["images","visible","index","onUpdate:visible"])],32)}var W=(0,t.aZ)({props:{year:{type:Number,required:!0}},components:{ImageCarousel:L},setup(e,{emit:a}){const l=(0,s.qj)({imageOptions:[],lastLoadedIndex:0,imagesToLoad:30,maxImagesPerYear:{2014:13,2015:16,2016:16,2017:16,2018:16,2019:16,2020:16,2021:16,2022:16,2023:16},showingCarousel:!1,selectedIndex:0}),n=()=>{const a=l.maxImagesPerYear[e.year]||0;if(l.lastLoadedIndex>=a)return;const n=[];for(let t=0;t<l.imagesToLoad;t++){const o=l.lastLoadedIndex+t;if(o>=a)break;n.push(`${e.year}-${o}.jpg`)}l.imageOptions.push({value:e.year.toString(),images:n}),l.lastLoadedIndex+=n.length},o=e=>{const a=e.target;a.scrollHeight-a.scrollTop<=a.clientHeight+500&&n()},i=()=>{a("close"),document.body.classList.remove("no-scroll")},r=(0,t.Fl)((()=>l.imageOptions.reduce(((a,l)=>{const n=l.images.map((a=>`/wedding/gallery/${e.year}/${a}`));return a.concat(n)}),[]))),u=e=>{l.showingCarousel=!0,l.selectedIndex=e},c=()=>{l.showingCarousel=!1};return(0,t.bv)((()=>{document.body.classList.add("no-scroll"),n()})),(0,t.Jd)((()=>{document.body.classList.remove("no-scroll")})),{...(0,s.BK)(l),carouselImages:r,handleScroll:o,closePopup:i,showCarousel:u,closeCarousel:c}}});const J=(0,m.Z)(W,[["render",E],["__scopeId","data-v-06899e04"]]);var R=J;(0,t.aZ)({components:{YearCard:$,YearImages:R},setup(){const e=(0,s.iH)(Array.from({length:10},((e,a)=>2014+a))),a=(0,s.iH)(!1),l=(0,s.iH)(null),n=e=>{l.value=e,setTimeout((()=>{a.value=!0}),700)},t=()=>{a.value=!1};return{years:e,showYearImagesPopup:a,selectedYear:l,handleYearClick:n,handleCloseYearImagesPopup:t}}});var G=(0,t.aZ)({name:"App",components:{FallingLeaf:b},setup(){const e=(0,s.iH)(!1);return(0,t.bv)((()=>{setTimeout((()=>{e.value=!0}),3e3)})),{isLoaded:e}}});const Q=(0,m.Z)(G,[["render",i]]);var X=Q,ee=l(2644);const ae=(0,n.ri)(X);ae.use(ee.Z,{}),ae.mount("#app")},4924:function(e,a,l){e.exports=l.p+"img/message.f9c80a41.png"},4050:function(e,a,l){e.exports=l.p+"img/phone.52d0cae2.png"}},a={};function l(n){var t=a[n];if(void 0!==t)return t.exports;var o=a[n]={exports:{}};return e[n].call(o.exports,o,o.exports,l),o.exports}l.m=e,function(){var e=[];l.O=function(a,n,t,o){if(!n){var i=1/0;for(c=0;c<e.length;c++){n=e[c][0],t=e[c][1],o=e[c][2];for(var s=!0,r=0;r<n.length;r++)(!1&o||i>=o)&&Object.keys(l.O).every((function(e){return l.O[e](n[r])}))?n.splice(r--,1):(s=!1,o<i&&(i=o));if(s){e.splice(c--,1);var u=t();void 0!==u&&(a=u)}}return a}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[n,t,o]}}(),function(){l.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(a,{a:a}),a}}(),function(){l.d=function(e,a){for(var n in a)l.o(a,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:a[n]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){l.p="/wedding/"}(),function(){var e={143:0};l.O.j=function(a){return 0===e[a]};var a=function(a,n){var t,o,i=n[0],s=n[1],r=n[2],u=0;if(i.some((function(a){return 0!==e[a]}))){for(t in s)l.o(s,t)&&(l.m[t]=s[t]);if(r)var c=r(l)}for(a&&a(n);u<i.length;u++)o=i[u],l.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return l.O(c)},n=self["webpackChunkwedding"]=self["webpackChunkwedding"]||[];n.forEach(a.bind(null,0)),n.push=a.bind(null,n.push.bind(n))}();var n=l.O(void 0,[998],(function(){return l(837)}));n=l.O(n)})();
//# sourceMappingURL=app.37c1a5c4.js.map