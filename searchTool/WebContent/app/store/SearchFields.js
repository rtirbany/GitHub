Ext.define('SearchTool.store.SearchFields',{
	extend:'Ext.data.Store',
	model:'SearchTool.model.SearchField',
	autoLoad:true, 
	//TODO: convert to REST prox 
	proxy:{
		type:'ajax',
		url:'data/searchfields.json', 
		reader:{
			type:'json',
			root:'rows',
			totalProperty:'results',
			successProperty:'success'
		}
	},
	sorters:[{property:'id',direction:'asc'}],
	sortOnLoad:true
//	,
//	listeners:{
//		'load' : 
//			 //TODO: sort this by id..done?
//			 function(store,records,success, operation){ 
////			 	Ext.Msg.alert(store.getAt(0).getId()+''); 
//			 	debugger;
//				
//			} 
//		 //load listener
//	}//listeners
});