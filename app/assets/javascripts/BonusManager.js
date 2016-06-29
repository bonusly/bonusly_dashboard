function BonusManager() {
  this.bonuses = [];
  this.currentBonus = 0;
}

BonusManager.prototype = {
  load: function(data) {
    this.bonuses = data.result.map(function(item) {
      return new Bonus(item);
    });
    
    this.bonuses = Util.shuffle(this.bonuses);
  },

  showOnInterval: function() {
    var bonus = this.bonuses[this.currentBonus];
    this.currentBonus = (this.currentBonus + 1) % this.bonuses.length;
    bonus.show();  
  },
  
  showOnLoad: function() {}
};
