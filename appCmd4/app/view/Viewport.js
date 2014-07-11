Ext.define('appCmd4.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'appCmd4.view.panels.Main'
    ],

    layout: {
        type: 'fit'
    },


    uses: [
        'appCmd4.view.panels.Main',
        'appCmd4.view.panels.PanelColumn',
        'appCmd4.view.widgets.WidgetPanel',
        'appCmd4.view.panels.Menu',
        'appCmd4.view.panels.Details',
        'appCmd4.view.widgets.ui.Grid',
        'appCmd4.view.widgets.charts.Timeline',
        'appCmd4.util.Constants'
    ],

    initComponent: function(){

        Ext.apply(this, {
            id: 'app-viewport',
            layout: {
                type: 'border',
                padding: '0 5 5 5'
            },
            items: [{
                id: 'app-header',
                xtype: 'box',
                region: 'north',
                height: 40,
                html: 'Diamond Capability Dashboard'
            },{

                                xtype: 'toolbar',
                                region: 'north',
                                defaults: {
                                    enableToggle: true
                                },
                                items: [
                                    {
                                        text: 'All',
                                        handler: function(btn, e){
                                            var typeButtons = Ext.ComponentQuery.query('button[itemId!=undefined]');
                                            for (var i=0; i<typeButtons.length; i++){
                                                if (typeButtons[i].pressed) {
                                                    typeButtons[i].toggle();
                                                }
                                            };
                                        }
                                    },
                                    {
                                        itemId: 'type1',
                                        text:'Type1',
                                        handler: function(btn, e) {
                                            var tmpBtn = btn.up().down();
                                            if (tmpBtn.pressed) {
                                                tmpBtn.toggle();
                                            }

                                        }

                                    },
                                    {
                                        itemId: 'type2',
                                        text:'Type2',
                                        handler: function(btn, e) {
                                            var tmpBtn = btn.up().down();
                                            if (tmpBtn.pressed) {
                                                tmpBtn.toggle();
                                            }
                                        }
                                    },
                                    {
                                        itemId: 'type3',
                                        text:'Type3',
                                        handler: function(btn,e) {
                                             var tmpBtn = btn.up().down();
                                             if (tmpBtn.pressed) {
                                                tmpBtn.toggle();
                                             }
                                        }

                                    },
                                    {
                                        itemId: 'type4',
                                        text:'Type4',
                                        handler: function(btn,e) {
                                            var tmpBtn = btn.up().down();
                                            if (tmpBtn.pressed) {
                                                tmpBtn.toggle();
                                            }
                                        }
                                    },
                                    {
                                        itemId: 'type5',
                                        text:'Type5',
                                        handler: function(btn,e) {
                                            var tmpBtn = btn.up().down();
                                            if (tmpBtn.pressed) {
                                            tmpBtn.toggle();
                                            }
                                        }
                                    },{
                                        itemId: 'type6',
                                        text:'Type6',
                                        handler: function(btn,e) {
                                            var tmpBtn = btn.up().down();
                                            if (tmpBtn.pressed) {
                                                tmpBtn.toggle();
                                            }
                                        }
                                    },{
                                        xtype: 'tbfill'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Start Date',
                                        labelWidth: 60
                                    },
                                    {
                                        xtype: 'tbspacer'
                                    },
                                    {
                                      xtype: 'multislider',
                                      width: 200,
                                      values: [0,100],
                                      minValue: 0,
                                      maxValue: 100
                                    },
                                    {
                                        xtype: 'tbspacer'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'End Date',
                                        labelWidth: 50
                                    },
                                    {
                                        xtype: 'tbfill'
                                    },
                                    {
                                        text: 'Settings',
                                        enableToggle: false
                                    },
                                    {
                                        text:'Logout',
                                        enableToggle: false,
                                        width: 60
                                    }
                                ]
            },{
                xtype: 'container',
                region: 'center',
                layout: 'border',
                items: [{
                    id: 'app-portal',
                    xtype: 'pnlWidget',
                    region: 'center',
                }]
            },{
                xtype: 'pnlMenu',
                title: 'Navigation',
                region: 'west',
                weight: 2
            },{
                xtype: 'pnlDetails',
                title: 'Details',
                region: 'east',
                weight: 2
            },{
               title: 'Graph',
               collapsible: true,
               html: 'sparkgraph or other graph type',
               region: 'south',
               weight: 1,
               height: '20%'
            },{
                title: 'Interactive Timeline or TimelineJS',
                collapsible: true,
                xtype: 'chartTimeline',
                region: 'south',
                weight: 1,
                height: '20%'
            }]
        });
        this.callParent(arguments);
    }
});
