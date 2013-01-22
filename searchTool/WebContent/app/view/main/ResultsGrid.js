var sm = Ext.create('Ext.selection.CheckboxModel',{
 	  checkOnly:true 
});

Ext.define('SearchTool.view.main.ResultsGrid',{
	extend : 'Ext.grid.Panel',
	alias : 'widget.resultsgrid',
	requires : ['SearchTool.config.Config'],
	title : 'Results',
	store : 'Results',
	viewConfig:{
		stripeRows : true
//		,
//		getRowClass : function(r,i){ 
//			var c = r.get('product');
//			if (c = 'a') {
//                return 'childRow';
//            } else  
//                return 'parentRow';
//		}
	},
	autoScroll : true,
	selModel: sm,
	
	initComponent : function(){ 
	
	this.dockedItems = [  
		    {
				xtype : 'pagingtoolbar',
				store : 'Results',
				dock : 'top',
				displayInfo : true,
				prependButtons : true,
				items : [{
					xtype:'button',
					type : 'submit',
					url : '/addtocart', 
					text:'Add To Cart (87)',
					cls:'btnPagingToolbar',
					width:65,
					scale:'medium',//medium works well in IE, FFox
					handler :function() {
					  var ids = ''; 
					  Ext.each(this.up('panel').getSelectionModel().getSelection(), 
					  function(row, index, value) {
	  					ids += row.data.product + ',';
	 				  });
	 				  ids = ids.slice(0,-1);
//	 				  Ext.Ajax.request({
//						  method:'GET',
//						  url: this.url,
//						  params:{'id':ids},
//						  
//						  success : function(action){},
//						  failure : function(action){},
//						  scope : this
//                      });
                    }
				},{
					xtype:'tbseparator'
				},  
				{
					xtype:'combo',
					fieldLabel:'Results Per Page',
					itemId:'cbPageSize',
					labelWidth:55,
					fields:['pagesize','pagesizeval'],
					store:SearchTool.config.Config.PageSizeOptions,
					queryMode:'local',
					value : SearchTool.config.Config.defaultPageSize,
					editable:false,
					typeAhead:false,
					displayField:'pagesize',
					valueField:'pagesizeval',
					allowBlank:false,
					selectOnFocus:false,
					width:120
				},
				{
				xtype:'tbfill'}]
			}];
			
	this.columns = [ 
		{
			text : 'Source',
			dataIndex : 'source',
			width : 75,
			hidden : true
		},
		{
			text:'Product',
			dataIndex:'product',
			width:80,
			sortable:true
		},
		{
			text:'Subject',
			dataIndex:'subject',
			flex:2,
			sortable:true
		},
		{
			text:'Title',
			dataIndex:'title',
			flex:2,
			sortable:true
		}
		],
	this.callParent(arguments);
	}
	
});