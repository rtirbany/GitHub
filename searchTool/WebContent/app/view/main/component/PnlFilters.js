// TODO: tabpanel tabs should be equal-sized and fit/stretched
// TODO: plain = true
// TODO: make this more lightweight
Ext.define('SearchTool.view.main.component.PnlFilters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pnlFilters',
    itemId: 'pnlFilters',
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    title: SearchTool.config.Config.titlePnlFilters,
    defaults: {
        width: '100%'
    },
    requires: ['SearchTool.config.Config', 'SearchTool.view.main.component.FilterMgmt'],
    items: [ // contents of west panel within main Search page tab
        { //search panel top area
            //        //scrollbar working as it should
            //        //height working as it should
            xtype: 'filtermgmt',
            height: 150,
            overflowX: 'hidden',
            overflowY: 'auto'
        }, //search panel top area
        {
            xtype: 'tabpanel',
            overflowX: 'hidden',
            overflowY: 'auto',
            border: false,
            height:'70%',
            items: [
                { //tab1
                    title: SearchTool.config.Config.sourceTabTitle,
                    itemId: 'pnlSources',
                    deferredRender: false,
                    width: '100%',
                    border: false,
                    defaults: {
                         width: '100%',
                         margin: '5 30 5 5'
                    }
                },//tab1
                { //tab2
                            xtype: 'panel',
                            //TODO: add title to config file - sourceTabTitle and filterTabTitle
                            title: SearchTool.config.Config.filterTabTitle,
                            itemId: 'pnlFacets',
                            border: false,
                            deferredRender: false,
                            width: '100%', 
                            autoScroll: true,
//                            layoutConfig: {
//                                titleCollapse: true,
//                                animate: true,
//                                multi: true,
//                                animate: true,
//                                reserveScrollbar: true,
//                                manageOverflow: 1
//                            },
                            items:[ 
                              {xtype:'container',
                               height: '100%',
                               itemId: 'cntFacets',
                               layout: 'accordion',
                               items:[{hidden:true}]
                              }
                            ]
                    }//tab2
               ]
            }

        ]
    });