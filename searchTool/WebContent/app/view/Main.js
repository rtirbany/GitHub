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
    
 
var tbarMain = Ext.create('Ext.toolbar.Toolbar',{ 
	height:50,
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
	requires:['SearchTool.view.PnlSearch','SearchTool.view.PnlSources','SearchTool.view.SearchArea'],
	tabBar:{
		layout:{pack:'end',plain:true}
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
    				layout:'fit',
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
		      			{ // west panel
										region : 'west',
										itemId:'pnlTools',
										flex:3,
										title:'Search Tools',
										layout:'fit',
										collapsible:true,
										animCollapse:true,
										collapseDirection:'left', 
										split:true,
										items : [{header:false,
												 defaults:{width:'100%'},
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
												xtype:'container',
												layout:
													{type:'hbox',
													 pack:'justify' 
													},
												defaults:{
													collapsible : true,
													animCollapse : true,
													collapseDirection : 'left'
												},
												items:[
												{
														 
															xtype : 'pnlSearch',
															flex : 2,
															height:'100%'
														}, {
															xtype : 'pnlSources',
															width : 120
														}
												]
												}//hbox
												]}
										]   // west panel items
									}		//west panel definition
						,
						{	//north panel
							region:'north',  
	 						height:165,
							layout : {
								pack:'justify',
								align : 'stretch'
							},
	 						items:[	 //contents of north panel within main Search page pab
	 						 { 
	 								 xtype:'searchArea'
	 						 } 
	 				       ]//north panel items array
	 					}//north panel definition,
	 			,		
	 					{	//center panel
							region:'center',
//							xtype:'resultsgrid',
			 				title:'Results', 
			 				flex:8, 
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