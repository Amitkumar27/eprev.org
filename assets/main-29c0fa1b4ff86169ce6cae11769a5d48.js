(function(){'use strict';function a(I,J){let K=!1;return function(...M){K||(K=!0,requestAnimationFrame(()=>{I.apply(J,M),K=!1}))}}function c(I){function J(){return void 0!==$}function K(ba){!_&&B(ba.deltaX)>B(ba.deltaY)&&(ba.preventDefault(),X=Q(ba.deltaX))}function L(ba){if(!_){_=!0;let ca=ba.clientX,da=X;const ea=ha=>{da=Q(ha.clientX-ca)},fa=()=>{$.classList.remove('scrollbar--active'),X=da,document.removeEventListener('mousemove',ea),document.removeEventListener('mouseup',fa),_=!1};$.classList.add('scrollbar--active'),document.addEventListener('mousemove',ea),document.addEventListener('mouseup',fa)}}function M(ba){if(!(_||1<ba.touches.length)){_=!0;let ca=ba.touches[0].clientX,da=ba.touches[0].clientY,ea=X,fa=!1,ha=!1;const ia=ka=>{if(!(1<ka.touches.length)){const la=ka.touches[0].clientX-ca;if(!fa){const ma=ka.touches[0].clientY-da;B(la)>B(ma)&&(ha=!0),fa=!0}ha&&(ea=Q(-la))}},ja=()=>{_=!1,X=ea,document.removeEventListener('touchmove',ia),document.removeEventListener('touchen',ja),document.removeEventListener('touchcancel',ja)};document.addEventListener('touchmove',ia),document.addEventListener('touchend',ja),document.addEventListener('touchcancel',ja)}}function N(){$=document.createElement('div'),$.classList.add('scrollbar'),$.classList.add('scrollbar--horizontal'),I.style.touchAction='pan-y',O(),I.appendChild($),I.addEventListener('wheel',K),I.addEventListener('touchstart',M),$.addEventListener('mousedown',L)}function O(){const ba=A(C(U*U/V),D);Z=(V-U)/(U-ba),Y=U-ba,$.style.width=ba+'px',[$,...W].forEach(ca=>ca.style.willChange='transform')}function P(){I.removeEventListener('wheel',K),I.removeEventListener('touchstart',M),$.removeEventListener('mousedown',L),I.removeChild($),$=void 0,S()}function Q(ba){const ca=0<ba?z(X+ba,Y):A(X+ba,0);return $.style.transform=`translateX(${ca}px)`,R(-1*ca*Z),ca}function R(ba){W.forEach(ca=>{ca.style.transform=`translateX(${ba}px)`})}function S(){$&&($.style.transform=`translateX(0)`),R(0),X=0,_=!1}function T(){const ba=getComputedStyle(I);U=I.clientWidth-parseInt(ba.getPropertyValue('padding-left'))-parseInt(ba.getPropertyValue('padding-right')),W=Array.from(I.childNodes).filter(ca=>{return ca!==$}),V=W.reduce((ca,da)=>{return A(da.scrollWidth,ca)},0),V>U?(J()?O():N(),S()):J()&&P()}if(E.has(I))return E.get(I);let U,V,W,X,Y,Z,$,_;T();const aa={update:T};return E.set(I,aa),aa}function d(){F||(F=!0,G=window.innerWidth,window.addEventListener('resize',H))}function f(){F=!1,window.removeEventListener('resize',H)}const h=Element.prototype;'function'!=typeof h.matches&&(h.matches=h.msMatchesSelector),'function'!=typeof h.closest&&(h.closest=function(I){for(let J=this;J&&1===J.nodeType;){if(J.matches(I))return J;J=J.parentNode}return null});const{PI:i,abs:j,min:k,sin:l,cos:m,atan:p}=Math,q=(()=>{const I=document.createElementNS('http://www.w3.org/2000/svg','svg');I.setAttribute('viewBox','0 0 2 2'),Object.assign(I.style,{position:'absolute',top:0,left:0,width:'2px',height:'2px'}),I.innerHTML='<rect width="1" height="1" style="transform: translate(1px, 1px)"/>',document.body.appendChild(I);const J=document.elementFromPoint(1,1)!==I;return I.parentNode.removeChild(I),J})(),r=24,w=function(I,...J){return J[1===I?0:1]};if(window.fetch){const I=document.querySelector('[data-issue-id]');if(I){const J=I.dataset.issueId;fetch(`https://api.github.com/repos/eprev/eprev.org/issues/${J}`,{headers:new Headers({Accept:'application/vnd.github.v3.text+json'})}).then(K=>{200===K.status&&K.json().then(L=>{const M=L.comments;if(M){const N=`There ${w(M,'is','are')} <a href="https://github.com/eprev/eprev.org/issues/${J}">${M} ${w(M,'comment','comments')}</a> on this (visit the post’s issue page on GitHub)`;I.innerHTML=N}})})}}const{min:z,max:A,abs:B,floor:C}=Math,D=50,E=new WeakMap;let F=!1,G;const H=a(()=>{if(G!==window.innerWidth){G=window.innerWidth;const I=Array.from(document.querySelectorAll('.scrollable--enabled'));I.forEach(J=>{const K=E.get(J);K&&K.update()}),0===I.length&&f()}});document.body.addEventListener('click',I=>{if(I.target.matches('[data-ga-on=click]')){const J=I.target.dataset;ga('send','event',J.gaCategory,J.gaAction,J.gaLabel,J.gaValue)}}),function(I){function J(){const Z=window.innerHeight,{top:$,bottom:_,height:aa}=I.getBoundingClientRect();0<=$&&$<Z||0<_&&_<=Z||aa>Z&&0>$&&_>Z?K():L()}function K(){R.forEach(Z=>{const{left:$,top:_,width:aa,height:ba}=Z.el.getBoundingClientRect();Z.left=$+window.pageXOffset+aa/2,Z.top=_+window.pageYOffset+ba/2}),document.addEventListener('mousemove',W),document.addEventListener('touchstart',X),document.addEventListener('touchend',Y),document.addEventListener('touchcancel',Y)}function L(){Q(),document.removeEventListener('mousemove',W),document.removeEventListener('touchstart',X),document.removeEventListener('touchend',Y),document.removeEventListener('touchcancel',Y)}function M(Z,$,_){q?Z.style.transform=`translate(${$}px, ${_}px)`:Z.setAttribute('transform',`translate(${$} ${_})`)}function N(Z,$=1,_=1,aa=0,ba=0){const ca=`matrix(${$}, 0, 0, ${_}, ${aa*(1-$)}, ${ba*(1-_)})`;q?S.style.transform=ca:S.setAttribute('transform',ca)}function O(Z,$,_){const aa=$?0>$?i+p(_/$):p(_/$):0,ba=k(r,j($))*m(aa),ca=-1*(k(r,j(_))*l(aa));M(Z,ba,ca)}function P(Z=250){U||(U=!0,clearTimeout(T),T=setTimeout(()=>N(S,0.25,1.5,208,436),Z))}function Q(Z=125){U&&(U=!1,clearTimeout(T),T=setTimeout(()=>N(S),Z))}const R=[{el:I.querySelector('[data-id=right-eye]')},{el:I.querySelector('[data-id=left-eye]')}],S=I.querySelector('[data-id=mouth]');q&&(R.forEach(Z=>Z.el.style.willChange='transform'),Object.assign(S.style,{willChange:'transform',transitionDuration:'.25s',transitionProperty:'transform'}));let T=null,U=!1;const V=a(()=>{J()}),W=a(Z=>{R.forEach($=>{O($.el,Z.pageX-$.left,$.top-Z.pageY)}),Z.target.closest('a')?P():Q()}),X=a(Z=>{const $=Z.touches.item(0);R.forEach(_=>{O(_.el,$.pageX-_.left,_.top-$.pageY)}),P(0)}),Y=a(()=>{Q(0)});return window.addEventListener('scroll',V,{passive:!0}),window.addEventListener('resize',V),J(),{resume:K,pause:L}}(document.querySelector('.page__user-picture')),function(I=document){const J=Array.from(I.querySelectorAll('.scrollable:not(.scrollable--enabled)'));J.forEach(K=>{K.classList.add('scrollable--enabled'),c(K)}),J.length&&d()}()})();