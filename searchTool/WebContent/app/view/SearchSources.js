Ext.define('SearchTool.view.SearchSources',{
	extend:'Ext.panel.Panel',
	alias:'widget.searchSources', 
	title:'Sources',
	layout:'vbox',
	bodyStyle: 'padding: 5px 9px 5px 9px',
	
	items:[ 
	{
		xtype:'fieldset',
		title:'Data Sources',
		items:[
			{  
			 
						xtype : 'checkboxgroup',
						itemId : 'chkgrpDataSource',
						// Distribute controls across 3 even columns, filling
						// each column from top to bottom before starting the next column
						columns : [150], 
						vertical : true
						,
						items : [
								// this.getDataUrl()
								{
							boxLabel : 'Src1',
							xtype : 'checkbox',
							itemId : 'cboxSrc1',
							checked : true,
							tooltip : 'Prod1 tooltip',
							cls : 'cboxSrc'
						}, {
							boxLabel : 'Src2',
							xtype : 'checkbox',
							itemId : 'cboxSrc2',
							checked : true,
							tooltip : 'Prod2 tooltip',
							cls : 'cboxSrc'
						}, {
							boxLabel : 'Src3',
							xtype : 'checkbox',
							itemId : 'cboxSrc3',
							checked : true,
							tooltip : 'Prod3 tooltip',
							cls : 'cboxSrc'
						} 	 ]
							// items: this.getStore()
							// {boxLabel: 'All Products', itemId: 'cboxAll',
							// handler:toggleAllProducts, checked:true,
							// tooltip:'Select/Deselect all other checkboxes'}
						}
					]
		}//Data Sources fieldset
		,
			{
		xtype:'fieldset',
		title:'Products',
		items:[
			{  
			 
						xtype : 'checkboxgroup',
						itemId : 'chkgrpProducts',
						// Distribute controls across 3 even columns, filling
						// each column from top to bottom before starting the next column
						columns : [150], 
						vertical : true
						,
						items : [
								// this.getDataUrl()
								{
							boxLabel : 'Prod1',
							xtype : 'checkbox',
							itemId : 'cboxProd1',
							checked : true,
							tooltip : 'Prod1 tooltip',
							cls : 'cboxProducts'
						}, {
							boxLabel : 'Prod2',
							xtype : 'checkbox',
							itemId : 'cboxProd2',
							checked : true,
							tooltip : 'Prod2 tooltip',
							cls : 'cboxProducts'
						}, {
							boxLabel : 'Prod3',
							xtype : 'checkbox',
							itemId : 'cboxProd3',
							checked : true,
							tooltip : 'Prod3 tooltip',
							cls : 'cboxProducts'
						}, {
							boxLabel : 'Prod4',
							xtype : 'checkbox',
							itemId : 'cboxProd4',
							checked : true,
							tooltip : 'Prod4 tooltip',
							cls : 'cboxProducts'
						}, {
							boxLabel : 'Prod5',
							xtype : 'checkbox',
							itemId : 'cboxProd5',
							checked : true,
							tooltip : 'Prod5 tooltip',
							cls : 'cboxProducts'
						}]
							// items: this.getStore()
							// {boxLabel: 'All Products', itemId: 'cboxAll',
							// handler:toggleAllProducts, checked:true,
							// tooltip:'Select/Deselect all other checkboxes'}
						}
					]
		}
		
		] //west panel items array
		} 
);