Ext.define('SearchTool.view.main.SearchArea', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchArea',
     requires: [
         'SearchTool.view.main.component.SearchBoolean',
         'SearchTool.config.Config'
    ],
    border:0,
    frame:false,
    layout: 'hbox',
    store: 'QueryFilters',
    items: [
        {
            xtype: 'tabpanel',
            itemId: 'tbSearch',
            deferredRender: false,
            border:0,
            frame: false,
            flex:1,
            minWidth: 300,
            plain: true,
            cls: 'searchTab',
            defaults: {
                layout: 'fit'
            },
            items: [
                {
                    title: 'Keyword Search',
                    itemId: 'tbKeyword',
                    margins: '8px 8px 8px 8px',
//            items: [{
//                xtype: 'container',
//                layout: 'hbox',
//                margins: '8px 8px 8px 5px',
//                defaults: {
//                    width: '70%',
//                    border: false
//                },
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            defaultMargins: '8px 5px 4px 10px',
                            padding: '0 5 0 5'
                        },
                        items: [
                            {
                                xtype: 'displayfield',
                                width: '100%',
                                padding: '0 5 0 5',
                                fieldCls: 'dfKeywordPrompt',
                                value: SearchTool.config.Config.searchCboxCaptionLabel
                            //,
                            //value: SearchTool.config.Config.searchCboxCaptionValue
                            },
                            {
                                xtype:'container',
                                layout:'hbox',
                                width: '100%',
                                items:[
                                    {
                                        xtype: 'combo',
                                        margins: '0 15px 0 15px',
                                        itemId: 'cboxSearch',
                                        name: 'keywordString',
                                        store: 'Keywords',
                                        width: '80%',
                                        valueField: 'id',
                                        displayField: 'keyword',
                                        hideTrigger: true,
                                        triggerAction: 'query',
                                        multiSelect: false,
                                        queryMode: 'local',
                                        typeAhead: true,
                                        //vtype : 'searchKeyword',
                                        /*
                                         Ext.apply(Ext.form.field.VTypes, {
                                         searchKeyword: function(val, field) {
                                         if (/^[a-z0-9]+$/i.test(val)) {
                                         return true;
                                         }
                                         },
                                         searchKeywordText: 'Keyword search only contain letters and numbers.'
                                         });
                                         *
                                         * */
                                        listeners: {
                                            afterrender: function (field) {
                                                field.focus();
                                            },
                                            change: function (field,v) {
                                                var z = this.next('checkbox'),
                                                    f = false;
                                                f = (v ? v.indexOf('?') !== -1 || v.indexOf('*') !== -1 : false);
                                                z.setDisabled(f);
                                                if (f && z.getValue() === true)
                                                       z.setValue(false);
                                                  z.setBoxLabel(f ? '(unavailable)' : SearchTool.config.Config.fuzzyChkCaptionValue);
                                            },
                                            specialkey: function (field, event) {
                                                if (event.getKey() == event.ENTER) {
                                                    Ext.ComponentQuery.query('#btnSearch')[0].fireEvent('click',this);
                                                } //if
                                            } //specialkey
                                        } //listeners
                                    }, //combo cboxsearch
                                    {
                                        xtype: 'checkbox',
                                        name: 'chkFuzzy',
                                        cls: 'chkFuzzy',
                                        width: '25%',
                                        minWidth: 130,
                                        boxLabel: SearchTool.config.Config.fuzzyChkCaptionValue,
                                        listeners: {
                                                  afterrender: function () {
                                                       Ext.QuickTips.init();
                                                       Ext.QuickTips.register({
                                                            autoHide: true,
                                                            dismissDelay: 3500,
                                                            target: this.id,
                                                            text: SearchTool.config.Config.fuzzyToolTip,
                                                            width: 160
                                                       });
                                                  },
                                                  change: function (t,v){
                                                       t.up('container').next('displayfield').setValue(
                                                          (v ? SearchTool.config.Config.searchCboxCaptionValueFuzzy:SearchTool.config.Config.searchCboxCaptionValue)
                                                       );
                                                  }
                                        }
                                    }
                            ]
                        },
                        {
                            xtype: 'displayfield',
                            width: '100%',
                            padding: '0 5 0 5',
                            fieldCls: 'dfWildcard',
                            value: SearchTool.config.Config.searchCboxCaptionValue
                        }
                        //                                   ,
                        //                               {
                        //                                   xtype: 'dataview',
                        //                                   itemId: 'dvSearchParams',
                        //                                   store: 'QueryFilters',
                        //                                   tpl: SearchTool.util.TplFilter.loaderXTemplateRenderer,
                        //                                   autoSync: true,
                        //                                   overflowY: 'hidden',
                        //                                   overflowX: 'hidden',
                        //                                   width: '100%',
                        //                                   itemSelector: 'input.facetitem_remove',
                        //                                   //overItemCls: 'facetitem-over',
                        //                                   //iconCls: 'icon-btnClear',
                        //                                   emptyText: '(no search params entered)'
                        //                               } //dataview

                    ]
                } //container w/ summary only, search buttons
                ] //forms item array
            }, //form (all below items belong to hbox)
              //items within 1st tab
            { //Advanced Search area
                title: SearchTool.config.Config.qryBuilderCaptionLabel,
                itemId: 'tbAdvanced',
                overflowX: 'hidden',
                overflowY: 'auto',
                border: false,
                tooltip: 'Boolean query entry',
                items: [
                    {
                        xtype: 'searchBoolean'
                    }
                ]
                //fieldset items
            },
            {
                xtype: 'container',
                itemId: 'tbSaved',
                title: 'Saved Queries',
                layout: {
                         align: 'left',
                         pack: 'left'
                },
                overflowX: 'hidden',
                overflowY: 'auto',
                tooltip: SearchTool.config.Config.savedQueryTabToolTip
//                     listeners:
//                     {
//                         'activate' : function(){
//                              var savedQueries = Ext.StoreManager.lookup('QueriesSaved'),
//                                  btnSearch = Ext.ComponentQuery.query('#btnSearch')[0],
//                                  maxQ = 0, i = 0, q,
//                                  pnl = Ext.ComponentQuery.query('#tbSaved');
//                                  savedQueries.removeAll();
//                                  this.removeAll();
//                                  //savedQueries.load();;
//                                  //this.items.items.length = 0;
//                                  Ext.Ajax.request({
//                                        url: SearchTool.config.Config.urlSearchSaveRetrieveAll,
//                                        success: function (resp,opts){
//                                             savedQueries = Ext.decode(resp.responseText).results,
//                                             maxQ = SearchTool.config.Config.numMaxQuerySaveEnforceLIFO ?
//                                                  Ext.min([savedQueries.length,SearchTool.config.Config.numMaxQuerySave]) : savedQueries.data.items.length;
//                                             if (maxQ == 0)
//                                                  this.add({xtype:'component',html:SearchTool.config.Config.msgNoSavedQueries});
//
//
//                                             else {
////
//                                                  for (;i<maxQ;i++){
//                                                       q = savedQueries[i];
////                                                arrFilters = q.queryfilters().data.items;
//                                                  this.add({xtype:'button',cls:'btnSaved', id: q.data.savedSearchId, text:q.data.name, tooltip:'<b>'+q.data.name+'</b><hr>'+q.data.description+'<hr><b># Results:&nbsp;</b>'+q.data.numResults+'<br><b>Date saved:</b>'+q.data.saveDate,width:'12%'});
//                     }
//                                             }//else
//                                        }//success
//                                        ,
//                                        failure: function(resp, opts){
//                                                  Ext.Msg.alert('Error loading User Saved queries',SearchTool.config.Config.msgErrorTryAgain);
//                                        }
//                                  });
//                                        for (i=0;i<savedQueries.length;i++){
//                                             q = savedQueries[i];
//                                             this.add({xtype:'button',cls:'btnSaved', id: q.data.savedSearchId, text:q.data.name, tooltip:'<b>'+q.data.name+'</b><hr>'+q.data.description+'<hr><b># Results:&nbsp;</b>'+q.data.numResults+'<br><b>Date saved:</b>'+q.data.saveDate,width:'12%'});
//                                        }
//
//                          }//if
//                         }//activate
//                      }
            },
            {
                xtype: 'container',
                itemId: 'tbHistory',
                title: 'Query History',
                layout: {
                    align: 'left',
                    pack: 'left'
                },
                tooltip: 'Session Query History'
            }
    ],
    listeners: {
        'tabchange': function(tabPanel, tab, o, e){
            var btnSearch = Ext.ComponentQuery.query('#btnSearch')[0],
                maxQ= 0,
                i= 0, q,
                fmt= 'm/d/Y H:i:s',
                queries;
            switch (tab.itemId){
                case 'tbSaved' :
                    queries = Ext.StoreManager.lookup('QueriesSaved');
                    queries.removeAll();
                    tab.removeAll();
//                  this.getActiveTab().removeAll();
                    Ext.Ajax.request({
                                url: SearchTool.config.Config.urlSearchSaveRetrieveAll,
                                success: function (resp,opts){
                                    queries= Ext.decode(resp.responseText).results;
                                    tab.removeAll();
                                    maxQ = SearchTool.config.Config.numMaxQuerySaveEnforceLIFO ?
                                        Ext.min([queries.length,SearchTool.config.Config.numMaxQuerySave]) : queries.length;
                                    if (maxQ === 0)
                                        tab.add({xtype: 'component',html: SearchTool.config.Config.msgNoSavedQueries});
                                    else {
                                        for (;i<maxQ;i++) {
                                            q = queries[i];
                                            tab.add({xtype:'button',cls:'btnSaved', toggleGroup: 'saved', allowDepress:true, id: q.id, name: q.searchId, text:q.name, tooltip:'<b>'+q.name+'</b><hr>'+q.data.description+'<hr><b># Results:&nbsp;</b>'+q.data.numResults+'<br><b>Date saved:</b>'+q.data.saveDate,width:'12%'});
                                        }
                                    }//else
                                }//success
                                ,
                                failure: function(resp, opts){
                                    Ext.Msg.alert('Error loading User Saved Queries',SearchTool.config.Config.msgErrorTryAgain);
                                }
                    });
                    break;
                case 'tbHistory':
                    queries = Ext.StoreManager.lookup('QueriesHistory');
                    tab.removeAll();
                    maxQ = SearchTool.config.Config.numMaxQuerySaveEnforceLIFO ?
                        Ext.min([queries.data.items.length,SearchTool.config.Config.numMaxQuerySave]) : queries.data.items.length;
                    if (maxQ === 0)
                        tab.add({xtype: 'component',html: SearchTool.config.Config.msgNoHistoryQueries});
                    else {
                        for (;i<maxQ;i++) {
                            q = queries.getAt(i);
                            tab.add({xtype:'button',cls:'btnHist', toggleGroup: 'hist', allowDepress:true, id: q.data.searchId, name: q.data.searchId, text: (Ext.Date.format(q.data.lastRanDate,'H:i:s')+(q.data.savedSearchId === '' ? '' : ' (s')), pressed: ((q.data.savedSearchId === btnSearch.name || !btnSearch.name) && q.data.searchId === btnSearch.id), tooltip:'<b>'+q.name+'</b><hr>'+q.data.description+'<hr><b># Results:&nbsp;</b>'+q.data.numResults+'<br><b>Date saved:</b>'+q.data.saveDate,width:'12%'});
                        }
                    }//else
                    break;
            }
            }
        }//listeners
    }, //tabpanel
    { //FROM, TO dates
            xtype: 'container',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'center'
            },
            width: 240,
            minWidth: 240,
            margins: '20px 20px 2px 20px',
            items: [
                {
                    xtype:'combo',
                    name: 'datefield',
                    fieldLabel:'',
                    width:'100%',
                    store: SearchTool.config.Config.calendarDateOptions,
                    value: SearchTool.config.Config.calendarDateOptionsUser,
                    editable: false,
                    allowBlank: false,
                    autoSelect: true,
                    forceSelection: true
                },
                {
                    //FROM/TO dates
                    xtype: 'container',
                    layout: 'column',
                    bodyPadding: 2,
                    defaults: {
                        xtype: 'button',
                        margin: '2px 5px 2px 10px',
                        columnWidth: 0.5,
                        minWidth: 85,
                        maxWidth: 100,
                        enableToggle: true,
                        cls: 'btnDateRanges'
                    },
                    items: [
                        {
                            text: 'Standard Range',
                            itemId: 'btnStdDate',
                            tooltip: 'Common date ranges',
                            toggleGroup: 'btnDates',
                            pressed: true,
                            handler: function (b,e){
                                Ext.ComponentQuery.query('#rdoDateOptions')[0].show();
                                Ext.ComponentQuery.query('#ctCustomDates')[0].hide();
                                b.toggle(true);
                            }
                        },
                        {
                            text: 'Custom Range',
                            itemId: 'btnCustomDate',
                            tooltip: 'Define a custom date range',
                            toggleGroup: 'btnDates',
                            pressed: false,
                            handler: function (b,e) {
                                Ext.ComponentQuery.query('#rdoDateOptions')[0].hide();
                                Ext.ComponentQuery.query('#ctCustomDates')[0].show();
                                b.toggle(true);
                            }
                        }
                    ]
                },
                {
                            xtype: 'radiogroup',
                            itemId: 'rdoDateOptions',
                            columns: 3,
                            vertical: true,
                            columnWidth: 0.32,
                            items: [
                                {
                                    boxLabel: '30 days',
                                    width: 75,
                                    name: 'dateRange',
                                    inputValue: '-30'
                                },
                                {
                                    boxLabel: '180 days',
                                    width: 75,
                                    name: 'dateRange',
                                    inputValue: '-180'
                                },
                                {
                                    boxLabel: '60 days',
                                    width: 75,
                                    name: 'dateRange',
                                    inputValue: '-60'
                                },
                                {
                                    boxLabel: '1 year',
                                    width: 75,
                                    name: 'dateRange',
                                    inputValue: 'y1'
                                },
                                {
                                    boxLabel: '90 days',
                                    width: 75,
                                    name: 'dateRange',
                                    inputValue: '-90'
                                },
                                {
                                    boxLabel: 'All',
                                    width: 75,
                                    name: 'dateRange',
                                    inputValue: ''
                                }
                            ],
                            listeners: {
                                afterrender: function(){
                                    Ext.ComponentQuery.query('#rdoDateOptions')[0].items.items[5].setValue(true);
                                },
                              change: function(cb,nv,ov,opts) {
                                    Ext.ComponentQuery.query('#dtUserSearchTo')[0].setValue(((!ov.dateRange && !nv.dateRange) || nv.dateRange == '') ? '' : new Date());
                                    if ((!ov.dateRange && !nv.dateRange) || nv.dateRange == '')
                                        Ext.ComponentQuery.query('#dtUserSearchFrom')[0].setValue('');
                                    else if (nv.dateRange && nv.dateRange.indexOf('y') == -1)
                                        Ext.ComponentQuery.query('#dtUserSearchFrom')[0].setValue(nv.dateRange == '' ? '' : Ext.Date.add(new Date(),Ext.Date.DAY,nv.dateRange));
                                    else if (nv.dateRange && nv.dateRange.indexOf('y') > -1) {
                                        Ext.ComponentQuery.query('#dtUserSearchFrom')[0].setValue(Ext.Date.add(new Date(),Ext.Date.YEAR,-1));
                                    }
                              }
                            }//listeners

                        },//radiogroup
                        {
                            xtype: 'container',
                            width: '100%',
                            itemId: 'ctCustomDates',
                            hidden: true,
                            margins: '5px 0 2px 0',
                            layout: {
                                type: 'table',
                                columns: 4
                            },
                            defaults: {
                                xtype: 'datefield',
                                maxWidth: 180
                            },
                            listeners: {
                                afterrender: function(){
                                    var field = this.down('datefield');
                                    field.setValue('');
                                    field.next('datefield').setValue('');
                                    Ext.form.field.VTypes.DateRange(field.value, field);
                                }
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    colspan: 1,
                                    rowspan: 1,
                                    value: 'From:&nbsp;&nbsp;&nbsp;&nbsp;'
                                },
                                {
                                    colspan: 2,
                                    name: 'startDate',
                                    itemId: 'dtUserSearchFrom',
                                    emptyText: 'mm/dd/yyyy',
                                    altFormats: 'mdY',
                                    maxValue: Ext.Date.add(new Date(),Ext.Date.YEAR,2),
                                    width: 95,
                                    vfield: 'searchFromDate',
                                    endDateField: 'dtUserSearchTo',
                                    vtype: 'DateRange',
                                    //value: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, SearchTool.config.Config.defaultDateAmt),'m-d-Y'),
                                    listeners: {
                                        scope: this,
                                        focus: function (t, e, o){
                                            Ext.ComponentQuery.query('#rdoDateOptions')[0].reset();
                                        },
                                        select: function (f, v, o){
                                            Ext.ComponentQuery.query('#rdoDateOptions')[0].reset();
                                        },
                                        change: function (field, newValue, oldValue) {
                                            if (newValue === null) {
                                                Ext.form.field.VTypes.DateRange(newValue, field);
                                            }
                                        }
                                    }//listeners
                                },
                                {
                                    xtype:'button',
                                    margin:'0 0 0 10px',
                                    itemId:'btnDateAdvanced',
                                    colspan:1,
                                    rowspan:2,
                                    text:'More...',
                                    tooltip:'Advanced Customization Options'
                                },
                                {
                                    xtype:'displayfield',
                                    colspan:1,
                                    rowspan:1,
                                    value:'To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                },
                                {
                                    colspan: 2,
                                    name: 'endDate',
//                                             fieldLabel: 'To',
//                                             labelCls: 'lblDate',
//                                             labelWidth: 18,
                                    itemId: 'dtUserSearchTo',
                                    width: 95,
                                    emptyText: 'mm/dd/yyyy',
                                    altFormats: 'mdY',
                                    maxValue: Ext.Date.add(new Date(),Ext.Date.YEAR,2),
                                    vfield: 'searchToDate',
                                    vtype: 'DateRange',
                                    startDateField: 'dtUserSearchFrom',
                                    value: '',//new Date(),
                                    listeners: {
                                        scope: this,
                                        focus: function (t, e, o){
                                            Ext.ComponentQuery.query('#rdoDateOptions')[0].reset();
                                        },
                                        select: function (f, v, o){
                                            Ext.ComponentQuery.query('#rdoDateOptions')[0].reset();
                                        },
                                        change: function (field, newValue, oldValue) {
                                            if (newValue === null) {
                                                Ext.form.field.VTypes.DateRange(newValue, field);
                                            }
                                        }
                                    }//listeners
                                }
            ]
        } //container
                    ]//container items
           },
           {
            xtype: 'container',
            width: 120,
            layout: {
                type:'vbox',
                pack: 'center',
                align:'center'
            },
            margins: '21px 30px 2px 15px',
            items: [
                {
                    xtype: 'button',
                    text: 'Search',
                    itemId: 'btnSearch',
                    cls: 'frmSearchBtns',
                    iconCls: 'icon-btnSearch',
                    iconAlign: 'left',
                    tooltip: SearchTool.config.Config.searchBtnSearchTtip,
                    scope: this
                }
             ]//items
        }//container
    ]
});