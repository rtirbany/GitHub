var fieldStore = new Ext.data.SimpleStore({
			fields : ['fieldname', 'fieldvalue'],
			data : [['field1', 'FIELD1'], ['field2', 'FIELD2'], ['field3', 'FIELD3'],
					['field4', 'FIELD4']]
		});

var operStore = new Ext.data.SimpleStore({
			fields : ['opername', 'opervalue'],
			data : [['=', '='], ['>', '>'], ['<', '<'], ['>=', '>='],
					['<=', '<='], ['NOT', 'NOT'], ['BETWEEN', 'BETWEEN'], ['CONTAINS','CONTAINS'],
					['DOES NOT CONTAIN','DOES NOT CONTAIN'],['IS NOT NULL', 'IS NOT NULL'],
					['IS NULL', 'IS NULL']]
		});

var andorStore = new Ext.data.SimpleStore({
			fields : ['opername', 'opervalue'],
			data : [['AND', 'AND'], ['OR', 'OR']]
		});

Ext.define('SearchTool.view.main.component.QueryBuilderRow', {
			extend:'Ext.container.Container',
			alias:'widget.builderRow',
			requires : ['SearchTool.config.Config'],
			layout : 'hbox',
			items : [	
				{
					xtype : 'combo',
					itemId : 'cboxFields',
					cls : 'cboxFields',
//					store : 'SearchFields',
					store : fieldStore,
					// fieldLabel: 'Search By Keyword',
					// labelSeparator:':',
					hasfocus : true,
					forceSelection : true,
//					displayField : 'display',
//					valueField : 'value',
					displayField : 'fieldname',
					valueField : 'fieldvalue',
					hiddenName : 'ccaction',
					emptyText : '(Select Field)',
					typeAhead : true,
					triggerAction :'query',
					queryMode : 'local',
					width : '15%',
					handler : {
					    afterRender: function () {
					    Ext.Msg.alert('hi');
					    this.focus();	
					    }
					
					}
				}, 
				{
					xtype : 'combo',
					itemId : 'cboxOpers',
					cls : 'cboxOpers',
//					store : 'QBuilderOperators',
					store : operStore, 
//					hasfocus : true,
//					displayField : 'display',
//					valueField : 'value',
					displayField : 'opername',
					valueField : 'opervalue',
					hiddenName : 'ccaction',
					emptyText : '(Select Oper)', 
					forceSelection : true,
					typeAhead : true,
					triggerAction :'query',
					shrinkWrap:1,
					selectOnFocus:false,
					queryMode : 'local',
					width : '15%',
					enableKeyEvents : true,
					listeners : {
						'change' : function(t,n,o,opts){
							var ao = t.next('textfield').next('combo');
							var tf = t.next('textfield'); 
							var tf2 = t.next('textfield').next('combo').next('textfield');
							if (t.value == 'BETWEEN') {
								ao.setValue('AND');
								ao.disable();
							} 
							else if (t.value == 'IS NULL' || t.value == 'IS NOT NULL') {
								tf.setValue(''); 
								tf.disable();
								ao.disable();
								tf2.setValue('');
								tf2.disable();
							}
							else {
								if (t.value != 'BETWEEN') {
									ao.setValue('');
									ao.enable();
									tf.enable();
								}
								tf2.enable();
							}
								
						}
					}
				}
				, 
				{
					xtype : 'textfield',
					itemId : 'val1',
					width : '18%',
					emptyText : '(Enter value...)',
					regex: SearchTool.config.Config.qryBuilderTextFieldRegex,
					regexText: SearchTool.config.Config.qryBuilderErrText,
					enableKeyEvents : true
//					,
//					listeners:{ 
//						'keyup' : function (t,e,o){
//							var ao = t.next('combo');
//							if (t.prev('combo').value != 'BETWEEN' && t.value.trim() != '')
//							   ao.enable(); 
//						}
						 
//					}
//		'load' : 
//			 //TODO: sort this by id..done?
//			 function(store,records,success, operation){ 
////			 	Ext.Msg.alert(store.getAt(0).getId()+''); 
//			 	debugger;
				}, 
				{
					xtype : 'combo',
					itemId : 'cboxAndOr',
					cls : 'cboxAndOr',
					store : andorStore, 
					minChars:1,
					disabled : true,
					displayField : 'opername',
					valueField : 'opervalue',
					hiddenName : 'ccaction',
					typeAhead : true,
					emptyText : '(AND/OR)',
					allowBlank : true,
					enforceMaxLength : true,
					matchFieldWidth : true,
					mode : 'local',
					width : '12%'
				}
				, 
				{
					xtype : 'textfield',
					itemId : 'val2', 
					width : '17%',
					emptyText : '(Enter value...)'
				}
				,  
				{
					xtype : 'hidden',
					value : ''
				}
				, 
				{
					xtype : 'button',
					itemId : 'btnAnd',
					iconCls : 'icon-btnAdd',
					text : 'AND',
					width : '7%',
					handler : function(t) { 
							var b = this.prev('hidden'); 
							if (!this.up('container').nextNode() || !b.getValue() ) {
								this.up('panel').add(Ext.create('SearchTool.view.main.component.QueryBuilderRow'));
								t.up('panel').items.items[t.up('panel').items.items.length-2].down('button').next('button').next('button').hide(); //prev row del btn
							}
							b.setValue(' AND ');
							this.addCls('qbuilderBtnSelected');
							t.up('panel').items.items[t.up('panel').items.items.length-1].down('button').next('button').next('button').show(); 
							this.next('button').removeCls('qbuilderBtnSelected');
							this.next('button').addCls('qbuilderBtnDeselected');
							
					}
				},
				{
					xtype : 'button',
					itemId : 'btnOr',
					iconCls : 'icon-btnAdd',
					text : 'OR',
					width : '6.5%',
					handler : function(t) { 
							var b = this.prev('hidden'); 
							if (!this.up('container').nextNode() || !b.getValue() ) {
								this.up('panel').add(Ext.create('SearchTool.view.main.component.QueryBuilderRow'));
								t.up('panel').items.items[t.up('panel').items.items.length-2].down('button').next('button').next('button').hide(); //prev row del btn
							}
							b.setValue(' OR ');
							t.up('panel').items.items[t.up('panel').items.items.length-1].down('button').next('button').next('button').show(); 
							this.prev('button').removeCls('qbuilderBtnSelected');
							this.prev('button').addCls('qbuilderBtnDeselected');
							this.addCls('qbuilderBtnSelected');
					}
				},
				{
					xtype : 'button',
					itemId : 'btnDel', 
					iconCls : 'icon-btnDelete',
					text : 'DEL',
					hidden : true,
					width : '7%',
					handler : function(t,e,o) { 
							var l = t.up('panel').items.items.length; //length of the array of items
							if (l > 2)
								t.up('panel').items.items[l-2].down('button').next('button').next('button').show(); //prev row del btn
								
							t.up('panel').items.items[t.up('panel').items.items.length-2].down('hidden').setValue(''); //prev row hidden
							
							t.up('panel').items.items[t.up('panel').items.items.length-2].down('button').next('button').removeCls('qbuilderBtnSelected'); //prev row del btn
							t.up('panel').items.items[t.up('panel').items.items.length-2].down('button').next('button').removeCls('qbuilderBtnDeselected');
							t.up('panel').items.items[t.up('panel').items.items.length-2].down('button').removeCls('qbuilderBtnSelected'); //prev row del btn
							t.up('panel').items.items[t.up('panel').items.items.length-2].down('button').removeCls('qbuilderBtnDeselected');
							t.up('panel').remove(t.up('container'));
					}
				}
			]
			,
			init : function() {
					this.control({
						'textfield[itemId=val1]' : {
							change : this.toggleFieldEnable 
						}
					}
				);// control function
			}//init
			,
			toggleFieldEnable : function(f,e){
					if (this.prev('combo').prev('combo').value && this.prev('combo').value && r.value.length > 0) { 
							this.next('combo').enable();
							this.next('textfield').enable();
							this.up('form').down('button').enable();
						}
							//val2.disabled = false;
						else {
							this.next('combo').value='';
							this.next('combo').disable();
							this.next('textfield').value='';
							this.next('textfield').disable();
							this.up('form').down('button').disable();
							}
				
			}//toggleFields
		});