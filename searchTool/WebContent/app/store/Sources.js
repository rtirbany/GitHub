Ext.define('SearchTool.store.Sources',{
	extend:'Ext.data.Store', 
	model:'SearchTool.model.Source',
	autoLoad:true,
	//TODO: idProperty set?
//	idProperty:'SourceId',
	proxy:{
		type:'ajax',
		url:'data/sources.json',
		reader:{
			type:'json',
			root:'sources'
		}
	}
});