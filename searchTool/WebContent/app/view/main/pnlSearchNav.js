Ext.define('SearchTool.view.main.pnlSearchNav', {
			extend : 'Ext.container.Container',
			alias : 'widget.pnlSearchnav',
			requires : ['SearchTool.view.main.component.PnlSearch',
					'SearchTool.view.main.component.PnlSources'],
			items : [
				{ //search panel top area
					//scrollbar working as it should
					//height working as it should 
					xtype : 'container',
					height : '15%',
					width : '100%', 
					overflowX : 'hidden',
					overflowY : 'auto',
					items : [{
						xtype : 'displayfield',
						value : 'Filters Options:'
						}, {
						xtype : 'checkbox',
						fieldLabel : 'Remove All'
						}, {
						xtype : 'checkbox',
						fieldLabel : 'Relax All'
						}]
				}		//search panel top area
			, {
				xtype : 'container',
				height:'100%',
				width:'100%',
				layout : {
					type : 'hbox'
				},
				defaults : {
					collapsible : true,
					animCollapse : true,
					collapseDirection : 'left',
					flex : 1
				},
				items : [ 
							 
					{
						xtype: 'pnlSearch',
						flex:1
					}
   				 ,  {
						xtype : 'pnlSources',
						flex : 1
					}] 
				}

			]

		});