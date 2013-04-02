Ext.define('SearchTool.model.QueryFilter',{
     extend:'Ext.data.Model',
     idProperty : 'value',
     fields:[ 
              {name:'type',type:'string'},
              {name:'key',type:'string'},
              {name:'operator',type:'string'},
              {name:'value',type:'string'},
              {name:'tip',type:'string'}
            ]
});