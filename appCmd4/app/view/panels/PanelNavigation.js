Ext.define('appCmd4.view.panels.PanelNavigation', {
    extend: 'Ext.panel.Panel',

    xtype: 'navigation',

    initComponent: function() {

        Ext.apply(this, {

            html: appCmd4.util.Constants.shortBogusMarkup,
            title:'Navigation',
            autoScroll: true,
            border: false,
            iconCls: 'nav'

        });

        this.callParent(arguments);
    }
});
