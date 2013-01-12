Ext.define('SearchTool.util.dom', {
	requires : ['SearchTool.config.Config'],
	statics:{
		//timer for highlighting
		highlightTimer : 700,
		
		/* addChild - adds children to a parent
		 * querykey - the key for the paret object
		 * pos - the position to add the child to
		 * obj - the item being added
		 * boolHighlight - whether to highlight or not 
		 * */
		addTabChild : function(querykey,pos,obj,boolHighlight){
			var parent = Ext.ComponentQuery.query(querykey)[0];
			if (parent.disabled)
				parent.enable(); 
			parent.insert(pos,obj);
			if (boolHighlight) { //only run if !null, <> 0, <> false 
				parent.items.items[pos].addCls('tabHighlight');
				parent.tab.addCls('tabHighlight'); 
				Ext.Function.defer(function(){
						//clear out all highlighting...
						//TODO: Ext.select not grabbing right, should use Ext.fly by itemId
						//TODO: parent.tab
						Ext.each(parent.items.items, function(item,idx) {
							item.removeCls('tabHighlight');
						}); 
						parent.tab.removeCls('tabHighlight');
						},this.highlightTimer);
			}//if 
		}//addTabChild
		,
		removeTabChild : function(querykey,obj,boolDestroy){
			Ext.Msg.confirm('','You are about to remove this item.  Please confirm.');
			var parent = Ext.ComponentQuery.query(querykey)[0];
			if (parent)
				parent.remove(obj,boolDestroy);
		},
		
		toggleCheckBoxArray : function(val, arr){
			Ext.each(arr, function(prod,idx){
					if (idx > 0){
						prod.setValue(val);
					}
				} ); 
		},
		qBuilderRowValidations : function (i,row){
			var escapeChar = SearchTool.config.Config.dbEscapeChar; 
			var tmp = '', tmpS = '';
	   	 	tmp += ((s = row.down('combo').getValue()) ? s : '');
			tmp += ((s = row.down('combo').next('combo').getValue()) ? ' ' + s : '');
			//escape out single quotes
			tmpS = row.down('combo').next('combo').next('textfield').getValue().trim();
			tmpS = tmpS.indexOf("'") >= 0 ? tmpS.replace("'","\\'") : tmpS;
			tmp += ( tmpS ? " '" + tmpS + "'" : '');
			return tmp;
		}
	}
});