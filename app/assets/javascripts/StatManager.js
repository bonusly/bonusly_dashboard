function StatManager(parent) {
  this.parent = parent;

  this.stats = [];
  this.curStatNumber = 0;
}

StatManager.prototype = {

  build: function() {
    this.stats = [];
    var stat_data = this.parent.callback_response.stats;
    var bonus_data = this.parent.callback_response.bonuses;

    bonus_data.result.stat_type = 'recent_receivers';
    this.stats = this.stats.concat( new Stat(bonus_data.result) );

    this.stats = this.stats.concat($.map(stat_data.result, function(item) { return new Stat(item)})
        .filter( function(item) { return item != null; } ));
  },

  showOnInterval: function() {},
  
  showOnLoad: function() {
    var count = 0;
    var $highlightedStat = $('.highlighted-stat');

    $highlightedStat.fadeOut(Util.seconds(1), function() {
      $highlightedStat.remove();
    });

    while (count < 2) {
      count++;
      this.stats[this.curStatNumber].show();
      this.curStatNumber++;
      if (this.curStatNumber == this.stats.length) this.curStatNumber = 0;
    }

    $highlightedStat.fadeIn(Util.seconds(2));
  }
};
