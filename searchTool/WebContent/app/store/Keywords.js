Ext.define('SearchTool.store.Keywords',{
	extend:'Ext.data.Store', 
	model:'SearchTool.model.Keyword',
	autoLoad:true
	//TODO: convert to REST proxy
//	idProperty:'SourceId',
});