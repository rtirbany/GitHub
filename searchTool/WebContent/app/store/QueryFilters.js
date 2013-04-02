Ext.define('SearchTool.store.QueryFilters',{
     extend:'Ext.data.Store',
     requires:['SearchTool.config.Config'],
     model:'SearchTool.model.QueryFilter',
     id:'QueryFilters',
     autoLoad:true,
     proxy:{
          type:'ajax',
          url:'data/facetselections.json',
          filterParam:'Filters',
//        afterRequest:function(req,res){ 
//        },
          reader:{ 
               type:'json',
               root:'rows',
               totalProperty:'results',
               successProperty:'success'
          },
          actionMethods:{
               read:'POST', create:'POST', update:'POST', destroy:'POST'
          }
     }
});