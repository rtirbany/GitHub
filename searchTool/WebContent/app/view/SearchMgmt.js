var pnlSearchHistory = Ext.create('Ext.panel.Panel',{
	title:'History',
	autoScroll:true,
	layout:'vbox',
	items: [{ 
        title: 'Hist panel1', 
        flex: 2
    },
    { 
        title: 'Hist panel2', 
        flex: 4
    }]
	//	hidden:true
}); 
 
Ext.define('SearchTool.view.SearchMgmt',{
	title:'Search Management',  
	xtype:'tabpanel',
	tabBar:{
		layout:{pack:'center',plain:true,align:'stretch'}
	},	
	width:220, 
	//layout:'accordion',  
	//margins: '5 0 0 0',
    // cmargins: '5 5 0 0',
	split:true, 
	collapsible:true,
	animCollapse:true,
	collapseDirection:'left',
	defaults:{
		autoScroll:true
	},
	//align:'stretch',
	//items:[pnlSearchFilters, pnlSearchHistory]
	items:[
	       {
			    	   itemId:'tbFilters',
			    	   title:'Filters',
			    	   layout:'accordion'
			       },
			       {
			    	   itemId:'tbHistory',
			    	   title:'History', 
			    	   layout:'vbox', 
			    	   disabled:true
			       }
			 //]}
	] //west panel items array
});