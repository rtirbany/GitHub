Ext.define('SearchTool.store.QBuilderOperators',{
	extend:'Ext.data.Store',
	autoLoad:true,
	model:'SearchTool.model.QBuilderOperator',
	//TODO: convert to REST prox 
	proxy:{
		type:'ajax',
		url:'data/qbuilderoperator.json',
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