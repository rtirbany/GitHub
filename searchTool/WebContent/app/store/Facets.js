Ext.define('SearchTool.store.Facets',{
     storeId:'Facets',
     extend:'Ext.data.Store', 
     model:'SearchTool.model.FacetGroup',
     autoLoad:false,
     proxy:{
          type:'ajax',
          reader:{ 
               type:'json',
               root:'coreFacets',
               successProperty:'success'
          }
     }
//     ,
//     listeners: {
//          load : function(store, records){
//               debugger; 
//              iFacetStore.loadRawData(store.proxy.reader.jsonData.coreFacets);
//          }
//     }
});