var tplSearch = new Ext.XTemplate(
    '<tpl for=".">',
          '<tr><td><div style="width:100%;">',
     //     '<input type="button" title="remove this filter" class="facetitem_remove"/>',
          '<label class="keyword_item" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
          '</div></td></tr></tpl>' //use array index to autonumber (starts at 1)
);

var tplBool = new Ext.XTemplate(
    '<tpl for=".">',
          '<tr><td><div style="width:100%;">',
    //      '<input type="button" title="remove this filter" class="facetitem_remove"/>',
          '<label class="bool_item" style="white-space:nowrap; text-overflow:ellipsis; overflow:hidden;" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
          '</div></td></tr></tpl>' //use array index to autonumber (starts at 1)
);



Ext.define('SearchTool.util.TplFilter',{
     singleton: true,
     loaderXTemplateRenderer: new Ext.XTemplate('<table class="facetgroup">',
               '<tpl for=".">',
               '{[this.renderItem(values)]}',
               '</tpl></table>', 
                    {
                    renderItem: function (val) {
                         switch (val.type) {
                              case 'searchKeyword' : return tplSearch.apply(val);
                              case 'searchBoolean' : return tplBool.apply(val);
                              default : return '';
                         } 
                    }
          })
        //return tpl;
    })
         
 