var sm = Ext.create('Ext.selection.CheckboxModel',{
 	  checkOnly:true,
 	  listeners:{
 	  	'selectionchange' : function() { 
 	  		var btn = Ext.ComponentQuery.query('#btnAddToCart')[0]; 
 	  		var cnt = this.getCount(); 
 	  		btn.setDisabled(cnt ==0); 
 	  		btn.setText('Add Selections to Cart ('+cnt+')'); 
 	  	}
 	  }
});

Ext.define('SearchTool.view.main.ResultsGrid',{
	extend : 'Ext.grid.Panel',
	alias : 'widget.resultsgrid',
	requires : ['SearchTool.config.Config'],
	title : 'Results',
	tools:[
		{type:'help',tooltip:'Help page for Results area',handler:function(ev,el,p){}}
	],
	store : 'Results',
	loadMask : true,
	viewConfig:{
		stripeRows : true
//		,
//		getRowClass : function(r,i,p,d){ 
//			var c = r.get('product');
//			debugger;
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
				hideRefresh:true,
				displayMsg:'Results {0} - {1} of {2}',
				dock : 'top',
				displayInfo : true,
				emptyMsg : 'No items to display',
				prependButtons : true,
				items : [{
					xtype : 'button',
					itemId : 'btnAddToCart',
					iconCls : 'icon-btnCartAdd',
					type : 'submit',
					url : '/addtocart',
					text : 'Add Selections to Cart (-)',
					cls : 'btnPagingToolbar',
					disabled : true,
					width : 130,
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
					labelWidth : 55,
					itemId : 'cbPageSize',
					fields : ['pagesize', 'pagesizeval'],
					store : SearchTool.config.Config.PageSizeOptions,
					queryMode : 'local',
					value : SearchTool.config.Config.defaultPageSize,
					editable : false,
					typeAhead : false,
					displayField : 'pagesize',
					valueField : 'pagesizeval',
					matchFieldWidth:true,
					forceselection : true,
					allowBlank : false,
					selectOnFocus : false,
					width : 120,
					listeners : { 'change' : function(){
						this.up('pagingtoolbar').store.load({start:0,limit:this.value});
					}
					}},
					{
						xtype : 'tbseparator' 
					},
					{	xtype: 'tbfill'
					},
					{	xtype: 'tbfill'
					},
					{	xtype: 'tbfill'
					}
					,
					{
						xtype : 'tbfill' 
					},
					{
						xtype:'tbfill'
					},
					{	xtype: 'tbfill'
					},
					{
						text : 'Print',
						tooltip : 'Print Results',
						iconCls : 'icon-btnPrint'
					}, {
						xtype : 'tbseparator' 
					}, 
					{
					text : 'Export',
					iconCls : 'icon-btnExport',
					align : 'right',
					menu : {
						plain : true,
						showSeparator : false,
						items : [
							{text:'Export as Excel', iconCls : 'icon-mnuExcel', tooltip:'Export Results as Excel (.xls) file'},
							{text:'Export PDF', iconCls : 'icon-mnuPdf', tooltip:'Export Results as PDF (.pdf) file'}
						]
					}
					}
				]
			}],
	
	initComponent : function(){ 
	//Per Scott - by default: Source(hidden), Product, Pub Date, Serial #, Subject, Summary
	this.columns = [ 
		{
			text : 'Source',
			dataIndex : 'source',
			width : 75,
			align : 'center',
			hidden : true,
			sortable:true,
			tooltip: 'Source',
			renderer:function(val){
				if (val == 'B'){
					return '<span style="color:red;">'+val+'</span>';
				}
				else
					return val;
			}
		},
		{
			text:'Pub Date',
			dataIndex:'dt',
			xtype: 'datecolumn',
            format: SearchTool.config.Config.rsDateColFormat,
			width:80,
			align : 'center',
			hidden : true,
			sortable:true,
			tooltip: 'Pub Date'
		},
		{
			text:'Product',
			dataIndex:'product',
			width:80,
			sortable:true,
			align : 'center',
			tooltip: 'Product'
		},
		{
			text:'Serial No.',
			dataIndex:'serial',
			flex:2,
			sortable:true,
			align:'left',
			tooltip: 'Serial No.'
		},
		{
			text:'Subject',
			dataIndex:'subject',
			flex:2,
			sortable:true,
			align : 'center',
			tooltip: 'Subject' 
		},
		{
			text:'Summary',
			dataIndex:'summary',
			flex:2,
			sortable:true,
			align : 'center',
			tooltip: 'Summary'
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