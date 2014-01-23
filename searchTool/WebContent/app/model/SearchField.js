Ext.define('SearchTool.model.SearchField',{
	extend:'Ext.data.Model',
//	idProperty : 'id',
	fields:[
			{name:'id', defaultValue: ''},
		    {name:'text'},
		    {name:'dataIndex'},
		    {name:'type'},
		    {name:'fmtMask'}
	]
});

