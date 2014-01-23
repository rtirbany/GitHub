var tplData = new Ext.XTemplate(
    '<tpl for=".">',
          '<li class="filter_remove">',
          '<a title="Remove {key}&nbsp;=&nbsp;{value}" class="facetitem_remove">',
          '<img src="/extjs/resources/images/delete.png" title="Remove&nbsp;=&nbsp;{value}" border="0"/>',
          '&nbsp;{key}&nbsp;=&nbsp;{value}</a></li></tpl>'
          //use array index to autonumber (starts at 1)
);

var tplSrc = new Ext.XTemplate(
    '<tpl for=".">',
    '<li class="filter_remove">',
    '<a title="Remove {key}&nbsp;=&nbsp;{value}" class="facetsrc_remove">',
    '<img src="/extjs/resources/images/delete.png" title="Remove&nbsp;=&nbsp;{value}" border="0"/>',
    '&nbsp;{key}&nbsp;=&nbsp;{value}</a></li></tpl>'
    //use array index to autonumber (starts at 1)
);

//var tplDate = new Ext.XTemplate(
//      '<tpl for=".">',
//          '<tr><td><div class="facetitem">{key}&nbsp;=&nbsp;{term}</div></td></tr>'
//);

var mainTpl = new Ext.XTemplate(
    '<ul class="facetgroup">',
    '<tpl for=".">',
    '{[this.renderItem(values)]}',
    '</tpl></ul>', {
    renderItem: function (val) {
        switch (val.type) {
          case 'source' :
              x = tplSrc.apply(val);
              break;
          case 'facet' :
              x = tplData.apply(val);
              break;
          default :
              x = '';
              break;
        }
        return x;
    }
});

// tplData.overwrite(filtermgmt.body, dataObjJSON); //pass in root node of data object

Ext.define('SearchTool.view.main.component.FilterMgmt', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.filtermgmt',
    cls: 'pnlFilterMgmt',
    titleCollapse: true,
    collapsible: true,
    animCollapse: true,
    collapseDirection: 'top',
    title: 'Filter Options',
    border: 0,
    height: '100%',
    closeable: false,
    layout: 'vbox',
    items: [{
            xtype: 'container',
            frame: false,
            width: '100%',
            layout: 'hbox',
            items: [
                {
                    xtype: 'button',
                    itemId: 'btnRemoveAll',
                    width: 70,
                    margin: 5,
                    text: 'Remove All',
                    tooltip: SearchTool.config.Config.removeAllToolTip,
                    disabled: true
                }
//                ,
//                    {
//                    xtype: 'button',
//                    itemId: 'btnRelaxAll',
//                    width: 65,
//                    margin: 5,
//                    enableToggle: true,
//                    text: 'Relax All',
//                    handler: function(){
//                         this.setText(this.pressed ? 'Enforce All' : 'Relax All');
//                    }
//                }
            ] //container hbox
        }, {
            xtype: 'dataview',
            itemId: 'dvFacetSelections',
            store:  'QueryFilters' ,
//            store: Ext.StoreManager.lookup('QueryFilters').filter(new Ext.util.Filter({
//               filterFn:function(item){
//                    return item.data.type == 'source' ? true : false;
//               }
//            })),
            tpl: mainTpl,
            autoSync: true,
            overflowY: 'hidden',
            overflowX: 'hidden',
            flex: 1,
            itemSelector: 'li.filter_remove',
//            overItemCls: 'facetitem-over',
            //iconCls: 'icon-btnClear',
            emptyText: '(no filters selected)'

        }] //dataview
      //container vbox

});

// stackoverflow.com/questions/9141918
//13342593
