const Generic = require('./Generic.page');
const { getTrimmedText } = require('../utils/functions')
const Feed = require('./components/Feed');

class Home extends Generic {
    constructor () {
        super('./')
    }
    get $feedsContainer () { return $('[data-qa-id="feed-tabs"]') }
    get $$feedTabs () { return this.$feedsContainer.$$('[data-qa-type="feed-tab"]') }
    get feedTabsText () { return this.$$feedTabs.map(getTrimmedText); }
    get activeFeedTabText () { return this.$feedsContainer.$$('[data-qa-type="feed-tab"] .active').map(getTrimmedText) }
    get $articleLoadingIndicator () { return $('[data-qa-id="article-loading-indicator"]') }
    get currentFeed () { return new Feed(this.$$feedTabs.$('.active')); }

    clickTab (tabText) {
        const tabToClick = this.$$feedTabs.find($tab => $tab.getText() === tabText);
        tabToClick.click();
        this.$articleLoadingIndicator.waitForExist(undefined, true);
    }
}

module.exports = Home;