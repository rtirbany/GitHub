Ext.define('SearchTool.model.Facet',{
     extend:'Ext.data.Model',
     idProperty: 'value',
     fields:[
              {name:'value'}, 
              {name:'operator',type:'string',defaultValue:'eq'},
              {name:'count',type:'int',convert:null}
            ],
     belongsTo:'SearchTool.model.FacetGroup'

});
     

//Ext.define('SearchTool.model.Facet',{
//     extend:'Ext.data.Model',
//     idProperty : 'value',
//     fields:[
//              'value',
//              'count'
//            ],
//     associations:[{
//          type: 'belongsTo',
//          model:'SearchTool.model.FacetGroup',
//          name:'facetName',
//          associationKey: 'FACETNAME'
//     }]
//});