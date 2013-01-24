var sm = Ext.create('Ext.selection.CheckboxModel',{
 	  checkOnly:true,
 	  listeners:{
 	  	'selectionchange' : function() { 
 	  		var btn = Ext.ComponentQuery.query('#btnAddToCart')[0]; 
 	  		var cnt = this.getCount(); 
 	  		btn.setDisabled(cnt ==0); 
 	  		btn.setText('Add Selected Items To Cart ('+cnt+')'); 
 	  	}
 	  }
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
	dockedItems:
	[{
				xtype : 'pagingtoolbar',
				store : 'Results',
				dock : 'top',
				displayInfo : true,
				prependButtons : true,
				items : [{
					xtype : 'button',
					itemId : 'btnAddToCart',
					type : 'submit',
					url : '/addtocart',
					text : 'Add Selected Items To Cart (-)',
					cls : 'btnPagingToolbar',
					disabled : true,
					width : 120,
					scale : 'large',// medium works well in IE, FFox
					handler : function() {
						var ids = '';
						Ext.each(this.up('panel').getSelectionModel().getSelection(), function(row, index, value) {
									ids += row.data.product + ',';
								});
						ids = ids.slice(0, -1);
						// Ext.Ajax.request({
						// method:'GET',
						// url: this.url,
						// params:{'id':ids},
						//						  
						// success : function(action){},
						// failure : function(action){},
						// scope : this
						// });
					}
				}, {
					xtype : 'tbseparator'
				}, {
					xtype : 'combo',
					fieldLabel : 'Results Per Page',
					labelAlign : 'right',
					itemId : 'cbPageSize',
					labelWidth : 55,
					listWidth : 30,
					fields : ['pagesize', 'pagesizeval'],
					store : SearchTool.config.Config.PageSizeOptions,
					queryMode : 'local',
					value : SearchTool.config.Config.defaultPageSize,
					editable : false,
					typeAhead : false,
					displayField : 'pagesize',
					valueField : 'pagesizeval',
					forceselection : true,
					allowBlank : false,
					selectOnFocus : false,
					width : 120,
					listeners : { 'change' : function(){
						this.up('pagingtoolbar').store.load({start:0,limit:this.value});
					}
					}

				}, {
					xtype : 'tbfill'
				}]
			}],
	
	initComponent : function(){ 
			
	this.columns = [ 
		{
			text : 'Source',
			dataIndex : 'source',
			width : 75,
			hidden : true,
			sortable:true
		},
		{
			text:'Pub Date',
			dataIndex:'dt',
			xtype: 'datecolumn',
            format: SearchTool.config.Config.rsDateColFormat,
			width:80,
			hidden : true,
			sortable:true
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
		
//	this.control({
//		'combo[itemId=cbPageSize]' : {
//			select : this.rsPageSizeSet
//		}
//	});
	
	this.callParent(arguments);
	},
	
	rsPageSizeSet : function(){ 
//		var ps = parseInt(record.get(''))
		this.down('pagingtoolbar').store.reload();
	}
	
});