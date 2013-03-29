var sm = Ext.create('Ext.selection.CheckboxModel', {
    checkOnly: true,
    listeners: {
        'selectionchange': function () {
            var btn = Ext.ComponentQuery.query('#btnAddToCart')[0];
            var cnt = this.getCount();
            btn.setDisabled(cnt == 0);
            btn.setText('Save Selected Results (' + cnt + ')');
        }
    }
});


Ext.define('SearchTool.view.main.ResultsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.resultsgrid',
    cls: 'mygrid',
    requires: ['SearchTool.config.Config', 'SearchTool.view.main.component.WinSave', 'SearchTool.util.TplFilter'],
    title: 'Results',
    tools: [{
            xtype: 'tbspacer',
            width: 20
        }, {
            xtype: 'displayfield',
            value: 'Display style:',
            width: 85,
            cls: 'resultsgridtitle'
        }, {
            xtype: 'radiogroup',
            width: 100,
            columns: [.47, .52],
            cls: 'rdo_displaystype',
            items: [{
                    boxLabel: 'Grid',
                    width: 55,
                    checked: true,
                    cls: 'resultsgridvalue'
                }, {
                    boxLabel: 'Search',
                    width: 60,
                    disabled: true,
                    cls: 'resultsgridvalue'
                }
            ]
        }, {
            xtype: 'tbseparator',
            width: 30
        }, {
            xtype: 'button',
            name: 'chkSaveQuery',
            itemId: 'chkSaveQuery',
            cls: 'chkSaveQuery',
            text: 'Save Search',
            tip: SearchTool.config.Config.searchSaveChkCaptionLabel
        }, {
            xtype: 'tbspacer',
            width: 20
        }, {
            xtype: 'dataview',
            itemId: 'dvResultsParams',
            store: 'QueryFilters',
            tpl: SearchTool.util.TplFilter.loaderXTemplateRenderer,
            autoSync: true,
            height: 40,
            width: 650,
            overflowY: 'hidden',
            overflowX: 'hidden',
            itemSelector: 'input.btn_searchitem_remove13',
            //overItemCls: 'facetitem-over',
            //iconCls: 'icon-btnClear',
            emptyText: '(no search params entered)'
        }, {
            xtype: 'tbspacer',
            width: 20

        }

        , {
            type: 'help',
            tooltip: 'Help page for Results area',
            handler: function (ev, el, p) {}
        }
    ],
    store: 'Results',
    loadMask: true,
    viewConfig: {
        stripeRows: true
        //      ,
        //      getRowClass : function(r,i,p,d){ 
        //          var c = r.get('product');
        //          debugger;
        //          if (c = 'a') {
        //                return 'childRow';
        //            } else  
        //                return 'parentRow';
        //      }
    },
    autoScroll: true,
    selModel: sm,
    dockedItems: [{
            xtype: 'toolbar',
            //        xtype: 'pagingtoolbar',
            store: 'Results',
            cls: 'mytbar',
            hideRefresh: true,
            displayMsg: 'Results {0} - {1} of {2}',
            dock: 'top',
            displayInfo: true,
            emptyMsg: 'No items to display',
            prependButtons: true,
            items: [{
                    xtype: 'tbspacer',
                    width: 2
                }, {
                    xtype: 'button',
                    itemId: 'btnAddToCart',
                    iconCls: 'icon-btnCartAdd',
                    //                  type : 'submit',
                    //                  url : '/addtocart',
                    text: 'Save (-)',
                    cls: 'btnPagingToolbar',
                    disabled: true,
                    width: 90,
                    scale: 'medium', //'large', // medium works well in IE, FFox

                    handler: function () {
                        //                var ws = Ext.create('SearchTool.view.main.component.WinSave');
                        //                ws.show();
                        //            }
                        var ids = '';
                        Ext.each(this.up('panel').getSelectionModel().getSelection(), function (row, index, value) {
                            ids += row.data.product + ',';
                        });
                        ids = ids.slice(0, -1);
                        // Ext.Ajax.request({
                        // method:'GET',
                        // url: this.url,
                        // params:{'id':ids},
                        //                        
                        // success : function(action){},
                        // failure : function(action){},
                        // scope : this
                        //             });
                    }
                }, {
                    xtype: 'tbseparator'
                },

                //          {
                //            xtype: 'tbseparator'
                //        }
                //        , 
                //          {
                //            xtype: 'combo',
                //            fieldLabel: 'Results Per Page',
                //            labelAlign: 'right',
                //            labelWidth: 55,
                //            itemId: 'cbPageSize',
                //            fields: ['pagesize', 'pagesizeval'],
                //            store: SearchTool.config.Config.PageSizeOptions,
                //            queryMode: 'local',
                //            value: SearchTool.config.Config.defaultPageSize,
                //            editable: false,
                //            typeAhead: false,
                //            displayField: 'pagesize',
                //            valueField: 'pagesizeval',
                //            matchFieldWidth: true,
                //            forceselection: true,
                //            allowBlank: false,
                //            selectOnFocus: false,
                //            width: 120,
                //            listeners: {
                //                'change': function () {
                //                    this.up('pagingtoolbar').store.load({
                //                        start: 0,
                //                        limit: this.value
                //                    });
                //                }
                //            }
                //        }
                , {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'tbfill'
                }
                //          {
                //            xtype: 'tbfill'
                //        }, {
                //            xtype: 'tbfill'
                //        }, {
                //            xtype: 'tbfill'
                //        }, {
                //            xtype: 'tbfill'
                //        }, {
                //            xtype: 'tbfill'
                //        }, {
                //            text: 'Print',
                //            tooltip: 'Print Results',
                //            iconCls: 'icon-btnPrint'
                //        }, {
                //            xtype: 'tbseparator'
                //        }, {
                //            text: 'Export',
                //            iconCls: 'icon-btnExport',
                //            align: 'right',
                //            menu: {
                //                plain: true,
                //                showSeparator: true,
                //                items: [{
                //                    text: 'Export as Excel',
                //                    iconCls: 'icon-mnuExcel',
                //                    tooltip: 'Export Results as Excel (.xlsx) file'
                //                }, {
                //                    text: 'Export as PDF',
                //                    iconCls: 'icon-mnuPdf',
                //                    tooltip: 'Export Results as PDF (.pdf) file'
                //                }]
                //            }
                //        }]
                //    }
            ]
        }
    ],
    listeners: {
        itemdblclick: function (dv, rec, item, idx, e) {
            Ext.create('Ext.panel.Panel', {
                title: '[Document Viewer: ' + rec.data.source + ' ' + rec.data.serial + ']',
                width: 600,
                height: 600,
                closable: true,
                animCollapse: true,
                titleCollapse: true,
                collapsible: true,
                resizable: {
                    handles: 's se e',
                    preserveRatio: false
                },
                draggable: true,
                floating: true,
                items: [{
                        xtype: 'component',
                        autoEl: {
                            tag: 'iframe',
                            style: 'height:100%; width:100%; border:none;',
                            src: 'data/acro.html'
                        }
                    }
                ]
            }).show();
        }
    },
    initComponent: function () {
        //Per Scott - by default: Source(hidden), Product, Pub Date, Serial #, Subject, Summary
        this.columns = [{
                text: 'Source',
                dataIndex: 'source',
                width: 75,
                align: 'center',
                hidden: true,
                sortable: true,
                tooltip: 'Source',
                renderer: function (val) {
                    if (val == 'B') {
                        return '<span style="color:red;">' + val + '</span>';
                    } else return val;
                }
            },
            //          {
            //            text: 'Pub Date',
            //            dataIndex: 'dt',
            //            xtype: 'datecolumn',
            //            format: SearchTool.config.Config.rsDateColFormat,
            //            width: 80,
            //            align: 'center',
            //            hidden: true,
            //            sortable: true,
            //            tooltip: 'Pub Date'
            //        }, 
            {
                text: 'Product',
                dataIndex: 'product',
                width: 80,
                sortable: true,
                align: 'center',
                tooltip: 'Product'
            }, {
                text: 'Serial No.',
                dataIndex: 'serial',
                flex: 1,
                sortable: true,
                align: 'left',
                tooltip: 'Serial No.'
            }, {
                text: 'Summary',
                dataIndex: 'summary',
                flex: 2,
                sortable: true,
                align: 'center',
                tooltip: 'Summary',
                renderer: function (v, m, r) {
                    m.style += "white-space: normal;text-align: left;";
                    return v;
             }
         }
        ],

        //  this.control({
        //      'combo[itemId=cbPageSize]' : {
        //          select : this.rsPageSizeSet
        //      }
        //  });

        this.callParent(arguments);
    },

    rsPageSizeSet: function () {
        //      var ps = parseInt(record.get(''))
        this.down('pagingtoolbar').store.reload();
    }

});