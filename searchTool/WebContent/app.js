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
	appFolder : 'app',
	enableQuickTips : true,
	controllers:['SearchTool'],
	//requires:['SearchTool.config.Config'],
	//autoCreateViewport: true,
	launch : function() {
		//console.log(MyApp.config.Config.products); 
		var body = Ext.getBody();
		Ext.create('SearchTool.view.SearchDemo',{title:'SearchTool',store:'productStore'});
		body.unmask();
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
 

/*var pnlFilter = Ext.create('Ext.form.FormPanel',{
	itemId:'pnlFilter',
	frame:true,
	title:'Filters',
	class:'navpanel',
	layout:'container',
	renderTo:'divSearchTool',
	items:[{
          xtype: 'textfield',
          fieldLabel: 'Search',
          width: 180
        }]
});*/





//removeAllChildrenFilter = function(p){
	//var parent = Ext.get(p); 
//};


//Ext.onReady(function(){
//	//pnlFilter.show();
//	Ext.create('Ext.window.Window',{
//		height:125,
//		width:200,
//		closable:true,
//		title:'input needed',
//		border: false,
//		layout:'fit',
//		items:[pnlForm]}).show();
//	}
//	
//	);
//TODO: need to remove all, remove by click
//TODO: ellipsis on overflow (max width set)
//TODO: how to display if many?  >1 column?
//TODO: requery if click for remove/removeAll children
//TODO: scroll bar vertical if too many?
//TODO: descriptions for tool tips
//TODO: only get images, themes, css, etc that are needed..where to locate in project?
//TODO: highlight row based on product type setting - icon and/or row coloring and/or bg color based on 
		//prod type in result set


/*Ext.application({
	name : 'searchTool',
	requires: [
		'Ext.window.MessageBox',  
		'searchTool.config.Constants'
	],
	
	launch : function() {
		
		Ext.Msg.alert("hi","there");
		  
	}} 
);*/
