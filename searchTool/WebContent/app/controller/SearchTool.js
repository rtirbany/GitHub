//TODO: autocreate viewport
//TODO: ensure widget sizing meets scotts needs...
//TODO: move cbox, btns down and have banner area ..logout and help btn
//TODO: populate history w/  mouseover gives more details (time stamp, num results)
//TODO: collapse top area..add sources ability 
//TODO: render toolbar to panel or viewport..topmost position.  definied in searchMain.js view..using it's itemId 
//TODO: align:'stretch' on search mgmt tabs..ellipsis (no horiz scrollbar) w/ tooltip
//TODO: resize behavior of west-side panel items...dyn resize
//TODO: remove horiz scrollbar from west-side panel items
//TODO: center/shrink to fit west side panel history and saved containers --too wide



Ext.define('SearchTool.controller.SearchTool',{
	extend:'Ext.app.Controller',
	views:['Main'],
	model:['Product'],
	stores:['Products'],
	requires:['SearchTool.util.dom'],
//	refs:[
//		{ref:'history',
//		 selector:'tbHistory'
//		}
//	],
	init:function(){
		//var productStore = this.getStore('Products');
		this.control({
			'button[itemId=btnSearch]' : {
				click: this.executeSearch
			}
			, 
			'button[itemId=btnHelp]' : {
				click: this.btnHelpHandler
			}
			,
			'button[itemId=btnLogout]' : {
				click: this.btnLogoutHandler
			} 
		});//control function
	},
	executeSearch : function(btn,e){  
				//IE8 doesn't support trim, so this is req'd
				if(typeof String.prototype.trim !== 'function') {
  					String.prototype.trim = function() {
    					return this.replace(/^\s+|\s+$/g, ''); 
  					}
				}
		   		var val = Ext.ComponentQuery.query('#cboxSearch')[0].getValue().trim();
		   		var boolSaveQuery = Ext.ComponentQuery.query('#chkSaveQuery')[0].getValue();
				if (val && val.length > 0) { 
					var k = val;
					//var b = Ext.create('SearchTool.view.linkbutton',{ itemId:'itemId="1-btnWrap"', text:'Search', url:k, tooltip:'hi\ntest'});
					var b = Ext.create('SearchTool.view.linkbutton',{ text:'Search', url:k, tooltip:'title\ntest'});
					if (boolSaveQuery)
						target='#tbSaved'
					else 
					   	target='#tbHistory'
					SearchTool.util.dom.modTabChildren(target,0,b,true);//,tooltip:"Ext.Date.format(new Date(),'F d g:i a')"},true);
				}//if
			}//executeSearch
			,
	
			btnHelpHandler : function(b,e){
				Ext.Msg.alert('Help','some help page');
			},
			btnLogoutHandler : function(b,e){
				Ext.Msg.confirm('Confirm Logout','Do you wish to log out of the system?');
			} 
			 
});