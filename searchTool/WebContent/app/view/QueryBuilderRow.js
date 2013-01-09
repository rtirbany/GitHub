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

Ext.define('SearchTool.view.QueryBuilderRow', {
			//extend:'Ext.panel.Panel', 
			extend:'Ext.container.Container',
			alias:'widget.builderRow',
			layout : 'hbox', 
			items : [	
				{
					xtype : 'combo',
					itemId : 'cboxFields',
					cls : 'cboxFields',
					store : fieldStore,
					// fieldLabel: 'Search By Keyword',
					// labelSeparator:':',
					hasfocus : true,
					displayField : 'fieldname',
					valueField : 'fieldvalue',
					hiddenName : 'ccaction',
					emptyText : '(Select Field)',
					typeAhead : true,
					mode : 'local',
					width : '15%'
				}, 
				{
					xtype : 'combo',
					itemId : 'cboxOpers',
					cls : 'cboxOpers',
					store : operStore, 
					hasfocus : true,
					displayField : 'opername',
					valueField : 'opervalue',
					hiddenName : 'ccaction',
					emptyText : '(Select Operation)',
					typeAhead : true,
					mode : 'local',
					width : '20%'
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
					hasfocus : true,
					displayField : 'opername',
					valueField : 'opervalue',
					hiddenName : 'ccaction',
					disabled : true,
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
					disabled : true,
					width : '18%'
				}
				, 
				{
					xtype : 'button',
					itemId : 'btnDel',
					text : '-',
					disabled : true,
					width : '4%',
					handler : function(t,e,o) {
								t.up('panel').remove(t.up('container'));
							}
				}
				, 
				{
						xtype : 'button',
						itemId : 'btnAnd',
						text : 'AND',
						width : '5%',
						handler : function() { 
								var x =  Ext.create('SearchTool.view.QueryBuilderRow'); 
								this.up('panel').add(x)
							}
				},
				{
						xtype : 'button',
						itemId : 'btnOr',
						text : 'OR',
						width : '5%',
						handler : function() { 
								var x =  Ext.create('SearchTool.view.QueryBuilderRow'); 
								this.up('panel').add(x)
							}
				}
			]
			,
			init : function() {
					this.control({
						'textfield[itemId=val1]' : {
							change : this.toggleFields 
						}
					}
				);// control function
			}//init
			,
			toggleFields : function(f,e){
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