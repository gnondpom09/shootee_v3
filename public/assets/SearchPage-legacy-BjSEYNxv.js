System.register(["./index-legacy-22x3WcrL.js","./_plugin-vue_export-helper-legacy-DgAO6S8O.js"],(function(e,t){"use strict";var a,l,o,n,s,i,u,c,r,d,p,v;return{setters:[e=>{a=e.d,l=e.r,o=e.v,n=e.o,s=e.h,i=e.E,u=e.c,c=e.w,r=e.b,d=e.e,p=e.f},e=>{v=e._}],execute:function(){var t=document.createElement("style");t.textContent="#map[data-v-acb92754]{height:100%;width:100%;position:absolute;left:0;right:0;top:0;bottom:0}.mapboxgl-ctrl-top-right[data-v-acb92754]{right:0;bottom:55px!important}#autocomplete-container[data-v-acb92754]{position:absolute;top:10px;left:10px}#app[data-v-acb92754]{height:100%}\n",document.head.appendChild(t);const m="woos-fc8fe374-edf7-3d11-86b2-7e787c73d350",y={id:"app"},g=[i('<div id="autocomplete-container" data-v-acb92754><svg class="search-icon" viewBox="0 0 16 16" data-v-acb92754><path d="M3.617 7.083a4.338 4.338 0 1 1 8.676 0 4.338 4.338 0 0 1-8.676 0m4.338-5.838a5.838 5.838 0 1 0 2.162 11.262l2.278 2.279a1 1 0 0 0 1.415-1.414l-1.95-1.95A5.838 5.838 0 0 0 7.955 1.245" fill-rule="evenodd" clip-rule="evenodd" data-v-acb92754></path></svg><input type="text" id="autocomplete-input" placeholder="Search Localities..." autocomplete="off" data-v-acb92754><button aria-label="Clear" class="clear-searchButton" type="button" data-v-acb92754><svg class="clear-icon" viewBox="0 0 24 24" data-v-acb92754><path d="M7.074 5.754a.933.933 0 1 0-1.32 1.317L10.693 12l-4.937 4.929a.931.931 0 1 0 1.319 1.317l4.938-4.93 4.937 4.93a.933.933 0 0 0 1.581-.662.93.93 0 0 0-.262-.655L13.331 12l4.937-4.929a.93.93 0 0 0-.663-1.578.93.93 0 0 0-.656.261l-4.938 4.93z" data-v-acb92754></path></svg></button><ul id="suggestions-list" data-v-acb92754></ul></div><div id="map" data-v-acb92754></div>',2)],h=v(a({__name:"ExploreContainer",setup(e){let t,a,i,u,c,r;const d=l(null),p=l(null),v=l(null);function h(){if(d.value&&p.value&&d.value){c.input=d.value.value;const e={key:m,input:c.input,types:"locality|postal_code|address",components:"country:fr|country:es"};c.input?r(e).then((e=>{return l=e,void(d.value&&p.value&&v.value&&(p.value.innerHTML="",l.localities.length>0&&c.input?(l.localities.forEach((e=>{var l;const o=document.createElement("li");o.onmouseover=()=>{o.style.backgroundColor="#f2f2f2"},o.onmouseout=()=>{o.style.backgroundColor="#FFFFFF"},o.style.padding="12px",o.style.transition="background-color 0.3s ease",o.style.cursor="pointer",o.textContent=null!==(l=e.description)&&void 0!==l?l:"",o.addEventListener("click",(()=>{var l,o;d.value&&p.value&&(d.value.value=null!==(l=e.description)&&void 0!==l?l:"",p.value.style.display="none",o=e.public_id,u.getDetails({publicId:o}).then((e=>function(e){if(a&&(a.setMap(null),i.close()),null!=e&&e.geometry){a=new woosmap.map.Marker({position:e.geometry.location,icon:{url:"https://images.woosmap.com/marker.png",scaledSize:{height:50,width:32}}}),a.setMap(t),i.setContent(`<span id="${e.public_id}">${e.formatted_address}</span>`),i.open(t,a),console.log(e.geometry.location),t.flyTo({center:e.geometry.location,zoom:14});const l=document.getElementById(e.public_id);l&&(l.style.color="blue")}}(e.result))).catch((e=>console.error("Error getting locality details:",e))))})),p.value&&p.value.appendChild(o)})),p.value.style.display="block",v.value.style.display="block"):p.value.style.display="none"));var l})).catch((e=>console.error("Error autocomplete localities:",e))):p.value&&v.value&&(p.value.style.display="none",v.value.style.display="none")}}return o((()=>{const e=document.createElement("script");e.src=`https://sdk.woosmap.com/map/map.js?key=${m}&callback=initMap`,e.async=!0,document.body.appendChild(e),d.value=document.getElementById("autocomplete-input"),p.value=document.getElementById("suggestions-list"),v.value=document.getElementsByClassName("clear-searchButton")[0],e.addEventListener("load",(()=>{t=new woosmap.map.Map(document.getElementById("map"),{center:{lat:42.895328519999985,lng:1.7943832799999995},zoom:10,disableDefaultUI:!1,styles:[{featureType:"point_of_interest",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"point_of_interest.business.shop",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",stylers:[{lightness:-15}]}]}),new woosmap.map.Marker({position:t.getCenter(),icon:{url:"https://images.woosmap.com/marker.png",scaledSize:{height:50,width:32}}}).setMap(t),i=new woosmap.map.InfoWindow({}),u=new window.woosmap.map.LocalitiesService,c={input:"",types:["locality","address","postal_code"]},r=function(e,t){let a=null,l=null,o=null;return function(...n){return new Promise(((s,i)=>{null!==a&&clearTimeout(a),l=s,o=i,a=setTimeout((()=>{e(...n).then((e=>{l===s&&o===i&&s(e)})).catch((e=>{l===s&&o===i&&i(e)}))}),t)}))}}(u.autocomplete,0)})),d.value&&p.value&&(d.value.addEventListener("input",h),d.value.addEventListener("keydown",(e=>{if("Enter"===e.key&&p.value){const e=p.value.querySelector("li");e&&e.click()}})),v.value&&d.value&&p.value&&v.value.addEventListener("click",(()=>{d.value&&p.value&&v.value&&(d.value.value="",p.value.style.display="none",v.value.style.display="none",a&&(a.setMap(null),i.close()),d.value.focus())})))})),document.addEventListener("click",(e=>{!e.target.closest("#autocomplete-container")&&p.value&&(p.value.style.display="none")})),(e,t)=>(n(),s("div",y,g))}}),[["__scopeId","data-v-acb92754"]]);e("default",a({__name:"SearchPage",setup:e=>(e,t)=>{const a=r("ion-title"),l=r("ion-toolbar"),o=r("ion-header"),s=r("ion-content"),i=r("ion-page");return n(),u(i,null,{default:c((()=>[d(o,null,{default:c((()=>[d(l,null,{default:c((()=>[d(a,{class:"oswald-title"},{default:c((()=>[p("SHOOTEE")])),_:1})])),_:1})])),_:1}),d(s,null,{default:c((()=>[d(h)])),_:1})])),_:1})}}))}}}));