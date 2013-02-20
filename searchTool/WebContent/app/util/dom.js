Ext.define('SearchTool.util.dom', {
	requires : ['SearchTool.config.Config'],
	statics:{
		//timer for highlighting
		highlightTimer : 700,
		
		executeSearch : function(btn,e){ 
				var valKeyword = null, valBool = null, boolSaveQuery = null, boolRestrictedQuery = null;
                    valKeyword = Ext.ComponentQuery.query('#cboxSearch')[0].getValue().trim();
		   			valBool = Ext.ComponentQuery.query('#txtSearchBoolean')[0].getValue().trim();
		   			boolSaveQuery = Ext.ComponentQuery.query('#chkSaveQuery')[0].getValue();
		   		 	boolRestrictQuery = Ext.ComponentQuery.query('#chkSummaryOnlySearch')[0].getValue();  
                         
		   		if ((valKeyword && valKeyword.length > 0) || (valBool && valBool.length > 0)) {
		   			var k = 'kw='+valKeyword+';bool='+valBool+';';
					var t = 'title\ntest'
					//var b = Ext.create('SearchTool.view.linkbutton',{ itemId:'itemId="1-btnWrap"', text:'Search', url:k, tooltip:'hi\ntest'});
					var b = Ext.create('SearchTool.view.linkbutton',{ text:'Query', url:k, tooltip:t}); 
					if (boolSaveQuery) {
						target='#tbSaved'
						}
					else 
					   	target='#tbHistory'
					SearchTool.util.dom.addTabChild(target,0,b,true);//,tooltip:"Ext.Date.format(new Date(),'F d g:i a')"},true);
					//update reload keywords & sources/product stores
					
					//ajax request
//					Ext.Ajax.request({
//						url:SearchTool.config.Config.sources,
//							success: function(resp,opts){  
//								//setSourcesStore(resp.responseText);
//						},
//						failure:function(resp,opts){}
//					});
				}//if
		}//executeSearch
		,
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
		qBuilderRowValidations : function (i,row,last){
			var escapeChar = SearchTool.config.Config.dbEscapeChar; 
			var tmp = '', f1 = '', c1 = '', t1 = '', t2 = '', cb='';
			//get first two combo box values  & append to string
			f1 = row.down('combo').getValue(); 
			f1 = (f1 ? f1 : '');
			
	   	 	c1 = row.down('combo').next('combo').getValue(); 
	   	 	c1 = (c1 ? c1 : '');
	   	 	
			//get textfield and escape out single quotes
			t1 = row.down('combo').next('combo').next('textfield').getValue().trim().replace("'","\\'"); 
			t1 = (t1 ? "'"+t1+"'" : '');
			
			//get AND/OR combo box
			cb = row.down('combo').next('combo').next('combo').getValue(); 
			cb = (cb ? cb : '');
			//if AND/OR is chosen or BETWEEN, then get 2nd textfield
				t2 = row.down('combo').next('combo').next('textfield').next('combo').next('textfield').getValue().trim().replace("'","\\'");
				t2 = (t2 ? "'"+t2+"'" : '');
				
			tmp = "( {0} {1} {2} {3} {0} {1} {4} ) {5}";
			errMsg = '-- ERROR - Line'+(i+1)+':';
			
			//CHECK INPUTS
			if (f1 == '' || c1 == '')
				return errMsg+'Missing a required field - Check Fieldname and/or Operator fields';
			if (c1 != 'BETWEEN' && cb!='' && (t1=='' || t2==''))
				return errMsg+'Missing a required field - Use of connector requires 2 arguments/values';
			//1 ARG ONLY
			//CAN BE HAVE TWO RECEIVED
			else if (c1 == 'IS NULL' || c1 == 'IS NOT NULL') {//for these comparators, t1 should be null/empty, but not t2
				tmp = "( {0} {1} ) {2}";
				return Ext.String.format(tmp,f1,c1,last);	
			}
			//2 ARGS ONLY
			else if (c1 == 'BETWEEN' ) {
				tmp = "( {0} {1} {2} AND {3} ) {4}";
				last = last ? last : '';
				//ONLY 0 OR 1 RECEIVED
				if (t1 == '' || t2 =='') //BETWEEN needs 2 fields
					return errMsg+'Bad syntax - This operation requires 2 arguments/values';
				else if (t1 != '' && t2 !='') //BETWEEN needs 2 fields
					return Ext.String.format(tmp,f1,c1,t1,t2,last);
			}
			//1 OR 2 ARGS
			//BOTH MISSING
			else if ((c1 == '=' || c1 == '<' || c1 == '>' || c1 == '>=' || c1 == '<=' || c1 == 'NOT EQUAL TO' || c1 == 'CONTAINS' || c1 == 'DOES NOT CONTAIN') && (t1 != '' && t2 != '')) //all other c1's
				return (cb != '' ? Ext.String.format(tmp,f1,c1,t1,cb,t2,last) : errMsg+'Bad syntax - This query statement requires a Connector - Select AND or OR from the dropdown box'); //should make sure cb has AND or OR chosen
			//1ST MISSING, 2ND RECEIVED - OK
			else if ((c1 == '=' || c1 == '<' || c1 == '>' || c1 == '>=' || c1 == '<=' || c1 == 'NOT EQUAL TO' || c1 == 'CONTAINS' || c1 == 'DOES NOT CONTAIN') && (t1 == '' && t2 != '')) //all other c1's
				{	tmp = "( {0} {1} {2} ) {3}"; //should ask they clear cb if it has data
					return Ext.String.format(tmp,f1,c1,t2,last);
				}
			//1ST RECEIVED, 2ND RECEIVED - OK
			else if ((c1 == '=' || c1 == '<' || c1 == '>' || c1 == '>=' || c1 == '<=' || c1 == 'NOT EQUAL TO' || c1 == 'CONTAINS' || c1 == 'DOES NOT CONTAIN' ) && (t1 != '' && t2 == '')) //all other c1's
				{	tmp = "( {0} {1} {2} ) {3}"; ////should ask they clear cb if it has data
					return Ext.String.format(tmp,f1,c1,t1,last);
				}
			else return errMsg+'Bad syntax - This operation requires at least 1 argument';
			 
		}
		,
		exportStore : function (params, url){
			var id, frame, form, hidden, callback;
			frame = Ext.fly('exportframe').dom;
			frame.src = Ext.SSL_SECURE_URL;
			
			form = Ext.fly('exportform').dom;
			form.action = url;
			hidden = document.getElementById('excelconfig');
			hidden.value = Ext.encode(params);
		}
	}
});