var tpl = Ext.create ('Ext.Template',['{name} saved successfully.']);

Ext.define('SearchTool.view.main.component.WinSave', {
			extend : 'Ext.window.Window',
			alias : 'widget.winSave',
			height : 280,
			resizable : false,
			modal : true,
			width : 350,
			closeable : false,
			layout : 'fit',
			hidden : true,
			border : true,
			initComponent : function(){
				var me = this;
				Ext.applyIf(me,{
				items:[
				{
                    xtype:'form',
                    url: SearchTool.config.Config.urlSearchSave,
                    frame: true,
                    headers: {'Content-Type': 'application/json'},
                    defaults : {
							anchor : '-10',
							labelWidth : 65
					},
					items : [
                        {
						    fieldLabel : 'Name',
                            xtype: 'textfield',
							name : 'name'
						},
                        {
						    fieldLabel : 'Description',
                            xtype: 'textarea',
                            maxLength: SearchTool.config.Config.savedSearchDescMaxLength,
							name : 'description'
					    },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Rolling',
                            name: 'dateRoll'
                        },
                        {
                            xtype: 'hidden',
                            name: 'searchId',
                            value: me.searchId
                        }
                    ],
						buttons : [
                            {
                                text : 'Save',
                                iconCls: 'icon-btnOk',
                                handler : function(btn, e) {
                                    var params = this.up('form').getValues();
                                    Ext.Ajax.request({
                                        method: 'POST',
                                        url: SearchTool.config.Config.urlSearchSave,
                                        headers: {'Content-Type':'application/json'},
                                        params: Ext.JSON.encode(params),
                                        success: function (resp, opts){
                                            var f = Ext.ComponentQuery.query('winSave')[0].down('form'),
                                                tb = Ext.ComponentQuery.query('#tbSearch')[0];
                                            f.add({xtype:'displayfield', fieldLabel: 'Result', value:'Success! Query Saved'});
                                            f.down('textfield').disable();
                                            f.down('textarea').disable();
                                            f.down('button').next('button').setText('Close');
                                            f.down('button').hide();
                                            if (tb.getActiveTab().itemId == 'tbSaved') {
                                                tb.setActiveTab(0);
                                                tb.setActiveTab(2);
                                            }
                                        },
                                        failure: function (resp, opts){
                                            var f = Ext.ComponentQuery.query('winSave')[0].down('form');
                                            f.title = 'Save Error (Query ID:'+ f.items.items[2].value+')';
                                            f.down('textfield').disable();
                                            f.down('textarea').disable();
                                            f.add({xtype:'displayfield',fieldLabel:'Results',value:'Error - Unable to save this Query'});
                                            f.down('button').next('button').setText('Close');
                                            f.down('button').hide();
                                        }
                                    });
                                }
							    },{
                                text: 'Cancel',
                                iconCls: 'icon-btnClear',
                                handler: function(){
                                    this.up('window').close();
                                }
                            }
						]}
				]}
				);
				me.callParent(arguments);
			}
		});

		//2/5 Ext.Msg.show({title:'Errors found',msg:errArr,buttons:Ext.Msg.OKCANCEL,multiline:true});