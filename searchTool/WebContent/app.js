
var tpl = Ext.create('Ext.Template',[
	'Hello {first} {last}',' nice to meet you!'
]);

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

var pnlForm = Ext.create('Ext.form.FormPanel',{
	itemId:'pnlForm',
	frame:true,	
	layout:'anchor',
	defaultType:'textfield',
	defaults:{anchor:'-10',labelWidth:65},
	items:[
		{fieldLabel:'First Name',name:'first'},
		{fieldLabel:'Last Name',name:'last'}
	],
	buttons:[
		{text:'Submit',
		handler:function(){
			var pnlForm = this.up('#pnlForm');
			vals = pnlForm.getValues(); 
			greeting = tpl.apply(vals);
			Ext.Msg.alert('Hello!',greeting);
			addChildFilter('divSearchTool','filter_n1','label',vals.first,'#EE00EE');
			addChildFilter('divSearchTool','filter_n2','label',vals.last);
		}}
	]
}); 

addChildFilter = function(p,n,type,txt,col){
	var parent = Ext.get(p);
	//refactor this piece
	if (col) {
		var styleColor = 'color:'+col+';';
		parent.createChild({
			name:n,
			tag:type,
			title:'some description txt',
			html:txt,
			style:styleColor,
			class:'filter'
		});
	}
	else
	parent.createChild({
		name:n,
		tag:type,
		title:'some description text',
		html:txt, 
		class:'filter'
	});
	
};

//removeAllChildrenFilter = function(p){
	//var parent = Ext.get(p); 
//};


Ext.onReady(function(){
	//pnlFilter.show();
	Ext.create('Ext.window.Window',{
		height:125,
		width:200,
		closable:true,
		title:'input needed',
		border: false,
		layout:'fit',
		items:[pnlForm]}).show();
	}
	
	);
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
