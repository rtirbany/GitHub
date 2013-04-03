
Ext.define('SearchTool.controller.QueryFilters', {
    extend: 'Ext.app.Controller',
    models: ['FacetGroup','QueryFilter'],
    views: ['Viewport','SearchTool.view.main.component.FilterMgmt','SearchTool.view.main.component.PnlFilters','SearchTool.view.main.ResultsGrid'],
    stores: ['Facets','Sources','Keywords','Results','QueryFilters'], 
    requires: ['SearchTool.util.dom'],
    refs: [{
               ref: 'pnlSources',
               selector: 'checkboxgroup[itemId=chkgrpProducts]'
          },{
               ref: 'gridResults',
               selector: 'resultsgrid'
          },{
               ref: 'dvFilters',
               selector: 'dataview[itemId=dvFacetSelections]'
          },{
               ref: 'dvParams',
               selector: 'dataview[itemId=dvResultsParams]'
          },{
               ref: 'txtKeyword',
               selector: 'combo[itemId=cboxSearch]'
          },{
               ref: 'txtBoolean',
               selector: 'textarea[itemId=txtSearchBoolean]'
          }
    ],
    init: function () {
        var me = this;
        me.getQueryFiltersStore().on(
          {
               datachanged: me.updateResultsGrid
          }
        );
        me.control({ 
            'button[itemId=btnSearch]': {
                click: me.searchHandler
            },
            'panel > checkboxgroup[itemId=chkgrpProducts] > checkbox': {
                change: me.filterToggleProducts
            },
            'dataview[itemId=dvFacetSelections]': {
                itemclick: me.filterRemoveSingle
            },
            'dataview[itemId=dvResultsParams]': {
                itemclick: me.filterRemoveSearchParam
            },
            'dataview[itemId=dvFacets]': {
                itemclick: me.facetSelect
            },
            'button[itemId=btnRemoveAll]': {
                click: me.filterRemoveAll
            },
            'button[itemId=btnRelaxAll]': {
               click: me.filterRelaxAll
            }
        }); //control function
    },
    searchHandler: function (btn, e) {
        var form = btn.up('form');
        if (form.getForm().isValid()) {
                var params = form.getValues(),
                k = '',// + valKeyword + ';bool=' + valBool + ';'; 
                t = '',
                idx = -1,
                m = null; 
                form.up('tabpanel').el.mask(SearchTool.config.Config.msgQuery, 'x-mask-loading'); 
                var filters = this.getQueryFiltersStore(),i,
                    arrParams = [{type:'searchkeyword',key:'keywordString',value:params.keywordString.trim()},
                         {type:'searchboolean',key:'booleanString',value:params.txtSearchBoolean.trim()},
                         {type:'startdate',key:'startdate',value:params.startDate},
                         {type:'enddate',key:'enddate',value:params.endDate}
                    ];
                for (i=0;i<arrParams.length;i++){
                    t = arrParams[i];
                    idx = Ext.Array.indexOf(Ext.Array.pluck(Ext.Array.pluck(filters.data.items,'data'),'type'),t.type);
                    if (t.value.length >0) {
                        m = Ext.create('SearchTool.model.QueryFilter',{type:t.type,key:t.key,tip:t.value,value:t.value}); 
                        idx > -1 ? Ext.Array.splice(filters.data.items,idx,1,m) : filters.add(m);//replace if it exists, otherwise add 
                    }
                    else {
                         filters.removeAt(idx);
                    }
                }
                Ext.ComponentQuery.query('#dvResultsParams')[0].refresh();
                form.up('tabpanel').el.unmask();
                //                              form.getForm().submit({
                //                                   method: 'POST',
                //                                   url: 'someurl',
                //                                   success: onQuerySuccess,
                //                                   failure: onQueryFailure
                //                              });

                //                              Ext.Ajax.request({
                //                                   url:SearchTool.config.Config.sources,
                //                                   jsonData : Ext.JSON.encode(params),
                //                                   success: function(resp,opts){  
                //                                        
                //                                   },
                //                                   failure: function(resp,opts){//: 'Communication error (Query Service)', 
                //                                        Ext.Msg.alert(SearchTool.config.Config.msgErrorQueryTitle,SearchTool.config.Config.msgErrorQueryText+'\r\n'+
                //                                        resp.statusText);
                //                                   },
                //                                   callback: function(o,s,r){
                //                                        form.up('viewport').el.unmask();
                //                                        Ext.Msg.alert('Title',r.responseText);
                //                                   }
                //                               });
        } //if
    },
    
    updateResultsGrid: function(store, eOpts){ 
//          debugger;
          console.log('QF datachange fired - updateresultsgrid called');
          var  arr = [], kw = null, bool =null, extraParams = {}, i,iLen=store.data.items.length,t,
               pnl = Ext.ComponentQuery.query('pnlFilters')[0],
               storeResults = Ext.ComponentQuery.query('resultsgrid')[0].store;
          storeResults.clearFilter(true);
          pnl.el.mask('Updating filters...','x-mask-loading');
          for (i=0; i<iLen; i++){
             t = store.data.items[i];
             arr.push({filter:t.data.key,value:t.data.value});
          }
          storeResults.filter(Ext.JSON.encode(arr));
               extraParams.facets = Ext.JSON.encode(['hi','there']);
//          extraParams = { keywordString:kw,
//                         booleanString:bool};
          storeResults.load({
               params: extraParams});
          //storeResults.filters.add("filters",Ext.JSON.encode(arr)); 
         
//               switch (keyval.data.type) {
//                    case 'facet' :      arrFilters.push({filter:keyval.data.key,operator:keyval.data.operator, value:keyval.data.value}); break;
////                    case 'searchkeyword' : kw =  Ext.JSON.encode({filter:keyval.data.key,value:keyval.data.value}); break;
//                    case 'searchkeyword' :  kw =  {filter:keyval.data.key,value:keyval.data.value}; break;
//                   
//                   
//                    case 'searchboolean' : bool = {filter:keyval.data.key,value:keyval.data.value};
//               }
//          });
//          storeResults.filter(Ext.JSON.encode(arrFilters));
          //method1
//          storeResults.addFilter(new Ext.util.Filter({property:"facets",value:Ext.JSON.encode(['hi','there'])}))
//          storeResults.load();
          //method2
          //TODO: bad..check for nulls/DNE 
           
          pnl.el.unmask();
    },
    
    filterToggleProducts: function (c,e) {
        var key='Use product', //reqd for insert and removal b/c removal requires search on very same key
            m = Ext.create('SearchTool.model.QueryFilter',{type:'source',key:key,value:c.itemId,tip:c.itemId}),
            arr = [];
        if (e) {
          arr.push(m);
          //type for sources always on top (type = 'source','facet'), 
          //in desc order of selection (top=most recent)
          //and insert of previous addl sources was always at position 0 (first)
          //rest of facets (type='facet' will appear below
          //sort & insert both fire datachange event from store
          this.getQueryFiltersStore().sort({property:'type',direction:'DESC'});
          this.getQueryFiltersStore().insert(0,arr);
        }
        else {
          var idx = this.getQueryFiltersStore().indexOf(m);
          if (idx > -1) {
             this.getQueryFiltersStore().removeAt(idx);
             }
        }
        this.getDvParams().refresh();
        this.getDvFilters().refresh();
    },
    
    facetSelect: function(t, r, item, index, e){
        Ext.Msg.alert('facet chosen');
    },
    
    filterRemoveSingle: function (t, r, item, index, e) { 
        //fires datachange event 
        t.store.removeAt(index); 
        //unchecks checkbox in pnlSources
        if (r.data.type == 'source') {
           var idx = this.getPnlSources().items.indexOfKey(r.data.value);
              this.getPnlSources().items.get(idx).setValue(false);
        }
        this.getDvParams().refresh();
        this.getDvFilters().refresh();
    },
     filterRemoveSearchParam: function (t, r, item, index, e) { 
        //fires datachange event 
        var idx = Ext.Array.pluck(Ext.Array.pluck(this.getQueryFiltersStore().data.items,'data'),'type').indexOf(item.name)
        t.store.removeAt(idx);
        if (item.nextElementSibling && item.nextElementSibling.innerText) {
        var z = item.nextElementSibling.innerText
        switch (item.name){
            case 'searchkeyword': if (item.nextElementSibling != null && this.getTxtKeyword().rawValue.trim() == z.slice(z.indexOf('=')+2)) this.getTxtKeyword().reset();break;
            case 'searchboolean': if (item.nextElementSibling != null && this.getTxtBoolean().rawValue.trim() == z.slice(z.indexOf('=')+2)) this.getTxtBoolean().reset();break;
        } 
        }
        
        this.getDvFilters().refresh();
        this.getDvParams().refresh();
//        fires too many events
//        t.store.filter('type',item.name);
//        t.store.removeAt(0); //only 1 item of each type of search param
//        t.store.clearFilter();
    },
    filterRemoveAll: function (b, e) { 
        Ext.Msg.confirm('Confirm - Remove all filters','Are you sure you want to remove all filters?', function(btn){
           console.log(btn);                             
        }); 
    },
    
    filterRelaxAll: function (b, e) { 
        Ext.Msg.confirm('Confirm - Remove all filters','Are you sure you want to relax all filters?', function(btn){
           console.log(btn);   
           if (b.pressed)
           {//facetgroup class to table
           }
        }); 
    }

});