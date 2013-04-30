Ext.define('SearchTool.model.Result',{
	extend:'Ext.data.Model',
	idProperty : 'id',
	fields:[
			{name:'id',type:'int',convert:null},
			{name:'dt',type:'date'}, //dateFormat: 'm-d-Y g:i A'
		    {name:'source'},
		    {name:'product'},
		    {name:'summary'},
		    {name:'serial'},
		    {name:'subject'}
	]
});
	     
	     