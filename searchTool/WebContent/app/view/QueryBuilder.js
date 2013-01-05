Ext.define('SearchTool.view.QueryBuilder', {
			extend : 'Ext.form.Panel',
			itemId : 'queryBuilder', 
			title : 'Query Builder',
			floating : true,
			centered : true,
			hidden : true,
			requires : ['SearchTool.view.QueryBuilderRow'],
			border : false,
			overflowX :'hidden', 
			overflowY :'auto', 
			tools : [
				{
					xtype : 'tool',
					type : 'close',
					handler : function(e, target, p, tool) {
							Ext.Msg.confirm('Exit Query Builder','Are you sure you wish to exit?');
							this.up('form').hide();
					}

				}
			],
			dockedItems : [ 
			{
				xtype : 'toolbar',
				dock : 'bottom',
				layout : {
					type : 'hbox',
					pack : 'center'
				},
				items : [
						{
							xtype : 'tbspacer',
							width : 2
						},
						{
							text : 'Help',
							handler : function() {
								Ext.Msg.alert('some querybuilder help page');
							}
						},
						{
							xtype : 'tbfill'
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
							xtype : 'tbfill' 
						}, {
							text : 'Clear All',
							handler : function() {
								this.up('panel').getForm().reset();
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
							text : 'Build Query'
						}, {
							xtype : 'tbspacer',
							width : 3
						}
						]// toolbar items
			} // toolbar
			] //dockedItems
			, 
			items:  [ 
			{ 
				xtype:'builderRow'
				    
			}
			]  
		}

);