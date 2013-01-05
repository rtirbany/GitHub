Ext.define('SearchTool.controller.Sources', {
			extend : 'Ext.app.Controller',
			views : ['PnlSources'],
			model : ['Source'],
			stores : ['Sources'],
			requires : ['SearchTool.util.dom'],
			//TODO: fix refs
			  refs : [
				{
					ref:'searchPanel',
					selector: 'pnlSearch'
				},
				{
					ref:'sourcesPanel',
					selector: 'pnlSources'
				},
				{
					ref:'toolsPanel',
					selector: 'pnlTools'
				}
			], 
			init : function() {
				this.chkSources = [];
				//add listeners to Sources store
				//TODO: must use databound component for dyn updates, etc
				//admin adds/removes availability of a source
				this.getSourcesStore().addListener('datachanged',this.availSources,this);
				//sources are loaded
				//this.getSourcesStore().addListener('load',this.addSources,this);
				
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
//		    		,
//					'checkboxgroup[itemId=chkgrpDataSource]' : {
//						beforerender:this.addChkAllSources
//					}
					,
					'pnlSources' : {
						collapse : this.panelCollapse
					},
					'pnlSearch' : {
						collapse : this.panelCollapse
					},
					
					'panel[itemId=pnlTools]' :{
						expand : this.panelExpand
					}
				});
			}//init
			,
			panelCollapse : function(p,d){    
				var n = this.getSearchPanel();
				var s = this.getSourcesPanel();
				if (n.collapsedHorizontal()) {
				   if (s.collapsedHorizontal()) { 		//both collapsed 
						Ext.ComponentQuery.query('#pnlTools')[0].collapse(Ext.Component.DIRECTION_LEFT,true); 
				   }
				   else  { //just searchNav
						t = this.getToolsPanel();
						Ext.Msg.alert('nav only');
						n_width = this.getSearchPanel().getWidth();
						s_width = this.getSourcesPanel().getWidth();
						//TODO: Programmatically fix collapse of Search Filters while Sources remain open to auto-adjust parent width
				  }
				  
					//Ext.ComponentQuery.query('#pnlTools')[0].width -= (Ext.ComponentQuery.query('searchSources')[0].width + 10);
				}//if
				//pnlTools.collapsed 
			}
			,
			panelExpand : function(p){  
//				var n = Ext.ComponentQuery.query('searchNav')[0].collapsedHorizontal();
//				var s = Ext.ComponentQuery.query('searchSources')[0].collapsedHorizontal();
//				if (n && s) {
					this.getSearchPanel().expand(true);
					this.getSourcesPanel().expand(true);
//				}
			}
			, 
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
			//TODO: move to view, fix these..no need to have 2 sep functions here.. in view
			addChkAllProducts : function() { 
				var grp = '#chkgrpProducts'; 
				var allChkbox = Ext.create('Ext.form.field.Checkbox',{boxLabel: 'All', itemId: 'chkProdAll', name:'chkProdAll', checked:true, tooltip:'Prodall tooltip'});
				Ext.ComponentQuery.query(grp)[0].items.items.unshift(allChkbox);
				 			   	
			}
				 
	});