Ext.define('SearchTool.model.FacetGroup',{
     extend:'Ext.data.Model',
     idProperty : 'facetName',
     fields:[
              {name:'facetName'},
              {name:'facetEntries', type:'auto'}
              ],
     hasMany: [{model: 'SearchTool.model.Facet',name:'facetEntries',associationKey:'facetEntries'}]
});

//Ext.define('SearchTool.model.FacetGroup',{
//     extend:'Ext.data.Model',
//     idProperty : 'facetName',
//     fields:[
//              'facetName'
////              ,{name:'facetEntries', type:'auto'}
//              ],
//     associations: [
//          {type: 'hasMany',
//          model : 'Facet',
//          name:'facetEntries',
//          associationKey: 'FACETENTRIES'
//          }
//          ]
//});