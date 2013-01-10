Ext.define('SearchTool.model.Field',{
	extend:'Ext.data.Model',
	idProperty:'id',
	fields:[{name:'id',type:'int'},
		    {name:'display',type:'string'},
		    {name:'value',type:'string'},
		    {name:'numOperands',type:'int'},
		    {name:'tooltip',type:'string'}
	]
});

// 'id' : 1,
//	     'display':'=',
//	     'value' : '=',
//	     'numOperands' : '1',
//	     'tooltip' : 'equals'