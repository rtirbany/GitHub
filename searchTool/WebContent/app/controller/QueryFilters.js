Ext.define('SearchTool.controller.QueryFilters', {
    extend: 'Ext.app.Controller',
    views: ['Viewport','SearchTool.view.main.component.FilterMgmt','SearchTool.view.main.ResultsGrid'],
    models: ['FacetGroup','QueryFilter'],
    stores: ['Facets','Sources','Keywords','Results','QueryFilters'], 
    requires: ['SearchTool.util.dom'],
    refs: [{
               ref: 'pnlDataSources',
               selector: 'panel[itemId=pnlSources]'
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
            'panel[itemId=pnlSources] > checkboxgroup > checkbox': {
                change: me.filterToggleProducts
            },
            'panel[itemId=pnlFacets] panel > dataview': {
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
          storeSources.clearData(true);
          if (tmp && tmp.repoDefinitions && tmp.repoDefinitions.length > 0){
             storeSources.loadRawData(tmp.repoDefinitions);
              var t,i,j, chkgroup, chkboxes = [];
              for (i=0;i<storeSources.data.items.length;i++){
                 t = storeSources.data.items[i];
                 chkgroup = Ext.create('Ext.form.CheckboxGroup',{fieldLabel:t.raw.repositoryId, itemId:'chkgroup'+t.raw.repositoryId, layout:'vbox', labelWidth:75, columns:[.8]});
                 for (j=0;j<t.data.productDefinitions.length;j++){
                    var c = t.data.productDefinitions[j],
                        prodBox = {xtype: 'checkbox', name: t.raw.repositoryId+'.'+c.productName, 
                                 boxLabel: c.productName};
                     chkboxes.push(prodBox)
                 }
                 chkgroup.add(chkboxes);
                 chkboxes.length = 0;
                 Ext.ComponentQuery.query('#pnlSources')[0].add(chkgroup);
              }  
          }
    },
    getAllResultsData: function(store, records, opts){
          Ext.ComponentQuery.query('#btnVisualize')[0].setDisabled(store.data.items.length == 0);
          Ext.ComponentQuery.query('#cbPageSize')[0].setDisabled(store.data.items.length == 0);
          var  tmp = store.proxy.reader.jsonData, 
               pnl = Ext.ComponentQuery.query('#pnlFacets')[0],
               storeFacets = Ext.StoreManager.lookup('Facets'),
               newPnl, t,i=0,j;
          pnl.items.items.length = 1;
          pnl.update();
          if (tmp.searchId && searchId.length > 0)
               Ext.ComponentQuery.query('#btnVisualize')[0].id = tmp.searchId
          if (tmp && tmp.coreFacets && tmp.coreFacets.length > 0){
               storeFacets.removeAll(true);
               storeFacets.loadRawData(tmp.coreFacets);
               for (;i<storeFacets.data.items.length;i++){
                   t = storeFacets.data.items[i];
                   storeFacets.filter([{property:'facetName',value:t.data.facetName}]);
                   var newStore = Ext.create('Ext.data.Store',{
                         model: storeFacets.model,
                         data: storeFacets.data.items
                   });
                   storeFacets.clearFilter(true);
                   newPnl = Ext.create('Ext.panel.Panel',{
                    width:'100%',
                    title:t.data.facetName,
                    items:[
                         {    
                              xtype:'dataview',
                              tpl: SearchTool.util.TplFilter.loaderXTemplateRenderer,
                              trackOver: true,
                              overItemCls: 'facetitem-over',
                              store: 'newStore',
                              itemSelector: 'div.facet'
                         } 
                    ] 
                   }
                   );
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
                var params = form.getValues(), t = null,
                    filtersStore = this.getQueryFiltersStore(),i = 0,
                    arrFilters,
                    arrParams = [
                         {type:'searchkeyword',key:'keywordString',value:params.keywordString.trim()},
                         {type:'searchboolean',key:'booleanString',value:params.txtSearchBoolean.trim()},
                         //{type:'datefield',key:'datefield',value:params.datefield},
                         {type:'startdate',key:'startdate',value:params.startDate},
                         {type:'enddate',key:'enddate',value:params.endDate}
                    ];
                  //find if there's an existing filter of this type; if so, get the index location (even if empty param still need idx to remove)
                  //if the param entry exists (value.trim().length > 0), create model object
                  //if idx found, replace exixting filter obj, else push
                  //if no param entry (value.trim().length == 0), remove filter obj from array
                arrFilters = filtersStore.query('type','source').items.concat(filtersStore.query('type','facet').items); //need to preserve these
           
                for (;i<arrParams.length;i++){
                    t = arrParams[i];
                    //idx = Ext.Array.indexOf(Ext.Array.pluck(Ext.Array.pluck(filtersStore.data.items,'data'),'type'),t.type);
                    //filtersStore.removeAt(idx);  //if it exists remove it, else nothing; preserves others
                    if (t.value.length >0) {  //if value
                        arrFilters.push(Ext.create('SearchTool.model.QueryFilter',{type:t.type,key:t.key,operator:'eq',tip:t.value,value:t.value}));  
                    } 
                }
                filtersStore.removeAll(true);
                filtersStore.add(arrFilters);
                Ext.ComponentQuery.query('#dvResultsParams')[0].refresh();
                form.up('tabpanel').el.unmask();
        } //if
    },
    
    facetSelect: function() { //t, r, item, index, e){ 
          var  pnl = Ext.ComponentQuery.query('pnlFilters')[0],
               key= e.target.parentElement.getAttribute("id"),
               val = e.target.getAttribute("id"),
               f = Ext.create('SearchTool.model.QueryFilter',{
                    type:'facet',key:key, operator: 'eq', value:val,tip:val
               });
          pnl.el.mask('Updating filters...','x-mask-loading');
               
          this.getQueryFiltersStore().insert(0,f);
               this.getDvParams().refresh();
               this.getDvFilters().refresh(); 
          pnl.el.unmask();
    },
    
    updateResultsGrid: function(store, eOpts){ 
          Ext.ComponentQuery.query('#btnSaveQuery')[0].setDisabled(store.data.items.length == 0);
          var  arr = [], i = 0, iLen=store.data.items.length,t=null,
               pnl = Ext.ComponentQuery.query('pnlFilters')[0],
               storeResults = Ext.ComponentQuery.query('resultsgrid')[0].store;
          pnl.el.mask('Updating filters...','x-mask-loading');
          storeResults.clearFilter(true);
          
          for (; i<iLen; i++){
             t = store.data.items[i];
             t = {filter:t.data.key,operator:t.data.operator,value:t.data.value};
             arr.push(t);
          }
          storeResults.filter(Ext.JSON.encode(arr));
          pnl.el.unmask();
    },
    
    filterToggleProducts: function (c,e) {
        var //key='Use product', //reqd for insert and removal b/c removal requires search on very same key
            m = Ext.create('SearchTool.model.QueryFilter',{
               type:'source',id:c.id, key:"Repo", operator:'eq', value:c.name,
               tip:c.name.substring(c.name.indexOf('.')+1)
            }),
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
           var z = '[name='+ r.data.value + ']';
              this.getPnlDataSources().down(z).setValue(false);
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
                case 'searchkeyword': if ( this.getTxtKeyword().rawValue.trim() == z.slice(z.indexOf('=')+2)) this.getTxtKeyword().reset();break;
                case 'searchboolean': if ( this.getTxtBoolean().rawValue.trim() == z.slice(z.indexOf('=')+2)) this.getTxtBoolean().reset();break;
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
               arrNew, i =0 , pnl = Ext.ComponentQuery.query('pnlFilters')[0];
           if (btn == 'yes') {
               pnl.el.mask('Updating filters...','x-mask-loading');
               arrNew = Ext.Array.difference(arr.data.items,arr.query('type','source').items.concat(arr.query('type','facet').items));
               arr.removeAll();
               arr.add(arrNew);               
           }
           arr = Ext.ComponentQuery.query('#pnlSources')[0].items.items;
           for (;i< arr.length; i++){
               arr[i].suspendEvents(false);
               arr[i].setValue(false);
               arr[i].resumeEvents();
           }
           Ext.ComponentQuery.query('#dvFacetSelections')[0].refresh();
           pnl.el.unmask();
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