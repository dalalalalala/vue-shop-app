const rem = '!function(e){var t,n=document,i=window,o=n.documentElement;function u(){var t=o.getBoundingClientRect().width/e*100;o.style.fontSize=t+"px"}u(),i.addEventListener("resize",function(){clearTimeout(t),t=setTimeout(u,300)},!1),i.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(t),t=setTimeout(u,300))},!1)}(750);';

export default rem