import{A as k,u as F}from"./useMarkers-B64KoKZB.js";import{d as b,r as E,y as O,o as w,h as z,A as N,c as P,w as m,b as v,e as f,f as $}from"./index--va98jub.js";import{_ as D}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./marker.service-aPnsa370.js";const V={id:"app"},W=N('<div id="autocomplete-container" data-v-31516740><svg class="search-icon" viewBox="0 0 16 16" data-v-31516740><path d="M3.617 7.083a4.338 4.338 0 1 1 8.676 0 4.338 4.338 0 0 1-8.676 0m4.338-5.838a5.838 5.838 0 1 0 2.162 11.262l2.278 2.279a1 1 0 0 0 1.415-1.414l-1.95-1.95A5.838 5.838 0 0 0 7.955 1.245" fill-rule="evenodd" clip-rule="evenodd" data-v-31516740></path></svg><input type="text" id="autocomplete-input" placeholder="Search Localities..." autocomplete="off" data-v-31516740><button aria-label="Clear" class="clear-searchButton" type="button" data-v-31516740><svg class="clear-icon" viewBox="0 0 24 24" data-v-31516740><path d="M7.074 5.754a.933.933 0 1 0-1.32 1.317L10.693 12l-4.937 4.929a.931.931 0 1 0 1.319 1.317l4.938-4.93 4.937 4.93a.933.933 0 0 0 1.581-.662.93.93 0 0 0-.262-.655L13.331 12l4.937-4.929a.93.93 0 0 0-.663-1.578.93.93 0 0 0-.656.261l-4.938 4.93z" data-v-31516740></path></svg></button><ul id="suggestions-list" data-v-31516740></ul></div><div id="map" data-v-31516740></div>',2),q=[W],H=b({__name:"ExploreContainer",setup(L){let u,s,i,p,c,_;const n=E(null),t=E(null),l=E(null),{setMarkersOnMap:C}=F();O(()=>{const e=document.createElement("script");e.src="https://sdk.woosmap.com/map/map.js?key=".concat(k,"&callback=initMap"),e.async=!0,document.body.appendChild(e),n.value=document.getElementById("autocomplete-input"),t.value=document.getElementById("suggestions-list"),l.value=document.getElementsByClassName("clear-searchButton")[0],e.addEventListener("load",()=>{M()}),n.value&&t.value&&(n.value.addEventListener("input",x),n.value.addEventListener("keydown",a=>{if(a.key==="Enter"&&t.value){const o=t.value.querySelector("li");o&&o.click()}}),l.value&&n.value&&t.value&&l.value.addEventListener("click",()=>{n.value&&t.value&&l.value&&(n.value.value="",t.value.style.display="none",l.value.style.display="none",s&&(s.setMap(null),i.close()),n.value.focus())}))});function M(){u=new woosmap.map.Map(document.getElementById("map"),{zoom:5,disableDefaultUI:!1,styles:[{featureType:"point_of_interest",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"point_of_interest.business.shop",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",stylers:[{lightness:-15}]}]}),C(u),i=new woosmap.map.InfoWindow({}),p=new window.woosmap.map.LocalitiesService,c={input:"",types:["locality","address","postal_code"]},_=T(p.autocomplete,0)}function x(){if(n.value&&t.value&&n.value){c.input=n.value.value;const e={key:k,input:c.input,types:"locality|postal_code|address",components:"country:fr|country:es"};c.input?_(e).then(a=>S(a)).catch(a=>console.error("Error autocomplete localities:",a)):t.value&&l.value&&(t.value.style.display="none",l.value.style.display="none")}}function B(e){p.getDetails({publicId:e}).then(a=>I(a.result)).catch(a=>console.error("Error getting locality details:",a))}function I(e){if(s&&(s.setMap(null),i.close()),e!=null&&e.geometry){s=new woosmap.map.Marker({position:e.geometry.location,icon:{url:"https://images.woosmap.com/marker.png",scaledSize:{height:50,width:32}}}),s.setMap(u),i.setContent('<span id="'.concat(e.public_id,'">').concat(e.formatted_address,"</span>")),i.open(u,s),u.flyTo({center:e.geometry.location,zoom:14});const a=document.getElementById(e.public_id);a&&(a.style.color="blue")}}function S(e){n.value&&t.value&&l.value&&(t.value.innerHTML="",e.localities.length>0&&c.input?(e.localities.forEach(a=>{var r;const o=document.createElement("li");o.onmouseover=()=>{o.style.backgroundColor="#f2f2f2"},o.onmouseout=()=>{o.style.backgroundColor="#FFFFFF"},o.style.padding="12px",o.style.transition="background-color 0.3s ease",o.style.cursor="pointer",o.textContent=(r=a.description)!=null?r:"",o.addEventListener("click",()=>{var d;n.value&&t.value&&(n.value.value=(d=a.description)!=null?d:"",t.value.style.display="none",B(a.public_id))}),t.value&&t.value.appendChild(o)}),t.value.style.display="block",l.value.style.display="block"):t.value.style.display="none")}document.addEventListener("click",e=>{!e.target.closest("#autocomplete-container")&&t.value&&(t.value.style.display="none")});function T(e,a){let o=null,r=null,d=null;return function(...A){return new Promise((y,g)=>{o!==null&&clearTimeout(o),r=y,d=g,o=setTimeout(()=>{e(...A).then(h=>{r===y&&d===g&&y(h)}).catch(h=>{r===y&&d===g&&g(h)})},a)})}}return(e,a)=>(w(),z("div",V,q))}}),R=D(H,[["__scopeId","data-v-31516740"]]),J=b({__name:"SearchPage",setup(L){return(u,s)=>{const i=v("ion-title"),p=v("ion-toolbar"),c=v("ion-header"),_=v("ion-content"),n=v("ion-page");return w(),P(n,null,{default:m(()=>[f(c,null,{default:m(()=>[f(p,null,{default:m(()=>[f(i,{class:"oswald-title"},{default:m(()=>[$("SHOOTEE")]),_:1})]),_:1})]),_:1}),f(_,null,{default:m(()=>[f(R)]),_:1})]),_:1})}}});export{J as default};