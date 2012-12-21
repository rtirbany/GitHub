Ext.define('SearchTool.view.linkbutton',{
	extend:'Ext.Component',
	alias:'widget.linkbutton',
	//TODO: renderTpl or ?  need to be able to reference and update/add tooltip 
	//renderTpl: '<div {itemId}-btnWrap" style="min-height:24px;" title="{ttip}" class="{baseCls}-linkbutton">
	renderTpl: '<div title="{ttip}" style="min-height:24px;" class="{baseCls}-linkbutton">'+
	'<a href="{url}">'+'{t}'+'</a></div>',
	renderSelectors : {
		linkEl:'a'
	},
	initComponent : function(){
		this.callParent(arguments);
		this.renderData = { 
			//itemId: this.itemId,
			t: this.text,
			url: this.url,
			ttip: this.tooltip
		};
	},
	listeners: {
		render : function(lbtn){
			lbtn.el.on('click',this.handler)
//			lbtn.el.on('mouseover',this.mouseoverHandler);
		}
	},
	handler : function(e){
		Ext.Msg.alert('you clicked me');
	},
	mouseoverHandler : function(e){
			Ext.Msg.alert('you ran over me');
	}
	
});