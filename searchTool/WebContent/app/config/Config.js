Ext.define('SearchTool.config.Config', {
  statics: {
    ajaxTimout: 10000,
    urlSearch: '/services/search',
    loadMsg: 'Loading Application raj.  Please wait...', 
    msgQuery: 'Querying data.  Please wait...',
    msgErrorQueryTitle: 'Communication error (Query Service)',
    msgErrorQueryText: 'Error communicating with Query Service..please try again shortly',
  	keywords: 'data/keywords.json',
    products: 'data/products.json',
    sources:  'data/sources.json',
    fields:  'data/searchfields.json',
    dbEscapeChar : '\\',  //for mysql
    searchUrl : 'http://localhost:80/r',
    //captions & labels
    searchCboxCaptionLabel:'Enter search term(s)',
    searchCboxCaptionValue:'(* = wildcard; ? = single char wildcard)',
    searchChkCaptionLabel: 'Summary Field Only',
    searchSaveChkCaptionLabel : 'Save this Search',
    qryBuilderCaptionLabel:'Advanced (Boolean)',
    titlePnlFilters:    'Narrow Results',
    SmthgCaptionLabel:'(Smthg - User Tools or ?)',
    defaultDatePeriod : 'Ext.Date.MONTH',
    defaultDateAmt : -1,
    qryBuilderTextFieldRegex : /^[$]{0,1}[0-9]*[0-9a-zA-Z\-\,\.\'\"\%\ \?\*]*$/, //$# (only 1 '$',0-1 w/many#, '.' w/ 0-2 #), %#(only 1'.' w/ many #), a-zA-Z0-9 punctuation, large comma-delim numbers, wildcards
    qryBuilderErrText : 'Invalid field entry',
    //results
    PageSizeOptions : [[5,5],[10,10],[25,25],[50,50]],
    defaultPageSize : 25,
    warningExport : 5, //number of results to exceed for export warning to appear
    maxResults : 5, //maximum number of results to display
    rsDateColFormat : 'm-d-Y',//y=2 dig yr
    customCalendarWeekstart : 0, //0 = Sunday, 6 = Saturday
    customCalendarSixMonthstart : 1, //1 = January, 12 = December
    customCalendarSixMonthFromCurrent : 0, //0 = no; 1 = yes
    customCalendarFiscalMonthDay: '10/01/',
    //tooltips
    searchBtnClearTtip:'Clears keyword search criteria',
    searchBtnSearchTtip:'Runs Search',
    
    //not working yet
    searchCBoxTooltip: 'Enter search terms here; Use * for all wildcards, ? for single character wildcards'
  }
});