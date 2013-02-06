Ext.define('SearchTool.config.Config', {
  statics: {
    loadMsg: 'Loading Application raj.  Please wait...', 
  	keywords: 'data/keywords.json',
    products: 'data/products.json',
    sources:  'data/sources.json',
    fields:  'data/searchfields.json',
    dbEscapeChar : '\\',  //for mysql
    searchUrl : 'http://localhost:80/r',
    //captions & labels
    searchCboxCaptionLabel:'Enter search term(s)',
    searchCboxCaptionValue:'(* = wildcard; ? = single char wildcard)',
    searchChkCaptionLabel: 'Summary Only',
    searchSaveChkCaptionLabel : 'Save Query',
    qryBuilderCaptionLabel:'Advanced Query',
    SmthgCaptionLabel:'(Smthg - User Tools or ?)',
    defaultDatePeriod : -30, //in days
    qryBuilderTextFieldRegex : /^[0-9a-zA-Z\-\,\.\%\$\?\*]$/,
    qryBuilderErrText : 'bad info',
    //results
    PageSizeOptions : [[5,5],[10,10],[25,25],[50,50]],
    defaultPageSize : 25,
    warningExport : 5, //number of results to exceed for export warning to appear
    maxResults : 5, //maximum number of results to display
    rsDateColFormat : 'm-d-Y',//y=2 dig yr
    
    //tooltips
    searchBtnClearTtip:'Clears keyword search criteria',
    searchBtnSearchTtip:'Runs Search',
    
    //not working yet
    searchCBoxTooltip: 'Enter search terms here; Use * for all wildcards, ? for single character wildcards'
  }
});