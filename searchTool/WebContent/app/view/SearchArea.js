Ext.define('SearchTool.view.SearchArea', {
			extend : 'Ext.container.Container', 
			alias : 'widget.searchArea', 
			layout:{type:'hbox'},
			requires:['SearchTool.view.QueryBuilder','SearchTool.config.Config'], 
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
					bodyPadding:5, 
					border:false,
					margins: '8 8 8 5',  
					height:120,
					items : [
						{
					    		xtype:'displayfield',
					    		anchor:'100%',
					    		fieldCls:'dfWildcard',
					    		labelCls:'dfLabel',
					    		fieldLabel:SearchTool.config.Config.searchCboxCaptionLabel,
					    		value:SearchTool.config.Config.searchCboxCaptionValue,
					    		qtip:'hi'
					
					    }
					    ,{
					       xtype:'combo',
					       id:'cboxSearch',
					       name:'search',
					       store : 'Keywords',
					       valueField: 'id',
					       displayField: 'keyword',
					       triggerAction:'query',
					       multiselect:false,
					       anchor:'100%',
					       queryMode:'local',
					       typeahead:true,
					       listeners : {
							afterrender : function(field) {
								field.focus();
							}
        }
					    },
						{ xtype:'container',
							width:'100%',
							layout:'column',
						    items : [{
									xtype : 'checkbox',
									itemId : 'chkTitleQuery',
									cls : 'chkTitles',
									boxLabel : 'Search Titles only',
									columnWidth : .4
								}, {
									xtype : 'container',
									layout : 'column',
									columnWidth : .6,
									items : [{
												// layout:{type:'hbox',pack:'end'},
												xtype : 'button',
												cls : 'frmSearchBtns',
												columnWidth : .5,
												text : 'Clear',
												itemId : 'btnClear',
												tooltip : 'Clears keyword criteria',
												handler : function() {
													this.up('form').getForm()
															.reset();
												}
											}, {
												xtype : 'button',
												cls : 'frmSearchBtns',
												columnWidth : .5,
												text : 'Search',
												itemId : 'btnSearch',
												tooltip : 'Run the search',
												scope : this
											}]
								}]
							}
					    ]
					    }
					 	// cbox, btnSearch, Clear,
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
					 		//TODO: Dynamically add 'home' to breadcrumbs (which come from json call)
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