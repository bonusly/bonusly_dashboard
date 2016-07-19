function Manager(dashboard) {
  this.dashboard = dashboard;
  
  this.version = null;
  this.callback_count = null;

  this.analyticsApi = dashboard.config.analyticsApiUri;
  this.analyticsParams = $.param({
    access_token: dashboard.config.accessToken,
    category: 'dashboard',
    event: 'fetch',
    label: $('body').data('company-name')
  });

  this.subManagers = {bonus: new BonusManager(this), stat: new StatManager(this)};
}

Manager.prototype = {

  load: function() {
    var self = this;

    $.post(this.analyticsApi + '?' + this.analyticsParams);

    $.get('/company/dashboard/version').done(function(data) {
      console.log(data.message);
      if (self.version == null) self.version = data.message;
      else if (self.version != data.message) location.reload();
    });

    this.callback_count = Object.keys(this.subManagers).length;
    $.each(this.subManagers, function(_, subManager) {
      subManager.load()
    });
  },

  handleCallbackSuccess: function() {
    this.callback_count--;

    if (this.callback_count == 0) {
      this.showStart();
    }
  },

  handleCallbackFailure: function() {
    this.callback_count = Infinity;
    setTimeout(this.load, Util.seconds(10));
  },

  showStart: function() {
    this.showOnLoad();
    this.showOnInterval();

    if (this.showProcess != undefined) clearInterval(this.showProcess);
    if (this.loadingProcess != undefined) clearInterval(this.loadingProcess);

    this.showProcess = setInterval(this.showOnInterval.bind(this), this.dashboard.config.messageInterval);
    this.loadingProcess = setInterval(this.load.bind(this), this.dashboard.config.refreshInterval);
  },

  showOnLoad: function() {
    $.each(this.subManagers, function(_, subManager) {
      subManager.showOnLoad();
    });
  },

  showOnInterval: function() {
    $.each(this.subManagers, function(_, subManager) {
      subManager.showOnInterval();
    });
  }
};