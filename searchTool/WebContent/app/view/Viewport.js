Ext.define('SearchTool.view.Viewport', {
    extend: 'Ext.container.Viewport',
    itemId: 'main',
    requires: ['SearchTool.view.main.pnlSearchNav',
        'SearchTool.view.main.SearchArea',
        'SearchTool.view.main.ResultsGrid',
        'SearchTool.view.main.component.WinSave'],
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
        items: [{
            //TODO: use 'component' for logo
            //width:, style:(bordering,padding,etc), html:(img src,style='w:X;h:Y') 
            xtype: 'tbtext',
            text: 'CHROME Search'
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            itemId: 'btnHome',
            text: 'Home',
            iconCls: 'icon-home'
        }, {
            xtype: 'button',
            itemId: 'btnHelp',
            text: 'Help',
            iconCls: 'icon-help'
        }, {
            xtype: 'button',
            itemId: 'btnSupport',
            text: 'Contact Us',
            iconCls: 'icon-contact'
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'button',
            text: 'Logout',
            itemId: 'btnLogout',
            iconCls: 'icon-logout'
        }]
    } // top banner panel
    ,
    {
        region: 'center',
        xtype: 'tabpanel',
        items: [{ // searchtab
            title: 'Search',
            itemId: 'pnlMainTabSearch',
            id: 'searchMainTabPanel',
            layout: 'border',
            items: [{
                region: 'north',
                border: false,
                items: [{
                    xtype: 'searchArea',
                    height: 160

                }]
            }
            //                            ,
            //                               {
            //                                    region : 'west',
            //                                    itemId : 'pnlSources',
            //                                    title : 'Sources',
            //                                    layout : {
            //                                         type : 'fit',  
            //                                         align : 'stretch'
            //                                    },
            //                                    collapsible : true,
            //                                    animCollapse : true,
            //                                    collapseDirection : 'left',
            //                                    collapsed : true,
            //                                    split : true, 
            //                                    xtype: 'pnlSources',
            //                                    flex : .18
            //                               },
            //                               {
            //                                    region : 'west',
            //                                    itemId : 'pnlSearch',
            //                                    title : 'Filters',
            //                                    layout : {
            //                                         type : 'fit',  
            //                                         align : 'stretch'
            //                                    },
            //                                    collapsible : true,
            //                                    animCollapse : true,
            //                                    collapseDirection : 'left',
            //                                    split : true,
            //                                    xtype: 'pnlSearch',
            //                                    flex : .25
            //                               }
            ,

            { // center
                region: 'center',
                border: true,
                //xtype:'resultsgrid',
                flex: .75
            }]
        } // searchtab
        //                              , 
        //                              {//admin tab
        //                                   title : 'Admin', 
        //                                   html : '(Admin pages go here)',
        //                                   tooltip : 'admin pages appear here'
        //                              }// admin tab contents

        ]
    }]

});