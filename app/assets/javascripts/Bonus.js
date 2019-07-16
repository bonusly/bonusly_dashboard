function Bonus(data) {
  data.reason_html = '<span>' + data.reason_html + '<span>';
  this.data        = data;
}

Bonus.prototype = {
  show: function() {
    var bonus = this;
    var $bonusContainer = $('.highlighted-bonus-container');

    $bonusContainer.fadeOut(Util.seconds(1), function() {
      bonus.showFamilyAmount();
      bonus.showRecipients();
      bonus.showReason();
      bonus.showMedia();
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
    var reason = $(this.data.reason_html);
    reason.find('.bonus-image-wrapper').remove();

    var $bonusAuthor = $('.highlighted-bonus-author');
    $bonusAuthor.attr('href', 'https://bonus.ly/company/users/' + this.data.giver.id);
    $bonusAuthor.text(this.data.giver.display_name + ':');
    $('#bonus-reason').html(reason);
  },
  showMedia: function() {
    image = $(this.data.reason_html).find('.bonus-image-wrapper > img')[0];
    video = $(this.data.reason_html).find('.bonus-image-wrapper source')[0];
    $('.bonus-image').css({'background-image': 'none'})

    if(image == undefined && video == undefined){
      $('.highlighted-bonus-container').removeClass('has-image');
    } else {
      $('.highlighted-bonus-container').addClass('has-image');
    }

    if(image != undefined) {
      this.showImage(image);
    }
    if(video != undefined) {
      this.showVideo(video);
    }
  },
  showImage: function(url) {
    image = 'url(' + $(url).attr('src') + ')';

    $('.bonus-image').css({'background-image': image})
  },
  showVideo: function(video) {
    $('.bonus-video source').attr('src', $(video).attr('src'))
    $('.bonus-video video')[0].load()
    $('.bonus-video video')[0].play()
  },
  showTimestamp: function() {
    var $timestamp = $('.highlighted-bonus-timestamp');
    $timestamp.text(Util.timeSince(new Date(this.data.created_at)) + ' ago');
    $timestamp.attr('href', 'https://bonus.ly/bonuses/' + this.data.id);
  }
};
