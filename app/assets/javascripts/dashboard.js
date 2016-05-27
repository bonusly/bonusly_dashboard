Util = {
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
    }
};

function Bonus(data) {
    this.data = data;
}

Bonus.prototype = {
    show: function() {
        this.showFamilyAmount();
        this.showRecipients();
        this.showReason();
        this.showTimestamp();
    },
    showFamilyAmount: function() {
        $('.highlighted-bonus-total-value').text('+' + this.data.family_amount);
    },
    showRecipients: function() {
        var $recipientsDiv = $('.highlighted-bonus-recipients');
        $recipientsDiv.empty();

        for (var i = 0; i < this.data.receivers.length; i++) {
            var receiver = this.data.receivers[i];
            var $recipientDiv = $('<a>', { class: 'highlighted-bonus-recipient', href: 'https://bonus.ly' + receiver.path });
            $recipientDiv.append($('<img>', { class: 'highlighted-bonus-recipient-avatar', src: receiver.full_pic_url} ));
            $recipientsDiv.append($recipientDiv);
        }
    },
    showReason: function() {
        var reason = this.data.reason_html;
        var $bonusAuthor = $('.highlighted-bonus-author');
        $bonusAuthor.attr('href', 'https://bonus.ly/company/users/' + this.data.giver.id);
        $bonusAuthor.text(this.data.giver.display_name + ':');
        $('#bonus-reason').html(this.highlightBonusAmount(reason, this.data.amount));
    },
    showTimestamp: function() {
        var $timestamp = $('.highlighted-bonus-timestamp');
        $timestamp.text(Util.timeSince(new Date(this.data.created_at)) + ' ago');
        $timestamp.attr('href', 'https://bonus.ly/bonuses/' + this.data.id);
    },
    highlightBonusAmount: function(text, amount) {
        return text.replace('+' + amount, '<span class="highlighted-bonus-value">+' + amount + '</span>');
    }
};

function BonusManager(accessToken, limit) {
    this.accessToken = accessToken;
    this.limit = limit;
    this.bonuses = [];
}

BonusManager.prototype = {
    loadBonuses: function() {
        var endpoint = 'https://bonus.ly/api/v1/bonuses?access_token=' + this.accessToken + '&limit=' + this.limit;
        var bonusManager = this;
        $.getJSON(endpoint, function(data) {
            bonusManager.bonuses = data['result'].map(function(item) { return new Bonus(item); });
            bonusManager.showBonuses();
        });
    },
    showNextBonus: function() {
        var bonus = this.bonuses.pop();
        bonus.show();
    },
    showBonuses: function() {
        this.showNextBonus();
        setInterval(this.showNextBonus.bind(this), 5000);
    }
};

$(document).ready(function() {
    var bonusManager = new BonusManager('50a4476bb976d572be8930b96dd2519b', '30');
    bonusManager.loadBonuses();
});
