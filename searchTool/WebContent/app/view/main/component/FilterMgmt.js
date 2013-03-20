var tplData = new Ext.XTemplate(
     '<tpl for=".">',
          '<tr><td class="facetitem" title="{tip}">{key}&nbsp;=&nbsp;{value}</td></tr></tpl>'   //use array index to autonumber (starts at 1)
      
);

var tplDate = new Ext.XTemplate(
      '<tpl for=".">',
          '<tr><td class="facetitem">{key}&nbsp;=&nbsp;{term}</td></tr>'
);

var mainTpl = new Ext.XTemplate(
     '<table class="facetgroup">',
          '<tpl for=".">',
             '{[this.renderItem(values)]}',
     '</tpl></table>',
     {
          renderItem : function(val) {
                 debugger;
//               if (val.data.value instanceof Ext.Date) {
                    var x = tplData.apply(val);
//                    console.log(x);
                    return x;
//               }
//               else {
//                  debugger;
//                  return tplData.apply(val.data);
//                  }
          }
     }
);

// tplData.overwrite(filtermgmt.body, dataObjJSON); //pass in root node of data object

Ext.define('SearchTool.view.main.component.FilterMgmt', {
            extend:'Ext.container.Container',
            alias:'widget.filtermgmt',
			border : false,
            layout:'vbox',
			items : [
               {
                    xtype:'container',
                    layout:'hbox',
                    items:[{
						xtype : 'displayfield',
						value : 'Filters Options:',
						width : 100
					}, {
						xtype : 'checkbox',
						labelWidth : 65,
						width : 85,
						fieldLabel : 'Remove All'
					}, {
						xtype : 'checkbox',
						labelWidth : 50,
						width : 70,
						fieldLabel : 'Relax All'
                    }]//container hbox
				}
                    , 
                {
			        xtype: 'dataview',
                    itemSelector : 'td.facetitem',
                    store:'FacetSelections',
                    tpl: mainTpl
				//	'<tpl for="tools">', '<div class="appTool">{name}</div>',
				//	'</tpl>', '</tpl>']
//                    new Ext.XTemplate('<tpl for=".">', '<div class="filtermgmt"">{group}</div>',
//                       '<tpl for="tools">', '<div class="appTool">{name}</div>',
//                        '</tpl>', '</tpl>'),
                }
                ]//container vbox

		});

// stackoverflow.com/questions/9141918
