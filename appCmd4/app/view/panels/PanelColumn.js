Ext.define('appCmd4.view.panels.PanelColumn', {
    extend: 'Ext.container.Container',
    xtype: 'pnlColumn',

    requires: ['appCmd4.view.widgets.BaseWidget'],

    layout: 'anchor',
    defaultType: 'baseWidget',
    cls: 'x-portal-column'

    // This is a class so that it could be easily extended
    // if necessary to provide additional behavior.
});
