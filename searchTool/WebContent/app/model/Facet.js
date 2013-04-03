Ext.define('SearchTool.model.Facet',{
     extend:'Ext.data.Model',
     idProperty : 'value',
     fields:[
              {name:'value',type:'string'},
              {name:'operator',type:'string',defaultValue:'='},
              {name:'count',type:'int'}
            ],
     belongsTo:'SearchTool.model.FacetGroup'
});