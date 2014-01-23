Ext.define('SearchTool.store.UniversalSearchFields',{
     extend:'Ext.data.Store',
     model:'SearchTool.model.SearchField',
     id: 'UniversalSearchFields',
     autoLoad:true,
     //TODO: convert to REST prox
     proxy:{
          type:'ajax',
          url: SearchTool.config.Config.urlSources, //'data/sources.json',
          reader:{
               type:'json',
               root:'commonColumns',
               successProperty:'success'
          }
     }
});