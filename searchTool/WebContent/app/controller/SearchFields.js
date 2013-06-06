//TODO: [reponame]prodname:field="val" AND [reponame]prodname.:field="val2"
//TODO: valid opers: =, >=, <=, !=, <, >
var errWin = Ext.create('Ext.window.Window', {
        title: 'Errors found',
        height: 250,
        width: 270,
        hidden: true,
        layout: 'fit',
        items: [{
                xtype: 'grid',
                border: false,
                columns: [{
                        header: 'Line #',
                        dataIndex: 'line'
                    }, {
                        header: 'Error',
                        dataIndex: 'mssg'
                    }
                ]
            }
        ],
        buttons: Ext.Msg.OKCANCEL
    })

Ext.define('SearchTool.controller.SearchFields', {
        extend: 'Ext.app.Controller',
        models: ['SearchField'],
        views: ['main.component.QueryBuilder', 'main.component.QueryBuilderRow'],
        //    views : ['QueryBuilderRow'],  //per recommendation of dev-all, moved QueryBuilder into requires
        requires: ['SearchTool.util.dom'],
        //    stores : ['SearchFields'],
        //    stores : ['QBuilderOperators'],
        init: function () {
            var me = this;
            me.control({
                    //                     'button[itemId=btnCustomDate]' : {
                    //                click : me.addToParentTab
                    //           },
                    'button[itemId=btnBuildQuery]': {
                        click: me.buildQuery
                    }
                });
        }, //init
        buildQuery: function (b) {
            var dest = Ext.ComponentQuery.query('#txtSearchBoolean')[0],
                qbrows = b.up('panel').items.items,
                row, s = 2,
                errArr = [],
                newval = '',
                tmpRow = '',
                last = '',
                ln = '',
                msg = '';
            Ext.Array.forEach(qbrows, function (row, i) {
                last = row.down('hidden').getValue();
                tmpRow = SearchTool.util.dom.qBuilderRowValidations(i, row, last);
                newval += tmpRow + '\r\n';
                tmpRow = '';
                last = '';
            });
            //tmp = (tmpRow == '' ) ? '' : '( '+tmpRow+' )' + last + '\r\n'
            //tmp += '\r\n';
            //TODO: Error msg popup? 1 of 2
            //TODO: ensure that line# of 2 digits decomposes properly into ln, msg
            //               if (tmpRow.indexOf('-- ERROR') > -1) {
            //                    errEl = tmpRow.substring(15);
            //                    ln = errEl.substring(0,errEl.indexOf(':'));
            //                    msg = errEl.substring(errEl.indexOf(':')+1);
            //                    var x = new Object({'line':ln,'mssg':msg}); 
            //                    errArr.push(x);
            ////                  errArr += tmpRow + '\r\n';
            //               }
            ////             else  
            s += (last == '' ? last.length : 0);
            dest.setValue(newval.slice(0, -(s))); //always remove last 2 chars

            //TODO: Error msg popup? 2 of 2
            //          if (errArr != '') {
            //               //Ext.Msg.show({title:'Errors found',value:errArr,buttons:Ext.Msg.OKCANCEL,readOnly:true,multiline:true});
            //               debugger;
            //               errWin.items.data = errArr;
            //               errWin.center();
            //               errWin.show();
            //          }

        }

    });