function Manager(dashboard) {
  this.dashboard = dashboard;
  this.api = dashboard.config.apiUri;
  this.params = $.param({
    access_token: dashboard.config.accessToken,
    limit: dashboard.config.bonusLimit
  });

  this.subManagers = [new BonusManager(), new StatManager()];
}

Manager.prototype = {

  load: function() {
    var manager = this;

    $.getJSON(this.api + '?' + this.params)
        .done( function (data) {
          if (data.result.length == 0) manager.loadFailure();

          $.each(manager.subManagers, function(_, subManager) {
            subManager.load(data);
          });

          manager.showStart();
        })
        .fail( manager.loadFailure );
  },

  loadFailure: function() {
    alert('Failed to load data!');
  },

  showStart: function() {
    this.showOnLoad();
    this.showOnInterval();

    if (this.showProcess != undefined) clearInterval(this.showProcess);
    if (this.loadingProcess != undefined) clearInterval(this.loadingProcess);

    this.showProcess = setInterval(this.showOnInterval.bind(this), this.dashboard.config.messageInterval);
    this.loadingProcess = setInterval(this.load.bind(this), this.dashboard.config.refreshInterval);
  },

  showOnLoad: function() {
    $.each(this.subManagers, function(_, subManager) {
      subManager.showOnLoad();
    });
  },

  showOnInterval: function() {
    $.each(this.subManagers, function(_, subManager) {
      subManager.showOnInterval();
    });
  }
};