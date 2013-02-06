//TODO: clean this up
 Ext.define('SearchTool.view.main.component.SearchBoolean', {
			extend : 'Ext.form.Panel',
			border : false,
			alias : 'widget.searchBoolean',
			itemId : 'pnlSearchBoolean',
			url: SearchTool.config.Config.searchUrl, 
			requires : ['SearchTool.view.main.component.QueryBuilder','SearchTool.config.Config'], 
			height:115, 
			dockedItems : [{
				dock : 'top',
				xtype : 'toolbar',
				frame : false,
				border : 1,
				items : [ 
						{
							xtype : 'tbspacer',
							width : 3
						}, {
							text : 'Query Builder',
							iconCls : 'icon-qbuilder',
							tooltip : 'Launch Query Builder', 
							handler : function(b){
								var pnlQbuilder = this.up('panel').down('qbuilder');
								pnlQbuilder.center();
								pnlQbuilder.setHeight(Ext.ComponentQuery.query('#pnlSearchBoolean')[0].getHeight()*2);
								pnlQbuilder.setWidth(Ext.ComponentQuery.query('#pnlSearchBoolean')[0].getWidth());
								if (pnlQbuilder.hidden || pnlQbuilder.collapsed) { 
									pnlQbuilder.show();
									pnlQbuilder.expand();
								}
								else if (!pnlQbuilder.collapsed){ 
									pnlQbuilder.hide();
								} 
							}
						}
						,
						{
							xtype : 'tbspacer',
							width : 2
						}
						,
						{xtype : 'tbseparator'}
						,
						{
							xtype : 'tbspacer',
							width : 2
						}
						,
						{
							xtype: 'tool',
							type : 'help',
							tooltip : 'Some boolean help page',
							handler : function() {
								Ext.Msg.alert('some boolean help page');
							}
						},	
						{
							xtype : 'tbspacer',
							width : 2
						},
						{
							xtype : 'tbfill'
						},
						{
							text : 'Clear',
							iconCls : 'icon-btnClear',
							handler : function() {
								Ext.ComponentQuery.query('#txtSearchBoolean')[0].reset();
							}  
						}
						,
						{
							xtype : 'tbspacer',
							width : 2
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'tbspacer',
							width : 2
						}
						 , {
							text : 'Search',
							itemId : 'boolSearch',
							iconCls : 'icon-btnSearch',
							padding : 5
//							,
//							handler : function(){
//								this.up('form').getForm().submit();
//							}
						}, {
							xtype : 'tbspacer',
							width : 3
						}
						
						]
			}		 
			],

			items : [{
						xtype : 'textarea',
						itemId : 'txtSearchBoolean',
						name : 'txtSearchBoolean',
						cls : 'searchBooleanTextArea',
						border: false,
						emptyText: '(Error checking not available)', 
						style: 'border:none; !important;',
						bodyStyle: 'border: none; !important;',
						hideBorders:true,
						width:'100%',
						height:'90%'
					}
					,
					{
						xtype : 'qbuilder',
						itemId : 'pnlQbuilder',
						hidden : true
					}
					]
		}

);