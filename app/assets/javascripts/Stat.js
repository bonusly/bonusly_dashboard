function Stat(data) {
  var STAT_TYPES = {
    todays_bonuses: {
      title: 'Today\'s Bonuses',
      html_class: 'highlighted-stat-number',
      html: function(data) {
        return data.count;
      }},
    recent_receivers: {
      title: 'Recent Receivers',
      html_class: 'highlighted-stat-recipients',
      html: function(data) {
        return $.map(data.receivers, function(receiver) {
          return $('<div>', {class: 'highlighted-stat-recipient', href: receiver.href})
              .append('<img class="highlighted-stat-recipient-avatar" src="' +receiver.avatar_src +'" />');
        });
      }}};

  this.data = STAT_TYPES[data.stat_type];
  this.data.html = this.data.html(data);
}

Stat.prototype = {
  show: function() {
    var stat = this;
    var $statContainer = $('.highlighted-stats');

    $statContainer.fadeOut(Util.seconds(1), function() {
      stat.showStat();
      $statContainer.fadeIn(Util.seconds(2));
    });
  },
  showStat: function() {
    var $statsContainer = $('.highlighted-stats');

    //if ($stats.length == 2) { $stats[1].remove() }

    $statsContainer.prepend(
        $('<div>', {class: 'highlighted-stat'})
            .append( $('<div>', {class: 'highlighted-stat-title'}).html(this.data.title) )
            .append( $('<div>', {class: this.data.html_class}).html(this.data.html) )
    );
  }
};