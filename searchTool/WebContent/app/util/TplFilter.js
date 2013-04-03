var tplSearch = new Ext.XTemplate(
    '<tpl for=".">',
          '<tr><td class="searchitem_remove"><div style="width:100%; height:14px;">',                 
          '<input type="button" title="remove keyword search criteria" name={type} class="btn_searchitem_remove13"/>',
          '<label class="keyword_item" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
          '</div></td></tr></tpl>' //use array index to autonumber (starts at 1)
);

var tplBool = new Ext.XTemplate(
    '<tpl for=".">',
          '<tr><td class="boolitem_remove"><div style="width:100%; height:14px;">',
          '<input type="button" title="remove boolean search criteria" name={type} class="btn_searchitem_remove13"/>',
          '<label class="bool_item" style="white-space:nowrap; text-overflow:ellipsis; overflow:hidden;" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
          '</div></td></tr></tpl>' //use array index to autonumber (starts at 1)
);
 
var tplFacet = new Ext.XTemplate(
    '<tpl for=".">',
          '<tr  style="width:100%;"><td class="facet_field">',
          '<label class="facet" style="white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">{facetName}</label></td></tr>',
               '<tpl for="facetEntries">',
                '<tr class="facetitem"><td class="facet_item">{value}&nbsp;&nbsp;({count})</td></tr>',
               '</tpl>',
          '</tpl>' //use array index to autonumber (starts at 1)
);

 
Ext.define('SearchTool.util.TplFilter',{
     singleton: true,
     loaderXTemplateRenderer: new Ext.XTemplate('<table class="facetgroup">',
               '<tpl for=".">',
               '{[this.renderItem(values)]}',
               '</tpl></table>', 
                    {
                    renderItem: function (val) {
                         if (!val.key) {
                            return tplFacet.apply(val);
                         }
                          else {
                            switch (val.key) {
                               case 'keywordString' : return tplSearch.apply(val);
                               case 'booleanString' : return tplBool.apply(val); 
                               default : return '';
                             } 
                         }
                    }
          })
        //return tpl;
       
      
    });
         
 