"use strict";!function(e){function s(e){for(var s="",t=1;t<=e;t++)s+='<li class="item-'+t+'"><span class="label">Item '+t+"</span></li>";return s}var t={};t.$Events=e({}),t.$={},t.States={sidebar:!1,usedAlt:!1,usedMouse:!1},t.ready=function(){function a(e){switch(t.$.Sidebar.find(".button").removeClass("active"),e){case"grid":t.$.List.addClass("grid-view"),t.$.List.removeClass("metro-view"),t.$.Sidebar.find('[data-view="grid"]').addClass("active");break;case"metro":t.$.List.addClass("metro-view"),t.$.List.removeClass("grid-view"),t.$.Sidebar.find('[data-view="metro"]').addClass("active");break;default:t.$.List.removeClass("metro-view"),t.$.List.removeClass("grid-view"),t.$.Sidebar.find('[data-view="list"]').addClass("active")}}function i(e){e?(t.$.Sidebar.addClass("show"),t.States.sidebar=!0):(t.$.Sidebar.removeClass("show"),t.States.sidebar=!1)}t.$.Sidebar=e("aside"),t.$.List=e(".items-list"),t.$.List.html(s(150)),t.$Events.on("sidebar:show",function(){i(!0)}),t.$Events.on("sidebar:hide",function(){i(!1)}),t.$.Sidebar.on("click",".button",function(s){s.preventDefault(),a(e(this).data("view"))});var d=!1;e(document).on("keyup",function(e){var s=e.keyCode?e.keyCode:e.which;e.altKey&&(71===s&&(a("grid"),d=!0),77===s&&(a("metro"),d=!0),76===s&&(a("list"),d=!0)),18!==s||t.States.sidebar||d||t.States.usedMouse?18!==s||!t.States.sidebar||d||t.States.usedMouse||(t.$Events.trigger("sidebar:hide"),t.States.usedAlt=!1):(t.$Events.trigger("sidebar:show"),t.States.usedAlt=!0),18===s&&d&&(d=!1),t.States.sidebar&&(71===s&&a("grid"),77===s&&a("metro"),76===s&&a("list"))}),e(document).on("mousemove",function(e){!t.States.sidebar&&e.clientX<40&&!t.States.usedAlt&&(t.$Events.trigger("sidebar:show"),t.States.usedMouse=!0)}),t.$.Sidebar.on("mouseleave",function(){t.States.sidebar&&!t.States.usedAlt&&(t.$Events.trigger("sidebar:hide"),t.States.usedMouse=!1)})},t.ready()}(jQuery);