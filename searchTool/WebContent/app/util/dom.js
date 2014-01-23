//getEl() in IE causing issues - lines 55,57

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
               //this gets the container- bad
			var parent = Ext.ComponentQuery.query(querykey)[0];
			if (parent.disabled)
				parent.enable();
			parent.insert(pos,obj);
			if (boolHighlight) { //only run if !null, <> 0, <> false
				parent.items.items[pos].addCls('tabHighlight');
                parent.items.items[pos].getEl().highlight();
				parent.tab.addCls('tabHighlight');
				parent.tab.getEl().highlight();
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
		},//addTabChild
		toggleCheckBoxArray : function(val, arr){
			Ext.each(arr, function(prod,idx){
					if (idx > 0){
						prod.setValue(val);
					}
				} );
		},
		qBuilderRowValidations : function (i,row,last){
			var escapeChar = SearchTool.config.Config.dbEscapeChar,
			    tmp = '', valProd = '', valField = '', valOper = '', t1 = '', t2 = '', valConn='',
                operDelim = ['IN','NOT IN'],
                setStart = SearchTool.config.Config.qbuilderSetStart,
                setEnd = SearchTool.config.config.qbuilderSetEnd,
                operFlex = ['IN','NOT IN','=','!=','>','<','>=','<='],
                operOne = ['NULL','NOT_NULL'],
                operTwo = ['BETWEEN'];

//                fnNone = ['IS NULL','IS NOT NULL'],
//                fnUnary = ['=','!='],
//                fnBinary = ['>','<','>=','<=']

			//get row component/elements
            valProd = row.down('combo');
            valField = valProd.next('combo');
            valOper = valField.next('combo');
            t1 = valOper.next('textfield');
            valConn = t1.next('combo');
            t2 = valConn.next('textfield');

            valProd = (valProd.getValue() || ''); // ? '['+valProd.getValue()+']' : '');
			valField = (valField.getValue() || ''); //? '['+valField.getValue()+']' : '');
            valOper = (valOper.getValue() || '');

			//get textfield and escape out single quotes
			//t1 = t1.getValue().trim().replace("'","\\'");
			t1 = (t1.getValue().trim() && t1.getValue().trim().length > 0 ? t1.getValue().trim() : '');

			//get AND/OR combo box
			//valConn = row.down('combo').next('combo').next('combo').getValue();
			valConn = (valConn.getValue() || '');
			//if AND/OR is chosen or BETWEEN, then get 2nd textfield
				//t2 = row.down('combo').next('combo').next('textfield').next('combo').next('textfield').getValue().trim().replace("'","\\'");
				t2 = (t2.getValue().trim() && t2.getValue().trim().length > 0 ? t2.getValue().trim() : '');

			tmp = "( {0}:'{1}' {2} {3} {4} {0}:'1' {2} {5} ) {6}";//"( {0}.{1} {2} {3} {4} {0}.{1} {2} {5} ) {6}";
			errMsg = '-- ERROR - Line'+(i+1)+': ';

			//CHECK INPUTS
            //missing a req field
			if (valProd === '' || valField === '' || valOper === '')
				return errMsg+'Missing a required value - Check that Product, Field, and Operator all have a selection';

			//(oper does not need 2 datapoints) but (connector is used)..so 2 datapoints are now reqd...but (one or more) is missing
//            if (valOper !== 'BETWEEN' &&
//                valConn!=='' && (t1==='' || t2===''))
//				return errMsg+'Missing a required field - Use of connector requires 2 values to be entered';

            //1 ARG ONLY
            // can be have two received ...and/or is cleared out
//            if (operOne.indexOf(valOper) != -1) && (t1 == '' | t2 == ''))

			if ((valOper == 'IS NULL' || valOper == 'IS NOT NULL') && (t1 =='' && t2  =='')) {//for these comparators, t1 should be null/empty, but not t2
				tmp = "( {0}.{1} {2} ) {3}";
				return Ext.String.format(tmp,valProd,valField,valOper,last);
			}
			//2 ARGS ONLY
			if (valOper == 'BETWEEN' ) { //BETWEEN oper chosen
				tmp = "( {0}.{1} {2} {3} AND {4} ) {5}";
				last = last || '';
				//ONLY 0 OR 1 RECEIVED
				if (t1 == '' || t2 == '') //BETWEEN needs 2 fields
					return errMsg+'Bad syntax - The selected operation requires 2 values';
				else if (t1 != '' && t2 !='') //BETWEEN needs 2 fields
					return Ext.String.format(tmp,valProd,valField,valOper,t1,t2,last);
			}
			//1 OR 2 ARGS
			//BOTH GIVEN
               //error mssg if no connector OR BOTH MISSING OR
               //good if connector and both given
			else if ((valOper == '=' || valOper == '<' || valOper == '>' || valOper == '>=' || valOper == '<=' || valOper == 'NOT EQUAL TO' || valOper == 'CONTAINS' || valOper == 'DOES NOT CONTAIN') && (t1 != '' && t2 != '')) //all other valOper's
				return (valConn != '' ? Ext.String.format(tmp,valProd,valField,valOper,t1,valConn,t2,last) : errMsg+'Bad syntax - This query statement requires a Connector - Select AND or OR from the dropdown box'); //should make sure valConn has AND or OR chosen
			//1ST MISSING, 2ND RECEIVED - OK
			else if ((valOper == '=' || valOper == '<' || valOper == '>' || valOper == '>=' || valOper == '<=' || valOper == 'NOT EQUAL TO' || valOper == 'CONTAINS' || valOper == 'DOES NOT CONTAIN') && (t1 == '' && t2 != '')) //all other valOper's
				{	tmp = "( {0}.{1} {2} {3} ) {4}"; //should ask they clear valConn if it has data
					return Ext.String.format(tmp,valProd,valField,valOper,t2,last);
				}
			//1ST RECEIVED, 2ND RECEIVED - OK
			else if ((valOper == '=' || valOper == '<' || valOper == '>' || valOper == '>=' || valOper == '<=' || valOper == 'NOT EQUAL TO' || valOper == 'CONTAINS' || valOper == 'DOES NOT CONTAIN' ) && (t1 != '' && t2 == '')) //all other valOper's
				{	tmp = "( {0}.{1} {2} {3} ) {4}"; ////should ask they clear valConn if it has data
					return Ext.String.format(tmp,valProd,valField,valOper,t1,last);
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