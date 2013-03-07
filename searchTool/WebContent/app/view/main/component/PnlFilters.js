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
    overflowY: 'auto',
    overflowX: 'hidden',
    defaults: {
        border: true, // required to display border around qrylink
        width: '100%'

    },
    items: [ // contents of west panel within main Search page tab 
//    { //search panel top area
//        //scrollbar working as it should
//        //height working as it should 
//        xtype: 'container',
//        height: '15%',
//        overflowX: 'hidden',
//        overflowY: 'auto',
//        margin: '5 10 5 5',
//        items: [{
//            xtype: 'container',
//            height:'100%',
//            layout: 'hbox',
//            defaults: {
//                margin: '5 20 5 5'
//            },
//            items: [{
//                xtype: 'displayfield',
//                value: 'Filters Options:',
//                width: 100
//            }, {
//                xtype: 'checkbox',
//                labelWidth: 65,
//                width: 85,
//                fieldLabel: 'Remove All'
//            }, {
//                xtype: 'checkbox',
//                labelWidth: 50,
//                width: 70,
//                fieldLabel: 'Relax All'
//            }]
//        }]
//    } //search panel top area
//    ,
    {
        xtype:'container',
        layout: 'accordion',
        items: [{
            title: 'Auto Parts Sources',
            items: [{
                width: '100%',
                defaults: {
                    labelStyle: 'width:10px;font-size:12px'
                },
                items: [{
                    xtype: 'checkboxgroup',
                    itemId: 'chkgrpDataSource',
                    fieldLabel: 'Data Sources',
                    // Distribute controls across 3 even columns, filling
                    // each column from top to bottom before starting the next
                    // column
                    columns: [150],
                    vertical: true,
                    store: 'Sources',
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
                    labelWidth: 85,
                    // Distribute controls across 3 even columns, filling
                    // each column from top to bottom before starting the next
                    // column
                    columns: [.5, .5],
                    vertical: true,
                    items: [
                    // this.getDataUrl()
                    {
                        boxLabel: 'Prod1',
                        xtype: 'checkbox',
                        itemId: 'cboxProd1',
                        checked: true,
                        tooltip: 'Prod1 tooltip',
                        cls: 'cboxProducts'
                    }, {
                        boxLabel: 'Prod2',
                        xtype: 'checkbox',
                        itemId: 'cboxProd2',
                        checked: true,
                        tooltip: 'Prod2 tooltip',
                        cls: 'cboxProducts'
                    }, {
                        boxLabel: 'Prod3',
                        xtype: 'checkbox',
                        itemId: 'cboxProd3',
                        checked: true,
                        tooltip: 'Prod3 tooltip',
                        cls: 'cboxProducts'
                    }, {
                        boxLabel: 'Prod4',
                        xtype: 'checkbox',
                        itemId: 'cboxProd4',
                        checked: true,
                        tooltip: 'Prod4 tooltip',
                        cls: 'cboxProducts'
                    }, {
                        boxLabel: 'Prod5',
                        xtype: 'checkbox',
                        itemId: 'cboxProd5',
                        checked: true,
                        tooltip: 'Prod5 tooltip',
                        cls: 'cboxProducts'
                    }]
                }

                ]
            }]
        }, {
            title: 'facetCategory2',
            html: 'some filter options<BR>more options<BR>more options'
        }, {
            title: 'facetCategory3',
            html: 'some filter options<BR>more options<BR>more options'
        }, {
            title: 'facetCategory4',
            html: 'some filter options<BR>more options<BR>more options'
        }, {
            title: 'facetCategory5',
            html: 'some filter options<BR>more options<BR>more options'
        }, {
            title: 'facetCategory6',
            html: 'some filter options<BR>more options<BR>more options'
        }, {
            title: 'facetCategory7',
            html: 'some filter options<BR>more options<BR>more options'
        }, {
            title: 'facetCategory8',
            html: 'some filter options<BR>more options<BR>more options'
        }, {
            title: 'facetCategory9',
            html: 'some filter options<BR>more options<BR>more options'
        }, {
            title: 'facetCategory10',
            html: 'some filter options<BR>more options<BR>more options'
        }, {
            title: 'facetCategory11',
            html: 'some filter options<BR>more options<BR>more options'
        }]
    }

    ]
    //vbox 
    // west panel items array
});