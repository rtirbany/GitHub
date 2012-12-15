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
 

Ext.define('SearchTool.view.SearchNav',{
	extend:'Ext.panel.Panel',
	alias:'widget.searchNav', 
		title:'Search',
	items:[ 
		{ 
			xtype:'checkbox', 
			itemId:'chkSaveQuery',
			boxLabel:'Save Search'  
		},
		{   
			itemId:'dfFilters', 
			items:[
			{xtype:'displayfield',value:'(user selections w/ remove option)'}
			]
		},
		{
			xtype:'tabpanel', 
			//layout:'accordion',  
			//margins: '5 0 0 0',
   	 		// cmargins: '5 5 0 0', 
			defaults:{
				autoScroll:true
			},
			//align:'stretch',
			//items:[pnlSearchFilters, pnlSearchHistory]
			items:[  //contents of west panel within main Search page tab
   	    	{ 
  					itemId:'tbFilters',
   					title:'Filters', 
  		 			layout:'accordion',
  		 			animate:true,
  		 			items:[
  		 			{ title:'facets',html:'some facets option<BR>more options<BR>more options'},
  		 			{ title:'filterCategory1',html:'some filter options<BR>more options<BR>more options'},
  		 			{ title:'filterCategory2',html:'some filter options<BR>more options<BR>more options'} 
  		 			]
				},
				{ 
  		 			itemId:'tbSaved',
  		 			title:'Saved'
//  		 			,
//  					autoScroll:true
				},
				{
					itemId:'tbHistory',
					title:'History',  
		//			layout:'vbox', 
		//			autoScroll:true,
				disabled:true
				}  
			] //west panel items array  
		}
		]
		}
);