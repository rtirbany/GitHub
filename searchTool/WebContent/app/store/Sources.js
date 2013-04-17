Ext.define('SearchTool.store.Sources',{
	extend:'Ext.data.Store', 
	model:'SearchTool.model.Source',
	autoLoad:true, 
	//TODO: convert to REST 
	proxy:{
		type:'ajax',
		url:'data/sources.json', 
		reader:{
			type:'json',
			root:'repoDefinitions',
			totalProperty:'results',
			successProperty:'success' 
		}
	} 
//	,
//	listeners:{
////		'load' : 
//			 //TODO: sort this by id..done? 
////			 function(store,records,success, operation){  
////                debugger;
////				var allChkbox =  Ext.create('SearchTool.model.Source',{'id': 0, 'boxLabel': 'All', 'itemId': 'chkSrcAll', 'name':'chkSrcAll', 'checked':true, 'tooltip':'Srcall tooltip'});
////				store.add(allChkbox);
////				store.sort('id','ASC');  
////				}
//		 //load listener
//	}//listeners
	
});