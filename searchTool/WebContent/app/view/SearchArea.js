ccStore = new Ext.data.SimpleStore({
			fields : ['name', 'value'],
			data : [['a keyword1', 'a keyword1'], ['b keyword2', 'b keyword2']]
		});

ccListCombo = new Ext.form.ComboBox({
	itemId : 'cboxSearch',
	store : ccStore,
	// fieldLabel: 'Search By Keyword',
	// labelSeparator:':',
	hasfocus:true,
	displayField : 'name',
	hiddenName : 'ccaction',
	valueField : 'value',
	typeAhead : true,
	mode : 'local',
	listWidth : 450,
	// forceSelection:false,
	selectOnFocus : true,
	width:285,
	listeners: {
          afterrender: function(field) {
            field.focus();
          }
        }
	});

Ext.define('SearchTool.view.SearchArea', {
			extend : 'Ext.container.Container',
			alias : 'widget.searchArea', 
			layout:{type:'hbox',align:'stretch'},
			requires:['SearchTool.view.SearchBoolean'],
			frame : true,
			defaults : {
				margins : '1 5 1 5'
			},
			
	 		bodyStyle:'padding: 10px 5px 5px 5px;', 
			items : [{
				extend : 'Ext.container.Container',
				border:false,
				layout : {
				type:'vbox',
				pack:'justify'
				
				},
				flex : 1,
				items : [
				{
					xtype : 'form', 
					url : '/simplesearch',
					layout : 'hbox',
					items : [ccListCombo, 
						   {
								xtype : 'button',
								cls: 'frmSearchBtns',
								text : 'Clear',
								itemId : 'btnClear',
								tooltip : 'Clear search field',
								handler : function() {
									Ext.ComponentQuery.query('#cboxSearch')[0].reset();
							}
							}, {
								xtype : 'button',
								cls: 'frmSearchBtns',
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

				]//vbox item array
			}, 
				{
					xtype : 'fieldset',
					title: 'Boolean Search',
					collapsible : true,
					collapsed : true,
					layout : 'fit',
					flex : 2,
					items:[
					{	
						xtype : 'searchBoolean',
						tooltip : 'Boolean query entry'
					}
					]
				},	
				{
					xtype : 'fieldset',
					title : '(smthg)', 
					collapsible : true,
					collapsed : true, 
					flex:1,
					items : [ { 
						html:'(area for shopping cart, subscriptions, or ?'
					   }
					]
						//fieldset items 
					}
				 
			 ]

		});