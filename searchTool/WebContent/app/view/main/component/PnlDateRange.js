Ext.define('SearchTool.view.main.component.PnlDateRange', {
			extend : 'Ext.form.Panel',
			alias : 'widget.pnlDateRange',
			itemId : 'customdate',
//			iconCls : 'icon-qbuilder',
			title : 'Select a Custom Date Range',
			bodyStyle : 'padding: 10px',
			requires : ['SearchTool.config.Config'],
			draggable : true,
			floating : true,
			height:250,
			width:300,
			titleCollapse : true,
			collapsible: true,
			centered : true,
			hidden : true, 
			border : true, 
			overflowX :'hidden', 
			overflowY :'auto', 
			tools : [
				{	type:'help',
					tooltip:'Help page for Custom Date Range screen',
					handler:function(ev,el,p){
					Ext.Msg.alert('some Custom Date Range help page');
					}
				},
				{
					xtype : 'tool',
					type : 'close',
					handler : function(e, target, p, tool) {
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
				items :[{
							xtype : 'tbspacer',
							width : 2
						},
						{
							text: 'Reset',
							iconCls : 'icon-btnReset',
							handler : function(){
								this.up('form').getForm().reset();
							}
						},
						{
							xtype : 'tbspacer',
							width : 2
						},
						{
							xtype : 'tbfill'
						},  {
							text : 'Cancel',
							iconCls : 'icon-btnClear',
							handler : function() {
								this.up('form').hide();
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
							text : 'Apply',
							iconCls : 'icon-btnOk',
							itemId : 'btnCustomDateRange', 
							handler : function(){  
								//var t = this.up('panel').down('form').down('radiogroup').getValue().customdatetype
								var r = this.up('panel').down('form').down('radiogroup').getValue().customdate;
								var w = Ext.ComponentQuery.query('#cboxIncrement')[0].getValue();
								var f = Ext.ComponentQuery.query('#cboxFiscal')[0].getValue(); 
								var c = Ext.ComponentQuery.query('#txtCount')[0].getValue(); //count 
								var date1 = Ext.ComponentQuery.query('#dtRangeEnd')[0].getValue();  
								if (r=='d' || r=='w') {
									c = (r=='w' ? c*7 : c);
									if (w) { 
										if (r=='d') { 
											//date1 = Ext.Date.add(date1, Ext.Date.DAY,-1); 
										}
										else { //should get most recent Sunday, then back up 7 days - 
											var offset = SearchTool.config.Config.customCalendarWeekstart; 
											date1 = Ext.Date.add(date1, Ext.Date.DAY, -(Ext.Date.format(date1, 'w')));
											if (offset >0)
												date1 = Ext.Date.add(date1, Ext.Date.DAY,-(7-offset));
										}
									}
									date1 = Ext.Date.add(date1, Ext.Date.DAY,-c); 
								}
								if (r=='m' || r=='6m') { 
									c = (r=='6m' ? c*6 : c);  
									var date2 = '';
									if (!w) {
										date2 = date1;
										date1 = Ext.Date.add(date1, Ext.Date.MONTH,-c);
									}
									else {
									    //var lastFullMonthStart = Date.today().add(-1).months().moveToFirstDayOfMonth().toString('yyyy-MM-dd');
									    //get the month and subtract 1
										date2 = Ext.Date.getLastDateOfMonth(Ext.Date.add(date1, Ext.Date.MONTH,(-1)));
										date1 = Ext.Date.add(date1, Ext.Date.MONTH,-c);
										date1 = Ext.Date.getFirstDateOfMonth(date1);  
									} 
									date1 = Ext.Date.format(date1, 'm-d-Y') + '   to    '+Ext.Date.format(date2, 'm-d-Y');
									    
									}
								if (r=='q'){
									date1 = Ext.Date.add(date1, Ext.Date.MONTH,-c);
									var m = Ext.Date.format(date1, 'm');
									var q = Math.floor((m + 10 / 3)%4)+1;
									var y = Ext.Date.format(date1, 'Y');  
									var qm = (Math.floor(m/3)*3)+1;
									if (w) {
									var q = Math.floor(date1.getMonth() / 3)+1;
									
									var lastQuarter = (q > 1) ? q - 1 : lastQuarter = 4;
									var lastQuarterYear = (lastQuarter > 1? y -1 : y);  
									var lastFullQStart = ((((lastQuarter-1)*3)+1) < 10) ? lastQuarterYear+'-0'+(((lastQuarter-1)*3)+1) : lastQuarterYear+'-'+(((lastQuarter-1)*3)+1);
									lastFullQStart = Ext.Date.getFirstDateOfMonth(Ext.Date.parse(lastFullQStart,'Y-m'));
									var lastFullQEnd = Ext.Date.getLastDateOfMonth(Ext.Date.add(lastFullQStart,Ext.Date.MONTH,2));
									date1 = (' last full qstart' +lastFullQStart+' - '+lastFullQEnd);//yyyy-mm-dd
									
									//var lastFullQEnd = Date.parse(lastFullQStart).add(2).months().moveToLastDayOfMonth().toString('yyyy-MM-dd');
									}
									else {
										//q,y fo current
										var qStartDate = (m < 10) ? y+'-0'+m+'-01' : y+'-'+m+'-01';

									}
								}
								if (r=='yr') {
									if (w)
										 date1 = Ext.Date.add(date1, Ext.Date.YEAR,-1); 
									date1 = Ext.Date.add(date1, Ext.Date.YEAR,-c);
								}
								var z = Ext.ComponentQuery.query('#dtSearchFrom')[0].value;
    							Ext.Msg.alert(date1+''); 
								//Ext.ComponentQuery.query('#dtSearchFrom')[0].setValue(date1);
								//Ext.ComponentQuery.query('#dtSearchTo')[0].setValue(date2);
								//Ext.Msg.alert('whole'+w+'   fiscal:'+f+'   '+date1);
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
					xtype : 'form', 
					border: 0,
					layout:'vbox',
					items:[
						{xtype:'checkbox', boxLabel:'Use Fiscal Calendar', itemId: 'cboxFiscal', name:'fiscal'},  
						{xtype:'checkbox', boxLabel:'Use whole units', itemId: 'cboxIncrement',name:'incr'},
//						{xtype:'radiogroup', width:'100%', fieldLabel:'Range Type', columns:2,
//							items:[
//								{boxLabel:'Previous',name:'customdatetype',inputValue:'p'},
//								{boxLabel:'Current (To Date)',name:'customdatetype',inputValue:'c'}
//								]} ,
						{xtype:'datefield', itemId:'dtRangeEnd', name:'dtRangeEnd', allowBlank:false, width:225, labelWidth:100, fieldLabel:'Prior To:', value:new Date()},
						{xtype:'textfield', fieldLabel: 'Count:', itemId:'txtCount', width:150, allowBlank:false, name:'cnt', value:'1',
							enableKeyEvents: true, enforceMaxLength:true, minValue:1, maxLength:3, regex: /^[0-9]+$/, regexText: 'Need a number greater than 0',
							validator: function(v) {
                            if (v === "0") {
                                return "Value must be greater than 0";
                            }
                            return true;
                        }
						},
						{xtype:'radiogroup', width:'100%', fieldLabel:'Unit', columns:2, 
							items:[	{boxLabel:'Year(s)',name:'customdate',inputValue:'yr'},
									{boxLabel:'Month(s)',name:'customdate',inputValue:'m', checked:true},
									{boxLabel:'6-month',name:'customdate',inputValue:'sm'},
									{boxLabel:'Week(s)',name:'customdate',inputValue:'w'},
									{boxLabel:'Quarter(s)',name:'customdate',inputValue:'q'},
									{boxLabel:'Day(s)',name:'customdate',inputValue:'d'}
							]
						}    
						
					]
					
				}  
			]  
		}

);