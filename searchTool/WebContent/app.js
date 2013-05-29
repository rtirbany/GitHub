Ext.Loader.setConfig({
    enabled: true
    });

function CheckOWF(){
     return false; //Ozone.util.isRunningInOWF();
}

function LaunchViz(){
     if (CheckOWF()){
          Ozone.pref.PrefServer.findWidgets(
          {searchParams:{widgetName: SearchTool.config.Config.vizWidgetName},
               onSuccess:function(w){
                    if (w.length > 0){
                         var vizParams = {searchId: btn.id};
                         OWF.Launcher.launch({
                              guid: w[0].id,
                              launchOnlyIfClosed: SearchTool.config.Config.vizWidgetSingleton,
                              data: OWF.Util.toString(vizParams)
                         });
                    }
                    else {
                         Ext.Msg.alert('Error locating widget ('+ SearchTool.config.Config.vizWidgetName+' )',SearchTool.config.Config.msgErrorContactAdmin);
                    }
               },
               onFailure: function(w,e){
                    Ext.Msg.alert('Error communicating with OWF Server',SearchTool.config.Config.msgErrorTryAgain);
               }
          }
          ); 
     } 
     // if Ozone.util.isRunningInOWF(){}...
}


Ext.onReady(function() { 
	Ext.getBody().mask('Loading Application.  Please wait...');
	// Start the mask on the body and get a reference to the mask
    // add class to mask for it to look different than default.
//    splashscreen = Ext.getBody().mask('Loading application.  Please wait...', 'splashscreen');
//    splashscreen.addCls('splashscreen');

    // Insert a new div before the loading icon where we can place our logo.
//    Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
//        cls: 'x-splash-icon'
//    }); 
});

Ext.application({
	name : 'SearchTool',
	paths : {'Ext.ux':'extjs/ux'},
	appFolder : 'app',
	controllers:['SearchTool','SearchFields','CustomDateRange','QueryFilters'],
	requires:['SearchTool.config.Config','SearchTool.util.TplFilter','SearchTool.util.SessionMonitor'],
	autoCreateViewport: true,
     namnam: function(){
          Ext.Msg.alert('hi');
     },
	launch : function() {  
    	Ext.tip.QuickTipManager.init();
        //Ext.EventManager.on(window,'beforeunload',function(){ 
        //})
        
        //Ext.Ajax.timeout= SearchTool.config.Config.ajaxTimout; 
        //Ext.override(Ext.form.Basic, {timeout:Ext.Ajax.timeout/1000});
        //Ext.override(Ext.data.proxy.Server,{timeout:Ext.Ajax.timeout});
        //Ext.override(Ext.data.Connection,{timeout:Ext.Ajax.timeout});
    	if (typeof String.prototype.trim !== 'function') {
  					String.prototype.trim = function() {
    					return this.replace(/^\s+|\s+$/g, ''); 
  					}
	    }
        /*
         * if ( !Array.prototype.forEach ) 
         * { Array.prototype.forEach = function(fn, scope) 
         * { for(var i = 0, len = this.length; i < len; ++i) { fn.call(scope, this[i], i, this); } } }
         * 
         * */
        if (CheckOWF())
             Ext.ComponentQuery.query('#btnVisualize')[0].hide();
		Ext.getBody().unmask();
        SearchTool.util.SessionMonitor.start();
		// RT - if using full screen mask w/ logo, add this to fade out mask + logo
		/*   var task = new Ext.util.DelayedTask(function() {
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
	}*/
     }
});
 

 
//TODO: filters - need to remove all, remove by click
//TODO: requery if click for remove/removeAll children 
//TODO: descriptions for tool tips 
//TODO: highlight row based on product type setting - icon and/or row coloring and/or bg color based on 
		//prod type in result set
