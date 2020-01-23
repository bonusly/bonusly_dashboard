$(document).ready(function() {
  var urlParams = Util.getUrlParams();
  var accessToken = $('.highlights').data('access-token');

  var options =   $.extend({ accessToken: accessToken }, urlParams);

  new BonuslyDashboard(options);
});
