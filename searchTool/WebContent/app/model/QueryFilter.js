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
            ]
});