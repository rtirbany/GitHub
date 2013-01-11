Ext.define('SearchTool.view.Viewport',{
	extend : 'Ext.container.Viewport', 
	itemId:'main',
	requires:['SearchTool.view.PnlSearch','SearchTool.view.PnlSources','SearchTool.view.SearchArea'],
	//TODO: copy main into here :) and set autoCreateVP = true  
    layout:'border',
    items:[
    			{	//toolbar area
    				region:'north',
    				items:[{
						height:50,
						layout: 'hbox',
						items:[{
								xtype:'tbtext',
								text:'CHROME Search'
							},
							{
								xtype:'tbfill'
							}, 
							{
								xtype:'button',
								itemId:'btnHelp',
								text:'Help' 
							}
							,
							{
								xtype:'tbseparator'
							}
							,
							{
								xtype:'button',
								text:'Logout',
								itemId:'btnLogout' 
							}
							]
					}]
    			}
    			,
    			{	//main tabs for Search and Admin
    				region:'center' ,
    				xtype:'tabpanel', 
    				layout:'fit',
    				plain:true,
    				tabBar:{
						layout:{pack:'end'}
					},	
    				items:[
    					//main Search page will contain a tab panel
    					{
    					itemId:'pnlMainTabSearch',
						extend:'Ext.container.Container',
						title:'Search',
						layout:'border',
			 			tooltip:'Search page', 
						items:[
						// sm,
		      			{ // west panel
										region : 'west',
										itemId:'pnlTools',
										flex:3,
										title:'Search Tools',
										layout: {
											type:'fit' //vbox to have resizing of parent children will autofit
										}
										,
										collapsible:true,
										animCollapse:true,
										collapseDirection:'left', 
										split:true,
										items : [  
										{
												xtype:'container',
												items:[
												{ 	//scrollbar working as it should
													//height working as it should
													xtype:'container', 
													height:'15%',
													border:1,
													overflowX:'hidden', 
													overflowY:'auto',
													width:'100%',
													items:[
														{xtype:'displayfield',value:'Filters:'},
														{xtype:'checkbox', fieldLabel:'Remove All'},
														{xtype:'checkbox', fieldLabel:'Relax All'}
													]
												}
												, 
												{ 
													xtype:'container',
													width:'100%', 
													height:'95%',
													border:1,
//													layout:'fit', 
//													items:[{
//													    xtype:'container',
													    layout:'hbox',
													defaults:{collapsible : true,animCollapse : true,collapseDirection : 'left', overflowX:'hidden', overflowY:'auto'},
														items:
														[{ xtype : 'pnlSearch',flex:1 }, 
														 { xtype : 'pnlSources',flex:1 }]
//													}]
//												 }//hbox
//												]//vbox items array
												}]
												}
												]//hbox
										 }//west
						,
						{	//north panel
							region:'north',  
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
	 					}//north panel definition,
	 			,		
	 					{	//center panel
							region:'center',
//							xtype:'resultsgrid',
//							xtype:'grid',
			 				title:'Results', 
			 				id:'results',
			 				flex:10, 
			 				tooltip:'results will appear here'
			 			
			 			}   //center panel defintion
		       		]//search items array
						}//search tab
						,
    					 
    					{
    						title:'Admin',
    						deferredRender: true,
	    					html:'(Admin pages go here)',
			 				tooltip:'admin pages appear here'
		 				}
    				]
    			}
    		]
	});