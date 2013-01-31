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
						region : 'north',
						border : false,
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
							text : 'Help',
							iconcls : 'icon-help'
						},{
							xtype : 'button',
							itemId : 'btnHome',
							text : 'Home',
							iconCls : 'icon-home'
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'button',
							text : 'Logout',
							itemId : 'btnLogout',
							iconCls : 'icon-logout'
						}
						]
					 } // top banner panel
					 , 
					{ 		
						region:'center',
						xtype : 'tabpanel', 
						items : [{// searchtab
							title : 'Search',
							itemId : 'pnlMainTabSearch',
							layout : 'border',
							items : [{
								region : 'north',
								border : false,
								items : [
									{
										xtype:'searchArea',
										height : 160
									
									}
								]
							},{
								region : 'west',
								itemId : 'pnlSearch',
								title : 'Filters',
								layout : {
									type : 'fit',  
									align : 'stretch'
								},
								collapsible : true,
								animCollapse : true,
								collapseDirection : 'left',
								split : true,
								xtype: 'pnlSearch',
								flex : .25
							},
							{
								region : 'west',
								itemId : 'pnlSources',
								title : 'Sources',
								layout : {
									type : 'fit',  
									align : 'stretch'
								},
								collapsible : true,
								animCollapse : true,
								collapseDirection : 'left',
								split : true, 
								xtype: 'pnlSources',
								flex : .2
							}
							
							, {// center
								region : 'center',
								border : true,
							    xtype:'resultsgrid',
							    flex : .75
							}]
						}		// searchtab
						, 
						{//admin tab
							title : 'Admin', 
							html : '(Admin pages go here)',
							tooltip : 'admin pages appear here'
						}		// admin tab contents

					]
				}]

		});