Ext.Loader.setConfig({
    enabled: true
    });

Ext.onReady(function() { 
	Ext.getBody().mask('Loading Application.  Please wait...'); 
	/*
	// Start the mask on the body and get a reference to the mask
    // add class to mask for it to look different than default.
    splashscreen = Ext.getBody().mask('Loading application.  Please wait...', 'splashscreen');
    splashscreen.addCls('splashscreen');

    // Insert a new div before the loading icon where we can place our logo.
    Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
        cls: 'x-splash-icon'
    });*/
});

Ext.application({
	name : 'SearchTool',
	paths : {'Ext.ux':'extjs/ux'},
	appFolder : 'app',
	controllers:['SearchTool','Sources','SearchFields'],
	requires:['SearchTool.config.Config'],
	autoCreateViewport: true,
	launch : function() {  
    	Ext.tip.QuickTipManager.init(); 
    	if(typeof String.prototype.trim !== 'function') {
  					String.prototype.trim = function() {
    					return this.replace(/^\s+|\s+$/g, ''); 
  					}
				}
		Ext.getBody().unmask();
		/* RT - if using full screen mask w/ logo, add this to fade out mask + logo
		 * var task = new Ext.util.DelayedTask(function() {
            // Fade out the body mask
            splashscreen.fadeOut({
                duration: 1000,
                remove:true
            });
            // Fade out the icon and message
            splashscreen.next().fadeOut({
                duration: 1000,
                remove:true,
                listeners: {
                    afteranimate: function() {
                        // Set the body as unmasked after the animation
                        Ext.getBody().unmask();
                    }
                }
            });
        });
        // Run the fade 500 milliseconds after launch.
        task.delay(500);
		 * */
	}
});
 

 
//TODO: filters - need to remove all, remove by click
//TODO: requery if click for remove/removeAll children 
//TODO: descriptions for tool tips 
//TODO: highlight row based on product type setting - icon and/or row coloring and/or bg color based on 
		//prod type in result set
