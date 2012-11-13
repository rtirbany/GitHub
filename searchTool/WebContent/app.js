Ext.Loader.setConfig({
    enabled: true
    });

Ext.application({
	name : 'MyApp',
	appFolder : 'app',
	//requires:['MyApp.view.SearchDemo'],
	//autoCreateViewport: true,
	launch : function() {
		Ext.create('MyApp.view.SearchDemo',{renderTo:Ext.getBody()});
		Ext.Msg.alert('hi ther');
		
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
