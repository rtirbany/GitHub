Ext.define('SearchTool.view.Viewport', {
    extend: 'Ext.container.Viewport',
    itemId: 'main',
    requires: [
            'SearchTool.view.main.component.PnlFilters',
            'SearchTool.util.TplFilter',
            'SearchTool.view.main.SearchArea',
            'SearchTool.view.main.ResultsGrid'
    ],
    layout: 'border',
    items: [{ //top banner panel 
            region: 'north',
            border: false,
            width: '100%',
            height: 60,
            layout: {
                type: 'hbox',
                defaultMargins: '2px 5px 5px 5px',
                padding: '2 4 2 4'
            },
            defaults: {
                xtype: 'button'
            },
            items: [{
                    //TODO: use 'component' for logo
                    //width:, style:(bordering,padding,etc), html:(img src,style='w:X;h:Y') 
                    xtype: 'tbtext',
                    text: 'Classic Auto Parts Search Tool'
                }, {
                    xtype: 'tbfill'
                }, {
                    itemId: 'btnHome',
                    text: 'Home',
                    iconCls: 'icon-home'
                }, {
                    itemId: 'btnHelp',
                    text: 'Help',
                    iconCls: 'icon-help'
                }, {
                    itemId: 'btnSupport',
                    text: 'Contact Us',
                    iconCls: 'icon-contact'
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'tbseparator'
                }, {
                    text: 'Logout',
                    itemId: 'btnLogout',
                    iconCls: 'icon-logout'
                }
            ]
        } // top banner panel
        , {
            region: 'center',
            xtype: 'tabpanel',
            items: [{ // searchtab
                    title: 'Search',
                    itemId: 'pnlMainTabSearch',
                    id: 'searchMainTabPanel',
                    layout: 'border',
                    items: [{
                            region: 'north',
                            weight: -2,
                            border: false,
                            items: [{
                                    xtype: 'searchArea',
                                    height: 132

                                }
                            ]
                        }, {
                            xtype: 'pnlFilters',
                            region: 'west',
                            weight: -1,
                            collapsible: true,
                            collapseDirection: 'left',
                            animCollapse: true,
                            split: true,
                            flex: .25
                        },

                        { // center
                            region: 'center',
                            border: true,
                            xtype: 'resultsgrid',
                            flex: .75
                        }
                    ]
                } // searchtab
                //                              , 
                //                              {//admin tab
                //                                   title : 'Admin', 
                //                                   html : '(Admin pages go here)',
                //                                   tooltip : 'admin pages appear here'
                //                              }// admin tab contents

            ]
        }
    ]

});