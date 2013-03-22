Ext.define('SearchTool.store.FacetSelections',{
     extend:'Ext.data.Store',
     requires:['SearchTool.config.Config'],
     model:'SearchTool.model.FacetSelection',
     id:'FacetSelections',
     autoLoad:true,
     proxy:{
          type:'ajax',
          url:'data/facetselections.json',
//          filterParam:'facet',
//        afterRequest:function(req,res){ 
//        },
          reader:{ 
               type:'json',
               root:'rows',
               totalProperty:'results',
               successProperty:'success'
          }
     },
     listeners:{
          'datachanged' : 
                //TODO: re-send the query!
                function(store,records,success, operation){
//                  var allChkbox =  Ext.create('SearchTool.model.Source',{'id': 0, 'boxLabel': 'All', 'itemId': 'chkSrcAll', 'name':'chkSrcAll', 'checked':true, 'tooltip':'Srcall tooltip'});
//                  store.add(allChkbox);
//                    store.sort('id','ASC'); 
                         console.log('facet selection changed'+this.data.items.length);
                    }
           //load listener
     }//listeners
//     data:[
//               {    
//                    'key' : 'size',
//                    'value' : '25 cm',
//                    'tip' : 'hi'
//                    
//               }, {  
//                    'key' : 'weight',
//                    'value' : '2lbs',
//                    'tip' : 'hi'
//               }, { 
//                    'key' : 'mass',
//                    'value' : '4kg',
//                    'tip' : 'hi'
//               }, { 
//                    'key' : 'density',
//                    'value' : '20kg/m2',
//                    'tip' : 'hi'
//               }, { 
//                    'key' : 'viscosity',
//                    'value' : '50%',
//                    'tip' : 'hi'
//               }, { 
//                    'key' : 'thermoconductivity',
//                    'value' : '.25',
//                    'tip' : 'hi'
//               }, { 
//                    'key' : 'element type',
//                    'value' : 'solid metal',
//                    'tip' : 'hi'
//               } 
//     ] 
});