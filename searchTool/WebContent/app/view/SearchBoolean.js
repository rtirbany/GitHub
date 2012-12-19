Ext.define('SearchTool.view.SearchBoolean', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.searchBoolean',
			height : 100,
			dockedItems : [{
				dock : 'top',
				xtype : 'toolbar',
				items : [{
							xtype : 'tbspacer',
							width : 3
						}, {
							text : 'Query Builder',
							tooltip : 'Launch Query Builder'
						}, {
							xtype : 'tbspacer',
							width : 2
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'tbspacer',
							width : 2
						}, {
							text : 'Help',
							handler : function() {
								Ext.Msg.alert('some boolean help page');
							}
						}]
			}		// top

			, {
				xtype : 'toolbar',
				dock : 'bottom',
				items : [{
							xtype : 'tbspacer',
							width : 300
						}, {
							text : 'Clear',
							handler : function() {
								Ext.ComponentQuery.query('#txtSearchBoolean')[0].reset();
							}
						}, {
							xtype : 'tbspacer',
							width : 2
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'tbspacer',
							width : 2
						}, {
							text : 'Search'
						}, {
							xtype : 'tbspacer',
							width : 3
						}]
			}],

			items : [{
						xtype : 'textarea',
						itemId:'txtSearchBoolean',
						width : '100%'
					}]
		}

);