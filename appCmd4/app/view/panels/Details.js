Ext.define('appCmd4.view.panels.Details', {
    extend: 'Ext.panel.Panel',

    xtype: 'pnlDetails',

    initComponent: function() {

        Ext.apply(this, {
            animCollapse: true,
            titleCollapse: true,
            width: 200,
            minWidth: 150,
            maxWidth: 400,
            split: true,
            collapsible: true,
            layout: 'vbox',
            defaults: {
                width: '100%',
                collapsible: true
            },
            items: [{
                title: 'Overview'
            },{
                title: 'Specs'
            }]
        });

        this.callParent(arguments);
    }
});
