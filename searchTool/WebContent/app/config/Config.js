Ext.define('SearchTool.config.Config', {
  statics: {
    loadMsg: 'Loading Application raj.  Please wait...', 
  	keywords: 'data/keywords.json',
    products: 'data/products.json',
    sources:  'data/sources.json',
    
    //captions & labels
    searchCboxCaptionLabel:'Enter search term(s)',
    searchCboxCaptionValue:'(* = wildcard; ? = single char wildcard)',
    searchChkCaptionLabel:'Search Titles Only',
    qryBuilderCaptionLabel:'Query Builder',
    SmthgCaptionLabel:'(Smthg)',
    
    //tooltips
    searchBtnClearTtip:'Clears keyword search criteria',
    searchBtnSearchTtip:'Runs Search',
    
    //not working yet
    searchCBoxTooltip: 'Enter search terms here; Use * for all wildcards, ? for single character wildcards'
  }
});