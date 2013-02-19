Ext.define('SearchTool.view.main.component.PnlCustomDateRange', {
    extend: 'Ext.form.Panel',
    itemId: 'customdate',
    layout: 'fit',
    title: 'Create a Custom Date Range',
    bodyStyle: 'padding: 10px',
    requires: ['SearchTool.config.Config'],
    draggable: true,
    floating: true,
    height: 250,
    width: 295,
    titleCollapse: true,
    collapsible: true,
    centered: true,
    hidden: true,
    border: true,
    overflowX: 'hidden',
    overflowY: 'auto',
    tools: [{
        type: 'help',
        tooltip: 'Help page for Custom Date Range screen',
        handler: function (ev, el, p) {
            Ext.Msg.alert('some Custom Date Range help page');
        }
    }, {
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
            text: 'Cancel',
            iconCls: 'icon-btnClear',
            handler: function () {
                this.up('form').hide();
            }
        }, {
            xtype: 'tbspacer',
            width: 2
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'tbspacer',
            width: 2
        }, {
            text: 'Apply',
            iconCls: 'icon-btnOk',
            itemId: 'btnCustomDateRange'
        }, {
            xtype: 'tbspacer',
            width: 3
        }]
        // toolbar items
    }] // toolbar
    // dockedItems
    ,
    items: [{
        xtype: 'form',
        border: 0,
        layout: 'vbox',
        items: [{
            xtype: 'checkbox',
            boxLabel: 'Use Fiscal Calendar',
            itemId: 'chkFiscal',
            name: 'fiscal'
        }, {
            xtype: 'checkbox',
            boxLabel: 'Use whole units',
            itemId: 'chkWhole',
            name: 'incr'
        },
        {
            xtype: 'hidden',
            itemId: 'dtRangeStart',
            name: 'dtRangeStart',
            value: Ext.Date.add(new Date(),Ext.Date.MONTH,SearchTool.config.Config.defaultDateAmt)
        },
        {
            xtype: 'datefield',
            itemId: 'dtRangeEnd',
            name: 'dtRangeEnd',
            altFormats: 'mdY',
            allowBlank: false,
            width: 225,
            labelWidth: 100,
            fieldLabel: 'Prior To:',
            value: new Date()
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Count:',
            itemId: 'txtCount',
            width: 160,
            allowBlank: false,
            name: 'cnt',
            value: -1*SearchTool.config.Config.defaultDateAmt,
            enableKeyEvents: true,
            enforceMaxLength: true,
            minValue: 1,
            maxValue: 9999,
            maxLength: 4, 
            regexText: 'Value must be a number greater than 0',
            validator: function (v) {
                if (v === "0") {
                    return "Value must be greater than 0";
                }
                return true;
            }
        }, 
        {
            xtype: 'radiogroup',
            itemId: 'rdUnit',
            width: '100%',
            fieldLabel: 'Unit',
            columns: 2,
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
        }]//form vbox
    }]//panel items
});