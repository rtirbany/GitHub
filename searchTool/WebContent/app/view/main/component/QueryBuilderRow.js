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
    clearCache : function(){
       Ext.Array.forEach(Ext.ComponentQuery.query('panel > container > combo'),function(cbox){
          delete cbox.lastQuery;
          cbox.store.clearFilter();
       }); 
    },
    items: [
    {
        xtype: 'combo',
        cls: 'cboxProducts',
        store: fieldStore,
        editable: true,
        selectOnFocus: false,
        forceSelection: true,
        displayField: 'fieldname',
        valueField: 'fieldvalue',
        emptyText: '(Select Product)',
        typeAhead: true,
        queryDelay: 10,
        value: '',
        triggerAction: 'query',
        queryMode: 'local',
        width: '11%'
    } ,{
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
        queryDelay: 10,
        value: '',
        triggerAction: 'query',
        queryMode: 'local',
        width: '10%'
    }, {
        xtype: 'combo',
        cls: 'cboxOpers',
        store: operStore,
        displayField: 'opername',
        valueField: 'opervalue',
        emptyText: '(Select Oper)',
        forceSelection: true,
        typeAhead: true,
        queryDelay: 10,
        triggerAction: 'query',
        shrinkWrap: 1,
        selectOnFocus: false,
        queryMode: 'local',
        width: '10%',
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
        maxLength: 25,
        enforceMaxLength: true
    }, {
        xtype: 'combo',
        cls: 'cboxAndOr',
        store: andorStore,
        disabled: true,
        displayField: 'opername',
        valueField: 'opervalue',
        typeAhead: true,
       
        emptyText: '(AND/OR)',
        allowBlank: true,
        maxLength: 3,
        enforceMaxLength: true,
        minChars: 1,
        forceSelection: true,
        mode: 'local',
        width: '12%'
    }, {
        xtype: 'textfield',
        width: '17%',
        emptyText: '(Enter value...)',
        maxLength: 25,
        enforceMaxLength: true
    }, {
        xtype: 'hidden',
        value: ''
    }, {
        xtype: 'button',
        iconCls: 'icon-btnAdd',
        text: 'AND',
        width: '7%',
        handler: function (b) {
            var i,h = b.prev('hidden');
            if (!b.up('container').nextNode() || !h.getValue()) {
               b.up('container').clearCache();
               b.up('panel').add({xtype:'builderRow'});;
               i = b.up('panel').items.items;
               i[i.length - 2].down('button').next('button').next('button').hide(); //prev row del btn
            }
            b.addCls('qbuilderBtnSelected').next('button').removeCls('qbuilderBtnSelected').addCls('qbuilderBtnDeselected');
            h.setValue(' AND ');
        }
    }, {
        xtype: 'button',
        iconCls: 'icon-btnAdd',
        text: 'OR',
        width: '6.5%',
        handler: function (b) {
           var i,h = b.prev('hidden');
           if (!b.up('container').nextNode() || !h.getValue()) {
               b.up('container').clearCache();
               b.up('panel').add({xtype:'builderRow'}); //add new
               i = b.up('panel').items.items;
               i[i.length - 2].down('button').next('button').next('button').hide(); //prev row del btn
           }
           h.setValue(' OR ');
           b.addCls('qbuilderBtnSelected').prev('button').removeCls('qbuilderBtnSelected').addCls('qbuilderBtnDeselected');
        }
    }, {
        xtype: 'button',
        iconCls: 'icon-btnDelete',
        text: 'DEL',
        width: '7%',
        handler: function (b) {
            var i = b.up('panel').items.items;
            var l = i.length; //length of the array of items
            if (l > 2) i[l - 2].down('button').next('button').next('button').show(); //prev row del btn 
            i[b.up('panel').items.items.length - 2].down('hidden').setValue(''); //prev row hidden field value reset to '' 
            i[l - 2].down('button').next('button').removeCls('qbuilderBtnSelected').removeCls('qbuilderBtnDeselected'); //prev row css adjustments - 2nd button
            i[l - 2].down('button').removeCls('qbuilderBtnSelected').removeCls('qbuilderBtnDeselected'); //prev row css adjustments for 1st button
            b.up('panel').remove(b.up('container')); //finally, remove this row
        }
    }]
});