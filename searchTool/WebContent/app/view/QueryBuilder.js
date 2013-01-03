Ext.define('SearchTool.view.QueryBuilder', {
			extend : 'Ext.form.Panel',
			alias : 'widget.searchBoolean', 
			requires: ['SearchTool.view.QueryBuilderRow'],
			height : 100,
			layout :'fit',
			border : false,
			overflowX:'hidden', 
			overflowY:'auto',
			dockedItems : [ 
			{
				xtype : 'toolbar',
				dock : 'bottom',
				items : [
						{
							xtype : 'tbspacer',
							width : 2
						},
						{
							text : 'Help',
							handler : function() {
								Ext.Msg.alert('some boolean help page');
							}
						},
						{
							xtype : 'tbspacer',
							width : 2
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'tbspacer',
							width : 2
						},
						{
							text : 'Freehand Query',
							tooltip : 'Launch Query Form (future)',
							disabled: true,
							handler : function(){
								//var z = Ext.create('SearchTool.view.QueryBuilder');
								//z.show();
								
							}
						
						},
						{
							xtype : 'tbfill' 
						}, {
							text : 'Clear All',
							handler : function() {
								this.up('form').getForm().reset();
							}
						}
							,
						{
							xtype : 'tbspacer',
							width : 2
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'tbspacer',
							width : 2
						}, {
							text : 'Search'
						}, {
							xtype : 'tbspacer',
							width : 3
						}
						]// toolbar items
			} // toolbar
			] //dockedItems
			, 
			items:  [ 
			{xtype:'container',
			 items:[
				{
					xtype:'builderRow'
				} 
				
			]}]  
		}

);