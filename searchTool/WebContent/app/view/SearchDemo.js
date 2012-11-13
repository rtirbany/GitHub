var searchFilter = Ext.create('Ext.container.Container',{
	title:'Search Filters',   
	defaults:{
		layout:'vbox',
		xtype:'panel'
	},
	items: [{ 
        title: 'Filter 1', 
        flex: 2
    },
    { 
        title: 'Filter Two', 
        flex: 4
    }]
});

var searchHistory = Ext.create('Ext.container.Container',{
	title:'Search History',  
	defaults:{
		layout:'vbox',
		xtype:'panel'
	},
	items: [{ 
        title: 'History 1', 
        flex: 2
    },
    { 
        title: 'History Two', 
        flex: 4
    }]
	//	hidden:true
}); 

var searchNavArea = Ext.create('Ext.panel.Panel',{   
	items:[searchFilter, searchHistory]
});

Ext.define('MyApp.view.SearchDemo',{
	extend:'Ext.container.Container', 
	layout:'border',
	width:800,
	height:600, 
	items:[{ region:'west',width:220,title:'Search', items:[searchNavArea]}
	 ,
	        {region:'north',height:100,title:'Banner', html:'banner'}
	 ,
	       {region:'center',title:'Results',collapsible:false,floatable:false,html:'results'},
	       
	      ]
});

var tpl = Ext.create('Ext.Template',[
                                 	'Hello {first} {last}',' its nice to meet you!'
                                 ]);

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