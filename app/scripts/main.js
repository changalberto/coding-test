(function($) {
  'use strict';

  // Namespace
  var BLM = {};

  /**
   * @Namespace
   * Events Tower
   */

  BLM.$Events = $({});

  /**
   * @Namespace
   * @type {Object}
   * DOM Collection
   */

  BLM.$ = {};

  /**
   * States
   * @type {Object}
   */

  BLM.States = {
    sidebar: false,
    usedAlt: false,
    usedMouse: false
  };

  /**
   * Generate Items
   * @method generateItems
   * @param  {integer}      count [description]
   * @return {string}            [description]
   */

  function generateItems(count) {
    var items = '';
    for(var i = 1; i <= count; i++) {
      items += '<li class="item-' + i + '"><span class="label">Item ' + i + '</span></li>';
    }
    return items;
  }

  // DOM Ready Bootstrap
  BLM.ready = function() {
    BLM.$.Sidebar = $('aside');
    BLM.$.List = $('.items-list');

    // Generate 150 Items
    BLM.$.List.html(generateItems(150));

    BLM.$.List.items = BLM.$.List.find('li');

    // Store Initial Flex Direction Tween position
    var items = [];
    BLM.$.List.items.each(function(i, el) {
      TweenLite.set(el, {x: 0});

      /*eslint no-underscore-dangle: ["error", { "allow": ["_gsTransform"] }]*/
      items.push({
        transform: el._gsTransform,
        x: el.offsetLeft,
        y: el.offsetTop,
        node: el
      });
    });


    function tweenFlexDirection() {
      for(var i = 0; i < items.length; i++) {
        var item = items[i],
          lastX = item.x,
          lastY = item.y;

        item.x = item.node.offsetLeft;
        item.y = item.node.offsetTop;

        if(lastX === item.x && lastY === item.y) {
          continue;
        }

        var x = item.transform.x + lastX - item.x;
        var y = item.transform.y + lastY - item.y;

        TweenLite.fromTo(item.node, 0.5, {x: x, y: y }, {x: 0, y: 0, ease: Power1.easeInOut});
      }
    }

    /**
     * Set List Views
     * @method setView
     * @param  {string} View options grid, metro or (list)
     */

    function setView(view) {
      BLM.$.Sidebar.find('.button').removeClass('active');

      switch(view) {
        case 'grid':
          BLM.$.List.addClass('grid-view');
          BLM.$.List.removeClass('metro-view');
          BLM.$.Sidebar.find('[data-view="grid"]').addClass('active');
          break;
        case 'metro':
          BLM.$.List.addClass('metro-view');
          BLM.$.List.removeClass('grid-view');
          BLM.$.Sidebar.find('[data-view="metro"]').addClass('active');
          break;
        default:
          BLM.$.List.removeClass('metro-view');
          BLM.$.List.removeClass('grid-view');
          BLM.$.Sidebar.find('[data-view="list"]').addClass('active');
      }

      tweenFlexDirection();
    }

    /**
     * [showSidebar description]
     * @method showSidebar
     * @param  {[type]}    bool [description]
     * @return {[type]}         [description]
     */

    function showSidebar(bool) {
      if(bool) {
        BLM.$.Sidebar.addClass('show');
        BLM.States.sidebar = true;
      } else {
        BLM.$.Sidebar.removeClass('show');
        BLM.States.sidebar = false;
      }
    }

    // Subscribe Events
    BLM.$Events.on('sidebar:show', function() {
      showSidebar(true);
    });
    BLM.$Events.on('sidebar:hide', function() {
      showSidebar(false);
    });

    // Toggle Views
    BLM.$.Sidebar.on('click', '.button', function(e) {
      e.preventDefault();
      setView($(this).data('view'));
    });

    var viewChanged = false;

    // Observe Keys
    $(document).on('keyup', function(e) {
      var keyCode = (e.keyCode ? e.keyCode : e.which);

      // ALT mode
      if(e.altKey) {
        // If Alt + G
        if(keyCode === 71) {
          setView('grid');
          viewChanged = true;
        }

        // If Alt + M
        if(keyCode === 77) {
          setView('metro');
          viewChanged = true;
        }

        // If Alt + L
        if(keyCode === 76) {
          setView('list');
          viewChanged = true;
        }
      }

      // If Sidebar is not visible and Alt Key is pressed, show Sidebar
      if((keyCode === 18) && !BLM.States.sidebar && !viewChanged && !BLM.States.usedMouse) {
        BLM.$Events.trigger('sidebar:show');
        BLM.States.usedAlt = true;
      }
      // If Sidebar is visible and Alt Key is pressed, hide Sidebar
      else if((keyCode === 18) && BLM.States.sidebar && !viewChanged && !BLM.States.usedMouse) {
        BLM.$Events.trigger('sidebar:hide');
        BLM.States.usedAlt = false;
      }

      if((keyCode === 18) && viewChanged) {
        viewChanged = false;
      }

      // If Sidebar Visible
      if(BLM.States.sidebar) {
        // G
        if(keyCode === 71) {
          setView('grid');
        }

        // M
        if(keyCode === 77) {
          setView('metro');
        }

        // L
        if(keyCode === 76) {
          setView('list');
        }
      }
    });

    // Observe Mouse
    var mouseTimeout;
    $(document).on('mousemove', function(e) {
      // If Sidebar Not Visible and Mouse near Edge Show Sidebar
      if(!BLM.States.sidebar && (e.clientX < 40) && !BLM.States.usedAlt) {
        if(mouseTimeout) {
          clearTimeout(mouseTimeout);
        }
        mouseTimeout = setTimeout(function() {
          BLM.$Events.trigger('sidebar:show');
          BLM.States.usedMouse = true;
        }, 1000);
      }
    });

    // Sidebar Mouseleave Event
    BLM.$.Sidebar.on('mouseleave', function() {
      if(BLM.States.sidebar && !BLM.States.usedAlt) {
        BLM.$Events.trigger('sidebar:hide');
        BLM.States.usedMouse = false;
      }
    });
  };

  // DOM Ready
  BLM.ready();

})(jQuery);
