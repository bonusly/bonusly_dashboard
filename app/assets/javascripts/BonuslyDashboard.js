function BonuslyDashboard(options) {
  this.config = {
    accessToken: '',
    messageInterval: Util.seconds(10),
    refreshInterval: Util.minutes(5),
    bonusLimit: '50',
    apiUri: '/api/v1/bonuses',
    analyticsApiUri: '/api/v1/instrumentation/events',
    versionApiUri: '/api/v1/version'
  };

  $.extend(this.config, options);

  if (this.config.accessToken) {
    this.bonusManager = new Manager(this);
    this.bonusManager.load();
  } else {
    alert('Access token not set, unable to access API.');
  }
}