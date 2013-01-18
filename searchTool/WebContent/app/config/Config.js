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
    searchChkCaptionLabel: 'Summary Field Only',
    searchSaveChkCaptionLabel : 'Save Query',
    qryBuilderCaptionLabel:'Advanced Query',
    SmthgCaptionLabel:'(Smthg - User Tools or ?)',
    
    //tooltips
    searchBtnClearTtip:'Clears keyword search criteria',
    searchBtnSearchTtip:'Runs Search',
    
    //not working yet
    searchCBoxTooltip: 'Enter search terms here; Use * for all wildcards, ? for single character wildcards'
  }
});