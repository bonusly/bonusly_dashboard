$(document).ready(function() {
  var accessToken = Util.getUrlParam('access_token');

  if (accessToken == '') {
    accessToken = $('.highlights').data('access-token');
  }

  var options = {accessToken: accessToken};

  new BonuslyDashboard(options);
});
