function BonusManager(parent) {
  this.parent = parent;

  this.bonuses = [];
  this.currentBonus = 0;
}

BonusManager.prototype = {

  build: function() {
    this.bonuses = [];
    this.currentBonus = 0;
    var bonus_data = this.parent.callback_response.bonuses;

    this.bonuses = this.bonuses.concat( $.grep(bonus_data.result, function(bonus, _) { return Util.useBonus(bonus) }) )
        .map( function(item) { return new Bonus(item) } );

    this.bonuses = Util.shuffle(this.bonuses);
  },

  showOnInterval: function() {
    var bonus = this.bonuses[this.currentBonus];
    this.currentBonus = (this.currentBonus + 1) % this.bonuses.length;
    bonus.show();  
  },
  
  showOnLoad: function() {}
};
