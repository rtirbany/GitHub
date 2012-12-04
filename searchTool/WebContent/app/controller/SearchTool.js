Ext.define('SearchTool.controller.SearchTool',{
	extend:'Ext.app.Controller',
	views:['SearchDemo'],
	model:['Product'],
	stores:['Products'],
	
	init:function(){
		this.control({
			'button[itemId=btnSearch]' : {
				click: this.executeSearch
			}	
		});
	},
	
	executeSearch:function(btn,e){ 
			var val = Ext.ComponentQuery.query('#cboxSearch')[0].getValue().trim();
				if (val && val.length > 0) {
					var k = '<a href="'+val+'"> '+val+'</a>';
					var tbHist = Ext.ComponentQuery.query('#tbHistory')[0];
					if (tbHist.disabled)
						tbHist.enable(); 
					tbHist.tab.addCls('tabHighlight');
					tbHist.insert(0,{xtype:"displayfield",border:false,value:k,tips:"hi",qtips:"dd",tooltip:"Ext.Date.format(new Date(),'F d g:i a')"});
					var newSearchEntry = tbHist.items.items[0];
					newSearchEntry.addCls('tabHighlight');
					Ext.Function.defer(function(){
						tbHist.tab.removeCls('tabHighlight');
						newSearchEntry.removeCls('tabHighlight');
						},700);
					
				}//if
			}//executeSearch
	
});