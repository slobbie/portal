import{j as n,c as t,m as e}from"./index-BrFvIqVz.js";import{r as s}from"./react-vendor-D8fagYP-.js";import{V as m,ai as p}from"./three-vendor-Hsu1XpJN.js";import{R as d,B as f,C as u}from"./three-rapier-vendor-BqkSz_Qm.js";import{a as c}from"./react-three-fiber-vendor-B7wf-OD6.js";import{G as h,a as g}from"./react-three-drei-vendor-B1KMtS5F.js";const F=({vec:l=new m,scale:r})=>{const o=s.useRef(null),i=p.randFloatSpread;return c((y,a)=>{o.current&&(a=Math.min(.1,a),o.current.applyImpulse(l.copy(o.current.translation()).normalize().multiply({x:-50*a*r,y:-150*a*r,z:-50*a*r}),!1))}),n(d,{linearDamping:.75,angularDamping:.15,friction:.2,position:[i(20),i(20)-25,i(20)-10],ref:o,colliders:!1,children:[t(f,{args:[r]}),t(u,{rotation:[Math.PI/2,0,0],position:[0,0,1.2*r],args:[.15*r,.275*r]}),t(s.Suspense,{children:t(h,{castShadow:!0,receiveShadow:!0,src:e.ball,scale:40})})]})};g.preload(e.ball);export{F as default};
