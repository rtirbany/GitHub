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
			alias : 'widget.searchEntry', 
			layout:{type:'hbox',align:'stretch'},
			frame : true,
			defaults : {
				margins : '1 5 1 5'
			},
			
	 		bodyStyle:'padding: 10px 5px 5px 5px;', 
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

				]//vbox item array
			}, {
				xtype : 'container',
				layout: 'hbox',
				flex : 4,
				items : [

				{
					xtype : 'fieldset',
					title : 'Boolean Search',
					tooltip : 'Types of Products available for search',
					collapsible : true,
					collapsed : true, 
					layout:'fit',
					flex:3,
					items : [ {
					   xtype:'textarea',
					   itemId:'txtAdvSearch'
					   }
					   ,
					   {xtype:'toolbar',
					    itemId:'advtoolbar',
					    pack:'end',
//					    align:'stretch',
					   items:[
					   {
					   xtype:'tbspacer',
					   width:5
					   },
					   {
					   text:'Help',
					   handler:function(){
					   	Ext.Msg.alert('some boolean help page');
					   
					   }
					   },
					   {
					   xtype:'tbspacer',
					   width:500
					   },
					   { 
					   text:'Clear', 
					   handler:function(){ 
					   		Ext.ComponentQuery.query('#txtAdvSearch')[0].reset();
					   }
					   },
					   {
					   xtype:'tbseparator'
					   }
					   ,
					   { 
					   text:'Search'
					   }]}
					]
						//fieldset items 
					},	//fieldset
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
			}]

		});