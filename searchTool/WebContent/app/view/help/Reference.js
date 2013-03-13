var alphabeticalTbar = function (limit) {
    alphaTbarItems = new Array();

    for (var i = 64; i < 91; i++) { // JS char codes from (upper) 0-9 - A to Z
        var myChar = String.fromCharCode(i); // get the letter from the char code
        alphaTbarItems.push({ // add this vars to the array
            cls: 'alphaTbarBtn',
            text: i == 64 ? '0-9' : myChar, // if index = 64 numbers, else just the letter
            id: 'tbaritem' + myChar, // this button id will contain the letter
            enableToggle: true, // only one will be pressed
            toggleGroup: 'alphaTbarItems',
            handler: function (f,v) { // when this button is pressed               
                                if (f.pressed) {
                                   this.up('panel').down('refgrid').store.clearFilter(true);
                                   this.up('panel').down('refgrid').store.filter('acro',f.text.slice(0,1));
                                }
                                else
                                    this.up('panel').down('refgrid').store.clearFilter();
//                                if (this.pressed) { // if it is now in a "pressed" state (toggle is enabled)
//                                    //insert the paramater right into the store
//                                    store.setBaseParam('index_search',i==64 ? 0 : this.text);
//                                    store.load({ // reload the dataStore
//                                        params: { 
//                                            //index_search: i==64 ? 0 : this.text,
//                                            start:limit ? 0 : false,
//                                            limit:limit ? limit : false 
//                                        } // passing the letter as parameter
//                                    });                    
//                                } else {
//                                    // if it is unpressed, reload the dataStore with full list
//                                    store.setBaseParam('index_search',false);
//                                    store.load({params:{start:0,limit:limit,query:'',index_search:false}}); 
//                                }
            }
        });
    }//for
    return alphaTbarItems;
};


Ext.define('SearchTool.view.help.Reference', {
    extend: 'Ext.form.Panel',
    itemId: 'help_ref',
    title: 'Help',
    requires: ['Ext.ux.GroupTabPanel','Ext.tab.Panel','SearchTool.view.help.ReferenceGrid','SearchTool.GridPortlet','SearchTool.PortalPanel','SearchTool.ChartPortlet','SearchTool.PortalColumn','SearchTool.Portlet'],
    resizable: true,
    floating: true,
    draggable: true,
    width: 425,
    height: 500,
    frame: true,
    layout: 'fit',
    tools: [{
        xtype: 'tool',
        type: 'close',
        handler: function (e, target, p, tool) {
            this.up('panel').hide();
        }
    }],
    bbar: {
        itemId: 'bbarFind',
        items: [{

            xtype: 'pagingtoolbar',
//            store: this.up('panel').down('refgrid').store,
            //        hideRefresh: true,
            displayMsg: 'Results {0} - {1} of {2}',
            border: false,
            //        displayInfo: true,
            emptyMsg: 'No items to display',
            prependButtons: false,
            items: [{
                xtype: 'textfield',
                listeners : {
                    'change' : function(f,v){
                          this.up('panel').down('refgrid').store.clearFilter(true);
                          if (v.length > 0) {
                              this.up('panel').down('refgrid').store.filter('acro',v);
                          }
                    }
                
                }
            }, {
                iconCls : 'icon-btnClear',
                handler: function(b,v){
                    this.up('panel').down('refgrid').store.clearFilter();
                    this.prev('textfield').reset();
                }
            }]
        }]
    },
    rbar: {
        items: alphabeticalTbar(25),
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    items: [ //grouptabpanel
    
      {
//            xtype: 'grouptabpanel',
//            activeGroup: 0,
//            deferredRender:false,
//            items: [
//               {
//                mainItem: 0,
//                items: [{ 
//                    //all of these are 1st main tab, w/ Help Pages as main category
//                    title: 'Help Pages',  
//                    //border: false,
//                    items:[{xtype:'panel',title:'hi'}],
//                    height: null
//                },{
//                    title: 'Using the Tool',  
//                    //border: false,
//                    xtype: 'gridportlet',
//                    height: null
//                },{
//                    title: 'How To...',
//                    style: 'padding: 10px;',
//                    border: false,
//                    layout: 'fit',
//                    items: [{
//                        xtype: 'panel', 
//                            html: '<p>Lorem ipsum dolor sit amet,  Suspendisse nunc sem, pretium eget, cursus a, fringilla.</p>'
//                    }]  
//                },{
//                    xtype: 'portalpanel',
//                    title: 'FAQ',
//                    tabTip: 'Dashboard tabtip',
//                    border: false,
//                    items: [{
//                        flex: 1,
//                        items: [{
//                            title: 'Portlet 1',
//                            html: '<div class="portlet-content"><p>Suspendisse nunc sem, pretium eget, cursus a, fringilla.</p></div>'
//                        },{
//                            title: 'Portlet 2',
//                            html: '<div class="portlet-content"><p>Suspendisse nunc sem, pretium eget, cursus a, fringilla.</p></div>'
//                        }]
//                    }]                  
//                }]
//            }
//            , 
//               { //2nd main tab
//                items: [{
//                    title: 'Quick Reference',
//                    style: 'padding: 10px;',
//                    rbar: {
//                         items: alphabeticalTbar(25),
//                         overflowY: 'auto',
//                         overflowX: 'hidden'
//                    },
//                    items:[{
                            xtype: 'refgrid' // since we are not using the default 'panel' xtype, we must specify it
                            
//                    }]
//                    
//                }, {
//                    title: 'Camaro',
//                    style: 'padding: 10px;',
//                    border: false,
//                    items:[{
//                         xtype: 'refgrid'
//                        }]
//                    
//                }, {
//                    title: 'Mustang',
//                    style: 'padding: 10px;',
//                    border: false,
//                    items:[{
//                       xtype: 'refgrid'
//                    }]
//                },
//                 {
//                    title: 'Corvette',
//                    style: 'padding: 10px;',
//                    border: false,
//                    items:[{
//                         xtype: 'refgrid'
//                    }] 
//                } 
//                
//                ]
//            }//quick ref panel
//            ]//grouptabpanel item array 
        }
    
    ] //panel items array


});