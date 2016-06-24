function StatManager() {
  this.todays_bonuses = 0;
  this.recent_receivers = [];
  this.api = '';
  this.params = $.param();
}

StatManager.prototype = {
};

$(document).ready(function() {
  StatManager.prototype = $.extend(new Manager(), StatManager.prototype);
});
