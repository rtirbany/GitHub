var alphabeticalTbar = function (limit) {
    alphaTbarItems = new Array();

    for (var i = 64; i < 91; i++) { // JS char codes from (upper) 0-9 - A to Z
        var myChar = String.fromCharCode(i); // get the letter from the char code
        alphaTbarItems.push({ // add this vars to the array
            cls: 'alphaTbarBtn',
            text: i == 64 ? '0-9' : myChar, // if index = 64 numbers, else just the letter
            id: 'alphaTbarItem' + myChar, // this button id will contain the letter
            enableToggle: true, // only one will be pressed
            toggleGroup: 'alphaTbarItems',
            handler: function () { // when this button is pressed                
                //                if (this.pressed) { // if it is now in a "pressed" state (toggle is enabled)
                //                    //insert the paramater right into the store
                //                    store.setBaseParam('index_search',i==64 ? 0 : this.text);
                //                    store.load({ // reload the dataStore
                //                        params: { 
                //                            //index_search: i==64 ? 0 : this.text,
                //                            start:limit ? 0 : false,
                //                            limit:limit ? limit : false 
                //                        } // passing the letter as parameter
                //                    });                    
                //                } else {
                //                    // if it is unpressed, reload the dataStore with full list
                //                    store.setBaseParam('index_search',false);
                //                    store.load({params:{start:0,limit:limit,query:'',index_search:false}}); 
                //                }
            }
        });
    }
    return alphaTbarItems;
};


Ext.define('SearchTool.view.help.Reference', {
    extend: 'Ext.form.Panel',
    itemId: 'help_ref',
    title: 'Help',
    requires: ['Ext.ux.GroupTabPanel'],
    resizable: true,
    floating: true,
    draggable: true,
    width: 550,
    height: 600,
    frame: true,
    overflowY: 'auto',
    overflowX: 'hidden'
    //    ,
    //    autoLoad: {
    //        url: 'data/acro.html'
    //    }
    ,
    tools: [{
        xtype: 'tool',
        type: 'close',
        handler: function (e, target, p, tool) {
            this.up('panel').close();
        }
    }],
    tbar: {
        itemId: 'tbarFind',
        items: [{

            xtype: 'pagingtoolbar',
            //        store: 'Results',
            //        hideRefresh: true,
            displayMsg: 'Results {0} - {1} of {2}',
            border: false,
            hidden: true,
            //        displayInfo: true,
            emptyMsg: 'No items to display',
            prependButtons: true,
            items: [{
                xtype: 'textfield'
            }, {
                text: 'Find'
            }, {
                xtype: 'tbseparator'
            }]
        }]
    },
    rbar: {
        items: alphabeticalTbar(myStore, 25),
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    items: [{
        xtype: 'grouptabpanel',
        activeGroup: 3,
        items: [{
            items: [{
                title: 'Using this tool',
                border: false,
                xtype: 'panel',
                height: null
            }]
        }, {
            items: [{
                title: 'FAQ',
                border: false,
                xtype: 'panel',
                height: null
            }]
        }, {
            items: [{
                title: 'How to...',
                border: false,
                xtype: 'panel',
                height: null
            }]
        }, {
            mainItem: 0,
            items: [{
                title: 'Quick Reference',
                border: false,
                xtype: 'panel',
                height: null,
                items: [{
                    items: [{
                        xtype: 'textfield',
                        value: 'hi'
                    }]
                }]
            }, {
                xtype: 'portalpanel',
                title: 'Dashboard',
                border: false,
                items: [{
                    flex: 1,
                    items: [{

                        title: 'Stock Portlet',
                        items: {
                            xtype: 'panel'
                        }
                    }]
                }]
            }, {
                title: 'Subscriptions',
                style: 'padding: 10px;',
                border: false,
                layout: 'fit',
                items: [{
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [{
                        title: 'Nested Tabs'
                        //                            ,
                        //                            html: Ext.example.shortBogusMarkup
                    }]
                }]
            }, {
                title: 'Users',
                style: 'padding: 10px;'
                //                    ,
                //                    html: Ext.example.shortBogusMarkup          
            }],
            listeners: {
                groupchange: function (gtp, n, o, opts) {
                    Ext.Msg.alert('grp change? - activated')
                },
                tabchange: function (gtp, n, o, opts) {
                    Ext.Msg.alert('de-activated')
                }
            }
        }]

    }]

});