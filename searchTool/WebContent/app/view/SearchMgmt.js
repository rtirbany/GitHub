Ext.define('SearchTool.view.SearchMgmt',{
	title:'Search Details', 
	alias:'widget.searchmgmt',
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
	//items:[pnlSearchFilters, pnlSearchHistory]
	items:[
	       {
			    	   itemId:'tbFilters',
			    	   title:'Filters',
			    	   layout:'accordion',
			       },
			       {
			    	   itemId:'tbHistory',
			    	   title:'History', 
			    	   layout:'vbox', 
			    	   disabled:true,
			       }
			 //]}
	] //west panel items array
});