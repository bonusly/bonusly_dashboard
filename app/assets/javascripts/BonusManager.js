function BonusManager(accessToken, limit) {
  this.accessToken = accessToken;
  this.limit = limit;
  this.bonuses = [];
  this.currentBonus = 0;
}

BonusManager.prototype = {
  loadBonuses: function(options) {
    options = $.extend({
      oncomplete: function() {},
      onfailure: function() {}
    }, options);

    var endpoint = 'https://bonus.ly/api/v1/bonuses?access_token=' + this.accessToken + '&limit=' + this.limit;
    var bonusManager = this;
    $.getJSON(endpoint)
      .done(function(data) {
        bonusManager.bonuses = data['result'].map(function(item) {
          return new Bonus(item);
        });
        bonusManager.shuffleBonuses();
        options.oncomplete();
      })
      .fail(function() {
        options.onfailure();
      });
  },
  showNextBonus: function() {
    var bonus = this.bonuses[this.currentBonus];
    this.currentBonus = (this.currentBonus + 1) % this.bonuses.length;
    bonus.show();
  },
  showBonuses: function() {
    this.showNextBonus();
    setInterval(this.showNextBonus.bind(this), 5000);
    setInterval(this.loadBonuses.bind(this), 60 * 1000);
  },
  shuffleBonuses: function() {
    for (var j, x, i = this.bonuses.length; i; j = Math.floor(Math.random() * i), x = this.bonuses[--i], this.bonuses[i] = this.bonuses[j], this.bonuses[j] = x);
  }
};
