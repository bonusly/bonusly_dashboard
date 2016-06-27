function Manager(dashboard) {
  this.dashboard = dashboard;
  this.api = dashboard.config.api_uri;
  this.params = $.param({
    access_token: dashboard.config.access_token,
    limit: dashboard.config.bonus_limit
  });

  this.sub_managers = [new BonusManager(), new StatManager()];
}

Manager.prototype = {

  load: function() {
    var manager = this;

    $.getJSON(this.api + '?' + this.params)
        .done( function (data) {
          $.each(manager.sub_managers, function(_, sub_manager) {
            sub_manager.load(data);
          });

          manager.show_start();
        })
        .fail( manager.loadFailure );
  },

  loadFailure: function() {
    alert('Failed to load data!');
  },

  show_start: function() {
    this.show_on_load();
    this.show_on_interval();

    if (this.show_process != undefined) clearInterval(this.show_process);
    if (this.loading_process != undefined) clearInterval(this.loading_process);

    this.show_process = setInterval(this.show_on_interval.bind(this), this.dashboard.config.message_interval);
    this.loading_process = setInterval(this.load.bind(this), this.dashboard.config.refresh_interval);
  },

  show_on_load: function() {
    $.each(this.sub_managers, function(_, sub_manager) {
      sub_manager.show_on_load();
    });
  },

  show_on_interval: function() {
    $.each(this.sub_managers, function(_, sub_manager) {
      sub_manager.show_on_interval();
    });
  }
};