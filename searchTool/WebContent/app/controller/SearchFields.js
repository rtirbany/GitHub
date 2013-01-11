Ext.define('SearchTool.controller.SearchFields', {
	extend : 'Ext.app.Controller',
	models: ['SearchField'],
	views : ['QueryBuilder', 'QueryBuilderRow'],
//	views : ['QueryBuilderRow'],  //per recommendation of dev-all, moved QueryBuilder into requires
	requires : ['SearchTool.util.dom'],
//	stores : ['SearchFields'],
//	stores : ['QBuilderOperators'],
	init : function() { 
		this.control({
					'button[itemId=btnBuildQuery]' : {
						click : this.buildQuery
					}
				});
	},//init
	buildQuery : function(b) {
		var dest = Ext.ComponentQuery.query('#txtSearchBoolean')[0]; 
		var qbrows = b.up('panel').items.items;
		var row, s;
		var newval = ''; //to prevent missing entire row data from overwriting prev values 
		for (var i = 0; i < qbrows.length; i++) {
			tmp = '( ';
			row = qbrows[i];
			tmp += SearchTool.util.dom.qBuilderRowValidations(i,row)+ ' ) '+ row.down('hidden').getValue()+'\r\n';
			newval += tmp;
		}
		dest.setValue(newval);
	}

});