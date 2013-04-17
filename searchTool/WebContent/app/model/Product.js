Ext.define('SearchTool.model.Product',{
	extend:'Ext.data.Model',
	belongsTo: 'Source',
	fields:[
           // {name:'id',type:'int',convert:null},
	       // {name:'label'},
	        {name:'productName'},
            {name:'customColumns',type:'auto'}
	       // {name:'tooltip'}
    ]
});

//{
//                    'id': 1,
//                    'label': 'Prod1',
//                    'name': 'src1prod1',
//                    'tip': 'src1prod1',
//                    'fields': []
//                }