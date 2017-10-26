function BonusManager(parent) {
  this.parent = parent;

  this.bonuses = [];
  this.currentBonus = 0;
}

BonusManager.prototype = {

  build: function() {
    this.bonuses      = [];
    this.currentBonus = 0;
    var bonus_data    = this.parent.callback_response.bonuses;

    this.bonuses = this.bonuses.concat( $.grep(bonus_data.result, function(bonus, _) { return Util.useBonus(bonus) }) )
        .map( function(item) { return new Bonus(item) } );

    this.bonuses = Util.shuffle(this.bonuses);
  },

  showOnInterval: function() {
    var noBonusMessage = $('.no-bonus-message');
    if (this.bonuses == undefined || this.bonuses.length == 0) {
      noBonusMessage.show();
      return;
    } else {
      noBonusMessage.hide();
    }

    var bonus = this.bonuses[this.currentBonus];
    this.currentBonus = (this.currentBonus + 1) % this.bonuses.length;
    if (bonus != undefined) bonus.show();
  },
  
  showOnLoad: function() {}
};
