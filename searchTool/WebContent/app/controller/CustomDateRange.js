Ext.define('SearchTool.controller.CustomDateRange', {
    extend: 'Ext.app.Controller',
    views: ['main.component.PnlCustomDateRange', 'main.SearchArea', 'SearchTool.config.Config'],
    refs: [{
        ref: 'cdr_rdCalType',
        selector: '#rdCalendar'
    }, {
        ref: 'cdr_numFiscal',
        selector: '#numFiscalYear'
    }, {
        ref: 'cdr_cboxPeriod',
        selector: '#cboxPeriod'
    }, {
        ref: 'cdr_chkWhole',
        selector: '#chkWhole'
    }, {
        ref: 'cdr_dtRangeEnd',
        selector: '#dtRangeEnd'
    }, {
        ref: 'cdr_dtRangeStart',
        selector: '#dtRangeStart'
    }, {
        ref: 'cdr_txtCount',
        selector: '#txtCount'
    }, {
        ref: 'cdr_rdUnit',
        selector: '#rdUnit'
    }, {
        ref: 'sa_dtRangeEnd',
        selector: '#cd_dtRangeEnd'
    }, {
        ref: 'sa_dtRangeStart',
        selector: '#cd_dtRangeStart'
    }],
    init: function () {
        var me = this;
        me.control({
            'button[itemId=btnCustomDateRange]': {
                click: me.processForm
            },
            'button[itemId=btnCustomDate]': {
                click: me.showComponentWithinTab
            },
            'datefield[itemId^=dtUser]': {
                select: me.updateCDR
            }

        }); //control function
    }, //init
    showComponentWithinTab: function (b, e, o) {
        me = this;
        var cdf = Ext.ComponentQuery.query('#customdate');
        //if first time/not avail, add the component to current tab.  Apply def start date using datefield widgets.
        if (cdf.length == 0) {
            var cdr = Ext.create('SearchTool.view.main.component.PnlCustomDateRange'),
                activeTab = b.up('tabpanel').getActiveTab();
            me.fillCDRForm();
            activeTab.add(cdr).show();
        }
        //if avail, center, expand and show
        else {
            cdf[0].center();
            me.fillCDRForm();
            if (cdf[0].collapsed) cdf[0].expand();
            cdf[0].show();
        }
    },
    processForm: function (b, e) {
        me = this;
        //get values from CDR 
        var calType = me.getCdr_rdCalType().getValue().calType, //cal, fisc
            w = me.getCdr_chkWhole().value,
            c = me.getCdr_txtCount().value,
            u = me.getCdr_rdUnit().getValue().customdate,
            date1, date2;
        switch(calType){
          case 'cal' :   date2 = me.getCdr_dtRangeEnd().value;
                         date1 = me.getCdr_dtRangeStart().value;
                         break;
          //fisc is only other value
          default :      date2 = parseInt(me.getCdr_numFiscal().value);
                         var m = SearchTool.config.Config.customCalendarFiscalMonthDay+(date2-1); 
                         date2 = Ext.Date.parseDate(m,'m/d/Y'); 
                         date1 = date2;
        } 
        //TODO: refactor all of this
        if (u == 'd' || u == 'w') {
            switch(u){
               case 'd' : if (w && calType == 'cal')
                              date2 = Ext.Date.add(date2, Ext.Date.DAY, -1); //go back 1 day if 'whole'
                          break;
               case 'w' : var offset = SearchTool.config.Config.customCalendarWeekstart; //0
                          if (w)
                              date2 = Ext.Date.add(date2, Ext.Date.DAY, -(Ext.Date.format(date2, 'w'))); //go to week start
                          c = c * 7;
                          if (offset > 0) 
                             date2 = Ext.Date.add(date2, Ext.Date.DAY, -(7 - offset));
                          break;
            }//switch
            date1 = Ext.Date.add(date2, Ext.Date.DAY, -c+1);
//            c = (u == 'w' ? c * 7 : c);
//            if (w) {
//                if (u == 'd') {
//                    date2 = Ext.Date.add(date2, Ext.Date.DAY, -1);
//                } else { //should get most recent Sunday, then back up 7 days - 
//                    var offset = SearchTool.config.Config.customCalendarWeekstart;
//                    date2 = Ext.Date.add(date2, Ext.Date.DAY, -(Ext.Date.format(date2, 'w')));
//                    if (offset > 0) date2 = Ext.Date.add(date2, Ext.Date.DAY, -(7 - offset));
//                }
//            }
//            date1 = Ext.Date.add(date2, Ext.Date.DAY, -c+1);
        }
        //m works!!
        //6m?
        else if (u == 'm' || u == 'sm') {  
            //customCalendarSixMonthstart = 1 (January), customCalendarSixMonthFromCurrent = 0,1
            var fromCurrent = SearchTool.config.Config.customCalendarSixMonthFromCurrent;
            c = (u == 'sm' ? c * 6 : c);
            if (fromCurrent == 0) { //not based off current
                var currHalf = (parseInt(Ext.Date.format(date2, 'm')) > 6 ? 2 : 1);
            }
            if (!w) {
                date1 = Ext.Date.add(date2, Ext.Date.MONTH, -c);
            } else {
                //var lastFullMonthStart = Date.today().add(-1).months().moveToFirstDayOfMonth().toString('yyyy-MM-dd');
                //get the prev 6 month interval 
                var adj = (u == 'sm' ? (date2.getMonth() % 6)+1 : 1);
                date2 = Ext.Date.getLastDateOfMonth(Ext.Date.add(date2, Ext.Date.MONTH,-adj));
                date1 = Ext.Date.getLastDateOfMonth(Ext.Date.add(date2, Ext.Date.MONTH, -c)); //11,12 yields 12/31-6/30
                date1 = Ext.Date.add(date1, Ext.Date.DAY, 1);
            }
            if (calType == 'fisc') {
               
            }
        } else if (u == 'q') {
            //Quarter calc - whole unit checkbox does not apply here
            date1 = date2;
            var m = parseInt(Ext.Date.format(date1, 'n')),
                y1 = parseInt(Ext.Date.format(date1, 'Y')),
                y2 = y1,
                firstFullQuarter = Math.floor((m - 1) / 3) + 1,
                prevQuarter = firstFullQuarter - 1
            if (prevQuarter < 1) {
                prevQuarter = 4;
                y2 -= 1;
            }

            y1 -= parseInt(c / 4); //adjusts year
            firstFullQuarter -= c % 4;
            if (firstFullQuarter > 4) {
                firstFullQuarter -= 4;
                y1 += 1;
            } else if (firstFullQuarter < 1) {
                firstFullQuarter += 4;
                y1 -= 1;
            }
            //determine date1 start of quarter
            var lastFullQStart = ((((firstFullQuarter - 1) * 3) + 1) < 10) ? y1 + '-0' + (((firstFullQuarter - 1) * 3) + 1) : y1 + '-' + (((firstFullQuarter - 1) * 3) + 1);
            lastFullQStart = Ext.Date.getFirstDateOfMonth(Ext.Date.parse(lastFullQStart, 'Y-m'));

            //get date2 previous quarter end
            var prevQStart = ((((prevQuarter - 1) * 3) + 1) < 10) ? y2 + '-0' + (((prevQuarter - 1) * 3) + 1) : y2 + '-' + (((prevQuarter - 1) * 3) + 1),
                prevQEnd = Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.parse(prevQStart, 'Y-m'), Ext.Date.MONTH, 2));
            //populate the calendar widget
            date1 = lastFullQStart;
            date2 = prevQEnd;

        } else if (u == 'yr') {
            var currMonth = parseInt(Ext.Date.format(date2, 'n')),
                adjustMonth = 12 - currMonth; //need to get to last day of year as endpoint
            if (w) {
                if (calType == 'fisc') {
                    date2 = Ext.Date.add(date2,Ext.Date.MONTH,-(currMonth-1)); //January of that fisc year
                    date2 = Ext.Date.getFirstDateOfMonth(date2); //January 1 of that fisc year
                    date2 = Ext.Date.add(date2,Ext.Date.DAY,-1); //12/31 of prior yr
                    date1 = Ext.Date.add(date2,Ext.Date.DAY,1);
                    date1 = Ext.Date.add(date1,Ext.Date.YEAR,-1*c);
                }
                else {
                    date2 = Ext.Date.add(date2, Ext.Date.YEAR, -1); //get the previous year
                    date2 = Ext.Date.add(date2, Ext.Date.MONTH, adjustMonth);
                    date2 = Ext.Date.getLastDateOfMonth(date2);
                 
                    date1 = Ext.Date.add(date2, Ext.Date.MONTH, -(parseInt(Ext.Date.format(date2, 'n') - 1)));
                    date1 = Ext.Date.getFirstDateOfMonth(date1);
                    date1 = Ext.Date.add(date1, Ext.Date.YEAR, -(c - 1));
                }
            } else {
               date1 = Ext.Date.add(date2, Ext.Date.YEAR, -c);
               if (calType == 'fisc')
                    date1 = Ext.Date.add(date1, Ext.Date.DAY,1);
            }

        }
        var field = Ext.ComponentQuery.query('#dtUserSearchTo')[0];
        field.setValue(date2);
        Ext.form.field.VTypes.DateRange(field.value, field);
        field = Ext.ComponentQuery.query('#dtUserSearchFrom')[0];
        field.setValue(date1);
        Ext.form.field.VTypes.DateRange(field.value, field);
        me.getCdr_dtRangeStart().setValue(date1);
    },
    updateCDR: function (c, e, o) { 
    },
    
    fillCDRForm: function () {
        var me = this, elapsed;
            //retrieve values from calendar widget 
            dtUserStart = Ext.Date.format(Ext.ComponentQuery.query('#dtUserSearchFrom')[0].value, 'm-d-Y'),
            dtUserEnd = Ext.Date.format(Ext.ComponentQuery.query('#dtUserSearchTo')[0].value, 'm-d-Y'),
            //custom date range fields, get the values here and convert for comparing w/ above
            dtCdrStart = Ext.Date.format(me.getCdr_dtRangeStart().value, 'm-d-Y'),
            dtCdrEnd = Ext.Date.format(me.getCdr_dtRangeEnd().value, 'm-d-Y');
        //if any date has changed/doesn't match, need to determine values and populate form
        if (dtCdrEnd != dtUserEnd || dtCdrStart != dtUserStart) { //if user has changed either  date, compute all fields
            //2/15/13 will change end date, change to count of days & 'days', uncheck both checkboxes
//            var val, elapsed = 0;
//            //if not null, parse the date values or set to emptystring (if startdate) or curr date (if enddate)
//            dtUserStart = dtUserStart ? Ext.Date.parseDate(dtUserStart,'m-d-Y') : '';
//            dtUserEnd =  Ext.Date.parseDate((dtUserEnd ? dtUserEnd : Ext.Date.format(new Date(),'m-d-Y')),'m-d-Y');
//            me.getCdr_dtRangeEnd().setValue(dtUserEnd);
//              
//            if (dtUserStart != dtCdrStart) { //start passed in, and it is a new value
//               if (dtUserStart != '') {
//                    me.getCdr_dtRangeStart().setValue(dtUserStart);
//                    me.getCdr_dtRangeEnd().setValue(dtUserEnd); 
//                    elapsed = parseInt(Ext.Date.getElapsed(dtUserEnd,dtUserStart) / (1000 * 60 * 60 * 24)); //ms converted to days
//                    if (me.getCdr_chkWhole().getValue())
//                         elapsed += 1;
//               }
//            }
//            //calendar type to cal
//            me.getCdr_rdCalType().reset();//  setValue({calType:'cal'});
//            //if not current date, chkWhole set true
//            me.getCdr_chkWhole().setValue(Ext.Date.format(dtUserEnd,'m-d-Y') != Ext.Date.format(new Date(),'m-d-Y'));
//            me.getCdr_rdUnit().setValue({
//                customdate: 'd'
//            });
//            me.getCdr_txtCount().setValue(elapsed);
          Ext.ComponentQuery.query('#customdate')[0].getForm().reset();
        }
    }

});