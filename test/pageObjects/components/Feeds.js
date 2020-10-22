const Component = require('./Component');
const { getTrimmedText } = require('../../utils/functions')
const Feed = require('./Feed');

class Feeds extends Component {
    get $feedsContainer () { return $(this.selector); }
    get $$feedTabs () { return this.$feedsContainer.$$('[data-qa-type="feed-tab"], [data-qa-type="profile-tab"]'); }
    get feedTabsText () { return this.$$feedTabs.map(getTrimmedText); }
    get $$activeFeedTabs () { return this.$feedsContainer.$$('[data-qa-type="feed-tab"] .active, [data-qa-type="profile-tab"] .active'); }
    get activeFeedTabText () { return this.$$activeFeedTabs.map(getTrimmedText) }
    get currentFeed () { return new Feed('[data-qa-type="article-list"]'); }

    clickTab (tabText) {
        const tabToClick = this.$$feedTabs.find($tab => $tab.getText() === tabText);
        tabToClick.click();
        browser.waitUntil(() => {
            return this.activeFeedTabText[0] === tabText;
        }, { timeoutMsg: 'Active tab text never switched to desired text' });
        this.currentFeed.waitForLoad();
    }
}

module.exports = Feeds;