function StatManager() {
  this.todaysBonuses = 0;
  this.recentReceivers = [];
}

StatManager.prototype = {
  load: function(data) {
    this.todaysBonuses = 0;
    this.recentReceivers = [];

    var receiverIDs = [];
    var statManager = this;
    $.each(data.result, function(_, item) {
      if (Date.parse(item.created_at) >= (Date.now() - Util.days(1))) {
        statManager.todaysBonuses++;

        $.each(item.receivers, function (_, receiver) {
          if ($.inArray(receiver.id, receiverIDs) == -1) {
            receiverIDs.push(receiver.id);
            statManager.recentReceivers.push(new Receiver(receiver));
          }
        });

      }
    });

    this.recentReceivers.slice(0, 12);
  },

  showOnInterval: function() {},
  
  showOnLoad: function() {
    var $receiverContainer = $('.highlighted-stat-recipients');
    var recentReceivers = this.recentReceivers;

    $receiverContainer.fadeOut(Util.seconds(1), function() {
      $receiverContainer.html('');
      $.each(recentReceivers, function(_, receiver) {
        receiver.show();
      });
      $receiverContainer.fadeIn(Util.seconds(2));
    });
    
    $('.highlighted-stat-number').html(this.todaysBonuses);
  }
};
