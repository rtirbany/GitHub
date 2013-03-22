var tplData = new Ext.XTemplate(
    '<tpl for=".">',
    '<tr><td><div style="width:100%; overflow:hidden;"><input type="button" title="remove this filter" name="remove_{#}" class="facetitemremovebutton"/><label class="facetitem" title="{tip}">{key}&nbsp;=&nbsp;{value}</label></div></td></tr></tpl>' //use array index to autonumber (starts at 1)

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
                    value: 'Filters Options:',
                    cls: 'filterdisplayfield',
                    margin: 5,
                    width: 85
                }, {
                    xtype: 'button',
                    //                            labelWidth : 65,
                    width: 80,
                    margin: 5,
                    text: 'Remove All',
                    handler: function(){
                         Ext.Msg.confirm('Confirm - Remove all filters','Are you sure you want to remove all filters?');
                    }
                }, {
                    xtype: 'button',
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
            store: 'FacetSelections',
            tpl: mainTpl,
            autoSync: true,
            overflowY: 'auto',
            overflowX: 'hidden',
            width: '100%',
            itemSelector: 'input.facetitemremovebutton',
            //overItemCls: 'facetitem-over',
            //iconCls: 'icon-btnClear',
            emptyText: '(no filters selected)'
             
        } //dataview 

    ] //container vbox

});

// stackoverflow.com/questions/9141918
13342593
