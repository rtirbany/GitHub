


Ext.override(Ext.tab.Bar, {
    initComponent: function() {
        var me = this;

        if (me.plain) {
            me.setUI(me.ui + '-plain');
        }

        me.addClsWithUI(me.dock);

        me.addEvents(
            /**
             * @event change
             * Fired when the currently-active tab has changed
             * @param {Ext.tab.Bar} tabBar The TabBar
             * @param {Ext.tab.Tab} tab The new Tab
             * @param {Ext.Component} card The card that was just shown in the TabPanel
             */
            'change'
        );

        // Element onClick listener added by Header base class
        me.callParent(arguments);
        Ext.merge(me.layout, me.initialConfig.layout);

        // TabBar must override the Header's align setting.
        me.layout.align = (me.orientation == 'vertical') ? 'left' : 'top';
        me.layout.overflowHandler = new Ext.layout.container.boxOverflow.Scroller(me.layout);

        me.remove(me.titleCmp);
        delete me.titleCmp;

        Ext.apply(me.renderData, {
            bodyCls: me.bodyCls
        });
    }
});
   

ccStore = new Ext.data.SimpleStore({
	fields:['name', 'value'],
	data: [ ['a keyword1', 'a keyword1'],['b keyword2', 'b keyword2']]
});

ccListCombo = new Ext.form.ComboBox({
	itemId:'cboxSearch',
    store: ccStore,
    //fieldLabel: 'Search By Keyword',
    //labelSeparator:':',
    displayField:'name',
    hiddenName:'ccaction',      
    valueField:'value',             
    typeAhead: true,
    mode: 'local',
    listWidth: 450,
    //forceSelection:false,
    selectOnFocus:true,
    lazyRender:true
    //,
    //allowBlank:false
});
 
var tbarMain = Ext.create('Ext.toolbar.Toolbar',{ 
	items:[
		{
			xtype:'tbtext',
			text:'CHROME Search'
		},
		{
			xtype:'tbfill'
		}, 
		{
			xtype:'button',
			itemId:'btnHelp',
			text:'Help' 
		}
		,
		{
			xtype:'tbseparator'
		}
		,
		{
			xtype:'button',
			text:'Logout',
			itemId:'btnLogout' 
		}
		]
});


