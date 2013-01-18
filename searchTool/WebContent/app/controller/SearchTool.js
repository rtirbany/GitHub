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
	views:['Viewport'],
	models:['Product'],
	stores:['Sources','Keywords'],
	requires:['SearchTool.util.dom'],
	refs:[
		{ref:'history',
		 selector:'container[itemId=tbHistory]'
		}
	],
	init:function(){
		Ext.apply(Ext.form.field.VTypes, {
        searchKeyword: function(val, field) {
            if (/^[a-z0-9]+$/i.test(val)) {
                return true;
            }
        },
        searchKeyword: 'Keywords may only contain letters and numbers.'
    	}); 
    	
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
		   		var val = Ext.ComponentQuery.query('#cboxSearch')[0].getValue().trim();
		   		var boolSaveQuery = Ext.ComponentQuery.query('#chkSaveQuery')[0].getValue();
		   		var boolRestrictedQuery = Ext.ComponentQuery.query('#chkSummaryOnlySearch')[0].getValue(); 
				if (val && val.length > 0) { 
					var k = val;
					var t = 'title\ntest'
					//var b = Ext.create('SearchTool.view.linkbutton',{ itemId:'itemId="1-btnWrap"', text:'Search', url:k, tooltip:'hi\ntest'});
					var b = Ext.create('SearchTool.view.linkbutton',{ text:'Query', url:k, tooltip:t});
					if (boolSaveQuery)
						target='#tbSaved'
					else 
					   	target='#tbHistory'
					SearchTool.util.dom.addTabChild(target,0,b,true);//,tooltip:"Ext.Date.format(new Date(),'F d g:i a')"},true);
					//update reload keywords & sources/product stores
					
					//ajax request
//					Ext.Ajax.request({
//						url:SearchTool.config.Config.sources,
//							success: function(resp,opts){  
//								//setSourcesStore(resp.responseText);
//						},
//						failure:function(resp,opts){}
//					});
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