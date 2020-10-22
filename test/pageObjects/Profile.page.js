const Generic = require('./Generic.page');
const Feeds = require('./components/Feeds');

class Profile extends Generic {
    constructor(username) {
        super('./@' + username);
    }

    get feeds () { return new Feeds('[data-qa-id="profile-tabs"], .articles-toggle > .nav-pills'); }
    get $followToggle () { return $('[data-qa-id="follow-toggle"]'); }
    get $username () { return $('[data-qa-id="profile-username"], .user-info h4'); }

    load () {
        super.load();
        this.feeds.currentFeed.waitForLoad();
    }
}

module.exports = Profile;