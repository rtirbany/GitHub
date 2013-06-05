Ext.define('SearchTool.store.UniversalSearchFields',{
     extend:'Ext.data.Store',
     model:'SearchTool.model.SearchField',
     id: 'UniversalSearchFields',
     autoLoad:true, 
     //TODO: convert to REST prox 
     proxy:{
          type:'ajax',
          url:'data/sources.json', 
          reader:{
               type:'json',
               root:'commonColumns', 
               totalProperty:'results',
               successProperty:'success'
          }
     }
});