var sm = Ext.create('Ext.selection.CheckboxModel', {
    checkOnly: true,
    listeners: {
        'selectionchange': function () {
            var btn = Ext.ComponentQuery.query('#btnAddToCart')[0];
            var cnt = this.getCount();
            btn.setDisabled(cnt == 0);
            btn.setText('Save (' + cnt + ')');
        }
    }
});


Ext.define('SearchTool.view.main.ResultsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.resultsgrid',
    overflowX: 'hidden',
    overflowY: 'hidden',
    cls: 'gridResults',
    requires: ['SearchTool.config.Config', 'SearchTool.view.main.component.WinSave', 'SearchTool.util.TplFilter'],
    title:'Results',
    header:{
    xtype : 'container',
    layout:'hbox',
    items:[
         {
            xtype: 'tbspacer',
            width: '2%',
            maxWidth: 6,
            minWidth: 4
        },
        
        {
             xtype: 'displayfield',
             value: 'Results:',
             width: '7%',
             cls: 'resultsgridtitle'
        },
        {
          xtype:'combo',
          cls: 'resultsgridcombo',
          maxWidth:120,
          minWidth:120,
          fieldLabel:'Style',
          labelWidth:40,
          labelAlign:'right',
          disabled:true,
          store: SearchTool.config.Config.ResultsDisplayOptions,
          value: SearchTool.config.Config.defaultResultsDisplayUser,
          editable: false,
          autoSelect: true,
          forceSelection: true
        }, {
            xtype: 'tbspacer',
            width: '2%',
            maxWidth: 6,
            minWidth: 4
        }, 
        {
           
            xtype: 'dataview',
            itemId: 'dvResultsParams',
            cls: 'dvParams',
            store: 'QueryFilters',
            tpl: SearchTool.util.TplFilter.loaderXTemplateRenderer,
            height: 34,
            maxWidth:350,
            overflowY: 'hidden',
            overflowX: 'hidden',
            itemSelector: 'input.btn_searchitem_remove13'
            //overItemCls: 'facetitem-over',
            //iconCls: 'icon-btnClear',
         },
        //27% below this
        {
            xtype: 'tbfill'
        },
        { 
                            xtype:'button',
                            text: 'Export',
                            iconCls: 'icon-btnExport',
                            cls: 'resultsgridbtn',
                            menu: {
                                plain: true,
                                showSeparator: true,
                                items: [{
                                    text: 'Export as Excel',
                                    iconCls: 'icon-mnuExcel',
                                    tooltip: 'Export Results as Excel (.xlsx) file'
                                }, {
                                    text: 'Export as PDF',
                                    iconCls: 'icon-mnuPdf',
                                    tooltip: 'Export Results as PDF (.pdf) file'
                                }]
                            }
                        
          
          
        }
        , {
            xtype: 'tbspacer',
            width: '2%',
            maxWidth:10,
            minWidth:6
         },
         {
                    xtype: 'button',
                    itemId: 'btnSaveQuery',
                    //cls: 'chkSaveQuery',
                    cls: 'resultsgridbtn',
                    text: 'Save Query',
                    disabled: true,
                    width: '9%',
                    maxWidth: 70,
                    minWidth: 55,
                    tooltip: SearchTool.config.Config.searchSaveChkCaptionLabel
         },
         {
            xtype: 'tbspacer',
            width: '2%',
            maxWidth:10,
            minWidth:6
         }, {
                    xtype: 'button',
                    name: 'btnVisualize',
                    itemId: 'btnVisualize',
                    cls: 'resultsgridbtn',
                    text: 'Visualize',
                    width:'7%',
                    maxWidth: 55,
                    minWidth: 45,
                    tooltip: SearchTool.config.Config.searchSaveChkCaptionLabel
         }, {
            xtype: 'tbspacer',
            width: '2%',
            maxWidth:6,
            minWidth:4
           
         }, {
            xtype: 'button',
            text: 'Help',
            cls: 'resultsgridbtn',
            tooltip: 'Help page for Results area',
            width:'5%',
            maxWidth:36,
            minWidth:30,
            handler: function (ev, el, p) {}
        } ,
        {
            xtype: 'tbspacer',
            width: '2%',
            maxWidth:6,
            minWidth:4
           
         },
         {
               xtype: 'hidden',
               itemId: 'hdnSearchId',
               value: ''
         
         }
        ]
    },
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
//            xtype: 'toolbar',
            xtype: 'pagingtoolbar',
            store: 'Results',
            cls: 'tbarResults',
            hideRefresh: true,
            displayMsg: 'Results {0} - {1} of {2}',
            dock: 'top',
            displayInfo: true,
            emptyMsg: '(no records)',
            prependButtons: true,
            items: [{
                    xtype: 'tbspacer',
                    width: 2
                }, {
                    xtype: 'button',
                    itemId: 'btnAddToCart',
//                    iconCls: 'icon-btnCartAdd',
                    //                  type : 'submit',
                    //                  url : '/addtocart',
                    text: 'Save (-)',
                    cls: 'btnPagingToolbar',
                    disabled: true,
                    width: '9%',
                    maxWidth: 70,
                    minWidth: 55,
                    //scale: 'medium', //'large', // medium works well in IE, FFox

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
                }

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
                },
                {
                    xtype: 'combo',
                    width: 50,
                    itemId: 'cbPageSize',
                    fields: ['pagesize','pagesizeval'],
                    store: SearchTool.config.Config.PageSizeOptions,
                    queryMode: 'local',
                    value: SearchTool.config.Config.defaultPageSizeUser, //prefComboPageSize..SearchTool.util.dom.getUserSettings('pagesize')
                    editable: false,
                    typeAhead: false,
                    displayField: 'pagesize',
                    valueField: 'pagesizeval',
                    matchFieldWidth: true,
                    forceSelection: true,
                    allowBlank: false,
                    selectOnFocus: false,
                    listeners: {
                         'change' : function(){
                              this.up('pagingtoolbar').store.pageSize = this.value;
                              this.up('pagingtoolbar').store.loadPage(1);
                              }
                         }
                },
                {
                    xtype:'tbtext',
                    text:'Per Page'
                }        
                ,
                {
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
                tbar: {
                    items:[
                    {xtype:'tbspacer',width:5},
                    {xtype:'tbtext',text:'View As'},
                    {xtype:'tbspacer',width:2},
                    {
                         xtype:'radiogroup',
                         itemId:'rdView',
                         items:[
                         {
                              fieldLabel:'HTML',
                              labelWidth:25,
                              width:50,
                              name:'viewType',
                              inputvalue:'HTML',
                              checked:true
                         },
                         {
                              fieldLabel:'Xml',
                              labelWidth:20,
                              width:45,
                              name:'viewType',
                              inputvalue: SearchTool.config.Config.urlTokenXml,
                              disabled:SearchTool.config.Config.disableXml 
                         },
                          {
                              fieldLabel:'Text',
                              labelWidth:20,
                              width:35,
                              name:'viewType',
                              inputvalue: SearchTool.config.Config.urlTokenText,
                              disabled:SearchTool.config.Config.disableText 
                         }
                         ],
                         listeners:{
                              change: function(cb,ov,nv) {
                                   var viewerData = tihs.up('panel');
                                   viewerData.update('');
                                   viewerData.el.mask('Retrieving document...','x-mask-loading');
                                   var url= SearchTool.config.Config.urlDocviewerPrefix +'/'+nv.viewType+'/'+rec.data.repository +'/'+rec.data.type+'/'+rec.data.id;
                                   
                              }
                         
                         }
                    },
                    {
                         xtype:'tbfill'
                    },
                    {
                         text:'Save',
                         iconCls:'icon=btnSave',
                         disabled:SearchTool.config.Config.disableSave,
                         handler: function (b,e){
                         }
                    }  
                    ]
                },
                
                title: '[Document Viewer: ' + rec.data.source + ' ' + rec.data.serial + ']',
                width: 600,
                height: 600,
                closable: true,
                animCollapse: true,
                titleCollapse: true,
                autoScroll:true,
                collapsible: true,
                resizable: {
                    handles: 's se e',
                    preserveRatio: false
                },
                draggable: true,
                floating: true,
                loader:{
                    autoLoad: true,
                    url: 'data/acro.html'//SearchTool.config.Config.urlDocviewerPrefix + '/' + SearchTool.config.Config.docViewerFormatDefault+ '/'+rec.data.repository+'/'+rec.data.type+'/'+rec.data.id
                }
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
        this.callParent(arguments);
    }  

});