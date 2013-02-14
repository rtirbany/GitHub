Ext.define('SearchTool.controller.CustomDateRange', {
    extend: 'Ext.app.Controller',
    views: ['main.component.PnlDateRange', 'main.SearchArea'],
    refs: [{
        ref: 'cdr_ChkFiscal',
        selector: '#chkFiscal'
    }, {
        ref: 'cdr_ChkWhole',
        selector: '#chkWhole'
    }, {
        ref: 'cdr_DtRangeEnd',
        selector: '#dtRangeEnd'
    }, {
        ref: 'cdr_TxtCount',
        selector: '#txtCount'
    }, {
        ref: 'cdr_Customdate',
        selector: '#customdate'
    }, {
        ref: 'cdr_RdUnit',
        selector: '#rdUnit'
    }, {
        ref: 'sa_chkFiscal',
        selector: '#cd_chkFiscal'
    }, {
        ref: 'sa_chkWhole',
        selector: '#cd_chkWhole'
    }, {
        ref: 'sa_dtRangeEnd',
        selector: '#cd_dtRangeEnd'
    }, {
        ref: 'sa_dtRangeFrom',
        selector: '#cd_dtRangeStart'
    }, {
        ref: 'sa_txtCount',
        selector: '#cd_txtCount'
    }, {
        ref: 'sa_rdUnit',
        selector: '#cd_rdUnit'
    }],
    init: function () {
        var me = this;
        me.getFromSearchArea;
        me.control({
            'button[itemId=btnCustomDateRange]': {
                click: me.processForm
            },
            'button[itemId=btnCustomDate]': {
                click: me.addToParentTab
            }

        }); //control function
    }, //init
    addToParentTab: function (b, e, o) {
        me = this;
        var cdf = Ext.ComponentQuery.query('#customdate');
        if (cdf.length == 0) {
            var cdr = Ext.create('SearchTool.view.main.component.PnlDateRange');
            me.getFromSearchArea();
            var activeTab = b.up('tabpanel').getActiveTab();
            activeTab.add(cdr).show();
        } else {
            me.getFromSearchArea();
            cdf[0].center();
            if (cdf[0].collapsed) cdf[0].expand();
            cdf[0].show();
        }
    },
    processForm: function (b, e) {
        me = this;
        //get values from SA 
        var f = me.getCdr_ChkFiscal().value;
        var w = me.getCdr_ChkWhole().value;
        var c = me.getCdr_TxtCount().value;
        var u = me.getCdr_RdUnit().getValue().customdate;
        var date2 = me.getCdr_DtRangeEnd().value;
        //assign info to hidden fields of Search Area for later retrieval
        me.assignToSearchArea();
        var date1;
        //               switch (u){
        //               case 'd' : 
        //               
        //               }
        if (u == 'd' || u == 'w') {
            c = (u == 'w' ? c * 7 : c);
            if (w) {
                if (u == 'd') {
                    //date1 = Ext.Date.add(date1, Ext.Date.DAY,-1); 
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
                //get the month and subtract 1
                date2 = Ext.Date.getLastDateOfMonth(Ext.Date.add(date2, Ext.Date.MONTH, (-1)));
                c -= 1;
                if (u == '6m') c -= 5; //remove 5 more units
                date1 = Ext.Date.add(date2, Ext.Date.MONTH, -c);
                date1 = Ext.Date.getFirstDateOfMonth(date1);
            }
        } else if (u == 'q') {
            date1 = date2;
            var m = parseInt(Ext.Date.format(date1, 'm'));
            var y = parseInt(Ext.Date.format(date1, 'Y'));
            var currentQuarter = Math.floor((m - 1) / 3) + 1;
            y -= parseInt(c / 4); //adjusts year
            currentQuarter -= c % 4;
            if (currentQuarter > 4) {
                currentQuarter -= 4;
                y += 1;
            } else if (currentQuarter < 1) {
                currentQuarter += 4;
                y -= 1;
            }
            var lastFullQStart = ((((currentQuarter - 1) * 3) + 1) < 10) ? y + '-0' + (((currentQuarter - 1) * 3) + 1) : y + '-' + (((currentQuarter - 1) * 3) + 1);
            lastFullQStart = Ext.Date.getFirstDateOfMonth(Ext.Date.parse(lastFullQStart, 'Y-m'));
            var lastFullQEnd = Ext.Date.getLastDateOfMonth(Ext.Date.add(lastFullQStart, Ext.Date.MONTH, 2));
            date1 = Ext.Date.format(lastFullQStart, 'm-d-Y');
            date2 = Ext.Date.format(lastFullQEnd, 'm-d-Y');

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
        Ext.ComponentQuery.query('#dtSearchFrom')[0].setValue(date1);
        Ext.ComponentQuery.query('#dtSearchTo')[0].setValue(date2);
    },
    assignToSearchArea: function () {
        me.getSa_chkFiscal().setValue(me.getCdr_ChkFiscal().value);
        me.getSa_chkWhole().setValue(me.getCdr_ChkWhole().value);
        me.getSa_txtCount().setValue(me.getCdr_TxtCount().value);
        me.getSa_rdUnit().setValue(me.getCdr_RdUnit().getValue().customdate);
        me.getSa_dtRangeEnd().setValue(me.getCdr_DtRangeEnd().value);
    },

    getFromSearchArea: function () {
        var dtSa = me.getSa_dtRangeEnd().value;
        var dtEndUser = Ext.ComponentQuery.query('#dtSearchTo')[0].value;
        if (dtSa != dtEndUser) { //if user changes end date, all other info may need to change as well (inside else stmt)
            me.getCdr_DtRangeEnd().setValue(dtEndUser);
        } else {
            me.getCdr_ChkWhole().setValue(me.getSa_chkWhole().value);
            me.getCdr_ChkFiscal().setValue(me.getSa_chkFiscal().value);
            me.getCdr_TxtCount().setValue(me.getSa_txtCount().value);
            me.getCdr_RdUnit().setValue({
                customdate: me.getSa_rdUnit().getValue().customdate
            });
        }
    }

});