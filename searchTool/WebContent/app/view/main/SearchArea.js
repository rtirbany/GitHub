 Ext.define('SearchTool.view.main.SearchArea', {
     extend: 'Ext.form.Panel',
     alias: 'widget.searchArea',
     height: 300,
     constrain: true,
     requires: ['SearchTool.view.main.component.SearchBoolean',
             'SearchTool.config.Config'
     ],
     layout: 'hbox',
     store: 'QueryFilters',
     items: [{
             xtype: 'tabpanel',
             deferredRender: false,
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
                             margins: '8 8 8 5',
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
                                             margins: '0 15 0 15',
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
                                             tooltip: 'This will enable Fuzzy Search capabilities for the keyword(s) entered.'
                                         }
                                         ]
                                         },
                                          {
                                             xtype: 'displayfield',
                                             width: '100%',
                                             padding: '0 0 0 5',
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
               width: '10%',
               margins: '25px 0 2px 15px',
               items: [
               {
                    xtype:'combo',
                    name: 'datefield',
                    fieldLabel:'',
                    width:100,
                    store:SearchTool.config.Config.calendarDateOptions,
                    value:SearchTool.config.Config.calendarDateOptionsUser,
                    editable: false,
                    allowBlank: false,
                    autoSelect: true,
                    forceSelection: true                    
                    }
                ]
           },
           {
               xtype:'container',
               width: '15%',
                                     layout: {
                                         type: 'vbox',
                                         defaultMargins: '25px 0 2px 10px',
                                          pack: 'center',
                                          align:'center',
                                         padding: '0 5 0 2',
                                         cellPadding: 4

                                     },
                                     defaults: {
                                         xtype: 'datefield',
                                         maxWidth: 180
                                     },
                                     listeners: {
                                         afterrender: function () {
                                             var field = this.down('datefield');
                                             field.setValue(Ext.Date.add(new Date(), Ext.Date.MONTH, SearchTool.config.Config.defaultDateAmt));
                                             Ext.form.field.VTypes.DateRange(
                                                 field.value, field);
                                         }
                                     },
                                     items: [{
                                             name: 'startDate',
                                             fieldLabel: 'From',
                                             labelCls: 'lblDate',
                                             labelWidth: 30,
                                             deferredRender: false,
                                             itemId: 'dtUserSearchFrom',
                                             emptyText: 'mm/dd/yyyy',
                                             altFormats: 'mdY',
                                             maxValue: new Date(),
                                             width: 130,
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
                                             name: 'endDate',
                                             fieldLabel: 'To',
                                             labelCls: 'lblDate',
                                             labelWidth: 18,
                                             itemId: 'dtUserSearchTo',
                                             width: 120,
                                             margins: '10px 1px 2px 10px',
                                             emptyText: 'mm/dd/yyyy',
                                             altFormats: 'mdY',
                                             maxValue: new Date(),
                                             vfield: 'searchToDate',
                                             vtype: 'DateRange',
                                             startDateField: 'dtUserSearchFrom',
                                             value: new Date(),
                                             listeners: {
                                                 scope: this,
                                                 change: function (field, newValue, oldValue) {
                                                     if (newValue === null) {
                                                         Ext.form.field.VTypes.DateRange(newValue, field);
                                                     }
                                                 }
                                             }
                                         }, {
                                             xtype: 'button',
                                             text: 'Custom Dates',
                                             margins: '8px 1px 2px 10px',
                                             width: 80,
                                             minWidth: 80,
                                             maxWidth: 100,
                                             itemId: 'btnCustomDate',
                                             cls: 'btnDateRanges',
                                             tooltip: 'Define a custom date range'

                                         } //, enableToggle:true
                                     ]
                                 } //container
          
               
                    
                         
         ,{
             xtype: 'container',
             layout: {
             type:'vbox',
             pack: 'center',
             align:'center'
             
             },
             width:'15%',
             defaults: {
                 cls: 'frmSearchBtns',
                 iconAlign: 'left'

             },
             items: [{
                     xtype: 'button',
                     margins: '20 10 5 10',
                     text: 'Reset',
                     itemId: 'btnClear',
                     iconCls: 'icon-btnClear',
                     tooltip: SearchTool.config.Config.searchBtnClearTtip,
                     handler: function () {
                         var f = this.up('tabpanel').down('form');
                         f.getForm().reset();
                         tmp = Ext.ComponentQuery.query('#txtSearchBoolean')[0].reset();
                         var field = f.down('datefield').next('datefield');
                         Ext.form.field.VTypes.DateRange(field.value, field);
                         field = f.down('datefield');
                         field.setValue(Ext.Date.add(new Date(), Ext.Date.MONTH,
                             SearchTool.config.Config.defaultDateAmt));
                         Ext.form.field.VTypes.DateRange(field.value, field);
                     }
                 }, {
                     xtype: 'button',
                     margins: '8 10 8 10',
                     text: 'Search',
                     itemId: 'btnSearch',
                     iconCls: 'icon-btnSearch',
                     tooltip: SearchTool.config.Config.searchBtnSearchTtip,
                     scope: this
                 }
                
             ]
         }
     ]
 });