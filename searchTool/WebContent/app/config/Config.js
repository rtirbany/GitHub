Ext.define('SearchTool.config.Config', {
  statics: {
    sessionTimeout: 15,     //in minutes
    sessionGracePeriod: 60, //in seconds
    cookieNameSSO: 'CHROME_SSO_NAME',
    ajaxTimout: 10000,

    urlMethodCreate: 'POST',
    urlMethodRead: 'GET',
    urlMethodUpdate: 'PUT',
    urlMethodDelete: 'DELETE',
    urlConfigUserLoad: '',
    urlConfigUserLoadMethod: 'GET',
    urlConfigUserSave: '',
    urlConfigUserSaveMethod: 'POST',

    urlSearch: 'data/results.json',
    urlReferences : 'data/referenceList.json',
    urlKeywords: 'data/keywords.json',
    urlSources:  'data/sources.json',
    urlSearchSave: 'data/search/save',
    urlSearchSaveRetrieveAll: 'data/savedList.json',

    urlHelpTitle: 'Cayce Help',
    urlHelpLink: 'http://someurl',
    urlMainTitle: 'Main',
    urlMainLink: 'http://localhost:8080/index.html',

    urlExportMethod: 'GET',
    urlExportRoot: '/searchexport',
    urlExportTokenCsv: 'csv',
    urlExportTokenExcel: 'xls',
    urlExportTokenExcel2007: 'xlsx',
    urlExportTokenPdf: 'pdf',

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

    htmlWidgetName: 'HTML Viewer',
    htmlWidgetSingleton: false,

    msgWaitQuery: 'Querying data.  Please wait...',
    msgErrorComm: 'Error communicating with ',
    msgErrorCommTitle: 'Communication error ',
    msgErrorTryAgain: 'We apologize for the inconvenience, please try again shortly',
    msgErrorContactAdmin: 'We apologize for the inconvenience, please contact an Administrator',
    loadMsg: 'Loading Application raj.  Please wait...',

    dbEscapeChar : '',  //for mysql
    charWildcard: '*',
    charSingleCharWildcard: '?',
    qbuilderSetStart: '[',
    qbuilderSetEnd: ']',
    advancedMaxLength: 600,
    //banner
    msgBanner: 'TV',
    bgColorBanner: 'red',
    bgColorBannerBorder: 'red',
    heightBanner: 20,

    //captions & labels
    searchCboxTooltip:'Enter search terms here; Use * for wildcards, ? for single character wildcards',
    searchCboxCaptionLabel:'Enter search term(s):',
    searchCboxCaptionValue: '(Use * for wildcards and ? for single char wildcards)',
    searchCboxCaptionValueFuzzy: '(Wildcards not allowed when using Fuzzy Search)',
    fuzzyChkCaptionValue: 'Fuzzy Search',
    fuzzyToolTip: 'Allow slight misspelling for keywords entered (wildcards are not allowed)',
    searchSaveToolTip: 'Save this Search',
    searchVizToolTip: 'Run Visualization',
    qryBuilderCaptionLabel:'Advanced (Boolean)',
    titlePnlFilters:    'Narrow Results',
    removeAllToolTip: 'Removes all selected Filters and Data Sources',
    queryBuilderToolTip: 'Build a query using data from the Query Builder',
    queryBuilderClearToolTip: 'Clear all data from Query Builder',
    savedQueryTabToolTip: 'Your Saved Queries',
    histQueryTabToolTip: 'Session Query History',
//    queryBuilderDe:'',
    msgNoSavedQueries: '&nbsp;(No saved queries were found)',
    msgNoHistoryQueries: '&nbsp;(No query history was found)',
    defaultDatePeriod : 'Ext.Date.MONTH',
    defaultDateAmt : -1,
    qryBuilderTextFieldRegex : /^[$]{0,1}[0-9]*[0-9a-zA-Z\-\,\.\'\"\%\ \/\?\*]*$/, //$# (only 1 '$',0-1 w/many#, '.' w/ 0-2 #), %#(only 1'.' w/ many #), a-zA-Z0-9 punctuation, large comma-delim numbers, wildcards
    qryBuilderErrText : 'Invalid field entry',
    qryBuilderOpers: [
                          ['=', '='],
                          ['>', '>'],
                          ['<', '<'],
                          ['>=', '>='],
                          ['<=', '<='],
                          ['!=', '!='],
                          ['IN', 'IN'],
                          ['NOT IN','NOT IN'],
                          //['NOT EQUAL TO', 'NOT EQUAL TO'],
                          //['BETWEEN', 'BETWEEN'], ['CONTAINS', 'CONTAINS'],
                          //['DOES NOT CONTAIN', 'DOES NOT CONTAIN'],
                          ['NOT_NULL', 'NOT_NULL'],
                          ['NULL', 'NULL']
    ],

    //themes
    themes: [
        ['extjs/resources/css/ext-all.css','Default'],
        ['extjs/resources/ext-theme-access/ext-theme-access-all.css','hi contrast']
    ],
    defaultThemeUser: 'ext/resources/css/ext-all.css',

    //calendar fields
    calendarDateOptions: [//[1,'Create Date'],
        [2,'Publish Date']
        //,[3,'Report Date']
    ],
    calendarDateOptionsUser: 2,
    //results
    ResultsDisplayOptions: [['g','Grid'],['s','Search']],
    defaultResultsDisplayUser: 'g',
    defaultResultsDisplayAdmin: 'g',
    PageSizeOptions : [[10,10],[20,20],[50,50],[100,100]],
    defaultPageSizeUser : 20,
    defaultPageSizeAdmin: 20,
    defaultPageSizeGlossary: 100,
    warningExport : 50, //number of results to exceed for export warning to appear
    maxResults : 5000, //maximum number of results to display

    rsDateColFormat : 'M d, Y',//'m-d-Y',//y=2 dig yr
    customCalendarStyle : 'cal',
    customCalendarWeekstart : 0, //0 = Sunday, 6 = Saturday
    customCalendarSixMonthstart : 1, //1 = January, 12 = December
    customCalendarSixMonthFromCurrent : 0, //0 = no; 1 = yes
    customCalendarFiscalMonthDay: '09/30/',

    //docviewer settings
    urlDocViewerPrefix: '/detail/',
    docViewerTitle: 'Document Viewer: ',
    docViewerUrlRoot: '/services/search/html',
    docViewerFormatDefault: 'html',
    docViewerLabelFormatHtml: 'HTML',
    docViewerLabelFormatXml: 'XML',
    docViewerLabelFormatText: 'Text',
    docViewerLabelFormatAttach: 'Attachments',
    docViewerDocTypes: ['HTML','XML','Text','Attachments'],
    docViewDocUrlTokens: ['html','xml','text','attachments'],
    docViewerDocTypeEnable: [true,true,true,true],
    urlTokenHtml: 'html',
    urlTokenXml: 'xml',
    urlTokenText: 'text',
    urlTokenAttach: 'attachments',
    disableXml: false,
    disableText: false,
    disableSave: false,
    disableAttach: false,
    savedSearchDescMaxLength: 400,

   attachServicePrefix: '/attachment',
   attachSupportedProduct: 'enclosure',

    //tooltips
    searchBtnClearTtip:'Clears keyword search criteria',
    searchBtnSearchTtip:'Runs Search',
    //settings page
    dfAdminSettings: 'These are the system settings which were set by an Admin',

    //user
    numMaxQuerySave: 4,
    numMaxQueryHistory: 48,
    numMaxQuerySaveEnforceLIFO: true,
    numMaxQuerySaveEnforceFIFO: false,
    numMaxQueryHistoryEnforceLIFO: true,
    numMaxFavorites: 50
  }
});