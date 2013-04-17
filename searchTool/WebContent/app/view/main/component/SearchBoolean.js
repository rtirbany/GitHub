//TODO: clean this up
Ext.define('SearchTool.view.main.component.SearchBoolean', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.searchBoolean',
    itemId: 'pnlSearchBoolean',
    url: SearchTool.config.Config.searchUrl,
    requires: ['SearchTool.view.main.component.QueryBuilder', 'SearchTool.config.Config','SearchTool.view.help.Boolean'],
    height: 115,
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        frame: false,
        border: 1,
        items: [{
            xtype: 'tbspacer',
            width: 3
        }, {
            text: 'Query Builder',
            cls: 'btnSearchBoolean',
            iconCls: 'icon-qbuilder',
            tooltip: 'Launch Query Builder',
            handler: function (b) {
                var pqb = Ext.ComponentQuery.query('#pnlQbuilder');
                if (pqb.length == 0) {
                    var activeTab = this.up('tabpanel').getActiveTab();
                    activeTab.add({
                        xtype: 'qbuilder',
                        width: Ext.ComponentQuery.query('#pnlSearchBoolean')[0].getWidth() * 1.2,
                        height: Ext.ComponentQuery.query('#pnlSearchBoolean')[0].getHeight() * 2,
                        itemId: 'pnlQbuilder'
                    }).show();
                } else {
                    pqb[0].center();
                    if (pqb[0].collapsed) pqb[0].expand();
                    pqb[0].show();
                }

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
            xtype: 'tool',
            type: 'help',
            tooltip: 'Some boolean help page',
            handler: function () {
                var ref = Ext.ComponentQuery.query('#help_bool');
                if (ref.length == 0) {
                    Ext.create('SearchTool.view.help.Boolean').show();
               }
               else {
                     ref[0].center();
                     ref[0].show();
               }
            } 
        }, {
            xtype: 'tbspacer',
            width: 2
        }, {
            xtype: 'tbfill'
        }, {
            text: 'Clear',
            cls: 'btnSearchBoolean',
            iconCls: 'icon-btnClearBlue',
            handler: function () {
                Ext.ComponentQuery.query('#txtSearchBoolean')[0].reset();
            }
        },  {
            xtype: 'tbspacer',
            width: 3
        } 
        ]
    }],

    items: [{
        xtype: 'textarea',
        itemId: 'txtSearchBoolean',
        name: 'txtSearchBoolean',
        cls: 'searchBooleanTextArea',
        border: false,
        emptyText: '(Error checking not available)',
        style: 'border:none; !important;',
        bodyStyle: 'border: none; !important;',
        hideBorders: true,
        width: '100%',
        height: '90%'
//        ,listeners : {
//          change : function(field) {
//                field.setValue(field.getValue().trim());
//          }
//        }
    }]
}

);