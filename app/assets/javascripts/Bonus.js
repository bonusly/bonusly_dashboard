function Bonus(data) {
  this.data = data;
}

Bonus.prototype = {
  show: function() {
    var bonus = this;
    var bonus_container = $('.highlighted-bonus-container');

    bonus_container.fadeOut(Util.seconds(1), function() {
      bonus.showFamilyAmount();
      bonus.showRecipients();
      bonus.showReason();
      bonus.showTimestamp();
      bonus_container.fadeIn(Util.seconds(2))
          .delay(Util.seconds(2.5))
          .animate({
            scrollTop: bonus_container.height() - $('.highlighted-bonus').height()
          }, Util.seconds(5));
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
    $('#bonus-reason').html(this.highlightBonusAmount(reason, this.data.amount));
  },
  showTimestamp: function() {
    var $timestamp = $('.highlighted-bonus-timestamp');
    $timestamp.text(Util.timeSince(new Date(this.data.created_at)) + ' ago');
    $timestamp.attr('href', 'https://bonus.ly/bonuses/' + this.data.id);
  },
  highlightBonusAmount: function(text, amount) {
    return text.replace('+' + amount, '<span class="highlighted-bonus-value">+' + amount + '</span>');
  }
};
