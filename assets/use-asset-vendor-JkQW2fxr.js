import{g as c}from"./react-vendor-D8fagYP-.js";var a=function t(r,e){if(r===e)return!0;if(r&&e&&typeof r=="object"&&typeof e=="object"){if(r.constructor!==e.constructor)return!1;var o,f,u;if(Array.isArray(r)){if(o=r.length,o!=e.length)return!1;for(f=o;f--!==0;)if(!t(r[f],e[f]))return!1;return!0}if(r.constructor===RegExp)return r.source===e.source&&r.flags===e.flags;if(r.valueOf!==Object.prototype.valueOf)return r.valueOf()===e.valueOf();if(r.toString!==Object.prototype.toString)return r.toString()===e.toString();if(u=Object.keys(r),o=u.length,o!==Object.keys(e).length)return!1;for(f=o;f--!==0;)if(!Object.prototype.hasOwnProperty.call(e,u[f]))return!1;for(f=o;f--!==0;){var n=u[f];if(!t(r[n],e[n]))return!1}return!0}return r!==r&&e!==e};const l=c(a),i=[];function p(t,r,e,o=0,f=!1){for(const n of r)if(l(e,n.args)){if(f)return;if(n.error)throw n.error;if(n.response)return n.response;throw n.promise}const u={args:e,promise:t(...e).then(n=>u.response=n??!0).catch(n=>u.error=n??"unknown error").then(()=>{o>0&&setTimeout(()=>{const n=r.indexOf(u);n!==-1&&r.splice(n,1)},o)})};if(r.push(u),!f)throw u.promise}function d(t,...r){if(r===void 0||r.length===0)t.splice(0,t.length);else{const e=t.find(o=>l(r,o.args));if(e){const o=t.indexOf(e);o!==-1&&t.splice(o,1)}}}function s(t,...r){return p(t,i,r,s.lifespan)}s.lifespan=0;s.clear=(...t)=>d(i,...t);s.preload=(t,...r)=>void p(t,i,r,s.lifespan,!0);s.peek=(...t)=>{var r;return(r=i.find(e=>l(t,e.args)))==null?void 0:r.response};export{s as u};
