function BonuslyDashboard(options) {
  this.config = {
    accessToken: '',
    messageInterval: Util.seconds(10),
    refreshInterval: Util.seconds(60),
    bonusLimit: '30',
    apiUri: '/api/v1/bonuses'
  };

  $.extend(this.config, options);

  if (this.config.accessToken) {
    this.bonusManager = new Manager(this);
    this.bonusManager.load();
  } else {
    alert('Access token not set, unable to access API.');
  }
}