$(document).ready(function() {
  var options = {access_token: $('.highlights').data('access-token')};

  new BonuslyDashboard(options);
});