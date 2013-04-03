Ext.define('SearchTool.model.FacetGroup',{
     extend:'Ext.data.Model',
     idProperty : 'facetName',
     fields:[
              {name:'facetName',type:'string'},
              {name:'facetEntries', type:'auto'}
              ],
     hasMany: [{model: 'SearchTool.model.Facet',name:'facetEntries',associationKey:'facetEntries'}]
});