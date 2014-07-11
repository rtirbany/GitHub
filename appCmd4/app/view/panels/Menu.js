Ext.define('appCmd4.view.panels.Menu', {
    extend: 'Ext.panel.Panel',

    xtype: 'pnlMenu',

    requires: [
        'appCmd4.view.panels.PanelNavigation'
        //,
        //'ExtMVC.view.portal.SettingsMenu'
    ],

    initComponent: function() {

        Ext.apply(this, {
            animCollapse: true,
            titleCollapse: true,
            width: 200,
            minWidth: 150,
            maxWidth: 400,
            split: true,
            collapsible: true,
            layout:{
                type: 'accordion',
                animate: true
            },
            items: [{
                xtype: 'navigation'
            },{
                //xtype: 'settings'
            }]
        });

        this.callParent(arguments);
    }
});
