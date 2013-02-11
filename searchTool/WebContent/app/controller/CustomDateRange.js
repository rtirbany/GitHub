Ext.define('SearchTool.controller.CustomDateRange',{
	extend:'Ext.app.Controller',
	views:['main.component.PnlDateRange','main.SearchArea'], 
	refs:[ 
		{
			ref : 'cdr_ChkFiscal',
			selector : '#chkFiscal'
		},
		{
			ref : 'cdr_ChkWhole',
			selector : '#chkWhole'
		},
		{
			ref : 'cdr_DtRangeEnd',
			selector : '#dtRangeEnd'
		},
		{
			ref : 'cdr_TxtCount',
			selector : '#txtCount'
		},
		{
			ref : 'cdr_Customdate',
			selector : '#customdate'
		},
		{
			ref : 'cdr_RdUnit',
			selector : '#rdUnit'
		}
		,
		{
		 ref:'sa_chkFiscal',
		 selector:'#cd_chkFiscal'
		},
		{
		 ref:'sa_chkWhole',
		 selector:'#cd_chkWhole'
		}
		,
		{
		 ref:'sa_dtRangeEnd',
		 selector:'#cd_dtRangeEnd'
		},
		{
		 ref:'sa_dtRangeFrom',
		 selector:'#cd_dtRangeStart'
		},
		{
		 ref:'sa_txtCount',
		 selector:'#cd_txtCount'
		},
		{
		 ref:'sa_rdUnit',
		 selector:'#cd_rdUnit'
		}  				 
	],
	init:function(){
		var me = this;
		me.getFromSearchArea;
		me.control({
			'button[itemId=btnCustomDateRange]' : {
				click: me.processForm
			},
			'button[itemId=btnCustomDate]' : {
				click : me.addToParentTab
			}
				
		});//control function
	}, //init
	addToParentTab : function(b,e,o){
			me = this;
			var cdf = Ext.ComponentQuery.query('#customdate');
			if (cdf.length == 0) {
				var cdr = Ext.create('SearchTool.view.main.component.PnlDateRange');
				me.getFromSearchArea();
				var activeTab = b.up('tabpanel').getActiveTab(); 
				activeTab.add(cdr).show();
			}
			else {
				me.getFromSearchArea();
				cdf[0].center();
				if (cdf[0].collapsed)
					cdf[0].expand();
				cdf[0].show();}
	},	
	processForm : function(b,e){
			me = this;
			//get values from SA 
			var f = me.getCdr_ChkFiscal().value; 
			var w =  me.getCdr_ChkWhole().value; 
			var c = me.getCdr_TxtCount().value; 
			var u = me.getCdr_RdUnit().getValue().customdate; 
			var date2 = me.getCdr_DtRangeEnd().value; 
			
			//assign info to hidden fields of Search Area for later retrieval
			me.assignToSearchArea();
			var date1;
			if (u=='d' || u=='w') {
				c = (u=='w' ? c*7 : c);
				if (w) {
					if (u=='d') { 
					//date1 = Ext.Date.add(date1, Ext.Date.DAY,-1); 
					}
					else { //should get most recent Sunday, then back up 7 days - 
						var offset = SearchTool.config.Config.customCalendarWeekstart; 
						date2 = Ext.Date.add(date2, Ext.Date.DAY, -(Ext.Date.format(date2, 'w')));
						if (offset >0)
							date2 = Ext.Date.add(date2, Ext.Date.DAY,-(7-offset));
					}
				}
				date1 = Ext.Date.add(date2, Ext.Date.DAY,-c);
			}
			else if (u=='m' || u=='6m') { 
				c = (u=='6m' ? c*6 : c);
				if (!w) { 
					date1 = Ext.Date.add(date2, Ext.Date.MONTH,-c); 
				}
				else {
					//var lastFullMonthStart = Date.today().add(-1).months().moveToFirstDayOfMonth().toString('yyyy-MM-dd');
					//get the month and subtract 1
					date2 = Ext.Date.getLastDateOfMonth(Ext.Date.add(date2, Ext.Date.MONTH,(-1))); 
					c -= 1;
					date1 = Ext.Date.add(date2, Ext.Date.MONTH,-c); 
					date1 = Ext.Date.getFirstDateOfMonth(date1);
				}  
			}
			else if (u=='q'){
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
			else if (u=='yr') {
				if (w)
					date1 = Ext.Date.add(date1, Ext.Date.YEAR,-1); 
				date1 = Ext.Date.add(date1, Ext.Date.YEAR,-c);
			} 
    		Ext.Msg.alert(Ext.Date.format(date1,'m-d-Y')+' - '+Ext.Date.format(date2,'m-d-Y'));
			//Ext.ComponentQuery.query('#dtSearchFrom')[0].setValue(date1);
			//Ext.ComponentQuery.query('#dtSearchTo')[0].setValue(date2);
			//Ext.Msg.alert('whole'+w+'   fiscal:'+f+'   '+date1); 
		}
		,
		assignToSearchArea : function(){ 
			me.getSa_chkFiscal().setValue(me.getCdr_ChkFiscal().value); 
			me.getSa_chkWhole().setValue(me.getCdr_ChkWhole().value); 
			me.getSa_txtCount().setValue(me.getCdr_TxtCount().value); 
			me.getSa_rdUnit().setValue(me.getCdr_RdUnit().getValue().customdate); 
			me.getSa_dtRangeEnd().setValue(me.getCdr_DtRangeEnd().value); 
		},
		
		getFromSearchArea : function(){
			var dtSa = me.getSa_dtRangeEnd().value;
			var dtEndUser = Ext.ComponentQuery.query('#dtSearchTo')[0].value;
			if (dtSa != dtEndUser) { //if user changes end date, all other info may need to change as well (inside else stmt)
				me.getCdr_DtRangeEnd().setValue(dtEndUser);
			}
			else {
				me.getCdr_ChkWhole().setValue(me.getSa_chkWhole().value); 
				me.getCdr_ChkFiscal().setValue(me.getSa_chkFiscal().value); 
				me.getCdr_TxtCount().setValue(me.getSa_txtCount().value); 
				me.getCdr_RdUnit().setValue({customdate:me.getSa_rdUnit().getValue().customdate});
			}
		}
	
});