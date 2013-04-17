//boxLabel, xtype, itemId, checked, tooltip, products(1:M) = resultset format; products is an array of product objs

Ext.define('SearchTool.model.Source',{
	extend:'Ext.data.Model',
	fields:[
            //{name:'id',type:'int',convert:null},
		    //{name:'label'},
			{name:'repoName'},
	        //{name:'tooltip'},
	        //{name:'itemId'},
            {name:'productDefinitions',type:'auto'} 
           ],
    hasMany: [{model: 'SearchTool.model.Product',name:'productDefinitions',associationKey:'productDefinitions'}],
    //TODO: convert to REST 
    proxy:{
          type:'ajax',
          url:'data/sources.json', 
          reader:{
               type:'json',
               root:'repoDefinitions',
               totalProperty:'results',
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