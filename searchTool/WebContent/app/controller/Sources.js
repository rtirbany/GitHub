Ext.define('SearchTool.controller.Sources', {
    extend: 'Ext.app.Controller',
    views: ['main.component.PnlFilters'],
    model: ['Source'],
    stores: ['Sources'],
    refs: [{
        ref: 'vwSources', 
        selector: 'Panel > container > checkboxgroup[itemId=chkgrpDataSource]'
    }],
    init: function () {
        this.chkSources = [];
        //add listeners to Sources store 
        //admin adds/removes availability of a source
        //
        this.getSource2sStore().addListener('load', this.availSources, this);
        //sources are loaded
        //this.getSourcesStore().addListener('load',this.addSources,this);
        //this.getSourcesStore().tpl.overwrite(this.getPnlSourcesView,this.getSourcesStore); 
        this.control({
            'fieldset > checkboxgroup[itemId=chkgrpProducts] > checkbox': {
                change: this.toggleSource
            },
            'checkbox[itemId=chkProdAll]': {
                change: this.toggleAllProducts
            },
            'checkbox[itemId=chkSrcAll]': {
                change: this.toggleAllSources
            },
            'checkboxgroup[itemId=chkgrpProducts]': {
                beforerender: this.addChkAllProducts
            }
        });
    } //init
    ,
    toggleSource: function (p, d) {
        Ext.Msg.alert('changed product selection(s)...re-execute qry');

    },
    availSources: function (t, rec) {
        var chkboxgroup = {
          xtype : 'checkboxgroup',
          columns: 2,
          name: 'source',
          style: 'padding: 10px;',
          items:[]
        };   
        for (var i=0; i < rec.length; i++) { 
          chkboxgroup.items.push({
               xtype:'checkbox',
               boxLabel:rec[i].boxLabel,
               checked:rec[i].selected
          });
        }
        Ext.ComponentQuery.query('#chkgrpDataSource')[0].add(chkboxgroup)
        
        
    },
    // TODO: fix these..no need to have 2 sep functions here..
    // singleton manager for checkbox groups
    toggleAllProducts: function (b, e) {
        grp = '#chkgrpProducts';
        var arrProducts = Ext.ComponentQuery.query(grp)[0].items.items;
        SearchTool.util.dom.toggleCheckBoxArray(b.value, arrProducts);
    } // toggleAllProducts
    ,
    toggleAllSources: function (b, e) {
        var grp = '#chkgrpDataSource';
        var arrProducts = Ext.ComponentQuery.query(grp)[0].items.items;
        SearchTool.util.dom.toggleCheckBoxArray(b.value, arrProducts);

    } //toggleAllSources
    ,
    //TODO: move to view, fix these..no need to have 2 sep functions here.. in view
    addChkAllProducts: function () {
        var grp = '#chkgrpProducts';
        var allChkbox = Ext.create('Ext.form.field.Checkbox', {
            boxLabel: 'All',
            itemId: 'chkProdAll',
            name: 'chkProdAll',
            checked: true,
            tooltip: 'Prodall tooltip'
        });
        Ext.ComponentQuery.query(grp)[0].items.items.unshift(allChkbox);

    }

});