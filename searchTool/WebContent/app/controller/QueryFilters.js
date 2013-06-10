Ext.define('SearchTool.controller.QueryFilters', {
    extend: 'Ext.app.Controller',
    views: ['Viewport','SearchTool.view.main.component.FilterMgmt','SearchTool.view.main.ResultsGrid'],
    models: ['FacetGroup','QueryFilter'],
    stores: ['Facets','Sources','Keywords','Results','QueryFilters','UniversalSearchFields'], 
    requires: ['SearchTool.util.dom','SearchTool.view.main.component.PnlGroup'],
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
            },
            'container[itemId=tbSaved] button': {
               click: me.queryRunHandler
            }
        }); //control function
    }, 
    
    //TODO: check this..new source model
    //this.data.items[x].data to gete to (1) repo;
    //this.getAt(0).products().getAt(0).get('productName')
    getSourcesData: function (store,records, opts){
          var  tmp = store.proxy.reader.jsonData,
               pnl = Ext.ComponentQuery.query('#pnlSources')[0];
          this.clearData(true);
          if (tmp && tmp.repoDefinitions && tmp.repoDefinitions.length > 0){
             this.loadRawData(tmp.repoDefinitions);
              var t,i,j, chkgroup, chkboxes = [];
              for (i=0;i<this.data.items.length;i++){
                 t = this.data.items[i];
                 chkgroup = Ext.create('Ext.form.CheckboxGroup',{fieldLabel:t.data.repositoryId, itemId:'chkgrp'+t.data.repositoryId, layout:'vbox', labelWidth:75, columns:[.8]});
                 for (j = 0;j < this.getAt(0).products().data.items.length; j++){
                    var c = this.getAt(0).products().getAt(j).get('productName'),
                        prodBox = {xtype: 'checkbox', name: t.data.repositoryId+'.'+c, boxLabel: c};
                     chkboxes.push(prodBox)
                 }
                 chkgroup.add(chkboxes);
                 chkboxes.length = 0;
                 pnl.add(chkgroup);
              }  
          }
          else {
               pnl.removeAll();
               pnl.add({xtype:'component',html:'No Sources available at this time'});
          }
    },
    getAllResultsData: function(store, records, opts){
          Ext.ComponentQuery.query('#btnVisualize')[0].setDisabled(store.data.items.length == 0);
          Ext.ComponentQuery.query('#cbPageSize')[0].setDisabled(store.data.items.length == 0);
          var  storeFilters = Ext.StoreManager.lookup('QueryFilters'),
          	   btnSearch = Ext.ComponentQuery.query('#btnSearch')[0],
          	   btnExport = Ext.ComponentQuery.query('#btnExport')[0],
               btnCsv = Ext.ComponentQuery.query('#btnExportCsv')[0],
               btnExcel = Ext.ComponentQuery.query('#btnExportExcel')[0],
               btnExcel2007 = Ext.ComponentQuery.query('#btnExportExcel2007')[0],
               btnPdf = Ext.ComponentQuery.query('#btnExportPdf')[0],
               
               tmp = store.proxy.reader.jsonData, 
               pnl = Ext.ComponentQuery.query('#pnlFacets')[0],
               storeFacets = Ext.StoreManager.lookup('Facets'),
               newPnl, t,i=0,j;
          pnl.items.items.length = 1;
          pnl.border = false;
          pnl.update();
          if (tmp && tmp.searchId && tmp.searchId.length > 0) {
               btnExport.enable();
               btnSearch.id = tmp.searchId;
               //TODO: 6/10 change hrefs of each button to add tmpsearchID 
               //btnCsv.href = Ext.String.format(SearchTool.config.Configur.urlExportBase, SearchTool.config.Config.urlExportTokenCsv, tmp.searchID); //only works on first and prior to render or ? so below ifs are needed
               //if (btnCsv.el)
               //     btnCsv.el.dom.children[0].href ...
          }
          else {
          	btnExport.disable();
          	btnCsv.href= '';
          	btnExcel.href = '';
          	btnExcel2007.href = '';
          	btnPdf.href = '';
          	//TODO: 6/10 set hrefs to '' ..
          	//if (btnScv.el) btnCsv.el.dom.children[0].href = '';
          	
          }
          if (tmp && tmp.searchFilters && storeFilters.find('key','savedSearchId') > -1) { 
                    arrFilters = [],
                    arrProd = Ext.ComponentQuery.query('#pnlSources')[0].items.items;
               var idx = storeFilters.find('type','savedSearch');
               if (idx > -1) {
               		idx = storeFilters.getAt(idx);
               		//arrFilters.push(Ext.create('SearchTool.model.QueryFilter',{type:'searchId',key:'searchId',operator:'eq',value:tmp.searchId}));
               }
               storeFilters.removeAll(true);
               for (;i<searchFilters.length;i++) {
                    t = tmp.searchFilters[i];
                    j = Ext.create('SearchTool.model.QueryFilter',{type:'',key: t.filter, operator: 'eq', tip: t.value, value: t.value});
                    switch (t.filter) {
                         case 'repo' : 
                         		j.data.type= 'source'; 
                         		j.data.key = 'Repo'; 
                         		var cboxgrp = Ext.ComponentQuery.query('#pnlSources > checkboxgroup')[0],
                         		    key = '[name='+j.data.value+']';
                         		var cbox = cboxgrp.down(key);
                         		cbox.suspendEvents(false);
                         		cbox.setValue(true);
                         		cbox.resumeEvents();
                         		cbox.checked = true;
                         		cbox.addCls('x-form-cb-checked'); //x-form dirty
                         		//cbox.on('change,'SearchTool.controller.QueryFilters.filterToggleProducts(cbox));
                         		break;
                         case 'keywordString' : j.data.type= 'searchkeyword'; 
                                                Ext.ComponentQuery.query('#cboxSearch')[0].setValue(t.value); 
                                                break;
                         case 'booleanString' : j.data.type= 'searchboolean'; 
                                                Ext.ComponentQuery.query('#txtSearchBoolean')[0].setValue(t.value); 
                                                break;
                         case 'startdate':      j.data.type = 'startdate'; 
                                                Ext.ComponentQuery.query('#dtUserSearchFrom').setValue(t.value); 
                                                break;
                         case 'enddate':        j.data.type = 'enddate'; Ext.ComponentQuery.query('#dtUserSearchTo').setValue(t.value); break;
                         default:               j.data.type = 'facet';
                    } 
               arrFilters.push(j);
               }//for
               storeFilters.add(arrFilters);
               i=0;t=null;j=null;
          }
          else {
          	debugger;
          	if (storeFilters.find('key','searchId') > -1) {
          		storeFilters.removeAt(storeFilters.find('key','searchId'));
          		//btnSearch.name = '';
          	}
          }
          if (tmp && tmp.coreFacets && tmp.coreFacets.length > 0){
               storeFacets.removeAll(true); 
               storeFacets.loadRawData(tmp.coreFacets);
//               for (;i<storeFacets.data.items.length;i++){
//                   t = storeFacets.data.items[i];
//                   storeFacets.filter({property:'facetName',value:t.data.facetName});
//                   var newStore = Ext.create('Ext.data.Store',{
//                         model: storeFacets.model,
//                         data: storeFacets.data.items
//                   });
//                   storeFacets.clearFilter(true);
//                   newPnl = Ext.create('Ext.panel.Panel',{
//                    width:'100%',
//                    title:t.data.facetName,
//                    items:[
//                         {    
//                              xtype:'dataview',
//                              tpl: SearchTool.util.TplFilter.loaderXTemplateRenderer,
//                              trackOver: true,
//                              overItemCls: 'facetitem-over',
//                              store: newStore,
//                              itemSelector: 'div.facet'
//                         } 
//                    ] 
//                   }
//                   );
//                pnl.add(newPnl);
//               }
               var pnlGroup = Ext.create('SearchTool.view.main.component.PnlGroup'); 
               pnl.add(pnlGroup);
               
          }
          else {
               pnl.add(Ext.create('Ext.panel.Panel',{width:'100%',border: false, title: 'No Filters Available', items: [
                    {xtype:'component', html:'Filters are not available at this time'}]}));
               
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
    },
    
    querySaveHandler: function(btn, e){
          Ext.create('SearchTool.view.main.component.WinSave',{title:'Save Query'}).show();
    },
    queryRunHandler: function (btn, e){
          var i= 0, arrSaved = btn.up('container').items.items,
	          arr = Ext.ComponentQuery.query('#pnlSources')[0].items.items;
          this.getQueryFiltersStore().removeAll(true);
          this.getDvParams().refresh();
          this.getDvFilters().refresh();
          
          for (;i< arrSaved.length; i++){
               arrSaved[i].toggle(false);
          }
          arrSaved = null;
          btn.toggle(true);
          Ext.ComponentQuery.query('#btnSaved')[0].name = btn.id;
          Ext.ComponentQuery.query('searchArea')[0].getForm().reset();
          i=0;
          for (; i< arr.length; i++) {
               arr[i].suspendEvents(false);
               arr[i].setValue(false);
               arr[i].resumeEvents();
          }
          
          arrFilters.push(Ext.create('SearchTool.model.QueryFilter',{type: 'savedSearch', key: 'savedSearchId', operator: 'eq', value: btn.id}));
          this.getQueryFiltersStore().add(arrfilters);
          
          i = Ext.ComponentQuery.query('#btnCustomDate')[0]; 
          i.el.dom.click(); 
          
          arr = null;
          arrFilters = null;
    },
    searchHandler: function (btn, e) {
        var form = btn.up('form'), params = form.getValues(), t = null,
                    filtersStore = this.getQueryFiltersStore(), i = 0,
                    arrFilters, arrParams = [
                         {type:'searchkeyword',key:'keywordString',value:params.keywordString.trim()},
                         {type:'searchboolean',key:'booleanString',value:params.txtSearchBoolean.trim()},
                         {type:'datefield',key:'datefield',value:params.datefield},
                         {type:'fuzzy',key:'fuzzy',value:params.chkFuzzy == 'on'},
                         {type:'startdate',key:'startdate',value:params.startDate},
                         {type:'enddate',key:'enddate',value:params.endDate}
                    ],
                  arrFilters = filtersStore.data.items;
                  arrFilters = Ext.Array.filter(arrFilters, function (it, id, arrFilters){
                  	 return (it.data.type == 'source' || it.data.type == 'facet');
                  });
                  //TODO: 6/10 - work on this too
                  var bbarFilters = Ext.ComponentQuery.query('#bbarFilters')[0];
        //debugger;
        if (form.getForm().isValid()) {
        	    filtersStore.removeAll(true);
                form.up('tabpanel').el.mask(SearchTool.config.Config.msgQuery, 'x-mask-loading'); 
                this.getDvFilters().refresh();
                
                    
                  //find if there's an existing filter of this type; if so, get the index location (even if empty param still need idx to remove)
                  //if the param entry exists (value.trim().length > 0), create model object
                  //if idx found, replace exixting filter obj, else push
                  //if no param entry (value.trim().length == 0), remove filter obj from array
                
                bbarFilters.items.items.length=1;
                bbarFilters.update();
                
                for (;i<arrParams.length;i++){
                    t = arrParams[i];
                    //idx = Ext.Array.indexOf(Ext.Array.pluck(Ext.Array.pluck(filtersStore.data.items,'data'),'type'),t.type);
                    //filtersStore.removeAt(idx);  //if it exists remove it, else nothing; preserves others
                    if (t.value && t.value != "") {  //if value
                        t = Ext.create('SearchTool.model.QueryFilter',{type:t.type,key:t.key,operator:'eq',tip:t.value,value:t.value});
                        arrFilters.push(t);
                        if (t.data.type == 'searchkeyword' || t.data.type == 'searchboolean')
                           bbarFilters.add({text:t.data.value, tooltip:t.data.key+'='+t.data.value, cls:'resultsgridbtn'});
                    }
                }
                t = null;
                filtersStore.add(arrFilters);
                this.getDvParams().refresh();
				this.getDvFilters().refresh();
                
                form.up('tabpanel').el.unmask();
        } //if
    },
    
    facetSelect: function() { //t, r, item, index, e){ 
          var  pnl = Ext.ComponentQuery.query('pnlFilters')[0],
               key = e.target.parentElement.getAttribute('id'),
               val = e.target.getAttribute('id'),
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
    
    filterToggleProducts: function (c,e,o) {
        var //key='Use product', //reqd for insert and removal b/c removal requires search on very same key
            m = Ext.create('SearchTool.model.QueryFilter',{
               type:'source', id: c.id, key:'Repo', operator:'eq', value:c.name,
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
          this.getQueryFiltersStore().removeAt(this.getQueryFiltersStore().find('value',c.name));
        }
        this.getDvParams().refresh();
        this.getDvFilters().refresh();
        pnl.el.unmask();
    },
    
    
    filterRemoveSingle: function (t, r, item, index, e) { 
        //fires datachange event
        var pnl = Ext.ComponentQuery.query('pnlFilters')[0],
        	tmp = t.store.data.items;
        pnl.el.mask('Updating filters....','x-mask-loading');
        tmp = Ext.Array.filter(tmp, function(it,id,tmp) {
        	return (it.data.type == 'source' || it.data.type == 'facet');
        })[index];
        t.store.removeAt(t.store.indexOf(tmp)); 
        //unchecks checkbox in pnlSources
        if (tmp.data.type == 'source') {
           var z = '[name='+ tmp.data.value + ']';
              this.getPnlDataSources().down(z).setValue(false);
        }
        this.getDvParams().refresh();
        this.getDvFilters().refresh();
        pnl.el.unmask();
    },
    
    filterRemoveSearchParam: function (t, r, item, index, e) { 
        //fires datachange event
        var idx = Ext.Array.pluck(Ext.Array.pluck(this.getQueryFiltersStore().data.items,'data'),'type').indexOf(item.id),
            pnl = Ext.ComponentQuery.query('pnlFilters')[0];
        pnl.el.mask('Updating filters...', 'x-mask-loading');
//        if (item.nextElementSibling && item.nextElementSibling.innerText) {
//          var z = item.nextElementSibling.innerText;
//        }
        switch (item.id){
                case 'searchkeyword': //if ( this.getTxtKeyword().rawValue.trim() == z.slice(z.indexOf('=')+2)) 
                         this.getTxtKeyword().reset();break;
                case 'searchboolean': //if ( this.getTxtBoolean().rawValue.trim() == z.slice(z.indexOf('=')+2)) 
                         this.getTxtBoolean().reset();break;
        }  
        t.store.removeAt(idx);
        this.getDvParams().refresh();
        this.getDvFilters().refresh();
        pnl.el.unmask();
//        fires too many events
//        t.store.filter('type',item.name);
//        t.store.removeAt(0); //only 1 item of each type of search param
//        t.store.clearFilter();
    },
    filterRemoveAll: function (b, e) { 
        Ext.Msg.confirm('Confirm - Remove all filters','Are you sure you want to remove all filters?', function(btn){
           var arr = Ext.StoreManager.lookup('QueryFilters'),
               arrNew, i= 0, pnl = Ext.ComponentQuery.query('pnlFilters')[0];
           if (btn == 'yes') {
               arr.removeAll()
               Ext.ComponentQuery.query('#dvFacetSelections')[0].refresh();
               Ext.ComponentQuery.query('#dvResultsParams')[0].refresh();
               pnl.el.mask('Updating filters...','x-mask-loading');
               arrNew = Ext.Array.difference(arr.data.items,arr.query('type','source').items.concat(arr.query('type','facet').items));
               arr.add(arrNew);               
           }
           arr = Ext.ComponentQuery.query('#pnlSources')[0].items.items;
           for (;i< arr.length; i++){
               arr[i].suspendEvents(false);
               arr[i].setValue(false);
               arr[i].resumeEvents();
           }
           i=0; arr=null;
           Ext.ComponentQuery.query('#dvFacetSelections')[0].refresh();
           Ext.ComponentQuery.query('#dvResultsParams')[0].refresh();
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