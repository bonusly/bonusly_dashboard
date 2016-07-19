function StatManager(parent) {
  this.parent = parent;

  this.statApi = parent.dashboard.config.statApiUri;
  this.statParams = $.param({
    access_token: parent.dashboard.config.accessToken
  });

  this.curStatNumber = 0;
  this.stats = [];
}

StatManager.prototype = {
  load: function() {
    var self = this;
    this.todaysBonuses = 0;
    this.recentReceivers = [];

    $.getJSON( this.statApi + '?' + this.statParams )
        .done( function(data) {
          if (data.result.length == 0) return self.loadFailure();

          self.stats = $.grep($.map(data.result, function(item) {return new Stat(item)}), function(stat, _) {
            return stat.data != null;
          });

          self.parent.handleCallbackSuccess();
        }).fail( self.loadFailure );
  },

  loadFailure: function() {
    console.log('Failed to stat data, retrying in 10 seconds.');
    this.parent.handleCallbackFailure();
  },

  showOnInterval: function() {},
  
  showOnLoad: function() {
    var count = 0;

    while ($('.highlighted-stats').find('> div').length < 2 && count < 2) {
      count++;
      this.stats[this.curStatNumber].show();
      this.curStatNumber++;
      if (this.curStatNumber == this.stats.length) this.curStatNumber = 0;
    }
  }
};
