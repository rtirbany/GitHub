var operStore = new Ext.data.SimpleStore({
    fields: ['opervalue', 'opername'],
    data: SearchTool.config.Config.qryBuilderOpers
});

var andorStore = new Ext.data.SimpleStore({
    fields: ['andordisplay', 'andorvalue'],
    data: [
        ['AND', 'AND'],
        ['OR', 'OR']
    ]
});

Ext.define('SearchTool.view.main.component.QueryBuilderRow', {
    extend: 'Ext.container.Container',
    alias: 'widget.builderRow',
    requires: ['SearchTool.config.Config','SearchTool.util.dom'],
    layout: 'hbox',
    clearCache : function(){
       Ext.Array.forEach(Ext.ComponentQuery.query('panel > builderRow > combo'),function(cbox){
          delete cbox.lastQuery;
          cbox.store.clearFilter();
       });
    },
    getProductFields: function(productfields){
       return Ext.create('Ext.data.Store',{
          model: 'SearchTool.model.SearchField',
          data : productfields //productfields.concat(Ext.Array.pluck(Ext.StoreManager.lookup('UniversalFields').data.items,'data'))
       });
    },
    toggleBtnDisable : function(enable, first){
          this.down('button').setDisabled(enable);
          this.down('button').next('button').setDisabled(enable);
          this.down('button').next('button').next('button').setDisabled(enable);
    },
    items: [
    {
        xtype: 'combo',
        cls: 'cboxProducts',
//        store: fieldStore,
        editable: true,
        selectOnFocus: false,
        forceSelection: true,
        displayField: 'productName',
        valueField: 'productName',
        emptyText: '(Product)',
        typeAhead: true,
        queryDelay: 10,
        value: '',
        triggerAction: 'query',
        queryMode: 'local',
        width: '11%',
        listeners:{
          'change' : function (t,n,o,opts){
               if (this.getValue() === null){
                    this.reset();
               }
          },
          'select' : function (t,r,opts){
               var tmpCombo = t.next('combo'),
                    f = (t.value === null);
               tmpCombo.setValue('');
               tmpCombo.setDisabled(f);
               if (!f){
                    var productInfo = Ext.StoreManager.lookup('Sources').getAt(0).getAssociatedData().products,
                        idx = Ext.Array.pluck(productInfo,t.valueField).indexOf(t.value);
                        //TODO: lookup new vals, clean this up
                        tmpCombo.bindStore(this.up('container').getProductFields(productInfo[idx].searchfields));
               }

                    btnAnd = t.next('button').disable(),
                    btnOr = btnAnd.next('button').disable(),
                     btnDel = btnOr.next('button').disable(),
                    tmpCombo = tmpCombo.next('combo');
                    tmpCombo.setDisabled(f);
                    tmpCombo.setValue('');
                    tmpCombo = tmpCombo.next('textfield');
                    tmpCombo.setDisabled(f);
                    tmpCombo.setValue('');
                    tmpCombo = tmpCombo.next('combo');
                    tmpCombo.setDisabled(f);
                    tmpCombo.setValue('');
                    tmpCombo = tmpCombo.next('textfield');
                    tmpCombo.setDisabled(f);
                    tmpCombo.setValue('');
                    this.up('container').toggleBtnDisable(true);
          }//select
        }//listeners
    } ,{
        xtype: 'combo',
        cls: 'cboxFields',
        editable: true,
        selectOnFocus: false,
        forceSelection: true,
        displayField: 'text',
        valueField: 'text',
        emptyText: '(Field)',
        typeAhead: true,
        queryDelay: 10,
        value: '',
        triggerAction: 'query',
        queryMode: 'local',
        width: '10%',
        disabled: true,
        listeners: {
          'select' : function (t, r, opts){
               var tmpCombo = t.next('combo'),
                   f = (t.value === null);
               if (!f && tmpCombo.getValue() !== null && t.prev('combo').getValue() !== null) {
                    this.up('container').toggleBtnDisable(false);
               }
               else {
                    this.up('container').toggleBtnDisable(true);
               }

          },

          'change' : function (t,n,o,opts){
               if (this.getValue() === null) {
                    this.up('container').toggleBtnDisable(true);
                    this.reset();
               }

          }
        }
    }, {
        xtype: 'combo',
        cls: 'cboxOpers',
        editable: true,
        selectOnFocus: false,

        forceSelection: true,
        typeAhead: true,
        queryDelay: 10,
        value: '',
        triggerAction: 'query',

        queryMode: 'local',
        width: '10%',
        store: operStore,
        displayField: 'opername',
        valueField: 'opervalue',
        emptyText: '(Oper)',
        //TODO 6/11 add this? what bene? enableKeyEvents: true,
        listeners: {
            'select': function (t, n, o, opts) {
                var ao = t.next('textfield').next('combo'),
                    tf = t.next('textfield'),
                    tf2 = t.next('textfield').next('combo').next('textfield');
                if (t.prev('combo').getValue() !== null && t.prev('combo').prev('combo').getValue()!==null) {
                    this.up('container').toggleBtnDisable(false);
                }
                else {
                    this.up('container').toggleBtnDisable(true);
                }
                if (t.value === 'BETWEEN') {
                    ao.setValue('AND');
                    ao.disable();
                } else if (t.value === 'NULL' || t.value === 'NOT_NULL') {
                    tf.setValue('');
                    tf.disable();
                    ao.setValue('');
                    ao.disable();
                    tf2.setValue('');
                    tf2.disable();
                } else {
                    if (t.value !== 'BETWEEN') {
                        ao.setValue('');
                        ao.enable();
                        tf.enable();
                    }
                    tf2.enable();
                }
            },
            'change' : function(t,n,o,opts){
               if (this.getValue() === null){
//                    this.up('container').toggleBtnDisable(true);
                    this.reset();
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
        enforceMaxLength: true,
        disabled: true
    }, {
        xtype: 'combo',
        cls: 'cboxAndOr',
        store: andorStore,
        disabled: true,
        displayField: 'andordisplay',
        valueField: 'andorvalue',
        typeAhead: true,
        triggerAction:'all',
        emptyText: '(AND/OR)',
        allowBlank: true,
        maxLength: 3,
        enforceMaxLength: true,
        minChars: 1,
        forceSelection: true,
        queryMode: 'local',
        width: '12%',
        listeners: {
          'change' : function (t,n,o,opts){
               if (this.getValue() === null)
                    this.reset();
          }
        }
    }, {
        xtype: 'textfield',
        width: '17%',
        emptyText: '(Enter value...)',
        regex: SearchTool.config.Config.qryBuilderTextFieldRegex,
        regexText:  SearchTool.config.Config.qryBuilderErrText,
        maxLength: 25,
        enforceMaxLength: true,
        disabled: true
    }, {
        xtype: 'hidden',
        value: ''
    }, {
        xtype: 'button',
        iconCls: 'icon-btnAdd',
        text: 'AND',
        width: '7%',
        disabled: true,
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
        disabled: true,
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
        disabled: true,
        handler: function (b) {
            var i = b.up('panel').items.items,
                l = i.length; //length of the array of items
            if (l > 2) i[l - 2].down('button').next('button').next('button').show(); //prev row del btn
            i[b.up('panel').items.items.length - 2].down('hidden').setValue(''); //prev row hidden field value reset to ''
            i[l - 2].down('button').next('button').removeCls('qbuilderBtnSelected').removeCls('qbuilderBtnDeselected'); //prev row css adjustments - 2nd button
            i[l - 2].down('button').removeCls('qbuilderBtnSelected').removeCls('qbuilderBtnDeselected'); //prev row css adjustments for 1st button
            b.up('panel').remove(b.up('container')); //finally, remove this row
        }
    }],
    listeners:{
     afterrender: function(t, opts){
          this.down('combo').store = Ext.create('Ext.data.Store',{model:'SearchTool.model.Product',data:Ext.StoreManager.lookup('Sources').getAt(0).getAssociatedData().products});
     }
    }
});