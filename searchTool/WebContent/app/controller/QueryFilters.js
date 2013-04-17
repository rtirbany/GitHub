Ext.define('SearchTool.controller.QueryFilters', {
    extend: 'Ext.app.Controller',
    models: ['FacetGroup','QueryFilter'],
    views: ['Viewport','SearchTool.view.main.component.FilterMgmt','SearchTool.view.main.ResultsGrid'],
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
        
        me.getResultsStore().on(
          {    
               load: me.getAllResultsData     
          }
        );
        
        me.getSourcesStore().on(
          {    
               load: me.getSourcesData     
          }
        ); 
        me.control({ 
            'button[itemId=btnSearch]': {
                click: me.searchHandler
            },
            'button[itemId=btnSaveQuery]': {
                click: me.querySaveHandler
            },
            'panel > checkboxgroup[itemId=chkgrpProducts] > checkbox': {
                change: me.filterToggleProducts
            },
            'dataview[itemId=dvFacets]': {
                itemclick: me.facetSelect
            },
            'dataview[itemId=dvFacetSelections]': {
                itemclick: me.filterRemoveSingle
            },
            'dataview[itemId=dvResultsParams]': {
                itemclick: me.filterRemoveSearchParam
            },
            'button[itemId=btnRemoveAll]': {
                click: me.filterRemoveAll
            },
            'button[itemId=btnRelaxAll]': {
               click: me.filterRelaxAll
            }
        }); //control function
    }, 
    
    getSourcesData: function (store,records, opts){
          var  tmp = store.proxy.reader.jsonData, 
          storeSources = Ext.StoreManager.lookup('Sources');
          storeSources.clearData();
          if (tmp && tmp.repoDefinitions && tmp.repoDefinitions.length > 0){
             storeSources.loadRawData(tmp.repoDefinitions);
              var //chkProducts = {xtype: 'checkbox', name: 'Products'},
                  t,i,j, chkboxes = [];
              for (i=0;i<storeSources.data.items.length;i++){
                 t = storeSources.data.items[i];
                 for (j=0;j<t.data.productDefinitions.length;j++){
                    var prodBox = {xtype: 'checkbox', name: 'prod',
                                 boxLabel: j.productName //, inputValue: record.get('id')
                                 };
                     chkboxes.push(prodBox)
                 } 
              }
              Ext.ComponentQuery.query('chkgrpProducts')[0].add(chkgrpProducts);
                  //prodBox.checked = true;
              
          } 

          
    },
    getAllResultsData: function(store, records, opts){
          Ext.ComponentQuery.query('#btnVisualize')[0].setDisabled(store.data.items.length == 0); 
          var  tmp = store.proxy.reader.jsonData, 
               pnl = Ext.ComponentQuery.query('#pnlFacets')[0],
               storeFacets = Ext.StoreManager.lookup('Facets'),
               t,i,j; 
          storeFacets.clearData();
          if (tmp && tmp.coreFacets && tmp.coreFacets.length > 0){
               storeFacets.loadRawData(tmp.coreFacets);
               for (i=0;i<storeFacets.data.items.length;i++){
                   t = storeFacets.data.items[i];
                   var newPnl = Ext.create('Ext.Panel',{width:'100%',title:t.data.facetName});
                   /*
                    * xtype: 'dataview',
//                    itemId: 'dvFacets',
//                    store: 'Facets',
//                    tpl: SearchTool.util.TplFilter.loaderXTemplateRenderer, 
//                    itemSelector: 'div.facet', //'div.facet_item', //tr
//                    emptyText: '(no filters available)'  
 * 
                    * */
                   for (j=0;j<t.data.facetEntries.length;j++){
                         var fvalue = t.data.facetEntries[j];
                         newPnl.add({xtype:'displayfield',value:fvalue.value+' ('+fvalue.count+')'}); 
//                   var newItems = Ext.create('Ext.dataview',{
//                              store:t.data.facetEntries,
//                              itemSelector: 'div.facet',
//                              tpl: SearchTool.util.TplFilter.loaderXTemplateRenderer
//                   });
//                   debugger;
//                   newPnl.add(newItems);
//                         newPnl.add({
//                              xtype:'dataview',
//                              store:t.data.facetEntries,
//                              itemSelector: 'div.facet',
//                              tpl: SearchTool.util.TplFilter.loaderXTemplateRenderer}
//                         );
                   } 
                   pnl.add(newPnl);
               }
          }
          if (tmp && tmp.cols && tmp.cols.length > 0){
          	   //new - cols come back in resultset
          	   for (i=0;i<tmp.cols.length;i++){
          	   		tmp.cols[i].width *= SearchTool.config.Config.defaultColMultiplier;
          	   }
          	   Ext.ComponentQuery.query('resultsgrid')[0].reconfigure(null,tmp.cols);
          	   	
               //old way - Ext.StoreManager.lookup('resultsgrid').loadRawData(tmp.cols);
          }
          Ext.ComponentQuery.query('#dvResultsParams')[0].refresh();
          Ext.ComponentQuery.query('#dvFacetSelections')[0].refresh();
//          Ext.ComponentQuery.query('#dvFacets')[0].refresh();
    },
    
    querySaveHandler: function(btn, e){
          debugger;
    },
    
    searchHandler: function (btn, e) {
        var form = btn.up('form');
        //debugger;
        if (form.getForm().isValid()) {
                form.up('tabpanel').el.mask(SearchTool.config.Config.msgQuery, 'x-mask-loading'); 
                var params = form.getValues(),
                k = '',// + valKeyword + ';bool=' + valBool + ';'; 
                t = null,
                idx = -1,  
                filtersStore = this.getQueryFiltersStore(),i=0,
                    arrFilters = [],
                    arrParams = [
                         {type:'searchkeyword',key:'keywordString',value:params.keywordString.trim()},
                         {type:'searchboolean',key:'booleanString',value:params.txtSearchBoolean.trim()},
                         {type:'startdate',key:'startdate',value:params.startDate},
                         {type:'enddate',key:'enddate',value:params.endDate}
                    ];
                  //find if there's an existing filter of this type; if so, get the index location (even if empty param still need idx to remove)
                  //if the param entry exists (value.trim().length > 0), create model object
                  //if idx found, replace exixting filter obj, else push
                  //if no param entry (value.trim().length == 0), remove filter obj from array
                arrFilters = filtersStore.query('type','source').items.concat(filtersStore.query('type','facet').items);
                for (i=0;i<arrParams.length;i++){
                    t = arrParams[i];
                    //idx = Ext.Array.indexOf(Ext.Array.pluck(Ext.Array.pluck(filtersStore.data.items,'data'),'type'),t.type);
                    //filtersStore.removeAt(idx);  //if it exists remove it, else nothing; preserves others
                    if (t.value.length >0) {  //if value
                        arrFilters.push(Ext.create('SearchTool.model.QueryFilter',{type:t.type,key:t.key,operator:'eq',tip:t.value,value:t.value}));  
                    } 
                }
                filtersStore.removeAll(true);
                filtersStore.add(arrFilters);
                 //*********** BAD ***********
                //remove all filters - DO NOT WANT ALL TO BE WIPED OURT - Facets + sources lost
//                filtersStore.clearFilter(true);
//                
//                for (i=0;i<arrParams.length;i++){
//                    t = arrParams[i];
//                    if (t.value.length >0) {
//                        //create model object
//                        m = Ext.create('SearchTool.model.QueryFilter',{type:t.type,key:t.key,operator:'=',tip:t.value,value:t.value}); 
//                        //if idx was found, replace existing filter object w/ new model; else append (re-fires store load each time)
//                        arrFilters.push(m);//replace if it exists, otherwise add 
//                    } 
//                }
//                debugger;
//                //filters.filter(arrFilters);
//                filtersStore.filters.add(arrFilters);
                
                
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
    
    facetSelect: function(t, r, item, index, e){
        var pnl = Ext.ComponentQuery.query('pnlFilters')[0];
        if (e.target.getAttribute("name") == "facetitem") { 
               pnl.el.mask('Updating filters...','x-mask-loading');
               var key= e.target.parentElement.getAttribute("name"),
                   val = e.target.innerHTML.substring(0,e.target.innerHTML.indexOf('&nbsp;&nbsp;')),
                   f = Ext.create('SearchTool.model.QueryFilter',{type:'facet',key:key, operator: 'eq', value:val,tip:val});
               this.getQueryFiltersStore().insert(0,f);
               this.getDvParams().refresh();
               this.getDvFilters().refresh();
        }
        pnl.el.unmask();
    },
    
    updateResultsGrid: function(store, eOpts){ 
          Ext.ComponentQuery.query('#btnSaveQuery')[0].setDisabled(store.data.items.length == 0);
          var  arr = [], xtraParams = {}, i,iLen=store.data.items.length,t=null,
               pnl = Ext.ComponentQuery.query('pnlFilters')[0],
               storeResults = Ext.ComponentQuery.query('resultsgrid')[0].store;
          pnl.el.mask('Updating filters...','x-mask-loading');
          storeResults.clearFilter(true);
          for (i=0; i<iLen; i++){
             t = store.data.items[i];
             t = {filter:t.data.key,operator:t.data.operator,value:t.data.value};
             arr.push(t);
          }
          storeResults.filter(Ext.JSON.encode(arr));
//               extraParams.facets = Ext.JSON.encode(['hi','there']);
//          or do  extraParams = { keywordString:kw,
//                         booleanString:bool};
//          storeResults.load({
//               params: extraParams});
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
            m = Ext.create('SearchTool.model.QueryFilter',{type:'source',key:key,operator:'eq',value:c.itemId,tip:c.itemId}),
            pnl = Ext.ComponentQuery.query('pnlFilters')[0],
            arr = [];
        pnl.el.mask('Updating filters....','x-mask-loading');
        if (e) {
          arr.push(m);
          //type for sources always on top (type = 'source','facet'), 
          //in desc order of selection (top=most recent)
          //and insert of previous addl sources was always at position 0 (first)
          //rest of facets (type='facet' will appear below
          //sort & insert both fire datachange event from store
          //this.getQueryFiltersStore().sort({property:'type',direction:'DESC'});
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
        pnl.el.unmask();
    },
    
    
    filterRemoveSingle: function (t, r, item, index, e) { 
        //fires datachange event 
        var pnl = Ext.ComponentQuery.query('pnlFilters')[0];
        pnl.el.mask('Updating filters....','x-mask-loading');
        t.store.removeAt(index); 
        //unchecks checkbox in pnlSources
        if (r.data.type == 'source') {
           var idx = this.getPnlSources().items.indexOfKey(r.data.value);
              this.getPnlSources().items.get(idx).setValue(false);
        }
        this.getDvParams().refresh();
        this.getDvFilters().refresh();
        pnl.el.unmask();
    },
     filterRemoveSearchParam: function (t, r, item, index, e) { 
        //fires datachange event 
        
        var idx = Ext.Array.pluck(Ext.Array.pluck(this.getQueryFiltersStore().data.items,'data'),'type').indexOf(item.name),
            pnl = Ext.ComponentQuery.query('pnlFilters')[0];
        pnl.el.mask('Updating filters....','x-mask-loading');
        t.store.removeAt(idx);
        if (item.nextElementSibling && item.nextElementSibling.innerText) {
        var z = item.nextElementSibling.innerText;
        switch (item.name){
            case 'searchkeyword': if (item.nextElementSibling != null && this.getTxtKeyword().rawValue.trim() == z.slice(z.indexOf('=')+2)) this.getTxtKeyword().reset();break;
            case 'searchboolean': if (item.nextElementSibling != null && this.getTxtBoolean().rawValue.trim() == z.slice(z.indexOf('=')+2)) this.getTxtBoolean().reset();break;
        } 
        }
        
        this.getDvFilters().refresh();
        this.getDvParams().refresh();
        pnl.el.unmask();
//        fires too many events
//        t.store.filter('type',item.name);
//        t.store.removeAt(0); //only 1 item of each type of search param
//        t.store.clearFilter();
    },
    filterRemoveAll: function (b, e) { 
        Ext.Msg.confirm('Confirm - Remove all filters','Are you sure you want to remove all filters?', function(btn){
           var arr = Ext.StoreManager.lookup('QueryFilters'),
               arrNew, i, pnl = Ext.ComponentQuery.query('pnlFilters')[0];
           if (btn == 'yes') {
               pnl.el.mask('Updating filters...','x-mask-loading');
               arrNew = Ext.Array.difference(arr.data.items,arr.query('type','source').items.concat(arr.query('type','facet').items));
               arr.removeAll();
               arr.add(arrNew);               
           }
           this.getQueryFiltersStore().removeAll();   
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