"use strict";!function(e){function t(e){for(var t="",s=1;s<=e;s++)t+='<li class="item-'+s+'"><span class="label">Item '+s+"</span></li>";return t}var s={};s.$Events=e({}),s.$={},s.States={sidebar:!1,usedAlt:!1,usedMouse:!1},s.ready=function(){function i(){for(var e=0;e<d.length;e++){var t=d[e],s=t.x,i=t.y;if(t.x=t.node.offsetLeft,t.y=t.node.offsetTop,s!==t.x||i!==t.y){var a=t.transform.x+s-t.x,r=t.transform.y+i-t.y;TweenLite.fromTo(t.node,.5,{x:a,y:r},{x:0,y:0,ease:Power1.easeInOut})}}}function a(e){switch(s.$.Sidebar.find(".button").removeClass("active"),e){case"grid":s.$.List.addClass("grid-view"),s.$.List.removeClass("metro-view"),s.$.Sidebar.find('[data-view="grid"]').addClass("active");break;case"metro":s.$.List.addClass("metro-view"),s.$.List.removeClass("grid-view"),s.$.Sidebar.find('[data-view="metro"]').addClass("active");break;default:s.$.List.removeClass("metro-view"),s.$.List.removeClass("grid-view"),s.$.Sidebar.find('[data-view="list"]').addClass("active")}i()}function r(e){e?(s.$.Sidebar.addClass("show"),s.States.sidebar=!0):(s.$.Sidebar.removeClass("show"),s.States.sidebar=!1)}s.$.Sidebar=e("aside"),s.$.List=e(".items-list"),s.$.List.html(t(150)),s.$.List.items=s.$.List.find("li");var d=[];s.$.List.items.each(function(e,t){TweenLite.set(t,{x:0}),d.push({transform:t._gsTransform,x:t.offsetLeft,y:t.offsetTop,node:t})}),s.$Events.on("sidebar:show",function(){r(!0)}),s.$Events.on("sidebar:hide",function(){r(!1)}),s.$.Sidebar.on("click",".button",function(t){t.preventDefault(),a(e(this).data("view"))});var o=!1;e(document).on("keyup",function(e){var t=e.keyCode?e.keyCode:e.which;e.altKey&&(71===t&&(a("grid"),o=!0),77===t&&(a("metro"),o=!0),76===t&&(a("list"),o=!0)),18!==t||s.States.sidebar||o||s.States.usedMouse?18!==t||!s.States.sidebar||o||s.States.usedMouse||(s.$Events.trigger("sidebar:hide"),s.States.usedAlt=!1):(s.$Events.trigger("sidebar:show"),s.States.usedAlt=!0),18===t&&o&&(o=!1),s.States.sidebar&&(71===t&&a("grid"),77===t&&a("metro"),76===t&&a("list"))});var n;e(document).on("mousemove",function(e){!s.States.sidebar&&e.clientX<40&&!s.States.usedAlt&&(n&&clearTimeout(n),n=setTimeout(function(){s.$Events.trigger("sidebar:show"),s.States.usedMouse=!0},1e3))}),s.$.Sidebar.on("mouseleave",function(){s.States.sidebar&&!s.States.usedAlt&&(s.$Events.trigger("sidebar:hide"),s.States.usedMouse=!1)})},s.ready()}(jQuery);