Ext.define('SearchTool.view.help.Reference', {
    extend: 'Ext.panel.Panel',
    itemId: 'help_ref',
    title: 'Quick Reference',
    resizable: true,
    floating: true,
    draggable: true,
    width: 400,
    height: 600,
    frame: true,
    overflowY: 'auto',
    overflowX: 'hidden',
    autoLoad: {
        url: 'data/acro.html'
    },
    tools: [{
        xtype: 'tool',
        type: 'close',
        handler: function (e, target, p, tool) {
            this.up('panel').close();
        }
    }]
});