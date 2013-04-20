Ext.define('SearchTool.config.Config', { 
  statics: {
    ajaxTimout: 10000,
    urlSearch: '/services/search',
    urlKeyword: 'data/keywords.json',
    
    defaultSortDir: 'asc',
    defaultSortProperty: 'summary',
    
    //Results grid
    defaultColMultiplier: 16,
    
    //Visualization Widget Name
    vizWidgetName: 'Centrifuge',
    vizWidgetSingleton: true,
    vizWidgetUseEventingAPI: true,
    vizWidgetEventChannelName: 'coredisco',
    
    msgWaitQuery: 'Querying data.  Please wait...',
    msgErrorQuery: 'Error communicating with ',
    msgErrorQueryTitle: 'Communication error ',
    msgErrorTryAgain: 'We apologize for the inconvenience, please try again shortly',
    msgErrorContactAdmin: 'We apologize for the inconvenience, please contact an Admin',
    loadMsg: 'Loading Application raj.  Please wait...', 
  	keywords: 'data/keywords.json',
    products: 'data/products.json',
    sources:  'data/sources.json',
    fields:  'data/searchfields.json',
    dbEscapeChar : '\\',  //for mysql
    //searchUrl : 'http://localhost:80/r',
    //captions & labels
    searchCboxCaptionLabel:'Enter search term(s):',
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
    
    //themes
    themes: [['ext/resources/css/ext-all.css','Default'],['extjs/resources/ext-theme-access/ext-theme-access-all.css','hi contrast']],
    defaultThemeUser: 'ext/resources/css/ext-all.css',
    //results
    ResultsDisplayOptions: [['g','Grid'],['s','Search']],
    defaultResultsDisplayUser: 'g',
    defaultResultsDisplayAdmin: 'g',
    PageSizeOptions : [[5,5],[10,10],[25,25],[50,50]],
    defaultPageSizeUser : 10,
    defaultPageSizeAdmin: 25,
    warningExport : 50, //number of results to exceed for export warning to appear
    maxResults : 5000, //maximum number of results to display
    
    numMaxQuerySave: 25,
    numMaxFavorites: 25,
    
    rsDateColFormat : 'm-d-Y',//y=2 dig yr
    customCalendarWeekstart : 0, //0 = Sunday, 6 = Saturday
    customCalendarSixMonthstart : 1, //1 = January, 12 = December
    customCalendarSixMonthFromCurrent : 0, //0 = no; 1 = yes
    customCalendarFiscalMonthDay: '09/30/',
    //tooltips
    searchBtnClearTtip:'Clears keyword search criteria',
    searchBtnSearchTtip:'Runs Search',
    //settings page
    dfAdminSettings: 'These defaults/settings are managed by the Admin',
    //not working yet
    searchCBoxTooltip: 'Enter search terms here; Use * for all wildcards, ? for single character wildcards'
  }
});