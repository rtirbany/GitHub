Ext.define('SearchTool.view.main.SearchArea', {
			extend : 'Ext.container.Container', 
			alias : 'widget.searchArea', 
			layout:{type:'hbox'},
			height : 120,
			constrain:true,
			requires : ['SearchTool.view.main.component.SearchBoolean','SearchTool.config.Config','SearchTool.view.main.component.PnlDateRange'], 
			items : [
				{
					xtype : 'pnlDateRange',
					hidden : true
				},
				{ 
					xtype : 'form',  
					flex:1.1, 
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
							margin : '2px 3px 12px 3px',
							layout : 
							{	type : 'hbox',
								defaultMargins : '2px 5px 10px 5px',
								padding : '0 5 0 5' 
							}, 
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
										itemId : 'btnClear',
										iconCls : 'icon-btnClear',
										iconAlign : 'left',
										tooltip : SearchTool.config.Config.searchBtnClearTtip,
										handler : function() {
											this.up('form').getForm().reset();
										}
									}, 
									{
										xtype : 'button',
										cls : 'frmSearchBtns', 
										text : 'Search', 
										itemId : 'btnSearch',
										iconCls : 'icon-btnSearch',
										iconAlign : 'left',
										tooltip : SearchTool.config.Config.searchBtnSearchTtip,
										scope : this 
								}]//hbox container items array
							} //container w/ summary only, search buttons
							,
							{ 	//FROM, TO dates
								xtype:'container',
								width:'100%',
								margins :' 8 2 8 3',
					 			layout:{
					 				type:'hbox',
					 				defaultMargins : '2px 3px 2px 3px'
					 				
					 			},
					 			defaults: {
					 				xtype:'datefield'
					 			},
					 			items:[
					 				{ xtype:'hidden', ignore:true, itemId:'cd_chkFiscal' ,value:false},
					 				{ xtype:'hidden', ignore:true, itemId:'cd_chkWhole' ,value:true},
					 				{ xtype:'hidden', ignore:true, itemId:'cd_dtRangeEnd', value:'01-31-2013'},
					 				{ xtype:'hidden', ignore:true, itemId:'cd_dtRangeStart', value:'01-01-2013'},
					 				{ xtype:'hidden', ignore:true, itemId:'cd_txtCount', value:500},
					 				{ xtype:'hidden', ignore:true, itemId:'cd_rdUnit', value:'6m'},
					  				{ name:'searchFromDate', itemId:'dtSearchFrom', width:135, labelWidth:30, fieldLabel:'From', value:Ext.Date.add(new Date(), SearchTool.config.Config.defaultDatePeriod,SearchTool.config.Config.defaultDateAmt)},
					  				{ name:'searchToDate', itemId:'dtSearchTo', width:123, labelWidth:18, fieldLabel:'To', value:new Date()},
					  				//{ xtype:'checkbox', boxLabel:'Other Date range types', fieldLabel:'Other Date ranges', labelWidth:10},
					  				{ xtype:'button', text:'Custom', itemId:'btnCustomDate', boxLabel:'Custom Date', cls:'btnDateRanges', tooltip:'Select a custom date range'//, enableToggle:true
					  				, 
					  					handler : function(b,e,o){
					  						b.up('form').up('container').down('pnlDateRange').show();
					  					}
					  				}
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
					flex : 1.85,
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
					flex : .8,
					border : false,
					items : [ { 
						html:'(area for shopping cart, subscriptions, or ?'
					   }
					]//fieldset items 
						
					}
				 
			 ]

		});