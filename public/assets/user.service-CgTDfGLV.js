import{Q as c,R as i,S as r,Z as f,$ as n,a0 as l,T as m,a1 as u,a2 as p}from"./index-CIosSCPW.js";const a=c();async function d(e,s,t){const o=n(r(a,"users"),e);return await l(o,{id:e,pseudo:s,email:t,avatar:"",inscriptionDate:m.fromDate(new Date)})}function w(){return i(r(a,"users"))}function y(e){return f(n(a,"users/".concat(e)))}async function R(e,s){const t=n(r(a,"users"),e);return await u(t,{firstname:s})}async function U(e,s){const t=n(r(a,"users"),e);return await u(t,{avatar:s})}async function g(e){const s=n(r(a,"users"),e);return await p(s)}export{w as a,U as b,d as c,y as g,g as r,R as u};
