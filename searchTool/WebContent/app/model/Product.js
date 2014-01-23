Ext.define('SearchTool.model.Product',{
	extend:'Ext.data.Model',
    requires: ['SearchTool.model.SearchField'],
	//belongsTo: 'SearchTool.model.Source',
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
          name:'fields',
          associationKey:'customColumns'
    }

    ]
});

//repodefs : [
//  {
//        proddefs: [
//            {
//                prodname: 'channel5',
//                customColumns: [
//                    {
//                        text: 'newcol1',
//                        dataIndex: 'somecol1',
//                        width: 5
//                    }
//                ]
//            }
//        ]
//  }
// ]