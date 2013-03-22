Ext.define('SearchTool.model.FacetSelection',{
     extend:'Ext.data.Model',
     idProperty : 'key',
     fields:[ 
              {name:'id',type:'int'},
              {name:'key',type:'string'},
              {name:'value',type:'string'},
              {name:'tip',type:'string'}
            ]
});