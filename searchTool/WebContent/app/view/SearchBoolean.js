var z =  Ext.create('SearchTool.view.QueryBuilder',{ 
									renderTo:Ext.getBody()
		});

Ext.define('SearchTool.view.SearchBoolean', {
			extend : 'Ext.form.Panel',
			alias : 'widget.searchBoolean',
			itemId : 'pnlSearchBoolean',
			url: SearchTool.config.Config.searchUrl, 
			requires : ['SearchTool.view.QueryBuilder','SearchTool.config.Config'], 
			height:115,
			dockedItems : [{
				dock : 'top',
				xtype : 'toolbar',
				items : [{
							xtype : 'tbspacer',
							width : 3
						}, {
							text : 'Query Builder',
							tooltip : 'Launch Query Builder',
							handler : function(b){
								if (z.hidden || z.collapsed) { 
									var parent = Ext.ComponentQuery.query('#pnlSearchBoolean')[0];
									z.setHeight(parent.getHeight()*2);
									z.setWidth(parent.getWidth());
									z.center();
									z.expand();
									z.show(); 	
								}
								else if (!z.collapsed){
									z.center();
									z.hide();
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
							text : 'Help',
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
						,
						{
							xtype : 'checkbox',
							fieldLabel:'Save',
							labelStyle:'width:10px;'
						}, {
							xtype : 'tbspacer',
							width : 2
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'tbspacer',
							width : 2
						}, {
							text : 'Search',
							handler : function(){
								this.up('form').getForm().submit();
							}
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
						emptyText: '(Error checking not available)', 
						bodyStyle: 'border: none; background-color:#dfe8f5;',
						hideBorders:true,
						width:'100%',
						height:'90%'
					}]
		}

);