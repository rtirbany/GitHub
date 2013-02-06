var errWin = Ext.create('Ext.window.Window',{title:'Errors found',height:250,width:270,hidden:true,layout:'fit',items:[{xtype:'grid',border:false, columns:[{header:'Line #'},{header:'Error'}]}],buttons:Ext.Msg.OKCANCEL})

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
		var row, s, errArr = '', newval = '', tmpRow='', last = '', ln='',msg='';
		for (var i = 0; i < qbrows.length; i++) {
			row = qbrows[i];
			last = row.down('hidden').getValue();
			tmpRow = SearchTool.util.dom.qBuilderRowValidations(i,row,last);
			//tmp = (tmpRow == '' ) ? '' : '( '+tmpRow+' )' + last + '\r\n'
			//tmp += '\r\n';
			//TODO: Error msg popup? 1 of 2
//			if (tmpRow.indexOf('-- ERROR') > -1) {
//				errEl = tmpRow.substring(15);
//				ln = errEl.substring(0,errEl.indexOf(':'));
//				msg = errEl.substring(errEl.indexOf(':')+1); 
//				errArr += tmpRow + '\r\n';
//			}
//			else
				newval  += tmpRow + '\r\n';
			tmpRow = '';
		}
		dest.setValue(newval.slice(0,-(last.length+2))); //always remove last 2 chars
		//TODO: Error msg popup? 2 of 2
//		if (errArr != '') {
//			//Ext.Msg.show({title:'Errors found',value:errArr,buttons:Ext.Msg.OKCANCEL,readOnly:true,multiline:true});
//			errWin.items.items.data = errArr;
//			errWin.center();
//			errWin.show();
//		}
		
	}

});