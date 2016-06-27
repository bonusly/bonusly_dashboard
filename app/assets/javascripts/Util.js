var Util = {
  
  get_url_param: function(name) {
    var result = '';

    var params = window.location.search.split('?')[1];
    if (params != undefined) {
      params = params.split('&');
    }

    $.each(params, function(_, item) {
      item = item.split('=');
      if (item[0] == name) {
        result = item[1];
      }
    });

    return result;
  },
  
  timeSince: function(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  },
  
  seconds: function(seconds) { return seconds * 1000; },

  shuffle: function(arr) {
    for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x) {}
    return arr;
  }
};