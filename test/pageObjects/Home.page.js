const Generic = require('./Generic.page');
const { getTrimmedText } = require('../utils/functions')
const Feed = require('./components/Feed');

class Home extends Generic {
    constructor (url = './') {
        super(url)
    }
    get $feedsContainer () { return $('[data-qa-id="feed-tabs"]'); }
    get $$feedTabs () { return this.$feedsContainer.$$('[data-qa-type="feed-tab"]'); }
    get feedTabsText () { return this.$$feedTabs.map(getTrimmedText); }
    get activeFeedTabText () { return this.$feedsContainer.$$('[data-qa-type="feed-tab"] .active').map(getTrimmedText) }
    get currentFeed () { return new Feed('[data-qa-type="article-list"]'); }

    load () {
        super.load();
        this.currentFeed.waitForLoad();
    }

    clickTab (tabText) {
        const tabToClick = this.$$feedTabs.find($tab => $tab.getText() === tabText);
        tabToClick.click();
        browser.waitUntil(() => {
            return this.activeFeedTabText[0] === tabText;
        }, undefined, 'Active tab text never switched to desired text');
        this.currentFeed.waitForLoad();
    }
}

module.exports = Home;