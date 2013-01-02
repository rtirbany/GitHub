Ext.define('SearchTool.model.Keyword',{
	extend:'Ext.data.Model',
	idProperty:'id',
//	associations:[{
//		type:'hasMany',
//		model:'Product',
//		name:'products',
//		associationKey:'products'
//	}
//	],
	fields:[{name:'id',type:'int'},
		    {name:'keyword',type:'string'}]
});