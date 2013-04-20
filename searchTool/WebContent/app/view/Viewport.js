Ext.define('SearchTool.view.Viewport', {
	extend : 'Ext.container.Viewport',
	itemId : 'main',
	requires : ['SearchTool.view.main.component.PnlFilters',
			'SearchTool.util.TplFilter', 'SearchTool.view.main.SearchArea',
			'SearchTool.view.main.ResultsGrid'],
	layout : 'border',
	items : [{ // top banner panel
		region : 'north',
		border : false,
		width : '100%',
		height : 60,
		layout : {
			type : 'hbox',
			defaultMargins : '2px 5px 5px 5px',
			padding : '2 4 2 4'
		},
		defaults : {
			xtype : 'button'
		},
		items : [{
					// TODO: use 'component' for logo
					// width:, style:(bordering,padding,etc), html:(img
					// src,style='w:X;h:Y')
					xtype : 'tbtext',
					text : 'Classic Auto Parts Search Tool'
				}, {
					xtype : 'tbfill'
				}, {
					itemId : 'btnHome',
					text : 'Home',
					iconCls : 'icon-home'
				}, {
					itemId : 'btnHelp',
					text : 'Help',
					iconCls : 'icon-help'
				}, {
					itemId : 'btnSupport',
					text : 'Contact Us',
					iconCls : 'icon-contact'
				}, {
					xtype : 'tbseparator'
				}, {
					xtype : 'tbseparator'
				}, {
					text : 'Logout',
					itemId : 'btnLogout',
					iconCls : 'icon-logout'
				}]
	}		// top banner panel
	, {
		region : 'center',
		xtype : 'tabpanel',
		items : [{ // searchtab
			title : 'Search',
			itemId : 'pnlMainTabSearch',
			layout : 'border',
			items : [{
						region : 'north',
						weight : -2,
						border : false,
						items : [{
									xtype : 'searchArea',
									height : 132

								}]
					}, {
						xtype : 'pnlFilters',
						region : 'west',
						weight : -1,
						collapsible : true,
						collapseDirection : 'left',
						animCollapse : true,
						split : true,
						flex : .18
					},

					{ // center
						region : 'center',
						border : true,
						xtype : 'resultsgrid',
						flex : .82
					}]
		},		// searchtab
		{

			title : 'Preferences',
			xtype : 'container',
			itemId : 'pnlMainTabPrefs',
			layout : 'vbox',
			defaults : {
				bodyPadding : 10
			},
			width : '100%',
			items : [{
						xtype : 'displayfield',
						value : 'Last login:',
						padding : 7
					}, {
						xtype : 'displayfield',
						value : 'Last updated:',
						padding : 7
					}, {
						xtype : 'container',
						layout : 'hbox',
						width : '100%',
						bodyStyle : 'padding:5px 5px 0',
						defaults : {
                            xtype:'panel',
							bodyPadding : 7
						},
						items : [{
							width : '40%',
                            height: '100%',
							title : 'User Settings',
							bodyPadding : 10,
							defaults : {
								xtype : 'fieldset',
								width : '100%',
								padding : 10,
							    collapsible : true,
                                border: false,
                                collapsed: true
							},
							items : [ {
										title : 'Application Settings',
										padding : 5,
                                        items:[
									   {
										xtype : 'combo',
										queryMode : 'local',
										store : SearchTool.config.Config.themes,
										value : SearchTool.config.Config.defaultThemeUser,
										forceSelection : true,
										editable : false,
										autoSelect : true,
										allowBlank : false,
										width : 240,
										fieldLabel : 'Display Style',
										listeners : {
											scope : this,
											select : function(obj, objModel) {
												Ext.util.CSS.swapStyleSheet(
														'theme', objModel[0]
																.get('field1'))

											}
										}
                                    }]},{  
                                                  title : 'Search Settings',
                                                  padding : 5,
                                                  items:[{
                                                  xtype : 'radiogroup',
                                                  width : 250,
                                                  fieldLabel : 'Search Type',
                                                  items : [{
                                                                 boxLabel : 'Keyword'
                                                            }, {
                                                                 boxLabel : 'Boolean'
                                                            }

                                                  ]}]}
                                                  ,
									 
                                             
                                             
                                             { 
                                                  title : 'Calendar Settings',
                                                  padding : 5,
                                                  items:[
                                                  {
                                                  xtype : 'radiogroup',
                                                  width : 250,
                                                  fieldLabel : 'Calendar Type',
                                                  items : [{
                                                                 boxLabel : 'Calendar'
                                                            }, {
                                                                 boxLabel : 'Fiscal'
                                                            }

                                                  ]
									}]}, { 
										title : 'Results Settings',
										padding : 5,
									items:[ {
										xtype : 'combo',
										itemId : 'prefComboPageSize',
										width : 200,
										store : SearchTool.config.Config.PageSizeOptions,
										value : SearchTool.config.Config.defaultPageSizeUser,
										editable : false,
										allowBlank : false,
										autoSelect : true,
										forceSelection : true,
										fieldLabel : 'Results Per Page'
									}, {
										xtype : 'radiogroup',
										width : 225,
										fieldLabel : 'Results List Style',
										items : [{
													boxLabel : 'Grid'
												}, {
													boxLabel : 'Search'
												}

										]
                                    }
                                 ]}]}
						 , { 
							title : 'Admin Settings',
							width : '40%',
                            defaults:{
//                                xtype : 'fieldset',
//                                width : '100%',
//                                padding : 10,
//                                collapsible : true,
//                                border: false,
//                                collapsed: true
                                   xtype : 'displayfield',
                                   labelWidth:220,
                                   padding: 10
                            },
							items : [
                            {
								value : SearchTool.config.Config.dfAdminSettings,
								padding : 5
							}, { 
                                value : 'Calendar Settings',
                                padding : 5}
                            ,
                                 
                                 { 
								fieldLabel : 'Default date range',
								value : SearchTool.config.Config.defaultDateAmt
										+ ' '
										+ SearchTool.config.Config.defaultDatePeriod.substring(1 + SearchTool.config.Config.defaultDatePeriod.lastIndexOf('.')).toLowerCase()
							}, {
								fieldLabel : 'Week start (0=Sun,1=Mon...)',
								value : SearchTool.config.Config.customCalendarWeekstart
							}, { 
                                fieldLabel : '6-month cal-based (0=False,1=True)',
                                value : SearchTool.config.Config.customCalendarSixMonthFromCurrent
                            }, { 
                                fieldLabel : '6-month start (1=Jan,2=Feb...)',
                                value : SearchTool.config.Config.customCalendarSixMonthstart
							}, { 
								fieldLabel : 'Fiscal Year end (MM/YY)',
								value : SearchTool.config.Config.customCalendarFiscalMonthDay.substring(0, SearchTool.config.Config.customCalendarFiscalMonthDay.length- 1)
                            }, { 
                                value : 'Results Settings:',
                                padding : 5
                            }, {
                                        fieldLabel : 'Favorites max',
                                        value : SearchTool.config.Config.numMaxFavorites
                            }, {
								fieldLabel : 'Saved Queries max',
								value : SearchTool.config.Config.numMaxQuerySave
							}, {
                                fieldLabel : 'Export warning',
                                value : SearchTool.config.Config.warningExport
                            } ,{
								fieldLabel : 'Results max',
								value : SearchTool.config.Config.maxResults
							}  
							]
						}

						 

					 ]
		}
		// ,
		// {//admin tab
		// title : 'Admin',
		// html : '(Admin pages go here)',
		// tooltip : 'admin pages appear here'
		// }// admin tab contents

		]
	}]

}]});