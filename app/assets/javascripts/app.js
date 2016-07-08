$(document).ready(function() {
  var urlParams = Util.getUrlParams();
  var accessToken = urlParams['access_token'];

  if (accessToken == '' || accessToken == undefined) {
    accessToken = $('.highlights').data('access-token');
  }

  console.log(urlParams);

  var options =   $.extend({accessToken: accessToken}, urlParams);

  new BonuslyDashboard(options);
});
