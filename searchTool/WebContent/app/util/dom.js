Ext.define('SearchTool.util.dom', {
	statics:{
		highlightTimer : 700,
		modTabChildren : function(querykey,pos,obj,boolHighlight){
			var parent = Ext.ComponentQuery.query(querykey)[0];
			if (parent.disabled)
				parent.enable();
			var s = Ext.select('tabHighlight');
			parent.insert(pos,obj);
			if (boolHighlight) { //only run if !null, <> 0, <> false 
				parent.items.items[pos].addCls('tabHighlight');
				parent.tab.addCls('tabHighlight'); 
				Ext.Function.defer(function(){
						//clear out all highlighting
						Ext.each(parent.items.items, function(item,idx) {
							item.removeCls('tabHighlight');
						});
						s.removeCls('tabHighlight');
						parent.tab.removeCls('tabHighlight');
						},this.highlightTimer);
			}//if 
		}//modTabChildren
		,
		
		toggleCheckBoxArray : function(val, arr){
			Ext.each(arr, function(prod,idx){
					if (idx > 0){
						prod.setValue(val);
					}
				} ); 
		}
	}
});