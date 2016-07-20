function BonusManager(parent) {
  this.parent = parent;

  this.bonusApi = parent.dashboard.config.bonusApiUri;
  this.bonusParams = $.param({
    access_token: parent.dashboard.config.accessToken,
    limit: parent.dashboard.config.bonusLimit
  });

  this.bonuses = [];
  this.currentBonus = 0;
}

BonusManager.prototype = {
  load: function() {
    var self = this;

    $.getJSON( this.bonusApi + '?' + this.bonusParams )
        .done( function(data) {
          if (data.result.length == 0) return self.loadFailure();

          // Use only the bonuses that pass Util.useBonus and map them to bonus objects
          self.bonuses = $.grep(data.result, function(bonus, _) { return Util.useBonus(bonus)})
              .map(function(item) {return new Bonus(item)});

          self.bonuses = Util.shuffle(self.bonuses);

          self.parent.handleCallbackSuccess('bonuses', data);
        }).fail( self.loadFailure );
  },

  loadFailure: function() {
    console.log('Failed to bonus data, retrying in 10 seconds.');
    this.parent.handleCallbackFailure();
  },

  showOnInterval: function() {
    var bonus = this.bonuses[this.currentBonus];
    this.currentBonus = (this.currentBonus + 1) % this.bonuses.length;
    bonus.show();  
  },
  
  showOnLoad: function() {}
};
