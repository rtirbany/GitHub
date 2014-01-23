Ext.define('SearchTool.store.Results',{
	extend: 'Ext.data.Store',
	requires: ['SearchTool.config.Config','SearchTool.util.dom'],
	model: 'SearchTool.model.Result',
	autoLoad: true,
	pageSize: SearchTool.config.Config.defaultPageSizeUser,
	remoteSort: true,
    remoteFilter: true,
	sorters : [
        {property: SearchTool.config.Config.defaultSortProperty, direction:SearchTool.config.Config.defaultSortDir}
    ],
	//TODO: convert to REST prox
	proxy:{
		type: 'ajax', //change to 'rest' when ready
        actionMethods:{
               read: SearchTool.config.Config.urlMethodRead,
               create: SearchTool.config.Config.urlMethodCreate,
               update: SearchTool.config.Config.urlMethodUpdate,
               destroy: SearchTool.config.Config.urlMethodDelete
          },
		url: SearchTool.config.Config.urlSearch,
        filterParam:'filters',
		reader:{
			type:'json',
			root:'rows',
			totalProperty:'numResults',
			successProperty:'success'
        }
//        ,
//        listeners: {
//            exception: SearchTool.util.dom.errorHandler
//        }
	}
//     ,
//     listeners: {
//          load : function(store, records, opts){
//              var facetGroups = Ext.StoreManager.lookup('Facets');
//              facetGroups.loadRawData(store.proxy.reader.jsonData.coreFacets);
//          }
//     }
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