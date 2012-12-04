//TODO: move cbox, btns down and have banner area 
//TODO: populate history w/  mouseover gives more details (time stamp, num results)

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
  

//var productStore = new Products();


var pnlSearchFilters = Ext.create('Ext.panel.Panel',{
	title:'Filters',    
	autoScroll:true,
	layout:'accordion',  
	items: [
	{ 
        title: 'Filter panel1', 
        flex: 2
    },
    { 
        title: 'Filter panel2', 
        flex: 4
    }
    ]
});

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

var tbarMain = Ext.create('Ext.toolbar.Toolbar',{
	renderTo:Ext.getBody(),
	items:{
		xtype:'button',
		text:'Logout'
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

Ext.define('SearchTool.view.SearchDemo',{
	extend:'Ext.tab.Panel', 
	tabBar:{
		layout:{pack:'end',plain:true}
	},
	plain:true,
	alias:'widget.searchtool',
	config:{
		title:'SearchTool',
		store:'Products'
	},
	constructor: function(config) {
    	this.initConfig(config); 
    },
	items:[{
		title:'Search',
		itemId:'pnlMainTabSearch',
		extend:'Ext.container.Container', 
		layout:'border',
		width:'95%',
		height:650, 
		resizable:true,
		resizeHandles:'s se e',
		animCollapse:true,
		defaults:{
			bodyStyle:'padding:5px'
		}, 
		items:[
		       { 
					region:'west',
					title:'Search Details', 
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
		       }, 
		       {	
					region:'north',
	 				//title:'Search Tool',
	 				height:100,
	 				layout:'hbox',
	 				align:'top',
	 				//html:'some site logo, etc'
	 				items:[	 
		       					ccListCombo,
	 				       			{	xtype:'button',
	 									text:'Clear',
	 									itemId:'btnClear',
	 									tooltip:'Clear search field',
	 									handler:function(){
	 										Ext.ComponentQuery.query('#cboxSearch')[0].reset();
	 									}},
	 				       			{	xtype:'button',
	 				       				text:'Search',
	 				       				itemId:'btnSearch',
	 				       				tooltip:'Run the search',
	 				       				scope:this
	 				       			}
	 									,
	 									{   xtype:'fieldset',
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
	 											   vertical: true,
	 											   items: this.getStore()
//{boxLabel: 'All Products', itemId: 'cboxAll', handler:toggleAllProducts, checked:true, tooltip:'Select/Deselect all other checkboxes'}
	 							           
	 										   }
	 										] //fieldset items
	 									}//fieldset
	 				       ]//north items array
	 			}//north region
		,
				{
					region:'center',
			 		title:'Results', 
			 		html:'(results go here)',
			 		tooltip:'results will appear here'
			 			
			 	}
		 ]
	},
			{ 
				deferredRender: true,
		 		title:'Admin', 
		 		itemId:'pnlMainTabAdmin',
		 		html:'(Admin pages go here)',
		 		tooltip:'admin pages appear here'
		 	 }
	],
	
	toggleAllProducts : function(b, e) {
		if (b.name = 'cboxAll') {
			var arrProducts = Ext.ComponentQuery.query('#cboxgrpProducts')[0];
			var len = arrProducts.items.length;
			for (var i=1; i<len;i++)
				arrProducts.items.items[i].setValue(b.getValue());
	 	}
	}
});