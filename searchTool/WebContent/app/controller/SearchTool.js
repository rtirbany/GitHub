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
    stores: [ 'Acros','QueriesSaved'],
    requires: ['SearchTool.util.dom'],
    refs: [
               {
                ref: 'history',
                selector: 'container[itemId=tbHistory]'
               }
          ],
    init: function () {
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            searchKeyword: function (val, field) {
                if (/^[a-z0-9]+$/i.test(val)) {
                    return true;
                }
            },
            searchKeywordText: 'Keywords may only contain letters and numbers.'
        }); 
       
       me.control({ 
            'button[itemId=btnHelp]': {
                click: me.btnHelpHandler
            },
            'button[itemId=btnLogout]': {
                click: me.btnLogoutHandler
            },
            'button[itemId=btnVisualize]':{
                click: LaunchViz
            }
        }); //control function
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