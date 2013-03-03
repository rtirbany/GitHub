//TODO: ensure widget sizing meets scotts needs...
//TODO: move cbox, btns down and have banner area ..logout and help btn
//TODO: populate history w/  mouseover gives more details (time stamp, num results)
//TODO: render toolbar to panel or viewport..topmost position.  definied in searchMain.js view..using it's itemId 
//TODO: align:'stretch' on search mgmt tabs..ellipsis (no horiz scrollbar) w/ tooltip
//TODO: center/shrink to fit west side panel history and saved containers --too wide
Ext.define('SearchTool.controller.SearchTool', {
    extend: 'Ext.app.Controller',
    views: ['Viewport'],
    models: ['Product'],
    stores: ['Sources', 'Keywords', 'Results'],
    requires: ['SearchTool.util.dom', 'SearchTool.view.help.Reference', 'SearchTool.view.linkbutton'],
    refs: [{
        ref: 'history',
        selector: 'container[itemId=tbHistory]'
    }],
    init: function () {
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            searchKeyword: function (val, field) {
                if (/^[a-z0-9]+$/i.test(val)) {
                    return true;
                }
            },
            searchKeyword: 'Keywords may only contain letters and numbers.'
        });

        me.control({
            'button[itemId=btnSearch]': {
                click: me.searchHandler
            },
            'button[itemId=btnHelp]': {
                click: me.btnHelpHandler
            },
            'button[itemId=btnLogout]': {
                click: me.btnLogoutHandler
            }
        }); //control function
    },
    searchHandler: function (btn, e) {
        var valKeyword = null,
            valBool = null,
            boolSaveQuery = null,
            boolRestrictQuery = null;
        var tmp = Ext.ComponentQuery.query('#cboxSearch')[0];
        valKeyword = tmp.getValue() ? tmp.getValue().trim() : '';
        tmp = Ext.ComponentQuery.query('#txtSearchBoolean')[0];
        valBool = tmp.getValue() ? tmp.getValue().trim() : '';
        Ext.ComponentQuery.query('#hdnBool')[0].setValue(valBool);
        Ext.ComponentQuery.query('#cboxSearch')[0].setValue(valKeyword);
        boolSaveQuery = Ext.ComponentQuery.query('#chkSaveQuery')[0].getValue();
        boolRestrictQuery = Ext.ComponentQuery.query('#chkSummaryOnlySearch')[0].getValue();
        var form = btn.up('container').prev('tabpanel').down('form');
        if ((valKeyword && valKeyword.length > 0) || (valBool && valBool.length > 0)) {
            var k = 'kw=' + valKeyword + ';bool=' + valBool + ';';

            var t = 'title\ntest'
            //var b = Ext.create('SearchTool.view.linkbutton',{ itemId:'itemId="1-btnWrap"', text:'Search', url:k, tooltip:'hi\ntest'});
            var b = Ext.create('SearchTool.view.linkbutton', {
                text: 'Query',
                url: k,
                tooltip: t
            });
            if (boolSaveQuery) {
                target = '#tbSaved'
            } else target = '#tbHistory'
            //                       SearchTool.util.dom.addTabChild(target,0,b,true);//,tooltip:"Ext.Date.format(new Date(),'F d g:i a')"},true);

            //                       Ajax request
            if (form.getForm().isValid()) {
                var params = form.getValues();
                Ext.apply(params,{'boolSaveQuery':boolSaveQuery});
                form.up('tabpanel').el.mask(SearchTool.config.Config.msgQuery, 'x-mask-loading');
                this.getStore('Results').clearFilter(true);
                this.getStore('Results').filter(Ext.JSON.encode(params));
                form.up('tabpanel').el.unmask();
                //                              form.getForm().submit({
                //                                   method: 'POST',
                //                                   url: 'someurl',
                //                                   success: onQuerySuccess,
                //                                   failure: onQueryFailure
                //                              });

                //                              Ext.Ajax.request({
                //                                   url:SearchTool.config.Config.sources,
                //                                   jsonData : Ext.JSON.encode(params),
                //                                   success: function(resp,opts){  
                //                                        
                //                                   },
                //                                   failure: function(resp,opts){//: 'Communication error (Query Service)', 
                //                                        Ext.Msg.alert(SearchTool.config.Config.msgErrorQueryTitle,SearchTool.config.Config.msgErrorQueryText+'\r\n'+
                //                                        resp.statusText);
                //                                   },
                //                                   callback: function(o,s,r){
                //                                        form.up('viewport').el.unmask();
                //                                        Ext.Msg.alert('Title',r.responseText);
                //                                   }
                //                               });
            }
        } //if
    },
    btnHelpHandler: function (b, e, o) {
        var ref = Ext.ComponentQuery.query('#help_ref');
        if (ref.length == 0) {
            Ext.create('SearchTool.view.help.Reference').show();
        } else {
            ref[0].center();
            ref[0].show();
        }
    },
    btnLogoutHandler: function (b, e) {
        Ext.Msg.confirm('Confirm Logout', 'Do you wish to log out of the system?');
    }

});