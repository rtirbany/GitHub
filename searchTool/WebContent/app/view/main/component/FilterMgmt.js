var tplData = new Ext.XTemplate(
    '<tpl for=".">',
          '<tr><td class="facetitem_remove"><div style="width:100%;">',
          '<input type="button" title="remove this filter" class="btn_facetitemremove"/>',
          '<label class="facetselection_item" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
          '</div></td></tr></tpl>' //use array index to autonumber (starts at 1)
);

var tplSrc = new Ext.XTemplate(
    '<tpl for=".">',
    '<tr><td class="facetsrc_remove">',
          '<div style="width:100%;">',
          '<input type="button" title="remove this product" class="btn_facetitemremove"/>',
          '<label class="facetselection_product" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
          '</div></td></tr>',
          '</tpl>' //use array index to autonumber (starts at 1)
);
//
//var tplDate = new Ext.XTemplate(
//      '<tpl for=".">',
//          '<tr><td><div class="facetitem">{key}&nbsp;=&nbsp;{term}</div></td></tr>'
//);
//
var mainTpl = new Ext.XTemplate(
    '<table class="facetgroup">',
    '<tpl for=".">',
    '{[this.renderItem(values)]}',
    '</tpl></table>', {
    renderItem: function (val) {
        switch (val.type) {
          case 'source' : x = tplSrc.apply(val); break;
          case 'facet' :  x = tplData.apply(val); break;
          default : x = '';
        }
        return x;
    }
});

// tplData.overwrite(filtermgmt.body, dataObjJSON); //pass in root node of data object

Ext.define('SearchTool.view.main.component.FilterMgmt', {
    extend: 'Ext.container.Container',
    alias: 'widget.filtermgmt',
    border: false,
    layout: 'vbox',
    items: [{
            xtype: 'container',
            layout: 'hbox',
            items: [{
                    xtype: 'displayfield',
                    value: 'Filter Options:',
                    margin: 5,
                    width: 95
                }, {
                    xtype: 'button',
                    itemId: 'btnRemoveAll', 
                    width: 80,
                    margin: 5,
                    text: 'Remove All'
                }, {
                    xtype: 'button',
                    itemId: 'btnRelaxAll', 
                    width: 65,
                    margin: 5,
                    enableToggle: true,
                    text: 'Relax All',
                    handler: function(){
                         this.setText(this.pressed ? 'Enforce All' : 'Relax All');
                    }
                }
            ] //container hbox
        }, {
            xtype: 'dataview',
            itemId: 'dvFacetSelections',
//            store: Ext.StoreManager.lookup('QueryFilters').filter(new Ext.util.Filter({
//               filterFn:function(item){
//                    return item.data.type == 'source' ? true : false;
//               }
//            })),
            tpl: mainTpl,
            overflowY: 'auto',
            overflowX: 'hidden',
            width: '100%',
            itemSelector: 'input.btn_facetitemremove',
            //overItemCls: 'facetitem-over',
            //iconCls: 'icon-btnClear',
            emptyText: '(no filters selected)'
             
        } //dataview 

    ] //container vbox

});

// stackoverflow.com/questions/9141918
13342593
