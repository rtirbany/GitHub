Ext.define('SearchTool.view.main.SearchArea', {
			extend : 'Ext.container.Container', 
			alias : 'widget.searchArea', 
			layout:{type:'hbox'},  
			requires : ['SearchTool.view.main.component.SearchBoolean','SearchTool.config.Config'], 
			items : [{
				extend : 'Ext.container.Container', 
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				flex : 1, 
				border : false,
				items : [
				{
				    width :'100%',
					xtype : 'form', 
					url : '/simplesearch', 
					border : false,
					margins : '8 8 8 5',  
					height : 120,
					items : [
						{
					    		xtype : 'displayfield',
					    		anchor : '100%',
					    		fieldCls : 'dfWildcard',
					    		labelCls : 'dfLabel',
					    		fieldLabel : SearchTool.config.Config.searchCboxCaptionLabel,
					    		value : SearchTool.config.Config.searchCboxCaptionValue
					
					    }
					    ,{
//					       fieldLabel:SearchTool.config.Config.searchCboxCaptionLabel+': '+SearchTool.config.Config.searchCboxCaptionValue,
//					       labelAlign:'top',
//					       labelCls : 'dfLabel',
					       
					       xtype : 'combo',
					       id : 'cboxSearch',
					       name : 'search',
					       store : 'Keywords',
					       valueField : 'id',
					       displayField : 'keyword',
					       hideTrigger : true,
					       triggerAction :'query',
					       multiselect : false,
					       anchor : '100%',
					       queryMode : 'local',
					       typeahead : true, 
					       //vtype : 'searchKeyword',
					       /*
					         Ext.apply(Ext.form.field.VTypes, {
       		 					searchKeyword: function(val, field) {
            					if (/^[a-z0-9]+$/i.test(val)) {
               					return true;
            				}
        					},
        					searchKeywordText: 'Keyword search only contain letters and numbers.'
   							 });
					        * 
					        * */
					       listeners : {
								afterrender : function(field) {
									field.focus();
								}, 
                				specialkey: function(field, event) {
        							if (event.getKey() == event.ENTER) {
           	 							field.up('form').getForm().submit();
        							}
    							}
					       }//listeners
					       }
					    ,
						{ xtype : 'container',
							width : '100%',
							margin : '2px 5px 0px 5px',
							layout : 'hbox',
						    items : [{
									xtype : 'checkbox',
									itemId : 'chkSummaryOnlySearch',
									name: 'chkSummaryOnlySearch',
									cls : 'chkSummaryOnly',
									boxLabel : SearchTool.config.Config.searchChkCaptionLabel,
									flex : 1
									}, {
//									xtype : 'container',
//									layout : 'hbox',
//									columnWidth : .6,
//									items : [{
												// layout:{type:'hbox',pack:'end'},
												xtype : 'button',
												cls : 'frmSearchBtns',
												flex : 1,
												text : 'Clear',
												scale : 'medium',
												itemId : 'btnClear',
												iconCls : 'icon-btnClear',
												tooltip : SearchTool.config.Config.searchBtnClearTtip,
												handler : function() {
													this.up('form').getForm().reset();
												}
											}, {
												xtype : 'button',
												cls : 'frmSearchBtns',
												flex : 1,
												text : 'Search',
												scale : 'medium',
												itemId : 'btnSearch',
												iconCls : 'icon-btnSearch',
												tooltip : SearchTool.config.Config.searchBtnSearchTtip,
												scope : this
//											}]
								}]
							} 
					    ]
					    }
					 	// cbox, btnSearch, Clear,
				, { 
					border : false,
					margins :' 8 5 8 5',
					items : [
					{ 
						 
									xtype : 'checkbox',
									itemId : 'chkSaveQuery',
									name: 'chkSaveQuery',
									cls : 'chkSaveQuery',
									tooltip : 'hi',
									boxLabel : SearchTool.config.Config.searchSaveChkCaptionLabel 
								 
							 
					}
					]
//					layout:'hbox',
//					items:[
//						{xtype:'displayfield', value:'Filter Options:', width:40},
//						{xtype:'checkbox', boxLabel:'Remove all', width:40},
//						{xtype:'checkbox', value:'Relax all', width:40}
//						
//					]

				}

				]//vbox item array
			}, 
				{
					xtype : 'fieldset',
					title: SearchTool.config.Config.qryBuilderCaptionLabel,
					collapsible : true,
					collapsed : true,
					overflowX : 'hidden', 
					overflowY : 'auto',
					flex : 2,
					border : false,
					tooltip : 'Boolean query entry',
					items:[
					{	
						xtype : 'searchBoolean'
					}
					]//fieldset items 
				},	
				{
					xtype : 'fieldset',
					title : SearchTool.config.Config.SmthgCaptionLabel, 
					collapsible : true,
					collapsed : true, 
					flex : 1,
					border : false,
					items : [ { 
						html:'(area for shopping cart, subscriptions, or ?'
					   }
					]//fieldset items 
						
					}
				 
			 ]

		});