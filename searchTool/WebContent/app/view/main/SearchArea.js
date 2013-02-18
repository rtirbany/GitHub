Ext.define('SearchTool.view.main.SearchArea', {
    extend: 'Ext.container.Container',
    alias: 'widget.searchArea',
    layout: {
        type: 'hbox'
    },
    height: 120,
    constrain: true,
    requires: ['SearchTool.view.main.component.SearchBoolean', 'SearchTool.config.Config'],
    items: [{
        xtype: 'form',
        flex: 1.1,
        url: '/simplesearch',
        border: false,
        layout: 'vbox',
        margins: '8 8 8 5',
        defaults: {
            width: '100%',
            border: false
        },
        items: [{
            xtype: 'displayfield',
            fieldCls: 'dfWildcard',
            labelCls: 'dfLabel',
            fieldLabel: SearchTool.config.Config.searchCboxCaptionLabel,
            value: SearchTool.config.Config.searchCboxCaptionValue
        }, {
            xtype: 'combo',
            id: 'cboxSearch',
            name: 'search',
            store: 'Keywords',
            valueField: 'id',
            displayField: 'keyword',
            hideTrigger: true,
            triggerAction: 'query',
            multiselect: false,
            queryMode: 'local',
            typeahead: true,
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
                } //afterrender
                ,
                specialkey: function (field, event) {
                    if (event.getKey() == event.ENTER) {
                        field.up('form').getForm().submit();
                    } //if
                } //specialkey
            } //listeners
        } //cboxsearch
        ,
        {
            xtype: 'container',
            margin: '2px 3px 12px 3px',
            layout: {
                type: 'hbox',
                defaultMargins: '2px 5px 10px 5px',
                padding: '0 5 0 5'
            },
            defaults: {
                flex: 1
            },
            items: [{
                xtype: 'checkbox',
                itemId: 'chkSummaryOnlySearch',
                name: 'chkSummaryOnlySearch',
                cls: 'chkSummaryOnly',
                boxLabel: SearchTool.config.Config.searchChkCaptionLabel
            }, {
                xtype: 'button',
                cls: 'frmSearchBtns',
                text: 'Clear',
                itemId: 'btnClear',
                iconCls: 'icon-btnClear',
                iconAlign: 'left',
                tooltip: SearchTool.config.Config.searchBtnClearTtip,
                handler: function () {
                    this.up('form').getForm().reset();
                }
            }, {
                xtype: 'button',
                cls: 'frmSearchBtns',
                text: 'Search',
                itemId: 'btnSearch',
                iconCls: 'icon-btnSearch',
                iconAlign: 'left',
                tooltip: SearchTool.config.Config.searchBtnSearchTtip,
                scope: this
            }] //hbox container items array
        } //container w/ summary only, search buttons
        ,
        { //FROM, TO dates
            xtype: 'container',
            width: '100%',
            margins: ' 8 2 8 3',
            layout: {
                type: 'hbox',
                defaultMargins: '2px 2px 2px 2px'

            },
            defaults: {
                xtype: 'datefield',
                flex: 1
            },
            listeners: {
                afterrender: function () {
                    var field = this.down('datefield');
                    var newVal = field.setValue(Ext.Date.add(new Date(), Ext.Date.MONTH, SearchTool.config.Config.defaultDateAmt));
                    Ext.form.field.VTypes.DateRange(field.value, field);
                }
            },
            items: [{
                name: 'searchFromDate',
                deferredRender: false,
                itemId: 'dtUserSearchFrom',
                emptyText: 'mm/dd/yyyy',
                altFormats: 'mdY',
                maxValue: new Date(),
                flex: 1.02,
                labelWidth: 30,
                fieldLabel: 'From',
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
                name: 'searchToDate',
                itemId: 'dtUserSearchTo',
                flex: .98,
                labelWidth: 18,
                emptyText: 'mm/dd/yyyy',
                altFormats: 'mdY',
                maxValue: new Date(),
                fieldLabel: 'To',
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
            },
            //{ xtype:'checkbox', boxLabel:'Other Date range types', fieldLabel:'Other Date ranges', labelWidth:10},
            {
                xtype: 'button',
                text: 'Custom',
                itemId: 'btnCustomDate',
                boxLabel: 'Custom Date',
                cls: 'btnDateRanges',
                tooltip: 'Create a custom date range',
                flex: .6
            } //, enableToggle:true
            ]
        } //container
        ,
        {
            xtype: 'checkbox',
            itemId: 'chkSaveQuery',
            name: 'chkSaveQuery',
            cls: 'chkSaveQuery',
            boxLabel: SearchTool.config.Config.searchSaveChkCaptionLabel
        }] //forms item array
    } //form (all below items belong to hbox)
    // cbox, btnSearch, Clear,  
    ,
    { //Advanced Search area
        xtype: 'fieldset',
        title: SearchTool.config.Config.qryBuilderCaptionLabel,
        collapsible: true,
        collapsed: true,
        overflowX: 'hidden',
        overflowY: 'auto',
        flex: 1.85,
        border: false,
        tooltip: 'Boolean query entry',
        items: [{
            xtype: 'searchBoolean'
        }] //fieldset items 
    }, { //OTHER fieldset of SearchArea
        xtype: 'fieldset',
        title: SearchTool.config.Config.SmthgCaptionLabel,
        collapsible: true,
        collapsed: true,
        flex: .8,
        border: false,
        items: [{
            html: '(area for shopping cart, subscriptions, or ?'
        }] //fieldset items 

    }

    ]

});