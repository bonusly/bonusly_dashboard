function Bonus(data) {
  this.data = data;
}

Bonus.prototype = {
  show: function() {
    var bonus = this;
    var $bonusContainer = $('.highlighted-bonus-container');

    $bonusContainer.fadeOut(Util.seconds(1), function() {
      bonus.showFamilyAmount();
      bonus.showRecipients();
      bonus.showReason();
      bonus.showTimestamp();
      $('.highlighted-bonus-container').removeClass('unloaded');
      $bonusContainer.fadeIn(Util.seconds(2));
    });
  },
  showFamilyAmount: function() {
    $('.highlighted-bonus-total-value').text('+' + this.data.family_amount);
  },
  showRecipients: function() {
    var $recipientsDiv = $('.highlighted-bonus-recipients');
    $recipientsDiv.empty();

    for (var i = 0; i < this.data.receivers.length; i++) {
      var receiver = this.data.receivers[i];
      var $recipientDiv = $('<a>', {class: 'highlighted-bonus-recipient', href: 'https://bonus.ly' + receiver.path});
      $recipientDiv.append($('<img>', {class: 'highlighted-bonus-recipient-avatar', src: receiver.full_pic_url}));
      $recipientsDiv.append($recipientDiv);
    }
  },
  showReason: function() {
    var reason = this.data.reason_html;

    var $bonusAuthor = $('.highlighted-bonus-author');
    $bonusAuthor.attr('href', 'https://bonus.ly/company/users/' + this.data.giver.id);
    $bonusAuthor.text(this.data.giver.display_name + ':');
    $('#bonus-reason').html($.truncate(reason, { length: 140, words: true }));
  },
  showTimestamp: function() {
    var $timestamp = $('.highlighted-bonus-timestamp');
    $timestamp.text(Util.timeSince(new Date(this.data.created_at)) + ' ago');
    $timestamp.attr('href', 'https://bonus.ly/bonuses/' + this.data.id);
  }
};
