Ext.define('SearchTool.store.QBuilderOperators',{
	extend:'Ext.data.Store',
//	autoLoad:true,
	model:'SearchTool.model.QBuilderOperator',
	data: [
	   { 'id' : 1,
	     'display':'=',
	     'value' : '=',
	     'numOperands' : 1,
	     'tooltip' : 'equals'
	   },
	    { 'id' : 2,
	     'display':'<',
	     'value' : '<',
	     'numOperands' : 1,
	     'tooltip' : 'less than'
	   },
	    { 'id' : 3,
	     'display':'>',
	     'value' : '>',
	     'numOperands' : 1,
	     'tooltip' : 'greater than'
	   },
	    { 'id' : 4,
	     'display':'<=',
	     'value' : '<=',
	     'numOperands' : 1,
	     'tooltip' : 'less than or equal to'
	   },
	    { 'id' : 5,
	     'display':'>=',
	     'value' : '>=',
	     'numOperands' : 1,
	     'tooltip' : 'greater than or equal to'
	   },
	   { 'id' : 6,
	     'display':'BETWEEN',
	     'value' : 'BETWEEN',
	     'numOperands' : 2,
	     'tooltip' : 'between (inclusive)'
	   },
	    { 'id' : 7,
	     'display':'NOT',
	     'value' : 'NOT',
	     'numOperands' : 1,
	     'tooltip' : 'not'
	   },    
	    { 'id' : 8,
	     'display':'IS NOT NULL',
	     'value' : 'IS NOT NULL',
	     'numOperands' : 0,
	     'tooltip' : 'is not null'
	   },
	    { 'id' : 9,
	     'display':'IS NULL',
	     'value' : 'IS NULL',
	     'numOperands' : 0,
	     'tooltip' : 'is null'
	   }
	]
	//TODO: convert to REST prox 
//	proxy:{
//		type:'ajax',
//		url:'data/qbuilderoperator.json', 
//		reader:{
//			type:'json',
//			root:'rows',
//			totalProperty:'results',
//			successProperty:'success'
//		}
//	}
});