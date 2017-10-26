function Manager(dashboard) {
  this.dashboard = dashboard;

  this.version = null;

  this.callback_set_id = null;
  this.callback_count = null;
  this.callback_response = {};
  this.failure_count = 0;

  this.analyticsApi = dashboard.config.analyticsApiUri;
  this.analyticsParams = $.param({
    access_token: dashboard.config.accessToken,
    category: 'dashboard',
    event: 'fetch',
    label: $('body').data('company-name')
  });

  var timeSinceDayStart = (new Date().getTime() - new Date().setHours(0,0,0,0)) / 1000;

  this.dataParams = $.param({
    access_token: dashboard.config.accessToken,
    duration: timeSinceDayStart,
    limit: dashboard.config.bonusLimit,
    start_time: this.bonusesStartDate()
  });

  this.subManagers = { bonus: new BonusManager(this), stat: new StatManager(this) };
}

Manager.prototype = {

  load: function() {
    var self = this;

    $.post(this.analyticsApi + '?' + this.analyticsParams);

    $.get(this.dashboard.config.versionApiUri).done(function(data) {
      if (self.version == null) self.version = data.message;
      else if (self.version != data.message) location.reload();
    });

    var callback_set_id = this.callback_set_id = Math.floor(Math.random() * 10e10);
    this.callback_count = Object.keys(this.subManagers).length;

    $.getJSON( '/company/dashboard/data?' + this.dataParams )
        .done( function(data) {
          if (data.success == false) return self.handleCallbackFailure();

          self.handleCallbackSuccess(data, callback_set_id);
        }).fail( function() { self.handleCallbackFailure() } );
  },

  handleCallbackSuccess: function(data, callback_set_id) {
    if (callback_set_id != this.callback_set_id) { return false; }

    this.callback_response['bonuses'] = data.bonuses;
    this.callback_response['stats'] = data.stats;

    if (this.callback_response.success) {
      $.each(this.subManagers, function (_, instance) {
        instance.build()
      });
    }

    this.showStart();
  },

  handleCallbackFailure: function() {
    this.failure_count += 1;

    var waitTime = this.failure_count + 10;
    console.log('Failed to load data, retrying in ' + waitTime + ' seconds');

    if (this.callback_set_id != null) {
      this.callback_set_id = null;
      this.callback_count = Infinity;

      var self = this;
      setTimeout(function() { self.load() }, Util.seconds(waitTime));
    }
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
  },

  bonusesStartDate: function() {
    var now = new Date();
    now.setDate(now.getDate() - 14 /* days */);
    return now
  }
};
