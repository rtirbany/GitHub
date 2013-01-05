var z =  Ext.create('SearchTool.view.QueryBuilder',{ 
									renderTo:Ext.getBody()
		});

Ext.define('SearchTool.view.SearchBoolean', {
			extend : 'Ext.form.Panel',
			alias : 'widget.searchBoolean',
			itemId : 'pnlSearchBoolean',
			requires : ['SearchTool.view.QueryBuilder','SearchTool.view.QueryBuilderRow'], 
			height:115,
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
								if (z.hidden) { 
									var parent = Ext.ComponentQuery.query('#pnlSearchBoolean')[0];
									z.setHeight(parent.getHeight());
									z.setWidth(parent.getWidth());
									z.show(); 
							}
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
						},
						{
							xtype : 'tbfill'
						}
						,
						{
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
						}
						
						]
			}		 
			],

			items : [{
						xtype : 'textarea',
						value: '(edit not available)',
						disabled : true,
						width:'100%',
						height:'90%',
						itemId : 'txtSearchBoolean'
					}]
		}

);