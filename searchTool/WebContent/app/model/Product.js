Ext.define('SearchTool.model.Product',{
	extend:'Ext.data.Model',
    requires: ['SearchTool.model.SearchField'],
	belongsTo: 'Source',
	fields:[
           // {name:'id',type:'int',convert:null},
	       // {name:'label'},
	        {name:'productName'}
//            {name:'customColumns',type:'auto'}
	       // {name:'tooltip'}
    ],
    associations:[
    {
          type:'belongsTo',
          model:'SearchTool.model.Source',
          name:'repository',
          associationKey:'repositoryId'
    },
    {
          type:'hasMany',
          model:'SearchTool.model.SearchField',
          name:'searchfields',
          associationKey:'customColumns'
    }
    
    ]
});
 