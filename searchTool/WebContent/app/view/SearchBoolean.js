var z =  Ext.create('SearchTool.view.QueryBuilder',{ 
									renderTo:Ext.getBody()
								});

Ext.define('SearchTool.view.SearchBoolean', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.searchBoolean',
			itemId : 'pnlSearchBoolean',
			requires : ['SearchTool.view.QueryBuilder','SearchTool.view.QueryBuilderRow'],
			height : 100,
			overflowX : 'hidden', 
			overflowY : 'auto',
			dockedItems : [{
				dock : 'top',
				xtype : 'toolbar',
				items : [{
							xtype : 'tbspacer',
							width : 3
						}, {
							text : 'Query Builder',
							tooltip : 'Launch Query Builder',
							handler : function(b){  
								z.setHeight(Ext.ComponentQuery.query('#pnlSearchBoolean')[0].getHeight());
								z.setWidth(Ext.ComponentQuery.query('#pnlSearchBoolean')[0].getWidth());
								z.show(); 
							}
						}
						,
						{
							xtype : 'tbspacer',
							width : 2
						}
						,
						{xtype : 'tbseparator'}
						,
						{
							xtype : 'tbspacer',
							width : 2
						}
						,
						{
							text : 'Help',
							handler : function() {
								Ext.Msg.alert('some boolean help page');
							}
						},	
						{
							xtype : 'tbspacer',
							width : 2
						}]
			}		// top

			, {
				xtype : 'toolbar',
				dock : 'bottom',
				items : [ 
						{
							xtype : 'tbfill' 
						}, {
							text : 'Clear',
							handler : function() {
								Ext.ComponentQuery.query('#txtSearchBoolean')[0].reset();
							}
						}, {
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
						}]
			}],

			items : [{
						xtype : 'textarea',
						value: '(edit not available)',
						disabled : true, 
						itemId : 'txtSearchBoolean', 
						width : '100%'
					}]
		}

);