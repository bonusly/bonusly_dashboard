function StatManager() {
  this.todays_bonuses = 0;
  this.recent_receivers = [];
}

StatManager.prototype = {
  load: function(data) {
    this.todays_bonuses = 0;
    this.recent_receivers = [];

    var receiver_ids = [];
    var stat_manager = this;
    $.each(data.result, function(_, item) {
      if (Date.parse(item.created_at) >= (Date.now() - (60 * 60 * 24 * 1000))) {
        stat_manager.todays_bonuses++;

        $.each(item.receivers, function (_, receiver) {
          if ($.inArray(receiver.id, receiver_ids) == -1) {
            receiver_ids.push(receiver.id);
            stat_manager.recent_receivers.push(new Receiver(receiver));
          }
        });

      }
    });

    this.recent_receivers.slice(0, 12);
  },

  show_on_interval: function() {},
  
  show_on_load: function() {
    var receiver_container = $('.highlighted-stat-recipients');
    var recent_receivers = this.recent_receivers;

    receiver_container.fadeOut(Util.seconds(1), function() {
      receiver_container.html('');
      $.each(recent_receivers, function(_, receiver) {
        receiver.show();
      });
      receiver_container.fadeIn(Util.seconds(2));
    });
    
    $('.highlighted-stat-number').html(this.todays_bonuses);
  }
};
