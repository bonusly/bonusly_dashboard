function BonuslyDashboard(options) {
  this.config = {
    accessToken:     '',
    messageInterval: Util.seconds(10),
    refreshInterval: Util.minutes(5),
    bonusLimit:      '50',
    bonusApiUri:     '/api/v1/bonuses',
    statApiUri:      '/api/v1/stats',
    analyticsApiUri: '/api/v1/instrumentation/events',
    versionApiUri:   '/company/digital_signage/version'
  };

  $.extend(this.config, options);

  if (this.config.accessToken) {
    this.bonusManager = new Manager(this);
    this.bonusManager.load();
  }
}
