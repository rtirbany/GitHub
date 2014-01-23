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
	fields:[
        {name:'id',type:'int', convert:null},
		{name:'keyword'}
    ],
    proxy:{
          type: 'ajax',
          url: SearchTool.config.Config.urlKeywords,
//        afterRequest:function(req,res){
//        },
          reader:{
               type:'json',
               root:'rows',
               totalProperty:'results',
               successProperty:'success'
          }
     }
});