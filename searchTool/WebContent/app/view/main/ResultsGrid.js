Ext.define('SearchTool.view.main.ResultsGrid',{
	extend:'Ext.grid.Panel',
	alias:'widget.resultsgrid',
	title:'Results',
	viewConfig:{
		stripeRows:true
	},
	autoScroll:true,
	initComponent : function(){ 
	//this.store = 'Results',
	this.columns = [
	 	{
			xtype:'actioncolumn',
			items:[{xtype:'checkbox',tooltip:'Add to cart'}],
			text : 'Add to Cart',
			textwrap:true,
			width:40
		},
		{
			text : 'Source',
			dataIndex:'source',
			width:75,
			hidden:true
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