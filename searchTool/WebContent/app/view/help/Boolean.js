Ext.define('SearchTool.view.help.Boolean', {
    extend: 'Ext.panel.Panel',
    itemId: 'help_bool',
    title: 'Help - Boolean Logic',
    resizable: true,
    floating: true,
    draggable: true,
    width: 450,
    height: 600,
    frame: true,
    overflowY: 'auto',
    overflowX: 'hidden',
    autoLoad: {
        url: 'data/boolean.html'
    },
    tools: [{
        xtype: 'tool',
        type: 'close',
        handler: function (e, target, p, tool) {
            this.up('panel').close();
        }
    }]
});