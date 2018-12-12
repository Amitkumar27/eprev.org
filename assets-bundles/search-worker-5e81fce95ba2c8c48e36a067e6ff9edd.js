(function(){'use strict';async function c(){if(c.index)return c.index;let q=await o.get('search-index');return q?h().then(()=>self.postMessage({type:'updated'})):q=await h(),c.index=q}function f(q,r=2){const s=[];q='-'+q.padEnd(r-2,'-')+'-';for(let u=0;u<q.length-r+1;++u)s.push(q.slice(u,u+r));return s}function g(q,r={},s=1){return q.reduce((u,w)=>{return u[w]=u[w]?u[w]+s:s,u},r)}async function h(){const q=await fetch('/index.json');if(q.ok){const r=await q.json();r.forEach(y=>{y.tokens=Object.keys(y.tokens).reduce((z,A)=>{const B=y.tokens[A],C=f(A,p);return g(C,z,B)},{})});const s=r.reduce((y,z)=>{return g(Object.keys(z.tokens),y)},{}),u=r.length,w=Object.keys(s).reduce((y,z)=>{return y[z]=Math.log(u/s[z]),y},{});r.forEach(y=>{for(let z in y.tokens)y.tokens[z]*=w[z]});const x={documents:r,idf:w};return o.set('search-index',x),x}throw new Error('Failed to fetch the index')}function j(q,r){const s=q.replace(/’/g,'\'').split(/[^A-Za-z0-9'-]+/).map(w=>w.toLowerCase().replace(/['-]/g,'')).filter(w=>1<w.length),u=s.reduce((w,x)=>w.concat(f(x,p)),[]).filter(w=>w in r);return g(u)}function k(q){return Math.sqrt(q.reduce((r,s)=>r+s*s,0))}function l(q,r){const s=new Set(Object.keys(q).concat(Object.keys(r))),u=[...s.values()].reduce((y,z)=>y+(q[z]||0)*(r[z]||0),0),w=k(Object.values(q)),x=k(Object.values(r));return u/(w*x)}async function m(q){const r=await c(),s=r.idf;let u=[];if(q){const w=j(q,s),x=Object.values(w).reduce((y,z)=>z>y?z:y,0);for(let y in w)w[y]=(0.5+0.5*w[y]/x)*s[y];0<Object.values(w).length&&(u=r.documents.reduce((y,z)=>{const A=l(z.tokens,w);return 0.1<A&&y.push({title:z.title,date:z.date,url:z.url,score:A}),y},[]).sort((y,z)=>z.score-y.score))}return u}self.addEventListener('message',q=>{const{type:r}=q.data;'init'===r?c().then(()=>self.postMessage({type:'ready'})).catch(s=>self.postMessage({type:'error',err:s})):'search'===r&&m(q.data.query).then(s=>self.postMessage({type:'results',results:s}))});const o=function(){function q(w,x){return u.then(y=>new Promise((z,A)=>{let B;const C=y.transaction('objects',w);C.oncomplete=()=>z(B),C.onabort=C.onerror=()=>A(C.error),B=x(C.objectStore('objects'))}))}const u=new Promise((w,x)=>{const y=indexedDB.open('idb-storage',1);y.onerror=()=>x(y.error),y.onsuccess=()=>w(y.result),y.onupgradeneeded=()=>y.result.createObjectStore('objects')});return{get:function(w){return q('readonly',x=>{return x.get(w)}).then(x=>x.result)},set:function(w,x){return q('readwrite',y=>{y.put(x,w)})}}}(),p=3})();