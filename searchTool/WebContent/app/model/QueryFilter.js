Ext.define('SearchTool.model.QueryFilter',{
     extend:'Ext.data.Model',
     idProperty: 'id',
     fields:[ 
              {name:'type'},
              {name:'key'},
              {name:'id'},
              {name:'operator'},
              {name:'value'},
              {name:'tip'}
            ],
     proxy:{
          type:'rest',
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