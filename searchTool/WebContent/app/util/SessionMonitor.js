Ext.define('SearchTool.util.SessionMonitor', {
  requires:['SearchTool.config.Config'],
  singleton: true,
  interval: 1000 * 10,  // run every 10 seconds.
  lastActive: null,
  remaining: 0,
  ui: Ext.getBody(), 
  window: Ext.create('Ext.window.Window', {
    title: 'Session Timeout',
    closable: false,
    bodyPadding: 5,
    modal: true,
    closeAction: 'hide',
    resizable: false,
    width: 325,
    items: [{
      xtype: 'container',
      frame: true,
      html: "Your session is about to timeout due to inactivity. Any unsaved data will be lost and you will be automatically logged out if this occurs. </br></br>If you wish to extend your session and continue working, click the 'Continue' button below.</br></br>"    
    },{
      xtype: 'label',
      text: ''
    }],
    buttons: [{
      text: 'Continue',
      handler: function() {
        Ext.TaskManager.stop(SearchTool.util.SessionMonitor.countDownTask);
        SearchTool.util.SessionMonitor.window.hide();
        SearchTool.util.SessionMonitor.start();
        // 'poke' the server-side to update your session.
        Ext.Ajax.request({
          url: 'user/poke.action'
        });
      }
    },{
      text: 'Logout',
      action: 'logout',
      handler: function() {
        Ext.TaskManager.stop(SearchTool.util.SessionMonitor.countDownTask);
        SearchTool.util.SessionMonitor.window.hide();
        
        // find and invoke your app's "Logout" button.
        Ext.ComponentQuery.query('#btnLogout')[0].handler();
      }
    }]
  }),
  constructor: function(config) {
    var me = this;
    me.maxInactive = 1000 * 60 * SearchTool.config.Config.sessionTimeout,  // 15 minutes of inactivity allowed; set it to 1 for testing.
    // session monitor task
    this.sessionTask = {
      run: me.monitorUI,
      interval: me.interval,
      scope: me
    };

    // session timeout task, displays a 60 second countdown
    // message alerting user that their session is about to expire.
    this.countDownTask = {
      run: me.countDown,
      interval: 1000,
      scope: me
    };
  }, 
  captureActivity : function(eventObj, el, eventOptions) {
    this.lastActive = new Date();
  }, 
  monitorUI : function() {
    var now = new Date();
    var inactive = (now - this.lastActive);
        
    if (inactive >= this.maxInactive) {
      this.stop();

      this.window.show();
      this.remaining = SearchTool.config.Config.sessoinGracePeriod;  // seconds remaining.
      Ext.TaskManager.start(this.countDownTask);
    }
  },
  start : function() { 
    this.lastActive = new Date();

    this.ui.on('mousemove', this.captureActivity, this);
    this.ui.on('keydown', this.captureActivity, this);
    this.ui.on('mousedown', this.captureActivity, this);
        
    Ext.TaskManager.start(this.sessionTask);
  }, 
  stop: function() {
    Ext.TaskManager.stop(this.sessionTask);
    this.ui.un('mousemove', this.captureActivity, this);  //  always wipe-up after yourself...
    this.ui.un('keydown', this.captureActivity, this);
    this.ui.un('mousedown', this.captureActivity, this);
  }, 
  countDown: function() {
    this.window.down('label').update('Your session will expire in ' +  this.remaining + ' second' + ((this.remaining == 1) ? '.' : 's.') );
    
    --this.remaining;

    if (this.remaining < 0) { 
      var m = Ext.ComponentQuery.query('#main')[0];
      this.stop();
      this.window.hide(); //TODO: get the Ext Window Manager and removeAll()
      m.removeAll(false);
      
    }
  }
 
});