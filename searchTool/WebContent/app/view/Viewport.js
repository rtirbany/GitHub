Ext.define('SearchTool.view.Viewport', {
			extend : 'Ext.container.Viewport',
			itemId : 'main',
			requires : ['SearchTool.view.main.pnlSearchNav',
					'SearchTool.view.main.SearchArea',
					'SearchTool.view.main.ResultsGrid',
					'SearchTool.view.main.component.PnlSave'],
			layout : 'border',
			items : [ 
					 { //top banner panel
						xtype : 'container',
						region : 'north',
						width : '100%',
						height : 60,
						layout : 'hbox',
						items : [
						{ 
							xtype : 'tbtext',
							text : 'CHROME Search'
						}, {
							xtype : 'tbfill'
						}, {
							xtype : 'button',
							itemId : 'btnHelp',
							text : 'Help'
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'button',
							text : 'Logout',
							itemId : 'btnLogout'
						}
						]
					 }, // top banner panel
					{ 		
						region:'center',
						xtype : 'tabpanel',
						tabBar:{
							layout:{pack:'end'}
						},
						items : [{// searchtab
							title : 'Search',
							itemId : 'pnlMainTabSearch',
							layout : 'border',
							items : [{
								region : 'north',
								xtype:'searchArea'
							},{
								region : 'west',
								itemId : 'pnlTools',
								title : 'Tools',
								layout : {
									type : 'fit',  
									align : 'stretch'
								},
								collapsible : true,
								animCollapse : true,
								collapseDirection : 'left',
								split : true,
								items : [{
									xtype : 'pnlSearchnav'
								}],
								flex : .45
							}, {// center
								region : 'center',
								title : 'Results',
								border : true,
								 xtype:'resultsgrid' 
							}]
						}		// searchtab
						, {
							title : 'Admin', 
							html : '(Admin pages go here)',
							tooltip : 'admin pages appear here'
						}		// admin tab contents

					]
				}] 

		});