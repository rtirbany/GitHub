var tplKeyword = new Ext.XTemplate(
    '<tpl for=".">',
          '<div class="searchitem_remove">',          
          '<input type="button" title="remove keyword search criteria" id="{type}" class="btn_searchitem_remove13"/>',
          '<label class="keyword_item" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
           '</div></tpl>' //use array index to autonumber (starts at 1)
);

var tplBool = new Ext.XTemplate( 
    '<tpl for=".">',
          '<div class="boolitem_remove">',
          '<input type="button" title="remove boolean search criteria" name="{type}" class="btn_searchitem_remove13"/>',
          '<label class="bool_item" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
          '</div></tpl>' //use array index to autonumber (starts at 1)
);
 
var tplFacet = new Ext.XTemplate(
     '<tpl for=".">', 
            '<div class="facet" id="{facetName}">',
            //'<label class="facet_field">{facetName}</label>',  //handled in title of panel
               '<tpl for="facetEntries">',
                '<div class="facet_item" title="{value}&nbsp;&nbsp;({count})" id="{value}">{value}&nbsp;&nbsp;({count})</div>',
               '</tpl></div>',
          '</tpl>' //use array index to autonumber (starts at 1)
);

//var tplFilterData = new Ext.XTemplate(
//    '<tpl for=".">',
//          '<tr><td class="facetitem_remove"><div style="width:100%;">',
//          '<input type="button" title="remove this filter" class="btn_facetitemremove"/>',
//          '<label class="facetselection_item" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
//          '</div></td></tr></tpl>' //use array index to autonumber (starts at 1)
//);
//
//var tplFilterSrc = new Ext.XTemplate(
//    '<tpl for=".">',
//    '<tr><td class="facetsrc_remove">',
//          '<div style="width:100%;">',
//          '<input type="button" title="remove this product" class="btn_facetitemremove"/>',
//          '<label class="facetselection_product" title="{tip}">{key}&nbsp;=&nbsp;{value}</label>',
//          '</div></td></tr>',
//          '</tpl>' //use array index to autonumber (starts at 1)
//);
 
Ext.define('SearchTool.util.TplFilter',{
     singleton: true,
     loaderXTemplateRenderer: new Ext.XTemplate(
               '<tpl for=".">',
               '{[this.renderItem(values)]}',
               '</tpl>', 
                    {
                    renderItem: function (val) { 
                         if (!val.type) {
                              var x =  tplFacet.apply(val); 
                             return x;
                         }
                          else { 
                            switch (val.type) {
                               case 'searchkeyword' : return tplKeyword.apply(val);
                               case 'searchboolean' : return tplBool.apply(val); 
                               case 'facet' : return  tplFacet.apply(val); 
                               default : return '';
                             } 
                         }
                    }
          })
        //return tpl;
//          ,
//       filterTpl : new Ext.XTemplate(
//               '<table class="facetgroup">',
//               '<tpl for=".">',
//               '{[this.renderItem(values)]}',
//               '</tpl></table>', {
//                    renderItem: function (val) {
//                         switch (val.type) {
//                              case 'source' : x = tplFilterSrc.apply(val); break;
//                              case 'facet' :  x = tplFilterData.apply(val); break;
//                              default : x = '';
//                         }
//                         return x;
//                    }    
//               })
//      
    });
         
 