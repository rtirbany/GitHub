Ext.define('SearchTool.view.main.component.QueryBuilder', {
    extend: 'Ext.form.Panel',
    alias: 'widget.qbuilder',
    itemId: 'queryBuilder',
    iconCls: 'icon-qbuilder',
    title: 'Query Builder',
    bodyStyle: 'padding: 6px',
    draggable: true,
    floating: true,
    titleCollapse: true,
    collapsible: true,
    resizable: {
          handles: 's se e',
          preserveRatio: true
    },
    centered: true,
    hidden: true,
    requires: ['SearchTool.view.main.component.QueryBuilderRow'],
    border: true,
    overflowX: 'hidden',
    overflowY: 'auto',
    tools: [
    {
        type: 'help',
        tooltip: 'Help page for Query Builder area',
        handler: function (ev, el, p) {
            Ext.Msg.alert('some querybuilder help page');
        }
    },
    {
        xtype: 'tool',
        type: 'close',
        handler: function (e, target, p, tool) {
            this.up('panel').hide();
    }
    }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [
        //                      {
        //                          text : 'Help',
        //                          handler : function() {
        //                              Ext.Msg.alert('some querybuilder help page');
        //                          }
        //                      },
        {
            xtype: 'tbfill'
        }, {
            text: 'Clear All',
            iconCls: 'icon-btnClearBlue',
	        tooltip: SearchTool.config.Config.queryBuilderClearToolTip,
            handler: function () {
                var p = this.up('panel');
                p.removeAll();
                p.add({
                    xtype: 'builderRow'
                });
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
            text: 'Build Query',
            iconCls: 'icon-qbuilder',
            tooltip: SearchTool.config.Config.queryBuilderToolTip,
            itemId: 'btnBuildQuery'
        }, {
            xtype: 'tbspacer',
            width: 3
        }] // toolbar items
    } // toolbar
    ], //dockedItems
    items: [{
        xtype: 'builderRow'
    }]
}

);