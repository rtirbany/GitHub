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
			'checkbox[itemId=cboxgrpDataSource]' : {
				beforerender:this.addCheckBoxSource
			}
		    ,
			'checkbox[itemId=cboxProdAll]' : {
				change:this.toggleAllProducts
			}
			,
			'checkboxgroup[itemId=cboxgrpProducts]' : {
				beforerender:this.addCheckBox
			}
		    ,
			'checkbox[itemId=cboxSrcAll]' : {
				change:this.toggleAllSources
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
					var k = '<a href="'+val+'" tip="'+val+'"> '+val+'</a>';
					if (boolSaveQuery)
						target='#tbSaved'
					else 
					   	target='#tbHistory'
					SearchTool.util.dom.modTabChildren(target,0,k,{xtype:"displayfield",border:false,value:k,tooltip:"Ext.Date.format(new Date(),'F d g:i a')"},true);
				}//if
			}//executeSearch
			,
	
			btnHelpHandler : function(b,e){
				Ext.Msg.alert('Help','some help page');
			},
			btnLogoutHandler : function(b,e){
				Ext.Msg.confirm('Confirm Logout','Do you wish to log out of the system?');
			}
			,
			//TODO: fix these..no need to have 2 sep functions here.. in view
			
			addCheckBox : function() { 
				var grp = '#cboxgrpProducts'; 
				var all = {boxLabel: 'All', xtype:'checkbox', itemId: 'cboxProdAll', name:'cboxProdAll', checked:true, tooltip:'Prod1 tooltip'};
				var arrProducts = Ext.ComponentQuery.query(grp)[0].items.items;
				arrProducts.join(all);
				Ext.ComponentQuery.query(grp)[0].items.items = arrProducts;
				 			   	
			},
			addCheckBoxSource : function() { 
				var grp = '#cboxgrpDataSource'; 
				var all = {boxLabel: 'All', xtype:'checkbox', itemId: 'cboxSrcAll', name:'cboxSrcAll', checked:true, qtip:'Src1 qltip'};
				var arrProducts = Ext.ComponentQuery.query(grp)[0].items.items;
				arrProducts.join(all);
				Ext.ComponentQuery.query(grp)[0].items.items = arrProducts;
				 			   	
			}, 			   	
			
			//TODO: fix these..no need to have 2 sep functions here..in view
			toggleAllProducts : function(b, e) { 
				grp = '#cboxgrpProducts'; 
				var arrProducts = Ext.ComponentQuery.query(grp)[0].items.items;
				SearchTool.util.dom.toggleCheckBoxArray(b.value, arrProducts);
	 		
			}//toggleAllProducts
			,
			toggleAllSources : function(b, e) {
				var grp = '#cboxgrpDataSource';
				var arrProducts = Ext.ComponentQuery.query(grp)[0].items.items;
				SearchTool.util.dom.toggleCheckBoxArray(b.value, arrProducts);
	 		
			}//toggleAllSources
});