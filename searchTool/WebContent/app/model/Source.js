//boxLabel, xtype, itemId, checked, tooltip, products(1:M) = resultset format; products is an array of product objs

Ext.define('SearchTool.model.Source',{
	extend:'Ext.data.Model',
    requires:['SearchTool.model.Product'],
	fields:[
            //{name:'id',type:'int',convert:null},
		    //{name:'label'},
			{name:'repositoryId'}
	        //{name:'tooltip'},
	        //{name:'itemId'},
//            {name:'productDefinitions',type:'auto'}
           ],
    associations:[
          {
               type:'hasMany',
               model: 'SearchTool.model.Product',
               name:'products',
               associationKey:'productDefinitions'
          }
    ],

    //TODO: convert to REST
    proxy:{
          type:'ajax',
          url: SearchTool.config.Config.urlSources,
          reader:{
               type:'json',
               root:'repositoryDefinitions',  //7/30 repoDefinitions
               totalProperrty: 'numResults',
               successProperty:'success'
          }
     }
});

//        {
//            'id': 1,
//            'label': 'Src1',
//            'name': 'src1',
//            'tip': 'Src 1',
//            'products': [{
//                    'id': 1,
//                    'label': 'Prod1',
//                    'name': 'src1prod1',
//                    'tip': 'src1prod1',
//                    'fields': []
//                }]}