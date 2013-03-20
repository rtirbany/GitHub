Ext.define('SearchTool.store.FacetSelections',{
     extend:'Ext.data.Store',
     requires:['SearchTool.config.Config'],
     model:'SearchTool.model.FacetSelection',
     id:'FacetSelections',
     data:[
               {    
                    'key' : 'size',
                    'value' : '25 cm',
                    'tip' : 'hi'
                    
               }, {  
                    'key' : 'weight',
                    'value' : '2lbs',
                    'tip' : 'hi'
               }, { 
                    'key' : 'mass',
                    'value' : '4kg',
                    'tip' : 'hi'
               }, { 
                    'key' : 'density',
                    'value' : '20kg/m2',
                    'tip' : 'hi'
               }, { 
                    'key' : 'viscosity',
                    'value' : '50%',
                    'tip' : 'hi'
               }, { 
                    'key' : 'thermoconductivity',
                    'value' : '.25',
                    'tip' : 'hi'
               }, { 
                    'key' : 'element type',
                    'value' : 'solid metal',
                    'tip' : 'hi'
               } 
     ] 
});