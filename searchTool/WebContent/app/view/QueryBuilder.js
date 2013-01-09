Ext.define('SearchTool.view.QueryBuilder', {
			extend : 'Ext.form.Panel',
			itemId : 'queryBuilder', 
			title : 'Query Builder',
			floating : true,
			centered : true,
			hidden : true,
			requires : ['SearchTool.view.QueryBuilderRow'],
			border : false, 
			overflowX :'hidden', 
			overflowY :'auto', 
			tools : [
				{
					xtype : 'tool',
					type : 'close',
					handler : function(e, target, p, tool) {
							Ext.Msg.confirm('Exit Query Builder','Are you sure you wish to exit?');
							this.up('panel').hide();
					}

				}
			],
			dockedItems : [ 
			{
				xtype : 'toolbar',
				dock : 'bottom',
				layout : {
					type : 'hbox',
					pack : 'center'
				},
				items : [
						{
							xtype : 'tbspacer',
							width : 2
						},
						{
							text : 'Help',
							handler : function() {
								Ext.Msg.alert('some querybuilder help page');
							}
						},
						{
							xtype : 'tbfill'
						},
						{
							xtype : 'tbspacer',
							width : 2
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'tbspacer',
							width : 2
						}, 
						{
							xtype : 'tbfill' 
						}, {
							text : 'Clear All',
							handler : function() {
								var p = this.up('panel');
								p.removeAll(); 
								p.add({xtype:'builderRow'});
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
						}, {
							text : 'Build Query',
							handler : function(b) {
								var dest = Ext.ComponentQuery.query('#txtSearchBoolean')[0];
								var qbrows = b.up('panel').items.items;
								var row, s,tmp;
								var newval=''; //to prevent missing entire row data from overwriting prev values 
								for (var i = 0; i < qbrows.length; i++) {
									tmp = '( ';
        							row = qbrows[i];
        							tmp = ((s = row.down('combo').getValue()) ?  tmp += s : tmp);
        							tmp = ((s = row.down('combo').next('combo').getValue()) ? tmp += ' '+ s : tmp);
        							tmp = ((s =	row.down('combo').next('combo').next('textfield').getValue().trim()) ? tmp += " '"+ s +"'": tmp); 
        							newval += tmp + ' )\r\n';
    							} 
    							dest.setValue(newval);
							
							}
						}, {
							xtype : 'tbspacer',
							width : 3
						}
						]// toolbar items
			} // toolbar
			] //dockedItems
			, 
			items:  [ 
				{ 
				xtype:'builderRow'
				}  
			]  
		}

);