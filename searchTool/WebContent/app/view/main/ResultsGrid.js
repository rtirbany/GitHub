Ext.define('SearchTool.view.main.ResultsGrid',{
	extend:'Ext.grid.Panel',
	alias:'widget.resultsgrid',
	title:'Results',
	viewConfig:{
		stripeRows:true
	},
	initComponent : function(){ 
	this.store = 'Results',
	this.columns = [
		{
			text:'product',
			flex:1,
			sortable:true,
			dataIndex:'product'
		},
		{
			text:'subject',
			flex:1,
			sortable:true,
			dataIndex:'subject'
		},
		{
			xtype:'actioncolumn',
			flex:1,
			items:[{xtype:'checkbox',tooltip:'Add to cart'}]
		}
		],
	this.callParent(arguments);
	}
	
});