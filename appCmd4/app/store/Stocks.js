Ext.define('appCmd4.store.Stocks', {
    extend: 'Ext.data.ArrayStore',
    model: 'appCmd4.model.Stock',
    autoLoad: true,
    listeners: {
        load: function() {
        debugger;
        }
    }
});
