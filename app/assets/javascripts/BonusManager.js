function BonusManager(dashboard) {
  this.dashboard = dashboard;
  
  this.bonuses = [];
  this.currentBonus = 0;
}

BonusManager.prototype = {

  loadBonuses: function(options) {
    options = $.extend({
      oncomplete: this.showBonuses(),
      onfailure: this.loadFailure()
    }, options);

    var bonusManager = this;
    var bonuses_api = 'https://bonus.ly/api/v1/bonuses';
    var bonuses_api_params = $.param({
      access_token: this.dashboard.config.access_token,
      limit: this.dashboard.config.bonus_limit
    });

    $.getJSON(bonuses_api + '?' + bonuses_api_params)
      .done(function(data) {
        bonusManager.bonuses = data['result'].map(function(item) {
          return new Bonus(item);
        });
        bonusManager.shuffleBonuses();
        options.oncomplete();
      })
      .fail( options.onfailure );
  },

  loadFailure: function() {
    // TODO: Replace with loading icon and retry message.
    alert('Failed to load data!');
  },

  showNextBonus: function() {
    var bonus = this.bonuses[this.currentBonus];
    this.currentBonus = (this.currentBonus + 1) % this.bonuses.length;
    bonus.show();
  },

  showBonuses: function() {
    this.showNextBonus();
    setInterval(this.showNextBonus.bind(this), this.dashboard.config.message_interval);
    setInterval(this.loadBonuses.bind(this), this.dashboard.config.refresh_interval);
  },

  shuffleBonuses: function() {
    for (var j, x, i = this.bonuses.length; i; j = Math.floor(Math.random() * i), x = this.bonuses[--i], this.bonuses[i] = this.bonuses[j], this.bonuses[j] = x);
  }
};


function BonusManager() {
  this.api = 'https://bonus.ly/api/v1/bonuses';
  this.params = '';
  
  this.bonuses = [];
  this.currentBonus = 0;
}

StatManager.prototype = {
  setup: function(dashboard) {
    this.dashboard = dashboard;
    this.params = $.param( this.helpers.getParams() );
  },
  
  show: function() {
    var bonus = this.bonuses[this.currentBonus];
    this.currentBonus = (this.currentBonus + 1) % this.bonuses.length;
    bonus.show();
  },
  
  loadFailure: function() {
    alert('Failed to load data!');
  },
  
  
  
  helpers: {
    getParams: function() { return {
      access_token: this.dashboard.config.access_token,
      limit: this.dashboard.config.bonus_limit
    }}
  }
};

$(document).ready(function() {
  StatManager.prototype = $.extend(new Manager(), StatManager.prototype);
});
