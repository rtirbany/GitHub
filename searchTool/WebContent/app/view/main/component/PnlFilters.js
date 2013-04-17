// TODO: tabpanel tabs should be equal-sized and fit/stretched
// TODO: plain = true
// TODO: make this more lightweight  
Ext.define('SearchTool.view.main.component.PnlFilters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pnlFilters',
    collapsible: true,
    animCollapse: true,
    collapseDirection: 'left',
    titleCollapse: true,
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
            height: '30%',
            overflowX: 'hidden',
            overflowY: 'auto',
            margin: '5 10 5 5'
        } //search panel top area
        , { 
            xtype: 'tabpanel',
            height:'70%',
            overflowX: 'hidden',
            overflowY: 'auto',
            border: false,
            items: [
                 { //accordion item1
                    title: 'Sources',
                    itemId: 'pnlSources',
                    deferredRender: false,
                    width: '100%',
                    defaults: {
                         labelStyle: 'width:10px;font-size:12px',
                         margin: '5 30 5 5'
                    }
                    }//accordion item1
               , { //tab2
                            xtype: 'panel',
                            title: 'Filters',
                            itemId: 'pnlFacets',
                            deferredRender: false,
                            overflowY: 'hidden',
                            overflowX: 'hidden',
                            width: '100%',
                            layout: {
                                type: 'accordion'
                            },
                            layoutConfig: {
                                titleCollape: true,
                                animate: true,
                                activeOnTop: true
                            } 
                    }//tab2
                    ]
            }

        ]
    });