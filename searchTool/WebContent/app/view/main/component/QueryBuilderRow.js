var fieldStore = new Ext.data.SimpleStore({
			fields : ['fieldname', 'fieldvalue'],
			data : [['field1', 'FIELD1'], ['field2', 'FIELD2'], ['field3', 'FIELD3'],
					['field4', 'FIELD4']]
		});

var operStore = new Ext.data.SimpleStore({
			fields : ['opername', 'opervalue'],
			data : [[' = ', '='], [' > ', '>'], [' < ', '<'], ['>=', '>='],
					['<=', '<='], ['NOT', 'NOT'], ['BETWEEN', 'BETWEEN'], ['IS NOT NULL', 'IS NOT NULL'],
					['IS NULL', 'IS NULL']]
		});

var andorStore = new Ext.data.SimpleStore({
			fields : ['opername', 'opervalue'],
			data : [[' AND ', 'AND'], [' OR ', 'OR']]
		});

Ext.define('SearchTool.view.main.component.QueryBuilderRow', {
			extend:'Ext.container.Container',
			alias:'widget.builderRow',
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
					    afterrender: function () {
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
					width : '15%'
				}
				, 
				{
					xtype : 'textfield',
					itemId : 'val1',
					width : '18%',
					emptyText : '(Enter value...)'
				}, 
				{
					xtype : 'combo',
					itemId : 'cboxAndOr',
					cls : 'cboxAndOr',
					store : andorStore, 
//					hasfocus : true,
					displayField : 'opername',
					valueField : 'opervalue',
					hiddenName : 'ccaction',
//					disabled : true,
					typeAhead : true,
					emptyText : '(AND/OR)',
					forceSelection : true,
					enforceMaxLength : true,
					matchFieldWidth : true,
					mode : 'local',
					width : '12%'
				}
				, 
				{
					xtype : 'textfield',
					itemId : 'val2',
//					disabled : true,
					width : '17%',
					emptyText : '(Enter value...)'
				}
				, 
				{
					xtype : 'button',
					itemId : 'btnDel', 
					iconCls : 'icon-btnDelete',
					text : 'DEL',
					width : '7%',
					handler : function(t,e,o) {
							t.up('panel').remove(t.up('container'));
					}
				},
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
					handler : function() { 
							var b = this.prev('hidden'); 
							if (!this.up('container').nextNode() || !b.getValue() )
								this.up('panel').add(Ext.create('SearchTool.view.main.component.QueryBuilderRow'));
							b.setValue(' AND ');
							this.addCls('qbuilderBtnSelected');
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
					handler : function() { 
							var b = this.prev('hidden'); 
							if (!this.up('container').nextNode() || !b.getValue() )
								this.up('panel').add(Ext.create('SearchTool.view.main.component.QueryBuilderRow'));
							b.setValue(' OR ');
							this.prev('button').removeCls('qbuilderBtnSelected');
							this.prev('button').addCls('qbuilderBtnDeselected');
							this.addCls('qbuilderBtnSelected');
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