Ext.define('SearchTool.util.dom', {
	statics:{
		highlightTimer : 700,
		modTabChildren : function(querykey,pos,k,obj,highlight){
			var parent = Ext.ComponentQuery.query(querykey)[0];
			if (parent.disabled)
				parent.enable();
			parent.insert(pos,obj);
			if (highlight) { //only run if !null, <> 0, <> false 
				parent.items.items[pos].addCls('tabHighlight');
				parent.tab.addCls('tabHighlight'); 
				Ext.Function.defer(function(){
						parent.items.items[pos].removeCls('tabHighlight');
						parent.tab.removeCls('tabHighlight');
						},SearchTool.util.dom.highlightTimer);
			}//if 
		}
	}
});