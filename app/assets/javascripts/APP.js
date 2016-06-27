$(document).ready(function() {
  var access_token = Util.get_url_param('access_token');

  if (access_token == '') {
    access_token = $('.highlights').data('access-token');
  }

  var options = {access_token: access_token};

  new BonuslyDashboard(options);
});