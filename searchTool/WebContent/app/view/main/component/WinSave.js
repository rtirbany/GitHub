var tpl = Ext.create ('Ext.Template',['{name} saved successfully.']);

Ext.define('SearchTool.view.main.component.WinSave', {
			extend : 'Ext.window.Window',
			alias : 'widget.winSave',
			title : 'Save',
			height : 125,
			resizable : false,
			modal : true,
			width : 200,
			closeable : false,
			layout : 'fit',
			hidden : true,
			border : true,
			initComponent : function(){
				var me = this;
				Ext.applyIf(me,{
				items:[
				{xtype:'form',url:'/saveItem', frame:true, defaultType : 'textfield', defaults : {
							anchor : '-10',
							labelWidth : 65
						},
						items : [{
									fieldLabel : 'Name',
									name : 'name'
								}, {
									fieldLabel : 'Description',
									name : 'description'
								}],
						buttons : [{
									text : 'Save',
									handler : function() {
										this.up('form').submit();
									}
								}]}
				]}
				);
				me.callParent(arguments);
			}  
		});
		
		//2/5 Ext.Msg.show({title:'Errors found',msg:errArr,buttons:Ext.Msg.OKCANCEL,multiline:true});