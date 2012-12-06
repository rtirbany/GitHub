//TODO: autocreate viewport
//TODO: ensure widget sizing meets scotts needs...
//TODO: move cbox, btns down and have banner area ..logout and help btn
//TODO: populate history w/  mouseover gives more details (time stamp, num results)..displayfield or ?
//TODO: collapse top area..add sources ability 
//TODO: render toolbar to panel or viewport..topmost position.  definied in searchMain.js view..using it's itemId 
//TODO: align:'stretch' on search mgmt tabs..ellipsis (no horiz scrollbar) w/ tooltip



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
			'checkboxgroup' : {
				check:this.toggleAllProducts
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
		   		var val = Ext.ComponentQuery.query('#cboxSearch')[0].getValue().trim();
				if (val && val.length > 0) { 
					var k = '<a href="'+val+'" tip="'+val+'"> '+val+'</a>'; 
					SearchTool.util.dom.modTabChildren('#tbHistory',0,k,{xtype:"displayfield",border:false,value:k,tips:"hi",qtips:"dd",tooltip:"Ext.Date.format(new Date(),'F d g:i a')"},true);
				}//if
			}//executeSearch
			,
	
			btnHelpHandler : function(b,e){
				Ext.Msg.alert('Help','some help page');
			},
			btnLogoutHandler : function(b,e){
				Ext.Msg.confirm('Logout','Do you wish to log out of the system?');
			},
			toggleAllProducts : function(b, e) {
				if (b.name = 'cboxAll') {
				var arrProducts = Ext.search('.cboxProducts');
				arrProducts.setValue(b.getValue());
	 	}
	}//toggleAllProducts
});