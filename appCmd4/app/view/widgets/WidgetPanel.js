Ext.define('appCmd4.view.widgets.WidgetPanel', {
    extend: 'appCmd4.view.panels.Main',

    xtype: 'pnlWidget',

    uses: ['appCmd4.util.Constants'],

    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, panelHeader, tool){
                var w = panelHeader.ownerCt;
                w.setLoading('Loading...');
                Ext.defer(function() {
                    w.setLoading(false);
                }, 2000);
            }
        }];
    },

    initComponent: function() {

        Ext.apply(this, {

            items: [{
                id: 'col-1',
                items: [{
                    id: 'portlet-1',
                    title: 'ArcGIS Map Portlet',
                    tools: this.getTools(),
                    html: 'some kind of map',
                    height: 300
                    //items: Ext.create('appCmd4.view.widgets.ui.Grid')
                }]
            },{
                id: 'col-2',
                items: [{
                    id: 'portlet-3',
                    title: 'Visualization Launcher Portlet',
                    tools: this.getTools(),
                    items: Ext.create('appCmd4.view.widgets.ui.Grid')
                }]
            },{
                id: 'col-3',
                items: [{
                    id: 'portlet-4',
                    title: 'Portlet',
                    tools: this.getTools(),
                    items: Ext.create('appCmd4.view.widgets.charts.Timeline')
                }]
            }]

        });

        this.callParent(arguments);
    }
});
