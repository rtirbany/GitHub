Ext.define('SearchTool.view.main.component.PnlSources', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.pnlSources',
	title : 'Sources',
	src : '', 
	layout : 'vbox',
	bodyStyle : 'padding: 5px 9px 5px 9px',
	items : [{
				xtype : 'fieldset',
				width : '100%',
				items : [{
					xtype : 'checkboxgroup',
					itemId : 'chkgrpDataSource',
					fieldLabel : 'Data Sources',
					labelStyle:'width:10px;',
					frame : true,
					// Distribute controls across 3 even columns, filling
					// each column from top to bottom before starting the next
					// column
					columns : [150],
					vertical : true,
					store : 'Sources',
					renderer : function(b, e) {
					},
					items : [{
								boxLabel : 'SrcA',
								xtype : 'checkbox',
								itemId : 'cboxProd1',
								checked : true,
								tooltip : 'Prod1 tooltip',
								cls : 'cboxProducts'
							}, {
								boxLabel : 'SrcB',
								xtype : 'checkbox',
								itemId : 'cboxProd2',
								checked : true,
								tooltip : 'Prod2 tooltip',
								cls : 'cboxProducts'
							}]

					}		// Data Sources fieldset
				, {
					xtype : 'checkboxgroup',
					itemId : 'chkgrpProducts',
					fieldLabel : 'Products',
					width:'100%',
					// Distribute controls across 3 even columns, filling
					// each column from top to bottom before starting the next
					// column
					columns : [150],
					vertical : true,
					items : [
							// this.getDataUrl()
							{
						boxLabel : 'Prod1',
						xtype : 'checkbox',
						itemId : 'cboxProd1',
						checked : true,
						tooltip : 'Prod1 tooltip',
						cls : 'cboxProducts'
					}, {
						boxLabel : 'Prod2',
						xtype : 'checkbox',
						itemId : 'cboxProd2',
						checked : true,
						tooltip : 'Prod2 tooltip',
						cls : 'cboxProducts'
					}, {
						boxLabel : 'Prod3',
						xtype : 'checkbox',
						itemId : 'cboxProd3',
						checked : true,
						tooltip : 'Prod3 tooltip',
						cls : 'cboxProducts'
					}, {
						boxLabel : 'Prod4',
						xtype : 'checkbox',
						itemId : 'cboxProd4',
						checked : true,
						tooltip : 'Prod4 tooltip',
						cls : 'cboxProducts'
					}, {
						boxLabel : 'Prod5',
						xtype : 'checkbox',
						itemId : 'cboxProd5',
						checked : true,
						tooltip : 'Prod5 tooltip',
						cls : 'cboxProducts'
					}]
				}

				]
			}]
		//west panel items array
	});