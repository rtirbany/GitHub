Ext.define('SearchTool.model.Result',{
	extend:'Ext.data.Model',
	idProperty : 'id',
	fields:[
			{name:'id',type:'int'},
			{name:'dt',type:'date'}, //dateFormat: 'm-d-Y g:i A'
		    {name:'source',type:'string'},
		    {name:'product',type:'string'},
		    {name:'title',type:'string'},
		    {name:'subject',type:'string'}
	]
});
	     
	     