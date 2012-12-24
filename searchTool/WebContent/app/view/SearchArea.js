ccStore = new Ext.data.SimpleStore({
			fields : ['name', 'value'],
			data : [['a keyword1', 'a keyword1'], ['b keyword2', 'b keyword2']]
		});

ccListCombo = new Ext.form.ComboBox({
	itemId : 'cboxSearch',
	cls : 'qrySearch',
	store : ccStore,
	// fieldLabel: 'Search By Keyword',
	// labelSeparator:':',
	hasfocus:true,
	displayField : 'name',
	hiddenName : 'ccaction',
	valueField : 'value',
	typeAhead : true,
	mode : 'local',
	width:'100%', 
	listWidth : 450,
	// forceSelection:false,
	selectOnFocus : true, 
	listeners: {
          afterrender: function(field) {
            field.focus();
          }
        }
	});

Ext.define('SearchTool.view.SearchArea', {
			extend : 'Ext.container.Container',
			alias : 'widget.searchArea', 
			layout:{type:'hbox'},
			requires:['SearchTool.view.SearchBoolean'], 
			items : [{
				extend : 'Ext.container.Container', 
				layout : {
					type:'vbox',
					align:'stretch'
				},
				flex : 1, 
				border:false,
				items : [
				{
				    width:'100%',
					xtype : 'form', 
					url : '/simplesearch',
					border:false,
					layout : {
						type : 'vbox'
					},
					margins: '8 8 8 5',  
					height:120,
					items : [ccListCombo,
					{ xtype:'container',
						width:'100%',
						border:true,
						frame:true,
					    layout:{type:'hbox',pack:'end'},
					    items:[
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
					    }
					]
				}		// cbox, btnSearch, Clear,
				, {
					xtype : 'form',
					border:false,
					margins:' 8 5 8 5',
					items : [
					{xtype: 'displayfield',
					 itemId: 'breadcrumb',
					 fieldCls:'breadcrumbstyle',
					 fieldBodyCls: 'align-top',
					 value : ['level1', 'level2', 'more breadcrumbs'],
					 listeners : {
					 	beforerender : function(){
					 		this.value.unshift('Home'); 
					 	}
					 }
					}
					]

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