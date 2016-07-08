var Util = {
  
  getUrlParams: function() {
    var result = [];

    var params = window.location.search.split('?')[1];
    if (params == undefined) { return result; }
    params = params.split('&');

    $.each(params, function(_, item) {
      item = item.split('=');
      result[item[0]] = item[1];
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
  
  minutes: function(minutes) { return minutes * 1000 * 60; },
  
  days: function(days) { return days * 1000 * 60 * 60 * 24 },

  shuffle: function(arr) {
    for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x) {}
    return arr;
  }
};

// from https://github.com/pathable/truncate
(function($) {
  // Matches trailing non-space characters.
  var chop = /(\s*\S+|\s)$/;
  // Return a truncated html string.  Delegates from $.fn.truncate.
  $.truncate = function(html, options) {
    return $('<div></div>').append(html).truncate(options).html();
  };
  // Truncate the contents of an element in place.
  $.fn.truncate = function(options) {
    if ($.isNumeric(options)) options = {length: options};
    var o = $.extend({}, $.truncate.defaults, options);
    return this.each(function() {
      var self = $(this);
      if (o.noBreaks) self.find('br').replaceWith(' ');
      var text = self.text();
      var excess = text.length - o.length;
      if (o.stripTags) self.text(text);
      // Chop off any partial words if appropriate.
      if (o.words && excess > 0) {
        excess = text.length - text.slice(0, o.length).replace(chop, '').length - 1;
      }
      if (excess < 0 || !excess && !o.truncated) return;
      // Iterate over each child node in reverse, removing excess text.
      $.each(self.contents().get().reverse(), function(i, el) {
        var $el = $(el);
        var text = $el.text();
        var length = text.length;
        // If the text is longer than the excess, remove the node and continue.
        if (length <= excess) {
          o.truncated = true;
          excess -= length;
          $el.remove();
          return;
        }
        // Remove the excess text and append the ellipsis.
        if (el.nodeType === 3) {
          $(el.splitText(length - excess - 1)).replaceWith(o.ellipsis);
          return false;
        }
        // Recursively truncate child nodes.
        $el.truncate($.extend(o, {length: length - excess}));
        return false;
      });
    });
  };
  $.truncate.defaults = {
    // Strip all html elements, leaving only plain text.
    stripTags: false,
    // Only truncate at word boundaries.
    words: false,
    // Replace instances of <br> with a single space.
    noBreaks: false,
    // The maximum length of the truncated html.
    length: Infinity,
    // The character to use as the ellipsis.  The word joiner (U+2060) can be
    // used to prevent a hanging ellipsis, but displays incorrectly in Chrome
    // on Windows 7.
    // http://code.google.com/p/chromium/issues/detail?id=68323
    ellipsis: '\u2026' // '\u2060\u2026'
  };
})(jQuery);