var sm = Ext.create('Ext.selection.CheckboxModel', {
    checkOnly: true,
    listeners: {
        'selectionchange': function () {
            var btn = Ext.ComponentQuery.query('#btnAddToCart')[0];
            var cnt = this.getCount();
//            btn.setDisabled(cnt === 0);
//            btn.setText('Save (' + cnt + ')');
        }
    }
});

Ext.define('SearchTool.view.main.ResultsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.resultsgrid',
    overflowY: 'hidden',
    overflowX: 'hidden',
    cls: 'gridResults',
    url: SearchTool.config.Config.urlDocviewerPrefix + '/' + SearchTool.config.Config.docViewerFormatDefault + '/{0}/{1}/{2}/{3}',
    requires: ['SearchTool.config.Config', 'SearchTool.util.TplFilter', 'SearchTool.util.dom'],
    title:'Results',
    header: {
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
            xtype: 'tbspacer',
            width: '2%',
            maxWidth: 6,
            minWidth: 4
        },
        {
            xtype:'button',
            itemId: 'btnAddColumns',
            text: 'Set Columns',
            cls: 'resultsgridbtn',
            width: '14%',
            maxWidth: 90,
            minWidth: 65,
            tooltip: 'Columns available in Results'
        },
        {
            xtype: 'tbspacer',
            width: '2%',
            maxWidth: 6,
            minWidth: 4
        },
        {
            xtype:'combo',
            maxWidth:120,
            minWidth:120,
            fieldLabel:'Style',
            labelWidth:40,
            cls: 'resultsgridcombo',
            labelAlign:'right',
            disabled:true,
            store: SearchTool.config.Config.ResultsDisplayOptions,
            value: SearchTool.config.Config.defaultResultsDisplayUser,
            editable: false,
            autoSelect: true,
            forceSelection: true
        },
        {
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
                            xtype:'splitbutton',
                            itemId: 'btnExport',
                            text: 'Export',
                            cls: 'resultsgridbtn',
                            disabled: true,
                            tooltip: 'Export Results',
                            align: 'right',
                            menu: {
                                plain: true,
                                showSeparator: true,
                                items: [
                                {
                                    text: 'Export as csv',
                                    itemId: 'btnExportCsv',
                                    iconCls: 'icon-btnExport',
                                    href:'',
                                    tooltip: 'Export Results as csv (.csv) file'
                                }, {
                                    text: 'Export as Excel 2003 (.xls)',
                                    itemId: 'btnExportExcel',
                                    iconCls: 'icon-mnuExcel',
                                    href:'',
                                    tooltip: 'Export Results as Excel 2003 (.xls) file'
                                }, {
                                    text: 'Export as Excel 2007',
                                    itemId: 'btnExportExcel2007',
                                    iconCls: 'icon-mnuExcel',
                                    href:'',
                                    tooltip: 'Export Results as Excel 2007 (.xlsx) file'
                                }, {
                                    text: 'Export as PDF',
                                    itemId: 'btnExportPdf',
                                    iconCls: 'icon-mnuPdf',
                                    href:'',
                                    tooltip: 'Export Results as PDF (.pdf) file'
                                }
                                ]
                            }
        },
//                                ,
//                                listeners: {
//                                   click: function (m,i,e,o){
//                                        Ext.Ajax.request({
//                                             url: SearchTool.config.Config.urlExportRoot + i.value+Ext.ComponentQuery.query('#hdnSearchId')[0].value,
//                                             success: function (resp, opts){
//                                                  var info = Ext.decode(resp.responseBytes);
//                                                  try {
//                                                       Ext.destroy(Ext.get('iframeExport'));
//                                                  }
//                                                  catch(e){}
//                                                  Ext.core.DomHelper.append(document.body,{
//                                                       tag:'iframe',
//                                                       css:'display:none;visibility:hidden;height:0;',
//                                                       src:info,
//                                                       id:'iframeExport',
//                                                       frameBorder:0,
//                                                       width:0,
//                                                       height:0
//                                                  });
//                                             },
//                                             failure: function (resp, opts){
//                                                  debugger;
//                                                  Ext.Msg.alert(SearchTool.config.Config.msgErrorCommTitle,+'(Export Service)', SearchTool.config.Config.msgErrorExport+'Export Service.<br>'+
//                                                  resp.status+':'+resp.statusText+'.<br><br><b>'+ SearchTool.config.Config.msgErrorTryAgain+'</b>');
//                                             }
//                                        })
//                                   }
//
//                                }
        {
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
                    tooltip: SearchTool.config.Config.searchSaveToolTip
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
                    hidden: true,
                    disabled: true,
                    tooltip: SearchTool.config.Config.searchVizToolTip
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
//    selModel: sm,
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            store: 'Results',
            cls: 'tbarResults',
            hideRefresh: true,
            displayMsg: 'Results {0} - {1} of {2}',
            dock: 'top',
            displayInfo: true,
            emptyMsg: '(no records)',
            prependButtons: true,
            items: [
                {
                    xtype: 'tbspacer',
                    width: 2
                },
                {
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
                {
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
                },
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
            var searchId = Ext.ComponentQuery.query('#btnSearch')[0].id;
            Ext.create('Ext.window.Window', {
                bodyPadding: 5,
                tbar: {
                    items:[
                        {
                            xtype:'tbspacer',
                            width:5
                        },
                        {
                            xtype:'tbtext',
                            text:'View As'
                        },
                        {
                            xtype:'tbspacer',
                            width:2
                        },
                    {
                         xtype:'radiogroup',
                         itemId:'rdView',
                         width:300,
                         items:[
                         {
                              fieldLabel:SearchTool.config.Config.docViewerLabelFormatHtml,//'HTML',
                              labelWidth:25,
                              width:50,
                              name:'viewType',
                              inputValue:SearchTool.config.Config.urlTokenHtml,
                              checked:true
                         },
                         {
                              fieldLabel: SearchTool.config.Config.docViewerLabelFormatXml,//'Xml',
                              labelWidth: 20,
                              width: 45,
                              name: 'viewType',
                              inputValue: SearchTool.config.Config.urlTokenXml,
                              disabled: SearchTool.config.Config.disableXml
                         },
                         {
                              fieldLabel: SearchTool.config.Config.docViewerLabelFormatText,//'Text',
                              labelWidth :20,
                              width: 35,
                              name: 'viewType',
                              inputValue: SearchTool.config.Config.urlTokenText,
                              disabled: SearchTool.config.Config.disableText
                         },
                         {
                             fieldLabel: SearchTool.config.Config.docViewerLabelFormatAttach,
                             labelWidth: 60,
                             width: 80,
                             name: 'viewType',
                             inputValue: SearchTool.config.Config.urlTokenAttach
//                             ,
//                             disabled: rec.data.type.toLowerCase() !== SearchTool.config.Config.attachSupportedProduct//SearchTool.config.Config.disableAttach
                         }
                         ],
                         listeners:{
                              change: function(cb,nv,ov) {
                                   var viewerData = this.up('panel');
                                   switch (nv.viewType) {
                                       case SearchTool.config.Config.urlTokenAttach:
                                            url = SearchTool.config.Config.urlDocViewerPrefix + '/' + rec.data.type.toLowerCase() + '/' + rec.data.repository + '/' + rec.data.id;
                                           break;
                                       default:
                                           url = SearchTool.config.Config.urlDocViewerPrefix + '/' + nv.viewType + '/' + rec.data.repository + '/' + rec.data.type + '/' + rec.data.id + '/' + searchId;
                                   }
                                   viewerData.update('');
                                   viewerData.el.mask('Retrieving document...','x-mask-loading');
                                   Ext.Ajax.request({
                                        url: url,
                                        success: function(resp, opts){
                                             var urlNew = Ext.ComponentQuery.query('#btnSave')[0].getEl().dom.children[0].children[0].href;
                                             urlNew = urlNew.replace(SearchTool.config.Config.urlTokenHtml,'*')
                                                 .replace(SearchTool.config.Config.urlTokenText,'*')
                                                 .replace(SearchTool.config.Config.urlTokenXml,'*')
                                                 .replace(SearchTool.config.Config.urlTokenAttach,'*')
                                                 .replace('*',nv.viewType);
                                             Ext.ComponentQuery.query('#btnSave')[0].getEl().dom.children[0].children[0].href = urlNew;
                                             Ext.ComponentQuery.query('#btnSave')[0].enable();
                                             switch (nv.viewType){
                                                  case SearchTool.config.Config.urlTokenXml :
                                                       //TODO: 6/11 Shawn removed <pre> tags
                                                       viewerData.update('<pre>'+Ext.String.htmlEncode(resp.responseText) +'</pre>');
                                                       break;
                                                  case SearchTool.config.Config.urlTokenText:
                                                       viewerData.update('<pre>'+ resp.responseText +'</pre>');
                                                       break;
                                                  case SearchTool.config.Config.urlTokenAttach:
                                                      ExtComponentQuery.query('#btnSave')[0].disable();
                                                      var responseObj = Ext.decode(response.responseText);
                                                      if (responseObj === 0)
                                                          var attachmentLinks = 'No Attachments'
                                                      else {
                                                          var attachmentLinks = '<ul class="attachments-list">';
                                                          for (var i in responseObj.coreAttachmentInfos){
                                                              var attachment = responseObj.coreAttachmentInfos[i];
                                                              var attachmentUrl = SearchTool.config.Config.urlDocViewerPrefix + SearchTool.config.Config.attachServicePrefix +
                                                                  '/' + rec.data.repository + '/' + rec.data.type.toLowerCase() + '/' + attachment['id'] + '?mimeType=' +
                                                                  encodeURIComponent(attachment['mimeType']) + '&fileName=' + encodeURIComponent(attachment['fileName']);
                                                              attachmentLinks += '<li class="attachment-link"><a href="'+attachmentUrl+'">'+attachment['fileName']+'</a></li>';
                                                          } //for
                                                          attachmentLinks += '</ul>';
                                                      }
                                                      viewerData.update(attachmentLinks);
                                                      break;
                                                  default:
                                                       viewerData.update(resp.responseText);
                                             }
                                        },
                                        failure: function(resp,opts){
                                             Ext.Msg.alert(SearchTool.config.Config.msgErrorCommTitle+' (Viewer Service)',
                                                  SearchTool.config.Config.msgErrorComm+ 'Viewer Service.<br>'+
                                                  resp.status + ':' + resp.statusText + '.<br><br><b>' + SearchTool.config.Config.msgErrorTryAgain+'</b><br>');
                                             },
                                        callback: function (o, s, r) {
                                             viewerData.el.unmask();
                                        }

                                        });
                              }
                         }
                    },
                    {
                         xtype:'tbfill'
                    },
                    {
                         text:'Save',
                         itemId: 'btnSave',
                         iconCls: 'icon-btnSave',
                         disabled:SearchTool.config.Config.disableSave,
                         href: SearchTool.config.Config.urlDocViewerPrefix + '/' + 'save' + '/' + SearchTool.config.Config.urlTokenHtml + '/' + rec.data.repo + '/' + rec.data.type + '/' + rec.data.id
                    }
                    ]
                },
                title:  SearchTool.config.Config.docViewerTitle + '[' + rec.data.repository + ' ' + rec.data.type + ' ' +rec.data.id+ ']',
                width: 600,
                height: 600,
                closable: true,
                animCollapse: true,
                titleCollapse: true,
                autoScroll:true,
                constrain: true,
                collapsible: true,
                maximizable: true,
                draggable: true,
                resizable: {
                    handles: 's se e',
                    preserveRatio: false
                },
                loader:{
                    autoLoad: true,
                    url: Ext.String.format(this.url, rec.data.repository, rec.data.type, rec.data.id, searchId)
                }
            }).show();
        }
    },
    initComponent: function () {
        //Per Scott - by default: Source(hidden), Product, Pub Date, Serial #, Subject, Summary
          this.columns = []; /// 7/30 use this
        //TODO: 7/30 define cols
          //this.columns = [  //8/5
          // {
          //    text: '..',
          //    dataIndex: '..',
          //    tooltip: '..'
          // } ..other columns
          // ]
//        this.columns = [{
//                text: 'Source',
//                dataIndex: 'source',
//                width: 75,
//                align: 'center',
//                hidden: true,
//                sortable: true,
//                tooltip: 'Source',
//                renderer: function (val) {
//                    if (val == 'B') {
//                        return '<span style="color:red;">' + val + '</span>';
//                    } else return val;
//                }
//            },
//            //          {
//            //            text: 'Pub Date',
//            //            dataIndex: 'dt',
//            //            xtype: 'datecolumn',
//            //            format: SearchTool.config.Config.rsDateColFormat,
//            //            width: 80,
//            //            align: 'center',
//            //            hidden: true,
//            //            sortable: true,
//            //            tooltip: 'Pub Date'
//            //        },
//            {
//                text: 'Product',
//                dataIndex: 'product',
//                width: 80,
//                sortable: true,
//                align: 'center',
//                tooltip: 'Product'
//            }, {
//                text: 'Serial No.',
//                dataIndex: 'serial',
//                flex: 1,
//                sortable: true,
//                align: 'left',
//                tooltip: 'Serial No.'
//            }, {
//                text: 'Summary',
//                dataIndex: 'summary',
//                flex: 2,
//                sortable: true,
//                align: 'center',
//                tooltip: 'Summary',
//                renderer: function (v, m, r) {
//                    m.style += "white-space: normal;text-align: left;";
//                    return v;
//             }
//         }
//        ],
        this.callParent(arguments);
    }

});