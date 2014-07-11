Ext.define('appCmd4.model.Stock', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'company'},
        {name: 'change',     type: 'float'},
        {name: 'pctChange',  type: 'float'}
    ],
    proxy: {
        type: 'ajax',
        url: 'data/stocks.json',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        }
    }
});
