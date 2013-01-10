Ext.define('SearchTool.model.Field',{
	extend:'Ext.data.Model',
	idProperty:'id',
	fields:[{name:'id',type:'int'},
		    {name:'display',type:'string'},
		    {name:'value',type:'string'},
		    {name:'fieldtype',type:'string'},
		    {name:'fmtMask',type:'string'}
	]
});
	     
	     