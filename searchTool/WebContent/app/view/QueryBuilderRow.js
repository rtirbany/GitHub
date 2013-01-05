var fieldStore = new Ext.data.SimpleStore({
			fields : ['fieldname', 'fieldvalue'],
			data : [['field1', 'f1'], ['field2', 'f2'], ['field3', 'f3'],
					['field4', 'f4']]
		});

var operStore = new Ext.data.SimpleStore({
			fields : ['opername', 'opervalue'],
			data : [[' = ', 'f1'], [' > ', 'f2'], [' < ', 'f3'], ['>=', 'f4'],
					['<=', 'f5'], ['<>', 'f6'], ['BETWEEN', 'f7'], ['IS NOT NULL', 'f8'],
					['IS NULL', 'f9']]
		});

var andorStore = new Ext.data.SimpleStore({
			fields : ['opername', 'opervalue'],
			data : [[' AND ', 'and'], [' OR ', 'or']]
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
					height : '130',
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
					width : '20%',
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
					width : '20%'
				}, 
				{
					xtype : 'button',
					itemId : 'btnDelBoolean',
					disabled : true,
					text : '-',
					width : '5%'
				}, 
				{
						xtype : 'button',
						itemId : 'btnAddBoolean',
						text : '+',
						width : '5%',
						handler : function() {
								Ext.Msg.alert('add new row');
								//var x = 
								//this.up('container').getForm().reset();
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
							Ext.Msg.alert(r.value);
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