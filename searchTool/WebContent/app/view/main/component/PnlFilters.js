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
    title : SearchTool.config.Config.titlePnlFilters,
    defaults: {
        xtype:'container',
        width: '100%'
    },
    requires: ['SearchTool.config.Config','SearchTool.view.main.component.FilterMgmt'],
    items: [ // contents of west panel within main Search page tab 
    { //search panel top area
//        //scrollbar working as it should
//        //height working as it should  
        height: '35%',
        overflowX: 'hidden',
        overflowY: 'auto',
//        margin: '5 10 5 5',
//        items: [{
            xtype: 'filtermgmt' 
//            height:'100%',
//            layout: 'hbox'
//             
//                //margin: '5 25 5 5' 
//        }]
    } //search panel top area
    ,
    { 
        layout: 'accordion',
        items: [
          { //accordion item1
            title: 'Auto Parts Sources',
            items: [{
                width: '100%',
                defaults: {
                    labelStyle: 'width:10px;font-size:12px',
                    margin: '5 30 5 5'
                },
                items: [{
                    xtype: 'checkboxgroup',
                    itemId: 'chkgrpDataSource',
                    fieldLabel: 'Data Sources',
                    labelWidth: 75,
                    // Distribute controls across 3 even columns, filling
                    // each column from top to bottom before starting the next
                    // column
                    columns: [100,100],
                    vertical: true, 
                    renderer: function (b, e) {}
                    //TODO: 2/6 Use 'add' b/c items only examined at initiatialzation
                    //                  ,
                    //                  items : [{
                    //                              boxLabel : 'SrcA',
                    //                              xtype : 'checkbox',
                    //                              itemId : 'cboxProd1',
                    //                              checked : true,
                    //                              tooltip : 'Prod1 tooltip',
                    //                              cls : 'cboxProducts'
                    //                          }, {
                    //                              boxLabel : 'SrcB',
                    //                              xtype : 'checkbox',
                    //                              itemId : 'cboxProd2',
                    //                              checked : true,
                    //                              tooltip : 'Prod2 tooltip',
                    //                              cls : 'cboxProducts'
                    //                          }]

                } // Data Sources fieldset
                ,
                {
                    xtype: 'checkboxgroup',
                    itemId: 'chkgrpProducts',
                    fieldLabel: 'Products',
                    labelWidth: 75,
                    // Distribute controls across 3 even columns, filling
                    // each column from top to bottom before starting the next
                    // column
                    columns: [100,100],
                    vertical: true,
                    items: [
                    // this.getDataUrl()
                    {
                        boxLabel: 'Prod1',
                        xtype: 'checkbox',
                        itemId: 'cboxSrc1Prod1', 
                        tooltip: 'Prod1 tooltip',
                        cls: 'cboxProducts'
                    }, {
                        boxLabel: 'Prod2',
                        xtype: 'checkbox',
                        itemId: 'cboxSrc1Prod2', 
                        tooltip: 'Prod2 tooltip',
                        cls: 'cboxProducts'
                    }, {
                        boxLabel: 'Prod3',
                        xtype: 'checkbox',
                        itemId: 'cboxSrc1Prod3', 
                        tooltip: 'Prod3 tooltip',
                        cls: 'cboxProducts'
                    }, {
                        boxLabel: 'Prod4',
                        xtype: 'checkbox',
                        itemId: 'cboxSrcProd4', 
                        tooltip: 'Prod4 tooltip',
                        cls: 'cboxProducts'
                    }, {
                        boxLabel: 'Prod5',
                        xtype: 'checkbox',
                        itemId: 'cboxSrcProd5',
                        tooltip: 'Prod5 tooltip',
                        cls: 'cboxProducts'
                    }]
                }

                ]
            }]
        } //accordion item1
        , 
        { //accordian item2
         title:'Filters',
         width:'100%',
         overflowY: 'auto',
         overflowX: 'hidden',
         items:[  {
            xtype: 'dataview',
            overflowY: 'auto',
            overflowX: 'hidden',
            itemId: 'dvFacets',
            store: 'Facets',
            tpl: SearchTool.util.TplFilter.loaderXTemplateRenderer, 
            itemSelector: 'facet_item', //tr
            emptyText: '(no search params entered)'
        }]
        }
        ]
    }

    ]
    //vbox 
    // west panel items array
});