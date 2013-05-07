Ext.define('SearchTool.config.Config', { 
  statics: {
    cookieNameSSO: 'CHROME_SSO_NAME',
    ajaxTimout: 10000,
    
    urlMethodCreate: 'POST',
    urlMethodRead: 'GET',
    urlMethodUpdate: 'PUT',
    urlMethodDelete: 'DELETE',
    
    urlSearch: 'data/results.json',
    urlReferences : '',
    urlKeyword: 'data/keywords.json',
    urlSources:  'data/sources.json',
    urlSearchSave: '/ccd-central/search/save',
    fields:  'data/searchfields.json',
    defaultSortDir: 'asc',
    defaultSortProperty: 'summary',
    
    //gui labels 
    sourceTabTitle: 'Data Sources',
    filterTabTitle: 'Filters',
    
    //Results grid
    defaultColMultiplier: 16, 
    
    //Visualization Widget Name
    vizWidgetName: 'Centrifuge',
    vizWidgetSingleton: true,
    vizWidgetUseEventingAPI: false,
    vizWidgetEventChannelName: 'cd.viz',
    
    msgWaitQuery: 'Querying data.  Please wait...',
    msgErrorQuery: 'Error communicating with ',
    msgErrorQueryTitle: 'Communication error ',
    msgErrorTryAgain: 'We apologize for the inconvenience, please try again shortly',
    msgErrorContactAdmin: 'We apologize for the inconvenience, please contact an Admin',
    loadMsg: 'Loading Application raj.  Please wait...',  
    
    dbEscapeChar : '',  //for mysql
    //searchUrl : 'http://localhost:80/r',
    //captions & labels
    searchCboxCaptionLabel:'Enter search term(s):',
    searchCboxCaptionValue:'(* = wildcard; ? = single char wildcard)',
    fuzzyChkCaptionValue: 'Use Fuzzy Search',
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
    
    //calendar fields
    calendarDateOptions: [2,'Publish Date'],
    calendarDateOptionUser: 2,
    //results
    ResultsDisplayOptions: [['g','Grid'],['s','Search']],
    defaultResultsDisplayUser: 'g',
    defaultResultsDisplayAdmin: 'g',
    PageSizeOptions : [[5,5],[10,10],[25,25],[50,50]],
    defaultPageSizeUser : 10,
    defaultPageSizeAdmin: 25,
    warningExport : 50, //number of results to exceed for export warning to appear
    maxResults : 5000, //maximum number of results to display
      
    rsDateColFormat : 'm-d-Y',//y=2 dig yr
    customCalendarStyle : 'cal',
    customCalendarWeekstart : 0, //0 = Sunday, 6 = Saturday
    customCalendarSixMonthstart : 1, //1 = January, 12 = December
    customCalendarSixMonthFromCurrent : 0, //0 = no; 1 = yes
    customCalendarFiscalMonthDay: '09/30/',
    
    //docviewer settings
    docViewerTitle: 'Document Viewer: ',
    docViewerUrlRoot: '/data/docs/',
    docViewerFormatDefault: 'html',
    urlTokenXml: 'xml',
    urlTokenText: 'raw',
    disableXml: false,
    disableText: true,
    disableSave: true,
    //tooltips
    searchBtnClearTtip:'Clears keyword search criteria',
    searchBtnSearchTtip:'Runs Search',
    //settings page
    dfAdminSettings: 'These are the system settings which were set by an Admin',
    numMaxQuerySave: 25,
    numMaxFavorites: 50,
    //not working yet
    searchCBoxTooltip: 'Enter search terms here; Use * for all wildcards, ? for single character wildcards'
    
  }
});