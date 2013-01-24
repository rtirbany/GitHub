Ext.define('SearchTool.store.Results',{
	extend:'Ext.data.Store',
	requires:['SearchTool.config.Config'],
	model:'SearchTool.model.Result', 
	autoLoad:true, 
	pageSize:SearchTool.config.Config.defaultPageSize,
	remoteSort : true,
	sorters : [{property: 'subject', direction:'asc'}],
	//TODO: convert to REST prox 
	proxy:{
		type:'ajax', //change to 'rest' when ready
		url:'data/results.json', 
		reader:{
			type:'json',
			root:'rows',
			totalProperty:'results',
			successProperty:'success'
		}
	} 
});