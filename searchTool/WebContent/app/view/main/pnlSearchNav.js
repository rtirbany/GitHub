Ext.define('SearchTool.view.main.pnlSearchNav', {
			extend : 'Ext.container.Container',
			alias : 'widget.pnlSearchnav',
			requires : ['SearchTool.view.PnlSearch',
					'SearchTool.view.PnlSources'],
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
						value : 'Filters:'
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
				height:'85%',
				layout : {
					type : 'hbox'
				},
				defaults : {
					collapsible : true,
					animCollapse : true,
					collapseDirection : 'left',
					overflowX : 'hidden',
					flex : 1,
					overflowY : 'auto'
				},
				items : [{
							xtype : 'pnlSearch', 
							flex : 1,
							height:'100%'
						}, {
							xtype : 'pnlSources',
							flex : 1
						}]
					//													}]
					//												 }//hbox
					//												]//vbox items array
				}

			]

		});