(function(){"use strict";function throttle(fn,context){let running=false;return function throttled(...args){if(running){return}running=true;requestAnimationFrame(()=>{fn.apply(context,args);running=false})}}function debounce(fn,delay=50,context){let timeOut;return function debounced(...args){if(timeOut){clearTimeout(timeOut)}timeOut=setTimeout(()=>{timeOut=undefined;fn.apply(context,args)},delay)}}const{PI:PI,abs:abs,min:min,sin:sin,cos:cos,atan:atan}=Math;const supportsCSSTransformsOnSVG=(()=>{const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("viewBox","0 0 2 2");Object.assign(svg.style,{position:"absolute",top:0,left:0,width:"2px",height:"2px"});svg.innerHTML='<rect width="1" height="1" style="transform: translate(1px, 1px)"/>';document.body.appendChild(svg);const result=document.elementFromPoint(1,1)!==svg;svg.parentNode.removeChild(svg);return result})();const EYE_MAX_RADIUS=24;const MOUTH_CX=208;const MOUTH_CY=436;const MOUTH_SCALE_X=.25;const MOUTH_SCALE_Y=1.5;function eyed(rootEl){const eyes=[{el:rootEl.querySelector("[data-id=right-eye]")},{el:rootEl.querySelector("[data-id=left-eye]")}];const mouthEl=rootEl.querySelector("[data-id=mouth]");if(supportsCSSTransformsOnSVG){eyes.forEach(eye=>eye.el.style.willChange="transform");Object.assign(mouthEl.style,{willChange:"transform",transitionDuration:".25s",transitionProperty:"transform"})}let mouthTransformTimer=null;let isMouthOpen=false;const onWindowScroll=throttle(()=>{checkVisibility()});const onMouseMove=throttle(e=>{eyes.forEach(eye=>{moveEye(eye.el,e.pageX-eye.left,eye.top-e.pageY)});if(e.target.closest("a")){openMouth()}else{closeMouth()}});const onTouchStart=throttle(e=>{const touch=e.touches.item(0);eyes.forEach(eye=>{moveEye(eye.el,touch.pageX-eye.left,eye.top-touch.pageY)});openMouth(0)});const onTouchEnd=throttle(()=>{closeMouth(0)});window.addEventListener("scroll",onWindowScroll,{passive:true});window.addEventListener("resize",onWindowScroll);checkVisibility();return{resume:resume,pause:pause};function checkVisibility(){const windowHeight=window.innerHeight;const{top:top,bottom:bottom,height:height}=rootEl.getBoundingClientRect();if(top>=0&&top<windowHeight||bottom>0&&bottom<=windowHeight||height>windowHeight&&top<0&&bottom>windowHeight){resume()}else{pause()}}function resume(){eyes.forEach(eye=>{const{left:left,top:top,width:width,height:height}=eye.el.getBoundingClientRect();eye.left=left+window.pageXOffset+width/2;eye.top=top+window.pageYOffset+height/2});document.addEventListener("mousemove",onMouseMove);document.addEventListener("touchstart",onTouchStart);document.addEventListener("touchend",onTouchEnd);document.addEventListener("touchcancel",onTouchEnd)}function pause(){closeMouth();document.removeEventListener("mousemove",onMouseMove);document.removeEventListener("touchstart",onTouchStart);document.removeEventListener("touchend",onTouchEnd);document.removeEventListener("touchcancel",onTouchEnd)}function translate(el,dx,dy){if(supportsCSSTransformsOnSVG){el.style.transform=`translate(${dx}px, ${dy}px)`}else{el.setAttribute("transform",`translate(${dx} ${dy})`)}}function scale(el,sx=1,sy=1,cx=0,cy=0){const transform=`matrix(${sx}, 0, 0, ${sy}, ${cx*(1-sx)}, ${cy*(1-sy)})`;if(supportsCSSTransformsOnSVG){mouthEl.style.transform=transform}else{mouthEl.setAttribute("transform",transform)}}function moveEye(el,x,y){const angle=x?x<0?PI+atan(y/x):atan(y/x):0;const dx=min(EYE_MAX_RADIUS,abs(x))*cos(angle);const dy=min(EYE_MAX_RADIUS,abs(y))*sin(angle)*-1;translate(el,dx,dy)}function openMouth(delay=250){if(!isMouthOpen){isMouthOpen=true;clearTimeout(mouthTransformTimer);mouthTransformTimer=setTimeout(()=>scale(mouthEl,MOUTH_SCALE_X,MOUTH_SCALE_Y,MOUTH_CX,MOUTH_CY),delay)}}function closeMouth(delay=125){if(isMouthOpen){isMouthOpen=false;clearTimeout(mouthTransformTimer);mouthTransformTimer=setTimeout(()=>scale(),delay)}}}const plural=function(n,...forms){return forms[n===1?0:1]};const el=document.querySelector("[data-issue-id]");if(el){const issueId=el.dataset.issueId;fetch(`https://api.github.com/repos/eprev/eprev.org/issues/${issueId}`,{headers:new Headers({Accept:"application/vnd.github.v3.text+json"})}).then(response=>{if(response.status===200){response.json().then(json=>{const comments=json.comments;if(comments){const html=`There ${plural(comments,"is","are")} <a\n                href="https://github.com/eprev/eprev.org/issues/${issueId}"\n                data-ga-on="click"\n                data-ga-category="Click"\n                data-ga-action="Comments"\n                data-ga-label="${location.pathname}"\n              >${comments} ${plural(comments,"comment","comments")}</a> on this (visit the post’s issue page on GitHub).`;el.querySelector(".post-comments__text").innerHTML=html}})}})}const{min:min$1,max:max,abs:abs$1,floor:floor}=Math;const MIN_SCROLLBAR_WIDTH=50;const cache=new WeakMap;function scrollable(targetEl){if(cache.has(targetEl)){return cache.get(targetEl)}let clientWidth;let scrollWidth;let childNodes;let scrollLeft;let scrollLeftMax;let scrollRatio;let sbEl;let isLocked;update();function hasScrollBar(){return sbEl!==undefined}function targetOnMouseWheel(e){if(!isLocked&&abs$1(e.deltaX)>abs$1(e.deltaY)){e.preventDefault();scrollLeft=scrollBy(e.deltaX)}}function scrollBarOnMouseDown(e){if(isLocked){return}isLocked=true;const clientX=e.clientX;let currScrollLeft=scrollLeft;const onMouseMove=e=>{currScrollLeft=scrollBy(e.clientX-clientX)};const onMouseUp=e=>{sbEl.classList.remove("scrollbar--active");scrollLeft=currScrollLeft;document.removeEventListener("mousemove",onMouseMove);document.removeEventListener("mouseup",onMouseUp);isLocked=false};sbEl.classList.add("scrollbar--active");document.addEventListener("mousemove",onMouseMove);document.addEventListener("mouseup",onMouseUp)}function targetOnMouseDown(e){if(isLocked){return}isLocked=true;const targetX=window.pageXOffset+targetEl.getBoundingClientRect().left;const leftX=targetX+clientWidth*.9;const rightX=targetX+clientWidth*.1;let currScrollLeft=scrollLeft;const onMouseMove=e=>{if(e.clientX>leftX){currScrollLeft=scrollBy(scrollWidth)}else if(e.clientX<rightX){currScrollLeft=scrollBy(-scrollWidth)}};const onMouseUp=e=>{scrollLeft=currScrollLeft;document.removeEventListener("mousemove",onMouseMove);document.removeEventListener("mouseup",onMouseUp);isLocked=false};document.addEventListener("mousemove",onMouseMove);document.addEventListener("mouseup",onMouseUp)}function targetOnTouchStart(e){if(isLocked||e.touches.length>1){return}isLocked=true;const clientX=e.touches[0].clientX;const clientY=e.touches[0].clientY;let currScrollLeft=scrollLeft;let isDetected=false;let isAllowed=false;const onTouchMove=e=>{if(e.touches.length>1){return}const dx=e.touches[0].clientX-clientX;if(!isDetected){const dy=e.touches[0].clientY-clientY;if(abs$1(dx)>abs$1(dy)){isAllowed=true}isDetected=true}if(isAllowed){currScrollLeft=scrollBy(-dx)}};const onTouchEnd=e=>{isLocked=false;scrollLeft=currScrollLeft;document.removeEventListener("touchmove",onTouchMove);document.removeEventListener("touchen",onTouchEnd);document.removeEventListener("touchcancel",onTouchEnd)};document.addEventListener("touchmove",onTouchMove);document.addEventListener("touchend",onTouchEnd);document.addEventListener("touchcancel",onTouchEnd)}function addScrollBar(){sbEl=document.createElement("div");sbEl.classList.add("scrollbar");sbEl.classList.add("scrollbar--horizontal");targetEl.style.touchAction="pan-y";updateScrollBar();targetEl.appendChild(sbEl);targetEl.addEventListener("wheel",targetOnMouseWheel);targetEl.addEventListener("touchstart",targetOnTouchStart);targetEl.addEventListener("mousedown",targetOnMouseDown);sbEl.addEventListener("mousedown",scrollBarOnMouseDown)}function updateScrollBar(){const scrollBarWidth=max(floor(clientWidth*clientWidth/scrollWidth),MIN_SCROLLBAR_WIDTH);scrollRatio=(scrollWidth-clientWidth)/(clientWidth-scrollBarWidth);scrollLeftMax=clientWidth-scrollBarWidth;sbEl.style.width=scrollBarWidth+"px";[sbEl,...childNodes].forEach(el=>el.style.willChange="transform")}function removeScrollBar(){targetEl.removeEventListener("wheel",targetOnMouseWheel);targetEl.removeEventListener("touchstart",targetOnTouchStart);targetEl.removeEventListener("mousedown",targetOnMouseDown);sbEl.removeEventListener("mousedown",scrollBarOnMouseDown);targetEl.removeChild(sbEl);sbEl=undefined;resetScroll()}function scrollBy(dx){const sdx=dx>0?min$1(scrollLeft+dx,scrollLeftMax):max(scrollLeft+dx,0);sbEl.style.transform=`translateX(${sdx}px)`;scrollContentTo(-1*sdx*scrollRatio);return sdx}function scrollContentTo(x){childNodes.forEach(childEl=>{childEl.style.transform=`translateX(${x}px)`})}function resetScroll(){if(sbEl){sbEl.style.transform=`translateX(0)`}scrollContentTo(0);scrollLeft=0;isLocked=false}function update(){const style=getComputedStyle(targetEl);clientWidth=targetEl.clientWidth-parseFloat(style.getPropertyValue("padding-left"))-parseFloat(style.getPropertyValue("padding-right"));childNodes=Array.from(targetEl.childNodes).filter(childEl=>{return childEl!==sbEl});scrollWidth=childNodes.reduce((maxWidth,childEl)=>{return max(childEl.scrollWidth,maxWidth)},0);if(scrollWidth>clientWidth){if(hasScrollBar()){updateScrollBar()}else{addScrollBar()}resetScroll()}else{if(hasScrollBar()){removeScrollBar()}}}const object={update:update};cache.set(targetEl,object);return object}let isWatching=false;let windowWidth;const windowOnResize=throttle(()=>{if(windowWidth===window.innerWidth){return}windowWidth=window.innerWidth;const els=Array.from(document.querySelectorAll(".scrollable--enabled"));els.forEach(el=>{const o=cache.get(el);if(o){o.update()}});if(els.length===0){stopWatching()}});function startWatching(){if(!isWatching){isWatching=true;windowWidth=window.innerWidth;window.addEventListener("resize",windowOnResize)}}function stopWatching(){isWatching=false;window.removeEventListener("resize",windowOnResize)}function scrollbar(root=document){const els=Array.from(root.querySelectorAll(".scrollable:not(.scrollable--enabled)"));els.forEach(el=>{el.classList.add("scrollable--enabled");scrollable(el)});if(els.length){startWatching()}}if(window.Worker){document.querySelectorAll(".search-control").forEach(el=>el.disabled=false);const worker=new Worker(document.querySelector("[data-search-worker-href]").dataset.searchWorkerHref);worker.addEventListener("error",e=>{ga("send","event","JavaScript Error",e.message,e.filename?e.filename+":"+e.lineno:"N/A",{nonInteraction:1})});let isReady=false;let currQuery;let currUrls="-";let gaQuery=debounce((query,results)=>{if(query.length>1){ga("send","event","Search",query,results)}},500);worker.addEventListener("message",e=>{const{type:type}=e.data;if(type==="ready"||type==="updated"){isReady=true;search(searchInput.value)}else if(type==="error"){searchContent.innerHTML="<p><em>Sorry! Something went wrong…</em></p>"}else if(type==="results"){const results=e.data.results;const urls=results.map(r=>r.url).toString();gaQuery(currQuery,results.length);if(urls!==currUrls){currUrls=urls;if(results.length){searchContent.innerHTML=`<ol class="search-results__list">${results.map(r=>`<li class="search-results__item"><a\n                  href="${r.url}"\n                  data-ga-on="click"\n                  data-ga-category="Click"\n                  data-ga-action="Search Results"\n                  data-ga-label="${r.url}"\n                >${r.title}</a> <span>${r.date}</span></li>`).join("")}</ol>`}else{searchContent.innerHTML=`<p><em>Nothing yet. Keep typing…</em></p>`}}}});const searchInput=document.querySelector(".search-input");searchInput.addEventListener("focus",()=>worker.postMessage({type:"init"}),{once:true});const searchContainer=document.createElement("div");searchContainer.className="page__content search-results search-hidden";document.querySelector(".page").appendChild(searchContainer);searchContainer.innerHTML=`<h1 class="search-results__header">Search results</h1><div class="search-results__content"><p><em>Loading…</em></div>`;const searchContent=searchContainer.querySelector(".search-results__content");function showSearchContainer(){document.querySelector(".page__content").classList.add("search-hidden");searchContainer.classList.remove("search-hidden")}function hideSearchContainer(){document.querySelectorAll(".search-hidden").forEach(el=>el.classList.remove("search-hidden"));searchContainer.classList.add("search-hidden")}document.querySelector(".search-toggle").addEventListener("click",e=>{if(searchInput.classList.contains("search-input--visible")){hideSearchContainer();searchInput.classList.remove("search-input--visible")}else{searchInput.classList.add("search-input--visible");searchInput.value="";searchInput.focus()}});searchInput.addEventListener("input",e=>search(e.target.value));function search(query){if(query){showSearchContainer();if(isReady){currQuery=query;worker.postMessage({type:"search",query:query})}}else{hideSearchContainer()}}}eyed(document.querySelector(".page__user-picture"));scrollbar()})();