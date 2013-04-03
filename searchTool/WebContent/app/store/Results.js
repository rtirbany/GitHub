Ext.define('SearchTool.store.Results',{
	extend:'Ext.data.Store',
	requires:['SearchTool.config.Config'],
	model:'SearchTool.model.Result',
	autoLoad:true, 
	pageSize:SearchTool.config.Config.defaultPageSize,
	remoteSort : true,
    remoteFilter: true,
	sorters : [{property: 'subject', direction:'asc'}],
	//TODO: convert to REST prox 
	proxy:{
		type:'ajax', //change to 'rest' when ready
        actionMethods:{
               read:'POST',
               create:'PUT',
               update:'POST',
               destroy:'DELETE'
          },
		url:'data/results.json',
        filterParam:'filters',
		reader:{
			type:'json',
			root:'rows',
			totalProperty:'results',
			successProperty:'success'
		}
	},
     listeners: {
          load : function(store, records, opts){
              var iFacetStore = Ext.StoreManager.lookup('Facets');
              iFacetStore.loadRawData(store.proxy.reader.jsonData.coreFacets);
          }
     }
//     ,
//    onProxyLoad: function (oper){
//          debugger;
//          var iResult = Ext.JSON.decode(oper.response.responseText).coreFacets;
//          if (Ext.isDefined(iResult)) {
//               var iFacetsStore = Ext.StoreManager.lookup('Facets');
//               iFacetsStore.loadRawData(iResult) 
//          }
//    } 
});