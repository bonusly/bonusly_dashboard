function BonuslyDashboard(options) {
  this.config = {
    access_token: '',
    message_interval: Util.seconds(10),
    refresh_interval: Util.seconds(60),
    bonus_limit: '30',
    api_uri: 'https://bonus.ly/api/v1/bonuses'
  };

  $.extend(this.config, options);

  if (this.config.access_token) {
    this.bonusManager = new Manager(this);
    this.bonusManager.load();
  } else {
    alert('Access token not set, unable to access API.');
  }
}