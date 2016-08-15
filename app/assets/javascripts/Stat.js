function Stat(data) {
  this.STAT_TYPES = {
    todays_bonuses_0: {
      title: 'Today\'s Bonuses',
      html_class: 'highlighted-stat-number',
      html: function(data) {
        return data.count },
      params: {duration: Util.days(1) / 1000, fields: {type: 'todays_bonuses_0'}} },
    recent_receivers: {
      title: 'Recent Receivers',
      html_class: 'highlighted-stat-recipients',
      html: function(data) {
        var added_receiver_ids = [];
        var receivers_data = [];

        $.each(data, function(_, bonus) {
          $.each(bonus.receivers, function(_, receiver) {
            if (added_receiver_ids.indexOf(receiver.id) == -1) {
              added_receiver_ids.push(receiver.id);
              receivers_data.push(
                  $('<div>', {class: 'highlighted-stat-recipient', href: receiver.path})
                      .append('<img class="highlighted-stat-recipient-avatar" src="' + receiver.profile_pic_url +'" />'))
            }
          });
        });

        return receivers_data;
      },
      params: {previous_hours: 24}}
  };

  this.data = this.STAT_TYPES[data.stat_type];
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

    // if ($stats.length == 2) { $stats[1].remove() }

    $statsContainer.prepend(
        $('<div>', {class: 'highlighted-stat'})
            .append( $('<div>', {class: 'highlighted-stat-title'}).html(this.data.title) )
            .append( $('<div>', {class: this.data.html_class}).html(this.data.html) )
    );
  }
};