Ext.define('SearchTool.view.main.SearchArea', {
			extend : 'Ext.container.Container', 
			alias : 'widget.searchArea', 
			layout:{type:'hbox'},
			height : 120,
			requires : ['SearchTool.view.main.component.SearchBoolean','SearchTool.config.Config'], 
			items : [
				{ 
					xtype : 'form',  
					flex:1, 
					url : '/simplesearch',  
					border : false, 
					layout:'vbox', 
					margins : '8 8 8 5',  
					defaults: {
						width:'100%',
						border:false},
					items : [
						{ xtype : 'displayfield', fieldCls : 'dfWildcard', labelCls : 'dfLabel', fieldLabel : SearchTool.config.Config.searchCboxCaptionLabel,value : SearchTool.config.Config.searchCboxCaptionValue },
						{ 
					       xtype : 'combo', 
					       id : 'cboxSearch', 
					       name : 'search', 
					       store : 'Keywords', 
					       valueField : 'id', 
					       displayField : 'keyword', 
					       hideTrigger : true, 
					       triggerAction :'query',
					       multiselect : false,  
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
					       		}//afterrender
					       	,  
					       	specialkey: function(field, event) {
					       		if (event.getKey() == event.ENTER) 
					       			{ field.up('form').getForm().submit(); 
					       			}//if
					       		}//specialkey
					       	}//listeners
					    }//cboxsearch
					    ,
						{ xtype : 'container', 
							margin : '2px 5px 0px 5px',
							layout : 'hbox',
							defaults:{ 
								flex:1
							},
						    items : [
						    		{
										xtype : 'checkbox',
										itemId : 'chkSummaryOnlySearch',
										name: 'chkSummaryOnlySearch',
										cls : 'chkSummaryOnly',
										boxLabel : SearchTool.config.Config.searchChkCaptionLabel
									}, 
									{  
										xtype : 'button',
										cls : 'frmSearchBtns', 
										text : 'Clear',
										scale : 'medium',
										itemId : 'btnClear',
										iconCls : 'icon-btnClear',
										tooltip : SearchTool.config.Config.searchBtnClearTtip,
										handler : function() {
											this.up('form').getForm().reset();
										}
									}, 
									{
										xtype : 'button',
										cls : 'frmSearchBtns', 
										text : 'Search',
										scale : 'medium',
										itemId : 'btnSearch',
										iconCls : 'icon-btnSearch',
										tooltip : SearchTool.config.Config.searchBtnSearchTtip,
										scope : this 
								}]//hbox container items array
							} //container w/ summary only, search buttons
							,
							{ 	//FROM, TO dates
								xtype:'container', 
								margins :' 8 5 8 5',
					 			layout:'hbox',
					 			defaults: {
					 				xtype:'datefield',
					 				labelWidth:40,
					 				width:150
					 			},
					 			items:[
					  				{ name:'searchFromDate', fieldLabel:'From', value:Ext.Date.add(new Date(), Ext.Date.DAY,SearchTool.config.Config.defaultDatePeriod)},
					  				{ name:'searchToDate', fieldLabel:'To', value:new Date()}
								]
							}//container
							,
							{   
								xtype : 'checkbox',
								itemId : 'chkSaveQuery',
								name: 'chkSaveQuery',
								cls : 'chkSaveQuery',
								boxLabel : SearchTool.config.Config.searchSaveChkCaptionLabel  
							}
					    ]//forms item array
					    } //form (all below items belong to hbox)
					 	// cbox, btnSearch, Clear,  
			 , 
				{	//Advanced Search area
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
				{	//OTHER fieldset of SearchArea
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