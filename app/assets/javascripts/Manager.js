function Manager(dashboard) {
  this.api = '';
  this.params = '';
}

Manager.prototype = {
  
  setup: function(dashboard) {
    this.dashboard = dashboard
  },

  load: function(options) {
    options = $.extend({
      oncomplete: this.show(),
      onfailure: this.loadFailure()
    }, options);

    var manager = this;
    $.getJSON(this.api + '?' + this.params)
        .done( this.onJSONComplete )
        .fail( options.onfailure );
  },
  
  onJSONComplete: function(data) { /* Handle JSON response */ },  

  loadFailure: function() { /* Replace with loading icon and retry message. */ },

  next: function() { /* Load next item */ },

  show: function() { /* Show current item */ },

  helpers: {}
};