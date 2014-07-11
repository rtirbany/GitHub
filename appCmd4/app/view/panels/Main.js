/**
 * @class Ext.app.PortalPanel
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class used for providing drag-drop-enabled portal layouts.
 */
Ext.define('appCmd4.view.panels.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'pnlMain',

    requires: ['appCmd4.view.panels.PanelColumn'],

    cls: 'x-portal',
    bodyCls: 'x-portal-body',
    defaultType: 'pnlColumn',
    autoScroll: true,

    initComponent : function() {
        var me = this;

        // Implement a Container beforeLayout call from the layout to this Container
        this.layout = {
            type : 'column'
        };
        this.callParent();

        this.addEvents({
            validatedrop: true,
            beforedragover: true,
            dragover: true,
            beforedrop: true,
            drop: true
        });
        this.on('drop', this.doLayout, this);
    },
             /*
    // Set columnWidth, and set first and last column classes to allow exact CSS targeting.
    beforeLayout: function() {
        var items = this.layout.getLayoutItems(),
            len = items.length,
            i = 0,
            item;

        for (; i < len; i++) {
            item = items[i];
            item.columnWidth = 1 / len;
            item.removeCls(['x-portal-column-first', 'x-portal-column-last']);
        }
        items[0].addCls('x-portal-column-first');
        items[len - 1].addCls('x-portal-column-last');
        return this.callParent(arguments);
    },    */
    // Set columnWidth, and set first and last column classes to allow exact CSS targeting.
    beforeLayout: function() {
        var items = this.layout.getLayoutItems(),
            len = items.length, //len is the number of columns specified
            i = 0,
            item,
            mainColIndex = 0, //the index of the main column that we want to take up the most space
            mainColWidth = .55; //the % of space we want our main column to take up

        for (; i < len; i++) {
            item = items[i];

            if(i===mainColIndex)
            {
                item.columnWidth = mainColWidth;
            }else{
                item.columnWidth = (1-mainColWidth) / (len -1);
            }

            item.removeCls(['x-portal-column-first', 'x-portal-column-last']);
        }
        items[0].addCls('x-portal-column-first');
        items[len - 1].addCls('x-portal-column-last');
        return this.callParent(arguments);
    },

    // private
    initEvents : function(){
        this.callParent();
        this.dd = Ext.create('appCmd4.view.panels.PanelDropTarget', this, this.dropConfig);
    },

    // private
    beforeDestroy : function() {
        if (this.dd) {
            this.dd.unreg();
        }
        this.callParent();
    }
});
