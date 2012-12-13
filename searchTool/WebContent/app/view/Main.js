


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
	requires:['SearchTool.view.SearchTools','SearchTool.view.SearchEntry'],
	tabBar:{
		layout:{pack:'end',plain:true}
	},
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
		      			{   //west panel
							region:'west', 
							width:220, 
							xtype:'tools',
							split:true, 
							collapsible:true,
							animCollapse:true,  
							collapseDirection:'left', 
							layout:'anchor' 
						} //west panel definition
						,
						{	//north panel
							region:'north',  
	 						height:100,
	 						layout:{align:'stretch'},
	 						bodyStyle:'padding: 10px 5px 5px 5px;',
	 						//title:'Search',  
	 						//collapsible:true,
	 						//collapseDirection:'up',
	 						//animCollapse:true,
	 						items:[	 //contents of north panel within main Search page pab
	 						
	 						{ 
	 								 xtype:'search'
	 								 
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