Ext.define('SearchTool.store.Fields',{
	extend:'Ext.data.Store',
	autoLoad:true,
	model:'SearchTool.model.Field',
	//TODO: convert to REST prox 
	proxy:{
		type:'ajax',
		url:'data/fields.json',
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