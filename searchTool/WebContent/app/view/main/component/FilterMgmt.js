var tplDataOrig = new Ext.XTemplate(
    '<tpl for=".">',
          '<tr><td class="facetitem_remove"><div style="width:100%;">',
          '<input type="button" title="remove this filter" class="btn_facetitemremove"/>',
          '<label class="facetselection_item" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
          '</div></td></tr></tpl>' //use array index to autonumber (starts at 1)
);

var tplSrcOrig = new Ext.XTemplate(
    '<tpl for=".">',
    '<tr><td class="facet_remove">',
          '<div style="width:100%;">',
          '<input type="button" title="remove this product" class="btn_facetitemremove"/>',
          '<label class="facetselection_product" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
          '</div></td></tr>',
          '</tpl>' //use array index to autonumber (starts at 1)
);

var tplData = new Ext.XTemplate(
    '<tpl for=".">',
          '<li class="filter_remove">',
          //'<a title="Remove&nbsp;{key}&nbsp;=&nbsp;{value}" class="facetitem_remove">',
//            '<img src="extjs/resources/images/delete_blue_x.png" title="{key}&nbsp;=&nbsp;{value}"></img>',
            '<label class="facetsrc_remove" style="width:100%;"><img src="extjs/resources/images/delete_blue_x.png" title="{key}&nbsp;=&nbsp;{value}"></img>&nbsp;{key}&nbsp;=&nbsp;{value}<label>',
          //  '</a>',
           '</li></tpl>' //use array index to autonumber (starts at 1)
);          
var tplSrc = new Ext.XTemplate(
    '<tpl for=".">',
     '<li class="filter_remove">', 
            //'<a title="Remove&nbsp;{key}&nbsp;=&nbsp;{value}" class="facetsrc_remove">',
//            '<img src="extjs/resources/images/delete_blue_x.png" title="{key}&nbsp;=&nbsp;{value}"></img>',
            '<label class="facetsrc_remove" style="width:100%;"><img src="extjs/resources/images/delete_blue_x.png" title="{key}&nbsp;=&nbsp;{value}"></img>&nbsp;{key}&nbsp;=&nbsp;{value}</label>',
            //'</a>',
     '</li></tpl>' //use array index to autonumber (starts at 1)

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
    cls: 'pnlFilterMgmt',
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
                    width: 70,
                    margin: 5,
                    text: 'Remove All'
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
            overflowY: 'auto',
            overflowX: 'hidden',
            width:'100%',
            itemSelector: 'li.filter_remove',
//            overItemCls: 'facetitem-over',
            //iconCls: 'icon-btnClear',
            emptyText: '(no filters selected)'
             
        }] //dataview  
      //container vbox

});

// stackoverflow.com/questions/9141918
//13342593