Ext.define('SearchTool.view.Main',{ 
	extend:'Ext.container.Viewport',
	itemId:'main',
	dataUrl:'',
//	requires:['SearchTool.view.SearchMgmt'],
	tabBar:{
		layout:{pack:'end',plain:true}
	}, 
	alias:'widget.main',
//	config:{
//		title:'SearchToolss', 
//		tabLayout:[
//		{
//			title:'Search'		
//		},
//		{
//			title:'Admin'
//		}
//		],
	initConfig: function(config){ 
	},
	
	initComponent:function(){
    	//this.initConfig(config); 
		// var sm = new SearchMgmt();
    	Ext.apply(this,{
    		layout:'border',
    		items:[
    			{	//toolbar area
    				region:'north',
    				items:[tbarMain]
    			}
    			,
    			{	//main tabs for Search and Admin
    				region:'center' ,
    				xtype:'tabpanel', 
    				plain:true,
    				tabBar:{
						layout:{pack:'end'}
					},	
    				items:[
    					//main Search page will contain a tab panel
    					{
    					itemId:'pnlMainTabSearch',
						extend:'Ext.container.Container',
						title:'Search',
						layout:'border',
			 			tooltip:'Search page',
						items:[
						// sm,
		      			{   //west panel
							region:'west',
							title:'Search Tools',  
							width:220,  
							split:true, 
							collapsible:true,
							animCollapse:true, 
							collapseDirection:'left', 
							items:[
									{ 
							    	   	xtype:'checkbox', 
							    	   	itemId:'chkSaveQuery',
							    	   	boxLabel:'Save Search',
							    	   	tooltip:'ji',
							    	   	qtip:'lol',
							    	   	name:'chkSaveQuery'
							    	 },
							    	 {
							    	 	xtype:'tabpanel',
							    	 	defaults:{
							    	 		autoScroll:true
							    	 	}
							    	 	,
										items:[  //contents of west panel within main Search page tab
					       					{ 
					       			   			itemId:'tbFilters',
							    	   			title:'Filters',
							    	   			layout:'vbox'
							    	   			//layout:'accordion' 
							       			},
							       			{ 
							    	   			itemId:'tbSaved',
							    	   			title:'Saved',
							    	   			//layout:'fit'
							    	   			layout:'vbox'
							       			},
							       			{
							    	   			itemId:'tbHistory',
							    	   			title:'History', 
							    	   			//layout:'fit',
							    	   			layout:'vbox', 
							    	   			disabled:true
							       			}  
										] //west panel items array  
							    	 } 
							]  
						} //west panel definition
						,
						{	//north panel
							region:'north',  
	 						height:100,
	 						layout:{type:'hbox',align:'stretch'},
	 						//title:'Search',  
	 						//collapsible:true,
	 						//collapseDirection:'up',
	 						//animCollapse:true,
	 						items:[	 //contents of north panel within main Search page pab
	 						{
	 							xtype:'container',
	 							layout:'hbox',
	 							items:[
		       					ccListCombo,
	 				       		{		xtype:'button',
	 									text:'Clear',
	 									itemId:'btnClear',
	 									tooltip:'Clear search field',
	 									handler:function(){
	 										Ext.ComponentQuery.query('#cboxSearch')[0].reset();
	 									}
	 							},
	 				       		{		xtype:'button',
	 				       				text:'Search',
	 				       				itemId:'btnSearch',
	 				       				tooltip:'Run the search',
	 				       				scope:this
	 				       		}
	 				       		]
	 				       		},
	 				       		{
	 							xtype:'container',
	 							layout:'hbox',
	 							width:'100%',
	 							items:[
	 				       		{
	 				       			 	xtype:'fieldset',
	 									title:'Available Products',
	 									tooltip:'Types of Products available for search',
	 									collapsible:true,
	 									collapsed:false,
	 									items:[
	 										   	{
	 											   xtype: 'checkboxgroup',
	 											   itemId:'cboxgrpProducts',
	 											   //fieldLabel: 'Product Types',
	 											   // Distribute controls across 3 even columns, filling each column
	 											   // from top to bottom before starting the next column
	 											   columns: [150,150,150], 
	 											   width:300,
	 											   vertical: true,
	 											   items:[
	 											   //// this.getDataUrl()
	 											    {boxLabel: 'All', itemId: 'cboxProdAll', name:'cboxAll', checked:true, tooltip:'Prod1 tooltip'},
	 											   	{boxLabel: 'Prod1', itemId: 'cboxProd1', checked:true, tooltip:'Prod1 tooltip',cls:'cboxProducts'},
													{boxLabel: 'Prod2', itemId: 'cboxProd2', checked:true, tooltip:'Prod2 tooltip', cls:'cboxProducts'},
													{boxLabel: 'Prod3', itemId: 'cboxProd3', checked:true, tooltip:'Prod3 tooltip',cls:'cboxProducts'},
													{boxLabel: 'Prod4', itemId: 'cboxProd4', checked:true, tooltip:'Prod4 tooltip',cls:'cboxProducts'},
													{boxLabel: 'Prod5', itemId: 'cboxProd5', checked:true, tooltip:'Prod5 tooltip',cls:'cboxProducts'}
	 											   ]
	 											   //items: this.getStore()
//{boxLabel: 'All Products', itemId: 'cboxAll', handler:toggleAllProducts, checked:true, tooltip:'Select/Deselect all other checkboxes'}
	 							             	}
	 										] //fieldset items 
	 				       				} //fieldset
	 				       		,
	 				       				{
	 				       			 	xtype:'fieldset',
	 									title:'Data Sources',
	 									qtip:'Types of Products available for search',
	 									 flex:1,
	 									collapsible:true,
	 									collapsed:false,
	 									items:[
	 										   	{
	 											   xtype: 'checkboxgroup',
	 											   itemId:'cboxgrpDatasource',
	 											   //fieldLabel: 'Product Types',
	 											   // Distribute controls across 3 even columns, filling each column
	 											   // from top to bottom before starting the next column
	 											   columns: [150,150],
	 											   vertical: true,
	 											   items:[
	 											    {boxLabel: 'All', itemId: 'cboxSrcAll', name:'cboxAll', checked:true, qtip:'Src1 qltip'},
	 											   	{boxLabel: 'Src1', itemId: 'cboxSrc1', checked:true, qtip:'src1 tooltip',cls:'cboxSrc'},
													{boxLabel: 'Src2', itemId: 'cboxSrc2', checked:true, qtip:'src2 tooltip', cls:'cboxSrc'},
													{boxLabel: 'Src3', itemId: 'cboxSrc3', checked:true, qtip:'src3 tooltip',cls:'cboxSrc'}
												 ]
	 											   //items: this.getStore()
//{boxLabel: 'All Products', itemId: 'cboxAll', handler:toggleAllProducts, checked:true, tooltip:'Select/Deselect all other checkboxes'}
	 							             	}
	 										] //fieldset items 
	 				       				} //fieldset
	 				       		
	 				       		]
	 				       		}	
	 				       ]//north panel items array
	 					}//north panel definition,
	 			,		
	 					{	//center panel
							region:'center',
			 				title:'Results', 
			 				html:'(results go here)',
			 				tooltip:'results will appear here'
			 			
			 			}   //center panel defintion
		       		]//search items array
						}//search tab
						,
    					 
    					{
    						title:'Admin',
    						deferredRender: true,
	    					html:'(Admin pages go here)',
			 				tooltip:'admin pages appear here'
		 				}
    				]
    			}
    		]
    	});
		this.callParent(arguments);	
	}

	//},
	//constructor: function(config) {
    //	this.initConfig(config); 
    //},
  
	
	
});