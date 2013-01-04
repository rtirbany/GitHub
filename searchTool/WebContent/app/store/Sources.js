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
			root:'rows',
			totalProperty:'results',
			successProperty:'success'
		}
	}
	,
	listeners:{
		'load' : 
			 //TODO: sort this by id..
			 function(store,records,success, operation){ 
			 	Ext.Msg.alert(store.getAt(0).getId()+''); 
				var allChkbox =  Ext.create('SearchTool.model.Source',{'id': 0, 'boxLabel': 'All', 'itemId': 'chkSrcAll', 'name':'chkSrcAll', 'checked':true, 'tooltip':'Srcall tooltip'});
				store.add(allChkbox);
			} 
		 //load listener
	}//listeners
});