ccStore = new Ext.data.SimpleStore({
			fields : ['name', 'value'],
			data : [['a keyword1', 'a keyword1'], ['b keyword2', 'b keyword2']]
		});

ccListCombo = new Ext.form.ComboBox({
	itemId : 'cboxSearch',
	store : ccStore,
	// fieldLabel: 'Search By Keyword',
	// labelSeparator:':',
	displayField : 'name',
	hiddenName : 'ccaction',
	valueField : 'value',
	typeAhead : true,
	mode : 'local',
	listWidth : 450,
	// forceSelection:false,
	selectOnFocus : true
		// ,
		// allowBlank:false
	});

Ext.define('SearchTool.view.SearchEntry', {
			extend : 'Ext.container.Container',
			alias : 'widget.search', 
			layout:{type:'hbox',align:'stretch'},
			frame : true,
			defaults : {
				margins : '1 5 1 5'
			},
			items : [{
				layout : 'vbox',
				flex : 1,
				xtype : 'container',
				items : [

				{
					xtype : 'container',
					layout : 'hbox',
					defaults : {
						margins : '0 2 0 2'
					},
					items : [ccListCombo, 
						   {
								xtype : 'button',
								text : 'Clear',
								itemId : 'btnClear',
								tooltip : 'Clear search field',
								handler : function() {
									Ext.ComponentQuery.query('#cboxSearch')[0].reset();
							}
							}, {
								xtype : 'button',
								text : 'Search',
								itemId : 'btnSearch',
								tooltip : 'Run the search',
								scope : this
							}
					]
				}		// cbox, btnSearch, Clear,
				, {
					xtype : 'displayfield',
					value : 'Home > (breadcrumb area)'

				}

				]//vbox items
			}, {
				xtype : 'container',
				flex : 4,
				items : [

				{
					xtype : 'fieldset',
					title : 'Available Products',
					tooltip : 'Types of Products available for search',
					collapsible : true,
					collapsed : false,
					flex : 1,
					items : [{
						xtype : 'checkboxgroup',
						itemId : 'cboxgrpProducts',
						// allowBlank:false,
						// fieldLabel: 'Product Types',
						// Distribute controls across 3 even columns, filling
						// each column
						// from top to bottom before starting the next column
						columns : [150, 150, 150],
						width : 300,
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
							// items: this.getStore()
							// {boxLabel: 'All Products', itemId: 'cboxAll',
							// handler:toggleAllProducts, checked:true,
							// tooltip:'Select/Deselect all other checkboxes'}
						}]
						// fieldset items
					},	// fieldset
				{
					xtype : 'fieldset',
					title : 'Data Sources',
					qtip : 'Types of Products available for search',
					collapsible : true,
					flex : 1,
					collapsed : false,
					items : [{
						xtype : 'checkboxgroup',
						itemId : 'cboxgrpDataSource',
						// allowBlank:false,
						// fieldLabel: 'Product Types',
						// Distribute controls across 3 even columns, filling
						// each column
						// from top to bottom before starting the next column
						columns : [150, 150],
						vertical : true,
						items : [{
									boxLabel : 'Src1',
									xtype : 'checkbox',
									itemId : 'cboxSrc1',
									checked : true,
									qtip : 'src1 tooltip',
									cls : 'cboxSrc'
								}, {
									boxLabel : 'Src2',
									xtype : 'checkbox',
									itemId : 'cboxSrc2',
									checked : true,
									qtip : 'src2 tooltip',
									cls : 'cboxSrc'
								}, {
									boxLabel : 'Src3',
									xtype : 'checkbox',
									itemId : 'cboxSrc3',
									checked : true,
									qtip : 'src3 tooltip',
									cls : 'cboxSrc'
								}]
							// items: this.getStore()
							// {boxLabel: 'All Products', itemId: 'cboxAll',
							// handler:toggleAllProducts, checked:true,
							// tooltip:'Select/Deselect all other checkboxes'}
						}]
						//fieldset items 
					}	//fieldset
				]
			}]

		});