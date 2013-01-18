Ext.define('SearchTool.view.Viewport', {
			extend : 'Ext.container.Viewport',
			itemId : 'main',
			requires : ['SearchTool.view.main.pnlSearchNav', 'SearchTool.view.main.SearchArea'],
			defaults : {
						width:'100%',
						border : false,
						frame : false
					},
			layout: 'border',
			items :  
			 [
			 { region:'north', //top banner panel 
			   items:[ 
			   {
							height : 60,
							layout : 'hbox',
							items : [{
										xtype : 'tbtext',
										text : 'CHROME Search'
									}, {
										xtype : 'tbfill'
									}, {
										xtype : 'button',
										itemId : 'btnHelp',
										text : 'Help'
									}, {
										xtype : 'tbseparator'
									}, {
										xtype : 'button',
										text : 'Logout',
										itemId : 'btnLogout'
									}]
					}  
				]
			  }		//top banner panel 
			, 
				{
				region:'center',
				xtype : 'tabpanel',
				tabBar:{
						layout:{pack:'end'}
				},
				layout:'fit',
				items : [
					{
					title : 'Search',
					itemId:'pnlMainTabSearch',
					layout:'border',
					items:[
					//center - north
					{	
							region:'north',
							border:false,
	 						height:160,
							layout : {
								pack: 'justify',
								align : 'stretch'
							},
	 						items:[	 //contents of north panel within main Search page pab
	 						 { 
	 								 xtype : 'searchArea' 
	 						 } 
	 				       ]//north panel items array
	 				}
	 				//center - west
	 				,
	 				{ 
										region : 'west',
										itemId:'pnlTools', 
										title:'Tools',
										layout: {
											type:'fit', //vbox to have resizing of parent children will autofit
											align : 'stretch'
										}
										,
										collapsible:true,
										animCollapse:true,
										collapseDirection:'left', 
										split:true,
										items : [  
										{
											  xtype : 'pnlSearchnav'
										}
										],
										flex:.45
					}//west
//	 				,
//	 				{
//	 				region:'center',
//							xtype:'resultsgrid', 
//			 				title:'Results', 
//			 				id:'results', 
//			 				tooltip:'results will appear here'
//				}		//search tab contents
				]
				},

				{
					title : 'Admin',
					deferredRender : true,
					html : '(Admin pages go here)',
					tooltip : 'admin pages appear here'
				}		//admin tab contents
				]

			}] 
		});