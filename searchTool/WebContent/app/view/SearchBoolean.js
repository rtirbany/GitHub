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
							tooltip : 'Launch Query Builder',
							handler : function(){
								Ext.Msg.alert('query builder launched');
							}
						}, {
							xtype : 'tbspacer',
							width : 2
						}, {
							xtype : 'tbseparator'
						}, {
							xtype : 'tbspacer',
							width : 2
						}]
			}		// top

			, {
				xtype : 'toolbar',
				dock : 'bottom',
				items : [
						{
							text : 'Help',
							handler : function() {
								Ext.Msg.alert('some boolean help page');
							}
						},
						{
							xtype : 'tbfill' 
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
						value: '(edit not available)',
						disabled: true,
						itemId:'txtSearchBoolean',
						width : '100%'
					}]
		}

);