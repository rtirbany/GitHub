 Ext.define('SearchTool.view.main.SearchArea', {
     extend: 'Ext.form.Panel',
     alias: 'widget.searchArea',
     requires: ['SearchTool.view.main.component.SearchBoolean',
             'SearchTool.config.Config'
     ],
     border:0,
     frame:false,
     layout: 'hbox',
     store: 'QueryFilters',
     bbar: {
          itemId: 'bbarFilters',
          items :[{html:'Filters'}
          ,
           {
           
            xtype: 'dataview',
            itemId: 'dvResultsParams',
            cls: 'dvParams',
            store: 'QueryFilters',
            tpl: SearchTool.util.TplFilter.loaderXTemplateRenderer,
//            height: 34,
//            maxWidth:350,
            overflowY: 'hidden',
            overflowX: 'hidden',
            itemSelector: 'input.btn_searchitem_remove13'
            //overItemCls: 'facetitem-over',
            //iconCls: 'icon-btnClear',
         }
          
          
          ]
     
     },
     items: [{
             xtype: 'tabpanel',
             deferredRender: false,
             border:0,
             frame:false,
             flex:1,
             cls: 'searchTab',
             defaults: {
                 layout: 'fit'
             },
             items: [{
                     title: 'Keyword Search',
                     items: [{
                             xtype: 'container',
                             layout: 'hbox',
                             margins: '8px 8px 8px 5px',
                             defaults: {
                                 width: '70%',
                                 border: false
                             },
                             items: [{
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
                                         {xtype:'container',
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
                                                 }
                                                 ,
                                                 change: function (field,v) {
                                                  var z = this.next('checkbox'),
                                                       f = false;
                                                  f = (v ? v.indexOf('?') != -1 || v.indexOf('*') != -1 : false);
                                                  z.setDisabled(f);
                                                  if (f && z.getValue() == true)
                                                       z.setValue(false);
                                                  z.setBoxLabel(f ? '(unavailable)' : SearchTool.config.Config.fuzzyChkCaptionValue);
                                                 },
                                                 specialkey: function (field, event) {
                                                     if (event.getKey() == event.ENTER) {
                                                         Ext.ComponentQuery.query('#btnSearch')[0].fireEvent('click',this);
                                                     } //if
                                                 } //specialkey
                                             } //listeners 
                                             //cboxsearch
                                         },
                                         {
                                             xtype: 'checkbox',
                                             name: 'chkFuzzy',
                                             cls: 'chkFuzzy',                
                                             boxLabel: SearchTool.config.Config.fuzzyChkCaptionValue,
                                             tooltip: 'This will enable Fuzzy Search capabilities for the keyword(s) entered.',
                                             listeners: {
                                                  change: function (t,v){
                                                       t.up('container').next('displayfield').setValue(
                                                          v? SearchTool.config.Config.searchCboxCaptionValueFuzzy:SearchTool.config.Config.searchCboxCaptionValue
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
                             ]
                             //forms item array
                         } //form (all below items belong to hbox)
                     ] //items within 1st tab
                 }

                 , { //Advanced Search area
                     title: SearchTool.config.Config.qryBuilderCaptionLabel,
                     itemId: 'tbAdvanced',
                     overflowX: 'hidden',
                     overflowY: 'auto',
                     border: false,
                     tooltip: 'Boolean query entry',
                     items: [{
                             xtype: 'searchBoolean'
                         }
                     ]
                     //fieldset items 
                 }, {
                     xtype: 'container',
                     itemId: 'tbSaved',
                     title: 'Saved Queries',
                     layout: {
                         type: 'vbox',
                         align: 'center'
                     }
                 }, {
                     xtype: 'container',
                     itemId: 'tbHistory',
                     title: 'Query History',
                     layout: {
                         type: 'vbox',
                         align: 'center'
                     },
                     disabled: true
                 }
             ]
         } //tabpanel 
         , { //FROM, TO dates
               xtype: 'container',
               layout: 'vbox',
               width: '18%',
               pack:'center',
               align:'center',
               margins: '20px 0 2px 15px',
               items: [
                {
                    xtype:'combo',
                    name: 'datefield',
                    fieldLabel:'',
                    width:'100%',
                    store:SearchTool.config.Config.calendarDateOptions,
                    value:SearchTool.config.Config.calendarDateOptionUser,
                    editable: false,
                    allowBlank: false,
                    autoSelect: true,
                    forceSelection: true                    
                },
                {
                xtype:'container',
                layout:'column', 
                bodyPadding:2,
                defaults:{
                    xtype:'button',
                    margin: '2px 5px 2px 10px',
                    columnWidth: .5,
                    minWidth: 85,
                    maxWidth: 100,
                    enableToggle:true,
                    cls: 'btnDateRanges'
                },
                items:[
               { 
                    text: 'Standard Ranges',
                    itemId: 'btnStdDate',
                    tooltip: 'Common date ranges (based off the current date)',
                    pressed:true,
                    handler: function(b,e){ 
                         if (b.pressed)
                         {
                              b.next('button').toggle(false);
                              Ext.ComponentQuery.query('#rdoDateOptions')[0].show();
                              Ext.ComponentQuery.query('#ctCustomDates')[0].hide(); 
                         }                         
                    }
               },
               {
                     
                    text: 'Custom Range',
                    itemId: 'btnCustomDate',
                    tooltip: 'Define a custom date range',
                    pressed:false,
                    handler: function(b,e){
                         if (b.pressed)
                         {
                              b.prev('button').toggle(false);
                              Ext.ComponentQuery.query('#rdoDateOptions')[0].hide();
                              Ext.ComponentQuery.query('#ctCustomDates')[0].show();
                         }
                    }
               }
               
               ]},
                
               
                {
                    xtype: 'radiogroup',
                    columns: 3,
                    vertical: true,
                    columnWidth: '.28',
                    itemId: 'rdoDateOptions',
                    items:[
                         {
                              boxLabel:'30 days', 
                              width:75,
                              name:'dateRange',
                              inputvalue: -30
                         },
                         {
                              boxLabel:'180 days', 
                              width:75,
                              name:'dateRange',
                              inputvalue: -180
                         },
                         {
                              boxLabel:'60 days', 
                              width:75,
                              name:'dateRange',
                              inputvalue: -60
                         },
                         {
                              boxLabel:'1 year', 
                              width:75,
                              name:'dateRange',
                              inputvalue: 'y1'
                         }, 
                          {
                              boxLabel:'90 days', 
                              width:75,
                              name:'dateRange',
                              inputvalue: -90
                         },
                         
                         {
                              boxLabel:'All', 
                              width:75,
                              name:'dateRange',
                              inputvalue: '',
                              checked: true
                         }
                     ],
                     listeners:{
                              change: function(cb,ov,nv) {
                                    Ext.ComponentQuery.query('#dtUserSearchTo')[0].setValue(nv.dateRange == '' ? '' : new Date());
                                    if (nv.dateRange.indexOf('y') == -1)
                                        Ext.ComponentQuery.query('#dtUserSearchFrom')[0].setValue(Ext.Date.add(new Date(),Ext.Date.DAY,nv.dateRange));
                                    else {
                                        Ext.ComponentQuery.query('#dtUserSearchFrom')[0].setValue(Ext.Date.add(new Date(),Ext.Date.YEAR,-1));
                                    }
                              }
                         
                         }
                
                },
                {
                         xtype:'container',
                         width: '100%',
                         itemId: 'ctCustomDates',
                         hidden: true,
                         margins:'5px 0 2px 0',
                         layout: {
                                         type: 'table',
                                         columns: 4
                                         //defaultMargins: '5px 0 2px 0',
                                          //pack: 'center',
                                         // align:'center',
                                         //padding: '0 5 0 2',
                                         //cellPadding: 4

                         },
                         defaults: {
                                         xtype: 'datefield',
                                         
                                         maxWidth: 180
                          },
                         listeners: {
                                         afterrender: function () {
                                             var field = this.down('datefield');
                                             field.setValue('');
                                             //field.setValue(Ext.Date.add(new Date(), Ext.Date.MONTH, SearchTool.config.Config.defaultDateAmt));
                                             field.next('datefield').setValue('');
                                             Ext.form.field.VTypes.DateRange(
                                                 field.value, field);
                                         }
                         },
                         items: [       
                                        {
                                             xtype:'displayfield',
                                             colspan:1,
                                             rowspan:1,
                                             value:'From:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                        },
                                        {
                                             colspan: 2,
                                             name: 'startDate',
//                                             fieldLabel: 'From',
//                                             labelCls: 'lblDate',
//                                             labelWidth: 30,
                                             itemId: 'dtUserSearchFrom',
                                             emptyText: 'mm/dd/yyyy',
                                             altFormats: 'mdY',
                                             maxValue: new Date(),
                                             width: 95,
                                             vfield: 'searchFromDate',
                                             endDateField: 'dtUserSearchTo',
                                             vtype: 'DateRange',
                                             //value: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, SearchTool.config.Config.defaultDateAmt),'m-d-Y'),
                                             listeners: {
                                                 scope: this,
                                                 change: function (field, newValue, oldValue) {
                                                     if (newValue === null) {
                                                         Ext.form.field.VTypes.DateRange(newValue, field);
                                                     }
                                                 }
                                             }
                                         }, {
                                             xtype:'button',
                                             margin:'0 0 0 10px',
                                             itemId:'btnDateAdvanced',
                                             rowspan:2,
                                             colspan:1,
                                             text:'More...',
                                             tooltip:'Advanced Customization Options'
                                         },{
                                             xtype:'displayfield',
                                             colspan:1,
                                             rowspan:1,
                                             value:'To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                         },{
                                             colspan: 2,
                                             name: 'endDate',
//                                             fieldLabel: 'To',
//                                             labelCls: 'lblDate',
//                                             labelWidth: 18,
                                             itemId: 'dtUserSearchTo',
                                             width: 95,
                                             emptyText: 'mm/dd/yyyy',
                                             altFormats: 'mdY',
                                             maxValue: new Date(),
                                             vfield: 'searchToDate',
                                             vtype: 'DateRange',
                                             startDateField: 'dtUserSearchFrom',
                                             value: '',//new Date(),
                                             listeners: {
                                                 scope: this,
                                                 change: function (field, newValue, oldValue) {
                                                     if (newValue === null) {
                                                         Ext.form.field.VTypes.DateRange(newValue, field);
                                                     }
                                                 }
                                             }
                                         }
                                     ]
                                 } //container 
                ]//container items
           },
           {
             xtype: 'container',
             width: '16%', 
             layout: {
               type:'vbox',
               pack: 'center',
               align:'center' 
             }, 
             margins: '21px 0 2px 15px',
             items: [ 
                
                 {
                     xtype: 'button', 
                     text: 'Search',
                     itemId: 'btnSearch',
                     iconCls: 'icon-btnSearch',
                     cls: 'frmSearchBtns',
                     iconAlign: 'left',
                     tooltip: SearchTool.config.Config.searchBtnSearchTtip,
                     scope: this
                 }
                
             ]
           }
     ]
 });