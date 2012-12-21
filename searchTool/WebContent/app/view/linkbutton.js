Ext.define('SearchTool.view.linkbutton',{
	extend:'Ext.Component',
	alias:'widget.linkbutton',
	renderTpl: '<div id="{id}-btnWrap" style="min-height:24px;" qtip="{ttip}" class="{baseCls}-linkbutton">'+
	'<a href="{url}">'+'{t}'+'</a></div>',
	renderSelectors : {
		linkEl:'a'
	},
	initComponent : function(){
		this.callParent(arguments);
		this.renderData = {
			id: this.id,
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