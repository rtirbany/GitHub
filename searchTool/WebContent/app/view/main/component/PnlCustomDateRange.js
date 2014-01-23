Ext.define('SearchTool.view.main.component.PnlCustomDateRange', {
    extend: 'Ext.form.Panel',
    itemId: 'customdate',
//8/5 removed this from code (not in dev)   layout: 'fit',
    title: 'Define a Custom Date Range',
    bodyStyle: 'padding: 10px',
    requires: ['SearchTool.config.Config'],
    draggable: true,
    floating: true,
    height: 260,
    width: 295,
    titleCollapse: true,
    collapsible: true,
    centered: true,
    hidden: true,
    border: true,
    overflowX: 'hidden',
    overflowY: 'auto',
    tools: [
        {
            type: 'help',
            tooltip: 'Help page for Custom Date Range screen',
            handler: function (ev, el, p) {
                Ext.Msg.alert('some Custom Date Range help page');
            }
        },
        {
            xtype: 'tool',
            type: 'close',
            handler: function (e, target, p, tool) {
                this.up('panel').hide();
            }
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [{
            xtype: 'tbspacer',
            width: 2
        }, {
            text: 'Reset',
            iconCls: 'icon-btnReset',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }, {
            xtype: 'tbspacer',
            width: 2
        }, {
            xtype: 'tbfill'
        }, {
            text: 'Apply',
            iconCl: 'icon-btnOk',
            itemId: 'btnCustomDateRange'
        }, {
            xtype: 'tbspacer',
            width: 2
        }, {
            xtype: 'tbseparator'
        },{
            xtype: 'tbspacer',
            width: 2
        }, {
            text: 'Cancel',
            iconCls: 'icon-btnClear',
            handler: function () {
                this.up('form').hide();
            }
        }, {
            xtype: 'tbspacer',
            width: 3
        }]
        // toolbar items
    }], // toolbar
    // dockedItems
    items: [{
        xtype: 'form',
        border: 0,
        layout: 'vbox',
        items: [
            {
                xtype: 'hidden',
                itemId: 'dtRangeStart',
                name: 'dtRangeStart',
                value: Ext.Date.add(new Date(), Ext.Date.MONTH, SearchTool.config.Config.defaultDateAmt)
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Count:',
                labelWidth: 80,
                margins: '10 5 5 5',
                itemId: 'txtCount',
                width: 160,
                allowBlank: false,
                name: 'cnt',
                value: -1 * SearchTool.config.Config.defaultDateAmt,
                enforceMaxLength: true,
                minValue: 1,
                maxValue: 9999,
                maxLength: 4
            }, {
                xtype: 'radiogroup',
                itemId: 'rdUnit',
                width: '100%',
                margins: '0 5 0 5',
                fieldLabel: 'Unit',
                labelWidth: 75,
                columns: [.5,.5],
                items: [{
                    boxLabel: 'Year(s)',
                    name: 'customdate',
                    inputValue: 'yr'
                }, {
                    boxLabel: 'Month(s)',
                    name: 'customdate',
                    inputValue: 'm',
                    checked: true
                }, {
                    boxLabel: '6-month',
                    name: 'customdate',
                    inputValue: 'sm'
                }, {
                    boxLabel: 'Week(s)',
                    name: 'customdate',
                    inputValue: 'w'
                }, {
                    boxLabel: 'Quarter(s)',
                    name: 'customdate',
                    inputValue: 'q'
                }, {
                    boxLabel: 'Day(s)',
                    name: 'customdate',
                    inputValue: 'd'
                }] //radiogroup
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'combo',
                        itemId: 'cboxPeriod',
                        width: 65,
                        value: 'B',
                        allowBlank: false,
                        forceSelection: true,
                        margins: '5 10 5 5',//'0 5 0 5',
                        store: [
                            ['B', 'Before']
//                          ,['A', 'After']
                        ]
                    },
                    {
                        xtype: 'combo',
                        itemIde: 'rdCalendar',
                        width: 80,
                        value: SearchTool.config.Config.customCalendarStyle,
                        allowBlank: false,
                        forceSelection: true,
                        margins: '5 5 5 5',
                        store: [['cal','Calendar'],['fisc','Fiscal']],
                        listeners: {
                            change: function (cb, nv, ov){
                                if (nv === 'cal') {
                                    Ext.ComponentQuery.query('#numFiscalYear')[0].hide();
                                    Ext.ComponentQuery.query('#dtRangeEnd')[0].show();
                                }
                                else {
                                    Ext.ComponentQuery.query('#numFiscalYear')[0].show();
                                    Ext.ComponentQuery.query('#dtRangeEnd')[0].hide();
                                }
                            }
                        }
                    },
                    {
                    xtype: 'datefield',
                    itemId: 'dtRangeEnd',
                    name: 'dtRangeEnd',
                    altFormats: 'mdY',
                    allowBlank: false,
                    emptyText: 'mm/dd/yyyy',
                    maxValue: new Date(),
                    width: 100,
                    value: new Date(),
                    margins: '5 5 0 5'
                }, {
                    xtype: 'numberfield',
                    itemId: 'numFiscalYear',
                    width: 65,
                    allowBlank: false,
                    name: 'fiscalyear',
                    minValue: 1990,
                    maxValue: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.YEAR, 1), 'Y'),
                    value: Ext.Date.format(new Date(), 'm') <= 9 ? Ext.Date.format(new Date(),'Y') : Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.YEAR,1),'Y'),
                    margins: '5 5 0 5',
                    hidden: true
                }
                ]
            },
            {
            xtype: 'radiogroup',
            itemId: 'rdCalendar',
            width: '100%',
            columns: 2,
            items: [{
                boxLabel: 'Annual Calendar',
                name: 'calType',
                inputValue: 'cal',
                checked: true,
                listeners: {
                    change: function (cb, nv, ov) {
                        if (nv) {
                            Ext.ComponentQuery.query('#numFiscalYear')[0].hide();
                            Ext.ComponentQuery.query('#dtRangeEnd')[0].show();
                        }
                    }
                }
            }, {
                boxLabel: 'Fiscal Calendar',
                name: 'calType',
                inputValue: 'fisc',
                listeners: {
                    change: function (cb, nv, ov) {
                        if (nv) {
                            Ext.ComponentQuery.query('#numFiscalYear')[0].show();
                            Ext.ComponentQuery.query('#dtRangeEnd')[0].hide();
                        }
                    }
                }
            }]
        },
        {
            xtype: 'checkbox',
            boxLabel: 'Use whole units',
            itemId: 'chkWhole',
            margins: '0 5 5 5',
            name: 'incr'
        }] //form vbox
    }] //panel items
});