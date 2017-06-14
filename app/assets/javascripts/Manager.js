function Manager(dashboard) {
  this.dashboard = dashboard;
  
  this.version = null;

  this.callback_set_id = null;
  this.callback_count = null;
  this.callback_response = {};

  this.analyticsApi = dashboard.config.analyticsApiUri;
  this.analyticsParams = $.param({
    access_token: dashboard.config.accessToken,
    category: 'dashboard',
    event: 'fetch',
    label: $('body').data('company-name')
  });

  var timeSinceDayStart = (new Date().getTime() - new Date().setHours(0,0,0,0)) / 1000;

  this.dataApis = {
    stats: {
        uri: dashboard.config.statApiUri,
        params: $.param({
          access_token: dashboard.config.accessToken,
          duration: timeSinceDayStart,
          'fields[type]': 'count_bonuses',
          exclude_archived: true
        })},
    bonuses: {
        uri: dashboard.config.bonusApiUri,
        params: $.param({
          access_token: dashboard.config.accessToken,
          limit: dashboard.config.bonusLimit,
          exclude_archived: true,
          start_time: this.bonusesStartDate()
        })}
  };

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

    var callback_set_id = this.callback_set_id = Math.floor(Math.random() * 10e10);
    this.callback_count = Object.keys(this.subManagers).length;

    $.each(this.dataApis, function(type, apiData) {
      $.getJSON( apiData.uri + '?' + apiData.params )
          .done( function(data) {
            if (data.success == false) return self.handleCallbackFailure(type);

            self.handleCallbackSuccess(type, data, callback_set_id);
          }).fail( function() { self.handleCallbackFailure(type) } );
    });
  },

  handleCallbackSuccess: function(id, data, callback_set_id) {
    if (callback_set_id != this.callback_set_id) { return false; }

    this.callback_response[id] = data;

    this.callback_count--;

    if (this.callback_count == 0) {
      $.each(this.subManagers, function(_, instance) { instance.build() });

      this.showStart();
    }
  },

  handleCallbackFailure: function(type) {
    console.log('Failed to load ' + type + ' data, retrying in 10 seconds');

    if (this.callback_set_id != null) {
      this.callback_set_id = null;
      this.callback_count = Infinity;

      var self = this;
      setTimeout(function() { self.load() }, Util.seconds(10));
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
