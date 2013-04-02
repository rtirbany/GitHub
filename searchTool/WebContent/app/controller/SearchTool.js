//TODO: ensure widget sizing meets scotts needs...
//TODO: move cbox, btns down and have banner area ..logout and help btn
//TODO: populate history w/  mouseover gives more details (time stamp, num results)
//TODO: render toolbar to panel or viewport..topmost position.  definied in searchMain.js view..using it's itemId 
//TODO: align:'stretch' on search mgmt tabs..ellipsis (no horiz scrollbar) w/ tooltip
//TODO: center/shrink to fit west side panel history and saved containers --too wide
Ext.define('SearchTool.controller.SearchTool', {
    extend: 'Ext.app.Controller',
    views: ['Viewport', 'SearchTool.view.help.Reference'],
    models: ['Product'],
    stores: ['Sources', 'Keywords', 'Results','Acros','QueryFilters'],
    requires: ['SearchTool.util.dom'],
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
        var form = btn.up('form');
        if (form.getForm().isValid()) {
                var params = form.getValues(),
                k = '',// + valKeyword + ';bool=' + valBool + ';'; 
                t = '',
                idx = -1,
                m = null; 
                form.up('tabpanel').el.mask(SearchTool.config.Config.msgQuery, 'x-mask-loading'); 
                var filters = this.getQueryFiltersStore(),i,
                    arrParams = [{type:'searchkeyword',key:'keywordString',value:params.keywordString.trim()},
                         {type:'searchboolean',key:'booleanString',value:params.txtSearchBoolean.trim()},
                         {type:'startdate',key:'startdate',value:params.startDate},
                         {type:'enddate',key:'enddate',value:params.endDate}
                    ];
                for (i=0;i<arrParams.length;i++){
                    t = arrParams[i];
                    idx = Ext.Array.indexOf(Ext.Array.pluck(Ext.Array.pluck(filters.data.items,'data'),'type'),t.type);
                    if (t.value.length >0) {
                        m = Ext.create('SearchTool.model.QueryFilter',{type:t.type,key:t.key,tip:t.value,value:t.value}); 
                        idx > -1 ? Ext.Array.splice(filters.data.items,idx,1,m) : filters.add(m);//replace if it exists, otherwise add 
                    }
                    else {
                         filters.removeAt(idx);
                    }
                }
                Ext.ComponentQuery.query('#dvResultsParams')[0].refresh();
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
        } //if
    },
    btnHelpHandler: function (b, e, o) {
        var ref = Ext.ComponentQuery.query('#help_ref');
        if (ref.length == 0) {
            Ext.create('SearchTool.view.help.Reference').show();
        } else {
            ref[0].center().show();
        }
    },
    btnLogoutHandler: function (b, e) {
        Ext.Msg.confirm('Confirm Logout', 'Do you wish to log out of the system?');
    }

});