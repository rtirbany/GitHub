Ext.define('SearchTool.view.main.ResultsGrid',{
	extend : 'Ext.grid.Panel',
	alias : 'widget.resultsgrid',
	title : 'Results',
	store : 'Results',
	viewConfig:{
		stripeRows : true
	},
	autoScroll : true,
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
					text:'Add To Cart (87)',
					cls:'btnPagingToolbar',
					width:65,
					scale:'medium' //medium works well in IE, FFox
				},{
					xtype:'tbseparator'
				},  
				{
					xtype:'combo',
					fieldLabel:'Results Per Page',
					itemId:'cbPageSize',
					labelWidth:55,
					fields:['pagesize','pagesizeval'],
					store:[[10,10],[25,25],[50,50],[100,100]],
					queryMode:'local',
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
			xtype : 'actioncolumn',
			items : [{xtype:'checkbox',tooltip:'Add to cart'}],
			text : 'Add',
			textwrap : true,
			width : 40
		},
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