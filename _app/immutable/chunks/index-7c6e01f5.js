function $(){}function Q(t,e){for(const n in e)t[n]=e[n];return t}function U(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function P(t){return t()}function H(){return Object.create(null)}function y(t){t.forEach(P)}function D(t){return typeof t=="function"}function pt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let b;function gt(t,e){return b||(b=document.createElement("a")),b.href=e,t===b.href}function W(t){return Object.keys(t).length===0}function V(t,...e){if(t==null)return $;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function yt(t,e,n){t.$$.on_destroy.push(V(e,n))}function bt(t,e,n,i){if(t){const r=G(t,e,n,i);return t[0](r)}}function G(t,e,n,i){return t[1]&&i?Q(n.ctx.slice(),t[1](i(e))):n.ctx}function xt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],c=Math.max(e.dirty.length,r.length);for(let o=0;o<c;o+=1)u[o]=e.dirty[o]|r[o];return u}return e.dirty|r}return e.dirty}function wt(t,e,n,i,r,u){if(r){const c=G(e,n,i,u);t.p(c,r)}}function $t(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let E=!1;function X(){E=!0}function Y(){E=!1}function Z(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function tt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let s=0;s<e.length;s++){const f=e[s];f.claim_order!==void 0&&l.push(f)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const s=e[l].claim_order,f=(r>0&&e[n[r]].claim_order<=s?r+1:Z(1,r,d=>e[n[d]].claim_order,s))-1;i[l]=n[f]+1;const a=f+1;n[a]=l,r=Math.max(a,r)}const u=[],c=[];let o=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(u.push(e[l-1]);o>=l;o--)c.push(e[o]);o--}for(;o>=0;o--)c.push(e[o]);u.reverse(),c.sort((l,s)=>l.claim_order-s.claim_order);for(let l=0,s=0;l<c.length;l++){for(;s<u.length&&c[l].claim_order>=u[s].claim_order;)s++;const f=s<u.length?u[s]:null;t.insertBefore(c[l],f)}}function et(t,e){if(E){for(tt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function nt(t,e,n){t.insertBefore(e,n||null)}function it(t,e,n){E&&!n?et(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function v(t){t.parentNode&&t.parentNode.removeChild(t)}function vt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function z(t){return document.createElement(t)}function rt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function A(t){return document.createTextNode(t)}function Et(){return A(" ")}function Nt(){return A("")}function kt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Tt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function At(t){return t===""?null:+t}function ct(t){return Array.from(t.childNodes)}function F(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function I(t,e,n,i,r=!1){F(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const o=t[c];if(e(o)){const l=n(o);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),o}}for(let c=t.claim_info.last_index-1;c>=0;c--){const o=t[c];if(e(o)){const l=n(o);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,o}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function lt(t,e,n,i){return I(t,r=>r.nodeName===e,r=>{const u=[];for(let c=0;c<r.attributes.length;c++){const o=r.attributes[c];n[o.name]||u.push(o.name)}u.forEach(c=>r.removeAttribute(c))},()=>i(e))}function St(t,e,n){return lt(t,e,n,z)}function st(t,e){return I(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>A(e),!0)}function jt(t){return st(t," ")}function L(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function Mt(t,e){const n=L(t,"HTML_TAG_START",0),i=L(t,"HTML_TAG_END",n);if(n===i)return new B(void 0,e);F(t);const r=t.splice(n,i-n+1);v(r[0]),v(r[r.length-1]);const u=r.slice(1,r.length-1);for(const c of u)c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new B(u,e)}function Ct(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Ht(t,e){t.value=e??""}function Lt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Bt(t,e,n){t.classList[n?"add":"remove"](e)}class ut{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=rt(n.nodeName):this.e=z(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)nt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(v)}}class B extends ut{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)it(this.t,this.n[n],e)}}function qt(t,e){return new t(e)}let g;function _(t){g=t}function S(){if(!g)throw new Error("Function called outside component initialization");return g}function Ot(t){S().$$.on_mount.push(t)}function Pt(t){S().$$.after_update.push(t)}const p=[],q=[],x=[],O=[],R=Promise.resolve();let k=!1;function J(){k||(k=!0,R.then(j))}function Dt(){return J(),R}function T(t){x.push(t)}const N=new Set;let m=0;function j(){if(m!==0)return;const t=g;do{try{for(;m<p.length;){const e=p[m];m++,_(e),ot(e.$$)}}catch(e){throw p.length=0,m=0,e}for(_(null),p.length=0,m=0;q.length;)q.pop()();for(let e=0;e<x.length;e+=1){const n=x[e];N.has(n)||(N.add(n),n())}x.length=0}while(p.length);for(;O.length;)O.pop()();k=!1,N.clear(),_(t)}function ot(t){if(t.fragment!==null){t.update(),y(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(T)}}const w=new Set;let h;function at(){h={r:0,c:[],p:h}}function ft(){h.r||y(h.c),h=h.p}function K(t,e){t&&t.i&&(w.delete(t),t.i(e))}function _t(t,e,n,i){if(t&&t.o){if(w.has(t))return;w.add(t),h.c.push(()=>{w.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Gt(t,e){const n=e.token={};function i(r,u,c,o){if(e.token!==n)return;e.resolved=o;let l=e.ctx;c!==void 0&&(l=l.slice(),l[c]=o);const s=r&&(e.current=r)(l);let f=!1;e.block&&(e.blocks?e.blocks.forEach((a,d)=>{d!==u&&a&&(at(),_t(a,1,1,()=>{e.blocks[d]===a&&(e.blocks[d]=null)}),ft())}):e.block.d(1),s.c(),K(s,1),s.m(e.mount(),e.anchor),f=!0),e.block=s,e.blocks&&(e.blocks[u]=s),f&&j()}if(U(t)){const r=S();if(t.then(u=>{_(r),i(e.then,1,e.value,u),_(null)},u=>{if(_(r),i(e.catch,2,e.error,u),_(null),!e.hasCatch)throw u}),e.current!==e.pending)return i(e.pending,0),!0}else{if(e.current!==e.then)return i(e.then,1,e.value,t),!0;e.resolved=t}}function zt(t,e,n){const i=e.slice(),{resolved:r}=t;t.current===t.then&&(i[t.value]=r),t.current===t.catch&&(i[t.error]=r),t.block.p(i,n)}function Ft(t){t&&t.c()}function It(t,e){t&&t.l(e)}function dt(t,e,n,i){const{fragment:r,after_update:u}=t.$$;r&&r.m(e,n),i||T(()=>{const c=t.$$.on_mount.map(P).filter(D);t.$$.on_destroy?t.$$.on_destroy.push(...c):y(c),t.$$.on_mount=[]}),u.forEach(T)}function ht(t,e){const n=t.$$;n.fragment!==null&&(y(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function mt(t,e){t.$$.dirty[0]===-1&&(p.push(t),J(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Rt(t,e,n,i,r,u,c,o=[-1]){const l=g;_(t);const s=t.$$={fragment:null,ctx:[],props:u,update:$,not_equal:r,bound:H(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:H(),dirty:o,skip_bound:!1,root:e.target||l.$$.root};c&&c(s.root);let f=!1;if(s.ctx=n?n(t,e.props||{},(a,d,...M)=>{const C=M.length?M[0]:d;return s.ctx&&r(s.ctx[a],s.ctx[a]=C)&&(!s.skip_bound&&s.bound[a]&&s.bound[a](C),f&&mt(t,a)),d}):[],s.update(),f=!0,y(s.before_update),s.fragment=i?i(s.ctx):!1,e.target){if(e.hydrate){X();const a=ct(e.target);s.fragment&&s.fragment.l(a),a.forEach(v)}else s.fragment&&s.fragment.c();e.intro&&K(t.$$.fragment),dt(t,e.target,e.anchor,e.customElement),Y(),j()}_(l)}class Jt{$destroy(){ht(this,1),this.$destroy=$}$on(e,n){if(!D(n))return $;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!W(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Dt as A,$ as B,bt as C,wt as D,$t as E,xt as F,et as G,yt as H,Gt as I,zt as J,q as K,At as L,gt as M,Ht as N,kt as O,vt as P,y as Q,Bt as R,Jt as S,B as T,Mt as U,Et as a,it as b,jt as c,ft as d,Nt as e,K as f,at as g,v as h,Rt as i,Pt as j,z as k,St as l,ct as m,Tt as n,Ot as o,Lt as p,A as q,st as r,pt as s,_t as t,Ct as u,qt as v,Ft as w,It as x,dt as y,ht as z};
