Ext.define('SearchTool.controller.Sources', {
			extend : 'Ext.app.Controller',
			views : ['SearchSources'],
			model : ['Source'],
			stores : ['Sources'],
			requires : ['SearchTool.util.dom'],
			init : function() {
				this.chkSources = [];
				//add listeners to Sources store
				this.getSourcesStore().addListener('datachanged',this.availSources,this);
				this.getSourcesStore().addListener('load',this.addSources,this);
				
				this.control({
					'checkbox[itemId=chkProdAll]' : {
						change : this.toggleAllProducts
					},
					'checkbox[itemId=chkSrcAll]' : {
						change : this.toggleAllSources
					},
					'checkboxgroup[itemId=chkgrpProducts]' : {
						beforerender:this.addChkAllProducts
					}
		    		,
					'checkboxgroup[itemId=chkgrpDataSource]' : {
						beforerender:this.addChkAllSources
					}
					,
					'searchSources' : {
						collapse : this.panelCollapse
					},
					'searchNav' : {
						collapse : this.panelCollapse
					},
					
					'panel[itemId=pnlTools]' :{
						expand : this.panelExpand
					}
				});
			}//init
			,
			panelCollapse : function(p,d){  
				var n = Ext.ComponentQuery.query('searchNav')[0].collapsedHorizontal();
				var s = Ext.ComponentQuery.query('searchSources')[0].collapsedHorizontal();
				if (n && s)
					Ext.ComponentQuery.query('#pnlTools')[0].collapse(Ext.Component.DIRECTION_LEFT,true);
				else if (n)
					Ext.ComponentQuery.query('#pnlTools')[0].width -= (Ext.ComponentQuery.query('searchSources')[0].width + 10);
				
				//pnlTools.collapsed
			}
			,
			panelExpand : function(p){  
//				var n = Ext.ComponentQuery.query('searchNav')[0].collapsedHorizontal();
//				var s = Ext.ComponentQuery.query('searchSources')[0].collapsedHorizontal();
//				if (n && s) {
					Ext.ComponentQuery.query('searchNav')[0].expand(true);
					Ext.ComponentQuery.query('searchSources')[0].expand(true);
//				}
			}
			,
			addSources : function(t,records){ 
				for ( var i = 0; i < records.length; i++) { 
					this.chkSources.push(Ext.create('Ext.form.field.Checkbox',{
							boxLabel: records[i].get('boxLabel'), 
							xtype: 'checkbox',
							itemId: records[i].get('itemId'),
							checked: records[i].get('checked'),
							tooltip: records[i].get('tooltip')
//							,
//							cls : records[i].get('cls')
						}));
					}//for
				var grp = Ext.ComponentQuery.query('#chkgrpDataSource')[0].items.items;
				grp.push(this.chkSources);
				
			},
			availSources : function(t,rec){ 
				 
			},
			// TODO: fix these..no need to have 2 sep functions here..
			// singleton manager for checkbox groups
			toggleAllProducts : function(b, e) {
				grp = '#chkgrpProducts';
				var arrProducts = Ext.ComponentQuery.query(grp)[0].items.items; 
				SearchTool.util.dom.toggleCheckBoxArray(b.value, arrProducts);
			}// toggleAllProducts
			,
			toggleAllSources : function(b, e) {
				var grp = '#chkgrpDataSource';
				var arrProducts = Ext.ComponentQuery.query(grp)[0].items.items;
				SearchTool.util.dom.toggleCheckBoxArray(b.value, arrProducts);

			}//toggleAllSources
			,
			//TODO: fix these..no need to have 2 sep functions here.. in view
			addChkAllProducts : function() { 
				var grp = '#chkgrpProducts'; 
				var allChkbox = Ext.create('Ext.form.field.Checkbox',{boxLabel: 'All', itemId: 'chkProdAll', name:'chkProdAll', checked:true, tooltip:'Prodall tooltip'});
				Ext.ComponentQuery.query(grp)[0].items.items.unshift(allChkbox);
				 			   	
			},
			addChkAllSources : function() {  
				var grp = Ext.ComponentQuery.query('#chkgrpDataSource')[0].items.items;
				var allChkbox = Ext.create('Ext.form.field.Checkbox',{boxLabel: 'All', itemId: 'chkSrcAll', name:'chkSrcAll', checked:true, tooltip:'SrcAll tooltip'});
				grp.unshift(allChkbox);  
//				Ext.ComponentQuery.query(grp)[0].items.items.push
			}
				 
	});