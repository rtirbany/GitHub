
Ext.define('SearchTool.controller.Facets', {
    extend: 'Ext.app.Controller',
    views: ['Viewport','SearchTool.view.main.component.FilterMgmt'],
    models: ['FacetSelection'],
    stores: ['Sources','Results','FacetSelections'],
    requires: ['SearchTool.util.dom'],
    refs: [{
        ref: 'pnlSources',
        selector: 'checkboxgroup[itemId=chkgrpProducts]'
    },{
        ref: 'gridResults',
        selector: 'resultsgrid'
    },{
        ref: 'dvFacets',
        selector: 'dataview[itemId=dvFacetSelections]'
    }],
    init: function () {
        var me = this;
        me.control({ 
            'panel > checkboxgroup[itemId=chkgrpProducts] > checkbox': {
                change: me.filterToggleSource
            },
            'dataview[itemId=dvFacetSelections]': {
                itemclick: me.filterRemove
            },
            'button[itemId=btnLogout]': {
                click: me.btnLogoutHandler
            }
        }); //control function
    },
    filterToggleSource: function (c,e) {
        var key='Using src'; //reqd for insert and removal
        
        //0 so all sources appear at top, id > 0 in rest of store
        var m = Ext.create('SearchTool.model.FacetSelection',{id:0,key:key,value:c.itemId,tip:c.itemId}),
            arr = [];
        if (e) {
          arr.push(m);
          this.getFacetSelectionsStore().insert(0,arr); //can insert anywhere
          //ids of 0 (sources) always on top, rest of facets will appear below
          this.getFacetSelectionsStore().sort({property:'id',direction:'ASC'},{property:'value',direction:'ASC'});
        }
        else {
          var idx = this.getFacetSelectionsStore().indexOf(m);
          if (idx > -1)
             this.getFacetSelectionsStore().removeAt(idx);
        }
        t.store.fireEvent('datachanged','removed'); //? needed?
        this.getDvFacets().refresh();
        
        
    },
    filterRemove: function (t, r, item, index, e, eOpts) { 
        t.store.data.removeAt(index, 1); 
        var idx = this.getPnlSources().items.indexOfKey(r.data.value);
        if (idx > -1)
           this.getPnlSources().items.get(idx).setValue(false);
        t.store.fireEvent('datachanged','removed');
        this.getDvFacets().refresh();
    },
    btnLogoutHandler: function (b, e) {
        Ext.Msg.confirm('Confirm Logout', 'Do you wish to log out of the system?');
    }

});