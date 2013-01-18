// TODO: tabpanel tabs should be equal-sized and fit/stretched
// TODO: plain = true
// TODO: make this more lightweight

Ext.define('SearchTool.view.main.component.PnlSearch', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.pnlSearch',
	title : 'Filters',
	plain : true,
	defaults : {
		border : true, // required to display border around qrylink
		overflowY : 'auto',
		overflowX : 'hidden'

	},
	items : [ // contents of west panel within main Search page tab
	{
		itemId : 'tbFilters',
		header : false,
		title : 'Data Filters',
		layout : 'accordion',
		animate : true,
		items : [{
					title : 'facets',
					html : 'some facets option<BR>more options<BR>more options'
				}, {
					title : 'filterCategory1',
					html : 'some filter options<BR>more options<BR>more options'
				}, {
					title : 'filterCategory2',
					html : 'some filter options<BR>more options<BR>more options'
				}, {
					title : 'filterCategory1',
					html : 'some filter options<BR>more options<BR>more options'
				}, {
					title : 'filterCategory2',
					html : 'some filter options<BR>more options<BR>more options'
				}, {
					title : 'filterCategory1',
					html : 'some filter options<BR>more options<BR>more options'
				}, {
					title : 'filterCategory2',
					html : 'some filter options<BR>more options<BR>more options'
				}, {
					title : 'filterCategory1',
					html : 'some filter options<BR>more options<BR>more options'
				}, {
					title : 'filterCategory2',
					html : 'some filter options<BR>more options<BR>more options'
				}, {
					title : 'filterCategory1',
					html : 'some filter options<BR>more options<BR>more options'
				}, {
					title : 'filterCategory2',
					html : 'some filter options<BR>more options<BR>more options'
				}]
	}, {
		xtype : 'container',
		itemId : 'tbSaved',
		title : 'Saved',
		layout : {
			type : 'vbox',
			align : 'center'
		}
	}, {
		xtype : 'container',
		itemId : 'tbHistory',
		title : 'History',
		layout : {
			type : 'vbox',
			align : 'center'
		},
		disabled : true
	}]
		// west panel items array
});