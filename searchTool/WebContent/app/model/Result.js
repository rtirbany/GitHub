Ext.define('SearchTool.model.Result',{
	extend:'Ext.data.Model',
	idProperty : 'documentNumber',
	fields:[
        {name:'classification'},
        {name:'date', dateFormat: 'Y-m-d'},//m-d-Y g:i A'
        {name:'title'},
        {name:'id'},
        {name:'documentNumber'},
        {name:'repository'},
        {name:'source'},
        {name:'summary'},
        {name:'type'}
	]
});