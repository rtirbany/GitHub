Ext.define('SearchTool.view.main.SearchArea', {
	extend : 'Ext.container.Container',
	alias : 'widget.searchArea',
	height : 120,
	constrain : true,
	requires : ['SearchTool.view.main.component.SearchBoolean',
			'SearchTool.config.Config'],
	layout : 'hbox',
	items : [{
				xtype : 'tabpanel',
				width : '85%',
                cls: 'searchTab',
                defaults:{
                layout:'fit'
                
                },
				items : [
                    {
					title : 'Keyword Search',
					items : [{
						xtype : 'form',
						layout : 'hbox',
						margins : '8 8 8 5',
						defaults : {
							width : '40%',
							border : false
						},
						items : [
                            {
							xtype : 'container',
							layout : {
								type : 'vbox',
								defaultMargins : '8px 5px 4px 10px',
								padding : '0 5 0 5'
							},
							items : [{
								xtype : 'displayfield',
                                width : '100%',
								padding : '0 5 0 5',
								fieldCls : 'dfWildcard',
								labelCls : 'dfLabel',
								fieldLabel : SearchTool.config.Config.searchCboxCaptionLabel,
								value : SearchTool.config.Config.searchCboxCaptionValue
							},

							{  
									xtype : 'combo',
									margins : '0 15 0 15',
									itemId : 'cboxSearch',
									name : 'keywordString',
									store : 'Keywords',
									width : '100%',
									valueField : 'id',
									displayField : 'keyword',
									hideTrigger : true,
									triggerAction : 'query',
									multiselect : false,
									queryMode : 'local',
									typeahead : true,
									//vtype : 'searchKeyword',
									/*
									                      Ext.apply(Ext.form.field.VTypes, {
									                            searchKeyword: function(val, field) {
									                       if (/^[a-z0-9]+$/i.test(val)) {
									                            return true;
									                  }
									                  },
									                  searchKeywordText: 'Keyword search only contain letters and numbers.'
									                        });
									 * 
									 * */
									listeners : {
										afterrender : function(field) {
											field.focus();
										} //afterrender
										,
										specialkey : function(field, event) {
											if (event.getKey() == event.ENTER) {
												field.up('form').getForm()
														.submit();
											} //if
										} //specialkey
									} //listeners
								 
									//cboxsearch
							}, {
								xtype : 'checkbox',
								defaultMargins : '1px 5px 0px 5px',
								padding : '0 5 0 5',
								itemId : 'chkSummaryOnlySearch',
								name : 'chkSummaryFieldOnly',
								cls : 'chkSummaryOnly',
								boxLabel : SearchTool.config.Config.searchChkCaptionLabel
							}]
						}		//container w/ summary only, search buttons
						, {	//FROM, TO dates
									xtype : 'container',
									width : '100%',
									layout : {
										type : 'hbox',
										defaultMargins : '38px 1px 2px 10px',
										padding : '0 10 0 2',
										cellPadding : 4

									},
									defaults : {
										xtype : 'datefield',
										maxWidth : 180
									},
									listeners : {
										afterrender : function() {
											var field = this.down('datefield');
											field
													.setValue(Ext.Date
															.add(
																	new Date(),
																	Ext.Date.MONTH,
																	SearchTool.config.Config.defaultDateAmt));
											Ext.form.field.VTypes.DateRange(
													field.value, field);
										}
									},
									items : [{
										name : 'startDate',
										deferredRender : false,
										itemId : 'dtUserSearchFrom',
										emptyText : 'mm/dd/yyyy',
										altFormats : 'mdY',
										maxValue : new Date(),
										labelWidth : 30,
										width : 135,
										fieldLabel : 'From',
										vfield : 'searchFromDate',
										endDateField : 'dtUserSearchTo',
										vtype : 'DateRange',
										//value: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, SearchTool.config.Config.defaultDateAmt),'m-d-Y'),
										listeners : {
											scope : this,
											change : function(field, newValue,
													oldValue) {
												if (newValue === null) {
													Ext.form.field.VTypes
															.DateRange(
																	newValue,
																	field);
												}
											}
										}
									}, {
										name : 'endDate',
										itemId : 'dtUserSearchTo',
										labelWidth : 18,
										width : 120,
										emptyText : 'mm/dd/yyyy',
										altFormats : 'mdY',
										maxValue : new Date(),
										fieldLabel : 'To',
										vfield : 'searchToDate',
										vtype : 'DateRange',
										startDateField : 'dtUserSearchFrom',
										value : new Date(),
										listeners : {
											scope : this,
											change : function(field, newValue,
													oldValue) {
												if (newValue === null) {
													Ext.form.field.VTypes
															.DateRange(
																	newValue,
																	field);
												}
											}
										}
									},
											//{ xtype:'checkbox', boxLabel:'Other Date range types', fieldLabel:'Other Date ranges', labelWidth:10},
											{
												xtype : 'button',
												width : 80,
												minWidth : 80,
												maxWidth : 100,
												text : 'Custom',
												itemId : 'btnCustomDate',
												cls : 'btnDateRanges',
												tooltip : 'Define a custom date range'

											} //, enableToggle:true
									]
								}, //container
                                        {
                    xtype : 'hidden',
                    itemId : 'hdnBool',
                    name : 'booleanQueryString',
                    value : ''
               }
						]
							//forms item array
					}		//form (all below items belong to hbox)
					]//items within 1st tab
				}

				, {	//Advanced Search area
							title : SearchTool.config.Config.qryBuilderCaptionLabel,
                            itemId: 'tbAdvanced',
							overflowX : 'hidden',
							overflowY : 'auto',
							border : false,
							tooltip : 'Boolean query entry',
							items : [{
										xtype : 'searchBoolean'
									}]
							//fieldset items 
						}, {
							xtype : 'container',
							itemId : 'tbSaved',
							title : 'Saved Queries',
							layout : {
								type : 'vbox',
								align : 'center'
							}
						}, {
							xtype : 'container',
							itemId : 'tbHistory',
							title : 'Query History',
							layout : {
								type : 'vbox',
								align : 'center'
							},
							disabled : true
						}]
			} //tabpanel
			, {
				xtype : 'container',
				layout : 'vbox',
				margins : '10 10 10 10',
				defaults : {
					cls : 'frmSearchBtns',
					iconAlign : 'left'

				},
				items : [{
					xtype : 'checkbox',
					name : 'chkSaveQuery',
					itemId : 'chkSaveQuery',
					cls : 'chkSaveQuery',
					boxLabel : SearchTool.config.Config.searchSaveChkCaptionLabel
				}, {
					xtype : 'button',
					margins : '10 10 10 10',
					text : 'Reset',
					itemId : 'btnClear',
					iconCls : 'icon-btnClear',
					tooltip : SearchTool.config.Config.searchBtnClearTtip,
					handler : function() {
						var f = this.up('tabpanel').down('form');
                        f.getForm().reset();
                        tmp = Ext.ComponentQuery.query('#txtSearchBoolean')[0].reset();
						var field = f.down('datefield').next('datefield');
						Ext.form.field.VTypes.DateRange(field.value, field);
						field = f.down('datefield');
						field.setValue(Ext.Date.add(new Date(), Ext.Date.MONTH,
								SearchTool.config.Config.defaultDateAmt));
						Ext.form.field.VTypes.DateRange(field.value, field);
					}
				}, {
					xtype : 'button',
					margins : '10 10 10 10',
					text : 'Search',
					itemId : 'btnSearch',
					iconCls : 'icon-btnSearch',
					tooltip : SearchTool.config.Config.searchBtnSearchTtip,
					scope : this
				}]
			}]
}
);