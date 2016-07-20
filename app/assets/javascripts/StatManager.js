function StatManager(parent) {
  this.parent = parent;

  this.statApi = parent.dashboard.config.statApiUri;
  this.statParams = $.param({
    access_token: parent.dashboard.config.accessToken,
    duration: 86400,
    'fields[type]': 'count_bonuses'
  });

  this.curStatNumber = 0;
  this.stats = [];
}

StatManager.prototype = {
  load: function() {
    var self = this;

    $.getJSON( this.statApi + '?' + this.statParams )
        .done( function(data) {
          if (data.result.length == 0) return self.loadFailure();

          self.parent.handleCallbackSuccess('stats', data);
        }).fail( self.loadFailure );
  },

  loadFailure: function() {
    console.log('Failed to stat data, retrying in 10 seconds.');
    this.parent.handleCallbackFailure();
  },

  build_stats: function(callback_data) {
    var stats = [];

    stats.concat($.map(callback_data['stats'].result, function(item) {return new Stat(item)})
        .filter( function(item) { return item != null; } ));



    return stats;
  },

  showOnInterval: function() {},
  
  showOnLoad: function() {
    this.stats = this.build_stats(this.parent.callback_response);

    self.stats = $.grep($.map(this.parent.callback_response['stats'].result, function(item) {return new Stat(item)}), function(stat, _) {
      return stat.data != null;
    });

    var count = 0;

    while ($('.highlighted-stats').find('> div').length < 2 && count < 2) {
      count++;
      this.stats[this.curStatNumber].show();
      this.curStatNumber++;
      if (this.curStatNumber == this.stats.length) this.curStatNumber = 0;
    }
  }
};
