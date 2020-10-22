const Generic = require('./Generic.page');
const { getTrimmedText } = require('../utils/functions')
const Feeds = require('./components/Feeds');

class Home extends Generic {
    constructor (url = './') {
        super(url)
    }
    get feeds () { return new Feeds('[data-qa-id="feed-tabs"]'); }
    get $$popularTags () { return $$('//p[text()="Popular Tags"]/following-sibling::div/a') }
    get popularTags () { return this.$$popularTags.map(getTrimmedText) }

    load () {
        super.load();
        this.feeds.currentFeed.waitForLoad();
    }
}

module.exports = Home;