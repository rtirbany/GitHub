Ext.define('SearchTool.view.help.ReferenceGrid',{
     extend: 'Ext.grid.Panel',
     alias: 'widget.refgrid',
     store: 'Acros',
     stripeRows: true,
     columnLines: true,
     overflowY: 'auto',
     overflowX: 'hidden',
     width:'100%',
     initComponent:function(){
          this.columns = [{
                        text: 'Acronym',
                        dataIndex: 'acro',
                        flex: .25
                        //            sortable: true,
                        //            align: 'center',
                        //            tooltip: 'Product'
                    }, {
                        text: 'Definition',
                        dataIndex: 'def',
                        align: 'left',
                        flex: .75,
                        renderer : function(v,m,r){
                           m.style += "white-space: normal;text-align: left;";
                           return v;
                        }
                        //            tooltip: 'Serial No.'
                    }],
                    this.callParent(arguments);
     }
     
});