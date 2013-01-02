Ext.define('SearchTool.store.Keywords',{
	extend:'Ext.data.Store', 
	model:'SearchTool.model.Keyword',
	autoLoad:true,
	//TODO: convert to REST proxy
//	idProperty:'SourceId',
	proxy:{
		type:'ajax',
		url:'data/keywords.json',
//		afterRequest:function(req,res){ 
//		},
		reader:{ 
			type:'json',
			root:'rows',
			totalProperty:'results',
			successProperty:'success'
		}
	}
});