Ext.define('SearchTool.store.QueryFilters',{
     extend:'Ext.data.Store',
     requires:['SearchTool.config.Config'],
     model:'SearchTool.model.QueryFilter',
     id:'QueryFilters',
     autoLoad:true
});