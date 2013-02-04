Ext.define('SearchTool.controller.SearchFields', {
	extend : 'Ext.app.Controller',
	models: ['SearchField'],
	views : ['main.component.QueryBuilder', 'main.component.QueryBuilderRow'],
//	views : ['QueryBuilderRow'],  //per recommendation of dev-all, moved QueryBuilder into requires
	requires : ['SearchTool.util.dom'],
//	stores : ['SearchFields'],
//	stores : ['QBuilderOperators'],
	init : function() {
		var me = this;
		me.control({
					'button[itemId=btnBuildQuery]' : {
						click : me.buildQuery
					}
				});
	},//init
	buildQuery : function(b) {
		var dest = Ext.ComponentQuery.query('#txtSearchBoolean')[0]; 
		var qbrows = b.up('panel').items.items;
		var row, s, tmpRow='';
		var last = '';
		var newval = ''; //to prevent missing entire row data from overwriting prev values 
		for (var i = 0; i < qbrows.length; i++) {
			row = qbrows[i];
			tmpRow = SearchTool.util.dom.qBuilderRowValidations(i,row);
			last = row.down('hidden').getValue();
			tmp = (tmpRow == '' ) ? '' : '( '+tmpRow+' )' + last + '\r\n' 
			newval += tmp;
			tmpRow = '';
		}
		dest.setValue(newval.slice(0,-(last.length+2))); //always remove last 2 chars
		
	}

});