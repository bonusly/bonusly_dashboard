function Receiver(data) {
  this.data = data;
}

Receiver.prototype = {
  show: function() {
    var receiver = this;
    $('.highlighted-stat-recipients').append(receiver.generateHTML());
  },

  generateHTML: function() {
    return $('<a>', {
      class: 'highlighted-stat-recipient', 
      href: 'https://bonus.ly/company/users/' + this.data.id
    }).html($('<img>', {
      class: 'highlighted-stat-recipient-avatar', 
      src: this.data.full_pic_url
    }));
  }
};
