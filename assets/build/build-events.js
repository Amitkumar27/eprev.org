(function(){'use strict';if(window.EventSource){var a=new EventSource('/build-events');a.addEventListener('build-success',()=>{location.reload()}),a.addEventListener('build-error',b=>{const c=JSON.parse(b.data);console.info(c)})}})();