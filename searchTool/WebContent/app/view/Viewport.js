Ext.define('SearchTool.view.Viewport', {
	extend : 'Ext.container.Viewport',
	itemId : 'main',
    alias: 'widget.main',
	requires : [
        'SearchTool.view.main.component.PnlFilters',
        'SearchTool.util.TplFilter',
        'SearchTool.view.main.SearchArea',
		'SearchTool.view.main.ResultsGrid'
    ],
	layout : 'border',
	items : [
        {
          region: 'north',
          border: true,
          width: '100%',
          height: 20,
          bodyStyle:'background-color:'+ SearchTool.config.Config.bgColorBanner +';border-color:'+ SearchTool.config.Config.bgColorBannerBorder+';border:1;width:100%;',
          height: SearchTool.config.Config.heightBanner,
          html: '<div align="center"><b>'+SearchTool.config.Config.msgBanner+'</b></div>'
        },
       { // top banner panel
		region : 'north',
		border: false,
		width : '100%',
		height : 70,
        bodyStyle: 'background-repeat:no-repeat; background-image:url(extjs/resources/images/magellan_logo.png);background-size:auto 100%;',
		layout : {
			type : 'hbox',
			defaultMargins : '2px 5px 5px 5px',
			padding : '2 4 2 4'
		},
		defaults : {
			xtype : 'button'
		},
		items : [
                {
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
	},		// top banner panel
	{
		region : 'center',
        itemId: 'tbCenter',
		xtype : 'tabpanel',
		items : [
            { // searchtab
			    title : 'Search',
			    itemId : 'pnlMainTabSearch',
			    layout : 'border',
			    items : [
                    {
						region : 'north',
						weight : -2,
						border : false,
						items : [
                            {
									xtype : 'searchArea',
									height : 150

							}
                        ]
					},
                    {
                        region : 'west',
                        xtype : 'pnlFilters',
						weight : -1,
						collapseDirection : 'left',
                        collapsible : true,
						animCollapse : true,
						split : true,
						flex : 0.18
					},
					{ // center
						region : 'center',
						border : true,
						xtype : 'resultsgrid',
						flex : 0.82
					}
                ]
		},		// searchtab
		{
			title : 'Preferences',
			xtype : 'container',
			itemId : 'pnlMainTabPrefs',
			layout : 'vbox',
			defaults : {
				bodyPadding : 10,
                width: '100%'
			},
			width : '100%',
			items : [
                {
                    xtype : 'displayfield',
					value : 'Last login:',
					padding : 7
				},
                {
                    xtype : 'displayfield',
					value : 'Last updated:',
					padding : 7
				},
                {
                    xtype : 'container',
                    itemId: 'userPrefs',
					layout : 'hbox',
					width : '100%',
					bodyStyle : 'padding:5px 5px 0',
					defaults : {
						bodyPadding : 7
					},
					items : [
                        {
                            xtype: 'form',
							width : '35%',
                            overflowX: 'hidden',
                            overflowY: 'auto',
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
                            dockedItems: {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        text: 'Save',
                                        iconCls: 'icon-btnOk'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Cancel',
                                        iconCls: 'icon-btnClear',
                                        handler: function (b,e){
                                            this.up('form').reset();
                                        }
                                    }
                                ]
                            },
							items : [
                                {
                                    title : 'Application Settings',
									padding : 5,
                                    items:[
                                        {
                                            xtype : 'combo',
                                            tooltip: 'Set the overall theme/styling',
                                            queryMode : 'local',
                                            store : SearchTool.config.Config.themes,
										    value : SearchTool.config.Config.defaultThemeUser,
										    forceSelection : true,
										    editable : false,
										    autoSelect : true,
										    allowBlank : false,
										    width : 240,
										    fieldLabel : 'Display Style:',
										    listeners : {
                                                    scope : this,
											        select : function(obj, objModel) {
												        Ext.util.CSS.swapStyleSheet('theme', objModel[0].get('field1'));
                                                    }//select listener
										    }//listeners
                                        }//combobox
                                    ]//items
                            },
                            {
                                title : 'Filter/Search Settings',
                                padding : 5,
                                items:[
                                    {
                                        xtype: 'combo',
                                        fieldLabel: 'Date field',
                                        width: 200,
                                        store: SearchTool.config.Config.calendarDateOptions,
                                        value: SearchTool.config.Config.calendarDateOptionUser,
                                        editable: false,
                                        allowBlank: false,
                                        autoSelect: true,
                                        forceSelection: true
                                    },
                                    {
                                        xtype : 'radiogroup',
                                        width : 390,
                                        fieldLabel : 'Search Type',
                                        items : [
                                            {
                                                boxLabel : 'Keyword',
                                                name: 'searchType',
                                                inputValue: 'keyword'
                                            },
                                            {
                                                boxLabel : 'Boolean',
                                                name: 'searchType',
                                                inputValue: 'boolean'
                                            },
                                            {
                                                boxLabel: 'Saved Queries',
                                                name: 'searchType',
                                                inputValue: 'saved'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'radiogroup',
                                        width: 300,
                                        fieldLabel: 'Filters Tab',
                                        items: [
                                            {
                                                boxLabel: SearchTool.config.Config.sourceTabTitle,
                                                name: 'defaultFilterTab',
                                                inputValue: 'sources'
                                            },
                                            {
                                                boxLabel: SearchTool.config.Config.filterTabTitle,
                                                name: 'defaultFilterTab',
                                                inputValue: 'filters'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'checkboxgroup',
                                        width: 300,
                                        fieldLabel: SearchTool.config.Config.sourceTabTitle,
                                        items: [
                                            {
                                                boxLabel: 'Channel 5',
                                                inputValue: 'ch5'
                                            },
                                            {
                                                boxLabel: SearchTool.config.Config.filterTabTitle,
                                                inputValue: 'filters'
                                            }
                                        ]
                                        /*
                                        * for (i = 0; i < this.data.items.length; i++) {
                                        *     t = this.data.items[i];
                                        *     chkgrp = Ext.create('Ext.form.CheckboxGroup',{
                                        *         fieldLabel: t.data.repositoryId,
                                        *         name: t.data.repositoryId,
                                        *         itemId: t.data.repositoryId,
                                        *         layout: 'vbox',
                                        *         labelWidth: 75,
                                        *         columns: [.8]
                                        *     });
                                        * }
                                        * for (j = 0; j < this.getAt(0).products().data.items.length; j++){
                                        *     var c = this.getAt(0).products().getAt(j).get('productName'),
                                        *     prodBox = { xtype: 'checkbox', name: t.data.repositoryId+'.'+c, inputVale:t.data.repositoryId+'.'+c,boxLabel: c};
                                        *     chkboxes: push(prodbox);
                                        * }
                                        * chkgroup.add(chkboxes);
                                        * chkboxes.length = 0;
                                        * pnl.add(chkgroup);
                                        * }
                                        * */
                                    }
                                    ]
                                },
                                {
                                    title : 'Calendar/Date Settings:',
                                    padding : 5,
                                    items:[
                                        {
                                            xtype : 'radiogroup',
                                            width : 300,
                                            fieldLabel : 'Range Type',
                                            items : [
                                                {
                                                    boxLabel : 'Standard',
                                                    name: 'defaultDateRangeType',
                                                    inputValue: 'standard'
                                                },
                                                {
                                                    boxLabel : 'Custom',
                                                    name: 'defaultDateRangeType',
                                                    inputValue: 'custom'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            columns: 3,
                                            vertical: true,
                                            columnWidth: .32,
                                            fieldLabel: 'Range Default',
                                            items: [
                                                {
                                                    boxLabel: '30 days',
                                                    name: 'defaultDateRange',
                                                    inputValue: '-30'
                                                },
                                                {
                                                    boxLabel: '60 days',
                                                    name: 'defaultDateRange',
                                                    inputValue: '-60'
                                                },
                                                {
                                                    boxLabel: '90 days',
                                                    name: 'defaultDateRange',
                                                    inputValue: '-90'
                                                },
                                                {
                                                    boxLabel: '180 days',
                                                    name: 'defaultDateRange',
                                                    inputValue: '-180'
                                                },
                                                {
                                                    boxLabel: '1 year',
                                                    name: 'defaultDateRange',
                                                    inputValue: '-1y'
                                                },
                                                {
                                                    boxLabel: 'All',
                                                    name: 'defaultDateRange',
                                                    inputValue: ''
                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'radiogroup',
                                            width : 300,
                                            fieldLabel : 'Calendar Type',
                                            items : [
                                                {
                                                    boxLabel : 'Calendar',
                                                    name: 'defaultCalendarType',
                                                    inputValue: 'calendar'
                                                },
                                                {
                                                    boxLabel : 'Fiscal',
                                                    name: 'defaultCalendarType',
                                                    inputValue: 'fiscal'
                                                }
                                            ]
                                        }
                                    ]
                        },
                        {
										title : 'Results Settings',
										padding : 5,
									items:[ {
										xtype : 'combo',
										itemId : 'prefComboPageSize',
                                        fieldLabel: 'Results per page',
										width : 200,
										store : SearchTool.config.Config.PageSizeOptions,
										value : SearchTool.config.Config.defaultPageSizeUser,
										editable : false,
										allowBlank : false,
										autoSelect : true,
										forceSelection : true,
										fieldLabel : 'Results Per Page'
									},
                                    {
                                        xtype : 'radiogroup',
										width : 300,
										fieldLabel : 'Results List Style',
										items : [
                                            {
                                                boxLabel : 'Grid',
                                                name: 'defaultResultsStyle',
                                                inputValue: 'grid'
                                            },
                                            {
                                                boxLabel : 'Search',
                                                name: 'defaultResultsStyle',
                                                inputValue: 'search'
                                            }
                                        ]
                                    },
                                    {
                                        xtype : 'radiogroup',
                                        width : 300,
                                        fieldLabel : 'View format',
                                        items : [
                                            {
                                                boxLabel : 'Html',
                                                name: 'defaultViewFormat',
                                                inputValue: 'html'
                                            },
                                            {
                                                boxLabel : 'Xml',
                                                name: 'defaultViewFormat',
                                                inputValue: 'xml'
                                            },
                                            {
                                                boxLabel : 'Text',
                                                name: 'defaultViewFormat',
                                                inputValue: 'raw'
                                            }
                                        ]
                                    }
                                 ]
                        }
                    ]
                },
				{
                    title : 'Admin Settings',
					width : '45%',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    defaults:
                        {
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
                            fieldLabel : SearchTool.config.Config.dfAdminSettings,
							padding : 5
                        },
					    {
                            value : 'Calendar Settings',
                            padding : 5
                        },
                        {
                            fieldLabel : 'Default date range',
							value : SearchTool.config.Config.defaultDateAmt
										+ ' '
										+ SearchTool.config.Config.defaultDatePeriod.substring(1 + SearchTool.config.Config.defaultDatePeriod.lastIndexOf('.')).toLowerCase()
						},
                        {
                            fieldLabel : 'Week start (0=Sun,1=Mon...)',
							value : SearchTool.config.Config.customCalendarWeekstart
						},
                        {
                            fieldLabel : '6-month cal-based (0=False,1=True)',
                            value : SearchTool.config.Config.customCalendarSixMonthFromCurrent
                        },
                        {
                            fieldLabel : '6-month start (1=Jan,2=Feb...)',
                            value : SearchTool.config.Config.customCalendarSixMonthstart
					    },
                        {
						    fieldLabel : 'Fiscal Year end (MM/DD)',
							value : SearchTool.config.Config.customCalendarFiscalMonthDay.substring(0, SearchTool.config.Config.customCalendarFiscalMonthDay.length- 1)
                        },
                        {
                            value : 'Results Settings:',
                            width: '100%',
                            padding : 5
                        },
                        {
                            fieldLabel : 'Default sort column',
                            value : SearchTool.config.Config.defaultSortProperty
                        },{
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
							},
                        {
                            value: 'Visualization:',
                            padding: 5
                        },
                        {
                                fieldLabel: 'Widget name',
                                value: SearchTool.config.Config.vizWidgetName
                        },
                        {
                            fieldLabel: 'Launch new widget',
                            value: SearchTool.config.Config.vizWidgetSingleton
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