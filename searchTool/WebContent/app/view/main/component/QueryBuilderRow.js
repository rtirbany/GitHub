var fieldStore = new Ext.data.SimpleStore({
    fields: ['fieldname', 'fieldvalue'],
    data: [
        ['field1', 'FIELD1'],
        ['field2', 'FIELD2'],
        ['field3', 'FIELD3'],
        ['field4', 'FIELD4']
    ]
});

var operStore = new Ext.data.SimpleStore({
    fields: ['opername', 'opervalue'],
    data: [
        ['=', '='],
        ['>', '>'],
        ['<', '<'],
        ['>=', '>='],
        ['<=', '<='],
        ['NOT EQUAL TO', 'NOT EQUAL TO'],
        ['BETWEEN', 'BETWEEN'],
        ['CONTAINS', 'CONTAINS'],
        ['DOES NOT CONTAIN', 'DOES NOT CONTAIN'],
        ['IS NOT NULL', 'IS NOT NULL'],
        ['IS NULL', 'IS NULL']
    ]
});

var andorStore = new Ext.data.SimpleStore({
    fields: ['opername', 'opervalue'],
    data: [
        ['AND', 'AND'],
        ['OR', 'OR']
    ]
});

Ext.define('SearchTool.view.main.component.QueryBuilderRow', {
    extend: 'Ext.container.Container',
    alias: 'widget.builderRow',
    requires: ['SearchTool.config.Config'],
    layout: 'hbox',
    items: [{
        xtype: 'combo',
        cls: 'cboxFields',
        store: fieldStore,
        editable: true,
        selectOnFocus: false,
        forceSelection: true,
        displayField: 'fieldname',
        valueField: 'fieldvalue',
        emptyText: '(Select Field)',
        typeAhead: true,
        value: '',
        triggerAction: 'query',
        queryMode: 'local',
        width: '15%'
    }, {
        xtype: 'combo',
        cls: 'cboxOpers',
        store: operStore,
        displayField: 'opername',
        valueField: 'opervalue',
        emptyText: '(Select Oper)',
        forceSelection: true,
        typeAhead: true,
        triggerAction: 'query',
        shrinkWrap: 1,
        selectOnFocus: false,
        queryMode: 'local',
        width: '15%',
        enableKeyEvents: true,
        listeners: {
            'change': function (t, n, o, opts) {
                var ao = t.next('textfield').next('combo');
                var tf = t.next('textfield');
                var tf2 = t.next('textfield').next('combo').next('textfield');
                if (t.value == 'BETWEEN') {
                    ao.setValue('AND');
                    ao.disable();
                } else if (t.value == 'IS NULL' || t.value == 'IS NOT NULL') {
                    tf.setValue('');
                    tf.disable();
                    ao.disable();
                    tf2.setValue('');
                    tf2.disable();
                } else {
                    if (t.value != 'BETWEEN') {
                        ao.setValue('');
                        ao.enable();
                        tf.enable();
                    }
                    tf2.enable();
                }

            }
        }
    }, {
        xtype: 'textfield',
        //        itemId: 'val1',
        width: '18%',
        emptyText: '(Enter value...)',
        regex: SearchTool.config.Config.qryBuilderTextFieldRegex,
        regexText: SearchTool.config.Config.qryBuilderErrText,
        enableKeyEvents: true
    }, {
        xtype: 'combo',
        cls: 'cboxAndOr',
        store: andorStore,
        minChars: 1,
        disabled: true,
        displayField: 'opername',
        valueField: 'opervalue',
        typeAhead: true,
        emptyText: '(AND/OR)',
        allowBlank: true,
        enforceMaxLength: true,
        matchFieldWidth: true,
        mode: 'local',
        width: '12%'
    }, {
        xtype: 'textfield',
        width: '17%',
        emptyText: '(Enter value...)'
    }, {
        xtype: 'hidden',
        value: ''
    }, {
        xtype: 'button',
        iconCls: 'icon-btnAdd',
        text: 'AND',
        width: '7%',
        handler: function (t) {
            var n = Ext.create('SearchTool.view.main.component.QueryBuilderRow');
            t.up('panel').add(n);
            t.up('panel').items.items[t.up('panel').items.items.length - 2].down('button').next('button').next('button').hide(); //prev row del btn
            t.prev('hidden').setValue(' AND ');
            t.addCls('qbuilderBtnSelected').next('button').removeCls('qbuilderBtnSelected').addCls('qbuilderBtnDeselected');
        }
    }, {
        xtype: 'button',
        iconCls: 'icon-btnAdd',
        text: 'OR',
        width: '6.5%',
        handler: function (t) {
            var n = Ext.create('SearchTool.view.main.component.QueryBuilderRow');
            t.up('panel').add(n); //add new
            t.up('panel').items.items[t.up('panel').items.items.length - 2].down('button').next('button').next('button').hide(); //prev row del btn
            t.prev('hidden').setValue(' OR ');
            t.addCls('qbuilderBtnSelected').prev('button').removeCls('qbuilderBtnSelected').addCls('qbuilderBtnDeselected');
        }
    }, {
        xtype: 'button',
        iconCls: 'icon-btnDelete',
        text: 'DEL',
        width: '7%',
        handler: function (t, e, o) {
            var i = t.up('panel').items.items;
            var l = i.length; //length of the array of items
            if (l > 2) i[l - 2].down('button').next('button').next('button').show(); //prev row del btn

            i[t.up('panel').items.items.length - 2].down('hidden').setValue(''); //prev row hidden reset

            i[l - 2].down('button').next('button').removeCls('qbuilderBtnSelected').removeCls('qbuilderBtnDeselected');
            i[l - 2].down('button').removeCls('qbuilderBtnSelected').removeCls('qbuilderBtnDeselected');
            t.up('panel').remove(t.up('container'));
        }
    }]
});