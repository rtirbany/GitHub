Ext.define('SearchTool.controller.QueryFilters', {
    extend: 'Ext.app.Controller',
    views: ['Viewport','SearchTool.view.main.component.FilterMgmt','SearchTool.view.main.ResultsGrid'],
    models: ['FacetGroup','QueryFilter'],
    stores: ['Facets','Sources','Keywords','Results','QueryFilters','UniversalSearchFields','QueriesHistory'],
    requires: ['SearchTool.util.dom','SearchTool.view.main.component.WinSave'],
    refs: [
        {
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

    suspendEvent: function(val){
        if (val != null)
            this._suspendEvent = val;
    },
    //TODO: check this..new source model
    //this.data.items[x].data to gete to (1) repo;
    //this.getAt(0).products().getAt(0).get('productName')
    getSourcesData: function (store,records, opts){
          var  tmp = store.proxy.reader.jsonData,
               pnl = Ext.ComponentQuery.query('#pnlSources')[0];
          this.clearData(true);
          if (tmp && tmp.repositoryDefinitions && tmp.repositoryDefinitions.length > 0){
             this.loadRawData(tmp.repositoryDefinitions);
              var t,i,j, chkgroup, chkboxes = [];
              for (i=0;i<this.data.items.length;i++){
                 t = this.data.items[i];
                 chkgroup = Ext.create('Ext.form.CheckboxGroup',{fieldLabel: t.data.repositoryId, name: t.data.repositoryId, itemId: t.data.repositoryId, layout:'vbox', labelWidth:75, columns:[0.8]});
                 for (j = 0;j < this.getAt(0).products().data.items.length; j++){
                    var c = this.getAt(0).products().getAt(j).get('productName'),
                        prodbox = {xtype: 'checkbox', name: t.data.repositoryId+'.'+c, inputValue: t.data.repositoryId+'.'+c, boxLabel: c};
                     chkboxes.push(prodbox);
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

//          Ext.ComponentQuery.query('#btnVisualize')[0].setDisabled(store.data.items.length === 0);
//          Ext.ComponentQuery.query('#cbPageSize')[0].setDisabled(store.data.items.length === 0);
        var  storeFilters = Ext.StoreManager.lookup('QueryFilters'),
            storeHistory = Ext.StoreManager.lookup('QueriesHistory'),
            btnSearch = Ext.ComponentQuery.query('#btnSearch')[0],
            btnSave = Ext.ComponentQuery.query('#btnSaveQuery')[0],
          	btnExport = Ext.ComponentQuery.query('#btnExport')[0],
            tbSearch = Ext.ComponentQuery.query('#tbSearch')[0],
            tmp = store.proxy.reader.jsonData,
            pnl = Ext.ComponentQuery.query('#pnlFacets')[0],
            storeFacets = Ext.StoreManager.lookup('Facets'),
            q = Ext.create('SearchTool.model.Query'),
            newPnl, t,i=0,j;
        pnl.items.items.length = 1;
        pnl.border = false;
        pnl.update();
        if (tmp && tmp.searchId && tmp.searchId.length > 0) {
            if (storeHistory.find('searchId',tmp.searchId) === -1) {
                q.data.searchId = tmp.searchId;
                q.data.numResults = tmp.numResults;
                q.data.saveDate = tmp.saveDate || '';
                q.data.lastRanDate = new Date();
                q.data.savedSearchId = tmp.searchFilters ? btnSearch.name : '';
                storeHistory.add(q);
            }
            else
                storeHistory.getAt(storeHistory.find('searchId',tmp.searchId)).data.lastRanDate = new Date();
        btnExport.enable();
        btnSearch.id = tmp.searchId;
        btnSave.id = tmp.searchId;
        btnExport.id = tmp.searchId;
               //TODO: 6/10 change hrefs of each button to add tmpsearchID
               //btnCsv.href = Ext.String.format(SearchTool.config.Configur.urlExportBase, SearchTool.config.Config.urlExportTokenCsv, tmp.searchID); //only works on first and prior to render or ? so below ifs are needed
               //if (btnCsv.el)
               //     btnCsv.el.dom.children[0].href ...
          }
          else {
              btnExport.disable();
          }

          if (tmp && tmp.searchFilters) {// && storeFilters.find('key','savedSearchId') > -1) {
               if (storeFilters.find('key','savedSearchId') === -1)
                    btnSearch.name = '';
               var arrFilters = [],
                    arrProd = Ext.ComponentQuery.query('#pnlSources')[0].items.items;
               storeFilters.removeAll(true);

               for (;i<tmp.searchFilters.length;i++) {
                    t = tmp.searchFilters[i];
                    j = Ext.create('SearchTool.model.QueryFilter',{type:'',key: t.filter, operator: 'eq', tip: t.value, value: t.value});
                    switch (t.filter) {
                        case 'repo' :
                         		j.data.type= 'source';
                         		j.data.key = 'Repo';
                         		var key = '[name='+j.data.value+']';
                         		var cbox = Ext.ComponentQuery.query(key)[0];// 7/30 cboxgrp.down(key);
                                if (cbox)
                                   cbox.setRawValue(true);
                         		//cbox.suspendEvents(false);
                         		//cbox.setValue(true);
                         		//cbox.resumeEvents();
                         		//cbox.checked = true;
                         		//cbox.addCls('x-form-cb-checked'); //x-form dirty
                                //cbox.el.dom.click();
                                //cbox.fireEvent('change',cbox,true,null);
                         		//cbox.on('change,'SearchTool.controller.QueryFilters.filterToggleProducts(cbox));
                         		break;
                         case 'keywordString' :
                                                j.data.type= 'searchkeyword';
                                                Ext.ComponentQuery.query('#cboxSearch')[0].setValue(t.value);
                                                break;
                         case 'booleanString' :
                                                j.data.type= 'searchboolean';
                                                Ext.ComponentQuery.query('#txtSearchBoolean')[0].setValue(t.value);
                                                break;
                         case 'startdate':
                                                j.data.type = 'startdate';
                                                Ext.ComponentQuery.query('#dtUserSearchFrom')[0].setValue(t.value);
                                                break;
                         case 'enddate':
                                                j.data.type = 'enddate'; Ext.ComponentQuery.query('#dtUserSearchTo')[0].setValue(t.value); break;
                         default:
                                                j.data.type = 'facet';
                    }
               arrFilters.push(j);
               }//for
               storeFilters.suspendEvents(false);
               storeFilters.add(arrFilters);
               storeFilters.resumeEvents();

               arrFilters = Ext.Array.filter(arrFilters, function(it, id, arrFilters){
                    return (it.data.type === 'source' || it.data.type === 'facet');
               });
               j = 'Filter Options' + (arrFilters.length === 0 ? '' : ' (' + arrFilters.length + ' selections)');
               Ext.ComponentQuery.query('filtermgmt')[0].setTitle(j);
               Ext.ComponentQuery.query('#btnRemoveAll')[0].setDisabled(arrFilters.length === 0);
               i=0;t=null;j=null;
          }
          else {
               btnSearch.name = '';
              }
          if (tbSearch.getActiveTab().itemId === 'tbHistory') {
              tbSearch.setActiveTab(0);
              tbSearch.setActiveTab(3);
          }
          if (tbSearch.getActiveTab().itemId == 'tbSaved') {
              tbSearch.setActiveTab(0);
              tbSearch.setActiveTab(2);
          }
          if (tmp && tmp.coreFacets && tmp.coreFacets.length > 0){
               storeFacets.removeAll(true);
               storeFacets.loadRawData(tmp.coreFacets);
               pnl = pnl.down('container');
               debugger;
               for (;i<storeFacets.data.items.length;i++){
                   t = storeFacets.data.items[i];
                   storeFacets.filter({property:'facetName',value:t.data.facetName});
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
                              //overItemCls: 'facetitem-over',
                              store: newStore,
                              itemSelector: 'div.facet'
                         }
                    ]
                   }
                   );
               // newPnl.setOverflowXY('hidden','auto');
                pnl.add(newPnl);
               }
              i=0;

               //var pnlGroup = Ext.create('SearchTool.view.main.component.PnlGroup');
               //pnl.add(pnlGroup);

                         }
          else {
               pnl.add(Ext.create('Ext.panel.Panel',{width:'100%',border: false, title: 'No Filters Available', items: [
                    {xtype:'component', html:'Filters are not available at this time'}]}));

                   }
          if (tmp && tmp.columns && tmp.columns.length > 0){
              //new - cols come back in resultset
              t = [];
          	  for (;i<tmp.columns.length;i++){
                  tmp.columns[i].width *= SearchTool.config.Config.defaultColMultiplier;
                  t.push({name:tmp.columns[i].dataIndex});
          	  }
              store.model.setFields(t);
              Ext.ComponentQuery.query('resultsgrid')[0].reconfigure(store,tmp.columns);
              store.loadRawData(store.proxy.reader.rawData,false);

               //old way - Ext.StoreManager.lookup('resultsgrid').loadRawData(tmp.cols);
          }
          Ext.ComponentQuery.query('#dvResultsParams')[0].refresh();
          Ext.ComponentQuery.query('#dvFacetSelections')[0].refresh();
          t = null;
        i = null;
        j = null;
        pnl = null;
        storeFilters = null;
        tmp = null;
        storeFacets = null;
        storeHistory = null;
        q = null;
        newPnl = null;
    },

    querySaveHandler: function(btn, e){
          Ext.create('SearchTool.view.main.component.WinSave',{title:'Save Query', searchId: btn.id}).show();
    },
    queryRunHandler: function (btn, e){
        var tmp;
          this.getQueryFiltersStore().removeAll(true);
          this.getDvParams().refresh();
          this.getDvFilters().refresh();
          btn.toggle(true);
          this.suspendEvent(true);
          Ext.ComponentQuery.query('#pnlSources')[0].items.items[0].setValue(false);
          this.suspendEvent(false);
          if (btn.cls === 'btnSaved') {
              Ext.ComponentQuery.query('#btnSearch')[0].name = btn.id;
              tmp = Ext.create('SearchTool.model.QueryFilter',{
                type: 'savedSearch', key: 'savedSearchId', operator: 'eq', value: btn.id
              });
              Ext.ComponentQuery.query('#btnCustomDate')[0].el.dom.click();
          }
          else {
              Ext.ComponentQuery.query('#btnSearch')[0].name = '';
              tmp = Ext.create('SearchTool.model.QueryFilter',{
                  type: 'search', key: 'searchId', operator: 'eq', value: btn.id
              });
          }
            this.getQueryFiltersStore().add(tmp);
            Ext.ComponentQuery.query('searchArea')[0].getForm().reset();
            tmp = null;
    },
    searchHandler: function (btn, e) {
        var form = btn.up('form'), params = form.getValues(), t = null,
                    filtersStore = this.getQueryFiltersStore(),i = 0,
                    arrParams = [
                         {type:'searchkeyword',key:'keywordString',value:params.keywordString.trim()},
                         {type:'searchboolean',key:'booleanString',value:params.txtSearchBoolean.trim()},
                         {type:'datefield',key:'datefield',value:params.datefield},
                         {type:'fuzzy',key:'fuzzy',value:params.chkFuzzy == 'on'},
                         {type:'startdate',key:'startdate',value:params.startDate},
                         {type:'enddate',key:'enddate',value:params.endDate}
            ],
            arrFilters = filtersStore.data.items;
            arrFilters = Ext.Array.filter(arrFilters, function (it, id, arrFilters){
                return (it.data.type === 'source' || it.data.type === 'facet');
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
                    if (t.value && t.value !== '') {  //if value
                        t = Ext.create('SearchTool.model.QueryFilter',{type:t.type,key:t.key,operator:'eq',tip:t.value,value:t.value});
                        arrFilters.push(t);
                        if (t.data.type === 'searchkeyword' || t.data.type === 'searchboolean')
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

    facetSelect: function(t, r, item, index, e){
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

    updateResultsGrid: function(storeFilters, eOpts){
          Ext.ComponentQuery.query('#btnSaveQuery')[0].setDisabled(storeFilters.data.items.length === 0);
          var  arr= [], i= 0, iLen= storeFilters.data.items.length,t= null,
               pnl = Ext.ComponentQuery.query('pnlFilters')[0],
               storeResults = Ext.ComponentQuery.query('resultsgrid')[0].store,
              arrFilters = storeFilters.data.items;
          arrFilters = Ext.Array.filter(arrFilters, function(it, id, arrFilters){
              return (it.data.type === 'source' || it.data.type === 'facet');
          });
          t = 'Filter Options' + (arrFilters.length === 0 ? '' : '('+arrFilters.length+' selections)');
          Ext.ComponentQuery.query('filtermgmt')[0].setTitle(t);
          Ext.ComponentQuery.query('#btnRemoveAll')[0].setDisabled(arrFilters.length === 0);
          arrFilters = Ext.Array.filter(arrFilters,function (it, id, arrFilters){
                return (it.data.type === 'source');
          });
          Ext.ComponentQuery.query('#btnVisualize')[0].setDisabled(arrFilters.length !=1);
          pnl.el.mask('Updating filters...','x-mask-loading');
          storeResults.clearFilter(true);

          for (; i<iLen; i++){
             t = storeFilters.data.items[i];
             arr.push({filter: t.data.key, operator: t.data.operator,value: t.data.value});
             if (t.data.type === 'source') {
                 storeFilters.suspendEvents(false);
                 t = '[name='+ t.data.value+']';
                 //TODO: fix data to be consistent
                 if (Ext.ComponentQuery.query('#pnlSources')[0].down(t) !== null)
                    Ext.ComponentQuery.query('#pnlSources')[0].down(t).setRawValue(true);
//                 this.getPnlDataSources().down.t).setValue(true);
                 storeFilters.resumeEvents();
          }
          }
          storeResults.filter(Ext.JSON.encode(arr));
          arrFilters = null;
          arr = null;
          Ext.ComponentQuery.query('#dvFacetSelections')[0].refresh();
          Ext.ComponentQuery.query('#dvResultsParams')[0].refresh();
          pnl.el.unmask();
    },

    filterToggleProducts: function (c, n, o, opts) {
        if (!this._suspendEvent) {
        var //key='Use product', //reqd for insert and removal b/c removal requires search on very same key
            m = Ext.create('SearchTool.model.QueryFilter',{
               type:'source',id:c.id, key:'Repo', operator:'eq', value:c.name,
               tip:c.name.substring(c.name.indexOf('.')+1)
            }),
            pnl = Ext.ComponentQuery.query('pnlFilters')[0],
            arr = [];
        pnl.el.mask('Updating filters....','x-mask-loading');
            if (n) {
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
        }
    },

    filterRemoveSingle: function (t, r, item, index, e) {
        //fires datachange event
        var pnl = Ext.ComponentQuery.query('pnlFilters')[0],
            tmp = t.store.data.items;
        pnl.el.mask('Updating filters....','x-mask-loading');
        tmp = Ext.Array.filter(tmp, function(it,id,tmp) {
            return (it.data.type === 'source' || it.data.type === 'facet');
        })[index];
        t.store.removeAt(t.store.indexOf(tmp));
        //unchecks checkbox in pnlSources
        if (tmp.data.type === 'source') {
            t.store.suspendEvents(false);
            tmp = '[name='+ tmp.data.value + ']';
            this.getPnlDataSources().down(tmp).setValue(false);
            t.store.resumeEvents();
        }
//        this.getDvParams().refresh();
//        this.getDvFilters().refresh();
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
               arrNew = arrNew = Ext.Array.difference(arr.data.items,arr.query('type','source').items.concat(arr.query('type','facet').items)),
               i= 0, pnl = Ext.ComponentQuery.query('pnlFilters')[0];
           if (btn === 'yes') {
               arr.removeAll(false);
               Ext.ComponentQuery.query('#btnRemoveAll')[0].disable();
               Ext.ComponentQuery.query('#dvFacetSelections')[0].refresh();
               Ext.ComponentQuery.query('#dvResultsParams')[0].refresh();
               pnl.el.mask('Updating filters...','x-mask-loading');
               arrNew = Ext.Array.difference(arr.data.items,arr.query('type','source').items.concat(arr.query('type','facet').items));
               arr.add(arrNew);
               //set each checkbox to false
               arr.suspendEvents(false);
               arrNew = Ext.ComponentQuery.query('#pnlSources')[0].items.items;
               for (; i < arrNew.length; i++){
                   arrNew[i].setValue(false);
           }
               arr.resumeEvents();
           }
           i=0;
           arr=null;
           arrNew= null;
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