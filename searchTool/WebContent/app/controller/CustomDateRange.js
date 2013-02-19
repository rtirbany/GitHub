Ext.define('SearchTool.controller.CustomDateRange', {
    extend: 'Ext.app.Controller',
    views: ['main.component.PnlCustomDateRange', 'main.SearchArea', 'SearchTool.config.Config'],
    refs: [{
        ref: 'cdr_chkFiscal',
        selector: '#chkFiscal'
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
            var cdr = Ext.create('SearchTool.view.main.component.PnlCustomDateRange');
            var activeTab = b.up('tabpanel').getActiveTab();
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
        //get values from SA 
        var f = me.getCdr_chkFiscal().value;
        var w = me.getCdr_chkWhole().value;
        var c = me.getCdr_txtCount().value;
        var u = me.getCdr_rdUnit().getValue().customdate;
        var date2 = me.getCdr_dtRangeEnd().value;
        //assign info to hidden fields of Search Area for later retrieval
        var date1 = me.getCdr_dtRangeStart().value;
        //               switch (u){
        //               case 'd' : 
        //               
        //               }
        if (u == 'd' || u == 'w') {
            c = (u == 'w' ? c * 7 : c);
            if (w) {
                if (u == 'd') {
                    date2 = Ext.Date.add(date2, Ext.Date.DAY, -1);
                } else { //should get most recent Sunday, then back up 7 days - 
                    var offset = SearchTool.config.Config.customCalendarWeekstart;
                    date2 = Ext.Date.add(date2, Ext.Date.DAY, -(Ext.Date.format(date2, 'w')));
                    if (offset > 0) date2 = Ext.Date.add(date2, Ext.Date.DAY, -(7 - offset));
                }
            }
            date1 = Ext.Date.add(date2, Ext.Date.DAY, -c);
        }
        //m works!!
        //6m?
        else if (u == 'm' || u == 'sm') {
            c = (u == 'sm' ? c * 6 : c);
            //customCalendarSixMonthstart = 1 (January), customCalendarSixMonthFromCurrent = 0,1
            var fromCurrent = SearchTool.config.Config.customCalendarSixMonthFromCurrent;
            if (fromCurrent == 0) { //not based off current
                var currHalf = (parseInt(Ext.Date.format(date2, 'm')) > 6 ? 2 : 1);

            }
            if (!w) {
                date1 = Ext.Date.add(date2, Ext.Date.MONTH, -c);
            } else {
                //var lastFullMonthStart = Date.today().add(-1).months().moveToFirstDayOfMonth().toString('yyyy-MM-dd');
                //get the prev 6 month interval
                var adj = (date2.getMonth() % 6)+1; 
                date2 = Ext.Date.getLastDateOfMonth(Ext.Date.add(date2, Ext.Date.MONTH, (-adj)));
                date1 = Ext.Date.getLastDateOfMonth(Ext.Date.add(date2, Ext.Date.MONTH, -c)); //11,12 yields 12/31-6/30
                date1 = Ext.Date.add(date1, Ext.Date.DAY, 1);
            }
        } else if (u == 'q') {
            //Quarter calc - whole unit checkbox does not apply here
            date1 = date2;
            var m = parseInt(Ext.Date.format(date1, 'm'));
            var y1 = parseInt(Ext.Date.format(date1, 'Y'));
            var y2 = y1;
            var firstFullQuarter = Math.floor((m - 1) / 3) + 1;
            var prevQuarter = firstFullQuarter - 1
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
            var prevQStart = ((((prevQuarter - 1) * 3) + 1) < 10) ? y2 + '-0' + (((prevQuarter - 1) * 3) + 1) : y2 + '-' + (((prevQuarter - 1) * 3) + 1);
            var prevQEnd = Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.parse(prevQStart, 'Y-m'), Ext.Date.MONTH, 2));
            //populate the calendar widget
            date1 = lastFullQStart;
            date2 = prevQEnd;

        } else if (u == 'yr') {
            var adjustMonth = 12 - parseInt(Ext.Date.format(date2, 'm')); //need to get to last day of year as endpoint
            if (w) {
                date2 = Ext.Date.add(date2, Ext.Date.YEAR, -1); //get the previous year
                date2 = Ext.Date.add(date2, Ext.Date.MONTH, adjustMonth);
                date2 = Ext.Date.getLastDateOfMonth(date2);
                date1 = Ext.Date.add(date2, Ext.Date.MONTH, -(parseInt(Ext.Date.format(date2, 'm') - 1)));
                date1 = Ext.Date.getFirstDateOfMonth(date1);
                date1 = Ext.Date.add(date1, Ext.Date.YEAR, -(c - 1));
            } else date1 = Ext.Date.add(date2, Ext.Date.YEAR, -c);

        }
        Ext.ComponentQuery.query('#dtUserSearchFrom')[0].setValue(date1);
        Ext.ComponentQuery.query('#dtUserSearchTo')[0].setValue(date2);
        me.getCdr_dtRangeStart().setValue(date1);
    },
    updateCDR: function (c, e, o) {
        debugger;
        //me.getCdr_dtRangeStart().setValue()
    },
    fillCDRForm: function () {
        var me = this, elapsed;
        //retrieve values from calendar widget
        var dtUserStart = Ext.Date.format(Ext.ComponentQuery.query('#dtUserSearchFrom')[0].value, 'm-d-Y');
        var dtUserEnd = Ext.Date.format(Ext.ComponentQuery.query('#dtUserSearchTo')[0].value, 'm-d-Y');
        var dtCdrStart = Ext.Date.format(me.getCdr_dtRangeStart().value, 'm-d-Y');
        var dtCdrEnd = Ext.Date.format(me.getCdr_dtRangeEnd().value, 'm-d-Y');
        if (dtCdrEnd != dtUserEnd || dtCdrStart != dtUserStart) { //if user changes end date, all other info may need to change as well (inside else stmt)
            //2/15/13 will change end date, change to count of days & 'days', uncheck both checkboxes
            var val, elapsed = 0;
            dtUserStart = dtUserStart ? Ext.Date.parseDate(dtUserStart,'m-d-Y') : '';
            dtUserEnd =  Ext.Date.parseDate((dtUserEnd ? dtUserEnd : Ext.Date.format(new Date(),'m-d-Y')),'m-d-Y');
            me.getCdr_dtRangeEnd().setValue(dtUserEnd);
              
            if (dtUserStart != dtCdrStart) { //start passed in, it is new
               if (dtUserStart != '') {
                    me.getCdr_dtRangeStart().setValue(dtUserStart); 
                    elapsed = parseInt(Ext.Date.getElapsed(dtUserEnd,dtUserStart) / (1000 * 60 * 60 * 24)); //ms converted to days
               }
            }
            me.getCdr_chkFiscal().setValue(false);
            me.getCdr_chkWhole().setValue(dtUserEnd != Ext.Date.parse(Ext.Date.format(new Date(), 'm-d-Y'),'m-d-Y'));
            me.getCdr_rdUnit().setValue({
                customdate: 'd'
            });
            me.getCdr_txtCount().setValue(elapsed);
        }
    }

});