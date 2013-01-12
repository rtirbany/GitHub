Ext.define('SearchTool.view.QueryBuilder', {
			extend : 'Ext.form.Panel',
			itemId : 'queryBuilder', 
			title : 'Query Builder',
			bodyStyle : 'padding: 6px',
			draggable : true,
			floating : true,
			titleCollapse : true,
			collapsible: true,
			centered : true,
			hidden : true,
			requires : ['SearchTool.view.QueryBuilderRow'],
			border : true, 
			overflowX :'hidden', 
			overflowY :'auto', 
			tools : [
				{
					xtype : 'tool',
					type : 'close',
					handler : function(e, target, p, tool) {
							this.up('panel').hide();
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
								var p = this.up('panel');
								p.removeAll(); 
								p.add({xtype:'builderRow'});
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
							text : 'Build Query',
							itemId : 'btnBuildQuery'
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