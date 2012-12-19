//boxLabel, xtype, itemId, checked, tooltip, products(1:M) = resultset format; products is an array of product objs

Ext.define('SearchTool.model.Source',{
	extend:'Ext.data.Model',
//	associations:[{
//		type:'hasMany',
//		model:'Product',
//		name:'products',
//		associationKey:'products'
//	}
//	],
	fields:[{name:'boxLabel',type:'string'},
			{name:'xtype', type:'string'},
	        {name:'itemId',type:'string'},
	        {name:'checked',type:'boolean'},
	        {name:'tooltip',type:'string'}]
});